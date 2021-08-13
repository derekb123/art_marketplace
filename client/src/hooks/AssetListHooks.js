

 export async function GetAllAssetsNewest(props, Constants, axios, setMarketAssets) {
      try {
        props.commonDispatch({ type: Constants.LOADING })
        const res = await axios.get('/assets');
        let assetsArray = res.data
        console.log(assetsArray);
        if (assetsArray.length === 0) {
          assetsArray = [{}]
        }
        // console.log('assetsArray in getAllAssetsNewest', assetsArray);
        setMarketAssets(assetsArray);
        // console.log('marketAssets after set', marketAssets);
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
        console.log('res.data in AssetListHooks', assetsArray);
        if (assetsArray.length === 0) {
          assetsArray = [{}]
        }
        // console.log('assetsArray in getAllAssetsNewest', assetsArray);
        setMarketAssets(assetsArray);
        // console.log('marketAssets after set', marketAssets);
        props.commonDispatch({ type: Constants.FINISHED_LOADING })
      } catch (error) {
        console.log(error)
      }
    }

