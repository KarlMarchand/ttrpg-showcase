import { red } from "@mui/material/colors";
import createTheme from "@mui/material/styles/createTheme";
import vampireBackground from "../assets/vampire-background.jpg";
import { bodyStyles } from "./commonStyles";

const vampire = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: red[900],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          ${bodyStyles}
          background-image: url(${vampireBackground});
        }
      `,
    },
  },
});

export default vampire;
