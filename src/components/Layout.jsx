import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { CssBaseline, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import EventNoteRoundedIcon from '@material-ui/icons/EventNoteRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Box, Container, Paper, Tooltip, Zoom } from '@material-ui/core';
import { HomeRounded } from '@material-ui/icons';
import moment from 'moment';
import { WeekContext } from '../contexts/WeekContext';
import { AuthContext } from '../contexts/AuthContext';
import { firebaseApp } from '../firebase/firebaseConfig';

const drawerWidth = 135;

const drawers = [
  {
    key: 'My Week',
    path: '/my-week',
    icon: EventNoteRoundedIcon,
    public: true
  },
  {
    key: 'Schedule',
    path: '/schedule',
    icon: AccessTimeIcon
  },

  {
    key: 'Tasks',
    path: '/tasks',
    icon: AssignmentIndIcon
  },
  {
    key: 'Room Tasks',
    path: '/room-tasks',
    icon: AssignmentIcon
  },
  {
    key: 'Staff',
    path: '/staff',
    icon: PeopleAltRoundedIcon
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 0
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    height: '100vh'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(6) - 1
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1)
  },
  sectionDesktop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  currentWeek: {
    borderRadius: 50,
    padding: 0,
    border: 0,
    backgroundColor: theme.palette.primary.light,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.fontSize - 2
    }
  },
  icon: {
    minWidth: '30px'
  },
  logout: {
    color: theme.palette.error.main
  },
  login: {
    color: theme.palette.primary.main
  },
  footer: {
    paddingTop: theme.spacing(4) - 2
  },
  listItem: {
    backgroundColor: theme.palette.primary.light + ' !important',
    fontWeight: 'bold'
  }
}));

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default function Layout(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const { startOfWeek, setStartOfWeek, currentWeek } = useContext(WeekContext);
  const { currentUser } = useContext(AuthContext);

  React.useEffect(() => {
    if (window.innerWidth < 600) {
      setOpen(false);
    }
  }, []);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const nextWeek = () => {
    const nextWeek = moment(startOfWeek).add(1, 'week');
    setStartOfWeek(nextWeek);
  };

  const prevWeek = () => {
    const prevWeek = moment(startOfWeek).subtract(1, 'week');
    setStartOfWeek(prevWeek);
  };

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? true : false;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar style={{ maxWidth: '100hv' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              history.push('/');
            }}
            style={{ marginLeft: 0 }}
          >
            <HomeRounded fontSize="small" />
          </IconButton>

          <Box display={{ xs: 'none', md: 'block' }} padding={2}>
            <Typography variant="h6">{`Montessori Children's Garden Scheduler`}</Typography>
          </Box>
          <div className={classes.grow} />
          <Box className={classes.sectionDesktop}>
            <Paper className={classes.currentWeek}>
              <IconButton onClick={prevWeek}>
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
              {currentWeek}
              <IconButton onClick={nextWeek}>
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Paper>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <List>
          {currentUser && (
            <>
              {drawers.map((drawer) => {
                return (
                  <div key={drawer.key}>
                    <Divider variant="fullWidth" />
                    <Tooltip title={open ? '' : drawer.key} placement="right" TransitionComponent={Zoom}>
                      <ListItem
                        button
                        onClick={() => history.push(drawer.path)}
                        dense
                        selected={activeRoute(drawer.path)}
                        classes={{ selected: classes.listItem }}
                      >
                        <ListItemIcon className={classes.icon}>
                          <drawer.icon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={drawer.key} />
                      </ListItem>
                    </Tooltip>
                  </div>
                );
              })}

              <div className={classes.footer}>
                <Divider variant="fullWidth" />
                <Tooltip title={open ? '' : 'Logout'} placement="right" TransitionComponent={Zoom}>
                  <ListItem button key="Logout" onClick={() => firebaseApp.auth().signOut()} dense>
                    <ListItemIcon className={classes.icon}>
                      <ExitToAppIcon color="error" style={{ transform: 'rotate(-180deg)' }} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" className={classes.logout} />
                  </ListItem>
                </Tooltip>
              </div>
            </>
          )}

          {!currentUser && (
            <>
              {drawers.map((drawer) => {
                if (!drawer.public) return null;
                return (
                  <div key={drawer.key}>
                    <Divider variant="fullWidth" />
                    <Tooltip title={open ? '' : drawer.key} placement="right" TransitionComponent={Zoom}>
                      <ListItem
                        button
                        onClick={() => history.push(drawer.path)}
                        dense
                        selected={activeRoute(drawer.path)}
                        classes={{ selected: classes.listItem }}
                      >
                        <ListItemIcon className={classes.icon}>
                          <drawer.icon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={drawer.key} />
                      </ListItem>
                    </Tooltip>
                  </div>
                );
              })}
              <div className={classes.footer}>
                <Divider variant="fullWidth" />
                <Tooltip title={open ? '' : 'Login'} placement="right" TransitionComponent={Zoom}>
                  <ListItem button key="Login" onClick={() => history.push('/login')} dense>
                    <ListItemIcon className={classes.icon}>
                      <ExitToAppIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Login" className={classes.login} />
                  </ListItem>
                </Tooltip>
              </div>
            </>
          )}
        </List>
      </Drawer>

      <Container className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </Container>
    </div>
  );
}
