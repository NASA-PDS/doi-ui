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
import { findXmlTag, unprettify } from '../utils/xmlUtil';
import { Alert, AlertTitle } from '@material-ui/lab';
import Submitter from './Submitter';
import PageHeader from "./PageHeader";
import SaveButton from "./SaveButton";
 
const useStyles = makeStyles((theme) => ({
  xmlTextBox: {
    width: "100%"
  },
  alert: {
    '& .MuiAlert-message':{
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  root: {
    marginTop: '25px',
    marginBottom: '50px'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  alignCenter: {
    alignItems: 'center'
  }
}));

const Release = () => {
  const classes = useStyles();

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

  const releaseIdentifier =  useSelector(state => {
    return state.appReducer.releaseIdentifier;
  });
  
  useEffect(() => {
    if (releaseIdentifier !== null) {
      dispatch(rootActions.appAction.sendLidvidSearchRequest(releaseIdentifier));
    }
  }, []);

  return <div className={classes.root}>
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
        {/*<div className={`${classes.flexColumn} ${classes.alignCenter}`}>*/}
        {/*  {saveResponse && saveResponse.errors &&*/}
        {/*    <>*/}
        {/*      <Alert icon={false} severity="error" className={classes.alert}>*/}
        {/*        <AlertTitle>Error: {String(saveResponse.errors[0].name)}</AlertTitle>*/}
        {/*        <b>Description:</b> {String(saveResponse.errors[0].message)}*/}
        {/*      </Alert>*/}
        {/*      <br/>*/}
        {/*    </>*/}
        {/*  }*/}
        {/*  <Button*/}
        {/*    variant="contained"*/}
        {/*    onClick={handleSaveClick}*/}
        {/*  >*/}
        {/*    Save*/}
        {/*  </Button>*/}
        {/*  */}
        {/*  {releaseResponse &&*/}
        {/*    <FormControlLabel*/}
        {/*        control={<Checkbox checked={force} onChange={handleForceChange} name="force" color="secondary" />}*/}
        {/*        label="Ignore warnings"*/}
        {/*    />*/}
        {/*  }*/}
        {/*  */}
        {/*  {releaseResponse?*/}
        {/*    releaseResponse.errors?*/}
        {/*      <>*/}
        {/*        <br/><br/>*/}
        {/*        <Alert icon={false} severity="error" className={classes.alert}>*/}
        {/*          <AlertTitle>Error: {String(releaseResponse.errors[0].name)}</AlertTitle>*/}
        {/*            <b>Description:</b> {String(releaseResponse.errors[0].message)}*/}
        {/*            <p>Please address the error then try releasing again.</p>*/}
        {/*        </Alert>*/}
        
        {/*        <p>*/}
        {/*          <Button*/}
        {/*            variant="outlined"*/}
        {/*            onClick={handleRetryRelease}*/}
        {/*          >*/}
        {/*            Retry*/}
        {/*          </Button>*/}
        {/*        </p>*/}
        {/*      </>*/}
        {/*      :*/}
        {/*      <>*/}
        {/*        <br/><br/>*/}
        {/*        <Alert icon={false} severity="success" className={classes.alert}>*/}
        {/*          <AlertTitle>Release Submission Successful!</AlertTitle>*/}
        {/*          Your DOI will be submitted to Engineering Node. You will be notified if the DOI can be released or if updates are required.*/}
        {/*        </Alert>*/}
        {/*      </>*/}
        {/*    :*/}
        {/*    <>*/}
        {/*      <ReleaseAlert force={force}></ReleaseAlert>*/}
        
        {/*      <FormControlLabel*/}
        {/*        control={<Checkbox checked={force} onChange={handleForceChange} name="force" color="secondary" />}*/}
        {/*        label="Ignore warnings"*/}
        {/*      />*/}
        {/*    </>*/}
        {/*  }*/}
        {/*</div>*/}
      </>
    }
  </div>
};
 
export default Release;