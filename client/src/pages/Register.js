import React from 'react';
import Button from '../components/Button'
import { Link } from 'react-router-dom';

// import HomeAssetsList from '../components/HomeAssetsList'
// import SearchContainer from '../components/SearchContainer'

function Register(props) {

  const handleSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div className="Register">
      <h2>Register</h2>
      <form onSubmit={e => {handleSubmit(e)}}>
        <div className='email'>
          <input name='email' type='text' placeholder="Enter your email"></input>
        </div>
        {/* <br></br> */}
        <div className='password'>
          <input name='password' type='password' placeholder="Enter your password"></input>
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
