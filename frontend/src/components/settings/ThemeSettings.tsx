import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { ThemeName, themes } from "../../themes/themes";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useSettingsContext } from "../../contexts/settingsContext/useSettingsContext";

interface ThemeSettingsProps {
  open: boolean;
  onClose: () => void;
}

function ThemeSettings(props: ThemeSettingsProps) {
  const { open, onClose } = props;

  const { settings, setSettings } = useSettingsContext();

  const handleListItemClick = (themeKey: ThemeName) => {
    setSettings({ ...settings, themeName: themeKey });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Theme</DialogTitle>
      <List sx={{ pt: 0 }}>
        {Object.keys(themes).map((themeKey) => (
          <ListItem disableGutters key={themeKey}>
            <ListItemButton
              onClick={() => handleListItemClick(themeKey as ThemeName)}
              selected={themeKey === settings.themeName}
            >
              <ListItemText
                primary={themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default ThemeSettings;
