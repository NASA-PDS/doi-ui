import React from 'react';
import {useSelector} from 'react-redux';
import Home from './Home';
import Create from './Create';
import Search from './Search';
import Release from './Release';
import FAQ from './FAQ';
import Container from '@material-ui/core/Container';
import { Redirect, Route, Switch} from 'react-router-dom';


const AppBody = () => {
  return <Container>
    <Switch>
      <Route path="/home">
        <Home/>
      </Route>
      <Route path="/create">
        <Create/>
      </Route>
      <Route path="/search/:searchText+">
        <Search/>
      </Route>
      <Route path="/search/">
        <Search/>
      </Route>
      <Route path="/release/:searchLidvid+">
        <Release/>
      </Route>
      <Route path="/release">
        <Release/>
      </Route>
      <Route path="/faq">
        <FAQ/>
      </Route>
      <Route path="/">
        <Redirect to="/home"/>
      </Route>
    </Switch>
  </Container>;
};

export default AppBody;