import React from 'react';

import HomeAssetsList from '../components/HomeAssetsList'
import SearchContainer from '../components/SearchContainer'

function Home(props) {

  return (
    <div className="Home">
      <div>
        <SearchContainer />
        <HomeAssetsList 
        commonState={props.commonState}
        commonDispatch={props.commonDispatch}
        />
      </div>
    </div>
  );
}

export default Home;
