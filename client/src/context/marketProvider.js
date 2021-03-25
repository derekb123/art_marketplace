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
      const res = await axios.get('/assets');
      dispatch({ type: Constants.FINISHED_LOADING });
      dispatch({ type: Constants.SET_ASSETS, payload: res.data})
    } catch (error) {
      console.log(error)
    }
  }

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