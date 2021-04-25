import React, { Fragment, Redirect } from 'react';
import { Link } from 'react-router-dom';
import Constants from '../reducers/Constants';

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
          <Fragment>
            <Link to='/account'>
              <div className='nav-item nav-profile'>
              {/* {props.commonState.avatar} */}ACCOUNT
              </div>
            </Link>
            <Link onClick={()=> props.commonDispatch({type: Constants.LOG_OUT})} to='Login'>
              <div className='nav-item nav-logout'>
              Logout
              </div>
            </Link>
          </Fragment>
        ): (
          <Fragment>
            <Link to={'/register'}>
              <div className='nav-item nav-profile'>
              Register/Login
              </div>
            </Link>
          </Fragment>
        )}

      </section>
    </div>
  );
}

export default NavBar;
