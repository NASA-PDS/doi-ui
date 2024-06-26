import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import rootActions from "../actions/rootActions";
import {makeStyles} from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme) => ({
  submitterForm: {
    margin: '1em 0'
  },
  nodeDropdown: {
    minWidth: 120,
  }
}));

const Submitter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [nodeOpen, setNodeOpen] = useState(false);
  
  const submitter = useSelector(state =>
      state.appReducer.submitter
  );
  
  const node = useSelector(state =>
      state.appReducer.node
  );
  
  const handleSubmitterChange = event => {
    dispatch(rootActions.appAction.retrySave());
    dispatch(rootActions.appAction.setSubmitter(event.target.value));
  }
  
  const handleNodeSelect = event => {
    dispatch(rootActions.appAction.retrySave());
    dispatch(rootActions.appAction.setNode(event.target.value));
  };
  
  const handleNodeOpen = () => {
    setNodeOpen(true);
  };
  
  const handleNodeClose = () => {
    setNodeOpen(false);
  };

  return (
      <form className={classes.submitterForm}>
        <TextField
            label="Submitter Email"
            variant="outlined"
            InputLabelProps={{shrink: submitter ? true : false}}
            value={submitter}
            onChange={handleSubmitterChange}
        />
        <br/>
        <br/>
        <FormControl variant="outlined" className={classes.nodeDropdown}>
          <InputLabel id="select-node-label">Node</InputLabel>
          <Select
              labelId="select-node-label"
              id="select-node"
              value={node ? node.toUpperCase() : ''}
              open={nodeOpen}
              onOpen={handleNodeOpen}
              onClose={handleNodeClose}
              onChange={handleNodeSelect}
              label="Node"
          >
            <MenuItem value=''><em>None</em></MenuItem>
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
  )
};

export default Submitter;