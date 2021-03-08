import React from 'react';
import {Router, Route} from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar';

const Routes = (props) => {
  <Router {...props}>

    <Route path='/' component={App}>
      <NavBar/>
      <Route path='/Home'component={Home}/>
      <Route path='*'component={NotFound}/>
    </Route>

  </Router>
};

export default Routes;
