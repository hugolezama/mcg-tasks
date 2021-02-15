import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';
import { firebaseApp } from '../../firebase/firebaseConfig';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PasswordReset = ({ dialogOpen, handleCloseDialog }) => {
  const [email, setEmail] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (event) => {
    const { value } = event.currentTarget;
    setEmail(value);
    setError(null);
  };
  const sendResetEmail = (event) => {
    event.preventDefault();
    firebaseApp
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setOpenSnack(true);
        setEmail('');
        handleCloseDialog();
      })
      .catch((err) => {
        console.error(err);
        setError(err?.message);
      });
  };

  const handleClose = () => {
    setOpenSnack(false);
  };
  return (
    <React.Fragment>
      <Dialog
        open={dialogOpen}
        fullWidth={true}
        maxWidth={'xs'}
        disableBackdropClick
        disableEscapeKeyDown
        onClose={handleCloseDialog}
      >
        <DialogTitle>Reset your Password</DialogTitle>
        <form action="">
          <DialogContent>
            <TextField
              fullWidth
              id="email"
              name="email"
              variant="outlined"
              label="Email"
              error={error}
              helperText={error ? error : ''}
              value={email}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleCloseDialog();
                setEmail('');
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={sendResetEmail}>
              Send me a reset link
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnack}
        onClose={handleClose}
        autoHideDuration={2000}
      >
        <Alert onClose={handleClose} severity="info">
          Email sent!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};
export default PasswordReset;

PasswordReset.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired
};
