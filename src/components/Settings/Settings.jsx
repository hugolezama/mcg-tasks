import React, { useContext } from 'react';
import { Container, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@material-ui/core';
import { WeekContext } from '../../contexts/WeekContext';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DeleteIcon from '@material-ui/icons/Delete';

const Settings = () => {
  const { currentWeekId, setCurrentWeekId, BASE_WEEK_ID, deleteCurrentWeek } = useContext(WeekContext);

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h6" align="center" color="secondary" style={{ padding: 10 }}>
        Settings
      </Typography>
      <Container maxWidth={'xs'}>
        <Paper>
          <List>
            <ListItem
              button
              onClick={() => {
                setCurrentWeekId(BASE_WEEK_ID);
              }}
            >
              <ListItemIcon>
                <CalendarTodayIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={`Edit Base Schedule`} />
            </ListItem>
            <Divider variant="middle" />
            <ListItem button onClick={deleteCurrentWeek} disabled={currentWeekId === BASE_WEEK_ID}>
              <ListItemIcon>
                <DeleteIcon color="error" />
              </ListItemIcon>
              <ListItemText primary={`Delete current week`} />
            </ListItem>
          </List>
        </Paper>
      </Container>
    </div>
  );
};

export default Settings;
