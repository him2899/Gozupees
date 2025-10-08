import { Html, Head, Main, NextScript } from 'next/document';
import Document from 'next/document';

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Font preloading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Prevent Flash of Unstyled Content (FOUC) */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Add some base styling that will apply before React hydration */
          body { opacity: 0; }
          body.content-loaded { opacity: 1; transition: opacity 0.15s ease-in; }
          
          /* Ensure content doesn't jump around during load */
          .container { max-width: 1200px; margin: 0 auto; }
          nav { display: flex; align-items: center; }
        ` }} />
        <script dangerouslySetInnerHTML={{ __html: `
          // Mark the body as loaded once the page is fully rendered
          window.addEventListener('load', function() {
            document.body.classList.add('content-loaded');
          });
        ` }} />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="GoZupees" />
        <meta name="publisher" content="GoZupees" />
        
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-P8VTKFDP');
            `
          }}
        />
        {/* End Google Tag Manager */}
        
        {/* Analytics and other scripts can go here */}
        <meta name="google-site-verification" content="your-verification-code" />
      </Head>
      <body className="bg-background text-foreground antialiased" style={{ backgroundColor: "#0D1117", color: "#f8f9fa", display: "block" }}>
        {/* Initialize consent mode before GTM */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Set default consent state
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
              });
            `,
          }}
        />
        
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P8VTKFDP"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}