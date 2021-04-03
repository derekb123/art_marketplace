import React, { useContext, useEffect } from 'react';
import MarketContext from '../context/MarketContext';
import AssetItem from './AssetItemSmall';


const HomeAssetsList = (props) => {
  const marketContext = useContext(MarketContext);
  const { marketAssets, loading, getAllAssetsNewest } = marketContext;

  useEffect (() => {
    if(marketAssets.length === 0) {
      getAllAssetsNewest();

    }

    
  }, [getAllAssetsNewest, marketAssets]);

  // console.log(marketAssets);
  // console.log(marketAssets.data);
  // console.log(marketAssets.loading);

  return (
    <div className='home-assets'>
      <div className='assets-container'>
        <h2>Assets</h2>

          {
            !loading ? (
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