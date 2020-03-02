
# Pool Names

Create a new pool of Linux compute nodes using an Azure Virtual Machines
Marketplace image. For more information about creating pools of Linux
nodes, see: https://azure.microsoft.com/documentation/articles/batch-linux-nodes/

```shell
az vm list-skus --location westus2 --query "[].{Name:name,vCPUs:capabilities[?name == 'vCPUs'] | [0].value, LowPriorityCapable:capabilities[?name == 'LowPriorityCapable'] | [0].value, MemoryGB:capabilities[?name == 'MemoryGB'] | [0].value } [?LowPriorityCapable == 'True']" --output table
```
