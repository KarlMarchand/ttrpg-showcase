import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import styled from "@mui/material/styles/styled";
import { useEffect, useState } from "react";
import { useSettingsContext } from "../../contexts/settingsContext/useSettingsContext";

interface DataSettingsProps {
  open: boolean;
  onClose: () => void;
}

const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  justifyContent: "space-between",
});

const StyledDeleteOutlineIcon = styled(DeleteOutlineIcon)({
  cursor: "pointer",
});

function DataSettings(props: DataSettingsProps) {
  const { open, onClose } = props;
  const [imageTitle, setImageTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { settings, setSettings } = useSettingsContext();

  const handleImageTitleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageTitle(e.target.value);
  };

  const handleImageUrlInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSettings({ ...settings, imageTitle, imageUrl });
    onClose();
  };

  const handleClearButtonClick = () => {
    setSettings({
      ...settings,
      imageTitle: "",
      imageUrl: "",
    });
  };

  useEffect(() => {
    setImageTitle(settings.imageTitle);
    setImageUrl(settings.imageUrl);
  }, [settings.imageTitle, settings.imageUrl]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <StyledDialogTitle>
        Data settings
        <StyledDeleteOutlineIcon onClick={handleClearButtonClick} />
      </StyledDialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="url"
          label="Image title"
          type="text"
          fullWidth
          variant="standard"
          value={imageTitle}
          onChange={handleImageTitleInputChange}
        />
        <TextField
          autoFocus
          margin="dense"
          name="url"
          label="Image URL"
          type="text"
          fullWidth
          variant="standard"
          value={imageUrl}
          onChange={handleImageUrlInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DataSettings;
