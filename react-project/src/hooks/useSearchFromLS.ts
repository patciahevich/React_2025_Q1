import { useEffect } from 'react';
import { useQueryParams } from './useQueryParams';
import useLocalStorage from './useLocalStorage';

function useSearchFromLS(key: string) {
  const [savedValue] = useLocalStorage(key, '');
  const { query, setParams } = useQueryParams();

  const initialValue = query.search ?? savedValue;

  useEffect(() => {
    setParams({
      page: '1',
      search: initialValue,
    });
  }, []);

  return { initialValue };
}

export default useSearchFromLS;
