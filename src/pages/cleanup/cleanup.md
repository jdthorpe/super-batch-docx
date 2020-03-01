# Clean Up

In order to prevent unexpected charges, the resource group, including all the
resources it contains, such as the storge account and batch pools, can be
removed with the following command:

## Powershell and Bash

```powershell
az group delete -n $name
```

## CMD

```batch
az group delete -n %name%
```
