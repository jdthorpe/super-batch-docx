import React, { useEffect } from "react"
import Prism from 'prismjs';
import raw from "raw.macro"
import  ReactMarkdown from 'react-markdown'
const docker = raw( "./docker.md" )

export function Main(){
    useEffect(() => Prism.highlightAll(), []);
    return ( <ReactMarkdown source={docker} />)
}

export default Main
