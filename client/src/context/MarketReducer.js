const MarketReducer = (state, action) => {
  switch(action.type) {
    case 'SET_ASSETS':
      return {
        ...state,
        marketAssets: action.payload
      };
    case 'SENDING_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'REQUEST_FINISHED':
      return {
        ...state,
        loading:false
      }
    default: 
      return state;
  }
};

export default MarketReducer;