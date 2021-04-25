import React, { useReducer, useState, Redirect, useEffect } from 'react';
import './App.css';
import './styles/App.scss';
import {  Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar';
import AssetDetail from './components/AssetDetail';
import CommonReducer from './reducers/CommonReducer';
import axios from 'axios';
import Constants from './reducers/Constants';


function App() {

  // const [commonState, setCommonState] = useState ({loggedIn: false, loading: false, user: null})
let initialCommonState = {loggedIn: false, loading: false, currentUser: null, isCreator: false, avatar: null};
const [commonState, dispatch] = useReducer(CommonReducer, initialCommonState);

const isAuth = async () => {
  try {
    dispatch({type: Constants.LOADING})
    const refreshRes = await axios.post('users/refresh');
    console.log('isAuth refreshRes',refreshRes);
    const accessToken = refreshRes.data.accessToken;
    console.log('isAuth accessToken',accessToken)
    const refreshSuccess = refreshRes.data.refresh;
    console.log('isAuth refreshSuccess',refreshSuccess);
    if (refreshSuccess) {
      const verifyAccess = await axios.get('users/verify', { headers : {token: accessToken}});
      console.log(verifyAccess.data);
      dispatch({type: Constants.AUTHORIZE, payload: verifyAccess.data})
    }
  } catch (error) {
    console.error('error from isAuth: ',error.message);
  }
}

useEffect(()=> {
  console.log('app use effect isAuth')
  isAuth()
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
                />
              </Route>
              <Route path='*'
                component={ NotFound }
                commonState={commonState}
              />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
  );
}

export default App;
