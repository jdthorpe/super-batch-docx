import React, { useEffect } from "react"
import Prism from 'prismjs';
import raw from "raw.macro"
import ReactMarkdown from 'react-markdown'
const cleanup = raw("./cleanup.md")

export function Main() {
    useEffect(() => {
        return Prism.highlightAll();
    }, []);
    return (<ReactMarkdown source={cleanup} />)
}

export default Main