import React from "react"
import { CreateResources, GatherCredentials ,UsingACR   } from "./code-blocks"
import raw from "raw.macro"
import  ReactMarkdown from 'react-markdown'
const intro = raw( "./intro.md" )
const tip = raw( "./tip.md" )

const GATHER_CREDENTIALS = `
## Gather Resource Credentials

In order to run execute tasks in Azure batch, credentials for each of the
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


export function AzureResources(){
    const [value, setValue] = React.useState<number>(0);

    return (<>  
    <ReactMarkdown source={intro} />
    <CreateResources value={value} setValue={setValue}/>
    <ReactMarkdown source={tip} />

    <ReactMarkdown source={GATHER_CREDENTIALS} />
    <GatherCredentials value={value} setValue={setValue}/>

    <ReactMarkdown source={USING_ACR} />
    <UsingACR value={value} setValue={setValue}/>
    </>)

}

export default AzureResources
