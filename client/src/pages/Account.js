import React, {Fragment, useState} from 'react';
import Button from '../components/Button'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Constants from '../reducers/Constants';
import AccountAssetsList from '../components/AccountAssetsList';
import Offers from '../components/Offers'
import OffersRecievedList from '../components/OffersRecievedList';

const Account = (props) => {

  console.log('Account commonState: ',props.commonState);

  return (
    <Fragment>
    <AccountAssetsList
        commonState={props.commonState}
        commonDispatch={props.commonDispatch}
        marketAssets={props.marketAssets}
        setMarketAssets={props.setMarketAssets}
    >
    </AccountAssetsList>
    {/* <Offers>
      <OffersRecievedList
        commonState={props.commonState}
        commonDispatch={props.commonDispatch}
        marketAssets={props.marketAssets}
        setMarketAssets={props.setMarketAssets}>
      </OffersRecievedList>
    </Offers> */}
    </Fragment>
  )
}

export default Account;