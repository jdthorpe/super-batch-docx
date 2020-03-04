import React, { useEffect } from "react"
import Prism from 'prismjs';
import raw from "raw.macro"
import ReactMarkdown, {ReactMarkdownProps}  from 'react-markdown'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const API = build(raw("./md/api.md"));
export const CleanUp = build(raw("./md/cleanup.md"));
export const Refactoring = build(raw("./md/refactoring.md"));
export const Controller = build(raw("./md/controller.md"));
export const Docker = build(raw("./md/docker.md"));
export const FAQ = build(raw("./md/faq.md"));
export const Overview = build(raw("./md/overview.md"));
export const Worker = build(raw("./md/worker.md"));

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& p code": {
                backgroundColor: "#cadceb",
                padding: "0.125rem",
                paddingLeft: "0.2rem",
                paddingRight: "0.2rem",
                borderRadius: "0.125rem"
            }
        }
    }),
);

export const StyledMarkdown: React.FC<ReactMarkdownProps> = (props) => {
    const classes = useStyles()
    return (<div className={classes.root}>
        <ReactMarkdown {...props} />
    </div>)

}

function build(source: string): React.FC {
    return () => {
        useEffect(() => {
            return Prism.highlightAll();
        }, []);
        return ( <StyledMarkdown source={source} escapeHtml={false} />)
    }
}
