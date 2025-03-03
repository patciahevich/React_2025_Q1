'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export function useQueryParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const setParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams as URLSearchParams);
    newParams.set(key, value);

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const setParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams as URLSearchParams);
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, value);
    });

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const removeParam = (key: string | null) => {
    if (!key) return;

    const newParams = new URLSearchParams(searchParams as URLSearchParams);
    newParams.delete(key);

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return { searchParams, setParam, setParams, removeParam };
}
