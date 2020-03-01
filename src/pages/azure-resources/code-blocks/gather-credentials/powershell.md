```powershell
$env:BATCH_ACCOUNT_NAME = $name
$env:BATCH_ACCOUNT_KEY =  (az batch account keys list -n $name -g $name --query primary) -replace '"',''
$env:BATCH_ACCOUNT_ENDPOINT =  (az batch account show -n $name -g $name --query accountEndpoint) -replace '"',''
$env:STORAGE_ACCOUNT_KEY = (az storage account keys list -n $name --query [0].value) -replace '"',''
$env:STORAGE_ACCOUNT_CONNECTION_STRING= (az storage account show-connection-string --name $name --query connectionString) -replace '"',''
```
