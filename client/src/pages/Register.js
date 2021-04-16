import React, {useState} from 'react';
import Button from '../components/Button'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Constants from '../reducers/Constants';

// import HomeAssetsList from '../components/HomeAssetsList'
// import SearchContainer from '../components/SearchContainer'

function Register(props) {

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  console.log(props.setAuth)

  const history = useHistory();

  const registerSubmit = (email, password, username) => {
    props.commonDispatch({ type: Constants.LOADING });
    return axios
      .post('users/register', {email: email, password: password, username:username}, {'headers':{'Content-Type': 'application/json'}})
      .then((data) => {
        console.log('data recieved from registerSubmit: ',data)
        console.log('commonstate', props.commonState);
        const parseRes = data.data.token;
        console.log(parseRes);
        localStorage.setItem('token', parseRes);
        // props.setAuth(true);
        props.commonDispatch({ type: Constants.FINISHED_LOADING });
        // history.push('/login');
      })
      .catch((error)=> {
        console.log('registerSubmit error: ',error)
      })
  }


  return (
    <div className="Register">
      <h2>Register</h2>
      <form onSubmit={(e) => {
        console.log('REGISTER SUBMITTED');
        registerSubmit( registerEmail, registerPassword, registerUsername);
        history.push("/login");
        e.preventDefault();
        }}
        >
        <div className='email'>
          <input name='email'
          type='email'
          placeholder="Enter your email"
          onChange= {(e) => {
            // console.log(e.target.value);
            setRegisterEmail( e.target.value )
          }}>
          </input>
        </div>
        {/* <br></br> */}
        <div className='password'>
          <input name='password'
          type='password'
          placeholder="Enter your password"
          onChange= {(e) => {
            // console.log(e.target.value);
            setRegisterPassword( e.target.value )
          }}>

          </input>
        </div>
        <div className='username'>
          <input name='username'
          type='text'
          placeholder="Enter your username"
          onChange= {(e) => {
            // console.log(e.target.value);
            setRegisterUsername( e.target.value )
          }}>
          </input>
        </div>
        <Button
          className='button--register'
          type='submit'
          name='Register'
          register
        >
        </Button>
      </form>
        <p>Already have an account?</p>
      <Link  to={'/login'}>
        <p>Login</p>
      </Link>
    </div>
  );
}

export default Register;
