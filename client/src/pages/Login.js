import React, {useReducer, useState} from 'react';
import Button from '../components/Button'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constants from '../context/Constants';
import MarketReducer from './MarketReducer';


function Login(props) {

  const [state, dispatch] = useReducer(MarketReducer, initialUserState);

  try {
    async function handleLogin (email, password) {
      dispatch({ type: Constants.LOADING });
      const res = await axios.post('/users/login', {email: email, password: password});
    }
      dispatch({type: Constants.LOGGING_IN });
  } catch (error) {
    console.log(error)
}


      


  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={e => {}}>
        <div className='email'>
          <input name='email' type='text' placeholder="Enter your email"></input>
        </div>
        {/* <br></br> */}
        <div className='password'>
          <input name='password' type='password' placeholder="Enter your password"></input>
        </div>
        <Button
          className='button--login'
          type='submit'
          name='Login'
          login
        > 
        </Button>
      </form>
        <p>Don't have an account?</p>
      <Link  to={'/register'}>
        <p>Register</p>
      </Link>
    </div>
  );
}

export default Login;
