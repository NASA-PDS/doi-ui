import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import Banner from './components/Banner';
import DoiAppBar from './components/DoiAppBar';
import AppBody from './components/AppBody';
import '@fontsource/roboto';
import './App.css';

function App() {
  return (
    <Provider store={configureStore()}>
      <div className="App">
        <Banner/>
        <DoiAppBar/>
        <AppBody/>
      </div>
    </Provider>
  );
}

export default App;
