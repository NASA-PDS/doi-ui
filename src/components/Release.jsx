import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import rootActions from '../actions/rootActions';
import TextField from '@material-ui/core/TextField';
import ReleaseAlert from './ReleaseAlert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import UatKeyWordAutoComplete from './UatKeyWordAutoComplete';
import { findXmlTag, unprettify } from '../utils/xmlUtil';
import { Alert, AlertTitle } from '@material-ui/lab';
import Submitter from './Submitter';
import PageHeader from "./PageHeader";
import { useParams } from 'react-router-dom'
 
const useStyles = makeStyles((theme) => ({
  inputBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginBottom: '1em'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  center: {
    display: "flex",
    justifyContent: "center"
  },
  xmlTextBox: {
    width: "100%"
  },
  disabled: {
    color: theme.palette.text.disabled,
  },
  alert: {
    '& .MuiAlert-message':{
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
}));

const Release = () => {
  const classes = useStyles();

  let { searchLidvid } = useParams();

  const dispatch = useDispatch();
  const [force, setForce] = useState(false);
  
  const doiSearchResults = useSelector(state => {
    return state.appReducer.doiSearchResponse;
  });

  const saveResponse = useSelector(state => {
    return state.appReducer.saveResponse;
  });
  
  const releaseResponse = useSelector(state => {
    return state.appReducer.releaseResponse;
  });

  const releaseXml = useSelector(state =>
    state.appReducer.releaseXml
  );

  const status = doiSearchResults ? doiSearchResults.status : '';
  
  const submitter = useSelector(state =>
    state.appReducer.submitter
  );

  const node = useSelector(state =>
    state.appReducer.node
  );

  const handleReleaseXmlChange = (event) => {
    dispatch(rootActions.appAction.updateReleaseXml(event.target.value));
    dispatch(rootActions.appAction.updateReleaseKeywords(findXmlTag(event.target.value, "keywords")));
  }

  const handleRetryRelease = event => {
    dispatch(rootActions.appAction.retryRelease());
  }

  const handleForceChange = (event) => {
    setForce(event.target.checked);
  };

  const handleSaveClick = event => {
    const {doi, lidvid} = doiSearchResults;

    const releaseData = {
      doi,
      lidvid,
      node,
      status,
      submitter,
      force,
      record: unprettify(releaseXml)
    };
    
    dispatch(rootActions.appAction.sendSaveReleaseRequest(releaseData));
  }

  const releaseIdentifier =  useSelector(state => {
    return state.appReducer.releaseIdentifier;
  });
  
  useEffect(() => {
    if(searchLidvid){
      dispatch(rootActions.appAction.sendLidvidSearchRequest(searchLidvid));
    }
    else{
      if (releaseIdentifier !== null) {
        dispatch(rootActions.appAction.sendLidvidSearchRequest(releaseIdentifier));
      }
    }
  }, []);

  return <div className="mtc-root-child">
    <PageHeader header={'Release DOI'}/>
    <br/><br/>
    {releaseXml &&
      <>
        <p>
          <TextField
            className={classes.xmlTextBox}
            label="Metadata"
            multiline
            variant="outlined"
            value={releaseXml}
            onChange={handleReleaseXmlChange}
          />
        </p>
    
        <UatKeyWordAutoComplete></UatKeyWordAutoComplete>
    
        <br/>
  
        <Submitter/>
  
        <div className="flex-column align-center">
          {saveResponse && saveResponse.errors &&
            <>
              <Alert icon={false} severity="error" className={classes.alert}>
                <AlertTitle>Error: {String(saveResponse.errors[0].name)}</AlertTitle>
                <b>Description:</b> {String(saveResponse.errors[0].message)}
              </Alert>
              <br/>
            </>
          }
          <Button
            variant="contained"
            onClick={handleSaveClick}
          >
            Save
          </Button>
          
          {releaseResponse &&
            <FormControlLabel
                control={<Checkbox checked={force} onChange={handleForceChange} name="force" color="secondary" />}
                label="Ignore warnings"
            />
          }
          
          {releaseResponse?
            releaseResponse.errors?
              <>
                <br/><br/>
                <Alert icon={false} severity="error" className={classes.alert}>
                  <AlertTitle>Error: {String(releaseResponse.errors[0].name)}</AlertTitle>
                    <b>Description:</b> {String(releaseResponse.errors[0].message)}
                    <p>Please address the error then try releasing again.</p>
                </Alert>
      
                <p>
                  <Button
                    variant="outlined"
                    onClick={handleRetryRelease}
                  >
                    Retry
                  </Button>
                </p>
              </>
              :
              <>
                <br/><br/>
                <Alert icon={false} severity="success" className={classes.alert}>
                  <AlertTitle>Release Submission Successful!</AlertTitle>
                  Your DOI will be submitted to Engineering Node. You will be notified if the DOI can be released or if updates are required.
                </Alert>
              </>
            :
            <>
              <ReleaseAlert force={force}></ReleaseAlert>
      
              <FormControlLabel
                control={<Checkbox checked={force} onChange={handleForceChange} name="force" color="secondary" />}
                label="Ignore warnings"
              />
            </>
          }
        </div>
      </>
    }
  </div>
};
 
export default Release;