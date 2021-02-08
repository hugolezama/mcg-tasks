import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import * as yup from 'yup';
import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import React, { useState } from 'react';

const validationSchema = yup.object({
  name: yup.string('Enter staff name').required('Name is required'),
  room: yup.string('Select room').required('Room is required'),
  role: yup.string('Role')
});

const StaffDialog = React.memo(({ handleSaveStaff, dialogOpen, handleCloseDialog, initialData, handleRemoveStaff }) => {
  const [confirmationDialog, setConfirmationDialog] = useState(false);

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await handleSaveStaff(values);
      handleCloseDialog();
    },
    enableReinitialize: true
  });

  const handleAccept = () => {
    handleRemoveStaff(initialData.id);
    setConfirmationDialog(false);
    handleCloseDialog();
  };
  return (
    <>
      <Dialog
        open={dialogOpen}
        disableBackdropClick
        disableEscapeKeyDown
        onClose={handleCloseDialog}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle id="form-dialog-title">Add New Staff Member</DialogTitle>
        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 0 }}>
          <form onSubmit={formik.handleSubmit} autoComplete="off" id="staffForm">
            <input type="hidden" value={formik.values.id} id="id"></input>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  variant="outlined"
                  color="primary"
                />
              </Grid>
              <Grid item sm={12} xs={6}>
                <FormControl variant="outlined" fullWidth color="primary" margin="dense">
                  <InputLabel id="room-label">Room</InputLabel>
                  <Select
                    labelId="room-label"
                    id="room"
                    name="room"
                    value={formik.values.room}
                    onChange={formik.handleChange}
                    error={formik.touched.room && Boolean(formik.errors.room)}
                    label="Room"
                    variant="outlined"
                    color="primary"
                  >
                    <MenuItem value="Blue">Blue</MenuItem>
                    <MenuItem value="Purple">Purple</MenuItem>
                    <MenuItem value="Red">Red</MenuItem>
                    <MenuItem value="Yellow">Yellow</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12} xs={6}>
                <TextField
                  fullWidth
                  margin="dense"
                  id="role"
                  name="role"
                  label="Role"
                  type="text"
                  variant="outlined"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  color="primary"
                />
              </Grid>
            </Grid>
          </form>
        </div>
        <div style={{ padding: 10 }}>
          <Grid container>
            <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
              {initialData.id && (
                <IconButton onClick={() => setConfirmationDialog(true)}>
                  <DeleteRoundedIcon color="error"></DeleteRoundedIcon>
                </IconButton>
              )}
            </Grid>
            <Grid item xs={6} container direction="row" alignItems="center" justify="flex-end" spacing={1}>
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

      <Dialog open={confirmationDialog} aria-labelledby="form-dialog-title">
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this Staff member?</DialogContent>
        <br></br>
        <DialogActions>
          <Button
            onClick={() => {
              formik.resetForm();
              setConfirmationDialog(false);
            }}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button color="primary" variant="outlined" form="staffForm" onClick={handleAccept}>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
export default StaffDialog;

StaffDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  handleSaveStaff: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  handleRemoveStaff: PropTypes.func.isRequired,
  initialData: PropTypes.object.isRequired
};
