import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import clsx from 'clsx';
import theme from "./theme";
import {Switch,Route} from "react-router-dom";
import AppBar from "./AppBar/AppBar";
import Settings from "./Settings";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Home from "./Home";
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import './App.css';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
function App2(){
  const classes = useStyles();
  //Theme color/////////////////////////////////////////////////////////////
  const [DynamicTheme, setTheme] = React.useState(createMuiTheme(theme));
  const [theme_color, set_theme_color] = React.useState("light");
  const [DrawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleChangeTheme = () => {
    theme.palette.type = theme.palette.type === "light" ? "dark" : "light";
    localStorage.setItem("theme_color", theme.palette.type);
    setTheme(createMuiTheme(theme));
  };
  ///////////////////////////////////////////////////////////////////////////

    ////On start//////////////////////////////////////////////////////////////
    React.useEffect(() => {
      let theme_color_local = localStorage.getItem("theme_color");
      if (theme_color_local) {
         set_theme_color(theme_color_local)
      }else{
        localStorage.setItem("theme_color", theme_color);
       }
      if(theme_color_local==="dark"){
        handleChangeTheme()
       }
    }, []);
    ///////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////
  const DrawerProps={
    DrawerOpen:DrawerOpen,
    setDrawerOpen:setDrawerOpen,
    handleDrawerOpen:handleDrawerOpen,
    handleDrawerClose:handleDrawerClose
  }
    return (
    <ThemeProvider theme={DynamicTheme}>
      <CssBaseline />
      <div className={classes.root}>
      <AppBar {...DrawerProps}/>
      <Box my={4} className={clsx(classes.content, {[classes.contentShift]: DrawerOpen})}>

        <Switch>
                 <Route exact path="/">
                   <Home />
                 </Route>
                 <Route exact path="/dashboard">
                   <Dashboard />
                 </Route>
                 <Route exact path="/forgot_pw">
                   <ForgotPassword />
                 </Route>
                 <Route exact path="/change_pw/:token" component={ChangePassword} />
                 <Route exact path="/not_found">
                   <NotFound/>
                 </Route>
                 <Route path="/login">
                   <LoginForm/>
                 </Route>
                 <Route path="/signup">
                   <SignUpForm/>
                 </Route>
                 <Route path="/settings">
                   <Settings handleChangeTheme={handleChangeTheme} />
                 </Route>
        </Switch>
        </Box>
      </div>
       </ThemeProvider>
    )
}
export default App2;
