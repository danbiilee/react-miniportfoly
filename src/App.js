import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Menu from './components/Menu/MainMenu';
import Home from './pages/Home';
import Diary from './pages/Diary';
import Workbox from './pages/Workbox';

const App = () => {
  const { layout, component } = useSelector(state => state.palette);

  return (
    <ThemeProvider
      theme={{
        layout,
        component,
      }}
    >
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
        <Route path="/gbook">
          <Gbook />
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
function Gbook() {
  return (
    <div>
      Gbook
      <Menu />
    </div>
  );
}

export default App;
