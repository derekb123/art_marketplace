import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Constants from '../reducers/Constants';
import axios from 'axios';
import { getAssetById } from '../hooks/AssetListHooks';
import { Link, useHistory } from 'react-router-dom';
import InfoModal from '../components/InfoModal';

const BuyAsset = (props) => {

  // console.log('props for make offer',props);
  // console.log('props for asset Cdispatch',props.commonDispatch);
  // console.log('props for asset Cstate',props.commonState);

  // const [offermount, setAmount] = useState(null);
  // const [currentMedia, props.setCurrentMedia] = useState('');
  const [showBuyAssetModal, setShowBuyAssetModal] = useState(false);
  const [showBuyAssetConfirm, setShowBuyAssetConfirm] = useState(false);
  const [showBuyAssetError, setShowBuyAssetError] = useState(false);
  const [cardNumber, setCardNumber] = useState('');


  // console.log('currentUserId & owner_id', props.commonState.currentUserId, props.currentAsset.owner_id);
  console.log('currentAsset', props.currentAsset);

  // const marketContext = useContext(MarketContext);
  // const { getAssetById, loading, currentAsset } = marketContext;
  let assetId = useParams().asset_id;
  // console.log(assetId);

  useEffect (() => {
    getAssetById(assetId, props, Constants, axios, props.setCurrentAsset, props.setCurrentMedia);
      //GOTO ASSETLISTHOOKS TO UPDATE THIS FUNCTION
      //GET ASSET INFO LIKE OWNER NAME & CREATOR NAME
      //PACKAGE WITH THIS OBJECT FOR DETAIL
  }, []);

  const UseBuyAsset = async () => {
    const buyerId = props.commonState.currentUserId;
    const assetId = props.currentAsset.id;

    const transactionInfo = {
      buyer_id: buyerId, 
      asset_id: assetId, 
      seller_id: props.currentAsset.owner_id,
      creator_id: props.currentAsset.creator_id,
      payment_method: 'credit card', 
      sale_price: props.currentAsset.list_price
    }

    const assetTransferInfo = {
      buyer_id: buyerId,
      asset_id: assetId
    }

    try {
      props.commonDispatch({ type: Constants.LOADING });
      // const newTransRes = await axios.post('/transactions', transactionInfo);
      // console.log('res inside useBuyAsset', newTransRes);
      // let postedTransaction = newTransRes.data
      // console.log('postedTransaction inside useBuyAsset', postedTransaction);
      const transferAssetRes = await axios.put(`/assets/${assetId}/transfer/${buyerId}`);
      setShowBuyAssetConfirm(true);
    } catch (error) {
      console.log('error inside UseBuyAsset: ',error)
      setShowBuyAssetError(true);
    }
  }

  // console.log('currentAsset in BuyAsset', props.currentAsset);

  return (
    <Fragment>
      
      { showBuyAssetConfirm && 
        <Fragment>
          <InfoModal
          modalTitle ={'Success'}
          modalBody = {'Congratulations! Your purchase is complete!'}
          modalButtonName = {'CLOSE'}
          showInfoModal = {showBuyAssetConfirm}
          setShowInfoModal = {setShowBuyAssetConfirm}
          confirmPath={'/'}
          >
          </InfoModal>
        </Fragment>
      }

      {/* <h2>Buy Asset</h2> */}
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
                <p>Checkout</p>
              </header>
              <article>
                <form className='offer-form' onSubmit={(e)=>{
              e.preventDefault();
              UseBuyAsset();
              }}>
              <div className='detail-list-price'>{`$ ${props.currentAsset.list_price}`}</div>
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

export default BuyAsset;
