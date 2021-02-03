import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { FormControl, Grid, InputLabel, MenuItem } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { StaffContext } from '../../contexts/StaffContext';
import { Select } from 'formik-material-ui';

const scheduleValidation = Yup.object().shape({
  staffSelected: Yup.string().required('Please select one staff member')
});

const CreateTaskDialog = React.memo(({ addStaffSchedule, dialogOpen, handleCloseDialog, stateSchedule }) => {
  const { stateStaff } = useContext(StaffContext);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const tmpList = [];
    Object.values(stateStaff).forEach((staff) => {
      if (Object.keys(stateSchedule).indexOf(staff.name) < 0) {
        tmpList.push(staff.name);
      }
    });
    setStaffList(tmpList);
  }, [stateSchedule, stateStaff]);

  return (
    <Dialog
      open={dialogOpen}
      fullWidth={true}
      maxWidth={'xs'}
      disableBackdropClick
      disableEscapeKeyDown
      onClose={handleCloseDialog}
    >
      <Formik
        initialValues={{
          staffSelected: ''
        }}
        validationSchema={scheduleValidation}
        onSubmit={async (values) => {
          await addStaffSchedule(values.staffSelected);
          handleCloseDialog();
        }}
      >
        {({ submitForm }) => (
          <Form>
            <DialogTitle id="form-dialog-title">Add Staff Schedule</DialogTitle>
            <div style={{ padding: 20 }}>
              <Grid container spacing={3}>
                {staffList.length === 0 && (
                  <Grid item xs={12}>
                    All available staff memeber have a schedule for this week
                  </Grid>
                )}
                {staffList.length > 0 && (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="staffSelected">Staff </InputLabel>
                      <Field
                        component={Select}
                        name="staffSelected"
                        inputProps={{
                          id: 'staffSelected'
                        }}
                      >
                        {staffList.map((staff) => {
                          return (
                            <MenuItem value={staff} key={staff}>
                              {staff}
                            </MenuItem>
                          );
                        })}
                      </Field>
                    </FormControl>
                  </Grid>
                )}
              </Grid>
            </div>
            <div style={{ padding: 20 }}>
              {staffList.length === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} container justify="flex-end">
                    <Button onClick={handleCloseDialog} variant="outlined" color="primary">
                      Accept
                    </Button>
                  </Grid>
                </Grid>
              )}
              {staffList.length > 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} container direction="row" alignItems="center" justify="flex-end" spacing={1}>
                    <Grid item>
                      <Button onClick={handleCloseDialog} variant="outlined" color="secondary">
                        Cancel
                      </Button>
                    </Grid>

                    <Grid item>
                      <Button color="primary" variant="outlined" type="submit" onClick={submitForm} form="staffForm">
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
});
export default CreateTaskDialog;
