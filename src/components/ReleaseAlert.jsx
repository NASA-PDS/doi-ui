import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import rootActions from '../actions/rootActions';
 
const useStyles = makeStyles((theme) => ({
 
}));

const ReleaseAlert = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const releaseXml = useSelector(state =>
    state.appReducer.releaseXml
  );

  const doiSearchResults = useSelector(state =>
    state.appReducer.doiSearchResponse
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRelease = () => {
    setOpen(false);

    const {doi, lidvid, node, status, submitter} = doiSearchResults;
    const releaseData = {
      doi,
      lidvid,
      node,
      status,
      submitter
    };
    
    dispatch(rootActions.appAction.sendReleaseRequest(releaseData));
  }

  return <div>
      <p>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Release
        </Button>
      </p>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Release"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to release? Once you release you cannot unrelease.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRelease} color="primary" autoFocus>
            Release
          </Button>
        </DialogActions>
      </Dialog>
  </div>;
};
 
export default ReleaseAlert;