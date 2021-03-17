import React, { useReducer } from 'react';
import MarketContext from './MarketContext';
import MarketReducer from './MarketReducer';
import { fetch } from 'whatwg-fetch';
import axios from 'axios';

const MarketProvider = props => {
  const initialState={
    marketAssets: [],
    currentMarketAsset: null,
    loading: true
  }

  const [state, dispatch] = useReducer(MarketReducer, initialState);

  const getAssets = async () => {
    try {
      console.log('inside getAssets')
      dispatch({type: 'SENDING_REQUEST'})
      console.log('After SENDING REQUEST')
      const res = await axios.get('/assets');
      console.log(res);
      // const data = await res.json();
      dispatch({type: 'REQEUST_FINISHED'});
      console.log('After REQUEST_FINISHED')
      dispatch({type: 'SET_ASSETS', payload: res})
    } catch (error) {
      console.log(error)
    }
  }

  console.log(state);

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