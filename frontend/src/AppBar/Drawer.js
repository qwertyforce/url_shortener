import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import LinkIcon from '@material-ui/icons/Link';
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import Drawer from '@material-ui/core/Drawer';
import theme from "./../theme";
import {Link} from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  // drawerPaper: {
  //   width: drawerWidth,
  // },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));



function AppDrawer (props) {
  const classes = useStyles();
  return (
    <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
      >
        <div className={classes.drawerHeader}>
          <h1>Url shortener</h1>
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <ListItem button component={Link} to="/"  >
          <ListItemIcon><LinkIcon /></ListItemIcon>
          <ListItemText>Shorten link</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/dashboard"  >
          <ListItemIcon><EqualizerIcon /></ListItemIcon>
          <ListItemText>Links statistics</ListItemText>
        </ListItem>
        </List>
        <Divider />
        <List>
        <ListItem button component={Link} to="/settings"  >
          <ListItemIcon><SettingsApplicationsOutlinedIcon/></ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </ListItem>
        </List>
      </Drawer>
  );
}
export default AppDrawer;
