import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { PeopleProvider } from './context/PeopleContext';
import Header from './components/header/Header';

import Personal from './pages/personal/Personal';
import Avg from './pages/avg/Avg';
import Search from './pages/search/Search';

function App() {
  return (
    <BrowserRouter>
      <PeopleProvider>
        <Header/>
          <Switch>
            <Route exact path='/' component={Personal}/>
            <Route exact path='/personal' component={Personal}/>
            <Route exact path='/average-characters-per-message' component={Avg}/>
            <Route exact path='/get-by-word' component={Search}/>
          </Switch>
      </PeopleProvider>
    </BrowserRouter>
  );
}

export default App;
