import { useState, useEffect } from 'react';

const KEY = 'searchValue';

function useLocalStorage() {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(KEY);
      return storedValue ? JSON.parse(storedValue) : '';
    } catch (error) {
      console.error('Error: ', error);
      return;
    }
  });

  useEffect(() => {
    try {
      if (value) {
        localStorage.setItem(KEY, JSON.stringify(value));
      } else {
        localStorage.removeItem(KEY);
      }
    } catch (error) {
      console.error('Error :', error);
    }
  }, [value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
