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
import PropTypes from 'prop-types';

const scheduleValidation = Yup.object().shape({
  startTime: Yup.date().required('Start time is required'),
  endTime: Yup.mixed().required('Start time is required'),
  breakTime: Yup.date(),
  hasBreak: Yup.bool(),
  dayOff: Yup.bool()
});
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const ScheduleTimeDialog = React.memo(({ saveScheduleItem, dialogOpen, handleCloseDialog, initialData }) => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Dialog
        open={dialogOpen}
        fullWidth={true}
        maxWidth={'sm'}
        disableBackdropClick
        disableEscapeKeyDown
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <Formik
          initialValues={{
            startTime: moment(initialData.times[0] || '07:00', 'kk:mm'),
            endTime: moment(initialData.times[1] || '16:00', 'kk:mm'),
            breakTime: moment(initialData.times[2] || '13:00', 'kk:mm'),
            hasBreak: initialData.times[2] ? true : false,
            dayOff: initialData.dayOff || false
          }}
          validationSchema={scheduleValidation}
          onSubmit={async (values) => {
            const times = [];
            times.push(moment(values.startTime).format('kk:mm'));
            times.push(moment(values.endTime).format('kk:mm'));
            if (values.hasBreak) {
              times.push(moment(values.breakTime).format('kk:mm'));
            }

            await saveScheduleItem(initialData.staffId, initialData.index, times, values.dayOff);
            handleCloseDialog();
          }}
        >
          {({ submitForm, values }) => (
            <Form>
              <DialogTitle id="form-dialog-title">
                Schedule for {initialData.staffId} - {days[initialData.index]}
              </DialogTitle>
              {!values.dayOff && (
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
                </div>
              )}
              <div style={{ padding: 20 }}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Field component={CheckboxWithLabel} type="checkbox" name="dayOff" Label={{ label: 'Day off' }} />
                  </Grid>
                  <Grid item xs={6} container direction="row" alignItems="center" justify="flex-end" spacing={1}>
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

ScheduleTimeDialog.displayName = 'ScheduleTimeDialog';

export default ScheduleTimeDialog;

ScheduleTimeDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  saveScheduleItem: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  initialData: PropTypes.object.isRequired
};
