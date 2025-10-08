import { useEffect, useLayoutEffect } from 'react';

// This hook is used to solve the "useLayoutEffect does nothing on the server" warning
// It uses useLayoutEffect in the browser, but falls back to useEffect during SSR
export const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;