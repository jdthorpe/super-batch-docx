import React, { FC, useState } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Controlled as CodeMirror } from 'react-codemirror2';
import copy from "clipboard-copy"
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import RefreshIcon from '@material-ui/icons/Refresh';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import clsx from "clsx"


const TabPanel: FC<{ value: number, index: number }> = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </Typography>
    );
}


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        "& .CodeMirror": {
            "height": "auto",
            padding: "0.125rem",
            paddingLeft: "0.2rem",
            paddingRight: "0.2rem",
            borderRadius: "0.5rem"
        }
    },
    tabs: {
        justifyContent: "space-between"
    },
    active: {
        color: "#4785ff",
    },
    tab: {
        minWidth: "50px"
    },
    icon: {
        paddingRight: "1rem",
        display: "flex",
        justifyContent: "center"
    },
    appbar: {
        borderTopLeftRadius: "0.3rem",
        borderTopRightRadius: "0.3rem",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    code: {
        marginTop: "-10px",

        ' pre': {
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
        }
    },
    buttonMargin: {
        margin: theme.spacing(0.5),
    },
}));


const theme = createMuiTheme({
    overrides: {
        MuiTab: {
            root: {
                maxHeight: 32
            }
        }
    },
    palette: {
        primary: {
            main: '#ddd',
        },
        secondary: {
            main: '#ff63e5',
        },
        text: {
            primary: "#ff63e5",
            secondary: "#ff63e5",
        },

        contrastThreshold: 3,
    }

});

interface IProps {
    blocks: [string, string, string][], // [label, language, code]
    value: number,
    setValue: { (x: number): void }
}

export default function CodeTabs(props: IProps) {
    const classes = useStyles();
    const [justCopied, setJustCopied] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [code, setCode] = useState<string[]>(props.blocks.map(x => x[2]))
    const [activeTab, setActiveTab] = useState<number>(0)

    const handleCodeChange = (i: number, val: string) => {
        const newCode = [...code];
        newCode[i] = val
        setCode(newCode)

    }

    const handleChange = (event: any/*Material UI ChagneEvent*/, newValue: number) => {
        setActiveTab(newValue)
        props.setValue(newValue);
    };

    const handleReset = () => {
        const newCode = [...code];
        newCode[activeTab] = props.blocks[activeTab][2]
        setCode(newCode)
    }


    const handleCopy = () => {
        const block: string = props.blocks[props.value][2];
        copy(block).then(() => {
            setJustCopied(true);
            setTimeout(() => setJustCopied(false), 4000);
        })
    }

    return (
        <Box p={2} className={classes.root}>

            <ThemeProvider theme={theme}>
                <AppBar position="static" className={classes.appbar}>

                    <Tabs value={props.value}
                        style={{ width: "calc(100% - 44px)" }}
                        onChange={handleChange}
                        aria-label="simple tabs example">

                        {props.blocks.map(([Label,], index) => (
                            <Tab
                                label={Label}
                                color={"secondary"}
                                {...a11yProps(index)}
                                className={classes.tab}
                                key={index} />
                        ))}
                    </Tabs>
                    <IconButton
                        aria-label="fullscreen"
                        className={classes.buttonMargin}
                        size="small"
                        onClick={() => setShow(!show)}>
                        <FullscreenIcon fontSize="inherit" />
                    </IconButton>

                    <IconButton
                        aria-label="edit"
                        className={clsx(classes.buttonMargin, edit ? classes.active : null)}
                        size="small"
                        onClick={() => setEdit(!edit)}>
                        <EditIcon fontSize="inherit" />
                    </IconButton>

                    <IconButton
                        aria-label="edit"
                        className={classes.buttonMargin}
                        size="small"
                        onClick={handleReset}>
                        <RefreshIcon fontSize="inherit" />
                    </IconButton>

                    <IconButton
                        aria-label="edit"
                        className={classes.buttonMargin}
                        size="small"
                        onClick={handleCopy}>

                        {justCopied ?
                            <CheckCircleOutlineIcon fontSize="small" />
                            : <FileCopyIcon fontSize="small" />}

                    </IconButton>
                </AppBar>
            </ThemeProvider>
            {props.blocks.map(([, language,], index) => (
                <TabPanel value={props.value} index={index} key={index}>
                    <CodeMirror
                        options={{
                            mode: language,
                            theme: "monokai"
                        }}
                        onBeforeChange={(e, d, v) => { if (edit) { handleCodeChange(index, v) } }}
                        value={code[index]}
                    />
                </TabPanel>
            ))}
        </Box>
    );
}