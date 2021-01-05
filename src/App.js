import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Menu from './components/Menu/MainMenu';
import Home from './pages/Home';
import Diary from './pages/Diary';
import Workbox from './pages/Workbox';

const App = () => {
  const { palette } = useSelector(state => state);

  return (
    <ThemeProvider theme={palette}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/diary">
          <Diary />
        </Route>
        <Route path="/workbox">
          <Workbox />
        </Route>
        <Route path="/photo">
          <Photo />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

function Photo() {
  return (
    <div>
      Photo
      <Menu />
    </div>
  );
}

export default App;
