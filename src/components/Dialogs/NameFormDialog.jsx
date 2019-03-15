import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const NameFormDialog = ({ handleClose, handleClickOpen, changeUserName }) => {
  const [open, setOpen] = useState(false)

  handleClickOpen = () => {
    setOpen(true)
  }

  handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        className="profile-name-button"
        type="light"
        color="#ffffff"
        onClick={setOpen}
      >
        Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          What should we call you?
        </DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="name" type="text" fullWidth />
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
