import React, { useContext, useEffect } from 'react';
import MarketContext from '../context/MarketContext';

const AssetsList = () => {
  const marketContext = useContext(MarketContext);
  const { getAssets, marketAssets, loading } = marketContext;

  useEffect (() => {
    async function runGetAssets(){
      await getAssets();
    }
    runGetAssets();
  }, []);

  console.log(marketAssets);
  return (
    <div>
      {marketAssets.map((asset) => {
        return (
          
        )
      })}
    </div>
  )
}

export default AssetsList;