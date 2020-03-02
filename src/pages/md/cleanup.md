# Clean Up

In order to prevent unexpected charges, the resource group and all the
resources it contains ( e.g. the storage account, batch pools, and container
registry) can be deleted with the following command:

## PowerShell and Bash

```powershell
az group delete -n $name
```

## CMD

```batch
az group delete -n %name%
```
