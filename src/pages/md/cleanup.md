# Clean Up

In order to prevent unexpected charges, the resource group and all the
resources it contains ( e.g. the storage account, batch account and node
pools, and the container registry) can be deleted with the following command:

## PowerShell and Bash

```powershell
#! copy
az group delete -n $name
```

## CMD

```shell
#! copy
az group delete -n %name%
```

**Tip:** By default, Azure Subscriptions are limited to 3 Batch Accounts, and
each Batch Account can contain up to 100 pools with 100 VMs each. If you are
working in a larger team, you may need to request an increase the number of
batch accounts or share batch accounts among your team which may require
persisting the batch account. Remember that you are charged for the nodes in
a batch pool regardless if you are using them or not, so be sure to delete
pools or scale them to zero when not in use.
