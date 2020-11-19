import React from 'react';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import ImportData from '../utils/ImportData.js';
import { useDispatch, useSelector } from 'react-redux';
import rootActions from '../actions/rootActions';
import ReserveExcelContent from './ReserveExcelContent';

const Reserve = () => {
  const dispatch = useDispatch();

  const excelContent = useSelector(state =>
    state.appReducer.reserveExcel
  );

  const action = useSelector(state =>
    state.appReducer.reserveAction
  );

  const submitter = useSelector(state =>
    state.appReducer.reserveSubmitter
  );

  const node = useSelector(state =>
    state.appReducer.reserveNode
  );

  const url = useSelector(state =>
    state.appReducer.reserveUrl
  );

  const reserveResponse = useSelector(state =>
    state.appReducer.reserveResponse
  );

  const handleActionChange = event => {
    dispatch(rootActions.appAction.setReserveAction(event.target.value));
  }

  const handleSubmitterChange = event => {
    dispatch(rootActions.appAction.setReserveSubmitter(event.target.value));
  }

  const handleNodeChange = event => {
    dispatch(rootActions.appAction.setReserveNode(event.target.value));
  }

  const handleUrlChange = event => {
    dispatch(rootActions.appAction.setReserveUrl(event.target.value));
  }

  const handleReserveButtonClick = event => {
    const convertedExcelContent = {
      labels: excelContent
    }

    const reserveVariables = {
      excelContent: convertedExcelContent,
      action,
      submitter,
      node,
      url
    }

    dispatch(rootActions.appAction.sendReserveRequest(reserveVariables));
  }

  return <div>
    <Typography>Reserve</Typography>
    <br/>
    {reserveResponse?
      <div>
        Detail:{String(reserveResponse)}
      </div>
      :
      <div>
      <form>
        <FormControl required>
          <InputLabel id="demo-simple-select-required-label">Action</InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={action}
            onChange={handleActionChange}
          >
            <MenuItem value={'reserve'}>Reserve</MenuItem>
            <MenuItem value={'draft'}>Draft</MenuItem>
          </Select>
        </FormControl>
        <br/>
        <br/>
        <TextField 
          label="Submitter" 
          variant="outlined"
          value={submitter}
          onChange={handleSubmitterChange}
          required
        />
        <br/>
        <br/>
        <TextField 
          label="Node" 
          variant="outlined" 
          value={node}
          onChange={handleNodeChange}
          required
        />
        <br/>
        <br/>
        <TextField 
          label="Url" 
          variant="outlined"
          value={url}
          onChange={handleUrlChange}
        />
      </form>
      <br/>
      <ImportData/>
      <ReserveExcelContent></ReserveExcelContent>
      <br/>
      <Button 
        variant="contained"
        color="primary"
        onClick={handleReserveButtonClick}
      >
          Reserve
      </Button>
    </div>
    }
    
  </div>;
};
 
export default Reserve;