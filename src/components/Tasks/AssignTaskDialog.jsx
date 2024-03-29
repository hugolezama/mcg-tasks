import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {
  Chip,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { memo, useContext, useEffect, useState } from 'react';
import { StaffContext } from '../../contexts/StaffContext';
import { CloseIcon } from '@material-ui/data-grid';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));
const ITEM_HEIGHT = 70;
const ITEM_PADDING_TOP = 60;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const AssignTaskDialog = memo(({ assignTask, dialogOpen, handleCloseDialog, initialData }) => {
  const [assignees, setAssignees] = useState([]);
  const { stateStaff } = useContext(StaffContext);
  const [staffList, setStaffList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (dialogOpen === true) {
      setAssignees(initialData.assignees);
    }
  }, [dialogOpen, initialData.assignees]);

  useEffect(() => {
    const tmpList = [];
    Object.values(stateStaff).forEach((staff) => {
      tmpList.push(staff.name);
    });
    setStaffList(tmpList);
  }, [stateStaff]);

  const handleChange = (event) => {
    setAssignees(event.target.value);
  };

  const handleCancel = () => {
    setAssignees([]);
    handleCloseDialog();
  };

  const handleSubmit = async () => {
    await assignTask(initialData.taskName, initialData.weekDay, assignees, initialData.room);
    handleCloseDialog();
  };
  return (
    <Dialog
      open={dialogOpen}
      fullWidth={true}
      maxWidth={'xs'}
      disableBackdropClick
      disableEscapeKeyDown
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
          <IconButton aria-label="close" onClick={handleCloseDialog}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {initialData.taskName} - {initialData.room ? initialData.room + ' - ' : ''}
          {days[initialData.weekDay]}
        </div>
      </DialogTitle>

      <div style={{ padding: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="demo-mutiple-chip-label">Task assignees</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={assignees}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
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
      </div>

      <div style={{ padding: 20 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} container direction="row" alignItems="center" justify="flex-end" spacing={1}>
            <Grid item>
              <Button onClick={handleCancel} variant="outlined" color="secondary">
                Cancel
              </Button>
            </Grid>

            <Grid item>
              <Button color="primary" variant="outlined" onClick={handleSubmit} form="staffForm">
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
});
AssignTaskDialog.displayName = 'AssignTaskDialog';
export default AssignTaskDialog;

AssignTaskDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  assignTask: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  initialData: PropTypes.object.isRequired
};
