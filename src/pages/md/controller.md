# The Controller Script

Having uploaded our worker and it's dependencies into a private Azure Container
Registry, to run the batch job, we will need to:

* Create the task resource files and upload them into the cloud
* Tell Azure Batch about the task, including it's resources and outputs
* Set the tasks in motion and wait for them to complete
* Download and aggregate the outputs

While this might sound intimidating, the SuperBatch Client provides a streamlined
API for coordinating these tasks. The following script uses the `Client`
class provided by `super_batch` to configure Azure Batch and coordinate
uploading / downloading files to and from the Azure Blob Storage container.

While the following is one of the longer scripts in this tutorial, it is
mostly boiler plate code and only the sections labeled `<<< Your code here >>>`
need to be updated. Conveniently, these sections can be filled in by copying
the code from the `#controller.py` code snippet on the `splitting code` page.

```python
#! ./controller.py copy
import os
from os.path import join, expanduser
import datetime
import pathlib
import joblib
import super_batch

from constants import (
    GLOBAL_CONFIG_FILE,
    TASK_RESOURCE_FILE,
    TASK_OUTPUT_FILE,
    LOCAL_RESOURCE_PATTERN,
    LOCAL_OUTPUT_PATTERN,
)

# ------------------------------
# Configure Azure Batch
# ------------------------------

# The `$name` of our created resources:
NAME = os.environ.get("NAME","superbatchtest")
IMAGE_NAME = os.environ.get("IMAGE_NAME")
asset IMAGE_NAME is not None

# a local directory where temporary files will be stored:
BATCH_DIRECTORY = expanduser("~/temp/super-batch-test")
pathlib.Path(BATCH_DIRECTORY).mkdir(parents=True, exist_ok=True)

# used to generate unique task names:
_TIMESTAMP = datetime.datetime.utcnow().strftime("%Y%m%d%H%M%S")

# instantiate the batch helper client:
batch_client = super_batch.client(
    POOL_ID=NAME,
    JOB_ID=NAME + _TIMESTAMP,
    POOL_VM_SIZE="standard_d1_v2",
    POOL_NODE_COUNT=0,
    POOL_LOW_PRIORITY_NODE_COUNT=2,
    DELETE_POOL_WHEN_DONE=False,
    BLOB_CONTAINER_NAME=NAME,
    BATCH_DIRECTORY=BATCH_DIRECTORY,
    DOCKER_IMAGE="myusername/sum-of-powers:v1",
    COMMAND_LINE="python /worker.py",
)

# ------------------------------
# build the global parameters
# ------------------------------

# <<< YOUR CODE GOES BELOW >>>
global_parameters = {"power": 3, "size": (10,)}
# <<< YOUR CODE GOES ABOVE >>>

# write the global parameters resource to disk
joblib.dump(global_parameters, join(BATCH_DIRECTORY, GLOBAL_CONFIG_FILE))

# upload the task resource
global_parameters_resource = batch_client.build_resource_file(
    GLOBAL_CONFIG_FILE, GLOBAL_CONFIG_FILE
)

# ------------------------------
# build the batch tasks
# ------------------------------

# <<< YOUR CODE GOES BELOW >>>
SEEDS = (1, 12, 123, 1234)
for i, seed in enumerate(SEEDS):
    parameters = {"seed": seed}
    # <<< YOUR CODE GOES ABOVE >>>

    # write the resource to disk
    local_resource_file = LOCAL_RESOURCE_PATTERN.format(i)
    joblib.dump(parameters, join(BATCH_DIRECTORY, local_resource_file))

    # upload the task resource
    input_resource = batch_client.build_resource_file(
        local_resource_file, TASK_RESOURCE_FILE
    )

    # create an output resource
    output_resource = batch_client.build_output_file(
        LOCAL_OUTPUT_FILE, LOCAL_OUTPUT_PATTERN.format(i)
    )

    # create a task
    batch_client.add_task(
        [input_resource, global_parameters_resource], [output_resource]
    )

# ------------------------------
# run the batch job
# ------------------------------

batch_client.run()

# ------------------------------
# aggregate the results
# ------------------------------

task_results = []
for filename in batch_client.output_files:
    task_results.append(joblib.load(filename))

# <<< YOUR CODE GOES BELOW >>>
print(sum(task_results))
# <<< YOUR CODE GOES ABOVE >>>
```

**tip:** While best practices would generally dictate that temporary files and
directories should be supplied and managed by a library (e.g. tmpfile), batch
jobs may outlast your terminal session and hence you may wish to manage them
your self

**Tip:** In the above code, a single command (`"python /worker.py",`) was
provided which is used for all the tasks. In some cases this might not be
convenient e.g. when task code expects parameters to be passed into the
command line. In this case the `COMMAND_LINE` parameter can be specified at
the task level in `batch_client.add_task(...)`

## Next Up

Learn more about the configuration options that can be specified when configuring
Azure Batch with the `super_batch.Client` by visiting the `API` page