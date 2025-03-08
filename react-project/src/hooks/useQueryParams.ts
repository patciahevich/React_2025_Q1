'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export function useQueryParams() {
  const searchParams = useSearchParams() as URLSearchParams;
  const pathname = usePathname();
  const router = useRouter();

  const setParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const setParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, value);
    });

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const removeParam = (key: string | null) => {
    if (!key) return;

    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return { searchParams, setParam, setParams, removeParam };
}
