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
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AssignTaskDialog from './AssignTaskDialog';
import CreateTaskDialog from './CreateTaskDialog';

const dayHeaders = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const dayKeysArray = [0, 1, 2, 3, 4];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(0),
    width: '100%',
    height: '100%'
  },

  tableHeaderCellCheckbox: {
    backgroundColor: '#f4f4f4',
    padding: 2
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
  tableBodyCellCheckbox: {
    backgroundColor: '#f4f4f4',
    fontWeight: 'bold'
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
  timeCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'blue',
    height: '100%',
    width: '100%'
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

TasksTable.propTypes = {
  addTaskRow: PropTypes.func.isRequired,
  assignTask: PropTypes.func.isRequired,
  stateTasks: PropTypes.object.isRequired
};

const TasksTable = ({ stateTasks, assignTask, addTaskRow }) => {
  const classes = useStyles();
  const [currentRecord, setCurrentRecord] = useState({
    taskName: '',
    weekDay: '',
    assignees: []
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const handleCellClick = (taskName, weekDay, assignees) => {
    setCurrentRecord({
      taskName,
      weekDay,
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
            <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="schedule table">
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
                  return (
                    <TableRow key={taskNameKey}>
                      <TableCell className={classes.tableBodyCellCheckbox} align="center">
                        {taskNameKey}
                      </TableCell>
                      {dayKeysArray.map((dayKey) => {
                        const day = task[dayKey] || [];
                        return (
                          <TableCell
                            className={classes.tableBodyCell}
                            key={taskNameKey + dayKey}
                            onClick={() => handleCellClick(taskNameKey, dayKey, day)}
                          >
                            <Grid container direction="row" justify="space-between" alignItems="center">
                              <Grid item xs={12}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                  <div component="ul" className={classes.paperUl}>
                                    {day.map((dayAssignee, index) => {
                                      return (
                                        <li key={dayAssignee}>
                                          {dayAssignee}
                                          {index === day.length - 1 ? '' : ' /'}&nbsp;
                                        </li>
                                      );
                                    })}
                                  </div>
                                </Grid>
                              </Grid>
                            </Grid>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
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

export default TasksTable;
