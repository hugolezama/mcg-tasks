import { green, purple, red } from '@material-ui/core/colors';
import { createMuiTheme, darken, lighten } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[600]
    },
    secondary: {
      dark: darken(purple[400], 0.2),
      main: purple[700],
      light: lighten(purple[900], 0.9)
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
