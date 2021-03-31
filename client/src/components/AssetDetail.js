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
    <div className='asset-detail'>
      {
      currentAsset ? (
        <>
          <section className='asset-detail-left'>
            <div className='asset-detail-image-container'>
              <img className='asset-detail-image' src={currentAsset.asset_image} alt='badass art'/>
            </div>
          </section>

          <section className='asset-detail-right'>
            <header className='asset-detail-title'>
              <p>{currentAsset.title}</p>
            </header>
            <article>
              <div className='detail-list-price-container'>
                <p className='detail-list-price'>{`$ ${currentAsset.list_price}`}</p>
                <p className='detail-sub-words'>List Price</p>
              </div>
              <div className='detail-high-offer-container'>
                <p className='detail-high-offer'>{`$ ${currentAsset.high_bid}`}</p>
                <p className='detail-sub-words'>Highest Offer</p>
              </div>
            </article>

            <article>
              <div className='adet-buy-button-container'>
                <Button className='adet-buy-button' name='Buy Now' buy></Button>
              </div>
              <div className='adet-buy-button-container'>
                <Button className='adet-buy-button' name='Make Offer' buy></Button>
              </div>
            </article>

            <article>
              <div className='detail-creator-owner-container'>
                <p className='detail-creator-owner'>{`${currentAsset.creator_name}`}</p>
                <p className='detail-sub-words'>Creator</p>
              </div>
              <div className='detail-creator-owner-container'>
                <p className='detail-creator-owner'>{`${currentAsset.creator_name}`}</p>
                <p className='detail-sub-words'>Owner</p>
              </div>
            </article>
          </section>
        </>
      ) : (<div>Loading...</div>)}
    </div>
  )
}

export default AssetDetail;
