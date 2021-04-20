import Constants from './Constants';

const CommonReducer = (state, action) => {
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
      const userInfo = action.payload;
        return {
          ...state,
          currentUser: userInfo.username,
          avatar: userInfo.avatar,
          isCreator: userInfo.isCreator,
          loggedIn: true,
          loading: false }
    }
    case Constants.AUTHORIZE: {
      console.log('inside AUTHORIZE')
      const authBoolean = action.payload
      if (authBoolean === true) {
        console.log('Authorized from Reducer')
        return {...state, loggedIn: true, loading: false}
      }
      else {
        console.log('NOT Authorized from Reducer')
        localStorage.removeItem('token');
        console.log('local storage after not authorized', localStorage)
        return {
          ...state,
          loggedIn: false,
          loading: false,
          isCreator: false,
          avatar: null,
          currentUser: null, }
      }
    }
    case Constants.FINISHED_LOADING: {
      console.log('inside FINISHED_LOADING')
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

export default CommonReducer;