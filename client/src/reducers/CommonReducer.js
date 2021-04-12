import Constants from './Constants';

const GenReducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case Constants.LOG_OUT: {
      // console.log('inside LOG_OUT')
      return {
        ...state,
        userMin: null,
        loggedIn: false,
        loading: false };
    }
    case Constants.LOG_IN: {
      console.log('inside LOG_IN')
      console.log(action.payload)
      const loginResponse = action.payload;
        return {
          ...state,
          userMin: loginResponse,
          loggedIn: true,
          loading: false };
    }
    case Constants.FINISHED_LOADING: {
      // console.log('inside FINISHED_LOADING')
      return { ...state, loading: false };
    }
    case Constants.LOADING: {
      console.log('inside LOADING')
      return { ...state, loading: true };
    }
    default:
      throw new Error();
  }
};

export default GenReducer;