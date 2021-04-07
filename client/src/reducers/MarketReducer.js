import Constants from './Constants';


const MarketReducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case Constants.SET_ASSETS: {
      return { ...state, marketAssets: action.payload, loading: false };
    }
    case Constants.SET_ASSET: {
      // console.log('inside SET_ASSET')
      return { ...state, currentAsset: action.payload };
    }
    case Constants.LOGGING_IN: {
      // console.log('inside SET_ASSET')
      return { ...state, currentAsset: action.payload };
    }
    case Constants.LOADING: {
      // console.log('inside loading')
      return { ...state, loading: true };
    }
    default:
      throw new Error();
  }
};

export default MarketReducer;