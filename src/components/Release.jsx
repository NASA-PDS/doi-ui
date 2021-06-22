import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import rootActions from '../actions/rootActions';
import TextField from '@material-ui/core/TextField';
import ReleaseAlert from './ReleaseAlert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import UatKeyWordAutoComplete from './UatKeyWordAutoComplete';
import { findXmlTag } from '../utils/xmlUtil';
import { Alert, AlertTitle } from '@material-ui/lab';
import Submitter from './Submitter';
import PageHeader from "./PageHeader";
import SaveButton from "./SaveButton";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Pds4LabelUrlBar from "./Pds4LabelUrlBar";
 
const useStyles = makeStyles((theme) => ({
  xmlTextBox: {
    width: "100%"
  },
  alert: {
    '& .MuiAlert-message':{
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'fit-content'
  },
  root: {
    marginTop: '25px',
    marginBottom: '50px'
  },
  alignCenter: {
    '& .MuiInputBase-input': {
      textAlign: 'center'
    }
  }
}));

const Release = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [force, setForce] = useState(false);
  const [isRegistered, setIsRegistered] = React.useState(null);
  const [urlSearchResponseError, setUrlSearchResponseError] = React.useState(null);
  
  let urlSearchResponse = useSelector(state => {
    return state.appReducer.urlSearchResponse;
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

  const handleReleaseXmlChange = (event) => {
    dispatch(rootActions.appAction.retrySave());
    dispatch(rootActions.appAction.updateReleaseXml(event.target.value));
    dispatch(rootActions.appAction.updateReleaseKeywords(findXmlTag(event.target.value, "keywords")));
  }

  const handleRetryRelease = event => {
    dispatch(rootActions.appAction.retryRelease());
  }

  const handleForceChange = (event) => {
    setForce(event.target.checked);
  };

  const handleRadio = (event) => {
    setIsRegistered(event.target.value);
  };
  
  const doi = useSelector(state => {
    return state.appReducer.doi;
  });
  
  useEffect(() => {
    if (urlSearchResponse !== null) {
      let error = {
        message: null,
        name: null
      };
      if (urlSearchResponse.errors) {
        error.message = urlSearchResponse.errors[0].message;
        error.name = urlSearchResponse.errors[0].name;
      } else if (!urlSearchResponse.doi || urlSearchResponse.doi !== doi) {
        error.message = "The DOI for this PDS4 label does not match the given DOI or does not exist.";
        error.name =  "Mismatched DOI to PDS4 Label";
      }
      setUrlSearchResponseError(error);
    }
  }, [urlSearchResponse]);

  return <div className={classes.root}>
    <PageHeader header={'Release DOI'}/>
  
    <TextField className={classes.alignCenter}
        label="DOI"
        variant="outlined"
        InputProps={{readOnly: true}}
        InputLabelProps={{shrink: true}}
        value={doi}
        margin="dense"
    />
    
    <Submitter/>
  
    <Typography>
      Has the data been registered and made publicly available?
    </Typography>
    <FormControl component="fieldset">
      <RadioGroup row aria-label="registered" name="registered" value={isRegistered} onChange={handleRadio}>
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
    <br/><br/>
    
    {isRegistered === 'no' &&
      <Alert icon={false} severity="error" className={classes.alert}>
        The data must registered with PDS Engineering Node and made publicly available prior to the release of the DOI.
        <br/>See <a href="">FAQs</a> for more information.
      </Alert>
    }
    
    {isRegistered === 'yes' &&
      <>
        <br/>
        <div>
          <Typography>
            Input a URL to the online PDS4 label to automatically generate the DOI metadata.
          </Typography>
          
          <Pds4LabelUrlBar />

          {urlSearchResponseError && (
            <Alert icon={false} severity="error" className={classes.alert}>
              <AlertTitle>Error: {String(urlSearchResponseError.name)}</AlertTitle>
              <b>Description:</b> {String(urlSearchResponseError.message)}
            </Alert>
          )}
        </div>
        <br/>
        
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
  
        <div>
          {saveResponse ?
              saveResponse.errors ?
                  <SaveButton state={'retry'}/>
                  :
                  <SaveButton state={'disabled'}/>
              :
              <SaveButton state={'default'} force={force}/>
          }
          {releaseResponse ?
              releaseResponse.errors ?
                  <Button variant="outlined" color="primary" onClick={handleRetryRelease}>
                    Retry Submission
          </Button>
                  :
                  <ReleaseAlert force={force} disabled={true}></ReleaseAlert>
              :
              <ReleaseAlert force={force}></ReleaseAlert>
          }
        </div>
            <FormControlLabel
                control={<Checkbox checked={force} onChange={handleForceChange} name="force" color="secondary" />}
                label="Ignore warnings"
            />
          
        {saveResponse ?
            saveResponse.errors ?
                <Alert icon={false} severity="error" className={classes.alert}>
                  <AlertTitle>Save Error: {String(saveResponse.errors[0].name)}</AlertTitle>
                  <b>Description:</b> {String(saveResponse.errors[0].message)}
                  <p>Please address the error then try again.</p>
                </Alert>
                :
                <Alert icon={false} severity="success" className={classes.alert}>
                  <AlertTitle>Save Successful!</AlertTitle>
                </Alert>
            :
            null
        }
        <br/>
          {releaseResponse?
            releaseResponse.errors?
                <Alert icon={false} severity="error" className={classes.alert}>
                  <AlertTitle>Submission Error: {String(releaseResponse.errors[0].name)}</AlertTitle>
                    <b>Description:</b> {String(releaseResponse.errors[0].message)}
                  <p>Please address the error then try again.</p>
                </Alert>
              :
                <Alert icon={false} severity="success" className={classes.alert}>
                  <AlertTitle>Release Submission Successful!</AlertTitle>
                  Your DOI will be submitted to Engineering Node.
                  You will be notified if the DOI can be released or if updates are required.
                </Alert>
            :
            null
          }
          </>
        }
      </>
    }
  </div>
};
 
export default Release;