import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';

const CreateTaskDialog = React.memo(({ dialogOpen, handleCloseDialog, addTaskRow }) => {
  const [taskName, setTaskName] = useState([]);

  const handleChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(taskName);
    await addTaskRow(taskName);
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
    >
      <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
      <div style={{ padding: 20 }}>
        {/* <Grid container spacing={3}> */}
        <Grid container spacing={1} alignItems="center" justify="center">
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <TextField
              id="taskName"
              label="Task Name"
              fullWidth={true}
              variant="outlined"
              color="primary"
              onChange={handleChange}
              // margin="dense"
              autoComplete="off"
            />
          </Grid>
        </Grid>
      </div>
      <div style={{ padding: 20 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} container direction="row" alignItems="center" justify="flex-end" spacing={1}>
            <Grid item>
              <Button onClick={handleCloseDialog} variant="outlined" color="secondary">
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
export default CreateTaskDialog;
