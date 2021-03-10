import React, { useContext, useEffect } from 'react';
import MarketContext from '../context/MarketContext';

const AssetsList = () => {
  const marketContext = useContext(MarketContext);
  const { getAssets, marketAssets, loading } = marketContext;

  useEffect (() => {
    getAssets();
  }, [])

  console.log(marketAssets);
  return (
    <div>
      Market Assets
    </div>
  )
}

export default AssetsList;