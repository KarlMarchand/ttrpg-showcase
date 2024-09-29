import styled from "@mui/material/styles/styled";
import bladesVideo from "../assets/blades-video.mp4";
import vampireVideo from "../assets/vampire-video.mp4";
import { useSettingsContext } from "../contexts/settingsContext/useSettingsContext";
import { ThemeName } from "../themes/themes";
import { useEffect, useState } from "react";

const Video = styled("video")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: -100,
  maskImage:
    "linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0, 0, 0, 1) 100%)",
});

const video: { [key in ThemeName]: string | undefined } = {
  blades: bladesVideo,
  vampire: vampireVideo,
};

function VideoBackground() {
  const { settings } = useSettingsContext();
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    setSrc(video[settings.themeName as ThemeName] ?? "");
  }, [settings.themeName]);

  if (!src) {
    return null;
  }

  return (
    <Video key={src} playsInline autoPlay muted loop>
      <source src={video[settings.themeName as ThemeName]} type="video/mp4" />
      Your browser does not support the video tag.
    </Video>
  );
}

export default VideoBackground;
