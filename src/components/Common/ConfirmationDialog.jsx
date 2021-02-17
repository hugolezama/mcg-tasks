import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const ConfirmationDialog = ({ openDialog, title, content, handleCancel, handleAccept }) => {
  return (
    <Dialog open={openDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <br></br>
      <DialogActions>
        <Button onClick={handleCancel} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button color="primary" variant="outlined" onClick={handleAccept}>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleAccept: PropTypes.func.isRequired
};

export default ConfirmationDialog;
