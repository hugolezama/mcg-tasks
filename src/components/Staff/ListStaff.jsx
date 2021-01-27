import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getComparator, stableSort } from '../../utils/utils';
import { Button, IconButton } from '@material-ui/core';

import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import StaffDialog from './StaffDialog';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

import TableHeader from '../Common/TableHeader';

const headCells = [
  { id: 'name', disablePadding: true, label: 'Name' },
  { id: 'room', disablePadding: false, label: 'Room' },
  { id: 'role', disablePadding: false, label: 'Role' }
];
const emptyStaff = {
  name: '',
  role: '',
  room: ''
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
    minWidth: 450
  },

  tableRow: {
    '&:hover': {
      backgroundColor: '#edfff3 !important'
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
    width: 65
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
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, staffList.length - page * rowsPerPage);
  return (
    <div className={classes.root}>
      <div
        style={{
          paddingBottom: 10,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
          onClick={() => {
            setCurrentRecord(emptyStaff);
            setDialogOpen(true);
          }}
          variant="outlined"
          color="primary"
          startIcon={<AddCircleRoundedIcon />}
        >
          Add Staff
        </Button>
      </div>

      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <TableHeader
              headCells={headCells}
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={staffList.length}
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
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell>
                        <Chip
                          style={{
                            backgroundColor: row.room,
                            filter: 'brightness(0.95)',
                            boxShadow: '5px 5px 10px grey'
                          }}
                        />
                      </TableCell>
                      <TableCell>{row.role}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
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
    </div>
  );
}
