import {
  TableContainer,
  TableHead,
  TableBody,
  Table,
  TableCell,
  TableRow,
  Paper,
  Button,
  Grid,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import moment from 'moment';

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
    backgroundColor: '#f4f4f4'
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
    padding: 4,
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

const ScheduleTable = ({ stateSchedule }) => {
  const classes = useStyles();
  return (
    <>
      <Button>ddsfd</Button>
      <div style={{ height: '100%', width: '100%' }}>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="schedule table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCellCheckbox}></TableCell>
                  {dayHeaders.map((day) => {
                    return (
                      <TableCell className={classes.tableHeaderCell} key={day}>
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
                      <TableCell onClick={() => console.log('CLICK')} className={classes.tableBodyCellCheckbox}>
                        {staff.id}
                      </TableCell>
                      {staff.time.map((day, index) => {
                        return (
                          <TableCell className={classes.tableBodyCell} key={staff.id + index}>
                            {/* <List dense disablePadding>
                              <ListItem>
                                <ListItemText
                                  primary={moment(day[0], 'hh:mm').format('h:mm a')}
                                  secondary={moment(day[1], 'hh:mm').format('h:mm a')}
                                />
                              </ListItem>

                              {day[2] && (
                                <>
                                  <ListItem>
                                    <ListItemText primary={moment(day[2], 'hh:mm').format('h:mm a')} />
                                  </ListItem>
                                </>
                              )}
                            </List> */}

                            <Grid container direction="row" justify="space-between" alignItems="center">
                              <Grid item xs={2}>
                                <AccessTimeRoundedIcon fontSize="small" color="secondary" />
                              </Grid>
                              <Grid item xs={10}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                  {moment(day[0], 'hh:mm').format('h:mm a')}
                                  <br></br>
                                  {moment(day[1], 'hh:mm').format('h:mm a')}
                                </Grid>
                              </Grid>
                              {day[2] && (
                                <>
                                  <Grid item xs={2}>
                                    <FastfoodIcon fontSize="small" color="secondary" />
                                  </Grid>
                                  <Grid item xs={10}>
                                    <Grid container direction="row" justify="center" alignItems="center">
                                      {moment(day[2], 'hh:mm').format('h:mm a')}
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
    </>
  );
};

export default ScheduleTable;
