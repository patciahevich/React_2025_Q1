import { useSearchParams } from 'react-router';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

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
