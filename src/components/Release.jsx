import React, { useState } from 'react';
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
import UatKeyWordAutoComplete from './UatKeyWordAutoComplete';
import { findXmlTag } from '../utils/xmlUtil';
 
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
    width: "95%"
  },
  disabled: {
    color: theme.palette.text.disabled,
  }
}));

const Release = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [doiOrLidvid, setDoiOrLidvid] = useState("pds4lidvid");
  const [doiLidvid, setDoiLidvid] = useState("doi");
  const [labelUrl, setLabelUrl] = useState("");

  const doiSearchResults = useSelector(state => {
    return state.appReducer.doiSearchResponse;
  });

  const releaseResponse = useSelector(state => {
    return state.appReducer.releaseResponse;
  });

  const releaseXml = useSelector(state =>
    state.appReducer.releaseXml
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
    }
    if(doiOrLidvid === "pds4lidvid"){
      dispatch(rootActions.appAction.sendLidvidSearchRequest(doiLidvid));
    }
  };

  const handleReleaseXmlChange = (event) => {
    dispatch(rootActions.appAction.updateReleaseXml(event.target.value));
    dispatch(rootActions.appAction.updateReleaseKeywords(findXmlTag(event.target.value, "keywords")));
  }

  return <div>
    <br/>
    <Typography>Release</Typography>

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
            disabled
          >
            <MenuItem value={"doi"}>DOI</MenuItem>
            <MenuItem value={"pds4lidvid"}>PDS4 LIDVID</MenuItem>
          </Select>
        </FormControl>

        <InputBase
          className={classes.input}
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
        <Typography
          className={classes.disabled}
        >
          PDS4 Label URL
        </Typography>
        <InputBase
          className={classes.input}
          placeholder="urn:nasa:pds:lab_shocked_feldspars::1.0"
          inputProps={{ 'aria-label': 'Enter PDS4 Label Url' }}
          onChange={handleLabelUrlChange}
          disabled
        />
        <IconButton 
          className={classes.iconButton}
          aria-label="search"
          onClick={handleLabelUrlSearch}
          disabled
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>

    {doiSearchResults?
      doiSearchResults.errors?
        <div>
          <p><b>An error has occured:</b> {String(doiSearchResults.errors[0].name)}</p>
          <p><b>Description:</b> {String(doiSearchResults.errors[0].message)}</p>
          <p>Please try searching again.</p>
        </div>
        :
        <div>
          <div>
            <p>Your DOI is ready to be released. Please update the metadata below if necessary.</p>
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
          <div>
            <ReleaseAlert></ReleaseAlert>
          </div>
        </div>
      :
      ""
    }


    {releaseResponse?
      releaseResponse.errors?
        <div>
          <p><b>An error has occured:</b> {String(releaseResponse.errors[0].name)}</p>
          <p><b>Description:</b> {String(releaseResponse.errors[0].message)}</p>
          <p>Please try releasing again.</p>
        </div>
        :
        ""
      :
      ""
    }
  </div>;
};
 
export default Release;