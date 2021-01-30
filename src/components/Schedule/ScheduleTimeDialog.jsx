import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import { Grid, makeStyles, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';

const validationSchema = yup.object({
  startTime: yup.string().required('Start time is required'),
  endTime: yup.string().required('End time is required'),
  breakTime: yup.string()
});

const useStyles = makeStyles((theme) => ({
  timePicker: {
    zIndex: 1500
  }
}));
const ScheduleTimeDialog = React.memo(({ handleSaveTime, dialogOpen, handleCloseDialog, initialData }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      startTime: initialData.times[0],
      endTime: initialData.times[1],
      breakTime: initialData.times[2]
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSaveTime(initialData.staffId, initialData.index, values);
      handleCloseDialog();
    },
    enableReinitialize: true
  });

  return (
    <Dialog
      open={dialogOpen}
      disableBackdropClick
      disableEscapeKeyDown
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add New Staff Member</DialogTitle>
      <div style={{ padding: 20 }}>
        <form onSubmit={formik.handleSubmit} autoComplete="off" id="staffForm">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="startTime"
                label="Start time"
                type="time"
                defaultValue="07:30"
                // className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 900 // 5 min
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="endTime"
                label="End time"
                type="time"
                defaultValue="16:30"
                // className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 900 // 5 min
                }}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </form>
      </div>
      <div style={{ padding: 20 }}>
        <Grid container>
          <Grid item xs={12} container direction="row" alignItems="center" justify="flex-end" spacing={1}>
            <Grid item>
              <Button onClick={handleCloseDialog} variant="outlined" color="secondary">
                Cancel
              </Button>
            </Grid>

            <Grid item>
              <Button color="primary" variant="outlined" type="submit" form="staffForm">
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
});
export default ScheduleTimeDialog;
