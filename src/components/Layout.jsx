import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
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
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import AssignmentIcon from '@material-ui/icons/Assignment';
import { Box, Container, Paper, Tooltip, Zoom } from '@material-ui/core';

import moment from 'moment';
import { WeekContext } from '../contexts/WeekContext';
import { HomeRounded } from '@material-ui/icons';
const drawerWidth = 140;

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
    backgroundColor: theme.palette.primary.light,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.fontSize - 2
    }
  },
  icon: {
    minWidth: '30px'
  }
}));

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default function Layout(props) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(true);

  const { startOfWeek, setStartOfWeek, currentWeek } = useContext(WeekContext);

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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
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
          >
            <HomeRounded fontSize="small" />
          </IconButton>

          <Box display={{ xs: 'none', md: 'block' }} padding={2}>
            <Typography variant="h6">{`Montessori Children's Garden Scheduler`}</Typography>
          </Box>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Paper className={classes.currentWeek}>
              <IconButton onClick={prevWeek}>
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
              {currentWeek}
              <IconButton onClick={nextWeek}>
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Paper>
          </div>
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
          <Tooltip title={open ? '' : 'My Week'} placement="right" TransitionComponent={Zoom}>
            <ListItem button key="MyWeek" onClick={() => history.push('/my-week')} dense>
              <ListItemIcon className={classes.icon}>
                <EventNoteRoundedIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="My Week" />
            </ListItem>
          </Tooltip>
          <Divider variant="middle" />
          <Tooltip title={open ? '' : 'Schedule'} placement="right" TransitionComponent={Zoom}>
            <ListItem button key="Schedule" onClick={() => history.push('/schedule')} dense>
              <ListItemIcon className={classes.icon}>
                <AccessTimeIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Schedule" />
            </ListItem>
          </Tooltip>

          <Divider variant="middle" />
          <Tooltip title={open ? '' : 'Staff'} placement="right" TransitionComponent={Zoom}>
            <ListItem button key="Staff" onClick={() => history.push('/staff')} dense>
              <ListItemIcon className={classes.icon}>
                <PeopleAltRoundedIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Staff" />
            </ListItem>
          </Tooltip>
          <Divider variant="middle" />
          <Tooltip title={open ? '' : 'Tasks'} placement="right" TransitionComponent={Zoom}>
            <ListItem button key="Tasks" onClick={() => history.push('/tasks')} dense>
              <ListItemIcon className={classes.icon}>
                <AssignmentIndIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItem>
          </Tooltip>
          <Divider variant="middle" />
          <Tooltip title={open ? '' : 'Room Tasks'} placement="right" TransitionComponent={Zoom}>
            <ListItem button key="RoomTasks" onClick={() => history.push('/room-tasks')} dense>
              <ListItemIcon className={classes.icon}>
                <AssignmentIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Room Tasks" />
            </ListItem>
          </Tooltip>
        </List>
      </Drawer>

      <Container className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </Container>
    </div>
  );
}
