import React from 'react';
import PageHeader from "./PageHeader";
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const Search = () => {
  const classes = useStyles();
  
  return (
      <div className={classes.root}>
        <PageHeader header={'Search'} text={'Update an existing DOI by first locating it within our database using the search box below. ' +
        'Search by DOI, LID, LIDVID, or PDS3 Data Set ID.'}/>
        <SearchBar />
        <SearchResults/>
      </div>
  )
};

export default Search;