import React, { useContext } from 'react';
import MarketContext from '../context/MarketContext';

const HomeAssetsList = () => {
  const marketContext = useContext(MarketContext);
  const { getAllAssetsNewest, marketAssets, loading } = marketContext;

  return (
    <div>

    </div>
  )
};

export default HomeAssetsList;