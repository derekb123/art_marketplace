import Constants from './Constants';

const CommonReducer = (state, action) => {
  switch (action.type) {
    case Constants.LOG_OUT: {
      // console.log('Inside LOG_OUT')
      return {
        ...state,
        currentUser: null,
        avatar: null,
        isCreator: false,
        loggedIn: false,
        loading: false };
    }
    case Constants.LOG_IN: {
      // console.log('inside LOG_IN');
      const userInfo = action.payload;
      console.log(userInfo);
        return {
          ...state,
          currentUser: userInfo.username,
          loggedIn: true,
          loading: false,
          isCreator: userInfo.isCreator,
          avatar: userInfo.avatar
           }
    }
    case Constants.REFRESH: {
      // console.log('inside REFRESH');
      const userInfo = action.payload;
      console.log(userInfo);
      console.log('local storage token loaded?',localStorage.token);
        return {
          ...state,
          currentUser: userInfo.username,
          loggedIn: true,
          loading: false,
          isCreator: userInfo.isCreator,
          avatar: userInfo.avatar
           }
    }
    case Constants.UPLOAD_ASSETS: {
      console.log('inside UPLOAD_ASSETS');
      const userInfo = action.payload;
      console.log(userInfo);
      console.log('local storage token loaded?',localStorage.token);
        return {
          ...state,
          currentUser: userInfo.username,
          loggedIn: true,
          loading: false,
          isCreator: userInfo.isCreator,
          avatar: userInfo.avatar
           }
    }
    case Constants.AUTHORIZE: {
      // console.log('inside AUTHORIZE');
      const payload = action.payload
      // const authObj = payload.authObj;
      console.log(payload);
      if (payload.verifyAccess === true) {
        console.log('Authorized from Reducer')
        return {
          ...state,
          loggedIn: true, 
          loading: false,
          isCreator: payload.isCreator,
          avatar: payload.avatar,
          currentUser: payload.username,
        }
      }
      else {
        console.log('NOT Authorized from Reducer')
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
      // console.log('inside FINISHED_LOADING')
      return { ...state, loading: false };
    }
    case Constants.LOADING: {
      // console.log('inside LOADING')
      return { ...state, loading: true };
    }
    default:
      // console.log('error in Reducer')
      throw new Error();
  }
};

export default CommonReducer;