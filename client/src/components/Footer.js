import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {

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
