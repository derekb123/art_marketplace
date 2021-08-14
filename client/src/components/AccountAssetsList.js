import React, {  useEffect, useState } from 'react';
import AssetItem from './AssetItemSmall';
import axios from 'axios';
import Constants from '../reducers/Constants';
import { GetAssetsByOwnerId } from '../hooks/AssetListHooks';
// import CustomHooks from '../hooks/CustomHooks';


const AccountAssetsList = (props) => {

  const userId = props.commonState.currentUserId;
  console.log(userId);

  useEffect (() => {
      GetAssetsByOwnerId(props, Constants, axios, props.setMarketAssets, userId);
  }, [userId]);

  console.log('marketAssets after getallAssetsNewest accountAssetslist: ', props.marketAssets);

  return (
    <div className='account-assets'>
      <div className='assets-container'>
        <h2>Gallery</h2>

          {
            !props.loading ? (
              <div className='assets-grid-container'>
                {
                  props.marketAssets.map((asset, i) => {
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

export default AccountAssetsList;