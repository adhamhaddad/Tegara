import React from 'react';
import classes from '../css/Searchbar.module.css';

const Searchbar = () => {
  return <div className={classes['searchbar']}>
    <input type="search" placeholder='Search ...'/>
  </div>;
};
export default Searchbar;
