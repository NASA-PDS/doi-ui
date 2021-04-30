import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ViewDataTable from './ViewDataTable';
import SearchIdentifier from './SearchIdentifier';
import Config from "../Config";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
  mtcRootChild: {
    marginTop: '25px'
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}));

const ViewData = () => {
  const classes = useStyles();
  const [dataState, setDataState] = useState('loading');
  const [allData, setAllData] = useState();
  const [exactData, setExactData] = useState();
  const [relatedData, setRelatedData] = useState();
  
  useEffect(() => {
    if (allData === undefined) {
      let isSubscribed = true;
      const jsonSort = (prop) => {
        return function(a, b) {
          if (a[prop] > b[prop]) {
            return -1;
          } else if (a[prop] < b[prop]) {
            return 1;
          }
          return 0;
        }
      };
      fetchAllData().then(data => {
        if (isSubscribed) {
          const sortedData = data.sort(jsonSort('update_date'));
          setAllData(sortedData);
          setRelatedData(sortedData);
          setDataState('default');
        }
      });
      return () => {
        isSubscribed = false;
      }
    }
  }, []);

  const fetchAllData = async () => {
    const response = await fetch(Config.api.baseUrl)
    return await response.json();
  };
  
  const searchClear = useSelector(state => {
    return state.appReducer.searchClear;
  });
  
  const searchIdentifier = useSelector(state => {
    return state.appReducer.searchIdentifier;
  });
  
  const searchResults = useSelector(state => {
    return state.appReducer.searchResponse;
  });
  
  useEffect(() => {
    const exactMatch = (results, identifier) => {
      return results.length === 1 && (identifier === results[0].doi || identifier === results[0].lidvid);
    }
    
    let toSearchIdentifier;
    if (searchClear) {
      setExactData(null);
      setRelatedData(allData);
    } else {
      if (searchResults.length >= 1) {
        if (exactMatch(searchResults, searchIdentifier)) {
          setExactData(searchResults);
          // Look at searchResult's identifier b/c searchIdentifier could be a DOI. Extract bundle_id
          toSearchIdentifier = searchResults[0].lidvid.split(':', 4)[3];   // i.e. urn:nasa:pds:bundle:collection:product::version
        } else { // wildcard search with one or more results
          setExactData([]);
          setRelatedData(searchResults);
        }
      } else { // no match.
        setExactData([]);
        // Look at searchIdentifier. Assume if it's all numbers that it's a DOI and not usable for wildcard search
        toSearchIdentifier = searchIdentifier.replace(/\./g, '').replace(/\//g, '');
        const isDoi = /^\d+$/.test(toSearchIdentifier);
        if (isDoi) {
          toSearchIdentifier = undefined;
        } else {
          if (toSearchIdentifier.indexOf(':') !== -1) {
            let idx;
            if (toSearchIdentifier.startsWith('urn:nasa:pds')) {
              idx = 'urn:nasa:pds:'.length;
            } else if (toSearchIdentifier.startsWith(':')) {
              idx = 1;
            } else {
              idx = 0;
            }
            toSearchIdentifier = toSearchIdentifier.substring(idx, toSearchIdentifier.indexOf(':', idx));
          }
        }
      }
      
      if (toSearchIdentifier) {
        toSearchIdentifier = '*' + toSearchIdentifier + '*';
        fetchRelatedData(toSearchIdentifier).then(data => {
          if (data.length === 0) {
            setRelatedData(allData);
          } else {
            if (searchResults[0] === undefined || !exactMatch(data, searchResults[0].lidvid)) {
              setRelatedData(data)
            }
          }
        });
      }
    }
  }, [searchClear, searchIdentifier, searchResults]);
  
  const fetchRelatedData = async (identifier) => {
    const response = await fetch(Config.api.baseUrl + '?lid=' + encodeURIComponent(identifier));
    return await response.json();
  };

  return (
      <div className={`${classes.flex} ${classes.mtcRootChild}`}>
        <SearchIdentifier />
        {(() => {
          switch (dataState) {
            case 'loading':
              return <div>SPINNER</div>
            case 'default':
              return (
                <>
                  <ViewDataTable data={exactData} table={"primary"}/>
                  <ViewDataTable data={relatedData} table={"secondary"}/>
                </>
              )
            default:
              return <div>Error. Contact <a href="mailto:pds-operator@jpl.nasa.gov">pds-operator@jpl.nasa.gov</a> is this persists.</div>
          }
        })()}
      </div>
  )
};

export default ViewData;