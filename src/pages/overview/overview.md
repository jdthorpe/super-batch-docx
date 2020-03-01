# SuperBatch

_The fastest way to get up and running with Azure Batch_

## TL;DR

Azure Batch can often speed up your long running jobs by several orders
of magnitude, but converting your code to run in Azure Batch requires a good
bit of configuration. This package aims to simplify that process
dramatically, and institutes some best practices too.

## Overview

Anytime you have code that can be divided into independent and long-running
chunks, that work can be scheduled by Azure Barch and executed in a pool of
100's of workers, shaving your execution time by orders of magnidude.
However, to leverage azure batch, you'll need to:

* Set up an Azure Batch instance
* Bundle the code which does the actual work into it's own and store it in the cloud
* Store input files in the cloud
* Tell Azure Batch about each of the individual tasks that need to be run
* Store the results of each task in the cloud
* Download the results of each task
* Aggregate the task results to and produce your final output

This module aims to make this process as smooth as possible, by providing
some opinions on how to do so in order to reduce the amount of research you
need to do and code you need to write to get your job up and running with
Azure Batch.  Specifically:

* **The Azure Batch instance will be set up using the
    [Azure command line utility `az`](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).**
    This makes setting up the Azure Batch Instance fast and repeatable, and
    allows us to authenticate without having to store credentials,
    which is a security best practice.
* **The code to be executed by azure batch will be bundled into a docker
    image.**  Using docker ensures that our code can be tested locally and
    then run in Azure Batch in the exact same computing environment without
    having to write custom scripts to configure the VMs which will run our
    code.

## Overview of the Process

Azure batch is responsible for:

1. loading our code into a computing environment
1. loading the data that our code requires from the cloud into the working directory
1. executing our code
1. collecting the data produced by our code.

Therefor, you will need to:

1. Bundle your code
1. Specify where your code will read in required data and write results
1. Run your code in Azure Batch
1. Collect the results
1. Clean up your azure resoures

## Tips

* Althought this module is written in python, it can be used to coordinage the
    execution of code in any language / stack