import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
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
            <Routes>
              <Route exact path='/' element={<Group/>}/>
              <Route path='/group' element={<Group/>}/>
              <Route path='/personal' element={<Personal/>}/>
              <Route path='*' element={
                <div style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </div>
              }/>
            </Routes>
          </IsMobileProvider>
        </ThemeProvider>
      </PeopleProvider>
    </BrowserRouter>
  );
}

export default App;
