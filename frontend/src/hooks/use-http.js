import { useState, useCallback, useContext } from 'react';
import { Authenticate } from '.';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const authCtx = useContext();

  const sendRequest = useCallback(async ({ url, method, body, cb }) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${authCtx}`
        },
        body: body !== null ? JSON.stringify(body) : null
      });
      const data = await response.json();
      if (!response.status) {
        throw new Error(data.message);
      }
      cb !== null && cb(data.data);
    } catch (err) {
      setIsLoading(false);
      setIsError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    isError,
    sendRequest
  };
};
export default useHttp;
