import { CookiePreferences } from '../components/ui/CookieConsent';

export interface ConsentData {
  preferences: CookiePreferences;
  timestamp: string;
  version: string;
}

// Get current cookie consent status
export function getCookieConsent(): ConsentData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const consentData = localStorage.getItem('cookie-consent');
    if (!consentData) return null;
    
    return JSON.parse(consentData);
  } catch (error) {
    console.error('Failed to parse cookie consent data:', error);
    return null;
  }
}

// Check if user has given consent for specific cookie type
export function hasConsentFor(cookieType: keyof CookiePreferences): boolean {
  const consent = getCookieConsent();
  if (!consent) return false;
  
  return consent.preferences[cookieType] === true;
}

// Check if consent is expired (older than 1 year)
export function isConsentExpired(): boolean {
  const consent = getCookieConsent();
  if (!consent) return true;
  
  const consentDate = new Date(consent.timestamp);
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
  return consentDate < oneYearAgo;
}

// Clear expired consent
export function clearExpiredConsent(): void {
  if (isConsentExpired()) {
    localStorage.removeItem('cookie-consent');
  }
}

// Update consent preferences
export function updateCookieConsent(preferences: CookiePreferences): void {
  const consentData: ConsentData = {
    preferences,
    timestamp: new Date().toISOString(),
    version: '1.0'
  };
  
  localStorage.setItem('cookie-consent', JSON.stringify(consentData));
}

// Initialize GTM based on consent
export function initializeTrackingWithConsent(): void {
  const consent = getCookieConsent();
  if (!consent) return;
  
  // Update GTM consent mode
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      'analytics_storage': consent.preferences.analytics ? 'granted' : 'denied',
      'ad_storage': consent.preferences.marketing ? 'granted' : 'denied',
      'functionality_storage': consent.preferences.functional ? 'granted' : 'denied',
      'personalization_storage': consent.preferences.marketing ? 'granted' : 'denied',
    });
  }
}

// Set default consent state (before user choice)
export function setDefaultConsentState(): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'functionality_storage': 'denied',
      'personalization_storage': 'denied',
    });
  }
}