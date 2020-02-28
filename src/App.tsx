/// <reference path="./github-tag.d.ts" />

import React, { useState, useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import GitHubForkRibbon from "react-github-fork-ribbon"
import APIPage from "./pages/api"
import OverviewPage from "./pages/readme"
// import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-batch';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-docker';
import 'prismjs/themes/prism-okaidia.css';


const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
  toolbarOption: {
    marginLeft: "1rem"
  },
  toolbarBG: {color:"#8742f5"},
  logo: {
    color: "#f5c816"
  }
,
  main: {
    margin: "2.5rem",
    marginTop: "1.5rem",
  }
}));

type PAGE_NAME = "API_PAGE" | "OVERVIEW_PAGE"

function App() {
  const classes = useStyles();

  const [selectedView, setSelectedView] = useState<PAGE_NAME>("OVERVIEW_PAGE")

  return (
    <div className="App">
      <CssBaseline />

      <AppBar position="fixed" className={classes.appBar}>
        <GitHubForkRibbon href="//github.com/microsoft/simplify-docx"
          target="_blank"
          position="right"
          color="black">
          Fork me on GitHub
          </GitHubForkRibbon>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.logo}>
            SuperBatch
          </Typography>
          <Typography variant="h6" noWrap onClick={() => setSelectedView("OVERVIEW_PAGE")} className={classes.toolbarOption}>
            Overview
          </Typography>
          <Divider />
          <Typography variant="h6" noWrap onClick={() => setSelectedView("API_PAGE")} className={classes.toolbarOption}>
            API
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
      <div className={classes.main}>
        {selectedView === "OVERVIEW_PAGE" ? <OverviewPage /> : <APIPage />}
      </div>
    </div>
  );
}

export default App;
