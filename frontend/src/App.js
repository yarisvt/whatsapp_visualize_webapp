import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { PeopleProvider } from './context/PeopleContext';
import Header from './components/header/Header';

import Personal from './pages/personal/Personal';
import Group from './pages/group/Group';
import { ThemeProvider } from './context/ThemeContext';
import { IsMobileProvider } from './context/IsMobileContext';


function App() {
  return (
    <BrowserRouter>
      <PeopleProvider>
        <ThemeProvider>
          <IsMobileProvider>
            <Header/>
            <Switch>
              <Route exact path='/' component={Group}/>
              <Route exact path='/group' component={Group}/>
              <Route exact path='/personal' component={Personal}/>
            </Switch>
          </IsMobileProvider>
        </ThemeProvider>
      </PeopleProvider>
    </BrowserRouter>
  );
}

export default App;
