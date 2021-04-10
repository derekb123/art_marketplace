import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from './Button';
import Constants from '../reducers/Constants';
import axios from 'axios';


const AssetDetail = (props) => {

  // console.log('props for asset detail',props);
  // console.log('props for asset Cdispatch',props.commonDispatch);
  // console.log('props for asset Cstate',props.commonState);

  const [currentAsset, setCurrentAsset] = useState({
    id : null,
    title: '',
    asset_description: '',
    asset_image: '',
    creator_id: null,
    owner_id: null,
    size: '',
    likes: null,
    views: null,
    category: '',
    created_at: null,
    list_price: 0.00,
    high_bid: 0.00,
    offers_made: 0
    });

  // const marketContext = useContext(MarketContext);
  // const { getAssetById, loading, currentAsset } = marketContext;
  let assetId = useParams().asset_id;
  // console.log(assetId);

  const getAssetById = async (id) => {
    try {
      // console.log('inside getAssetById')
      props.commonDispatch({ type: Constants.LOADING })
      // console.log(id);
      const res = await axios.get(`/assets/${id}`);
      const gottenAsset = res.data[0];
      setCurrentAsset(gottenAsset);
      props.commonDispatch({ type: Constants.FINISHED_LOADING })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect (() => {
      getAssetById(assetId);
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
