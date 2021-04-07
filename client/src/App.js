import React, { useReducer } from 'react';
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

  // const [commonState, setCommonState] = useState ({loggedIn: false, loading: false, user: null})
const initialCommonState = {loggedIn: false, loading: false, user: null}

const [commonState, dispatch] = useReducer(CommonReducer, initialCommonState);

  return (
    
      <div className="App">
        <div>
          <BrowserRouter>
            <NavBar/>
            <MarketProvider>
              <Switch>
                <Route path='/login' component={ Login } commonState={commonState}/>
                <Route path='/register' component={ Register } commonState={commonState}/>
                <Route path='/assets/:asset_id' component={ AssetDetail } commonState={commonState}/>
                <Route path='/' component={ Home } commonState={commonState}/>
                <Route path='*'component={ NotFound } commonState={commonState}/>
              </Switch>
            </MarketProvider>
          </BrowserRouter>
        </div>
      </div>
  );
}

export default App;
