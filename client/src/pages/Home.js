import React, {useState} from 'react';

import HomeAssetsList from '../components/HomeAssetsList'
import SearchContainer from '../components/SearchContainer'

function Home(props) {

  const [selectedArtistId, setSelectedArtistId] =useState(null);

  return (
    <div className="home-container">
      <h2>Market</h2>
      <div>
        <SearchContainer 
        selectedArtistId={selectedArtistId}
        setSelectedArtistId={setSelectedArtistId}
        commonState={props.commonState}
        commonDispatch={props.commonDispatch}
        marketAssets={props.marketAssets}
        setMarketAssets={props.setMarketAssets}
        />
        <HomeAssetsList 
        selectedArtistId={selectedArtistId}
        setSelectedArtistId={setSelectedArtistId}
        commonState={props.commonState}
        commonDispatch={props.commonDispatch}
        />
      </div>
    </div>
  );
}

export default Home;
