import { green, purple, red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[600],
    },
    secondary: {
      main: purple[400],
    },
    error: {
      main: red[400],
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
