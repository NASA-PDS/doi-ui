import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Release from './Release';
import Reserve from './Reserve';
import ViewData from './ViewData';
import Button from '@material-ui/core/Button';
import rootActions from '../actions/rootActions';
import Container from '@material-ui/core/Container';

const AppBody = () => {

  const isSelecting = useSelector(state =>
    state.appReducer.isSelecting
  );
  
  const isReleasing = useSelector(state => 
    state.appReducer.isReleasing
  )

  const isReserving = useSelector(state => 
    state.appReducer.isReserving
  )

  const isViewing = useSelector(state =>
      state.appReducer.isViewing
  );

  const dispatch = useDispatch();

  const handleReserveClick = event => {
    dispatch(rootActions.appAction.setIsReserving(true));
  }

  const handleReleaseClick = event => {
    dispatch(rootActions.appAction.setIsReleasing(true));
  }

  return <Container>
    {isSelecting?
      <div>
        <br/>
        <br/>
        <br/>

        <p>Would you like to reserve or release?</p>

        <Button 
          variant="outlined"
          onClick={handleReserveClick}
        >
          Reserve
        </Button>
        &nbsp;
        <Button
          variant="outlined" 
          onClick={handleReleaseClick}
        >
          Release
        </Button>
      </div>
      :
      ''
    }

    {
      isReleasing?
        <Release/>
        :
        ''
    }

    {
      isReserving?
      <Reserve/>  
      :
      ''
    }

    {
      isViewing?
        <ViewData/>
        :
        ''
    }
  </Container>;
};

export default AppBody;