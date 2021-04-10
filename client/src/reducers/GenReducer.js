import Constants from './Constants';

const GenReducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case Constants.SET_ASSETS: {
      return { ...state, marketAssets: action.payload, loading: false };
    }
    case Constants.SET_ASSET: {
      // console.log('inside SET_ASSET')
      return { ...state, currentAsset: action.payload, loading: false };
    }
    case Constants.LOG_IN: {
      // console.log('inside LOG_IN')
      return { ...state, currentAsset: action.payload, loading: false };
    }
    case Constants.LOADING: {
      // console.log('inside loading')
      return { ...state, loading: true };
    }
    default:
      throw new Error();
  }
};

export default GenReducer;