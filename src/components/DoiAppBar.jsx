import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Divider from '@material-ui/core/Divider';
import rootActions from '../actions/rootActions';

const useStyles = makeStyles((theme) => ({
  doiAppBar: {
    backgroundColor: '#143264'
  },
  mainNav: {
    flexGrow: 1,
    display: 'flex'
  },
  title: {
    paddingRight: '12px',
   '&:hover': {
     cursor: 'pointer',
    }
  },
  verticalDivider: {
    backgroundColor: 'rgba(255,255,255,0.75)'
  },
  bold: {
    fontWeight: 'bold'
  }
}));

const DoiAppBar = () => {
  const isSelecting = useSelector(state =>
    state.appReducer.isSelecting
  )
  const isSearching = useSelector(state =>
    state.appReducer.isSearching
  )
  const isFaq = useSelector(state =>
      state.appReducer.isFaq
  )
  const dispatch = useDispatch();
  
  const handleHomeClick = event => {
    dispatch(rootActions.appAction.resetSearch());
    dispatch(rootActions.appAction.resetStoredData());
    dispatch(rootActions.appAction.setIsSelecting(true));
  }
  
  const handleSearchClick = event => {
    dispatch(rootActions.appAction.resetSearch());
    dispatch(rootActions.appAction.resetStoredData());
    dispatch(rootActions.appAction.setIsSearching(true));
  }
  
  const handleFaqClick = event => {
    dispatch(rootActions.appAction.resetSearch());
    dispatch(rootActions.appAction.resetStoredData());
    dispatch(rootActions.appAction.setIsFaq(true));
  }
  
  const classes = useStyles();

  return <AppBar position="static" className={classes.doiAppBar}>
      <Toolbar>
        <div className={classes.mainNav}>
          <Typography
            variant="h5"
            className={classes.title}
            onClick={handleHomeClick}
          >
            PDS DOI Management
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.verticalDivider}
          />
          <Button
            color="inherit"
            className={isSelecting && classes.bold}
            onClick={handleHomeClick}
          >
            Home
          </Button>

          <Button
            color="inherit"
            className={isSearching && classes.bold}
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </div>
          <Button
            color="inherit"
            className={isFaq && classes.bold}
            onClick={handleFaqClick}
          >
            FAQ
          </Button>
      </Toolbar>
    </AppBar>;
};

export default DoiAppBar;

