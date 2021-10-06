import React from 'react';

import HomeAssetsList from '../components/HomeAssetsList'
import SearchContainer from '../components/SearchContainer'

function Home(props) {

  return (
    <div className="Home">
      <h2>Market</h2>
      <div>
        <SearchContainer 
        commonState={props.commonState}
        commonDispatch={props.commonDispatch}
        marketAssets={props.marketAssets}
        setMarketAssets={props.setMarketAssets}
        />
        <HomeAssetsList 
        commonState={props.commonState}
        commonDispatch={props.commonDispatch}
        />
      </div>
    </div>
  );
}

export default Home;
