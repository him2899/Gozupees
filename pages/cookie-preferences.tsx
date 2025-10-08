import { NextSeo } from 'next-seo';
import { useState } from 'react';

export default function CookiePreferencesPage() {
  const [performanceAnalytics, setPerformanceAnalytics] = useState(true);
  const [marketingAdvertising, setMarketingAdvertising] = useState(false);
  const [functional, setFunctional] = useState(true);
  const [thirdPartyIntegration, setThirdPartyIntegration] = useState(true);

  const handleSavePreferences = () => {
    // Here you would typically save these preferences to localStorage or a cookie
    localStorage.setItem('cookiePreferences', JSON.stringify({
      performanceAnalytics,
      marketingAdvertising,
      functional,
      thirdPartyIntegration,
      timestamp: new Date().toISOString()
    }));
    
    alert('Your cookie preferences have been saved!');
  };

  const handleAcceptAll = () => {
    setPerformanceAnalytics(true);
    setMarketingAdvertising(true);
    setFunctional(true);
    setThirdPartyIntegration(true);
  };

  const handleRejectAll = () => {
    setPerformanceAnalytics(false);
    setMarketingAdvertising(false);
    setFunctional(false);
    setThirdPartyIntegration(false);
  };

  return (
    <>
      <NextSeo
        title="Cookie Preferences | GoZupees"
        description="Manage your cookie preferences and control how we use cookies to enhance your experience on our AI automation platform."
        openGraph={{
          title: "Cookie Preferences | GoZupees",
          description: "Manage your cookie preferences and control how we use cookies to enhance your experience on our AI automation platform.",
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">GoZupees Cookie Preferences</h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies and Why Do We Use Them?</h2>
                <p className="text-gray-700 mb-4">
                  Cookies are small text files stored on your device that help us provide and improve our AI services. We use cookies to enhance your experience, analyze website performance, and deliver personalized content relevant to AI solutions.
                </p>
                <p className="text-gray-700 mb-6">
                  <strong>You have control.</strong> Use the options below to customize your cookie preferences. You can change these settings at any time.
                </p>
              </section>

              <div className="mb-8">
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cookie Categories</h2>
                
                {/* Strictly Necessary Cookies */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium text-gray-900">Strictly Necessary Cookies</h3>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Always Active
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    These cookies are essential for our website to function properly and cannot be disabled. They enable core features like security, network management, and accessibility.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 text-sm">
                    <li>Session management and authentication</li>
                    <li>Security and fraud prevention</li>
                    <li>Load balancing and performance</li>
                    <li>Accessibility features</li>
                  </ul>
                </div>

                {/* Performance & Analytics Cookies */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium text-gray-900">Performance & Analytics Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={performanceAnalytics}
                        onChange={(e) => setPerformanceAnalytics(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Help us understand how visitors interact with our website and AI services to improve performance and user experience.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 text-sm mb-4">
                    <li><strong>Google Analytics</strong> - Website traffic and user behavior analysis</li>
                    <li><strong>Hotjar</strong> - User session recordings and heatmaps</li>
                    <li><strong>Mixpanel</strong> - Product usage analytics for AI service optimization</li>
                    <li><strong>Performance monitoring</strong> - Page load times and technical performance</li>
                  </ul>
                  <p className="text-sm text-gray-600">
                    <strong>Data collected:</strong> Page views, session duration, click patterns, device information
                  </p>
                </div>

                {/* Marketing & Advertising Cookies */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium text-gray-900">Marketing & Advertising Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketingAdvertising}
                        onChange={(e) => setMarketingAdvertising(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Enable personalized advertising and measure the effectiveness of our marketing campaigns for AI solutions.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 text-sm mb-4">
                    <li><strong>Google Ads</strong> - Retargeting and conversion tracking</li>
                    <li><strong>LinkedIn Ads</strong> - B2B marketing and lead generation</li>
                    <li><strong>Facebook Pixel</strong> - Social media advertising optimization</li>
                    <li><strong>Hubspot</strong> - Marketing automation and lead tracking</li>
                  </ul>
                  <p className="text-sm text-gray-600">
                    <strong>Data collected:</strong> Browsing behavior, ad interactions, demographic information
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium text-gray-900">Functional Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={functional}
                        onChange={(e) => setFunctional(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Enhance your experience with personalized features and remember your preferences.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 text-sm mb-4">
                    <li><strong>Chat functionality</strong> - AI-powered customer support features</li>
                    <li><strong>Form completion</strong> - Remember partially completed contact forms</li>
                    <li><strong>Language preferences</strong> - Store your preferred language settings</li>
                    <li><strong>Demo preferences</strong> - Customize AI service demonstrations</li>
                  </ul>
                  <p className="text-sm text-gray-600">
                    <strong>Data collected:</strong> User preferences, chat interactions, form data
                  </p>
                </div>

                {/* Third-Party Integration Cookies */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium text-gray-900">Third-Party Integration Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={thirdPartyIntegration}
                        onChange={(e) => setThirdPartyIntegration(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Enable integration with external services that enhance our AI platform capabilities.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 text-sm mb-4">
                    <li><strong>Calendly</strong> - Meeting scheduling integration</li>
                    <li><strong>Intercom</strong> - Customer communication platform</li>
                    <li><strong>Typeform</strong> - Enhanced form functionality</li>
                    <li><strong>Vimeo/YouTube</strong> - Video content delivery</li>
                  </ul>
                  <p className="text-sm text-gray-600">
                    <strong>Data collected:</strong> Integration usage, communication preferences
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookie Duration</h2>
                <ul className="list-disc pl-6 text-gray-700">
                  <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                  <li><strong>Persistent cookies:</strong> Stored for up to 2 years (varies by purpose)</li>
                  <li><strong>Third-party cookies:</strong> Managed according to third-party policies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Your Preferences</h2>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">Browser Controls</h3>
                <p className="text-gray-700 mb-4">You can also manage cookies through your browser settings:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                      Chrome Cookie Settings
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                      Firefox Cookie Settings
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                      Safari Cookie Settings
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                      Edge Cookie Settings
                    </a>
                  </div>
                </div>

                <h3 className="text-xl font-medium text-gray-800 mb-3">Opt-Out Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                      Google Ads Opt-Out
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                      NAI Opt-Out
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                      DAA Opt-Out
                    </a>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Impact of Disabling Cookies</h2>
                <p className="text-gray-700 mb-4">Disabling certain cookies may affect website functionality:</p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li><strong>Marketing cookies:</strong> You may see less relevant advertisements</li>
                  <li><strong>Analytics cookies:</strong> We cannot improve our services based on usage data</li>
                  <li><strong>Functional cookies:</strong> Personalization features may not work properly</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact & Privacy</h2>
                <p className="text-gray-700 mb-4">For questions about our cookie practices:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@gozupees.com</p>
                  <p className="text-gray-700 mb-2"><strong>Privacy Policy:</strong> <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800">View our full privacy policy</a></p>
                  <p className="text-gray-700"><strong>Data Protection Officer:</strong> dpo@gozupees.com</p>
                </div>
              </section>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-8">
                <p className="text-blue-800 text-sm">
                  <strong>Last updated:</strong> January 8, 2025<br />
                  This page complies with GDPR, CCPA, and other applicable privacy regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}