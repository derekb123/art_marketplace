import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Constants from '../reducers/Constants';
import Button from '../components/Button'
import axios from 'axios';

function NavBar(props) {
  const username = props.commonState.currentUserName;
  const history = useHistory();

  const UseHandleLogout = async () => {

    try {
      props.commonDispatch({ type: Constants.LOADING });
      await axios.post('users/logout',{'headers':{'Content-Type': 'application/json'}})
      const accessToken = '';
      props.commonDispatch({type: Constants.LOG_OUT});
      history.push("/login");

    } catch (error) {
      console.log(`login error: ${error}`);
      const accessToken = '';
      props.commonDispatch({type: Constants.LOG_OUT, payload: accessToken});
      history.push("/login");
      
    }
  }

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
        <Link to={'/assets/create'}>
          <div className='nav-item nav-market'>
            Create
          </div>
        </Link>
        {props.commonState.loggedIn ? (
          <Fragment>
            <Link to={'/account'}>
              <div className='nav-item nav-profile'>
                {props.commonState.avatar ?
                (props.commonState.avatar)
                : (username? (<div>{username.slice(0,1)}</div>): '')
                }
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
              <div className='nav-item'>
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
