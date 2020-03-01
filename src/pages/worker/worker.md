# Code

which tells Azure Batch
about the individual tasks that need to be completed, and the worker which
executes an individual task.

In this example, we'll start that   contains a nested for loop with work which
can be spread across multiple workers and orchestrated by Azure Batch:

```python
import numpy as np

POWER = 3
SIZE = (10,)
SEEDS = (1, 12, 123, 1234)

out = np.zeros((len(SEEDS),))
for i, seed in enumerate(SEEDS):
    np.random.seed(seed)
    tmp = np.random.uniform(size=SIZE)
    out[i] = sum(np.power(tmp, POWER))

print(sum(out))
```

## File Naming

For convenience, we'll createa special module with the constants (file
names) that for the shared  between the controller and the worker:

```python
# ./constants.py
GLOBAL_CONFIG_FILE = "config.pickle"
TASK_INPUTS_FILE = "inputs.pickle"
TASK_OUTPUTS_FILE = "outputs.pickle"
LOCAL_INPUTS_PATTERN = "task_{}_inputs.pickle"
LOCAL_OUTPUTS_PATTERN = "task_{}_outputs.pickle"
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

First, we'll bundle our worker into a python script which is responsible
for running a single task.  Specifically, it reads in the global and
iteration specific configuration, does the work, and writes the results to
file in the local computing environment.

```python
# ./worker.py
import numpy as np
import joblib
from constants import GLOBAL_CONFIG_FILE, TASK_INPUTS_FILE, TASK_OUTPUTS_FILE

# Read the designated global config and iteration parameter files
global_config = joblib.load(GLOBAL_CONFIG_FILE)
parameters = joblib.load(TASK_INPUTS_FILE)

# Do the actual work
np.random.seed(parameters["seed"])
out = sum( np.power(np.random.uniform(size=global_config["size"]), global_config["power"]))

# Write the results to the designated output file
joblib.dump(out, TASK_OUTPUTS_FILE)
```
