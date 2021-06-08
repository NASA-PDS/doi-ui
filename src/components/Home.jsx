import React from 'react';
import {useDispatch} from 'react-redux';
import SearchBar from './SearchBar';
import PageHeader from './PageHeader';
import rootActions from '../actions/rootActions';
import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import AddIcon from '@material-ui/icons/Add';
import Divider from "@material-ui/core/Divider";
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  ctaContainer: {
    padding: '0 3em',
    maxWidth: '350px'
  },
  ctaButton: {
    color: '#fff',
    backgroundColor: '#286491',
    borderRadius: 20,
    marginTop: '.5em'
  }
}));

const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  
  return (
      <div className="mtc-root-child flex-column align-center">
        <PageHeader header={'Welcome!'} text={'Update an existing DOI by first locating it within our database using the search box below.'}/>
  
        <SearchBar />
  
        <div className="flex-row">
          
          {/*<Card>*/}
          {/*  <CardActionArea>*/}
          {/*    /!*<CardMedia component="img">*!/*/}
          {/*    <CardMedia>*/}
          {/*      <CreateNewFolderIcon style={{ fontSize: 64 }}/>*/}
          {/*    </CardMedia>*/}
          {/*    <CardContent>*/}
          {/*      <Typography variant="h6" component="h2">*/}
          {/*        Create DOI*/}
          {/*      </Typography>*/}
          {/*      <Typography variant="body1" gutterBottom className="align-left">*/}
          {/*        Start here if you would like to reserve a DOI or initiate a DOI release.*/}
          {/*      </Typography>*/}
          {/*    </CardContent>*/}
          {/*  </CardActionArea>*/}
          {/*  <CardActions>*/}
          {/*    <Button*/}
          {/*        variant="contained"*/}
          {/*        startIcon={<AddIcon />}*/}
          {/*        className={classes.ctaButton}*/}
          {/*        onClick={handleCreateClick}*/}
          {/*    >*/}
          {/*      Create DOI*/}
          {/*    </Button>*/}
          {/*  </CardActions>*/}
          {/*</Card>*/}
  
          <div className={classes.ctaContainer}>
          <CreateNewFolderIcon style={{ fontSize: 64 }}/>
          <Typography variant="h6">
            Create DOI
          </Typography>
          <Typography
              variant="body1" gutterBottom
              className="align-left"
          >
            Start here if you would like to reserve a DOI or initiate a DOI release.
          </Typography>
          <Button
              variant="contained"
              startIcon={<AddIcon />}
              className={classes.ctaButton}
              component={Link}
              to="/create"
          >
            Create DOI
          </Button>
          </div>
          
          <Divider orientation="vertical" flexItem />
          <div className={classes.ctaContainer}>
            <QuestionAnswerIcon style={{ fontSize: 64 }}/>
            <Typography variant="h6">
              Questions?
            </Typography>
            <Typography
                variant="body1" gutterBottom
                className="align-left"
            >
              Learn more about the DOI process and browse frequently asked questions.
            </Typography>
            <Button
                variant="contained"
                className={classes.ctaButton}
                component={Link}
                to="/faq"
            >
              Frequently Asked Questions
            </Button>
          </div>
        </div>
      </div>
  )
};

export default Home;