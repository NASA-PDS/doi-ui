import React from 'react';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import ImportData from './ImportData.js';
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

  const handleRetryReserve = event => {
    dispatch(rootActions.appAction.resetReserveInputs());
  }

  return <div>
    <br/>
    <Typography>Reserve</Typography>
    <br/>
    {reserveResponse?
      reserveResponse.errors?
        <div>
          <p><b>An error has occured:</b> {String(reserveResponse.errors[0].name)}</p>
          <p><b>Description:</b> {String(reserveResponse.errors[0].message)}</p>
          <p>
            <Button
              variant="outlined"
              onClick={handleRetryReserve}
            >
              Retry
            </Button>
          </p>
        </div>
        :
        <div>
          <p>Your submission was successful</p>
          <p>An email will be sent to you when your submission has been reserved.</p>
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
          disabled={!(submitter && node && excelContent)}
        >
          Reserve
        </Button>
      </div>
    }
    
  </div>;
};
 
export default Reserve;