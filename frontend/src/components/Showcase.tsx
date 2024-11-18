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

const StyledShowcase = styled(Grid)({
  padding: "0 5vh",
  transition: "opacity 0.3s ease-in",
  overflow: "hidden",

  "&.fade-in": {
    opacity: 1,
  },
  "&.fade-out": {
    opacity: 0,
  },
});

const StyledImage = styled(Grid)({
  height: "90vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  maskImage:
    "linear-gradient(to bottom, rgba(0, 0, 0, 1) 75%, transparent 100%)",

  img: {
    borderRadius: 25,
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

const StyledImageTitle = styled(Grid)(({ theme }) => ({
  fontSize: "10vh",
  fontWeight: "bold",
  lineHeight: 1.2,
  padding: 50,
  textShadow: `3px 5px 30px ${theme.palette.primary.main}`,
  textAlign: "center",
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
        gap={0}
        alignItems="center"
        wrap="nowrap"
        className={isVisible ? "fade-in" : "fade-out"}
      >
        {tempSettings.imageUrl && (
          <StyledImage size={tempSettings.imageTitle ? 6 : 12}>
            <img src={tempSettings.imageUrl} />
          </StyledImage>
        )}
        {tempSettings.imageTitle && (
          <StyledImageTitle size={6}>
            {tempSettings.imageTitle}
          </StyledImageTitle>
        )}
      </StyledShowcase>
      <VideoBackground />
    </ThemeProvider>
  );
}

export default Showcase;
