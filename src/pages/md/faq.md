# FAQ

## What if I get disconnected while my Batch Jobs is running?

If your python session is terminated after calling `batch_client.run()`, you
can reconnect reconnect using:

```python
# The `$name` of our created resources:
NAME = os.environ.get("NAME","superbatchtest")
BATCH_DIRECTORY = expanduser("~/temp/super-batch-test")

# instantiate the batch helper client:
batch_client = super_batch.client(
    POOL_ID=NAME,
    JOB_ID="<<jobid>>",
    BLOB_CONTAINER_NAME=NAME,
    BATCH_DIRECTORY=BATCH_DIRECTORY)

batch_client.load_results()
```

where `"<<jobid>>"` is replaced with the job id used when creating the job, which can be queried with

```shell
hello
```

and then reconnect and download the results using the above answer.

## What types of VMs are available for the node pools?

One of the most important choices when [provisioning Linux compute nodes](https://azure.microsoft.com/documentation/articles/batch-linux-nodes/)
in Batch pools is the VM size, as this determines the compute power, memory
and cost of running your job. The VM SKU's available in your data center can
be queried with [`az vm list-skus`](https://docs.microsoft.com/en-us/cli/azure/vm?view=azure-cli-latest)

The following query lists the VMs in the `westus2` region which are capable
of running in low priority mode. Low priority mode can save upwards of 80% on
your compute costs, and the event of a task failure due to the node being
revoked, Azure Batch will reschedule the tasks on other nodes as needed.

```shell
az vm list-skus --location westus2 --query "[].{Name:name,vCPUs:capabilities[?name == 'vCPUs'] | [0].value, LowPriorityCapable:capabilities[?name == 'LowPriorityCapable'] | [0].value, MemoryGB:capabilities[?name == 'MemoryGB'] | [0].value } [?LowPriorityCapable == 'True']" --output table
```

```text
Name                 VCPUs    MemoryGB
-------------------  -------  ----------
Standard_F2s_v2      2        4
Standard_F4s_v2      4        8
Standard_F8s_v2      8        16
Standard_F16s_v2     16       32
Standard_F32s_v2     32       64
Standard_F48s_v2     48       96
Standard_F64s_v2     64       128
Standard_F72s_v2     72       144
...
```
