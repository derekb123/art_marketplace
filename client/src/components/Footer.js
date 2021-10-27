import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Constants from '../reducers/Constants';
import Button from '../components/Button'
import axios from 'axios';

function Footer(props) {
  const username = props.commonState.currentUserName;
  const history = useHistory();

  return (
    
    <div className='footer'>
    <hr className='common-hr'></hr> 
       <Link to={'/'}>
        <section className='footer-logo'>
          Links
        </section>
      </Link>

      <section className='footer-items'>
        <Link to={'/'}>
          <div className='nav-item nav-market'>
            Market
          </div>
        </Link>
        <Link to={'/assets/create'}>
          <div className='nav-item nav-market'>
            Create
          </div>
        </Link>
            <Link to={'/register'}>
              <div className='nav-item'>
              Register/Login
              </div>
            </Link>

      </section>
    </div>
  );
}

export default Footer;
