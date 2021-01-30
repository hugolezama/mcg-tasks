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
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import moment from 'moment';
import { useState } from 'react';
import ScheduleTimeDialog from './ScheduleTimeDialog';

const dayHeaders = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(0),
    width: '100%',
    height: '100%'
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
    backgroundColor: '#f4f4f4'
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
  }
}));

const ScheduleTable = ({ stateSchedule, saveScheduleItem }) => {
  const classes = useStyles();
  const [currentRecord, setCurrentRecord] = useState({
    staffId: '',
    index: '',
    times: ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddStaffButton = () => {};
  const handleCellClick = (staffId, index, times) => {
    setCurrentRecord({
      staffId,
      index,
      times
    });
    console.log({
      staffId,
      index,
      times
    });
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
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
                      <IconButton onClick={handleAddStaffButton}>
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
                {stateSchedule.map((staff) => {
                  return (
                    <TableRow key={staff.id}>
                      <TableCell className={classes.tableBodyCellCheckbox}>{staff.id}</TableCell>
                      {staff.time.map((day, index) => {
                        return (
                          <TableCell
                            className={classes.tableBodyCell}
                            key={staff.id + index}
                            onClick={() => handleCellClick(staff.id, index, day)}
                          >
                            <Grid container direction="row" justify="space-between" alignItems="center">
                              <Grid item xs={2}>
                                <AccessTimeRoundedIcon fontSize="small" color="secondary" />
                              </Grid>
                              <Grid item xs={10}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                  {moment(day[0], 'hh:mm').format('h:m0')} - {moment(day[1], 'hh:mm').format('h:mm')}
                                </Grid>
                              </Grid>
                              {day[2] && (
                                <>
                                  <Grid item xs={2}>
                                    <FastfoodIcon fontSize="small" color="secondary" />
                                  </Grid>
                                  <Grid item xs={10}>
                                    <Grid container direction="row" justify="center" alignItems="center">
                                      {moment(day[2], 'hh:mm').format('h:mm')}
                                    </Grid>
                                  </Grid>
                                </>
                              )}
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
      <ScheduleTimeDialog
        dialogOpen={dialogOpen}
        handleCloseDialog={handleCloseDialog}
        initialData={currentRecord}
        saveScheduleItem={saveScheduleItem}
      ></ScheduleTimeDialog>
    </>
  );
};

export default ScheduleTable;