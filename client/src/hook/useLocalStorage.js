import { useEffect } from 'react';

const useLocalStorage = (key, value) => {
  useEffect(() => {
    if (value !== undefined) {
      localStorage.setItem(key, value);
    }
  }, [key, value]);
};

export default useLocalStorage;
