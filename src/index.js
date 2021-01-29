import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { WeekProvider } from './contexts/WeekContext';

ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <Router>
      <WeekProvider>
        <App />
      </WeekProvider>
    </Router>
  </ThemeProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
