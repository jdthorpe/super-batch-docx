import React from "react"
import { CreateResources, GatherCredentials ,UsingACR   } from "./code-blocks"
import raw from "raw.macro"
import  ReactMarkdown from 'react-markdown'
const intro = raw( "./intro.md" )
const tip = raw( "./tip.md" )

const GATHER_CREDENTIALS = `
_(Aside: since we're using the \`name\` for parameter for the resource group,
storage account and batch account, it must consist of 3-24 lower case,
letters and be unique across all of azure)_

## Gather Resource Credentials

In order to run our tasks in Azure batch, we need credentials for each of
the azure resources (e.g. azure batch, storage, and optionally the azure
container registry).  The strategy employed by this package is to log in to
the Azure CLI (\`az login\`) and export the necessary credentials as local
variables in the terminal session.

After exporting these credentials, when the controller is executed in the same
terminal session, super batch will read in credentials from local
environment.

This implements the security best practice of least privilege (as our code
only has the permissions to run a batch job and nothing more) and
compartmentalization (as the credentials only handled by \`az\` and are never
stored outside the terminal session).
`


const USING_ACR = `
## Using Azure Container Registry

If you wish to use a private Azure Container Registry, you'll also need to
export the following credentials:
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
