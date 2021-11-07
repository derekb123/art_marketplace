import Constants from './Constants';

const CommonReducer = (state, action) => {
  switch (action.type) {
    case Constants.LOG_OUT: {
      return {
        ...state,
        currentUserName: null,
        avatar: null,
        isCreator: false,
        loggedIn: false,
        loading: false };
    }
    case Constants.LOG_IN: {
      const userInfo = action.payload;
        return {
          ...state,
          currentUserName: userInfo.username,
          loggedIn: true,
          loading: false,
          isCreator: userInfo.isCreator,
          avatar: userInfo.avatar,
          currentUserId: userInfo.userId
           }
    }
    case Constants.REFRESH: {
      const userInfo = action.payload;
        return {
          ...state,
          currentUserName: userInfo.username,
          loggedIn: true,
          loading: false,
          isCreator: userInfo.isCreator,
          avatar: userInfo.avatar,
          currentUserId: userInfo.userId
           }
    }
    case Constants.UPLOAD_ASSETS: {
      const userInfo = action.payload;
        return {
          ...state,
          currentUserName: userInfo.username,
          loggedIn: true,
          loading: false,
          isCreator: userInfo.isCreator,
          avatar: userInfo.avatar
           }
    }
    case Constants.AUTHORIZE: {
      const payload = action.payload
      if (payload.verifyAccess === true) {
        return {
          ...state,
          loggedIn: true, 
          loading: false,
          isCreator: payload.isCreator,
          avatar: payload.avatar,
          currentUserName: payload.username,
          currentUserId: payload.userId
        }
      }
      else {
        return {
          ...state,
          loggedIn: false,
          loading: false,
          isCreator: false,
          avatar: null,
          currentUserName: null,
          currentUserId: null }
      }
    }
    case Constants.UPDATE_CREATOR: {
      return {
        ...state,
        isCreator: true
      }
    }
    case Constants.FINISHED_LOADING: {
      return { ...state, loading: false };
    }
    case Constants.LOADING: {
      return { ...state, loading: true };
    }
    default:
      throw new Error();
  }
};

export default CommonReducer;