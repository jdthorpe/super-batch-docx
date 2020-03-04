# The Task Worker

The job of the task worker is to execute a single task in a computing
environment prepared by Azure Batch. Specifically, Azure Batch is responsible
for (1) preparing any code dependencies (2) loading data (*resources files*)
into the working directory (3) executing your code, and (4) retrieving the outputs.

## File Naming

For convenience, we'll create a special module containing the names of the
resource and output files which is shared between the controller and
worker modules.

```python
# ./constants.py
# The global parameters file
GLOBAL_CONFIG_FILE = "config.pickle"

# names of the input (resource) and output files as they will
# appear in the task environment:
TASK_RESOURCE_FILE = "resource.pickle"
TASK_OUTPUT_FILE = "output.pickle"

# names of the input (resource) and output files as they will
# appear on our local machine and in blob storage:
LOCAL_RESOURCE_PATTERN = "task_{}_resource.pickle"
LOCAL_OUTPUT_PATTERN = "task_{}_output.pickle"
```

*Aside: In this example we'll be passing python pickle files between the
controller and worker, because both the worker and the controller are
written in python.  While the SuperBatch helper scripts are written in Python,
this package can be used to automate work which gets done in any language.
Docker images exist for a great variety of languages, and using a worker
from another language stack simply requires changing the files written and
read from python `.pickle`s to something more language agnostic, such as
csv, yaml, json, or feather (to name a few).*

## Worker code

With the task code and file names separated out into their own modules, the
worker - which is responsible for reading in the resource files, executing
the task, and writing the output to disk - is entirely boilerplate code:

```python
# ./worker.py
import joblib
from constants import GLOBAL_CONFIG_FILE, TASK_INPUTS_FILE, TASK_OUTPUTS_FILE
from task import task

# Read the designated global config and iteration parameter files
global_config = joblib.load(GLOBAL_CONFIG_FILE)
parameters = joblib.load(TASK_INPUTS_FILE)

# Do the actual work
result = task(global_config, parameters)

# Write the results to the designated output file
joblib.dump(result, TASK_OUTPUTS_FILE)

```

**A note about imports:** Because the worker (`worker.py`) and the task
(`task.py`) modules are loaded into the root of the docker container, which
is also (conveniently) the working directory when python is executed,
`task.py` can (and should) be imported with out a leading '.' as it will also
be on the Python path at runtime

## Next up

We'll bundle the worker and it's dependencies into a docker file and publish
it in a private Azure Container Registry
