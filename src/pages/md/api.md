# Table of Contents

- [Table of Contents](#table-of-contents)
- [Module `super_batch`](#module-superbatch)
- [Module `super_batch.client`](#module-superbatchclient)
  - [`Client` Objects](#client-objects)
    - [`Client.data()`](#clientdata)
    - [`Client.from_data()`](#clientfromdata)
    - [`Client.__init__()`](#clientinit)
    - [`Client.build_resource_file()`](#clientbuildresourcefile)
    - [`Client.build_output_file()`](#clientbuildoutputfile)
    - [`Client.add_task()`](#clientaddtask)
    - [`Client.run()`](#clientrun)
    - [`Client.load_results()`](#clientloadresults)
    - [`Client.print_task_output()`](#clientprinttaskoutput)
- [Module `super_batch.BatchConfig`](#module-superbatchbatchconfig)
  - [`BatchConfig()`](#batchconfig)
  - [`super_batch.BatchConfig.SERVICE_KEYS`](#superbatchbatchconfigservicekeys)

<a name="super_batch"></a>
# Module `super_batch`

<a name="super_batch.client"></a>
# Module `super_batch.client`

usage requires these additional modules

<a name="super_batch.client.Client"></a>
## `Client` Objects

```python
class Client()
```

SuperBatch Client

Provides an interface for preparing, running, and pulling down data from an Azure Batch job

<a name="super_batch.client.Client.data"></a>
### `Client.data()`

```python
@property
def data(self)
```

Generate data for persisting the configuration

<a name="super_batch.client.Client.from_data"></a>
### `Client.from_data()`

```python
@staticmethod
def from_data(data)
```

Restore configuration from data

<a name="super_batch.client.Client.__init__"></a>
### `Client.__init__()`

```python
def __init__(self, image=None, **kwargs)
```

**Arguments**:

- `image` _azure.batch.models.ImageReference_ - The VM image to use for the pool nodes
  defaults to
  ```python
  azure.batch.models.ImageReference(
  publisher="microsoft-azure-batch",
  offer="ubuntu-server-container",
  sku="16-04-lts",
  version="latest",
  )
  ```
- `**kwargs` - Additinal arguments passed to :class:`super_barch.BatchConfig`

<a name="super_batch.client.Client.build_resource_file"></a>
### `Client.build_resource_file()`

```python
def build_resource_file(self, file_path: str, container_path: str, duration_hours: int = 24) -> azure.batch.models.ResourceFile
```

Uploads a local file to an Azure Blob storage container.

**Arguments**:

- `file_path` - The local path to the file.
- `container_path` - The path where the file should be placed in the container before executing the task

**Returns**:

  A ResourceFile initialized with a SAS URL appropriate for Batch tasks.

<a name="super_batch.client.Client.build_output_file"></a>
### `Client.build_output_file()`

```python
def build_output_file(self, output_file, container_path) -> azure.batch.models.ResourceFile
```

Uploads a local file to an Azure Blob storage container.

**Arguments**:

- `output_file` - the name of the file produced as the output by the task
- `container_path` - the name of the file in the container
  

**Returns**:

  A ResourceFile initialized with a SAS URL appropriate for Batch tasks.

<a name="super_batch.client.Client.add_task"></a>
### `Client.add_task()`

```python
def add_task(self, resource_files: List[models.ResourceFile], output_files: List[models.OutputFile], command_line=None)
```

Adds a task for each input file in the collection to the specified job.

**Arguments**:

- `resource_files` - A list of ResourceFile descriptions for the task
- `output_files` - A list of OutputFile descriptions for the task
- `command_line` - The command used to for the task.  Optional;
  if missing, defaults to the command_line parameter provided when
  instantiating this object

<a name="super_batch.client.Client.run"></a>
### `Client.run()`

```python
def run(self, wait: bool = True, **kwargs) -> None
```

Run the Batch Job
wait: If true, wait for the batch to complete and then download the
results to file by calling `self.load_results()` after loading
all the tasks to the job.

**Raises**:

- `BatchErrorException` - If raised by the Azure Batch Python SDK

<a name="super_batch.client.Client.load_results"></a>
### `Client.load_results()`

```python
def load_results(self, quiet=False) -> None
```

<a name="super_batch.client.Client.print_task_output"></a>
### `Client.print_task_output()`

```python
def print_task_output(self, encoding=None)
```

Utilty method: Prints the stdout.txt file for each task in the job.

<a name="super_batch.BatchConfig"></a>
# Module `super_batch.BatchConfig`

<a name="super_batch.BatchConfig.BatchConfig"></a>
## `BatchConfig()`

```python
def BatchConfig(**kwargs)
```

Provides an interface for preparing, running, and pulling down data from an Azure Batch job

**Arguments**:

- `BATCH_DIRECTORY` _string_ - Local directory in which input and output files should be placed
- `BATCH_ACCOUNT_NAME` _string_ - Batch account name. Taken from the environment when not provided
- `BATCH_ACCOUNT_KEY` _string_ - Batch account key. Taken from the environment when not provided
- `BATCH_ACCOUNT_ENDPOINT` _string_ - Batch account endpoint. Taken from the environment when not provided
- `JOB_ID` _string_ - Name for the Batch Job
- `STORAGE_ACCOUNT_NAME` _string_ - Storage Account name
- `STORAGE_ACCOUNT_KEY` _string_ - Stoarge account key. Taken from the environment when not provided
- `STORAGE_ACCOUNT_CONNECTION_STRING` _string_ - Storage account access connection string. Taken from the environment when not provided
- `STORAGE_ACCESS_DURATION_HRS` _int_ - Time in hours that the generated the storage access token will be valid for
- `BLOB_CONTAINER_NAME` _string_ - Name for the blob storage container
- `POOL_ID` _string_ - Pool Id
- `POOL_NODE_COUNT` _int_ - Count for normal priority nodes in the batch pool. Only used when createing a pool.  **Ignored if the pool already exists**
- `POOL_LOW_PRIORITY_NODE_COUNT` _int_ - Count for low priority nodes in the batch pool.    **Ignored if the pool already exists**
- `POOL_VM_SIZE` _string_ - VM name (See the FAQ for details)
- `DOCKER_IMAGE` _string_ - name of the docker image
- `REGISTRY_SERVER` _string, optional_ - Used when the docker image is hosted on a private repository. Taken from the environment when not provided
- `REGISTRY_USERNAME` _string, optional_ - Used when the docker image is hosted on a private repository. Taken from the environment when not provided
- `REGISTRY_PASSWORD` _string, optional_ - Used when the docker image is hosted on a private repository. Taken from the environment when not provided
- `DELETE_POOL_WHEN_DONE` _boolean_ - Should the batch pool be deleted when the job has been completed? Default `False`
- `DELETE_JOB_WHEN_DONE` _boolean_ - Should the batch job be deleted when the job has been completed? Default `False`
- `DELETE_CONTAINER_WHEN_DONE` _boolean_ - should the blob storage container be deleted when the job has been completed? Default `False`

<a name="super_batch.BatchConfig.SERVICE_KEYS"></a>
## `super_batch.BatchConfig.SERVICE_KEYS`

