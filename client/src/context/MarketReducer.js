const MarketReducer = (state, action) => {

  console.log(state);
  
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
      };
    case 'REQUEST_FINISHED':
      return (
        {
          ...state,
          loading: false
        },
        console.log(state, 'INSIDE REQUEST FINISHED!!!!')
      );
    default:
      throw new Error(); 
  }
};

export default MarketReducer;