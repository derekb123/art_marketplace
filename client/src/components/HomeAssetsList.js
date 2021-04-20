import React, {  useEffect, useState } from 'react';
import AssetItem from './AssetItemSmall';
import axios from 'axios';
import Constants from '../reducers/Constants'
// import CustomHooks from '../hooks/CustomHooks';


const HomeAssetsList = (props) => {

  const [marketAssets, setMarketAssets] = useState([]);

  useEffect (() => {

    const GetAllAssetsNewest = async () => {
      try {
        props.commonDispatch({ type: Constants.LOADING })
        const res = await axios.get('/assets');
        // console.log('market assets res', res.data);
        setMarketAssets(res.data);
        // console.log('marketAssets after set', marketAssets);
        props.commonDispatch({ type: Constants.FINISHED_LOADING })
      } catch (error) {
        console.log(error)
      }
    }

    if(marketAssets.length === 0) {
      GetAllAssetsNewest();
    }
  }, [props, marketAssets]);

  // console.log('marketAssets after getallAssetsNewest', marketAssets);

  return (
    <div className='home-assets'>
      <div className='assets-container'>
        <h2>Assets</h2>

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
                          image={asset.asset_image}
                          creator_id={asset.creator_id}
                          size={asset.size}
                          likes={asset.likes}
                          views={asset.views}
                          category={asset.category}
                          created_at={asset.created_at}
                          id={asset.id}
                          list_price={asset.list_price}
                          high_bid={asset.high_bid}
                          offers_made={asset.offers_made}
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