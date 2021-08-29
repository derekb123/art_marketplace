import React, { Fragment, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Button from './Button';
import Constants from '../reducers/Constants';
import axios from 'axios';
import { getAssetById } from '../hooks/AssetListHooks';
import { Link, useHistory } from 'react-router-dom';

const InfoModal = (props) => {
  if(!props.showInfoModal) {
    return null;
  }

  // const modalRef = useRef();

  // const CloseModal = e => {
  //   if (modalRef.current === e.target) {
  //     props.setShowInfoModal(false);
  //   }
  // };

return (
   <Fragment>
     {props.showInfoModal ? (
       <Fragment>
        <div className='overlay'></div>

        <div className='modal'>
          <button 
            id='x-button' 
            className='button-close-modal'
            onClick={(e)=> {
              e.preventDefault();
              props.setShowInfoModal(false);
            }}
          >x
          </button>
          <div className='modal-title'>{props.modalTitle}</div>
          <div className='modal-body'>{props.modalBody}</div>
          <div className='modal-transaction-style'>
            <div className='offer-payment-type'></div>
            <Button
              className='.button--confirm'
              type='submit'
              name='OK'
              style={{width:'100%'}}
              login
              onClick={(e)=> {
              e.preventDefault();
              props.setShowInfoModal(false);
              }}
            >{props.modalButtonName}
            </Button>
          </div>
        </div>
    </Fragment>
     ) : (
       null
     )}
  </Fragment>
)
}

export default InfoModal;