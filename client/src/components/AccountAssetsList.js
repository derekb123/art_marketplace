import React, {  useEffect, useState } from 'react';
import AssetItemSmall from './AssetItemSmall';
import axios from 'axios';
import Constants from '../reducers/Constants';
import { GetAssetsByOwnerId, GetAssetsByUserId } from '../hooks/AssetListHooks';
// import CustomHooks from '../hooks/CustomHooks';


const AccountAssetsList = (props) => {

  const userId = props.commonState.currentUserId;
  console.log('accountassetslist userID: ',userId);

  useEffect (() => {
      GetAssetsByUserId(props, Constants, props.setMarketAssets, userId, 'owner');
  }, [userId]);

  console.log('marketAssets after getallAssetsNewest accountAssetslist: ', props.marketAssets);

  return (
    <div className='account-assets'>
      <div className='assets-container'>
        <h2>Collection</h2>

          {
            !props.loading ? (
              <div className='assets-grid-container'>
                { !props.marketAssets.length > 0 ? <div></div> : (
                  props.marketAssets.map((asset, i) => {
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
                  )
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