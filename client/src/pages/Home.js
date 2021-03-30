import React from 'react';

import HomeAssetsList from '../components/HomeAssetsList'
import SearchContainer from '../components/SearchContainer'

function Home() {

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
