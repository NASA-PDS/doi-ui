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

  const submitter = useSelector(state =>
    state.appReducer.reserveSubmitter
  );

  const node = useSelector(state =>
    state.appReducer.reserveNode
  );

  const reserveResponse = useSelector(state =>
    state.appReducer.reserveResponse
  );

  const handleSubmitterChange = event => {
    dispatch(rootActions.appAction.setReserveSubmitter(event.target.value));
  }

  const handleNodeChange = event => {
    dispatch(rootActions.appAction.setReserveNode(event.target.value));
  }

  const handleReserveButtonClick = event => {
    const convertedExcelContent = {
      labels: excelContent
    }

    const reserveVariables = {
      excelContent: convertedExcelContent,
      submitter,
      node
    }

    dispatch(rootActions.appAction.sendReserveRequest(reserveVariables));
  }

  return <div>
    <br/>
    <Typography>Reserve</Typography>
    <br/>
    {reserveResponse?
      <div>
        Detail:{String(reserveResponse)}
      </div>
      :
      <div>
      <form>
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