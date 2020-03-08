REM Query the required parameters
set BATCH_ACCOUNT_NAME=%name%
for /f %i in ('az batch account keys list -n %name% -g %name% --query primary') do @set BATCH_ACCOUNT_KEY=%i
for /f %i in ('az storage account keys list -n %name% --query [0].value') do @set STORAGE_ACCOUNT_KEY=%i
for /f %i in ('az batch account show -n %name% -g %rgname% --query accountEndpoint') do @set BATCH_ACCOUNT_ENDPOINT=%i
for /f %i in ('az storage account show-connection-string --name $name --query connectionString') do @set STORAGE_ACCOUNT_CONNECTION_STRING=%i

REM clean up the quotes
set BATCH_ACCOUNT_KEY=%BATCH_ACCOUNT_KEY:"=%
set BATCH_ACCOUNT_ENDPOINT=%BATCH_ACCOUNT_ENDPOINT:"=%
set STORAGE_ACCOUNT_KEY=%STORAGE_ACCOUNT_KEY:"=%
set STORAGE_ACCOUNT_CONNECTION_STRING=%STORAGE_ACCOUNT_CONNECTION_STRING:"=%
