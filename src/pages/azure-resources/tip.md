**Best Practice Tip**: Use a dedicated resource group for your Azure Batch
resources.  This ensures that you can delete all the azure resources when
you are done with a single command ([az rg delete](https://docs.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest#az-group-delete) or via the [portal](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resources-portal#delete-resources)) in order to avoid
unnecessary charges to your Azure subscription when you have finished with your
batch jobs.