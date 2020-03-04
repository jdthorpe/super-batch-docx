/// <reference path="./github-tag.d.ts" />

import React, { useState } from 'react';
import './App.css';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import GitHubForkRibbon from "react-github-fork-ribbon"

import 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-batch';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-docker';
import 'prismjs/themes/prism-okaidia.css';
import AzureResources from "./pages/azure-resources"
import Drawer, { drawerWidth } from "./drawer"
import { IconButton } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu"

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import {
  API,
  CleanUp,
  Controller,
  Refactoring,
  Docker as DockerBuild,
  FAQ,
  Overview,
  Worker
} from "./pages"


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#44a2ff',
    },
    secondary: {
      main: '#b068f7',
    }

  }
});

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  menuButton: {
    color: "#eee",
    marginRight: theme.spacing(2),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 101,
  },
  toolbar: theme.mixins.toolbar,
  toolbarOption: {
    marginLeft: "1rem"
  },
  logo: {
    color: "#f5c816"
  },
  main: {
    '& pre': {
      overflowX: "auto"
    },
    [theme.breakpoints.up('sm')]: {
      width: `calc(100vw - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down('xs')]: {
      width: `100vw`,
    },
    flexGrow: 1,
    padding: "2rem",
    paddingTop: "0",
    textAlign: "left",
  }
}));

export type IRouteName =
  | "/api"
  | "/create-resources"
  | "/cleanup"
  | "/controller"
  | "/refactoring"
  | "/building-with-docker"
  | "/"
  | "/worker"
  | "/faq";


function App() {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (

    <Router>
      <div className={classes.root}>



        <CssBaseline />

        <ThemeProvider theme={theme}>

          <AppBar position="fixed" className={classes.appBar}>

            <Hidden xsDown implementation="css">
              <GitHubForkRibbon href="//github.com/microsoft/simplify-docx"
                target="_blank"
                position="right"
                color="black">
                Fork me on GitHub
              </GitHubForkRibbon>
            </Hidden>
            <Toolbar>

              <Hidden smUp implementation="css">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon
                    fontSize="large"
                  />
                </IconButton>
              </Hidden>

              <Typography variant="h4" noWrap className={classes.logo}>
                SuperBatch
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer open={mobileOpen} toggleOpen={handleDrawerToggle} />
          <div className={classes.toolbar} />

          <div className={classes.main}>

            <Switch>
              <Route exact={true} path="/api"> <API /></Route>
              <Route exact={true} path="/create-resources"> <AzureResources /></Route>
              <Route exact={true} path="/cleanup"> <CleanUp /></Route>
              <Route exact={true} path="/controller"> <Controller /></Route>
              <Route exact={true} path="/refactoring"> <Refactoring /></Route>
              <Route exact={true} path="/building-with-docker"> <DockerBuild /></Route>
              <Route exact={true} path="/"> <Overview /></Route>
              <Route exact={true} path="/worker"> <Worker /></Route>
              <Route exact={true} path="/faq"> <FAQ /></Route>
            </Switch>
          </div>

        </ThemeProvider >

      </div>
    </Router>
  );
}

export default App;
