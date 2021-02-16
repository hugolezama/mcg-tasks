import React, { useContext, useEffect, useState } from 'react';
import firebaseRef from '../../firebase/firebaseConfig';
import { Button, Container, Paper, TextField, Typography, Snackbar } from '@material-ui/core';
import { WeekContext } from '../../contexts/WeekContext';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notes = () => {
  const [notes, setNotes] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const { currentWeekId } = useContext(WeekContext);

  useEffect(() => {
    (async () => {
      try {
        const snap = await firebaseRef.child(`weeks/${currentWeekId}/notes`).once('value');
        console.log(snap.val());
        setNotes(snap.val() || '');
      } catch (err) {
        console.error(err);
      }
    })();
  }, [currentWeekId]);

  const handleSaveNotes = async () => {
    try {
      const ref = await firebaseRef.child(`weeks/${currentWeekId}`);
      await ref.child('notes').set(notes);
      setOpenSnack(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setNotes(e.target.value);
  };

  const handleClose = () => {
    setOpenSnack(false);
  };

  return (
    <div style={{ width: '100%' }}>
      <Container maxWidth={'sm'}>
        <Typography variant="h6" align="center" color="secondary" style={{ padding: 10 }}>
          Week Notes
        </Typography>
        <Paper style={{ padding: 20 }}>
          <TextField
            fullWidth
            label="Write the week notes"
            multiline
            variant="outlined"
            value={notes}
            onChange={handleChange}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
            <Button color="primary" variant="outlined" onClick={handleSaveNotes}>
              Save
            </Button>
          </div>
        </Paper>
      </Container>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={openSnack}
        onClose={handleClose}
        autoHideDuration={2000}
      >
        <Alert onClose={handleClose} severity="success">
          Notes saved!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notes;
