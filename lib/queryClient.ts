import { QueryClient } from '@tanstack/react-query';

/**
 * Throws an error if the response is not ok
 */
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    let errorText = `${res.status} ${res.statusText}`;
    try {
      const errorData = await res.json();
      if (errorData.message) {
        errorText = errorData.message;
      }
    } catch (e) {
      // Ignore parsing errors
    }
    throw new Error(errorText);
  }
}

/**
 * A utility function to make API requests with proper error handling
 */
export async function apiRequest<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
    },
  });

  await throwIfResNotOk(res);

  return res.json();
}

/**
 * Create a queryClient with default options
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});