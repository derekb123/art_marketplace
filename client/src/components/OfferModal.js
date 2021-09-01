import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from './Button';
import Constants from '../reducers/Constants';
import axios from 'axios';
import { getAssetById } from '../hooks/AssetListHooks';
import { Link, useHistory } from 'react-router-dom';

const OfferModal = (props) => {
  if(!props.showOfferModal) {
    return null;
  }


<Fragment>

          <div className='overlay'></div>
          <div className='modal'>
            <button 
              id='x-button' 
              className='button-close-modal'
              onClick={(e)=> {
                e.preventDefault();
                props.setShowOfferModal(false);
              }}
            >x
            </button>
            
            <div className='modal-title'>Make an Offer</div>
            <div className='modal-transaction-style'>
              <div className='offer-payment-type'></div>
              <p className='min-offer-disclaimer'></p>
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
              <label  className='common-input-label'>Amount</label>
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
            </div>
          </div>
        </Fragment>
}

export default OfferModal;

// { showOfferModal && 
//         <Fragment>

//           <div className='overlay'></div>
            
//           <div className='modal'>
//             <button 
//               id='x-button' 
//               className='button-close-modal'
//               onClick={(e)=> {
//                 e.preventDefault();
//                 setShowOfferModal(false);
//               }}
//             >x
//             </button>
            
//             <div className='modal-title'>Make an Offer</div>
//             <div className='modal-transaction-style'>
//               <div className='offer-payment-type'></div>
//               <p className='min-offer-disclaimer'></p>
//               <form className='offer-form' onSubmit={(e)=>{
//               console.log('OFFER SUBMITTED');
//               e.preventDefault();
//               }}>
//               <input
//                 className='amount-input'
//                 name='Amount'
//                 type='number'
//                 placeholder="Offer Amount"
//                 onChange= {(e) => {setAmount( e.target.value)}}
//                 >
//               </input>
//               <label  className='input-label'>Amount</label>
//               <Button
//                 className='.button--confirm'
//                 type='submit'
//                 name='Submit'
//                 style={{width:'100%'}}
//                 login
//               >
//               </Button>
//               </form>
//               <p className='general-disclaimer'>
//                 Your card will be authorized immediately, but the funds are transferred only after offer is accepted. Learn more
//               </p>
//             </div>
//           </div>
//         </Fragment>
//       }