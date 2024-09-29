import { Theme } from "@mui/material/styles";
import { Components } from "@mui/material/styles/components";

declare module "@mui/material/styles" {
  interface Components {
    StyledVideo?: {
      styleOverrides?: {
        video?: {};
      };
    };
  }
}
