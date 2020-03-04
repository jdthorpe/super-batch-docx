# SuperBatch

_The fastest way to get up and running with Azure Batch_

## TL;DR

Azure Batch can speed up your long running jobs by orders of magnitude, but
converting your code to run in Azure Batch requires a bit of configuration.
This package aims to get you up and running in minutes, and institutes some
best practices too.

## Azure Batch

Anytime you have code that can be divided into independent chunks, those
chunks can be scheduled by Azure Batch and executed in a pool of 100's of
workers -- shaving your execution time by orders of magnitude. However, to
leverage azure batch, you'll need to:

* Create some Azure resources including:
  * An Azure Batch instance
  * A Storage Account
  * Optionally, an Azure Container Registry
* Bundle your code which does the actual work into and store it in the cloud
* Store input files in the cloud
* Tell Azure Batch about each of the individual tasks that need to be run
* Download the results of each task
* Aggregate the task results to and produce your final output

If this sounds intimidating, this package is here to help you get to your
python - _or any other code_ - up and running in Azure Batch with as little
pain as possible.

## Requirements

In order to leverage Azure Batch using SuperBatch, you'll need:

* The [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) installed, in order to interact with the Azure cloud
* The [Docker CLI](https://docs.docker.com/install/) installed, in order to bundle your code and push it to a registry
* The SuperBatch package, which can be installed via:

```shell
pip install git+https://github.com/jdthorpe/batch-config.git
```
