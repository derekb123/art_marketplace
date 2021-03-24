import React, { Component, useState, useEffect } from 'react';
import './App.css';
import './styles/App.scss';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar';
import MarketProvider from './context/marketProvider';
import HomeAssetsList from './components/HomeAssetsList';


function App() {
  // const [state, setState] = useState({
  //   assets: []
  // });

  // useEffect(() => {
  //   axios.get('/assets')
  //     .then (
  //       ({ data: assets }) => {
  //         setState((prev) => ({
  //           ...prev,
  //           assets
  //             }));
  //         }
  //       )
  //     .catch((err) => console.log(err));
  //   }, []);

// console.log(state);

  return (
    <MarketProvider>
      <div className="App">
      <div>
        <BrowserRouter>
          <NavBar/>
          <HomeAssetsList />
          <Switch>
            <Route path='/' exact component={ Home }/>
            <Route path='*'component={ NotFound }/>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
    </MarketProvider>
  );
}

export default App;
