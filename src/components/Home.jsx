import { Button, Container } from '@material-ui/core';
import React, { useContext } from 'react';
import { WeekContext } from '../contexts/WeekContext';
const Home = () => {
  const { setCurrentWeekId } = useContext(WeekContext);
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Container maxWidth={'md'}>
        <Button onClick={() => setCurrentWeekId('BASE')}>Edit Base</Button>
      </Container>
    </div>
  );
};

export default Home;
