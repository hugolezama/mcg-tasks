import { IconButton, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

TableHeader.propTypes = {
  headCells: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  handleAddStaffButton: PropTypes.func.isRequired
};

export default function TableHeader({ headCells, classes, order, orderBy, onRequestSort, handleAddStaffButton }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <IconButton onClick={handleAddStaffButton}>
            <AddCircleRoundedIcon color="primary" fontSize="large" />
          </IconButton>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              className={classes.headerLabel}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
