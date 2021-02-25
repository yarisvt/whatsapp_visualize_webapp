import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/header/Header';

import Total from './pages/total/Total';
import Avg from './pages/avg/Avg';
import Search from './pages/search/Search';

function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Switch>
          <Route exact path='/' component={Total}/>
          <Route exact path='/total-messages-per-person' component={Total}/>
          <Route exact path='/average-characters-per-message' component={Avg}/>
          <Route exact path='/get-by-word' component={Search}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
