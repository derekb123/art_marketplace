import Constants from './Constants';


const MarketReducer = (state, action) => {
  switch (action.type) {
    case Constants.SET_ASSETS: {
      return { ...state, marketAssets: action.payload };
    }
    case Constants.SET_ASSET: {
      // console.log('inside SET_ASSET')
      return { ...state, currentAsset: action.payload };
    }
    case Constants.LOADING: {
      // console.log('inside loading')
      return { ...state, loading: true };
    }
    case Constants.FINISHED_LOADING: {
      // console.log('inside finished loading')
      return { ...state, loading: false };
    }
    default:
      throw new Error();
  }
};

export default MarketReducer;