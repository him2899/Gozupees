import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieConsentProps {
  onAccept: (preferences: CookiePreferences) => void;
  onDecline: () => void;
}

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
  functional: false,
};

export default function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    // Check if user has already made a choice
    const consentData = localStorage.getItem('cookie-consent');
    if (!consentData) {
      // Delay showing the banner slightly for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    handleConsent(allAccepted);
  };

  const handleAcceptSelected = () => {
    handleConsent(preferences);
  };

  const handleDeclineAll = () => {
    handleConsent(defaultPreferences);
  };

  const handleConsent = (finalPreferences: CookiePreferences) => {
    // Store consent with timestamp
    const consentData = {
      preferences: finalPreferences,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
    onAccept(finalPreferences);
  };

  const handlePreferenceChange = (type: keyof CookiePreferences, value: boolean) => {
    if (type === 'necessary') return; // Can't disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
      >
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <Cookie className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    We Value Your Privacy
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We use cookies to enhance your experience, analyze site performance, and deliver personalized content. 
                    By continuing to use our site, you agree to our use of cookies as described in our{' '}
                    <a href="/privacy-policy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a> and{' '}
                    <a href="/cookie-policy" className="text-blue-600 hover:underline">
                      Cookie Policy
                    </a>.
                  </p>
                </div>
              </div>

              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 p-4 bg-gray-50 rounded-lg"
                >
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Cookie Preferences
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium text-gray-800">Necessary Cookies</label>
                        <p className="text-xs text-gray-600">Required for basic site functionality</p>
                      </div>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        Always Active
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium text-gray-800">Analytics Cookies</label>
                        <p className="text-xs text-gray-600">Help us understand how visitors use our site</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-10 h-5 rounded-full transition-colors ${
                          preferences.analytics ? 'bg-blue-600' : 'bg-gray-300'
                        }`}>
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${
                            preferences.analytics ? 'translate-x-5' : 'translate-x-0.5'
                          } mt-0.5`} />
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium text-gray-800">Marketing Cookies</label>
                        <p className="text-xs text-gray-600">Used to show relevant ads and measure campaign effectiveness</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-10 h-5 rounded-full transition-colors ${
                          preferences.marketing ? 'bg-blue-600' : 'bg-gray-300'
                        }`}>
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${
                            preferences.marketing ? 'translate-x-5' : 'translate-x-0.5'
                          } mt-0.5`} />
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium text-gray-800">Functional Cookies</label>
                        <p className="text-xs text-gray-600">Enable enhanced functionality and personalization</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.functional}
                          onChange={(e) => handlePreferenceChange('functional', e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-10 h-5 rounded-full transition-colors ${
                          preferences.functional ? 'bg-blue-600' : 'bg-gray-300'
                        }`}>
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${
                            preferences.functional ? 'translate-x-5' : 'translate-x-0.5'
                          } mt-0.5`} />
                        </div>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                {showDetails ? 'Hide' : 'Customize'}
              </button>
              
              <button
                onClick={handleDeclineAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Decline All
              </button>

              {showDetails ? (
                <button
                  onClick={handleAcceptSelected}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Save Preferences
                </button>
              ) : (
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Accept All
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook to get current consent status
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookiePreferences | null>(null);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consentData = localStorage.getItem('cookie-consent');
    if (consentData) {
      try {
        const parsed = JSON.parse(consentData);
        setConsent(parsed.preferences);
        setHasConsent(true);
      } catch (error) {
        console.error('Failed to parse cookie consent data:', error);
        setHasConsent(false);
      }
    } else {
      setHasConsent(false);
    }
  }, []);

  return { consent, hasConsent };
}