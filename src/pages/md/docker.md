# Bundle your worker code

In this step you will bundle your worker code and it's dependencies so that
it can be executed by Azure Batch. The easiest way to replicate your current
python environment is to export your current configuration into a
`requirements.txt` file via:

_*make sure you `pip install joblib` before calling this, as we'll use it when
writing the `worker.py`_

```shell
pip freeze >> requirements.txt
```

Next create a docker file in the root of your project with the following:

```dockerfile
#! ./Dockerfile copy show
FROM python:3.7

# Install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Copy the worker and constants
COPY task.py worker.py constants.py .
```

Next log into the registry

```powershell
#! copy show
# *Note that the acr login token is typically only valid for one hour*
$AZURE_CR_NAME = "myownprivateregistry"
az acr login --name $AZURE_CR_NAME
```

And push your code to the registry

```powershell
#! copy show
# define the image name
$env:REGISTRY_SERVER = (az acr show -n $AZURE_CR_NAME --query loginServer) -replace '"',''
$IMAGE_NAME = "${env:REGISTRY_SERVER}/batch-worker:v1"

# build the image locally
docker build . -t $IMAGE_NAME

# push the image to the private registry
docker push $IMAGE_NAME
```

**Tip:** always include the version (`:v1`) when tagging your docker file.
This is important when fixing bugs, as Batch Nodes (VMs) will only pull down
a new copy of your code when the image name or version has changed
