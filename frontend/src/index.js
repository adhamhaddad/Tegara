import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { BrowserRouter } from 'react-router-dom';
import { ApiContext } from './hooks/api-urls';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import '../node_modules/flag-icons/css/flag-icons.min.css';
import './css/index.css';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'ar'],
    fallbackLng: 'en',
    detection: {
      order: [
        'cookie',
        'localStorage',
        'sessionStorage',
        'htmlTag',
        'querystring',
        'navigator',
        'path',
        'subdomain'
      ],
      caches: ['cookie'],
      backend: {
        loadPath: '/locales/{{lng}}/translation.json'
      },
      react: { useSuspense: false }
    }
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApiContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApiContext>
);
