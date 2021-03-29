import React, { useEffect, useContext } from 'react';
import MarketContext from '../context/MarketContext';
import {useParams} from 'react-router-dom';

const AssetDetail = (props) => {


  const marketContext = useContext(MarketContext);
  const { getAssetById, loading, currentAsset } = marketContext;
  let assetId = useParams().asset_id;

  useEffect (() => {
    async function runGetAsset(){
      await getAssetById(assetId);
    }
    runGetAsset();
  }, []);

  // console.log('currentAsset in AssetDetail', currentAsset);
  // console.log('currentAsset title in AssetDetail', currentAsset.assetId.title);

  return (
    <section className='asset-detail'>
      { 
      currentAsset ? (
        <>
          <div className='asset-detail-left'>
            <div className='asset-title'>
              <p>{currentAsset.title}</p>
            </div>
            <div className='asset-detail-image'>
              <img  src={currentAsset.image} alt='badass art'/>
            </div>
          </div>
          <div className='asset-detail-right'>
            <div className='asset-title'>
              <p>{currentAsset.title}</p>
            </div>
            <div className='asset-list-price'>
              <p>{currentAsset.sale_price}
              </p>
            </div>
          </div>
        </>
      ) : (<div></div>)}
    </section>
  )
}

export default AssetDetail;
