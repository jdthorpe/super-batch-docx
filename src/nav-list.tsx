import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import clsx from "clsx"
import { IRouteName } from "./App"
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            backgroundColor: "#49494d",
            color: "#e6e6eb",
            paddingLeft: ".8rem",
            paddingTop: ".8rem",
            height: "100%",
            "& a": {
                "color": "inherit",
                "text-decoration": "none",
                "outline": "none",
            }

        },
        item: {
            fontSize: 13,
            padding: theme.spacing(0.5, 0, 0.5, 1),
            borderLeft: '4px solid transparent',
            boxSizing: 'content-box',
            '&:hover': {
                borderLeft: `4px solid ${
                    theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[500]
                    }`,
            },
        },
        active: {
            borderLeft: `4px solid ${
                theme.palette.type === 'light' ? theme.palette.grey[500] : theme.palette.grey[900]
                }`,
        },
        itemSecondary: {
            paddingLeft: "1.6rem"
        },
        ul: {
            padding: 0,
            margin: 0,
            listStyle: 'none',
            textDecoration: "none",
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        link: {
            textDecoration: "none",
        }
    }),
);

const CODE_PAGES: [string, IRouteName][] = [
    ["Create Azure Resources", "/create-resources",],
    ["Refactoring your Code", "/refactoring",],
    ["The Task Worker", "/worker",],
    ["Build the Docker Image", "/building-with-docker",],
    ["The Controller", "/controller"],
    ["Clean Up", "/cleanup"],
]

//   "/api"
//   "/"
//   "/worker"
//   "/faq";


const NestedList: React.SFC<RouteComponentProps> = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    console.log("nav-props:")
    console.dir(props)

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
                <Link to="/" className={classes.link} style={{ textDecoration: 'none', color: "inherit" }}>
                    <li className={clsx(classes.item, props.location.pathname === "/" ? classes.active : null)} >
                        <ListItemText primary="Overview" />
                    </li>
                </Link>
                <li className={classes.item} onClick={handleClick}>
                    <ListItemText primary="Tutorial" />
                </li>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <ul className={classes.ul}>
                        {CODE_PAGES.map(([name, key]) => (
                            <Link to={key} key={key}>
                                <li className={clsx(classes.item,
                                    classes.itemSecondary,
                                    props.location.pathname === key ? classes.active : null)}
                                    key={key} >
                                    {name}
                                </li>
                            </Link>

                        ))}
                    </ul>
                </Collapse>
                <Link to="/faq">
                    <li className={clsx(classes.item, props.location.pathname === "/faq" ? classes.active : null)} >
                        <ListItemText primary="FAQ" />
                    </li>
                </Link>
                <Link to="/api">
                    <li className={clsx(classes.item, props.location.pathname === "/api" ? classes.active : null)} >
                        <ListItemText primary="API" />
                    </li>
                </Link>
            </Typography>
        </div>
    );
}

export default withRouter(NestedList)