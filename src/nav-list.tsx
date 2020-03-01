import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CodeIcon from '@material-ui/icons/Code';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { IPageName } from "./App"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

const CODE_PAGES: [string, IPageName][] = [
    ["Worker Code", "WORKER",],
    ["Create Azure Resources", "AZURE-RESOURCES",],
    ["Build Docker Image", "DOCKER",],
    ["Run the Job", "CONTROLLER"],
    ["Clean Up", "CLEANUP"],
]

export default function NestedList(props: {
    setView: (x: IPageName) => void
}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Nested List Items
        </ListSubheader>
            }
            className={classes.root}
        >
            <ListItem button onClick={() => props.setView("OVERVIEW")}>
                <ListItemText primary="Overview" />
            </ListItem>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <CodeIcon />
                </ListItemIcon>
                <ListItemText primary="Tutorial" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {CODE_PAGES.map(([name, key]) => (

                        <ListItem button className={classes.nested} key={key} onClick={() => props.setView(key)}>
                            <ListItemText primary={name} />
                        </ListItem>

                    ))}
                </List>
            </Collapse>
            <ListItem button onClick={() => props.setView("API")}>
                <ListItemText primary="API" />
            </ListItem>
        </List>
    );
}
