import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import rootActions from '../actions/rootActions';
import TextField from '@material-ui/core/TextField';
import SaveButton from './SaveButton';
import ReleaseAlert from './ReleaseAlert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import UatKeyWordAutoComplete from './UatKeyWordAutoComplete';
import {findXmlTag} from '../utils/xmlUtil';
import {Alert, AlertTitle} from '@material-ui/lab';
import Pds4LabelUrlBar from "./Pds4LabelUrlBar";

const useStyles = makeStyles((theme) => ({
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
  const [force, setForce] = useState(false);
  
  const urlSearchResponse = useSelector(state => {
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

  return (
      <>
        <Pds4LabelUrlBar />
      
        {urlSearchResponse ?
          urlSearchResponse.errors ?
          <Alert icon={false} severity="error" className={classes.alert}>
              <AlertTitle>{String(urlSearchResponse.errors[0].name)}</AlertTitle>
              <b>Description:</b> {String(urlSearchResponse.errors[0].message)}
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
                  <AlertTitle>{String(saveResponse.errors[0].name)}</AlertTitle>
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
                  <AlertTitle>{String(releaseResponse.errors[0].name)}</AlertTitle>
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
    )
};
 
export default Draft;