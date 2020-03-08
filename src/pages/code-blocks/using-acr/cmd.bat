set AZURE_CR_NAME=MyOwnPrivateRegistry

REM Create the resource group and enable querying the password from the CLI
az acr create -n %AZURE_CR_NAME% -g %name%  -l %location%--sku Basic
az acr update -n %AZURE_CR_NAME% --admin-enabled true

REM Export required parameters
for /f %i in ('az acr show -n %AZURE_CR_NAME% --query loginServer') do @set REGISTRY_SERVER=%i
for /f %i in ('az acr credential show -n %AZURE_CR_NAME% --query username') do @set REGISTRY_USERNAME=%i
for /f %i in ('az acr credential show -n %AZURE_CR_NAME% --query passwords[0].value') do @set REGISTRY_PASSWORD=%i
REGISTRY_SERVER=$(sed -e 's/^"//' -e 's/"$//' <<<"$REGISTRY_SERVER")
REGISTRY_USERNAME=$(sed -e 's/^"//' -e 's/"$//' <<<"$REGISTRY_USERNAME")
REGISTRY_PASSWORD=$(sed -e 's/^"//' -e 's/"$//' <<<"$REGISTRY_PASSWORD")