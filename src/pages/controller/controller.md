# Controller

We need to tell azure batch about our tasks, run the tasks, wait for their
completion, download the results.  The following script leverages a helper
provided by `super_batch`, which can be installed via:

```bash
pip install git+https://github.com/jdthorpe/batch-config
```

Finally, while the following is one of the longer scripts you'll need to
write, it can be written by adding the boiler plate code to you're original
code containing the for loop containing the tasks that are to be deligated
to Azure Batch.

You'll most likely just need to update it with your batch configuration
preferences (e.g.  vm size, node counts, etc), the name of your docker
image, and then replace the body of the `for` loop from your original code
with the boiler plate code in the for loop below:

```python
# ./controller.py
import os
import datetime
import pathlib
import joblib
import super_batch
from constants import (
    GLOBAL_CONFIG_FILE,
    TASK_INPUTS_FILE,
    TASK_OUTPUTS_FILE,
    LOCAL_INPUTS_PATTERN,
    LOCAL_OUTPUTS_PATTERN,
)

# CONSTANTS:
# used to generate unique task names:
_TIMESTAMP = datetime.datetime.utcnow().strftime("%Y%m%d%H%M%S")
# a local directory where temporary files will be stored:
BATCH_DIRECTORY = os.path.expanduser("~/temp/super-batch-test")
pathlib.Path(BATCH_DIRECTORY).mkdir(parents=True, exist_ok=True)
# The `$name` of our created resources:
NAME = "superbatchtest"

# INSTANTIATE THE BATCH HELPER CLIENT:
batch_client = super_batch.client(
    POOL_ID=NAME,
    JOB_ID=NAME + _TIMESTAMP,
    POOL_VM_SIZE="STANDARD_A1_v2",
    POOL_NODE_COUNT=0,
    POOL_LOW_PRIORITY_NODE_COUNT=2,
    DELETE_POOL_WHEN_DONE=False,
    BLOB_CONTAINER_NAME=NAME,
    BATCH_DIRECTORY=BATCH_DIRECTORY,
    DOCKER_IMAGE="myusername/sum-of-powers:v1",
    COMMAND_LINE="python /worker.py",
)

# BUILD THE GLOBAL PARAMETER RESOURCE
global_parameters = {"power": 3, "size": (10,)}
joblib.dump( global_parameters, os.path.join(BATCH_DIRECTORY, GLOBAL_CONFIG_FILE))
global_parameters_resource = batch_client.build_resource_file(
    GLOBAL_CONFIG_FILE, GLOBAL_CONFIG_FILE
)

# BUILD THE BATCH TASKS
SEEDS = (1, 12, 123, 1234)
for i, seed in enumerate(SEEDS):
    # CREATE THE ITERATION PAREMTERS RESOURCE
    param_file = LOCAL_INPUTS_PATTERN.format(i)
    joblib.dump({"seed": seed}, os.path.join(BATCH_DIRECTORY, param_file))
    input_resource = batch_client.build_resource_file(param_file, TASK_INPUTS_FILE)

    # CREATE AN OUTPUT RESOURCE
    output_resource = batch_client.build_output_file(
        TASK_OUTPUTS_FILE, LOCAL_OUTPUTS_PATTERN.format(i)
    )

    # CREATE A TASK
    batch_client.add_task(
        [input_resource, global_parameters_resource], [output_resource]
    )

# RUN THE BATCH JOB
batch_client.run()

# AGGREGATE INTERMEDIATE STATISTICS
out = [None] * len(SEEDS)
for i in range(len(SEEDS)):
    fpath = os.path.join(BATCH_DIRECTORY, LOCAL_OUTPUTS_PATTERN.format(i))
    out[i] = joblib.load(fpath)
print(sum(out))
```


