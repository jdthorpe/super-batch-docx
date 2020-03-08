import React, { useState } from "react"
import copy from "clipboard-copy"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Controlled as CodeMirror } from 'react-codemirror2';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import Dialog from '@material-ui/core/Dialog';

import 'codemirror/mode/shell/shell'
import 'codemirror/mode/python/python'
import 'codemirror/mode/powershell/powershell'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

const editStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: "#eee",
            borderRadius: "0.3rem",
            "& .CodeMirror": {
                height: "auto",
                padding: "0.125rem",
                paddingLeft: "0.2rem",
                paddingRight: "0.2rem",
                borderRadius: "0.3rem"
            }
        },
        inner:{
            height:"calc(100% - 64px)",
            position:"relative",
        },
        dialog: {
            minWidth: "80vw",
            backgroundColor: "#fff",
            "& .CodeMirror": {
                height: "auto",
                padding: "0.125rem",
                paddingLeft: "0.2rem",
                paddingRight: "0.2rem",
            }
        },
        dialogCM: {
            overflow: "auto",
            maxHeight:"calc(100vh - 96px)"
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "1rem",
            paddingLeft: "1rem"
        },
        filename: {
            fontStyle: "italic",
            "& p": {
                marginBlockStart: "0",
                marginBlockEnd: "0",
            }
        },
        buttonMargin: {
            margin: theme.spacing(0.5),
        },
    }),
);




const ButtonNames = ["edit", "show", "copy",]

interface ICodeProps { language: string, value: string }

const CodeBlock: React.FC<ICodeProps> = (props) => {

    const lines: string[] = props.value.split("\n")
    const [value, setValue] = useState<string>(lines.slice(1).join("\n"));
    const [edit, setEdit] = useState<boolean>(false);
    const [justCopied, setJustCopied] = useState<boolean>(false);
    const classes = editStyles()

    // dialog: 
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => { setOpen(false) }

    if (!props.value.startsWith("#!")) {
        return (<CodeMirror
            options={{
                mode: props.language === "python" ? props.language : "shell",
                theme: "monokai"
            }}
            onBeforeChange={() => { /*pass*/ }}
            value={props.value} />)
    }
    const commands: string[] = lines[0].split(/\s+/)
    const buttons: string[] = commands.filter(x => ButtonNames.includes(x))
    const filename: string | null = commands[1].includes(".") ? commands[1] : null


    if (filename === null && !buttons.length) {
        return (<CodeMirror
            options={{
                mode: props.language === "python" ? props.language : "shell",
                theme: "monokai"
            }}
            onBeforeChange={() => { /*pass*/ }}
            value={props.value} />)
    }

    const handleCopy = () => {
        copy(value).then(() => {
            setJustCopied(true);
            setTimeout(() => setJustCopied(false), 2500);
        })
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.filename}>
                    {filename ? <p>{filename}</p> : null}
                </div>
                <div>
                    {buttons.includes("show") ?
                        <IconButton
                            aria-label="fullscreen"
                            className={classes.buttonMargin}
                            size="small"
                            onClick={() => setOpen(!open)}>
                            <FullscreenIcon fontSize="inherit" />
                        </IconButton>
                        : null}
                    {buttons.includes("copy") ?
                        <IconButton
                            aria-label="copy"
                            className={classes.buttonMargin}
                            size="small"
                            onClick={handleCopy}>
                            {justCopied ?
                                <CheckCircleOutlineIcon fontSize="inherit" />
                                : <FileCopyIcon fontSize="inherit" />}
                        </IconButton>
                        : null}
                    {buttons.includes("edit") ?
                        <IconButton
                            aria-label="edit"
                            className={classes.buttonMargin}
                            size="small"
                            onClick={() => setEdit(!edit)}>
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                        : null}
                </div>
            </div>
            <CodeMirror
                options={{
                    mode: props.language === "python" ? props.language : "shell",
                    theme: "monokai"
                }}
                onBeforeChange={(e, d, v) => { if (edit) { setValue(v) } }}
                value={value} />
            {buttons.includes("show") ?
                <Dialog
                    className={classes.dialog}
                    onClose={handleClose}
                    aria-labelledby="simple-dialog-title"
                    open={open}
                >

                    <div className={classes.inner}>
                        <div className={classes.header}>
                            <div className={classes.filename}>
                                {filename ? <p>{filename}</p> : null}
                            </div>
                            <div>
                                {buttons.includes("show") ?
                                    <IconButton
                                        aria-label="fullscreen"
                                        className={classes.buttonMargin}
                                        size="small"
                                        onClick={() => setOpen(!open)}>
                                        <FullscreenExitIcon fontSize="inherit" />
                                    </IconButton>
                                    : null}
                                {buttons.includes("copy") ?
                                    <IconButton
                                        aria-label="copy"
                                        className={classes.buttonMargin}
                                        size="small"
                                        onClick={handleCopy}>
                                        {justCopied ?
                                            <CheckCircleOutlineIcon fontSize="inherit" />
                                            : <FileCopyIcon fontSize="inherit" />}
                                    </IconButton>
                                    : null}
                                {buttons.includes("edit") ?
                                    <IconButton
                                        aria-label="edit"
                                        className={classes.buttonMargin}
                                        size="small"
                                        onClick={() => setEdit(!edit)}>
                                        <EditIcon fontSize="inherit" />
                                    </IconButton>
                                    : null}
                            </div>
                        </div>
                        <div className={classes.dialogCM}>

                            <CodeMirror
                                options={{
                                    mode: props.language === "python" ? props.language : "shell",
                                    theme: "monokai"
                                }}
                                onBeforeChange={(e, d, v) => { if (edit) { setValue(v) } }}
                                value={value} />
                        </div>
                    </div>

                </Dialog> : null}
        </div>)
}

export default CodeBlock