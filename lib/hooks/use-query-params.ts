/**
 * A hook that safely gets query parameters in both client and server-side rendering
 */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { isBrowser } from '../browser-utils';

// This hook provides consistent access to query parameters in both client and server contexts
export function useQueryParams() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState<Record<string, string | string[] | undefined>>(
    router.query || {}
  );

  useEffect(() => {
    if (router.isReady) {
      setQueryParams(router.query);
    }
  }, [router.isReady, router.query]);

  return queryParams;
}

// Helper to get a single query parameter as a string
export function useQueryParam(name: string): string | null {
  const params = useQueryParams();
  const value = params[name];
  
  if (Array.isArray(value)) {
    return value[0] || null;
  }
  
  return value || null;
}

// Get URL query parameters directly
export function getRouterQueryParam(name: string): string | null {
  // Early return if not in browser to prevent reference errors during SSR
  if (!isBrowser) return null;
  
  try {
    // Safely access window.location
    const search = window?.location?.search || '';
    const params = new URLSearchParams(search);
    return params.get(name);
  } catch (e) {
    // If any error occurs, return null
    console.error('Error accessing query parameters:', e);
    return null;
  }
}