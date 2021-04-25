import React, {useState} from 'react';
import Button from '../components/Button'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Constants from '../reducers/Constants';

function Register(props) {

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');

  const history = useHistory();

  const registerSubmit = async (email, password, username) => {
    try {
      props.commonDispatch({ type: Constants.LOADING });
      const res = await axios
        .post('users/register',
        {email: email, password: password, username:username}, 
        {'headers':{'Content-Type': 'application/json'}});
      console.log('res recieved from registerSubmit: ',res);
      const success = res.data;
      console.log('success in Register', success)
      await props.commonDispatch({ type: Constants.FINISHED_LOADING });
      if (success === true){
        history.push("/login");}
    } catch (error) {
      console.log('register error: ', error)
    }
  }

  return (
    <div className="Register">
      <h2>Register</h2>
      <form onSubmit={async (e) => {
        console.log('REGISTER SUBMITTED');
        registerSubmit( registerEmail, registerPassword, registerUsername);
        e.preventDefault();
        }}
        >
        <div className='email'>
          <input name='email'
          type='email'
          placeholder="Enter your email"
          onChange= {(e) => {
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
            setRegisterPassword( e.target.value )
          }}>

          </input>
        </div>
        <div className='username'>
          <input name='username'
          type='text'
          placeholder="Enter your username"
          onChange= {(e) => {
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
