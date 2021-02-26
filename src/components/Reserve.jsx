import React from 'react';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import ImportData from './ImportData.js';
import { useDispatch, useSelector } from 'react-redux';
import rootActions from '../actions/rootActions';
import ReserveExcelContent from './ReserveExcelContent';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  alert: {
    '& .MuiAlert-message':{
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
}));

const Reserve = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [force, setForce] = React.useState(false);

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

  const handleForceChange = (event) => {
    setForce(event.target.checked);
  };

  const handleReserveButtonClick = event => {
    const convertedExcelContent = {
      labels: excelContent
    }

    const reserveVariables = {
      excelContent: convertedExcelContent,
      submitter,
      node,
      force
    }

    dispatch(rootActions.appAction.sendReserveRequest(reserveVariables));
  }

  const handleRetryReserve = event => {
    dispatch(rootActions.appAction.retryReserve());
  }

  return <div>
    <br/>
    <Typography variant="h4">Reserve</Typography>
    <br/>
    
    {reserveResponse?
      reserveResponse.errors?
        <div>
          <Alert icon={false} severity="error" className={classes.alert}>
            <p><b>Error:</b> {String(reserveResponse.errors[0].name)}</p>
            <p><b>Description:</b> {String(reserveResponse.errors[0].message)}</p>
          </Alert>

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
          <Alert icon={false} severity="success">
            <AlertTitle>Submission Successful!</AlertTitle>
            An email will be sent to you when your submission has been reserved.
          </Alert>
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

        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReserveButtonClick}
            disabled={!(submitter && node && excelContent)}
          >
            Reserve
          </Button>

          <FormControlLabel
            control={<Checkbox checked={force} onChange={handleForceChange} name="force" color="secondary" />}
            label="Ignore warnings"
          />
        </div>
      </div>
    }
  </div>;
};
 
export default Reserve;