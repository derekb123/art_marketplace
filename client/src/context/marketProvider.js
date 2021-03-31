import React, { useReducer, init } from 'react';
import MarketContext from './MarketContext';
import MarketReducer from './MarketReducer';
// import { fetch } from 'whatwg-fetch';
import axios from 'axios';
import Constants from './Constants';

const MarketProvider = props => {
  const initialState={
    marketAssets: [],
    currentAsset: null,
    loading: true
  }

  const [state, dispatch] = useReducer(MarketReducer, initialState);

  const getAllAssetsNewest = async () => {
    try {
      dispatch({ type: Constants.LOADING })
      const res = await axios.get('/assets');
      dispatch({ type: Constants.FINISHED_LOADING });
      dispatch({ type: Constants.SET_ASSETS, payload: res.data})
    } catch (error) {
      console.log(error)
    }
  }

  const getAssetById = async (id) => {
    try {
      console.log('inside getAssetById')
      dispatch({ type: Constants.LOADING })
      console.log(id);
      const res = await axios.get(`/assets/${id}`);
      console.log(res, res.data);
      dispatch({ type: Constants.FINISHED_LOADING });
      dispatch({ type: Constants.SET_ASSET, payload: res.data[0]})
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
        getAllAssetsNewest: getAllAssetsNewest,
        getAssetById: getAssetById
    }}>
      {props.children}
    </MarketContext.Provider>
  )
}

export default MarketProvider;