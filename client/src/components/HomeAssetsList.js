import React, {  useEffect, useState } from 'react';
import AssetItem from './AssetItemSmall';
import axios from 'axios';
import Constants from '../reducers/Constants';
import { GetAllAssetsNewest } from '../hooks/AssetListHooks';
// import CustomHooks from '../hooks/CustomHooks';


const HomeAssetsList = (props) => {

  const [marketAssets, setMarketAssets] = useState([]);

  useEffect (() => {

    if(marketAssets.length === 0) {
      GetAllAssetsNewest(props, Constants, axios, setMarketAssets);
    }
  }, [props, marketAssets]);

  // console.log('marketAssets after getallAssetsNewest', marketAssets);

  return (
    <div className='home-assets'>
      <div className='assets-container'>
        <h2>Market</h2>

          {
            !props.loading ? (
              <div className='assets-grid-container'>
                {
                  marketAssets.map((asset, i) => {
                    return (

                        <AssetItem
                          key={i}
                          title={asset.title}
                          description={asset.asset_description}
                          image={asset.asset_media}
                          creator_id={asset.creator_id}
                          likes={asset.likes}
                          views={asset.views}
                          created_at={asset.created_at}
                          id={asset.id}
                          list_price={asset.list_price}
                          owner_id={asset.owner_id}
                          />
                    )
                  })
                }
              </div>
            ) : (
              <div className='loading-image'>
                loading...
              </div>
            )
          }
      </div>
    </div>
  )
}

export default HomeAssetsList;