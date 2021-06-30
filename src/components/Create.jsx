import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import rootActions from '../actions/rootActions';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import PageHeader from './PageHeader';
import Submitter from './Submitter';
import Draft from './Draft';
import Reserve from './Reserve';
import HelpInfo from './HelpInfo';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '25px',
    marginBottom: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}));

const Create = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isRegistered = useSelector(state =>
    state.appReducer.isRegistered
  );

  const handleRadio = (event) => {
    dispatch(rootActions.appAction.setIsRegistered(event.target.value));
  };

  return (
      <div className={classes.root}>
        <PageHeader header={'Create DOI'}/>
        
        <Submitter/>
        
        <div className={classes.flexRow}>
        <Typography>
          Has the data been registered and made publicly available?
        </Typography>
          <HelpInfo type={'general'}/>
        </div>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="registered" name="registered" value={isRegistered} onChange={handleRadio}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <br/>
        
        {isRegistered === 'no' && <Reserve/>}
        {isRegistered === 'yes' && <Draft/>}
      </div>
  )
};

export default Create;