import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { WeekProvider } from './contexts/WeekContext';
import { StaffProvider } from './contexts/StaffContext';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <Router>
        <WeekProvider>
          <StaffProvider>
            <App />
          </StaffProvider>
        </WeekProvider>
      </Router>
    </AuthProvider>
  </ThemeProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
