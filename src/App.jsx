import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import Banner from './components/Banner';
import Select from './components/Select';
import 'fontsource-roboto';
import './App.css';


function App() {
  return (
    <Provider store={configureStore()}>
      <div className="App">
        <Banner/>
        <Select/>
      </div>
    </Provider>
  );
}

export default App;
