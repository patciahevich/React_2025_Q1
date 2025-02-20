import { useEffect } from 'react';
import { useQueryParams } from './useQueryParams';
import { SEARCH_PARAMS } from '../utils/types';
import useLocalStorage from './useLocalStorage';

function useSearchFromLS(key: string) {
  const [savedValue] = useLocalStorage(key, '');
  const { searchParams, setParams } = useQueryParams();

  const initialValue = searchParams.get(SEARCH_PARAMS.Search) ?? savedValue;

  useEffect(() => {
    setParams({
      page: '1',
      search: initialValue,
    });
  }, []);

  return { initialValue };
}

export default useSearchFromLS;
