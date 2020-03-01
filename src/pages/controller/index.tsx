import React, { useEffect } from "react"
import Prism from 'prismjs';
import raw from "raw.macro"
import  ReactMarkdown from 'react-markdown'
const controller = raw( "./controller.md" )

export function Main(){
    useEffect(() => Prism.highlightAll(), []);
    return ( <ReactMarkdown source={controller} />)
}

export default Main