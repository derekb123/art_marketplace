import React, { Component } from 'react';
import './App.css';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <NavBar/>
          <Switch>
            <Route path='/' exact={true} component={ Home }/>
            <Route path='*'component={ NotFound }/>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
