import { Theme } from "@mui/material/styles/createTheme";
import blades from "./blades";
import vampire from "./vampire";

export type ThemeName = "blades" | "vampire";

export const themes: { [key in ThemeName]: Theme } = {
  blades: blades,
  vampire: vampire,
};

export interface VideoBackgroundProps {
  video: string;
}
