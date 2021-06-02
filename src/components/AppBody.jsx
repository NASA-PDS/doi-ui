import React from 'react';
import {useSelector} from 'react-redux';
import Home from './Home';
import Create from './Create';
import Search from './Search';
import Release from './Release';
import FAQ from './FAQ';
import Container from '@material-ui/core/Container';


const AppBody = () => {
  const isSelecting = useSelector(state =>
    state.appReducer.isSelecting
  )
  
  const isCreating = useSelector(state =>
      state.appReducer.isCreating
  )
  
  const isReleasing = useSelector(state => 
    state.appReducer.isReleasing
  )

  const isSearching = useSelector(state =>
      state.appReducer.isSearching
  )
  
  const isFaq = useSelector(state =>
      state.appReducer.isFaq
  )
  
  return <Container>
    {isSelecting && <Home/>}
    {isCreating && <Create/>}
    {isSearching && <Search/>}
    {isReleasing && <Release/>}
    {isFaq && <FAQ/>}
  </Container>;
};

export default AppBody;