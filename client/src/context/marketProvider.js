import React, { useReducer } from 'react';
import MarketContext from './MarketContext';
import MarketReducer from './MarketReducer';

const MarketProvider = props => {
  const initialState={
    marketAssets: [],
    currentMarketAsset: null,
    loading: true
  }

  const [state, dispatch] = useReducer(MarketReducer, initialState);

  const getAssets = async () => {
    try {
      dispatch({type: 'SENDING REQUEST'})
      const res = await fetch('/assets');
      const data = await res.json();
      dispatch({type: 'REQEUST_FINISHED'});
      dispatch({type: 'SET_ASSETS', payload: data})
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