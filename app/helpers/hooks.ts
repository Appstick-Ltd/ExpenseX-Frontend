'use client';
import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * useFetch Hook
 * Mirrors roofstick-frontend/app/helpers/hooks.js
 * Automatically loads data using a backend fetcher function.
 */
export const useFetch = <T = any>(
  func: (params?: any) => Promise<any>,
  query: Record<string, any> = {},
  load: boolean = true,
  initialData: T | undefined = undefined
): [
  T | undefined,
  (newQuery?: Record<string, any>) => Promise<any>,
  { query: Record<string, any>; loading: boolean; error: string; clear: () => void }
] => {
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(initialData !== undefined ? false : load);
  const [error, setError] = useState<string>('');
  const [params, setParams] = useState<Record<string, any>>(query);

  const getData = useCallback(
    async (extraQuery?: Record<string, any>) => {
      setLoading(true);
      setError('');
      const combined = { ...params, ...(extraQuery || {}) };
      setParams(combined);

      try {
        const res = await func(combined);
        setLoading(false);
        if (res && res.error === false) {
          setData(res.data);
          return res.data;
        } else if (res && res.success === true) {
          setData(res.data);
          return res.data;
        } else if (res && !res.error && res.data !== undefined) {
          setData(res.data);
          return res.data;
        } else if (res) {
          setData(res);
          return res;
        } else {
          setData(undefined);
          setError(res?.msg || res?.message || 'Failed to load data');
        }
      } catch (err: any) {
        setLoading(false);
        setError(err?.message || 'An error occurred while fetching');
      }
    },
    [func, params]
  );

  useEffect(() => {
    if (load && initialData === undefined) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clear = useCallback(() => setData(undefined), []);

  return [data, getData, { query: params, loading, error, clear }];
};

/**
 * Hook to detect clicks outside a referenced element
 */
export const userOutSideClick = (
  ref: React.RefObject<HTMLElement | null>,
  callback?: () => void
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback && callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
