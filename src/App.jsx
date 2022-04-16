import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import Banner from './components/Banner';
import DoiAppBar from './components/DoiAppBar';
import AppBody from './components/AppBody';
import ConnectionCheck from './components/ConnectionCheck';
import '@fontsource/roboto';
import './App.css';

function App() {
  const store = configureStore();

  return (
    <Provider store={store}>
      <div className="App">
        <Banner/>
        <DoiAppBar/>
        <ConnectionCheck/>
        <AppBody store={store}/>
      </div>
    </Provider>
  );
}

export default App;
