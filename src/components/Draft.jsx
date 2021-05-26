import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import {useDispatch, useSelector} from 'react-redux';
import rootActions from '../actions/rootActions';
import TextField from '@material-ui/core/TextField';
import ReleaseAlert from './ReleaseAlert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import UatKeyWordAutoComplete from './UatKeyWordAutoComplete';
import {findXmlTag, unprettify} from '../utils/xmlUtil';
import {Alert, AlertTitle} from '@material-ui/lab';

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
  xmlTextBox: {
    width: "100%"
  },
  alert: {
    '& .MuiAlert-message':{
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
}));

const Draft = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [labelUrl, setLabelUrl] = useState('');
  const [force, setForce] = useState(false);
  const [forceUrl, setForceUrl] = useState(false);
  
  const doiSearchResults = useSelector(state => {
    return state.appReducer.doiSearchResponse;
  });

  const releaseResponse = useSelector(state => {
    return state.appReducer.releaseResponse;
  });

  const releaseXml = useSelector(state =>
    state.appReducer.releaseXml
  );

  const submitter = useSelector(state =>
    state.appReducer.submitter
  );

  const node = useSelector(state =>
    state.appReducer.node
  );
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleLabelUrlSearch();
    }
  };
  
  const handleLabelUrlChange = (event) => {
    setLabelUrl(event.target.value);
  };
  
  const handleForceUrlChange = (event) => {
    setForceUrl(event.target.checked);
  };
  
  const handleLabelUrlSearch = () => {
    const labelData = {
      labelUrl,
      node,
      submitter,
      forceUrl
    }
    
    dispatch(rootActions.appAction.sendPds4LabelSearchRequest(labelData));
  };

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
    const {doi, lidvid, status} = doiSearchResults;

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

  return <>
      <div className="flex-column align-center">
        <Paper component="form" className={classes.inputBar}>
          <InputBase
              placeholder='PDS4 Label URL'
              className={classes.input}
              inputProps={{ 'aria-label': 'Enter PDS4 Label Url' }}
              onChange={handleLabelUrlChange}
              onKeyPress={handleKeyPress}
          />
        </Paper>
    
        <Button
            variant="contained"
            color="primary"
            disabled={!(node && labelUrl)}
            onClick={handleLabelUrlSearch}
        >
          Get URL
        </Button>
        
        <FormControlLabel
            control={<Checkbox checked={forceUrl} onChange={handleForceUrlChange} name="forceUrl" color="secondary" />}
            label="Ignore warnings"
        />
      </div>
  
      <br/>
      
      {doiSearchResults ?
        doiSearchResults.errors ?
          <Alert icon={false} severity="error" className={classes.alert}>
            <AlertTitle>Error: {String(doiSearchResults.errors[0].name)}</AlertTitle>
            <b>Description:</b> {String(doiSearchResults.errors[0].message)}
          </Alert>
          :
          <Alert icon={false} severity="info">
            Your DOI is ready to be drafted. Please update the metadata below as necessary.
          </Alert>
        :
        null
      }
  
    {releaseXml &&
      <>
        <div>
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
        </div>
      
        <br/>
      
        <div className="flex-column align-center">
          <Button
            variant="contained"
            onClick={handleSaveClick}>
            Save
          </Button>
        </div>
    
    
        {releaseResponse &&
          <FormControlLabel
          control={<Checkbox checked={force} onChange={handleForceChange} name="force" color="secondary" />}
          label="Ignore warnings"
          />
        }
      
        {releaseResponse?
          releaseResponse.errors?
          <>
            <Alert icon={false} severity="error" className={classes.alert}>
              <AlertTitle>Error: {String(releaseResponse.errors[0].name)}</AlertTitle>
              <b>Description:</b> {String(releaseResponse.errors[0].message)}
              <p>Please address the error then try again.</p>
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
            <Alert icon={false} severity="success" className={classes.alert}>
            <AlertTitle>Release Submission Successful!</AlertTitle>
              Your DOI will be submitted to Engineering Node.
              You will be notified if the DOI can be released or if updates are required.
            </Alert>
          </>
          :
          <>
            <ReleaseAlert force={force} text={'Submit for Review'}></ReleaseAlert>
          
            <FormControlLabel
            control={<Checkbox checked={force} onChange={handleForceChange} name="force" color="secondary" />}
            label="Ignore warnings"
            />
          </>
        }
      </>
    }
  </>
};
 
export default Draft;