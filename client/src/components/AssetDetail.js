import React, { useEffect, useContext } from 'react';
import MarketContext from '../context/MarketContext';
import {useParams} from 'react-router-dom';
import Button from './Button';

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

  console.log('currentAsset in AssetDetail', currentAsset);

  return (
    <section className='asset-detail'>
      {
      currentAsset ? (
        <>
          <div className='asset-detail-left'>
            <div className='asset-detail-image-container'>
              <img className='asset-detail-image' src={currentAsset.asset_image} alt='badass art'/>
            </div>
          </div>
          <div className='asset-detail-right'>
            <div className='asset-detail-title'>
              <p>{currentAsset.title}</p>
            </div>
            <div className='asset-list-price'>
              <p>{`$ ${currentAsset.list_price}`}</p>
            </div>
            <div className='adet-buy-button-container'>
              <Button className='adet-buy-button' name='Buy Now' buy></Button>
            </div>
            <div className='adet-buy-button-container'>
              <Button className='adet-buy-button' name='Make Offer' buy></Button>
              <p>Highest Current Offer: 1000</p>
            </div>
          </div>
        </>
      ) : (<div>Loading...</div>)}
    </section>
  )
}

export default AssetDetail;
