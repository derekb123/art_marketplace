import React, {useReducer, useEffect} from 'react';
import CommonReducer, {} from '../reducers/CommonReducer';
import axios from 'axios';
import Constants from '../reducers/Constants';
import { useHistory } from 'react-router-dom';

const CustomHooks = (props) => {

  let initialState={
    marketAssets: [],
    currentAsset: null,
    loading: false,
    loggedIn: false,
    currentUser: null,
    userFull: null
  }

  const [state, dispatch] = useReducer(CommonReducer, initialState);

    // const [userState, setUserState] = useState({
  //   loggedIn: false,
  //   user: null
  // })

  // const GetAllAssetsNewest = async () => {
  //   try {
  //     dispatch({ type: Constants.LOADING })
  //     const res = await axios.get('/assets');
  //     console.log(res.data);
  //     return res.data;
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  

  // const GetAssetById = async (id) => {
  //   try {
  //     console.log('inside GetAssetById')
  //     dispatch({ type: Constants.LOADING })
  //     console.log(id);
  //     const res = await axios.get(`/assets/${id}`);
  //     const gottenAsset = res.data[0];
  //     dispatch({ type: Constants.SET_ASSET, payload: gottenAsset})
  //     return gottenAsset;
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const login = async (email) => {
  //   try{
  //     dispatch({ type: Constants.LOADING })
  //     const res = await axios.post(`users/login`, { email: email });
  //     if(res.data.loggedIn = true) {
  //       setUserState((prev) => ({
  //         ...prev,
  //         loggedIn: true,
  //         user: res.data.user
  //       }))
  //     }
  //     dispatch({ type: Constants.FINISHED_LOADING });
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


//   const HandleLogin = (email, password) => {
//     console.log('inside HandleLogin');
//     useEffect(() => {
//       const getLoginData = async () =>{
//         try {
//           dispatch({ type: Constants.LOADING });
//           const res = await axios.post('/users/login', {email: email, password: password});
//           const logInResponse = res.data;
//           console.log(logInResponse)
//           if (logInResponse.loggedIn) {
//           }
//           dispatch({type: Constants.LOG_IN, payload: logInResponse});
//           return logInResponse;
//       } catch (error) {
//         console.log(error)
//         }
//       }
//       getLoginData();
//       useHistory.push("/");
//   },[email, password]);
// }

//   return { state, HandleLogin };
// }

  const HandleLogin = (email, password) => {
    console.log('inside HandleLogin');
    // useEffect(() => {
      // const getLoginData = async () =>{
      //   try {
      //     dispatch({ type: Constants.LOADING });
      //     const res = await axios.post('/users/login', {email: email, password: password});
      //     const logInResponse = res.data;
      //     console.log(logInResponse)
      //     if (logInResponse.loggedIn) {
      //     }
      //     dispatch({type: Constants.LOG_IN, payload: logInResponse});
      //     return logInResponse;
      // } catch (error) {
      //   console.log(error)
      //   }
      // }
      // getLoginData();
      // useHistory.push("/");
  // },[email, password]);
}

  return { state, HandleLogin };
}

export default CustomHooks;