import React, {useState} from 'react';
import Button from '../components/Button'
import { Link } from 'react-router-dom';
import axios from 'axios';
import HandleLogin from '../hooks/CustomHooks';
import Constants from '../reducers/Constants'


const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (email, password) => {
    console.log('inside login');
    return axios
      .post('users/login', {email: email, password: password})
      .then((data) => {
        console.log('data recieved from login: ',data)
      .catch((error)=> {
        console.log('login error: ',error)
      })
        // if (data.loggedIn) {
        //   props.commonDispatch({type: Constants.LOG_IN, payload: data.loggedIn})
        // }
      })
  }

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={(e) => {
        console.log('LOGIN SUBMITTED');
        login( email, password );
        e.preventDefault();
        }}
        >
        <div className='email'>
          <input
            name='email'
            type='text'
            placeholder="Enter your email"
            onChange= {(e) => {
              // console.log(e.target.value);
              setEmail( e.target.value)
            }}
            >
          </input>
        </div>
        {/* <br></br> */}
        <div className='password'>
          <input
            name= 'password'
            type= 'password'
            placeholder= "Enter your password"
            onChange= {e => setPassword( e.target.value )}
            >
          </input>
        </div>
        <Button
          className='button--login'
          type='submit'
          name='Login'
          // onClick={(e) => {
          // console.log('LOGIN SUBMITTED');
          // HandleLogin( email, password );
          // e.preventDefault();
          // }}
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
