'use client';
import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedValue = localStorage.getItem(key);
        setValue(storedValue ? JSON.parse(storedValue) : initialValue);
      } catch (error) {
        console.error('Error retrieving from localStorage:', error);
        setValue(initialValue);
      }
    }
  }, [key, initialValue]);

  useEffect(() => {
    if (typeof window !== 'undefined' && value !== undefined) {
      try {
        if (value) {
          localStorage.setItem(key, JSON.stringify(value));
        } else {
          localStorage.removeItem(key);
        }
      } catch (error) {
        console.error('Error setting to localStorage:', error);
      }
    }
  }, [value, key]);

  return [value, setValue] as const;
}

export default useLocalStorage;
