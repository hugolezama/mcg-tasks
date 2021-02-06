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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import moment from 'moment';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { useContext, useEffect, useState } from 'react';
import { StaffContext } from '../../contexts/StaffContext';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const dayHeaders = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const dayKeysArray = ['0', '1', '2', '3', '4'];

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
    minWidth: 100,
    color: theme.palette.primary.dark,
    backgroundColor: '#f4f4f4',
    fontWeight: 'bold',
    fontSize: 14
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
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
  },
  Purple: {
    color: '#b19cd9'
  },
  Blue: {
    color: '#86d8f7'
  },
  Yellow: {
    color: '#fdfd96'
  },
  Red: {
    color: '#ff6961'
  }
}));

const MyWeekTable = ({ myWeekState, currentStaffMember, setCurrentStaffMember }) => {
  const classes = useStyles();

  const { stateStaff } = useContext(StaffContext);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const tmpList = [];
    Object.values(stateStaff).forEach((staff) => {
      tmpList.push(staff.name);
    });
    setStaffList(tmpList);
  }, [stateStaff]);

  const handleSelectChange = (event) => {
    setCurrentStaffMember(event.target.value);
  };

  return (
    <>
      <div style={{ height: '100%', width: '100%' }}>
        <br></br>
        <Grid container spacing={1} justify="center">
          <Grid item xs={4}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="demo-mutiple-chip-label">Staff member</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                value={currentStaffMember}
                onChange={handleSelectChange}
              >
                {staffList.map((staff) => {
                  return (
                    <MenuItem key={staff} value={staff}>
                      {staff}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <br></br>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table className={classes.table} aria-labelledby="tableTitle" size="small" aria-label="schedule table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={classes.tableHeaderCellCheckbox}></TableCell>
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
                {myWeekState['schedule'] && (
                  <TableRow key={'schedule'}>
                    <TableCell className={classes.tableBodyCellCheckbox} align="center">
                      {'Schedule'}
                    </TableCell>
                    {myWeekState['schedule'].map((day, index) => {
                      return (
                        <TableCell className={classes.tableBodyCell} key={'schedule' + index}>
                          {day.dayOff && (
                            <Grid container direction="row">
                              <Grid item xs={12} align="center">
                                Day Off
                              </Grid>
                            </Grid>
                          )}
                          {!day.dayOff && (
                            <Grid container direction="row" justify="space-between" alignItems="center">
                              <Grid item xs={2}>
                                <AccessTimeRoundedIcon fontSize="small" color="secondary" />
                              </Grid>
                              <Grid item xs={10}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                  {moment(day.time[0], 'hh:mm').format('h:mm')}
                                  {' - '}
                                  {moment(day.time[1], 'hh:mm').format('h:mm')}
                                </Grid>
                              </Grid>
                              {day.time[2] && (
                                <>
                                  <Grid item xs={2}>
                                    <FastfoodIcon fontSize="small" color="secondary" />
                                  </Grid>
                                  <Grid item xs={10}>
                                    <Grid container direction="row" justify="center" alignItems="center">
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
                )}

                {myWeekState['tasks'] && (
                  <TableRow key="taskDivider">
                    <TableCell colSpan={6} align="center" className={classes.tableHeaderCellCheckbox}>
                      Tasks
                    </TableCell>
                  </TableRow>
                )}
                {myWeekState['tasks'] &&
                  Object.keys(myWeekState['tasks']).map((taskKey, index) => {
                    return (
                      <TableRow key={taskKey}>
                        <TableCell className={classes.tableBodyCellCheckbox} align="center">
                          {taskKey}
                        </TableCell>
                        {dayKeysArray.map((dayKey) => {
                          return (
                            <TableCell className={classes.tableBodyCell} key={taskKey + dayKey} align="center">
                              {Object.keys(myWeekState['tasks'][taskKey]).includes(dayKey) ? (
                                <CheckCircleIcon fontSize="small" color="primary" />
                              ) : (
                                ''
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                {myWeekState['roomTasks'] && (
                  <TableRow key="roomTaskDivider">
                    <TableCell colSpan={6} align="center" className={classes.tableHeaderCellCheckbox}>
                      Room Tasks
                    </TableCell>
                  </TableRow>
                )}
                {myWeekState['roomTasks'] &&
                  Object.keys(myWeekState['roomTasks']).map((taskKey, index) => {
                    console.log(taskKey);
                    console.log(Object.keys(myWeekState['roomTasks'][taskKey]));
                    return (
                      <TableRow key={taskKey}>
                        <TableCell className={classes.tableBodyCellCheckbox} align="center">
                          {taskKey}
                        </TableCell>
                        {dayKeysArray.map((dayKey) => {
                          return (
                            <TableCell className={classes.tableBodyCell} key={taskKey + dayKey} align="center">
                              {Object.keys(myWeekState['roomTasks'][taskKey]).includes(dayKey)
                                ? Object.keys(myWeekState['roomTasks'][taskKey][dayKey]).map((item) => {
                                    return <CheckCircleIcon fontSize="small" className={classes[item]} />;
                                  })
                                : // <CheckCircleIcon fontSize="small" color="primary" />
                                  ''}
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
    </>
  );
};

export default MyWeekTable;
