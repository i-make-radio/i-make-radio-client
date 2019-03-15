import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import socket from '../utils/socket'
import { debug } from "util";

const NameFormDialog = ({ changeUserName, defaultUsername }) => {
  const [open, setOpen] = useState(false)

  const [userName, updateUserName] = useState(defaultUsername)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (e) => {
    setOpen(false)
    changeUserName(userName)
  };

  const handleChange = e => {
    const userName = e.target.value;
    updateUserName(userName)
  }

  return (
    <div>
      <button className="profile-name-button"
        onClick={setOpen}
      >
        {defaultUsername}
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          What should we call you?
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            value={userName}
            onChange={handleChange}
            autoComplete="nope"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Okay!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NameFormDialog
