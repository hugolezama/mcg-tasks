import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { firebaseApp } from '../firebase/firebaseConfig';
import { WeekContext } from '../contexts/WeekContext';
import { AuthContext } from '../contexts/AuthContext';
import moment from 'moment';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Box,
  Container,
  Paper,
  Tooltip,
  Zoom,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import ConfirmationDialog from './Common/ConfirmationDialog';
import { AiOutlineSchedule } from 'react-icons/ai';
import { SiGoogleclassroom } from 'react-icons/si';

import { BiTask, BiCalendarWeek, BiLogIn, BiLogOut, BiMale, BiGroup } from 'react-icons/bi';
import { GoNote } from 'react-icons/go';
const drawerWidth = 135;

const drawers = [
  {
    key: 'My Week',
    path: '/',
    icon: BiCalendarWeek,
    public: true
  },
  {
    key: 'Week Notes',
    path: '/notes',
    icon: GoNote,
    public: true
  },
  {
    key: 'Schedule',
    path: '/schedule',
    icon: AiOutlineSchedule
  },

  {
    key: 'Tasks',
    path: '/tasks',
    icon: BiTask
  },
  {
    key: 'Room Tasks',
    path: '/room-tasks',
    icon: SiGoogleclassroom
  },
  {
    key: 'Staff',
    path: '/staff',
    icon: BiGroup
  },
  {
    key: 'Settings',
    path: '/settings',
    icon: SettingsIcon
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
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
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
  listIcon: {
    minWidth: '30px',
    paddingLeft: 0
  },
  icon: {
    color: theme.palette.secondary.main
  },
  loginIcon: {
    color: theme.palette.primary.main
  },
  logoutIcon: {
    color: theme.palette.error.main
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
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2)
    }
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
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const { startOfWeek, setStartOfWeek, currentWeek, validateWeekCreated, createWeekFromBase } = useContext(WeekContext);
  const { currentUser, setCurrentUser } = useContext(AuthContext);

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

  const nextWeek = async () => {
    const nWeek = moment(startOfWeek).add(1, 'week');
    const res = await validateWeekCreated(nWeek);
    console.log(res);
    if (res) {
      setStartOfWeek(nWeek);
    } else {
      if (localStorage.getItem('user')) {
        setConfirmationOpen(true);
      }
    }
  };

  const prevWeek = () => {
    setStartOfWeek(moment(startOfWeek).subtract(1, 'week'));
  };

  const handleLogout = () => {
    firebaseApp.auth().signOut();
    localStorage.removeItem('user');
    setCurrentUser(null);
    history.push('/login');
  };

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? true : false;
  };

  const cancelConfirmationDialog = () => {
    setConfirmationOpen(false);
  };

  const createNextWeek = async () => {
    const nWeek = moment(startOfWeek).add(1, 'week');
    await createWeekFromBase(nWeek);
    setStartOfWeek(nWeek);
    cancelConfirmationDialog();
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
                    <Tooltip title={open ? '' : drawer.key} placement="right" TransitionComponent={Zoom}>
                      <ListItem
                        button
                        onClick={() => history.push(drawer.path)}
                        dense
                        selected={activeRoute(drawer.path)}
                        classes={{ selected: classes.listItem }}
                      >
                        <ListItemIcon className={classes.listIcon}>
                          <drawer.icon className={classes.icon} size="25" />
                        </ListItemIcon>
                        <ListItemText primary={drawer.key} />
                      </ListItem>
                    </Tooltip>
                    <Divider variant="fullWidth" />
                  </div>
                );
              })}
              <div style={{ flexGrow: 2 }}> </div>
              <div className={classes.footer}>
                <Tooltip title={open ? '' : 'Logout'} placement="right" TransitionComponent={Zoom}>
                  <ListItem button key="Logout" onClick={handleLogout} dense>
                    <ListItemIcon className={classes.listIcon}>
                      <BiLogOut className={classes.logoutIcon} size="25" />
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
                    <Tooltip title={open ? '' : drawer.key} placement="right" TransitionComponent={Zoom}>
                      <ListItem
                        button
                        onClick={() => history.push(drawer.path)}
                        dense
                        selected={activeRoute(drawer.path)}
                        classes={{ selected: classes.listItem }}
                      >
                        <ListItemIcon className={classes.listIcon}>
                          <drawer.icon color="secondary" size="25" />
                        </ListItemIcon>
                        <ListItemText primary={drawer.key} />
                      </ListItem>
                    </Tooltip>
                    <Divider variant="fullWidth" />
                  </div>
                );
              })}
              <div className={classes.footer}>
                <Tooltip title={open ? '' : 'Login'} placement="right" TransitionComponent={Zoom}>
                  <ListItem button key="Login" onClick={() => history.push('/login')} dense>
                    <ListItemIcon className={classes.listIcon}>
                      <BiLogIn className={classes.loginIcon} size="25" />
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
        <ConfirmationDialog
          openDialog={confirmationOpen}
          title={'Create Next Week?'}
          content={"Next week doesn't exist, do you want to create it using the BASE week?"}
          handleCancel={cancelConfirmationDialog}
          handleAccept={createNextWeek}
        />
      </Container>
    </div>
  );
}
