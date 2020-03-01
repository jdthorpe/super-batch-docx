import React, { useEffect } from "react"
import Prism from 'prismjs';
import raw from "raw.macro"
import  ReactMarkdown from 'react-markdown'
const worker = raw( "./worker.md" )

export function Main(){
    useEffect(() => Prism.highlightAll(), []);
    return ( <ReactMarkdown source={worker} />)
}

export default Main