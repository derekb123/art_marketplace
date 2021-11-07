import React, { useReducer, useState, Redirect, useEffect } from 'react';
import './App.css';
import './styles/App.scss';
import {  Route, BrowserRouter, Switch } from 'react-router-dom';
import '@stripe/stripe-js';

import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Create from './pages/Create';
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar';
import AssetDetail from './pages/AssetDetail';
import CommonReducer from './reducers/CommonReducer';
import axios from 'axios';
import Constants from './reducers/Constants';
import MakeOffer from './pages/MakeOffer';


function App(props) {

let initialCommonState = {loggedIn: false, loading: false, currentUserName: null, currentUserId: null, isCreator: false, avatar: null};
const [commonState, dispatch] = useReducer(CommonReducer, initialCommonState);
const [marketAssets, setMarketAssets] = useState([]);

const isAuth = async (props) => {

  try {
    dispatch({type: Constants.LOADING})
    const refreshRes = await axios.post('users/refresh');
    const authObj = refreshRes.data;

    if (authObj.refresh) {
      const verifyAccessObj = await axios.get('users/verify', { headers : {token: authObj.accessToken}});
      const verifyAccess = verifyAccessObj.data;
      authObj.verifyAccess = verifyAccess;
      console.log('authObj after adding verifyAccess', authObj)
      dispatch({
        type: Constants.AUTHORIZE,
        payload: authObj})
    };
  } catch (error) {
    console.error('error from isAuth: ',error.message);
  }
}

useEffect((props)=> {

  isAuth(props);
}, [])

  return (

      <div className="App">
        <div>
          <BrowserRouter>
            <NavBar
              commonState={commonState}
              commonDispatch={dispatch}
            />
            <Switch>
              <Route
              path= '/account'
              render = {(props) =>
                commonState.loggedIn ? (
                  <Account
                  {...props}
                  commonState={commonState}
                  commonDispatch={dispatch}
                  marketAssets={marketAssets}
                  setMarketAssets={setMarketAssets}
                  ></Account>
                ) : (
                  <Redirect to='/login'/>
                )
              }
              />
              <Route
                path='/login'
                render = {(props) => 
                    <Login
                      {...props}
                      commonState={commonState}
                      commonDispatch={dispatch}
                    />
                }
              />
              <Route path='/register' render={props => 
                !commonState.loggedIn ? (
                <Register
                  {...props}
                  commonState={commonState}
                  commonDispatch={dispatch}
                />) : (
                <Redirect to='/login' />
               )
              }>
              </Route>
              <Route path='/assets/create'>
                <Create
                  commonState={commonState}
                  commonDispatch={dispatch}
                />
              </Route>
              <Route path='/assets/:asset_id'>
                <AssetDetail
                  commonState={commonState}
                  commonDispatch={dispatch}
                />
              </Route>
              <Route path='/'>
                <Home
                  commonState={commonState}
                  commonDispatch={dispatch}
                  marketAssets={marketAssets}
                  setMarketAssets={setMarketAssets}
                />
              </Route>
              <Route path='*'
                component={ NotFound }
                commonState={commonState}
              />
            </Switch>
            <Footer
              commonState={commonState}
              commonDispatch={dispatch}
            />
          </BrowserRouter>
        </div>
      </div>
  );
}

export default App;
