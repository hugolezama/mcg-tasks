import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { Grid, IconButton, Snackbar, Typography } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import React, { memo, useState } from 'react';
import { CheckboxWithLabel } from 'formik-material-ui/dist';
import { KeyboardTimePicker } from 'formik-material-ui-pickers';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import PropTypes from 'prop-types';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MuiAlert from '@material-ui/lab/Alert';

const scheduleValidation = Yup.object().shape({
  startTime: Yup.date().required('Start time is required'),
  endTime: Yup.mixed().required('Start time is required'),
  breakTime: Yup.date(),
  hasBreak: Yup.bool(),
  dayOff: Yup.bool()
});
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ScheduleTimeDialog = memo(
  ({ saveScheduleItem, dialogOpen, handleCloseDialog, initialData, nextDay, prevDay }) => {
    const [openSnack, setOpenSnack] = useState(false);

    const handleClose = () => {
      setOpenSnack(false);
    };
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
            onSubmit={async (values, actions) => {
              const times = [];
              times.push(moment(values.startTime).format('kk:mm'));
              times.push(moment(values.endTime).format('kk:mm'));
              if (values.hasBreak) {
                times.push(moment(values.breakTime).format('kk:mm'));
              }

              await saveScheduleItem(initialData.staffId, initialData.index, times, values.dayOff);
              setOpenSnack(true);
              actions.setTouched({});
            }}
            enableReinitialize={true}
          >
            {({ values, touched, resetForm }) => (
              <Form>
                <DialogTitle id="form-dialog-title">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton
                      onClick={() => {
                        if (Object.keys(touched).length) {
                          if (confirm('You have not saved the changes, if you continue they will be discarded')) {
                            resetForm({});
                            prevDay(initialData);
                          }
                        } else {
                          resetForm({});
                          prevDay(initialData);
                        }
                      }}
                      disabled={initialData.index === '0'}
                    >
                      <ChevronLeftIcon fontSize="large" color={initialData.index === '0' ? 'disabled' : 'primary'} />
                    </IconButton>
                    <Typography variant="h6">
                      Schedule for {initialData.staffId} - {days[initialData.index]}
                    </Typography>
                    <IconButton
                      onClick={() => {
                        if (Object.keys(touched).length) {
                          if (confirm('You have not saved the changes, if you continue they will be discarded')) {
                            resetForm({});
                            nextDay(initialData);
                          }
                        } else {
                          resetForm({});
                          nextDay(initialData);
                        }
                      }}
                      disabled={initialData.index === '4'}
                    >
                      <ChevronRightIcon fontSize="large" color={initialData.index === '4' ? 'disabled' : 'primary'} />
                    </IconButton>
                  </div>
                </DialogTitle>
                {!values.dayOff && (
                  <div style={{ padding: 20, paddingBottom: 0 }}>
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
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name="dayOff"
                        Label={{ label: 'Day off / WFH' }}
                      />
                    </Grid>
                    <Grid item xs={6} container direction="row" alignItems="center" justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button onClick={handleCloseDialog} variant="outlined" color="secondary">
                          Cancel
                        </Button>
                      </Grid>

                      <Grid item>
                        <Button color="primary" variant="outlined" type="submit">
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

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSnack}
          onClose={handleClose}
          autoHideDuration={2000}
        >
          <Alert onClose={handleClose} severity="info">
            Schedule saved!
          </Alert>
        </Snackbar>
      </MuiPickersUtilsProvider>
    );
  }
);

ScheduleTimeDialog.displayName = 'ScheduleTimeDialog';

export default ScheduleTimeDialog;

ScheduleTimeDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  saveScheduleItem: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  prevDay: PropTypes.func,
  nextDay: PropTypes.func,
  initialData: PropTypes.object.isRequired
};
