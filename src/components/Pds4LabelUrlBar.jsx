import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import {useDispatch, useSelector} from "react-redux";
import rootActions from "../actions/rootActions";
import {Button} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginRight: '1em'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  }
}));

const Pds4LabelUrlBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [labelUrl, setLabelUrl] = useState('');
  const [force, setForce] = useState(false);
  

  const submitter = useSelector(state =>
    state.appReducer.submitter
  );

  const node = useSelector(state =>
    state.appReducer.node
  );
  
  const handleLabelUrlChange = (event) => {
    setLabelUrl(event.target.value);
  };

  const handleLabelUrlSearch = () => {
    const labelData = {
      labelUrl,
      node,
      submitter,
      force
    }
    
    dispatch(rootActions.appAction.sendPds4LabelSearchRequest(labelData));
  };
  
  const handleForceChange = (event) => {
    setForce(event.target.checked);
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleLabelUrlSearch();
    }
  };
  
  return (
      <div className={classes.root}>
        <div className={classes.flexRow}>
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
            Upload Label
          </Button>
        </div>
        <FormControlLabel
            control={<Checkbox checked={force} onChange={handleForceChange} name="force" color="secondary" />}
            label="Ignore warnings"
        />
        <br/>
      </div>
  )
};

export default Pds4LabelUrlBar;
