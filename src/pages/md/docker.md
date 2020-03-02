# Bundle your worker code

In this step you will bundle your worker code and it's dependencies so that
it can be executed by Azure Batch.  Start by creating a docker file like the following:

```dockerfile
# ./Dockerfile
FROM python:3.7

# Install dependencies
RUN pip install --upgrade pip \
    && pip install numpy joblib

# Copy in your worker code
COPY worker.py constants.py .
```

**Best practice tip** To clone your current python environment in the docker container, call *`pip freeze >> requirements.txt` in your local environment
and use the following Dockerfile:

```dockerfile
# ./Dockerfile
FROM python:3.7

# Install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Copy the worker and constants
COPY worker.py constants.py .
```

## Build and publish the docker image

To create a docker image locally, navigate to the project directory and call:

```bash
docker build -t myusername/sum-of-powers:v1 .
```

Next, upload the docker image to a registry that is accessible to Azure
Batch.  If you own that user name (`myusername`) at [Docker
Hub](https://hub.docker.com) and are logged in, you can push your code to a
**publicly available** registry like so:

```bash
docker push myusername/sum-of-powers:v1
```

However, if you wish to keep your code private and you created an Azure
Container Registry in the `Create Azure Resources` step, then login to the
azure container registry and push your code to the ACR with the following code:

```bash
# log in to Azure and the container registry
az acr login --name myownprivateregistry

# tag the local image
docker tag sum-of-powers:v1 myownprivateregistry.azurecr.io/sum-of-powers:v1

# push the image to the private registry
docker push myownprivateregistry.azurecr.io/sum-of-powers:v1
```
