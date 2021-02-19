import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(0),
    width: '100%',
    height: '100%'
  },
  pageTitle: {
    padding: 10,
    paddingBottom: 0
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
  Purple: {
    color: '#b19cd9'
  },
  Blue: {
    color: '#86d8f7'
  },
  Yellow: {
    color: '#fcde4b'
  },
  Red: {
    color: '#ff6961'
  }
}));
export { useStyles };
