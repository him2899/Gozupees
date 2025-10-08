/**
 * A collection of utility functions that safely access browser-specific features
 * This helps avoid issues with server-side rendering where window/document/etc are undefined
 */

/**
 * Check if we're running in the browser
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Get the current URL query string - safely handling SSR
 */
export function getQueryString(): string {
  return isBrowser ? window.location.search : '';
}

/**
 * Parse URL query parameters - safely handling SSR
 */
export function parseQueryParams(queryString?: string): URLSearchParams {
  const query = queryString || getQueryString();
  return new URLSearchParams(query);
}

/**
 * Get a specific query parameter value
 */
export function getQueryParam(name: string, queryString?: string): string | null {
  return parseQueryParams(queryString).get(name);
}

/**
 * Get all query parameters as an object
 */
export function getAllQueryParams(queryString?: string): Record<string, string> {
  const params = parseQueryParams(queryString);
  const result: Record<string, string> = {};
  
  // Convert URLSearchParams to a plain object
  params.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
}