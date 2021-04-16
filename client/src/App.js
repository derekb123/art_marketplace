import React, { useReducer, useState, Redirect } from 'react';
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


function App() {

  // const [commonState, setCommonState] = useState ({loggedIn: false, loading: false, user: null})
let initialCommonState = {loggedIn: false, loading: false, userMin: null};
const [commonState, dispatch] = useReducer(CommonReducer, initialCommonState);
const [isAthenticated, setIsAuthenticated] = useState(false);

const setAuth = (boolean) => {
  setIsAuthenticated(boolean);
}

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
                isAthenticated ? (
                  <Account
                  {...props}
                  // setAuth={setAuth}
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
                render = {props => 
                  !isAthenticated ? (
                    <Login
                      {...props}
                      setIsAuthenticated={setIsAuthenticated}
                      commonState={commonState}
                      commonDispatch={dispatch}
                    />
                  ) : (
                  <Redirect to='/' />
                )
                }
              />
              <Route path='/register' render={props => 
                !isAthenticated ? (
                <Register
                  {...props}
                  // setAuth={setAuth}
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
