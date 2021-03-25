import Constants from './Constants';


const MarketReducer = (state, action) => {
  switch (action.type) {
    case Constants.SET_ASSETS: {
      return { ...state, marketAssets: action.payload };
    }
    case Constants.LOADING: {
      return { ...state, loading: true };
    }
    case Constants.FINISHED_LOADING: {
      return { ...state, loading: false };
    }
    default:
      throw new Error();
  }
};

export default MarketReducer;