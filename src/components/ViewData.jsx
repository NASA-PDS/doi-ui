import React, {useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import {Alert} from '@material-ui/lab';
import ViewDataExact from './ViewDataExact';
import ViewDataRelated from './ViewDataRelated';
import SearchIdentifier from './SearchIdentifier';
import Config from "../Config";

const useStyles = makeStyles((theme) => ({
  mtcRootChild: {
    marginTop: '25px'
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  subsectionHeader: {
    textAlign: 'left',
    marginBottom: 0
  }
}));

const ViewData = () => {
  const classes = useStyles();
  const [dataState, setDataState] = useState('initial');
  const [allData, setAllData] = useState();
  const [exactData, setExactData] = useState();
  const [relatedData, setRelatedData] = useState();
  const [searchedIdentifier, setSearchedIdentifier] = useState();
  const [searchedIdentifierType, setSearchedIdentifierType] = useState();

  useEffect(() => {
    if (allData === undefined) {
      let isSubscribed = true;
      fetchDois().then(data => {
        if (isSubscribed) {
          setAllData(data);
          setDataState('default');
        }
      });
      return () => {
        isSubscribed = false;
      }
    }
  }, [allData]);

  const fetchDois = async () => {
    const response = await fetch(Config.api.baseUrl)
    return await response.json();
  };

  const getSearchType = (type) => {
    setSearchedIdentifierType(type);
  };

  const getSearchValue = (value) => {
    setSearchedIdentifier(value);
  };

  const getSearchResponse = (searchResponse) => {
    setExactData(searchResponse);
  };

  const getSearchClearBoolean = (searchClear) => {
    if (searchClear) {
      setDataState('default');
    }
  };

  const getRelatedData = () => {
    if (exactData.errors && searchedIdentifierType === "doi") {
      setRelatedData(allData);
    } else {
      let lidvid = null;
      if (searchedIdentifierType === "doi") {
        lidvid = exactData.lidvid;
      } else if (searchedIdentifierType === "pds4lidvid") {
        lidvid = searchedIdentifier;
      }
      while (lidvid.charAt(lidvid.length - 1) === ':') {
        lidvid = lidvid.slice(0, -1);
      }
      const idx = lidvid.indexOf("::");
      let lid;
      if (idx !== -1) {
        lid = lidvid.substring(0, idx).split(":");
      } else {
        lid = lidvid.split(":");
      }
      const lidLength = lid.length;

      // urn:nasa:pds:<bundle_id>:<collection_id>:<product_id>::<version_id>
      // baseId should be "urn:nasa:pds:".
      // there's test data that doesn't follow this, e.g. lidvid=101::1.0
      const baseLid = lid[0] + ":" + lid[1] + ":" + lid[2];
      let bundleLid = null, collectionLid = null, productLid = null;
      const SPLIT_IDX_BUNDLE = 3, SPLIT_IDX_COLLECTION = 4, SPLIT_IDX_PRODUCT = 5
      if (lidLength > 3) {
        bundleLid = baseLid + ":" + lid[SPLIT_IDX_BUNDLE];
        if (lidLength > 4) {
          collectionLid = bundleLid + ":" + lid[SPLIT_IDX_COLLECTION]
          if (lidLength > 5) {
            productLid = collectionLid + ":" + lid[SPLIT_IDX_PRODUCT]
          }
        }
      }


      let relatedBundles = [], relatedCollections = [], relatedProducts = [];
      if (bundleLid !== null) {
        for (const dataItem of allData) {
          const tempLid = dataItem.lidvid.split(":", SPLIT_IDX_BUNDLE + 1);
          const tempBundleLid = baseLid + ":" + tempLid[SPLIT_IDX_BUNDLE];
          if (tempBundleLid === bundleLid && lidvid !== dataItem.lidvid) {
            relatedBundles.push(dataItem);
          }
        }

        if (collectionLid !== null) {
          for (const bundleItem of relatedBundles) {
            const tempLid = bundleItem.lidvid.split(":", SPLIT_IDX_COLLECTION + 1);
            const tempCollectionLid = bundleLid + ":" + tempLid[SPLIT_IDX_COLLECTION];
            if (tempCollectionLid === collectionLid && lidvid !== bundleItem.lidvid) {
              relatedCollections.push(bundleItem);
            }
          }

          if (productLid !== null) {
            for (const collectionItem of relatedCollections) {
              const tempLid = collectionItem.lidvid.split(":", SPLIT_IDX_PRODUCT + 1);
              const tempProductLid = collectionLid + ":" + tempLid[SPLIT_IDX_PRODUCT];
              if (tempProductLid === productLid && lidvid !== collectionItem.lidvid) {
                relatedProducts.push(collectionItem);
              }
            }
          }
        }
      }

      if (relatedBundles.length > 0) {
        if (relatedCollections.length > 0) {
          relatedBundles = relatedBundles.filter(x => relatedCollections.includes(x));
          if (relatedProducts.length > 0) {
            relatedCollections = relatedCollections.filter(x => relatedProducts.includes(x));
            setRelatedData(relatedBundles.concat(relatedCollections, relatedProducts));
          } else {
            setRelatedData(relatedBundles.concat(relatedCollections));
          }
        } else {
          setRelatedData(relatedBundles);
        }
      } else {
        setRelatedData(allData);
      }
    }

    setDataState('filtered');
  };

  useEffect(() => {
    if (exactData !== undefined) {
      getRelatedData();
    }
  }, [exactData]);


  return (
      <div className={`${classes.flex} ${classes.mtcRootChild}`}>
        <SearchIdentifier type={getSearchType} value={getSearchValue} onResponse={getSearchResponse} clearSearch={getSearchClearBoolean}/>

        {searchedIdentifierType === 'N/A' && <Alert icon={false} className={classes.alert}>Unrecognized format for DOI and PDS4 LIDVID.</Alert>}

        {(() => {
          switch(dataState) {
            case 'initial':
              return <div>SPINNER</div>
            case 'default':
              return (
                <>
                  <br/><br/><br/>
                  <ViewDataRelated data={allData}/>
                </>
              )
            case 'filtered':
              return (
                <>
                  <ViewDataExact data={exactData}/>
                  <Divider variant='middle'/>
                  <h4 className={classes.subsectionHeader}>Related Products:</h4>
                  <ViewDataRelated data={relatedData}/>
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