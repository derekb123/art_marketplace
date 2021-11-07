import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Constants from '../reducers/Constants';
import axios from 'axios';
import { getAssetById } from '../hooks/AssetListHooks';
import { Link, useHistory } from 'react-router-dom';
import InfoModal from '../components/InfoModal';

const MakeOffer = (props) => {

  // const [offermount, setAmount] = useState(null);
  // const [currentMedia, props.setCurrentMedia] = useState('');
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showOfferConfirm, setShowOfferConfirm] = useState(false);
  const [showOfferError, setShowOfferError] = useState(false);
  const [offerAmount, setOfferAmount] = useState(null);
  const [cardNumber, setCardNumber] = useState('');

  // const marketContext = useContext(MarketContext);
  // const { getAssetById, loading, currentAsset } = marketContext;
  let assetId = useParams().asset_id;

  useEffect (() => {
    getAssetById(assetId, props, Constants, axios, props.setCurrentAsset, props.setCurrentMedia);
      //GOTO ASSETLISTHOOKS TO UPDATE THIS FUNCTION
      //GET ASSET INFO LIKE OWNER NAME & CREATOR NAME
      //PACKAGE WITH THIS OBJECT FOR DETAIL
  }, []);

  const UseMakeOffer = async () => {
    if (!offerAmount) return;
    if (typeof offerAmount !== 'number') return;
    const bidderId = props.commonState.currentUserId;
    const bidInfo = {bidder_id: bidderId, asset_id: props.currentAsset.id, bid_price: offerAmount}
    try {
      props.commonDispatch({ type: Constants.LOADING });
      const res = await axios.post('/bids', bidInfo);
      console.log('res inside useMakeOffer', res);
      let postedBid = res.data
      console.log('postedBid inside useMakeOffer', postedBid);
      setShowOfferConfirm(true);
    } catch (error) {
      console.log('error inside UseMakeOffer: ',error)
      setShowOfferError(true);
    }
  }

  return (
    <Fragment>
      
      { showOfferConfirm && 
        <Fragment>
          <InfoModal
          modalTitle ={'Success'}
          modalBody = {'Congratulations! Your offer has been submitted!'}
          modalButtonName = {'CLOSE'}
          showInfoModal = {showOfferConfirm}
          setShowInfoModal = {setShowOfferConfirm}
          confirmPath={'/'}
          >
          </InfoModal>
        </Fragment>
      }

      {/* <h2>Make an Offer</h2> */}
      <div className='asset-detail'>
        {
        props.currentAsset ? (
          <>
            <section className='asset-detail-left'>
              <div className='asset-detail-image-container'>
                <img className='asset-detail-image'
                src={props.currentMedia}
                alt='badass art'/>
              </div>
            </section>

            <section className='asset-detail-right'>
              <header className='make-offer-title'>
                <p>Make an Offer</p>
              </header>
              <article>
                <form className='offer-form' onSubmit={(e)=>{
              e.preventDefault();
              UseMakeOffer();
              }}>
              <input
                className='common-input'
                name='Amount'
                type='number'
                placeholder="Offer Amount"
                onChange= {(e) =>{setOfferAmount( parseInt(e.target.value, 10))}}
                >
              </input>
              <label  className='common-input-label'>Amount</label>
              <select className='input-select'>
                <option className='input-option' value='credit card'>credit card</option>
                <option className='input-option' value='paypal'>paypal</option>
                <option className='input-option' value='ethereum'>ethereum</option>
              </select>
              <label  className='common-input-label'>Payment Type</label>
              <input
                className='common-input'
                name='Card'
                id="ccn" 
                type="tel" 
                inputmode="numeric" 
                pattern="[0-9\s]{13,19}" 
                autocomplete="cc-number" 
                maxlength="19" 
                placeholder="xxxx xxxx xxxx xxxx"
                onChange= {(e) => {setCardNumber( e.target.value)}}
                >
              </input>
              <label  className='common-input-label'>Card Number</label>
              <Button
                className='.button--confirm'
                type='submit'
                name='Submit'
                style={{width:'100%'}}
                login
              >
              </Button>
              </form>
              <p className='general-disclaimer'>
                Your card will be authorized immediately, but the funds are transferred only after offer is accepted. Learn more
              </p>
              </article>

              <article>
                <div className='detail-creator-owner-container'>
                  <p className='detail-creator-owner'>{`${props.currentAsset.creator_name}`}</p>
                  <p className='detail-sub-words'>Creator</p>
                </div>
                <div className='detail-creator-owner-container'>
                  <p className='detail-creator-owner'>{`${props.currentAsset.creator_name}`}</p>
                  <p className='detail-sub-words'>Owner</p>
                </div>
              </article>
            </section>
          </>
        ) : (<div>Loading...</div>)}
      </div>
    </Fragment>
  )
}

export default MakeOffer;
