import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Constants from '../reducers/Constants';
import axios from 'axios';
import { getAssetById } from '../hooks/AssetListHooks';
import { Link, useHistory } from 'react-router-dom';
import InfoModal from '../components/InfoModal';

const SellAsset = (props) => {

  // console.log('props for make offer',props);
  // console.log('props for asset Cdispatch',props.commonDispatch);
  // console.log('props for asset Cstate',props.commonState);

  // const [offermount, setAmount] = useState(null);
  // const [currentMedia, props.setCurrentMedia] = useState('');
  const [showSellAssetModal, setShowSellAssetModal] = useState(false);
  const [showSellAssetConfirm, setShowSellAssetConfirm] = useState(false);
  const [showSellAssetError, setShowSellAssetError] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
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

  const UseSellAsset = async () => {
    const assetId = props.currentAsset.id;

    try {
      props.commonDispatch({ type: Constants.LOADING });
      // let data = new FormData();
      // data.append('assetId', assetId)
      // data.append('salePrice', salePrice)
      const editAssetPriceRes = await axios.put(`/assets/${assetId}/price`, {'salePrice': salePrice});
      console.log(editAssetPriceRes);
      setShowSellAssetConfirm(true);
    } catch (error) {
      console.log('error inside UseSellAsset: ',error)
      setShowSellAssetError(true);
    }
  }

  // console.log('currentAsset in SellAsset', props.currentAsset);

  return (
    <Fragment>
      
      { showSellAssetConfirm && 
        <Fragment>
          <InfoModal
          modalTitle ={'Success'}
          modalBody = {'Congratulations! Your asset is now on sale!'}
          modalButtonName = {'CLOSE'}
          showInfoModal = {showSellAssetConfirm}
          setShowInfoModal = {setShowSellAssetConfirm}
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
                <p>List For Sale</p>
              </header>
              <article>
                <form className='offer-form' onSubmit={(e)=>{
              e.preventDefault();
              UseSellAsset();
              }}>
              <input
                type="number"
                className='common-input'
                name='Sale Price'
                // placeholder="Sale Price..."
                value={salePrice}
                onChange= {(e) => {setSalePrice( parseInt(e.target.value, 10))}}
                >
              </input>
              <label  className='common-input-label'>Sale Price</label>
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

export default SellAsset;
