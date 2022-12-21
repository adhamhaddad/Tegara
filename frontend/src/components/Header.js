import React from 'react';
import { NavLink } from 'react-router-dom';
import Searchbar from './Searchbar';
import '../css/Header.css';

const Header = () => {
  return (
    <header>
      <div>Logo</div>
      <Searchbar />
      <ul className='navigation'>
        <li>
          <NavLink to='/products' exact>
            <i className='fa-solid fa-store'></i>
            <span>Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/profile' exact>
            <i className='fa-solid fa-user-circle'></i>
            <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/orders' exact>
            <i className='fa-solid fa-basket-shopping'></i>
            <span>Orders</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/support' exact>
            <i className='fa-solid fa-comments'></i>
            <span>Support</span>
          </NavLink>
        </li>
      </ul>
    </header>
  );
};
export default Header;
