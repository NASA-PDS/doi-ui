import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import {useDispatch} from "react-redux";
import rootActions from "../actions/rootActions";


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

const SearchIdentifier = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchIdentifier, setSearchIdentifier] = useState('');

  const handleInputChange = (event) => {
    setSearchIdentifier(event.target.value.trim());

    // doesn't need immediate listener unless real-time filter on user type
    // dispatch(rootActions.appAction.setSearchIdentifier(event.target.value.trim()));
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };
  
  const handleSearch = () => {
    dispatch(rootActions.appAction.sendSearchRequest(searchIdentifier));
  };

  const handleClear = () => {
    setSearchIdentifier('');
    dispatch(rootActions.appAction.setSearchClear());
  };

  return (
      <div className={classes.center}>
        <Paper component="form" className={classes.search}>
          <InputBase
              className={classes.input}
              value={searchIdentifier}
              inputProps={{ 'aria-label': 'search searchIdentifier' }}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
          />
          <IconButton
              className={classes.iconButton}
              aria-label="search"
              onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
              className={classes.iconButton}
              aria-label="clear"
              onClick={handleClear}
          >
            <ClearIcon />
          </IconButton>
        </Paper>
      </div>
  )
};

export default SearchIdentifier;