import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Release from '../components/Release';
import Reserve from '../components/Reserve';
import Button from '@material-ui/core/Button';
import rootActions from '../actions/rootActions';
 
const Select = () => {

  const isSelecting = useSelector(state =>
    state.appReducer.isSelecting
  );
  
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

  return <div>
    {isSelecting? 
      <div>
        <Button onClick={handleReserveClick}>Reserve</Button>
        <Button onClick={handleReleaseClick}>Release</Button>
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
  </div>;
};

export default Select;