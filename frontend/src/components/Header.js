import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Searchbar from './Searchbar';
import '../css/Header.css';

const Header = ({ translate, lang, onChangeLang }) => {
  const [language, setLanguage] = useState(false);
  const showLang = () => {
    setLanguage((prev) => !prev);
  };
  return (
    <header>
      <nav className='container'>
        <div className='logo'>
          <img src='images/logo/logo.png' alt='Logo' />
        </div>
        <Searchbar />

        <ul className='navigation'>
          <li>
            <NavLink to='/products' exact>
              <i className='fa-solid fa-store'></i>
              <span>{translate('header.product')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/profile' exact>
              <i className='fa-solid fa-user-circle'></i>
              <span>{translate('header.profile')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/orders' exact>
              <i className='fa-solid fa-basket-shopping'></i>
              <span>{translate('header.orders')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/support' exact>
              <i className='fa-solid fa-comments'></i>
              <span>{translate('header.support')}</span>
            </NavLink>
          </li>
        </ul>
        <ul id='lang' onClick={showLang} onChange={onChangeLang}>
          <li className='global-flag'>
            <div>
              <i className='fa-solid fa-globe'></i>
              <span>{lang}</span>
            </div>
            <i className='fa-solid fa-caret-down'></i>
          </li>
          {language && (
            <div className='langs'>
              <li>
                <button onClick={() => onChangeLang('en')}>
                  <span>{translate('lang.en')}</span>
                  <i className='fi fi-gb'></i>
                </button>
              </li>
              <li>
                <button onClick={() => onChangeLang('ar')}>
                  <span>{translate('lang.ar')}</span>
                  <i className='fi fi-eg'></i>
                </button>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
