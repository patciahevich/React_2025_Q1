import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error('Error: ', error);
      return;
    }
  });

  useEffect(() => {
    try {
      if (value) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error :', error);
    }
  }, [value, key]);

  return [value, setValue] as const;
}

export default useLocalStorage;
