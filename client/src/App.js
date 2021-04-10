import React, { useReducer } from 'react';
import './App.css';
import './styles/App.scss';
import {  Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar';
import AssetDetail from './components/AssetDetail';
import CommonReducer from './reducers/CommonReducer';


function App() {

  // const [commonState, setCommonState] = useState ({loggedIn: false, loading: false, user: null})
let initialCommonState = {loggedIn: false, loading: false, userMin: null};
const [commonState, dispatch] = useReducer(CommonReducer, initialCommonState);

  return (

      <div className="App">
        <div>
          <BrowserRouter>
            <NavBar
              commonState={commonState}
              commonDispatch={dispatch}
            />
            {/* <MarketProvider> */}
            <Switch>
              <Route path='/login'>
                <Login
                  commonState={commonState}
                  commonDispatch={dispatch}
                />
              </Route>
              <Route path='/register'>
                <Register
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
                />
              </Route>
              <Route path='*'
                component={ NotFound }
                commonState={commonState}
              />
            </Switch>
            {/* </MarketProvider> */}
          </BrowserRouter>
        </div>
      </div>
  );
}

export default App;
