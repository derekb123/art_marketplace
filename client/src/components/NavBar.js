import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className='navbar'>
      <section className='logo'>
        Logo
      </section>

      <section className='nav-items'>
        <Link>
          <div className='nav-item nav-market'>
            Market
          </div>
        </Link>
        
        <div className='nav-item nav-discover'>
          Discover
        </div>
        <div className='nav-item nav-profile'>
          Profile
        </div>
      </section>
    </div>
  );
}

export default NavBar;
