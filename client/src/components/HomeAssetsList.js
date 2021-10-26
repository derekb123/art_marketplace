import React, {  useEffect, useState } from 'react';
import AssetItemSmall from './AssetItemSmall';
import axios from 'axios';
import Constants from '../reducers/Constants';
import { GetAllAssetsNewest, GetAssetsByUserId } from '../hooks/AssetListHooks';
// import CustomHooks from '../hooks/CustomHooks';

const HomeAssetsList = (props) => {

  const [marketAssets, setMarketAssets] = useState([]);

  useEffect (() => {

    if(marketAssets.length === 0) {
      GetAllAssetsNewest(props, Constants, setMarketAssets);
    }
  }, [props, marketAssets]);

  useEffect(() => {
    if(props.selectedArtistId){
      GetAssetsByUserId(props, Constants, setMarketAssets, props.selectedArtistId, 'creator');
    } else {
      GetAllAssetsNewest(props, Constants, setMarketAssets);
    }
  }, [props.selectedArtistId])

  return (
    <div className='home-assets'>
      <div className='assets-container'>

          {
            !props.loading ? (
              <div className='assets-grid-container'>
                {
                  marketAssets.map((asset, i) => {
                    return (

                        <AssetItemSmall
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