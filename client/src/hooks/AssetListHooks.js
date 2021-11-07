import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import Constants from '../reducers/Constants';

export async function GetAllAssetsNewest(props, Constants, setMarketAssets) {
  try {
    props.commonDispatch({ type: Constants.LOADING })
    const res = await axios.get('/assets');
    let assetsArray = res.data
    // console.log(assetsArray);
    if (assetsArray.length === 0) {
      assetsArray = [{}]
    }
    // console.log('assetsArray in getAllAssetsNewest', assetsArray);
    setMarketAssets(assetsArray);
    props.commonDispatch({ type: Constants.FINISHED_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export async function GetUsernamesBySearch(props, Constants, setArtistSuggestions, query) {
  try {
    props.commonDispatch({ type: Constants.LOADING })
    const res = await axios.get(`/users/search${query}`);
    let usersArray = res.data
    console.log(usersArray);
    if (usersArray.length === 0) {
      usersArray = [{}]
    }
    console.log('usersArray in getAllusersNewest', usersArray);
    setArtistSuggestions(usersArray);
    props.commonDispatch({ type: Constants.FINISHED_LOADING })
    return usersArray;
  } catch (error) {
    console.log(error)
  }
}

export async function GetUserById(props, Constants, user_id) {
  try {
    props.commonDispatch({ type: Constants.LOADING })
    const res = await axios.get(`/users/${user_id}`);
    let userObj = res.data
    console.log(userObj);
    if (userObj.length === 0) {
      userObj = {}
    }
    console.log('userObj in getAllusersNewest', userObj);
    props.commonDispatch({ type: Constants.FINISHED_LOADING })
    return userObj;
  } catch (error) {
    console.log(error)
  }
}

export async function GetAllCreators(props, Constants, setFullArtistList) {
  try {
    props.commonDispatch({ type: Constants.LOADING })
    const res = await axios.get(`/users/creators`);
    let usersArray = res.data
    console.log(usersArray);
    if (usersArray.length === 0) {
      usersArray = [{}]
    }
    console.log('usersArray in getAllusersNewest', usersArray);
    await setFullArtistList(usersArray);
    props.commonDispatch({ type: Constants.FINISHED_LOADING })
    return usersArray;
  } catch (error) {
    console.log(error)
  }
}

export async function GetAssetsByUserId(props, Constants, setMarketAssets, user_id, userType) {
      try {
        //REFACTOR SO THAT RES DOESNT RUN 1ST TIME WITHOUT DATA
        let res;
        props.commonDispatch({ type: Constants.LOADING })
        if (userType === 'owner') {
          res = await axios.get(`/assets/owners/${user_id}`);
        } else if (userType === 'creator'){
          res = await axios.get(`/assets/creators/${user_id}`);
        }
        console.log('res in getAssetsByUserId', res);
        let assetsArray = res.data
        if (assetsArray.length === 0) {
          assetsArray = [{}]
        }
        console.log('assetsArray in getAssetsByUserId', assetsArray);
        setMarketAssets(assetsArray);
        props.commonDispatch({ type: Constants.FINISHED_LOADING })
      } catch (error) {
        console.log(error)
      }
    }

  export async function getAssetById(id, props, Constants, axios, setCurrentAsset, setCurrentMedia) {
    try {
      props.commonDispatch({ type: Constants.LOADING })
      const assetInfoRes = await axios.get(`/assets/${id}`);
      const gottenAsset = assetInfoRes.data;
      console.log('gottenAsset', gottenAsset)
      const assetMediaKey = gottenAsset.asset_media;
      const assetImageRes = await axios.get(`/assets/${id}/image/${assetMediaKey}`);
      //GET ASSET INFO LIKE OWNER NAME & CREATOR NAME
      //PACKAGE WITH THIS OBJECT FOR DETAIL
      setCurrentAsset(gottenAsset);
      setCurrentMedia(assetImageRes.data)
      props.commonDispatch({ type: Constants.FINISHED_LOADING })
    } catch (error) {
      console.log(error)
    }
  }

export async function GetHighestBidsByAssetIds(props, Constants, axios, setBidsRecieved, marketAssets) {
    try {
      console.log('marketAssets GetBidsByAssetIds: ',marketAssets);
      props.commonDispatch({ type: Constants.LOADING })
      let assetsIds = [];
      for(let asset of marketAssets) {
        assetsIds = assetsIds.push(asset.id);
      }
      const res = await axios.get(`/bids/assets/highest/${assetsIds}`);
      let bidsArray = res.data
      if (bidsArray.length === 0) {
        bidsArray = [{}]
        return;
      }

      setBidsRecieved(bidsArray);
      props.commonDispatch({ type: Constants.FINISHED_LOADING })
    } catch (error) {
      console.log(error)
    }
  }

  // export async function GetBidsRecieved(props, Constants, axios, setBidsRecieved, owner_id, asset_id) {
  //   try {
  //     props.commonDispatch({ type: Constants.LOADING })
  //     const res = await axios.get(`/bids/assets/${asset_id}/users/${owner_id}`);
  //     let assetsArray = res.data
  //     // console.log('res.data in AssetListHooks', assetsArray);
  //     if (assetsArray.length === 0) {
  //       assetsArray = [{}]
  //       return;
  //     }

  //     const ConstructedBidArray = []

  //     for (let asset of assetsArray) {
  //       const assetBid = await axios.get(`/bids/owners/${asset.owner_id}/recieved`);
  //       asset.bidder_id = assetBid.bidder_id;
  //       asset.bid_price = assetBid.bid_price;
  //       ConstructedBidArray.push(asset);
  //     }
  //     // console.log('assetsArray in getAllAssetsNewest', assetsArray);
  //     setBidsRecieved(assetsArray);
  //     props.commonDispatch({ type: Constants.FINISHED_LOADING })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }