# Refactoring Your Code

The following code is a typical (if not simple) example of code that can be
split up and run on Azure Batch.

```python
import numpy as np

POWER = 3
SIZE = (10,)
SEEDS = (1, 12, 123, 1234)

out = []
for i, seed in enumerate(SEEDS):
    np.random.seed(seed)
    tmp = np.random.uniform(size=SIZE)
    out.append(sum(np.power(tmp, POWER)))

print(sum(out))
```

In order to work with Azure Batch however, this code needs to be split up
into the parts that do the work and the parts that coordinate the work, and
the various parameters may be split into global parameters which apply to
every task and task specific parameters.

## Step 1: Refactoring in place

We'll begin by re-factoring the code to make the various roles of the code
and the data more clear. Although this may seem trivial, refactoring in place
before splitting your code is an efficient way to ensure that the next steps
go smoothly.

```python
import numpy as np

# Parameters that apply to every task
global_parameters = {"power": 3, "size": (10,)}

# Iteration parameters
SEEDS = (1, 12, 123, 1234)

# Iterate over the tasks
task_results = []
for i, seed in enumerate(SEEDS):

    # Task parameters
    parameters = {"seed": seed}

    #------------------------------
    # Task code
    #------------------------------

    # extract parameters
    size = global_parameters["size"]
    power = global_parameters["power"]
    seed = task_parameters["seed"]

    # do work
    np.random.seed(seed)
    task_result = sum(np.power(np.random.uniform(size=size), power))

    # gather the task results
    task_results.append(task_result)

# aggregate the results
print(sum(task_results))
```

## Step 2: Refactoring

In this step the code is split into a function (`task()`) which is responsible for executing a single task:

```python
# task.py
import numpy as np

def task(global_parameters, task_parameters)
    # extract parameters
    size = global_parameters["size"]
    power = global_parameters["power"]
    seed = task_parameters["seed"]

    # do work
    np.random.seed(seed)
    return sum(np.power(np.random.uniform(size=size), power))
```

and a stub for a script (`controller.py`) which will be responsible for
coordinating the work:

```python
# controller.py
import super_batch

# <<< Configure Azure Batch here >>>
batch_client = super_batch.client(...)

# Parameters that apply to every task
global_parameters = {"power": 3, "size": (10,)}
# <<< Configure the Global Parameters Resource here >>>

SEEDS = (1, 12, 123, 1234)
for i, seed in enumerate(SEEDS):
    parameters = {"seed": seed}

    # <<< Configure the task here >>>
    batch_client.add_task(...)

# Do the work!
batch_client.run()

# aggregate the results
task_results = [...]

# aggregate the results
print(sum(task_results))
```

## Up next

In the next step we'll fill in the dots and finish coordinating the work using the `super_batch` package
