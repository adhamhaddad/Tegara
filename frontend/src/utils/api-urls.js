import React, { createContext } from 'react';

const apiURL = createContext({
  apiURL: ''
});

export const ApiContext = ({ children }) => {
  const values = {
    api: 'http://192.168.1.5:8000'
  };
  return <apiURL.Provider value={values}>{children}</apiURL.Provider>;
};
export default apiURL;
