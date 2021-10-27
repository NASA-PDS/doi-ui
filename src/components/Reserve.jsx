import React from 'react';
import { Button, Typography } from '@material-ui/core';
import ImportData from './ImportData.js';
import { useDispatch, useSelector } from 'react-redux';
import rootActions from '../actions/rootActions';
import ReserveExcelContent from './ReserveExcelContent';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import excel from '../assets/DOI_reserve_template.xlsx';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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

const Reserve = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [force, setForce] = React.useState(false);

  const excelContent = useSelector(state =>
    state.appReducer.reserveExcel
  );

  const submitter = useSelector(state =>
    state.appReducer.submitter
  );

  const node = useSelector(state =>
    state.appReducer.node
  );

  const reserveResponse = useSelector(state =>
    state.appReducer.reserveResponse
  );

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
  const handleResetReserve = event => {
    dispatch(rootActions.appAction.resetReserve());
      setForce(false);
  }

  return <div className="mtc-root-child flex-column align-center">
    <Typography>
      Download and complete <a href = {excel} target = "_blank">this Excel file</a>. Once completed, upload it using the field below:
    </Typography>
    <br/>
  
    <ImportData/>
  
    <ReserveExcelContent></ReserveExcelContent>
  
    <br/>
    
    {reserveResponse?
      reserveResponse.errors?
        <div>
          <Alert icon={false} severity="error" className={classes.alert}>
            <p>{String(reserveResponse.errors[0].name)}</p>
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
          <Alert icon={false} severity="success" className={classes.alert}>
            <AlertTitle>Submission Successful!</AlertTitle>
            Your DOI for {reserveResponse[0].title} is <b>{reserveResponse[0].doi}</b>
            <br/><br/>
            <b>Once your data is online and registered, <Link to={'/release/' + reserveResponse[0].identifier}> release your DOI here</Link>.</b>
            <br/><br/>
            <b>Or</b>
            <br/><br/>
            <Button
              variant="outlined"
              onClick={handleResetReserve}
            >
              Create A New DOI
            </Button>
            <br/>
              
            <br/>
            
          </Alert>
        </div>
      :
      <div className={`${classes.flexColumn} ${classes.alignCenter}`}>
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
    }
  </div>;
};
 
export default Reserve;