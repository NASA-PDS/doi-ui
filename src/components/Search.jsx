import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {DoiSearch} from "@nasapds/pds-wds-react";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const Search = (props) => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <DoiSearch showActions={props.showActions} store={props.store}/>
    </div>
    
  )
};

export default Search;