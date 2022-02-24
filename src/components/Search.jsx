import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {DoiSearch} from "@nasapds/pds-wds-react";
import { useHistory, useParams } from 'react-router-dom'

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
  let params = useParams();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <DoiSearch 
        useClientRouter={true} 
        params={params}
        history={history}
        showActions={props.showActions} 
        store={props.store}
      />
    </div>
    
  )
};

export default Search;