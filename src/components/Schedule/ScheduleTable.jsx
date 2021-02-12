import React, { useState } from 'react';
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
  IconButton,
  Typography
} from '@material-ui/core';

import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import moment from 'moment';
import PropTypes from 'prop-types';

import AddStaffScheduleDialog from './AddStaffScheduleDialog';
import ScheduleTimeDialog from './ScheduleTimeDialog';

const dayHeaders = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(0),
    width: '100%'
    // height: '100%'
  },
  table: {
    // tableLayout: 'fixed',
    // minWidth: 400
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
  tableBodyCellCheckbox: {
    backgroundColor: '#f4f4f4',
    // fontStyle: 'italic',
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
    // height: '100%',
    width: '100%'
  },
  breakCell: {
    color: theme.palette.error.main
  },
  timeCell: {
    fontWeight: 'bold'
  }
}));

const ScheduleTable = ({ stateSchedule, saveScheduleItem, addStaffSchedule }) => {
  const classes = useStyles();
  const [currentRecord, setCurrentRecord] = useState({
    staffId: '',
    index: '',
    times: []
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [staffDialogOpen, setStaffDialogOpen] = useState(false);

  const handleCellClick = (staffId, index, times, dayOff) => {
    setCurrentRecord({
      staffId,
      index,
      times,
      dayOff
    });
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseStaffDialog = () => {
    setStaffDialogOpen(false);
  };

  const handlePrevDay = (initialData) => {
    const newIndex = parseInt(initialData.index) - 1;
    console.log(newIndex);
    if (newIndex >= 0) {
      setCurrentRecord({
        staffId: initialData.staffId,
        index: newIndex,
        times: stateSchedule[initialData.staffId][newIndex].time,
        dayOff: stateSchedule[initialData.staffId][newIndex].dayOff
      });
    }
  };

  const handleNextDay = (initialData) => {
    const newIndex = parseInt(initialData.index) + 1;
    console.log(newIndex);
    if (newIndex <= 4) {
      setCurrentRecord({
        staffId: initialData.staffId,
        index: newIndex,
        times: stateSchedule[initialData.staffId][newIndex].time,
        dayOff: stateSchedule[initialData.staffId][newIndex].dayOff
      });
    }
  };

  return (
    <>
      <div style={{ width: '100%' }}>
        <Typography variant="h6" align="center" color="secondary" style={{ padding: 10 }}>
          Schedule
        </Typography>

        <Paper className={classes.paper}>
          <TableContainer>
            <Table className={classes.table} aria-labelledby="tableTitle" size="small" aria-label="schedule table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={classes.tableHeaderCellCheckbox}>
                    <Tooltip title="Add Staff">
                      <IconButton onClick={() => setStaffDialogOpen(true)}>
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
                {Object.keys(stateSchedule).map((key) => {
                  const staff = stateSchedule[key];
                  return (
                    <TableRow key={key}>
                      <TableCell className={classes.tableBodyCellCheckbox} align="center">
                        {key}
                      </TableCell>
                      {Object.keys(staff).map((dayKey) => {
                        const day = staff[dayKey];
                        return (
                          <TableCell
                            className={classes.tableBodyCell}
                            key={key + dayKey}
                            onClick={() => handleCellClick(key, dayKey, day.time, day.dayOff)}
                          >
                            {day.dayOff && (
                              <Grid container direction="row">
                                <Grid item xs={12} align="center" className={classes.timeCell}>
                                  OFF / WFH
                                </Grid>
                              </Grid>
                            )}
                            {!day.dayOff && (
                              <Grid container direction="row" justify="space-between" alignItems="center">
                                <Grid item xs={2}>
                                  <AccessTimeRoundedIcon fontSize="small" color="secondary" style={{ opacity: 0.5 }} />
                                </Grid>
                                <Grid item xs={10} className={classes.timeCell}>
                                  <Grid container direction="row" justify="center" alignItems="center">
                                    {moment(day.time[0], 'hh:mm').format('h:mm')}
                                    {' - '}
                                    {moment(day.time[1], 'hh:mm').format('h:mm')}
                                  </Grid>
                                </Grid>
                                {day.time[2] && (
                                  <>
                                    <Grid item xs={2}>
                                      <FastfoodIcon fontSize="small" color="secondary" style={{ opacity: 0.5 }} />
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                        className={classes.breakCell}
                                      >
                                        {moment(day.time[2], 'hh:mm').format('h:mm')}
                                      </Grid>
                                    </Grid>
                                  </>
                                )}
                              </Grid>
                            )}
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
      <ScheduleTimeDialog
        dialogOpen={dialogOpen}
        handleCloseDialog={handleCloseDialog}
        initialData={currentRecord}
        saveScheduleItem={saveScheduleItem}
        prevDay={handlePrevDay}
        nextDay={handleNextDay}
      ></ScheduleTimeDialog>

      <AddStaffScheduleDialog
        dialogOpen={staffDialogOpen}
        stateSchedule={stateSchedule}
        handleCloseDialog={handleCloseStaffDialog}
        addStaffSchedule={addStaffSchedule}
      ></AddStaffScheduleDialog>
    </>
  );
};

ScheduleTable.displayName = 'ScheduleTable';
export default ScheduleTable;

ScheduleTable.propTypes = {
  saveScheduleItem: PropTypes.func.isRequired,
  addStaffSchedule: PropTypes.func.isRequired,
  stateSchedule: PropTypes.object.isRequired
};
