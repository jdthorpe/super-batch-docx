# Build a docker image with your worker code

Next, we need to bundle this code so that it can be executed by Azure
Batch.  We'll use docker to bundle the code and it's dependencies, which
requires writing a docker file like the following:

```dockerfile
# ./Dockerfile
FROM python:3.7

# Install dependencies
RUN pip install --upgrade pip \
    && pip install numpy joblib

# Copy in your worker code
COPY worker.py constants.py .
```

#### Best practice tip

In the above docker file, we explicitly installed two packages (numpy and
joblib), but if your code requires more packages and you know your code
runs locally, you can call `pip freeze` from the command line and copy the
results of that call to a file called `requirements.txt`.  Then simply copy
the requirements file into the docker image and install the exact versions
of your requirements into the docker image like so:

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

At this point, the docker image needs to be uploaded to a registry that is
accessible to Azure Batch.  If you own that user name (`myusername`) at
[Docker Hub](https://hub.docker.com) and are logged in, you can push your code to a
**publicly available** registry like so:

```bash
docker push myusername/sum-of-powers:v1
```

However, if you wish to keep your code private and you created an Azure Container Registriy in step 1, then login to the azure container registry and push your code to the ACR like so:

```bash
# login to Azure and the container registry
az acr login --name myownprivateregistry

# tag the local image
docker tag sum-of-powers:v1 myownprivateregistry.azurecr.io/sum-of-powers:v1

# push the image to the private registry
docker push myownprivateregistry.azurecr.io/sum-of-powers:v1
```
