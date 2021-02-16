import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getComparator, stableSort } from '../../utils/utils';
import { Container, IconButton, Typography } from '@material-ui/core';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import StaffDialog from './StaffDialog';
import SchoolIcon from '@material-ui/icons/School';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import TableHeader from '../Common/TableHeader';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

const headCells = [
  { id: 'name', disablePadding: false, label: 'Name' },
  { id: 'room', disablePadding: false, label: 'Room' },
  { id: 'role', disablePadding: false, label: 'Role' }
];
const emptyStaff = {
  name: '',
  role: '',
  rooms: []
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
    // backgroundColor: '#A7ADBA'
  },
  table: {
    minWidth: 400
  },

  tableRow: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light + ' !important'
    }
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  headerLabel: {
    fontWeight: 'bold',
    fontSize: 16
  },
  tableCellCheck: {
    width: 80
  },
  room: {
    marginRight: 10
  },
  Purple: {
    color: '#b19cd9'
  },
  Blue: {
    color: '#89abd2'
  },
  Yellow: {
    color: '#fcde4b'
  },
  Red: {
    color: '#ff6961'
  },
  Kitchen: {
    color: '#ffb347'
  },
  Office: {
    color: '#808080'
  },
  Other: {
    color: '#808080'
  }
}));

ListStaff.propTypes = {
  staffList: PropTypes.array.isRequired,
  handleSaveStaff: PropTypes.func.isRequired,
  handleRemoveStaff: PropTypes.func.isRequired
};

export default function ListStaff({ staffList, handleSaveStaff, handleRemoveStaff }) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(emptyStaff);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleRequestSort = (_event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddStaffButton = () => {
    setCurrentRecord(emptyStaff);
    setDialogOpen(true);
  };

  const getRoomIcon = (roomKey) => {
    let retVal;
    switch (roomKey) {
      case 'Purple':
      case 'Blue':
      case 'Yellow':
      case 'Red':
        retVal = <SchoolIcon key={roomKey} className={`${classes.room} ${classes[roomKey]}`} />;
        break;
      case 'Kitchen':
        retVal = <RestaurantIcon key={roomKey} className={`${classes.room} ${classes[roomKey]}`} />;
        break;
      case 'Office':
        retVal = <DesktopWindowsIcon key={roomKey} className={`${classes.room} ${classes[roomKey]}`} />;
        break;
      default:
        retVal = <EmojiPeopleIcon key={roomKey} className={`${classes.room} ${classes[roomKey]}`} />;
        break;
    }
    return retVal;
  };

  return (
    <div className={classes.root}>
      <Container maxWidth={'lg'} style={{ padding: 1 }}>
        <Typography variant="h6" align="center" color="secondary" style={{ padding: 10, paddingBottom: 5 }}>
          Staff Roster
        </Typography>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table className={classes.table} aria-labelledby="tableTitle" size="small" aria-label="enhanced table">
              <TableHeader
                headCells={headCells}
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={staffList.length}
                handleAddStaffButton={handleAddStaffButton}
              />
              <TableBody>
                {stableSort(staffList, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `staff-table-${index}`;

                    return (
                      <TableRow hover tabIndex={-1} key={row.name} className={classes.tableRow}>
                        <TableCell padding="checkbox" className={classes.tableCellCheck}>
                          <IconButton
                            onClick={() => {
                              setCurrentRecord(row);
                              setDialogOpen(true);
                            }}
                          >
                            <CreateRoundedIcon color="primary"></CreateRoundedIcon>
                          </IconButton>
                        </TableCell>
                        <TableCell id={labelId} align="left">
                          {row.name}
                        </TableCell>
                        <TableCell>
                          {row.rooms &&
                            Object.keys(row.rooms).map((roomKey) => {
                              return getRoomIcon(row.rooms[roomKey]);
                            })}
                        </TableCell>
                        <TableCell>{row.role}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={staffList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <StaffDialog
          handleSaveStaff={handleSaveStaff}
          dialogOpen={dialogOpen}
          handleCloseDialog={handleCloseDialog}
          initialData={currentRecord}
          handleRemoveStaff={handleRemoveStaff}
        ></StaffDialog>
      </Container>
    </div>
  );
}
