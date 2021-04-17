import Constants from './Constants';

const GenReducer = (state, action) => {
  switch (action.type) {
    case Constants.LOG_OUT: {
      console.log('Inside LOG_OUT')
      localStorage.removeItem('token');
      console.log(localStorage.token);
      return {
        ...state,
        currentUser: null,
        loggedIn: false,
        loading: false };
    }
    case Constants.LOG_IN: {
      console.log('inside LOG_IN')
      console.log(action.payload)
      const currentUser = action.payload;
        return {
          ...state,
          currentUser: currentUser,
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
      console.log('error in Reducer')
      throw new Error();
  }
};

export default GenReducer;