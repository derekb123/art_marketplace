import React, { useReducer, init } from 'react';
import MarketContext from './MarketContext';
import MarketReducer from './MarketReducer';
import { fetch } from 'whatwg-fetch';
import axios from 'axios';
import Constants from './Constants';

const MarketProvider = props => {
  const initialState={
    marketAssets: [],
    currentMarketAsset: null,
    loading: true
  }

  const [state, dispatch] = useReducer(MarketReducer, initialState);

  const getAssets = async () => {
    try {
      dispatch({ type: Constants.LOADING })
      console.log('After START LOADING', state)
      const res = await axios.get('/assets');
      console.log('AXIOS RES',res);
      dispatch({ type: Constants.FINISHED_LOADING });
      console.log('After STOP LOADING', state)
      // console.log(state)
      dispatch({ type: Constants.SET_ASSETS, payload: res.data})
      console.log('After SET_ASSETS', state)
    } catch (error) {
      console.log(error)
    }
  }

  console.log('STATE AFTER GETASSETS()', state);

  return (
    <MarketContext.Provider 
      value={{
        marketAssets: state.marketAssets,
        currentAsset: state.currentAsset,
        loading: state.loading,
        getAssets: getAssets
    }}>
      {props.children}
    </MarketContext.Provider>
  )
}

export default MarketProvider;