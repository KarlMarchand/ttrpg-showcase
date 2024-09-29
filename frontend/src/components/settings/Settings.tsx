import DataObjectIcon from '@mui/icons-material/DataObject';
import PaletteIcon from '@mui/icons-material/Palette';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import ThemeSettings from './ThemeSettings';
import styled from '@mui/material/styles/styled';
import DataSettings from './DataSettings';

const StyledSettings = styled('div')(() => ({
  position: "absolute",
  top: 20,
  right: 20,
}));

function Settings() {
  const [open, setOpen] = useState(false);
  
  const [dataSettingsOpen, setDataSettingsOpen] = useState(false); 
  const [themeSettingsOpen, setThemeSettingsOpen] = useState(false); 

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setDataSettingsOpen(true)}>
            <ListItemIcon>
              <DataObjectIcon />
            </ListItemIcon>
            <ListItemText primary="Data settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setThemeSettingsOpen(true)}>
            <ListItemIcon>
              <PaletteIcon />
            </ListItemIcon>
            <ListItemText primary="Theme settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <StyledSettings>
      <Button onClick={() => setOpen(true)}><SettingsIcon /></Button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
      <DataSettings open={dataSettingsOpen} onClose={() => setDataSettingsOpen(false)} />
      <ThemeSettings open={themeSettingsOpen} onClose={() => setThemeSettingsOpen(false)} />
    </StyledSettings>
  );
}

export default Settings;
