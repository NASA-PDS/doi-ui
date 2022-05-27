import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import DoiAppBar from './components/DoiAppBar';
import AppBody from './components/AppBody';
import ConnectionCheck from './components/ConnectionCheck';
import {
  MuiThemeProvider,
  ThemeProvider,
  StylesProvider,
  createGenerateClassName,
  createTheme
} from '@material-ui/core/styles';
import '@fontsource/roboto';
import './App.css';

const generateClassName = createGenerateClassName({
  seed: 'doi-ui',
});

let theme = createTheme();

function App() {
  const store = configureStore();

  return (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <div className="App">
              <DoiAppBar/>
              <ConnectionCheck/>
              <AppBody store={store}/>
            </div>
          </Provider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default App;
