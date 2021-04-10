import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(props) {
  return (
    <div className='navbar'>
       <Link to={'/'}>
        <section className='logo'>
          Logo
        </section>
      </Link>

      <section className='nav-items'>
        <Link to={'/'}>
          <div className='nav-item nav-market'>
            Market
          </div>
        </Link>
        <div className='nav-item nav-discover'>
          Discover
        </div>
        {props.commonState.loggedIn ? (
          <div className='nav-item nav-profile'>
          Profile
          </div>
        ): (
          <Link to={'/login'}>
            <div className='nav-item nav-profile'>
            Login/Register
            </div>
          </Link>
        )}

      </section>
    </div>
  );
}

export default NavBar;
