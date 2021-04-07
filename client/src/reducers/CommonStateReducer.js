import Constants from './Constants';


const CommonStateReducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
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

export default CommonStateReducer;