import { Container } from '@material-ui/core';
import React from 'react';
const Home = () => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Container maxWidth={'md'}>
        <img
          src="/mcg.jpg"
          alt="MCG Banner"
          style={{
            width: '100%',
            maxWidth: 900,
            height: 'auto'
          }}
        ></img>
      </Container>
    </div>
  );
};

export default Home;
