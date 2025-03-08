import { useRouter } from 'next/router';

export function useQueryParams() {
  const router = useRouter();
  const { query } = router;

  const setParam = (key: string, value: string) => {
    const newQuery = { ...query, [key]: value };

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  const setParams = (params: Record<string, string>) => {
    const newQuery = { ...query, ...params };

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  const removeParam = (key: string | null) => {
    if (!key) return;

    const newQuery = Object.fromEntries(
      Object.entries(query).filter(([k]) => k !== key)
    );

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  return { query, setParam, setParams, removeParam };
}
