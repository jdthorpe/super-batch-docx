import React from "react"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CreateResources, GatherCredentials, UsingACR } from "../code-blocks"
import { StyledMarkdown } from "../index"
import raw from "raw.macro"
// import ReactMarkdown from 'react-markdown'
const tip = raw("./tip.md")

const INTRO = `
# Creating Azure Resources

After logging into the console with \`az login\` (and potentially setting the default
subscription with \`az account set -s <subscription>\`), you'll need to create a
resource group into which the batch account is created. In addition, the
azure batch service requires a storage account which is used to keep track of
details of the jobs and tasks.

Although the resource group, storage account and batch account could have
different names, for sake of exposition, we'll give them all the same name
and locate them in the US West 2 region. Since we're using the \`name\` for
parameter for the resource group, storage account and batch account, it must
consist of 3-24 lower case, letters and be unique across all of azure
`

const GATHER_CREDENTIALS = `
## Gather Resource Credentials

In order to execute tasks in Azure batch, credentials for each of the
required Azure resources (e.g. azure batch, storage, and optionally the azure
container registry) need to be acquired. The strategy employed in this demo
is to log in to the Azure CLI (\`az login\`) and export the necessary
credentials as environment variables. This allows writing credential free
code and letting the Azure CLI handle the Autentication and Authorization.

After exporting these credentials, the code in \`controller.py\` is executed
in the same terminal session, and \`super_batch\` can use them to access the
required Azure resources.
`


const USING_ACR = `
## Using Azure Container Registry

If you wish to use a private Azure Container Registry, use the following code to
create an ACR instance and the export the required credentials:
`

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& p code": {
                backgroundColor: "#cadceb",
                padding: "0.2rem",
                paddingLeft: "0.4rem",
                paddingRight: "0.4rem",
                borderRadius: "0.2rem"
            }
        }
    }),
);



export function AzureResources() {
    const [value, setValue] = React.useState<number>(0);
    const classes = useStyles()

    return (<div className={classes.root}>
        <StyledMarkdown source={INTRO} />
        <CreateResources value={value} setValue={setValue} />
        <StyledMarkdown source={tip} />

        <StyledMarkdown source={GATHER_CREDENTIALS} />
        <GatherCredentials value={value} setValue={setValue} />

        <StyledMarkdown source={USING_ACR} />
        <UsingACR value={value} setValue={setValue} />
    </div>)

}

export default AzureResources
