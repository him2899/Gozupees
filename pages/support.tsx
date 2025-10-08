import React, { useEffect } from 'react';
import { ReactElement } from 'react';
import Layout from '../components/layout/Layout';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';

export default function Support() {
  const router = useRouter();

  useEffect(() => {
    // Hide widget when leaving support page
    const handleRouteChange = () => {
      const widgetElements = document.querySelectorAll('.zsiq_floatmain, .zsiq_float');
      widgetElements.forEach((element) => {
        (element as HTMLElement).style.display = 'none';
      });
    };

    // Show widget when on support page
    const showWidget = () => {
      setTimeout(() => {
        const widgetElements = document.querySelectorAll('.zsiq_floatmain, .zsiq_float');
        widgetElements.forEach((element) => {
          (element as HTMLElement).style.display = 'block';
          (element as HTMLElement).style.right = '20px';
          (element as HTMLElement).style.left = 'unset';
        });
      }, 2000);
    };

    showWidget();
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      handleRouteChange(); // Hide on unmount
    };
  }, [router]);

  return (
    <React.Fragment>
      <Head>
        <title>Support - GoZupees</title>
        <meta name="description" content="Customer support coming soon - GoZupees AI Voice Agents" />
        <meta property="og:title" content="Support - GoZupees" />
        <meta property="og:description" content="Customer support coming soon - GoZupees AI Voice Agents" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Support - GoZupees" />
        <meta name="twitter:description" content="Customer support coming soon - GoZupees AI Voice Agents" />
      </Head>

      {/* Zoho SalesIQ Widget Scripts */}
      <Script
        id="zoho-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`
        }}
      />
      
      <Script
        id="zoho-widget"
        src="https://salesiq.zoho.in/widget?wc=siq2770f9a535dc95195f77057b2554d24594d4fc55f6836c08543e75b72c1b7b38"
        strategy="lazyOnload"
      />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="w-12 h-12 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 1012 15.75 9.75 9.75 0 10-12-15.75zm0 0V12m0 6.75a9.75 9.75 0 110-19.5 9.75 9.75 0 010 19.5z" 
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Support Coming Soon
              </h1>
              <p className="text-gray-600">
                We're setting up our dedicated support center. Check back soon for comprehensive help and assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

Support.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};