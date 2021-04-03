import React from 'react';
import './App.css';
import './styles/App.scss';
import {  Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar';
import MarketProvider from './context/MarketProvider';
import AssetDetail from './components/AssetDetail';



function App() {

  return (
    
      <div className="App">
        <div>
          <BrowserRouter>
            <NavBar/>
            <MarketProvider>
              <Switch>
                <Route path='/login' component={ Login }/>
                <Route path='/register' component={ Register }/>
                <Route path='/assets/:asset_id' component={ AssetDetail }/>
                <Route path='/' component={ Home }/>
                <Route path='*'component={ NotFound }/>
              </Switch>
            </MarketProvider>
          </BrowserRouter>
        </div>
      </div>
  );
}

export default App;
