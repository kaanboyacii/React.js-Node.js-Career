import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import "./confirmation.scss";

const EventConfirmation = ({ open, handleClose }) => {
  const dialogStyle = {
    overflow: "hidden",
    borderRadius: "10px",
  };

  return (
    <Dialog
      disableScrollLock={true}
      open={open}
      onClose={handleClose}
      PaperProps={{ style: dialogStyle }}
    >
      <DialogTitle className="dialog-title">Etkinlik Başvurusu Onayı</DialogTitle>
      <DialogContent className="dialog-content">
        <DialogContentText>
          Etkinliğe olan başvurunuz başarıyla tarafımıza alındı. Teşekkür ederiz!
        </DialogContentText>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={handleClose} color="primary">
          Tamam
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventConfirmation;
