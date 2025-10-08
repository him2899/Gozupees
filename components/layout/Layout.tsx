import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import CookieConsent, { CookiePreferences } from '../ui/CookieConsent';
import AskMeAnythingWidget from '../ui/AskMeAnythingWidget';
import { getCookieConsent, isConsentExpired, clearExpiredConsent, updateCookieConsent, initializeTrackingWithConsent } from '../../lib/cookie-consent';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  structuredData?: Record<string, any>;
}

export default function Layout({
  children,
  title = 'GoZupees - AI Voice Agents for Sales & Marketing',
  description = 'GoZupees provides intelligent AI voice agents that handle sales calls, customer support, and lead qualification 24/7 for enterprise businesses.',
  canonical = 'https://gozupees.com',
  ogImage = 'https://gozupees.com/og-image.jpg',
  ogType = 'website',
  structuredData,
}: LayoutProps) {
  const fullTitle = title.includes('GoZupees') ? title : `${title} | GoZupees`;
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    // Clear expired consent on page load
    clearExpiredConsent();
    
    // Check if we need to show consent banner
    const consent = getCookieConsent();
    if (!consent || isConsentExpired()) {
      setShowCookieConsent(true);
    } else {
      // Initialize tracking with existing consent
      initializeTrackingWithConsent();
    }
  }, []);

  const handleCookieAccept = (preferences: CookiePreferences) => {
    updateCookieConsent(preferences);
    setShowCookieConsent(false);
    initializeTrackingWithConsent();
  };

  const handleCookieDecline = () => {
    const defaultPreferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    updateCookieConsent(defaultPreferences);
    setShowCookieConsent(false);
    initializeTrackingWithConsent();
  };

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Canonical Link */}
        <link rel="canonical" href={canonical} />
        
        {/* Structured Data */}
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData)
            }}
          />
        )}
      </Head>
      
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <div className="flex-grow w-full">
          {children}
        </div>
        <Footer />
        
        {/* Cookie Consent Banner */}
        {showCookieConsent && (
          <CookieConsent 
            onAccept={handleCookieAccept}
            onDecline={handleCookieDecline}
          />
        )}
        
        {/* Ask Me Anything Widget */}
        <AskMeAnythingWidget />
      </div>
    </>
  );
}