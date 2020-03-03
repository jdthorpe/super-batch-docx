import React, { FC, useEffect } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import copy from "clipboard-copy"
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs';


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

    },
    tabs: {
        justifyContent: "space-between"
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
    }
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


const CodeBlock = (props: { code: string }) => {

    useEffect(() => Prism.highlightAll(), []);

    const classes = useStyles();
    return (<ReactMarkdown source={props.code} className={classes.code} />)

}

interface IProps {
    blocks: [string, string][],
    value: number,
    setValue: { (x: number): void }
}

export default function CodeTabs(props: IProps) {
    const classes = useStyles();

    const handleChange = (event: any/*Material UI ChagneEvent*/, newValue: number) => {
        props.setValue(newValue);
    };

    return (
        <Box p={2} className={classes.root}>

            <ThemeProvider theme={theme}>
                <AppBar position="static" className={classes.appbar}>

                    <Tabs value={props.value}
                        style={{ width: "calc(100% - 44px)" }}
                        onChange={handleChange}
                        aria-label="simple tabs example">

                        {props.blocks.map(([language,], index) => (
                            <Tab label={language} color={"secondary"} {...a11yProps(index)} className={classes.tab} />
                        ))}
                    </Tabs>
                    <div className={classes.icon}
                        onClick={() => copy(props.blocks[props.value][1].trim().split('\n').slice(1,-1).join("\n")).then(() => alert('success'))}>
                        <FileCopyIcon fontSize="small" />
                    </div>
                </AppBar>
            </ThemeProvider>
            {props.blocks.map(([, code], index) => (
                <TabPanel value={props.value} index={index}>
                    <CodeBlock code={code} />
                </TabPanel>
            ))}
        </Box>
    );
}