# Creating Azure Resources

Using Azure batch requires an azure account, and we'll demonstrate how to run
this module using the [azure command line tool](https://docs.microsoft.com/en-us/cli/azure/).

After logging into the console with `az login` (and potentially setting the default
subscription with `az account set -s <subscription>`), you'll need to create an azure
resource group into which the batch account is created. In addition, the
azure batch service requires a storage account which is used to keep track of
details of the jobs and tasks.

Although the resource group, storage account and batch account could have
different names, for sake of exposition, we'll give them all the same name and
locate them in the US West 2 region, like so: