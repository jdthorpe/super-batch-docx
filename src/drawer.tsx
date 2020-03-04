import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import NavList from "./nav-list";
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

export const drawerWidth = 220;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        nav: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        drawer:{
            display: "flex",
            flexDirection: "column",
            height: "100%"
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
            display: "block",
        },
    }),

);

interface ResponsiveDrawerProps {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    container?: Element;
    open: boolean;
    toggleOpen: ()=> void;

}

export default function ResponsiveDrawer(props: ResponsiveDrawerProps) {
    const classes = useStyles();
    const theme = useTheme();

    const drawer = (
        <div className={classes.drawer}>
            <div className={classes.toolbar} />
            <NavList/>
        </div >
    );

    return (

        <nav className={classes.nav} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={props.open}
                    onClose={props.toggleOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    );
}
