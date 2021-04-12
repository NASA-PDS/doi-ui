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
 
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

const Release = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [doiOrLidvid, setDoiOrLidvid] = useState("pds4lidvid");
  const [doiLidvid, setDoiLidvid] = useState("");
  const [labelUrl, setLabelUrl] = useState("");
  const [force, setForce] = useState(false);
  const [nodesOpen, setNodesOpen] = useState(false);

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
    state.appReducer.releaseSubmitter
  );

  const node = useSelector(state =>
    state.appReducer.releaseNode
  );

  const handleDoiLidvidChange = (event) => {
    setDoiOrLidvid(event.target.value);
  };

  const handleDoiLidvidInputChange = (event) => {
    setDoiLidvid(event.target.value);
  };

  const handleLabelUrlChange = (event) => {
    setLabelUrl(event.target.value);
  };

  const handleLabelUrlSearch = () => {
    dispatch(rootActions.appAction.sendPds4LabelSearchRequest(labelUrl));
  };

  const handleDoiLidvidSearch = () => {
    if(doiOrLidvid === "doi"){
      dispatch(rootActions.appAction.sendDoiSearchRequest(doiLidvid));
    }
    if(doiOrLidvid === "pds4lidvid"){
      dispatch(rootActions.appAction.sendLidvidSearchRequest(doiLidvid));
    }
  };

  const handleReleaseXmlChange = (event) => {
    dispatch(rootActions.appAction.updateReleaseXml(event.target.value));
    dispatch(rootActions.appAction.updateReleaseKeywords(findXmlTag(event.target.value, "keywords")));
  }

  const handleRetryRelease = event => {
    dispatch(rootActions.appAction.retryRelease());
  }

  const handleSubmitterChange = event => {
    dispatch(rootActions.appAction.setReleaseSubmitter(event.target.value));
  }

  const handleNodesSelect = event => {
    dispatch(rootActions.appAction.setReleaseNode(event.target.value));
  }

  const handleNodesOpen = () => {
    setNodesOpen(true);
  };

  const handleNodesClose = () => {
    setNodesOpen(false);
  };

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

  const identifier =  useSelector(state => {
    return state.appReducer.identifier;
  });

  useEffect(() => {
    if (identifier !== null && doiSearchResults === null) {
      dispatch(rootActions.appAction.sendLidvidSearchRequest(identifier));
    }
  }, [identifier]);

  return <div>
    <br/>
    <Typography variant="h4">Release</Typography>
    <br/>  

    {releaseResponse?
      releaseResponse.errors?
        <div>
          <Alert icon={false} severity="error" className={classes.alert}>
            <AlertTitle>Error: {String(releaseResponse.errors[0].name)}</AlertTitle>
              <b>Description:</b> {String(releaseResponse.errors[0].message)}
              <p>Please try releasing again.</p>
          </Alert>

          <p>
            <Button
              variant="outlined"
              onClick={handleRetryRelease}
            >
              Retry
            </Button>
          </p>
        </div>
        :
        <div>
          <Alert icon={false} severity="success" className={classes.alert}>
            <AlertTitle>Release Submission Successful!</AlertTitle>
            Your DOI will be submitted to Engineering Node. You will be notified if the DOI can be released or if updates are required.
          </Alert>
        </div>
      :
      <div>
        {identifier ? "" :
          <div>
            <div>
              <p>This is where a description of release will go</p>
              <p>Update a release by typing in a LIDVID or DOI</p>
            </div>

            <div className={classes.center}>
              <Paper component="form" className={classes.root}>
                <FormControl>
                  <Select
                    value={doiOrLidvid}
                    onChange={handleDoiLidvidChange}
                  >
                    <MenuItem value={"doi"}>DOI</MenuItem>
                    <MenuItem value={"pds4lidvid"}>PDS4 LIDVID</MenuItem>
                  </Select>
                </FormControl>

                <InputBase
                  className={classes.input}
                  value={doiLidvid}
                  inputProps={{ 'aria-label': 'search google maps' }}
                  onChange={handleDoiLidvidInputChange}
                />
                <IconButton
                  className={classes.iconButton}
                  aria-label="search"
                  onClick={handleDoiLidvidSearch}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </div>

            <p>OR</p>

            <div className={classes.center}>
              <Paper component="form" className={classes.root}>
                <Typography>
                  PDS4 Label URL
                </Typography>
                <InputBase
                  className={classes.input}
                  inputProps={{ 'aria-label': 'Enter PDS4 Label Url' }}
                  onChange={handleLabelUrlChange}
                />
                <IconButton
                  className={classes.iconButton}
                  aria-label="search"
                  onClick={handleLabelUrlSearch}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </div>
          </div>
        }
        {doiSearchResults?
          doiSearchResults.errors?
            doiSearchResults.errors[0].message.startsWith("No record(s) could be found")?
              <div>
                <br/>
                <Alert icon={false} severity="error" className={classes.alert}>
                  <AlertTitle>Error: {String(doiSearchResults.errors[0].name)}</AlertTitle>
                    <b>Description:</b> {String(doiSearchResults.errors[0].message)} Please try searching again.
                </Alert>
              </div>
              :
              <div>
                <div>
                  <br/>
                  <Alert icon={false} severity="info">
                    Your DOI is ready to be released. Please update the metadata below if necessary.
                  </Alert>

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

                  <form>
                    <TextField
                        label="Submitter"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={submitter}
                        onChange={handleSubmitterChange}
                    />
                    <br/>
                    <br/>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="select-nodes-label">Nodes</InputLabel>
                      <Select
                          labelId="select-nodes-label"
                          id="select-nodes"
                          value={node.toUpperCase()}
                          open={nodesOpen}
                          onOpen={handleNodesOpen}
                          onClose={handleNodesClose}
                          onChange={handleNodesSelect}
                          label="Nodes"
                      >
                        <MenuItem value={'ATM'}>ATM</MenuItem>
                        <MenuItem value={'ENG'}>ENG</MenuItem>
                        <MenuItem value={'GEO'}>GEO</MenuItem>
                        <MenuItem value={'IMG'}>IMG</MenuItem>
                        <MenuItem value={'NAIF'}>NAIF</MenuItem>
                        <MenuItem value={'PPI'}>PPI</MenuItem>
                        <MenuItem value={'RMS'}>RMS</MenuItem>
                        <MenuItem value={'SBN'}>SBN</MenuItem>
                        <MenuItem value={'SBN-PSI'}>SBN-PSI</MenuItem>
                      </Select>
                    </FormControl>
                  </form>
                </div>

                <br/>

                <Alert icon={false} severity="error" className={classes.alert}>
                  <AlertTitle>Error: {String(doiSearchResults.errors[0].name)}</AlertTitle>
                  <b>Description:</b> {String(doiSearchResults.errors[0].message)}
                </Alert>

                <br/>

                <div>
                  <FormControlLabel
                      control={<Checkbox checked={force} onChange={handleForceChange} name="force" color="secondary" />}
                      label="Ignore warnings"
                  />

                  <br/>

                  <Button variant="outlined" color="primary" onClick={handleSaveClick}>
                    Save
                  </Button>

                  <br/>

                  <ReleaseAlert force={force}></ReleaseAlert>
                </div>
              </div>
            :
            <div>
              <div>
                <br/>
                <Alert icon={false} severity="info">
                  Your DOI is ready to be released. Please update the metadata below if necessary.
                </Alert>

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

                <form>
                  <TextField 
                    label="Submitter Email"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}  
                    value={submitter}
                    onChange={handleSubmitterChange}
                  />
                  <br/>
                  <br/>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="select-nodes-label">Nodes</InputLabel>
                    <Select
                        labelId="select-nodes-label"
                        id="select-nodes"
                        value={node.toUpperCase()}
                        open={nodesOpen}
                        onOpen={handleNodesOpen}
                        onClose={handleNodesClose}
                        onChange={handleNodesSelect}
                        label="Nodes"
                    >
                      <MenuItem value={'ATM'}>ATM</MenuItem>
                      <MenuItem value={'ENG'}>ENG</MenuItem>
                      <MenuItem value={'GEO'}>GEO</MenuItem>
                      <MenuItem value={'IMG'}>IMG</MenuItem>
                      <MenuItem value={'NAIF'}>NAIF</MenuItem>
                      <MenuItem value={'PPI'}>PPI</MenuItem>
                      <MenuItem value={'RMS'}>RMS</MenuItem>
                      <MenuItem value={'SBN'}>SBN</MenuItem>
                      <MenuItem value={'SBN-PSI'}>SBN-PSI</MenuItem>
                    </Select>
                  </FormControl>
                </form>
              </div>

              <br/>

              <div>
                <FormControlLabel
                  control={<Checkbox checked={force} onChange={handleForceChange} name="force" color="secondary" />}
                  label="Ignore warnings"
                />

                <br/>

                <Button variant="outlined" color="primary" onClick={handleSaveClick}>
                  Save
                </Button>

                <br/>

                <ReleaseAlert force={force}></ReleaseAlert>
              </div>
            </div>
          :
          ""
        }
      </div>
    }
  </div>;
};
 
export default Release;