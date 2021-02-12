import { red } from '@material-ui/core/colors';
import { createMuiTheme, darken, lighten } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      // main: green[600],
      main: '#2aab2a',
      light: lighten('#2aab2a', 0.9)
    },
    secondary: {
      dark: darken('#65717d', 0.2),
      main: '#65717d',
      light: lighten('#65717d', 0.9)
    },
    error: {
      main: red[400]
    },

    background: {
      default: '#fff'
    }
  }
});

export default theme;
