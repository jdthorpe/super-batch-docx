import React, { useEffect } from "react"
import ReactMarkdown from 'react-markdown'
import { makeStyles } from '@material-ui/core/styles';
/* eslint import/no-webpack-loader-syntax: off */
import raw from "raw.macro"
import Prism from 'prismjs';
const input = raw("./overview.md")

// const input = '# This is a header\n\nAnd this is a paragraph';


const useStyles = makeStyles(theme => ({
    root: {
        textAlign: "left"
    }
}));


export const APIPage = () => {
    const classes = useStyles();
  useEffect(() => Prism.highlightAll(), []);

    return (<div className={`markdown-body ${classes.root}`}>
        <ReactMarkdown source={input} />
    </div>)

}

export default APIPage 