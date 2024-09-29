import createTheme from "@mui/material/styles/createTheme";
import bladesBackground from "../assets/blades-background.jpg";
import { bodyStyles } from "./commonStyles";

const blades = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#35a9ad",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          ${bodyStyles}
          background-image: url(${bladesBackground});
        }
      `,
    },
  },
});

export default blades;
