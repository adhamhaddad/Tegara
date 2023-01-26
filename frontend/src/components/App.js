import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import i18next from 'i18next';

const App = () => {
  const [lang, setLang] = useState(Cookies.get('i18next'));

  const onChangeLang = (e) => {
    i18next.changeLanguage(e);
    Cookies.set('i18next', e, 'SameSite');
    setLang(e);
  };

  useEffect(() => {
    setLang(Cookies.get('i18next'));
  }, [lang]);

  const { t: translate } = useTranslation();
  return (
    <>
      <Header translate={translate} lang={lang} onChangeLang={onChangeLang} />
      <Main />
      <Footer />
    </>
  );
};

export default App;
