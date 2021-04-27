import React, {useState} from 'react';
import Button from '../components/Button'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
// import HandleLogin from '../hooks/CustomHooks';
import Constants  from '../reducers/Constants';

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const UseHandleLogin = async (email, password) => {

    try {
      props.commonDispatch({ type: Constants.LOADING });
      const res = await axios.post(
        'users/login',
        {withCredentials: true, credentials: 'include'},
        {'headers':{'Content-Type': 'application/json', email, password}}
        )
      console.log('res recieved from login: ',res)
      const loginAccessToken = res.data.accessToken;
      console.log(loginAccessToken);
      const refreshToken = res.data.refreshToken;
      console.log(refreshToken);
      const loginSuccess = res.data.loginSuccess;
      props.commonDispatch({type: Constants.LOG_IN, payload: res.data});
      if (loginSuccess) {
        history.push("/");
      }
    } catch (error) {
      localStorage.removeItem('token');
      console.log(`login error: ${error}`);
    }
  }

  return (
    <div className="Login">
      <h2>Login</h2>
      {}
      <div></div>
      <form onSubmit={(e) => {
        console.log('LOGIN SUBMITTED');
        UseHandleLogin( email, password );
        e.preventDefault();
        }}
        >
        <div className='email'>
          <input
            name='email'
            type='text'
            placeholder="Enter your email"
            onChange= {(e) => {
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
          login
        >
        </Button>
      </form>
        <p>Don't have an account?</p>
      <Link  to={'/register'}>
        <p className='wordlink'>Register</p>
      </Link>
    </div>
  );
}

export default Login;
