import React, { } from "react"
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import toc from "remark-toc"
import CodeBlock from "./code-block"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& p code": {
                backgroundColor: "#cadceb",
                padding: "0.125rem",
                paddingLeft: "0.2rem",
                paddingRight: "0.2rem",
                borderRadius: "0.2rem"
            },
            "& .CodeMirror": {
                "height": "auto",
                padding: "0.125rem",
                paddingLeft: "0.2rem",
                paddingRight: "0.2rem",
                borderRadius: "0.5rem"

            }
        }
    }),
);

const StyledMarkdown: React.FC<ReactMarkdownProps> = (props) => {
    const classes = useStyles()
    return (<div className={classes.root}>
        <ReactMarkdown {...props} plugins={[toc]} renderers={{ "code": CodeBlock }} />
    </div>)
}

export default StyledMarkdown
