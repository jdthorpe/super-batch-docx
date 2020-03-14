# Best Practices

## Plan for being disconnected from the Batch job before completion

Whenever you work with a remote service such as Azure Batch, there is always
a chance that your python session will terminate before the remote job
completes.  Therefor, it's a good idea to plan for that eventuality.

SuperBatch makes this easy by providing a `.data` method for storing your
current configuration (without any of the azure credentials), and
`.from_data()` method for restoring the client in another session.

```python
#! startup.py show
import super_batch
import json

#initialize the client
batch_client = super_batch.client(...)

# create tasks
...

# store the client config to file
with open("my_job_details.json",'w') as fh:
    fh.write(json.dumps(batch_client.data))

# start the job
batch_client.run(wait=False)
```

Note that by using `batch_client.run(wait=False)`, we ensure that the startup
script continues (and then immediately terminates!) immediately after setting the batch job in
motion. When `wait=True` (eg. by default), the `run()` method calls
`self.load_results()` after loading the tasks into the Job. To load the
results, this same method can be called like so:

```python
#! finish.py show
import super_batch

# load the config from file
with open("my_job_details.json",'r') as fh:
    config_data = json.dumps(fh.read)
batch_client = super_batch.Client.from_data(config_data)

batch_client.load_results(wait=False)

task_results = []
for filename in batch_client.output_files:
    task_results.append(joblib.load(filename))

# aggregat the task results
print(sum(task_results))
```

\* **Note that** the configuration included `batch_client.data` does not
included any of the account keys. Hence, when re-connecting in another
terminal session, you will need to re-export the various [account
credentials](https://jdthorpe.github.io/super-batch-docs/create-resources).
