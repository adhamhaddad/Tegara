import React from 'react';
import { Route } from 'react-router-dom';
import Products from '../pages/Products';
import Profile from '../pages/Profile';
import Orders from '../pages/Orders';
import Support from '../pages/Support';
import Admin from '../pages/Admin';
import '../css/Main.css';

const Main = () => {
  return (
    <main>
      <Route path='/products' exact>
        <Products />
      </Route>
      <Route path='/profile' exact>
        <Profile />
      </Route>
      <Route path='/orders' exact>
        <Orders />
      </Route>
      <Route path='/support' exact>
        <Support />
      </Route>
    </main>
  );
};
export default Main;
