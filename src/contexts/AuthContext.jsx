import React, { createContext, useEffect, useState } from 'react';
import { firebaseApp } from '../firebase/firebaseConfig';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('user', user.email);
      } else {
        localStorage.removeItem('user');
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
