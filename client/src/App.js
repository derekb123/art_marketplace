import React, { Component, useState, useEffect } from 'react';
import './App.css';
import './styles/App.scss';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
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
