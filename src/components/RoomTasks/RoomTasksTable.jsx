import {
  TableContainer,
  TableHead,
  TableBody,
  Table,
  TableCell,
  TableRow,
  Paper,
  Grid,
  makeStyles,
  Tooltip,
  IconButton
} from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

import { useState } from 'react';
import AssignTaskDialog from '../Tasks/AssignTaskDialog';
import CreateTaskDialog from '../Tasks/CreateTaskDialog';

const dayHeaders = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const dayKeys = [0, 1, 2, 3, 4];
const roomKeys = ['Blue', 'Purple', 'Red', 'Yellow'];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(0),
    width: '100%',
    height: '100%'
  },
  Purple: {
    backgroundColor: '#b19cd9',
    fontWeight: 'bold'
  },
  Blue: {
    backgroundColor: '#86d8f7',
    fontWeight: 'bold'
  },
  Yellow: {
    backgroundColor: '#fdfd96',
    fontWeight: 'bold'
  },
  Red: {
    backgroundColor: '#ff817b',
    fontWeight: 'bold'
  },
  tableHeaderCellCheckbox: {
    backgroundColor: '#f4f4f4',
    padding: 2
    // width: '10%'
  },
  tableHeaderCell: {
    borderLeft: '1px dotted #aaa',
    borderRight: '1px dotted #aaa',

    // width: '12%',
    minWidth: 100,
    color: theme.palette.primary.dark,
    backgroundColor: '#f4f4f4',
    fontWeight: 'bold',
    fontSize: 14
  },
  tableBodyCell: {
    borderLeft: '1px dotted #aaa',
    borderRight: '1px dotted #aaa',
    padding: 5,
    minWidth: 100,
    fontSize: 12,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      cursor: 'pointer'
    }
  },
  lastRoomRow: {
    borderBottom: '3px dotted #aaa'
  },
  chip: {
    margin: theme.spacing(0.2),
    fontSize: 11,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      cursor: 'pointer'
    }
  },
  paperUl: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.2),
    margin: 0,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      cursor: 'pointer'
    }
  }
}));

const RoomTasksTable = ({ stateTasks, assignTask, addTaskRow }) => {
  const classes = useStyles();
  const [currentRecord, setCurrentRecord] = useState({
    taskName: '',
    weekDay: '',
    room: '',
    assignees: []
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const handleCellClick = (taskName, room, weekDay, assignees) => {
    setCurrentRecord({
      taskName,
      weekDay,
      room,
      assignees
    });
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseTaskDialog = () => {
    setTaskDialogOpen(false);
  };

  return (
    <>
      <div style={{ height: '100%', width: '100%' }}>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={classes.tableHeaderCellCheckbox}>
                    <Tooltip title="Add Staff">
                      <IconButton onClick={() => setTaskDialogOpen(true)}>
                        <AddCircleRoundedIcon color="primary" fontSize="large" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>

                  {dayHeaders.map((day) => {
                    return (
                      <TableCell align="center" className={classes.tableHeaderCell} key={day}>
                        {day}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(stateTasks).map((taskNameKey) => {
                  const task = stateTasks[taskNameKey];
                  return roomKeys.map((roomName, roomIndx) => {
                    const room = task[roomName] || [];
                    return (
                      <TableRow
                        key={taskNameKey + roomName}
                        className={roomIndx === roomKeys.length - 1 ? classes.lastRoomRow : ''}
                      >
                        <TableCell className={classes[roomName]} align="center">
                          {taskNameKey}
                        </TableCell>
                        {dayKeys.map((dayKey) => {
                          const asignees = room[dayKey] || [];
                          return (
                            <TableCell
                              className={classes.tableBodyCell}
                              key={taskNameKey + roomName + dayKey}
                              onClick={() => handleCellClick(taskNameKey, roomName, dayKey, asignees)}
                            >
                              <Grid container direction="row" justify="center" alignItems="center">
                                <div component="ul" className={classes.paperUl}>
                                  {asignees.map((assignee, index) => {
                                    return (
                                      <li key={assignee}>
                                        {assignee}
                                        {index === asignees.length - 1 ? '' : ' /'}&nbsp;
                                      </li>
                                    );
                                  })}
                                </div>
                              </Grid>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  });
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <AssignTaskDialog
        dialogOpen={dialogOpen}
        handleCloseDialog={handleCloseDialog}
        initialData={currentRecord}
        assignTask={assignTask}
      ></AssignTaskDialog>

      <CreateTaskDialog
        dialogOpen={taskDialogOpen}
        handleCloseDialog={handleCloseTaskDialog}
        addTaskRow={addTaskRow}
      ></CreateTaskDialog>
    </>
  );
};

export default RoomTasksTable;
