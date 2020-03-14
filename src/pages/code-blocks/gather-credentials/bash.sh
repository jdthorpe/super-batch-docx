# Query the required parameters
export BATCH_ACCOUNT_NAME=$name
export BATCH_ACCOUNT_KEY=$(az batch account keys list -n $name -g $name --query primary)
export BATCH_ACCOUNT_ENDPOINT=$(az batch account show -n $name -g $name --query accountEndpoint)
export STORAGE_ACCOUNT_KEY=$(az storage account keys list -n $name --query [0].value)
export STORAGE_ACCOUNT_CONNECTION_STRING=$(az storage account show-connection-string --name $name --query connectionString)

# clean up the quotes
BATCH_ACCOUNT_KEY=$(sed -e 's/^"//' -e 's/"$//' <<<"$BATCH_ACCOUNT_KEY")
BATCH_ACCOUNT_ENDPOINT=$(sed -e 's/^"//' -e 's/"$//' <<<"$BATCH_ACCOUNT_ENDPOINT")
STORAGE_ACCOUNT_KEY=$(sed -e 's/^"//' -e 's/"$//' <<<"$STORAGE_ACCOUNT_KEY")
STORAGE_ACCOUNT_CONNECTION_STRING=$(sed -e 's/^"//' -e 's/"$//' <<<"$STORAGE_ACCOUNT_CONNECTION_STRING")