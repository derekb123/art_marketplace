import React, { useContext } from 'react';
import MarketContext from '../context/MarketContext';
import HomeAssetsList from '../components/HomeAssetsList'
import SearchContainer from '../components/SearchContainer'

function Home() {
  // const marketAssets = useContext(MarketContext.marketAssets);
  // console.log(marketAssets);

  return (
    <div className="Home">
      <div>
        <SearchContainer />
        <HomeAssetsList />
      </div>
    </div>
  );
}

export default Home;
