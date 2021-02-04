import React, { useContext, useState } from 'react';
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
import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { Box, Container, Paper, Tooltip } from '@material-ui/core';

import moment from 'moment';
import { WeekContext } from '../contexts/WeekContext';
const drawerWidth = 170;

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
    marginRight: 36
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
    width: theme.spacing(7) + 1
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
    backgroundColor: theme.palette.primary.light
  }
}));

export default function Layout(props) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(true);

  const { startOfWeek, setStartOfWeek, currentWeek } = useContext(WeekContext);

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
          <Box display={{ xs: 'none', md: 'inline-block' }}>
            <Typography variant="h5" noWrap>
              Montessori Children's Garden Scheduler
            </Typography>
          </Box>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Paper className={classes.currentWeek}>
              <IconButton onClick={prevWeek}>
                <ChevronLeftIcon />
              </IconButton>
              {currentWeek}
              <IconButton onClick={nextWeek}>
                <ChevronRightIcon />
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
          <Box display={{ xs: 'none', sm: 'inline-block' }}>
            <img src="/logomini2.jpg" width="115" height="90" alt="MCG Logo" hidden={!open}></img>
          </Box>

          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <List>
          <ListItem button key="Schedule" onClick={() => history.push('/schedule')} dense>
            <ListItemIcon>
              <EventNoteRoundedIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Schedule" />
          </ListItem>
          <Divider variant="middle" />
          <ListItem button key="Staff" onClick={() => history.push('/staff')} dense>
            <ListItemIcon>
              <PeopleAltRoundedIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Staff" />
          </ListItem>
          <Divider variant="middle" />
          <ListItem button key="Tasks" onClick={() => history.push('/tasks')} dense>
            <ListItemIcon>
              <AssignmentIndIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItem>
          <Divider variant="middle" />
          <Tooltip title="Room Tasks">
            <ListItem button key="RoomTasks" onClick={() => history.push('/room-tasks')} dense>
              <ListItemIcon>
                <AssignmentTurnedInRoundedIcon color="secondary" />
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
