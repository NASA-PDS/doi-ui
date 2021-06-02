import React from 'react';
import PageHeader from "./PageHeader";
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const Search = () => {
  return (
    <div className="mtc-root-child flex-column align-center">
        <PageHeader header={'Search'} text={'Update an existing DOI by first locating it within our database using the search box below. ' +
        'Search by DOI, LID, LIDVID, or PDS3 Data Set ID.'}/>
        
        <SearchBar />
        <SearchResults/>
      </div>
  )
};

export default Search;