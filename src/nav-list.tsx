import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import clsx from "clsx"
import { IPageName } from "./App"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        drawer: {
            backgroundColor:"#49494d",
            color:"#e6e6eb",
            paddingLeft:".8rem",
            paddingTop:".8rem",
            height:"100%"
        },
        item: {
            fontSize: 13,
            padding: theme.spacing(0.5, 0, 0.5, 1),
            borderLeft: '4px solid transparent',
            boxSizing: 'content-box',
            '&:hover': {
                borderLeft: `4px solid ${
                    theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
                    }`,
            },
        },
        itemSecondary: {
            paddingLeft: "1.6rem"
        },
        ul: {
            padding: 0,
            margin: 0,
            listStyle: 'none',
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
        <div className={classes.drawer}>
            <Typography
                component="ul"
                aria-labelledby="nested-list-subheader"
                className={classes.ul}
            >
                <li className={classes.item} onClick={() => props.setView("OVERVIEW")}>
                    <ListItemText primary="Overview" />
                </li>
                <li className={classes.item} onClick={handleClick}>
                    <ListItemText primary="Tutorial" />
                </li>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <ul className={classes.ul}>
                        {CODE_PAGES.map(([name, key]) => (

                            <li className={clsx(classes.item, classes.itemSecondary)} key={key} onClick={() => props.setView(key)}>
                                {name}
                            </li>

                        ))}
                    </ul>
                </Collapse>
                <li className={classes.item} onClick={() => props.setView("FAQ")}>
                    <ListItemText primary="FAQ" />
                </li>
                <li className={classes.item} onClick={() => props.setView("API")}>
                    <ListItemText primary="API" />
                </li>
            </Typography>
        </div>
    );
}
