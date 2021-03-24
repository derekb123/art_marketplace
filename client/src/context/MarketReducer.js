import Constants from './Constants';


const MarketReducer = (state, action) => {
  switch (action.type) {
    case Constants.SETASSETS: {
      console.log("SET ASSETS")
      return { ...state, marketAssets: action.payload };
    }
    case Constants.LOADING: {
      console.log("LOADING")
      return { ...state, status: 'loading' };
    }
    case Constants.FINISHED_LOADING: {
      console.log("FINISHED_LOADING")
      return { ...state, status: 'finished' };
    }
    default:
      throw new Error();
  }
};

export default MarketReducer;