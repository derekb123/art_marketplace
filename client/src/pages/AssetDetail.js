import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Constants from '../reducers/Constants';
import axios from 'axios';
import { getAssetById } from '../hooks/AssetListHooks';
import { Link, useHistory } from 'react-router-dom';
import InfoModal from '../components/InfoModal';
import MakeOffer from './MakeOffer';
import BuyAsset from './BuyAsset';
import SellAsset from './SellAsset';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


const AssetDetail = (props) => {
  const [stripePromise, setStripePromise] = useState(() => loadStripe('pk_test_51HRu3CBSF7t20i0FYMz3uvWce7k47FQo2duNUkdBwihxl7v3EWANu9kfASfll0ks0smNZ34ICMJZ6Puo2CXsjPGG00Y7VrpalY'));


  // console.log('props for asset detail',props);
  // console.log('props for asset Cdispatch',props.commonDispatch);
  // console.log('props for asset Cstate',props.commonState);

  const MAKE_OFFER = 'MAKE_OFFER'
  const BUY_ASSET = 'BUY_ASSET'
  const ASSET_DETAIL = 'ASSET_DETAIL'
  const SELL_ASSET = 'SELL_ASSET'

  const history = useHistory();
  const [mode, setMode] = useState('ASSET_DETAIL');
  const [currentMedia, setCurrentMedia] = useState('');
  const [showCancelSale, setShowCancelSale] = useState(false);
  const [showBuyWarning, setShowBuyWarning] = useState(false);
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

    // console.log('currentUserId & owner_id', props.commonState.currentUserId, currentAsset.owner_id);

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

  // const UseOfferClick = (props) => {
  //   console.log('props in UseOfferClick',props)
  //   if (props.commonState.loggedIn) {
  //     setMode(MAKE_OFFER);
  //   } else {
  //     return(
  //       <>
  //       <p>Please 
  //       <span>
  //         <Link to={'/login'}>
  //           <section className='logo'>
  //             login
  //           </section>
  //         </Link>
  //       </span>
  //       to make an offer.
  //     </p>
  //     </>
  //     )
  //   }
  // }

  // const UseBuyClick = (props) => {
  //   console.log('props in UseOfferClick',props)
  //   if (props.commonState.loggedIn) {
  //     setMode(BUY_ASSET);
  //   } else {
  //     return(
  //       <>
  //       <p>Please 
  //       <span>
  //         <Link to={'/login'}>
  //           <section className='logo'>
  //             login
  //           </section>
  //         </Link>
  //       </span>
  //       to make an offer.
  //     </p>
  //     </>
  //     )
  //   }
  // }

  const UseCancelSale = async (assetId) => {

    try {
      props.commonDispatch({ type: Constants.LOADING });
      const editAssetPriceRes = await axios.put(`/assets/${assetId}/price`, {'salePrice': 0});
      console.log(editAssetPriceRes);
    } catch (error) {
      console.log('error inside UseSellAsset: ',error)
      history.push('/account');
    }
  }

  return (
    <Elements stripe={stripePromise}>
    <Fragment>

      {mode === MAKE_OFFER && (
        <MakeOffer
          commonState={props.commonState}
          commonDispatch={props.commonDispatch}
          currentAsset={currentAsset}
          setCurrentAsset={setCurrentAsset}
          currentMedia={currentMedia}
          setCurrentMedia={setCurrentMedia}
        >
        </MakeOffer>
      )}
      {mode === BUY_ASSET && (
        <BuyAsset
          commonState={props.commonState}
          commonDispatch={props.commonDispatch}
          currentAsset={currentAsset}
          setCurrentAsset={setCurrentAsset}
          currentMedia={currentMedia}
          setCurrentMedia={setCurrentMedia}
        >
        </BuyAsset>
      )}
      {mode === SELL_ASSET && (
        <SellAsset
          commonState={props.commonState}
          commonDispatch={props.commonDispatch}
          currentAsset={currentAsset}
          setCurrentAsset={setCurrentAsset}
          currentMedia={currentMedia}
          setCurrentMedia={setCurrentMedia}
        >
        </SellAsset>
      )}


      {mode === ASSET_DETAIL && (
      <div className='asset-detail'>
        {
        currentAsset.list_price ? (
          <>
            <section className='asset-detail-left'>
              <div className='asset-detail-image-container'>
                <img className='asset-detail-image'
                src={currentMedia}
                alt='badass art'/>
              </div>
            </section>

            <section className='asset-detail-right'>
              <header className='asset-detail-title'>
                <p>{currentAsset.title}</p>
              </header>
              <article>
                {currentAsset.list_price > 0 && 
                <div className='detail-list-price-container'>
                  <p className='detail-list-price'>{`$ ${currentAsset.list_price}`}</p>
                  <p className='detail-sub-words'>List Price</p>
                </div>
                }
                <div className='detail-high-offer-container'>
                  <p className='detail-high-offer'>{`$ ${currentAsset.high_bid}`}</p>
                  <p className='detail-sub-words'>Highest Offer</p>
                </div>
              </article>
              
              { props.commonState.currentUserId !== currentAsset.owner_id ? (
                //ASSET NOT OWNED BY USER
                <article>
                {currentAsset.list_price > 0 && (
                <div className='adet-buy-button-container'>
                  <Button
                    className='adet-buy-button'
                    name='Buy Now'
                    onClick={(e)=> {
                      console.log('BUY BUTTON CLICKED');
                      e.preventDefault();
                      if (props.commonState.loggedIn) {
                        setMode(BUY_ASSET)
                      } else {
                        setShowBuyWarning(true)
                        setTimeout(() => {
                           setShowBuyWarning(false)
                        }, 6000);
                      }
                    }}
                    buy
                  >
                  </Button>
                    { showBuyWarning &&
                      <Link className='buy-warning-login' to={'/login'}>
                          <p>Please <u>login</u> to buy.</p>
                      </Link>
                    }
                </div>
                )}
                <div className='adet-buy-button-container'>
                  <Button 
                    className='adet-buy-button' 
                    name='Make Offer'
                    onClick={(e)=> {
                      console.log('OFFER BUTTON CLICKED');
                      e.preventDefault();
                      props.commonState.loggedIn ? (setMode(MAKE_OFFER)) : (

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
                      )
                    }}
                    buy
                  ></Button>
                </div>
              </article>
              ) : (
              //ASSET OWNED BY USER
              <Fragment>
              { showCancelSale && 
                <Fragment>
                  <InfoModal
                  modalTitle ={'Success'}
                  modalBody = {'Your sale is now cancelled.'}
                  modalButtonName = {'CLOSE'}
                  showInfoModal = {showCancelSale}
                  setShowInfoModal = {setShowCancelSale}
                  confirmPath={'/account'}
                  >
                  </InfoModal>
                </Fragment>
              }
              

              <article>
                {currentAsset.list_price > 0 ? (
                <div className='adet-sell-button-container'>
                  <Button
                    className='adet-sell-button'
                    name='Cancel Sale'
                    onClick={(e)=> {
                      console.log('CANCEL SALE CLICKED');
                      e.preventDefault();
                      if (props.commonState.loggedIn) {
                        UseCancelSale(currentAsset.id);
                        setShowCancelSale(true);
                      }else {
                        history.push('/login');
                      }
                    }}
                    buy
                  >
                  </Button>
                </div> ) : (
                   <div className='adet-sell-button-container'>
                  <Button
                    className='adet-sell-button'
                    name='List For Sale'
                    onClick={(e)=> {
                      console.log('SELL ASSET CLICKED');
                      e.preventDefault();
                      if (props.commonState.loggedIn) {
                        setMode(SELL_ASSET)
                      }else {
                        history.push('/login');
                      }
                    }}
                    buy
                  >
                  </Button>
                </div>
                )
                }
              </article>
              </Fragment>
              )
            }
            

              <article>
                <div className='detail-creator-owner-container'>
                  <p className='description-text'>{`${currentAsset.asset_description}`}</p>
                  <p className='description-label'>From the artist</p>
                </div>
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
       )}
    </Fragment>
    </Elements>
  )
}

export default AssetDetail;
