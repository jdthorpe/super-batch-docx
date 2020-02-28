import React,{useEffect} from "react"
import  ReactMarkdown from 'react-markdown'
/* eslint import/no-webpack-loader-syntax: off */
import raw from "raw.macro"
import Prism from 'prismjs';
const input = raw( "./overview-part-1.md" )

// const input = '# This is a header\n\nAnd this is a paragraph';

export const APIPage = () => {
      
  useEffect(() => Prism.highlightAll(), []);
    return <ReactMarkdown source={input} />

}

export default APIPage 