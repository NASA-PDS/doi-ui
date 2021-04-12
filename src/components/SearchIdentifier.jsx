import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import {useDispatch, useSelector} from "react-redux";
import rootActions from "../actions/rootActions";
import {Alert, AlertTitle} from "@material-ui/lab";


const useStyles = makeStyles((theme) => ({
  center: {
    alignSelf: 'center',
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 500,
    marginTop: '25px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }
}));

const SearchIdentifier = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [identifierType, setIdentifierType] = useState('');
  const [identifier, setIdentifier] = useState('');

  const searchResults = useSelector(state => {
    return state.appReducer.doiSearchResponse;
  });

  const handleSearchInputChange = (event) => {
    setIdentifier(event.target.value.trim());
  };

  let alert;
  const handleIdentifierSearch = () => {
    if (identifier.startsWith('10.')) {
      setIdentifierType('doi');
      dispatch(rootActions.appAction.sendDoiSearchRequest(identifier));
    } else if (identifier.startsWith('urn:')) {
      setIdentifierType('pds4lidvid');
      dispatch(rootActions.appAction.sendLidvidSearchRequest(identifier));
    } else {
      setIdentifierType('N/A');
      alert = <Alert icon={false} className={classes.alert}><AlertTitle>Unrecognized format.</AlertTitle></Alert>
    }
  };


  useEffect(() => {
    if (searchResults !== null) {
      props.type(identifierType);
      props.value(identifier);
      props.onResponse(searchResults);
    }
  }, [searchResults]);

  const handleClearSearch = () => {
    props.clearSearch(true);
    setIdentifier('');
  };

  return (
      <div className={classes.center}>
        <Paper component="form" className={classes.search}>
          <InputBase
              className={classes.input}
              value={identifier}
              inputProps={{ 'aria-label': 'search metadata' }}
              onChange={handleSearchInputChange}
          />
          <IconButton
              className={classes.iconButton}
              aria-label="search"
              onClick={handleIdentifierSearch}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
              className={classes.iconButton}
              aria-label="clear"
              onClick={handleClearSearch}
          >
            <ClearIcon />
          </IconButton>
        </Paper>

        {identifierType === 'N/A' && alert}
      </div>
  )
};

export default SearchIdentifier;