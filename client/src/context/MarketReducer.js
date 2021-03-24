const MarketReducer = (state, action) => {

  console.log(state);

  switch(action.type) {
    case 'SET_ASSETS':
      return {
        state: {
        ...state,
        loading: true
      }
    };
    case 'SENDING_REQUEST':
      return (
        {
          state: {
          ...state,
          loading: true
        }
      },
      console.log(state)
      );
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