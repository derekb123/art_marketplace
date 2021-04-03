import React from 'react';

const CustomHooks = (props) => {

  const initialState={
    marketAssets: [],
    currentAsset: null,
    loading: true
  }

  const [userState, setUserState] = useState({
    loggedIn: false,
    user: null
  })

  const [state, dispatch] = useReducer(MarketReducer, initialState);

  const getAllAssetsNewest = async () => {
    try {
      dispatch({ type: Constants.LOADING })
      const res = await axios.get('/assets');
      dispatch({ type: Constants.FINISHED_LOADING });
      dispatch({ type: Constants.SET_ASSETS, payload: res.data})
    } catch (error) {
      console.log(error)
    }
  }

  const getAssetById = async (id) => {
    try {
      console.log('inside getAssetById')
      dispatch({ type: Constants.LOADING })
      console.log(id);
      const res = await axios.get(`/assets/${id}`);
      console.log(res, res.data);
      dispatch({ type: Constants.FINISHED_LOADING });
      dispatch({ type: Constants.SET_ASSET, payload: res.data[0]})
    } catch (error) {
      console.log(error)
    }
  }

  const login = async (email) => {
    try{
      dispatch({ type: Constants.LOADING })
      const res = await axios.post(`users/login`, { email: email });
      if(res.data.loggedIn = true) {
        setUserState((prev) => ({
          ...prev,
          loggedIn: true,
          user: res.data.user
        }))
      }
      dispatch({ type: Constants.FINISHED_LOADING });
    } catch (error) {
    console.log(error)
  }
}

  return (
    <MarketContext.Provider
      value={{
        marketAssets: state.marketAssets,
        currentAsset: state.currentAsset,
        loading: state.loading,
        getAllAssetsNewest: getAllAssetsNewest,
        getAssetById: getAssetById
    }}>
      {props.children}
    </MarketContext.Provider>
  )

}

export default CustomHooks;