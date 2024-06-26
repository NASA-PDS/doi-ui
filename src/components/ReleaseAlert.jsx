import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { unprettify } from '../utils/xmlUtil';
import rootActions from '../actions/rootActions';


const ReleaseAlert = (props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const releaseXml = useSelector(state =>
    state.appReducer.releaseXml
  );

  const doiSearchResults = useSelector(state =>
    state.appReducer.doiSearchResponse
  );

  const submitter = useSelector(state =>
    state.appReducer.submitter
  );

  const node = useSelector(state =>
    state.appReducer.node
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRelease = () => {
    setOpen(false);

    const {doi, identifier, status} = doiSearchResults;
    const releaseData = {
      doi,
      identifier,
      node,
      status,
      submitter,
      force: props.force,
      record: unprettify(releaseXml)
    };
    
    dispatch(rootActions.appAction.sendReleaseRequest(releaseData));
  }

  return <>
      <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          disabled={props.disabled}
      >
        Submit for Review
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Submit for Review</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to submit for review?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRelease} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
  </>;
};
 
export default ReleaseAlert;
