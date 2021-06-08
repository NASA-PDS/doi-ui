import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Divider from '@material-ui/core/Divider';
import rootActions from '../actions/rootActions';
import { Link, NavLink } from 'react-router-dom'

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
  activeLink: {
    fontWeight: 'bolder'
  },
  link: {
    color:'inherit',
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
        textDecoration: 'none'
    }
  }
}));

const DoiAppBar = () => {
  const dispatch = useDispatch();
  
  const handleHomeClick = event => {
    dispatch(rootActions.appAction.resetSearch());
    dispatch(rootActions.appAction.resetStoredData());
  }
  
  const handleSearchClick = event => {
    dispatch(rootActions.appAction.resetSearch());
    dispatch(rootActions.appAction.resetStoredData());
  }
  
  const handleFaqClick = event => {
    dispatch(rootActions.appAction.resetSearch());
    dispatch(rootActions.appAction.resetStoredData());
  }
  
  const classes = useStyles();

  return <AppBar position="static" className={classes.doiAppBar}>
      <Toolbar>
        <div className={classes.mainNav}>
          <Link to="/home" className={classes.link}>
            <Typography
              variant="h5"
              className={classes.title}
              onClick={handleHomeClick}
            >
              PDS DOI Management
            </Typography>
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.verticalDivider}
          />

          <Button
            color="inherit"
            onClick={handleHomeClick}
            component={NavLink}
            activeClassName={classes.activeLink}
            to="/home"
          >
            Home
          </Button>


          <Button
            color="inherit"
            onClick={handleSearchClick}
            component={NavLink}
            activeClassName={classes.activeLink}
            to="/search"
          >
            Search
          </Button>
        </div>

        <Button
          color="inherit"
          onClick={handleFaqClick}
          component={NavLink}
          activeClassName={classes.activeLink}
          to="/faq"
        >
          FAQ
        </Button>

      </Toolbar>
    </AppBar>;
};

export default DoiAppBar;

