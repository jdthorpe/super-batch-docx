# parameters
$name = "azurebatchtest"
$location = "westus2"

# create the resources
az group create -l $location -n $name
az storage account create -n $name -l $location -g $name
az batch account create -n $name -l $location -g $name --storage-account $name