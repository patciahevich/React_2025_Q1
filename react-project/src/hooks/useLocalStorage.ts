import { useState, useEffect } from 'react';

const KEY = 'searchValue';

function useLocalStorage() {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(KEY);
      return storedValue ? JSON.parse(storedValue) : '';
    } catch (error) {
      console.error('Error: ', error);
      return '';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(value));
    } catch (error) {
      console.error('Error :', error);
    }
  }, []);

  return [value, setValue] as const;
}

export default useLocalStorage;
