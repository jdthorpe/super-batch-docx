export AZURE_CR_NAME="MyOwnPrivateRegistry"

# Create the resource group and enable querying the password from the CLI
az acr create -n %AZURE_CR_NAME% -g %name% -l %location% --sku Basic
az acr update -n %AZURE_CR_NAME% --admin-enabled true

# Export required parameters
export REGISTRY_SERVER=$(az acr show -n %AZURE_CR_NAME% --query loginServer)
export REGISTRY_USERNAME=$(az acr credential show -n %AZURE_CR_NAME% --query username)
export REGISTRY_PASSWORD=$(az acr credential show -n %AZURE_CR_NAME% --query passwords[0].value)