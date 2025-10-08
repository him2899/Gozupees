import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Layout from '../components/layout/Layout';
import Head from 'next/head';
import '../styles/globals.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available
  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => <Layout>{page}</Layout>);

  // Prevent Flash of Unstyled Content (FOUC)
  useEffect(() => {
    // Add a class to the body when component is mounted (client-side)
    document.body.classList.add('content-loaded');
    
    return () => {
      // Cleanup when component unmounts
      document.body.classList.remove('content-loaded');
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          /* Prevent Flash of Unstyled Content */
          body {
            opacity: 0;
            transition: opacity 0.2s ease-in;
          }
          body.content-loaded {
            opacity: 1;
          }
        `}</style>
      </Head>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </>
  );
}