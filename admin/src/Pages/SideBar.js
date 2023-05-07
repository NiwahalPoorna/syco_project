import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link, Outlet } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: drawerWidth + theme.spacing(40),
  },
}));

function Sidebar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Company Name
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button component={Link} to="dashboard">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
        <List>
          <ListItem button component={Link} to="TaxUser">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Tax User" />
          </ListItem>
        </List>
        {/* <List>
          <ListItem button component={Link} to="bus">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Bus" />
          </ListItem>
        </List>
        <List>
          <ListItem button component={Link} to="root">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Bus Root" />
          </ListItem>
        </List>
        <List>
          <ListItem button component={Link} to="staff">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Staff" />
          </ListItem>
        </List>
        <List>
          <ListItem button component={Link} to="user">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="User" />
          </ListItem>
        </List> */}
      </Drawer>
      
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
