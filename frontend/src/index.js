import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { ApiContext } from './hooks/api-urls';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApiContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApiContext>
);
