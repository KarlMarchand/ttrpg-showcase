import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useSettingsContext } from "../contexts/settingsContext/useSettingsContext";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { themes } from "../themes/themes";
import VideoBackground from "./VideoBackground";
import Settings from "./settings/Settings";
import styled from "@mui/material/styles/styled";
import Grid from "@mui/material/Grid2";
import "@fontsource/cinzel-decorative/700.css";
import { useEffect, useState } from "react";

const StyledImage = styled("img")({
  borderRadius: 25,
  maskImage:
    "linear-gradient(to bottom, rgba(0, 0, 0, 1) 75%, transparent 100%)",
});

const StyledShowcase = styled(Grid)({
  transition: "opacity 0.3s ease-in",

  "&.fade-in": {
    opacity: 1,
  },
  "&.fade-out": {
    opacity: 0,
  },
});

const StyledImageTitle = styled("span")(({ theme }) => ({
  fontSize: "10vh",
  fontWeight: "bold",
  textAlign: "center",
  textShadow: `3px 5px 30px ${theme.palette.primary.main}`,
  maxWidth: 650,
}));

function Showcase() {
  const { settings } = useSettingsContext();
  const [isVisible, setIsVisible] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  useEffect(() => {
    if (settings.imageUrl || settings.imageTitle) {
      setIsVisible(false);
      setTimeout(() => {
        setTempSettings(settings);
        setIsVisible(true);
      }, 300);
    }
  }, [settings.imageUrl, settings.imageTitle, settings]);

  return (
    <ThemeProvider theme={themes[settings.themeName]}>
      <CssBaseline />
      <Settings />
      <StyledShowcase
        container
        gap={20}
        alignItems="center"
        wrap="nowrap"
        className={isVisible ? "fade-in" : "fade-out"}
      >
        {tempSettings.imageUrl && <StyledImage src={tempSettings.imageUrl} />}
        {tempSettings.imageTitle && (
          <StyledImageTitle>{tempSettings.imageTitle}</StyledImageTitle>
        )}
      </StyledShowcase>
      <VideoBackground />
    </ThemeProvider>
  );
}

export default Showcase;
