import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebaseRef from '../firebase/firebaseConfig';

export const StaffContext = createContext();

StaffProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const StaffProvider = ({ children }) => {
  const [stateStaff, setStateStaff] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const staffSnap = await firebaseRef.child('staff').once('value');
        setStateStaff(staffSnap.val());
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <StaffContext.Provider
      value={{
        stateStaff,
        setStateStaff
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};
