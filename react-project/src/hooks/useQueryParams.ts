import { useSearchParams } from 'react-router';
import { QueryParams } from '../utils/types';

export function useQueryParams(params?: QueryParams) {
  const [searchParams, setSearchParams] = useSearchParams(params);

  const setParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const setParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    setSearchParams(newParams);
  };

  const removeParam = (key: string | null) => {
    if (!key) return;

    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams);
  };

  return { searchParams, setParam, setParams, removeParam };
}
