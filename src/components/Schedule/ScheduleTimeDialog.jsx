import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import React from 'react';
import { CheckboxWithLabel } from 'formik-material-ui';
import { KeyboardTimePicker } from 'formik-material-ui-pickers';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const scheduleValidation = Yup.object().shape({
  startTime: Yup.date().required('Start time is required'),
  endTime: Yup.mixed().required('Start time is required'),
  breakTime: Yup.date(),
  hasBreak: Yup.bool()
});

const ScheduleTimeDialog = React.memo(({ saveScheduleItem, dialogOpen, handleCloseDialog, initialData }) => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Dialog
        open={dialogOpen}
        disableBackdropClick
        disableEscapeKeyDown
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <Formik
          initialValues={{
            startTime: moment(initialData.times[0], 'hh:mm'),
            endTime: moment(initialData.times[1], 'hh:mm'),
            breakTime: moment(initialData.times[2] || '13:00', 'hh:mm'),
            hasBreak: initialData.times[2] ? true : false
          }}
          validationSchema={scheduleValidation}
          onSubmit={(values) => {
            console.log(moment(values.startTime).format('hh:mm'));
            const times = [];
            times.push(moment(values.startTime).format('hh:mm'));
            times.push(moment(values.endTime).format('hh:mm'));
            if (values.hasBreak) {
              times.push(moment(values.breakTime).format('hh:mm'));
            }

            saveScheduleItem(initialData.staffId, initialData.index, times);
            handleCloseDialog();
          }}
        >
          {({ submitForm, values }) => (
            <Form>
              <DialogTitle id="form-dialog-title">Add New Staff Member</DialogTitle>
              <div style={{ padding: 20 }}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Field component={KeyboardTimePicker} label="Start Time" name="startTime" minutesStep={15} />
                  </Grid>
                  <Grid item xs={6}>
                    <Field component={KeyboardTimePicker} label="End Time" name="endTime" minutesStep={15} />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component={CheckboxWithLabel}
                      type="checkbox"
                      name="hasBreak"
                      Label={{ label: 'Has break?' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    {values.hasBreak && (
                      <Field component={KeyboardTimePicker} label="Break Time" name="breakTime" minutesStep={15} />
                    )}
                  </Grid>
                </Grid>
              </div>{' '}
              <div style={{ padding: 20 }}>
                <Grid container>
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
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
});
export default ScheduleTimeDialog;
