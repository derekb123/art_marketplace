

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

export async function GetAssetsByUserId(props, Constants, axios, setMarketAssets, user_id) {
      try {
        props.commonDispatch({ type: Constants.LOADING })
        const res = await axios.get(`/assets/users/${user_id}`);
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

