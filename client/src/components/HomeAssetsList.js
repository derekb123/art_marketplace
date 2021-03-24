import React, { useContext, useEffect } from 'react';
import MarketContext from '../context/MarketContext';
import AssetItem from './AssetItem';

const HomeAssetsList = () => {
  const marketContext = useContext(MarketContext);
  const { getAssets, marketAssets, loading } = marketContext;

  useEffect (() => {
    async function runGetAssets(){
      await getAssets();
    }
    runGetAssets();
  }, []);

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