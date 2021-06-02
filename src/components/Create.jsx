import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import PageHeader from './PageHeader';
import Submitter from './Submitter';
import Draft from './Draft';
import Reserve from './Reserve';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '25px',
    marginBottom: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const Create = () => {
  const classes = useStyles();
  const [isRegistered, setIsRegistered] = React.useState(null);

  const handleRadio = (event) => {
    setIsRegistered(event.target.value);
  };

  return (
      <div className={classes.root}>
        <PageHeader header={'Create DOI'}/>
        
        <Submitter/>
        
        <Typography>
          Has the data been registered and made publicly available?
        </Typography>
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