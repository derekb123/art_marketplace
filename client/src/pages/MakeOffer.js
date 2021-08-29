import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Constants from '../reducers/Constants';
import axios from 'axios';
import { getAssetById } from '../hooks/AssetListHooks';
import { Link, useHistory } from 'react-router-dom';
import InfoModal from '../components/InfoModal';

const MakeOffer = (props) => {

  console.log('props for asset detail',props);
  // console.log('props for asset Cdispatch',props.commonDispatch);
  // console.log('props for asset Cstate',props.commonState);

  const [amount, setAmount] = useState('');
  const [currentMedia, setCurrentMedia] = useState('');
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showOfferConfirm, setShowOfferConfirm] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [currentAsset, setCurrentAsset] = useState({
    id : null,
    title: '',
    asset_description: '',
    asset_image: '',
    creator_id: null,
    owner_id: null,
    list_price: 0.00,
    likes: null,
    views: null,
    created_at: null,
    high_bid: 0.00,
    offers_made: 0
    });

    console.log('currentUserId & owner_id', props.commonState.currentUserId, currentAsset.owner_id);

  // const marketContext = useContext(MarketContext);
  // const { getAssetById, loading, currentAsset } = marketContext;
  let assetId = useParams().asset_id;
  // console.log(assetId);

  useEffect (() => {
    getAssetById(assetId, props, Constants, axios, setCurrentAsset, setCurrentMedia);
      //GOTO ASSETLISTHOOKS TO UPDATE THIS FUNCTION
      //GET ASSET INFO LIKE OWNER NAME & CREATOR NAME
      //PACKAGE WITH THIS OBJECT FOR DETAIL
  }, []);

  const UseMakeOffer = async () => {
    const bidderId = props.commonState.currentUserId;
    const bidInfo = {bidder_id: bidderId, asset_id: currentAsset.id, bid_price: amount}
    try {
      props.commonDispatch({ type: Constants.LOADING });
      const res = await axios.post('/bids', bidInfo);
      let postedBid = res.data
      console.log(postedBid);
    } catch (error) {
    }
  }

  const conditionalButtons = () => {

  }

  console.log(props);

  const UseOfferClick = (props) => {
    console.log('props in UseOfferClick',props)
    if (props.commonState.loggedIn) {
      setShowOfferModal(true);
    } else {
      return(
        <>
        <p>Please 
        <span>
          <Link to={'/login'}>
            <section className='logo'>
              login
            </section>
          </Link>
        </span>
        to make an offer.
      </p>
      </>
      )
    }
  }


  console.log('currentAsset in MakeOffer', currentAsset);

  return (
    <Fragment>
      
      { showOfferConfirm && 
        <Fragment>
          <InfoModal
          modalTitle ={'Success'}
          modalBody = {'Congratulations! Your offer has been submitted!'}
          modalButtonName = {'CLOSE'}
          showInfoModal = {showOfferConfirm}
          setShowInfoModal = {setShowOfferConfirm()}
          >
          </InfoModal>
        </Fragment>
      }

      {/* <h2>Make an Offer</h2> */}
      <div className='asset-detail'>
        {
        currentAsset ? (
          <>
            <section className='asset-detail-left'>
              <div className='asset-detail-image-container'>
                <img className='asset-detail-image'
                src={currentMedia}
                alt='badass art'/>
              </div>
            </section>

            <section className='asset-detail-right'>
              <header className='make-offer-title'>
                <p>Make an Offer</p>
              </header>
              <article>
                <form className='offer-form' onSubmit={(e)=>{
              console.log('OFFER SUBMITTED');
              e.preventDefault();
              }}>
              <input
                className='amount-input'
                name='Amount'
                type='number'
                placeholder="Offer Amount"
                onChange= {(e) => {props.setAmount( e.target.value)}}
                >
              </input>
              <label  className='input-label'>Amount</label>
              <select className='input-select'>
                <option className='input-option' value='credit card'>credit card</option>
                <option className='input-option' value='paypal'>paypal</option>
                <option className='input-option' value='ethereum'>ethereum</option>
              </select>
              <label  className='input-label'>Payment Type</label>
              <input
                className='amount-input'
                name='Card'
                id="ccn" 
                type="tel" 
                inputmode="numeric" 
                pattern="[0-9\s]{13,19}" 
                autocomplete="cc-number" 
                maxlength="19" 
                placeholder="xxxx xxxx xxxx xxxx"
                placeholder="Offer Amount"
                onChange= {(e) => {props.setAmount( e.target.value)}}
                >
              </input>
              <label  className='input-label'>Card Number</label>
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
    </Fragment>
  )
}

export default MakeOffer;
