import React from 'react';
import Button from '../components/Button'
import { Link } from 'react-router-dom';

// import HomeAssetsList from '../components/HomeAssetsList'
// import SearchContainer from '../components/SearchContainer'

function Login(props) {

  const handleSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={e => {handleSubmit(e)}}>
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
