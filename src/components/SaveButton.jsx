import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import rootActions from '../actions/rootActions';
import {makeStyles} from "@material-ui/core/styles";
import { unprettify } from '../utils/xmlUtil';

const useStyles = makeStyles((theme) => ({
  saveButton: {
    marginRight: '1em'
  }
}));

const SaveButton = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

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
  
  const handleRetrySave = event => {
    dispatch(rootActions.appAction.retrySave());
  }
  
  const handleSaveClick = event => {
    const {doi, lidvid, status} = doiSearchResults;
    
    const releaseData = {
      doi,
      lidvid,
      node,
      status,
      submitter,
      force: props.force,
      record: unprettify(releaseXml)
    };
    
    dispatch(rootActions.appAction.sendSaveReleaseRequest(releaseData));
  }

  return (
      <Button
          variant={props.state === 'retry' ? "outlined": "contained"}
          onClick={props.state === 'retry' ? handleRetrySave : handleSaveClick}
          disabled={props.state === 'disabled' ? true : false}
          className={classes.saveButton}
      >
        {props.state === 'retry' && 'Retry '}Save
      </Button>
  )
};
 
export default SaveButton;
