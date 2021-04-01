import React from 'react';
import './App.css';
import './styles/App.scss';
import {  Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar';
import MarketProvider from './context/marketProvider';
import AssetDetail from './components/AssetDetail';



function App() {

  return (
    <MarketProvider>
      <div className="App">
        <div>
          <BrowserRouter>
            <NavBar/>
            <Switch>
              <Route path='/' exact component={ Home }/>
              <Route path='/login' exact component={ Login }/>
              <Route path='/register' exact component={ Register }/>
              <Route path='/assets/:asset_id' exact component={ AssetDetail }/>
              <Route path='*'component={ NotFound }/>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </MarketProvider>
  );
}

export default App;
