import React, { useEffect } from "react"
import ReactMarkdown from 'react-markdown'
/* eslint import/no-webpack-loader-syntax: off */
import Prism from 'prismjs';
import raw from "raw.macro"
const api = raw("./api.md")

export const APIPage = () => {
  useEffect(() => Prism.highlightAll(), []);
  return <ReactMarkdown source={api} />
}

export default APIPage 