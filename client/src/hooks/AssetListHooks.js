export async function GetAllAssetsNewest(props, Constants, axios, setMarketAssets) {
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

export async function GetAssetsByOwnerId(props, Constants, axios, setMarketAssets, owner_id) {
      try {
        props.commonDispatch({ type: Constants.LOADING })
        const res = await axios.get(`/assets/owners/${owner_id}`);
        let assetsArray = res.data
        // console.log('res.data in AssetListHooks', assetsArray);
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

  export async function getAssetById(id, props, Constants, axios, setCurrentAsset, setCurrentMedia) {
    try {
      // console.log('inside getAssetById')
      props.commonDispatch({ type: Constants.LOADING })
      // console.log(id);
      const assetInfoRes = await axios.get(`/assets/${id}`);
      // console.log('res in GETASSETBYID in ASSETDETAILS: ', assetInfoRes);
      const gottenAsset = assetInfoRes.data;
      // console.log('gottenAsset', gottenAsset);
      const assetMediaKey = gottenAsset.asset_media;
      // console.log('assetMediaKey in assetDetail',assetMediaKey);
      const assetImageRes = await axios.get(`/assets/${id}/image/${assetMediaKey}`);
      // console.log('assetImageRes in AssetDetail',assetImageRes);
      //GET ASSET INFO LIKE OWNER NAME & CREATOR NAME
      //PACKAGE WITH THIS OBJECT FOR DETAIL
      setCurrentAsset(gottenAsset);
      setCurrentMedia(assetImageRes.data)
      props.commonDispatch({ type: Constants.FINISHED_LOADING })
    } catch (error) {
      console.log(error)
    }
  }

export async function GetBidsByAssetIds(props, Constants, axios, setBidsRecieved, marketAssets) {
    try {
      console.log('marketAssets GetBidsByAssetIds: ',marketAssets);
      props.commonDispatch({ type: Constants.LOADING })
      let assetsIds = [];
      for(let asset of marketAssets) {
        assetsIds = assetsIds.push(asset.id);
      }
      const res = await axios.get(`/bids/assets/${assetsIds}`);
      let bidsArray = res.data
      // console.log('res.data in AssetListHooks', bidsArray);
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