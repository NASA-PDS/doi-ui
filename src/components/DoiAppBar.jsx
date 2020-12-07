import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import rootActions from '../actions/rootActions';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: "flex",
    '&:hover': {
      cursor: "pointer",
   },
  }
}));

const DoiAppBar = () => {
  const isReleasing = useSelector(state => 
    state.appReducer.isReleasing
  )
  const isReserving = useSelector(state => 
    state.appReducer.isReserving
  )
  
  const dispatch = useDispatch();
  
  const handleReserveClick = event => {
    dispatch(rootActions.appAction.setIsReserving(true));
  }
  
  const handleReleaseClick = event => {
    dispatch(rootActions.appAction.setIsReleasing(true));
  }

  const handleTitleClick = event => {
    dispatch(rootActions.appAction.setIsSelecting(true));
  }

  const classes = useStyles();

  return <AppBar position="static">
      <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={handleTitleClick}
          >
            DOI Reserve And Release
          </Typography>

          <Button
            variant={isReserving? "outlined": ""}
            color="inherit"
            onClick={handleReserveClick}
          >
            Reserve
          </Button>

          <Button
            variant={isReleasing? "outlined": ""}
            color="inherit"
            onClick={handleReleaseClick} 
          >
            Release
          </Button>
      </Toolbar>
    </AppBar>;
};

export default DoiAppBar;

