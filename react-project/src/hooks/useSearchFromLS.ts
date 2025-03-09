'use client';
import { useEffect } from 'react';
import { useQueryParams } from './useQueryParams';
import useLocalStorage from './useLocalStorage';

function useSearchFromLS(key: string) {
  const [savedValue] = useLocalStorage(key, '');
  const { searchParams, setParams } = useQueryParams();

  const initialValue = searchParams?.get('search') ?? savedValue;

  useEffect(() => {
    setParams({
      page: '1',
      search: initialValue,
    });
  }, []);

  return { initialValue };
}

export default useSearchFromLS;
