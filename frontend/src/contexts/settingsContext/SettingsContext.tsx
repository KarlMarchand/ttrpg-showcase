import React, { createContext, useState, useEffect } from "react";
import { ThemeName } from "../../themes/themes";

interface Settings {
  imageUrl: string;
  imageTitle: string;
  themeName: ThemeName;
}

interface SettingsContextProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

const defaultSettings: Settings = {
  imageUrl: "",
  imageTitle: "",
  themeName: "blades",
};

export const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const storedSettings = localStorage.getItem("settings");
    return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
  });

  const handleMessage = (event: MessageEvent) => {
    if (event.origin !== "http://localhost:5173") return;

    if (event.data.type && event.data.type === "FROM_EXTENSION") {
      const { imageUrl, imageTitle } = event.data;

      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        setSettings((prevSettings) => ({
          ...prevSettings,
          imageUrl: imageUrl,
          imageTitle: imageTitle,
        }));
      };

      img.onerror = () => {
        console.error("Image failed to load:", imageUrl);
      };
    }
  };

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
