import React, {  useEffect, useState } from 'react';
import BidItemSmall from './BidItemSmall';
import axios from 'axios';
import Constants from '../reducers/Constants';
import { GetHighestBidsByAssetIds, GetAssetsByUserId } from '../hooks/AssetListHooks';
// import CustomHooks from '../hooks/CustomHooks';


const OffersRecievedList = (props) => {

  const userId = props.commonState.currentUserId;
  console.log(userId);

  const [highestBidsRecieved, setHighestBidsRecieved] = useState([])

  useEffect (() => {
    GetAssetsByUserId(props, Constants, props.setMarketAssets, userId, 'owner');
  }, [userId]);

    console.log('marketAssets after GetAssetsByUserId: ', props.marketAssets);

  useEffect (() => {
    GetHighestBidsByAssetIds(props, Constants, axios, setHighestBidsRecieved, props.MarketAssets);
}, [userId]);

  const bidItemArray = () => {
    
  }

  console.log('marketAssets after getallAssetsNewest accountAssetslist: ', props.marketAssets);

  return (
    <div className='account-assets'>
      <div className='assets-container'>
        <h2>Collection</h2>

          {
            !props.loading ? (
              <div className='assets-grid-container'>
                {
                  props.bidsRecieved.map((asset, i) => {
                    return (

                        <BidItemSmall
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

export default OffersRecievedList;