import React from 'react';

function NavBar() {
  return (
    <div className='navbar'>
      <section className='logo'>
        Logo
      </section>

      <section className='nav-items'>
        <div className='nav-item nav-market'>
          Market
        </div>
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
