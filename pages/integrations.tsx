import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import Layout from '../components/layout/Layout';

// Helper function to get brand logo from Clearbit
const getBrandLogo = (brandName: string): string => {
  const domain = getBrandDomain(brandName);
  return `https://logo.clearbit.com/${domain}`;
};

const getBrandDomain = (brandName: string): string => {
  const domainMap: { [key: string]: string } = {
    'Slack': 'slack.com',
    'Microsoft Teams': 'microsoft.com',
    'Discord': 'discord.com',
    'Telegram': 'telegram.org',
    'WhatsApp Business': 'whatsapp.com',
    'Salesforce': 'salesforce.com',
    'HubSpot': 'hubspot.com',
    'Pipedrive': 'pipedrive.com',
    'Zoho CRM': 'zoho.com',
    'Monday.com': 'monday.com',
    'Mailchimp': 'mailchimp.com',
    'Klaviyo': 'klaviyo.com',
    'ActiveCampaign': 'activecampaign.com',
    'ConvertKit': 'convertkit.com',
    'Buffer': 'buffer.com',
    'Google Workspace': 'google.com',
    'Microsoft 365': 'microsoft.com',
    'Notion': 'notion.so',
    'Trello': 'trello.com',
    'Asana': 'asana.com',
    'Google Analytics': 'google.com',
    'Mixpanel': 'mixpanel.com',
    'Amplitude': 'amplitude.com',
    'Hotjar': 'hotjar.com',
    'Zendesk': 'zendesk.com',
    'Intercom': 'intercom.com',
    'Freshdesk': 'freshdesk.com',
    'Help Scout': 'helpscout.com',
    'Shopify': 'shopify.com',
    'WooCommerce': 'woocommerce.com',
    'Magento': 'magento.com',
    'BigCommerce': 'bigcommerce.com',
    'Stripe': 'stripe.com',
    'PayPal': 'paypal.com',
    'QuickBooks': 'quickbooks.intuit.com',
    'Xero': 'xero.com',
    'BambooHR': 'bamboohr.com',
    'Workday': 'workday.com',
    'LinkedIn': 'linkedin.com',
    'Facebook': 'facebook.com',
    'Twitter': 'twitter.com',
    'Instagram': 'instagram.com',
    'YouTube': 'youtube.com'
  };
  return domainMap[brandName] || brandName.toLowerCase().replace(/\s+/g, '') + '.com';
};

// Integration categories and data
const integrationCategories = [
  { id: 'all', name: 'All Integrations' },
  { id: 'calendar', name: 'Calendar' },
  { id: 'ccaas', name: 'CCaaS' },
  { id: 'crm', name: 'CRM' },
  { id: 'vertical-crm', name: 'Vertical CRM' },
  { id: 'sales', name: 'Sales' },
  { id: 'telephony', name: 'Telephony' },
  { id: 'connectors', name: 'Connectors' },
  { id: 'developer', name: 'Developer Tools' },
  { id: 'support', name: 'Customer Support' },
  { id: 'ai', name: 'AI' },
  { id: 'commerce', name: 'Commerce & Payments' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'communication', name: 'Communication' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'analytics', name: 'Analytics' }
];

const integrations = [
  // Calendar
  { id: 1, name: 'Microsoft Calendar', description: 'Calendar software by Microsoft', category: 'calendar', popular: true },
  { id: 2, name: 'Google Calendar', description: 'Get organized and stay on schedule', category: 'calendar' },
  { id: 3, name: 'Cal.com', description: 'Book appointments directly bringing your Cal.com calendar', category: 'calendar', popular: true },
  { id: 4, name: 'Calendly', description: 'Automated scheduling and calendar management', category: 'calendar' },
  { id: 5, name: 'Outlook Calendar', description: 'Microsoft Outlook calendar integration', category: 'calendar' },
  
  // CCaaS
  { id: 6, name: 'Five9', description: 'Cloud contact center solution with digital engagement', category: 'ccaas', popular: true },
  { id: 7, name: 'Avaya', description: 'CCaaS with enhanced employee and customer experiences', category: 'ccaas' },
  { id: 8, name: 'Cisco', description: 'Used across 36,000+ different enterprises', category: 'ccaas' },
  { id: 9, name: 'Cloudtalk', description: 'Remote-ready call center software for sales & support', category: 'ccaas' },
  { id: 10, name: 'JustCall', description: 'AI-powered customer communication platform', category: 'ccaas' },
  { id: 11, name: 'Dialpad', description: 'AI-powered customer intelligence platform', category: 'ccaas' },
  { id: 12, name: 'NICE', description: 'End-to-end customer service platform', category: 'ccaas' },
  { id: 13, name: 'OpenPhone', description: 'Collaborative phone system for teams', category: 'ccaas' },
  { id: 14, name: 'Genesys', description: 'Cloud call center software and CX platform', category: 'ccaas' },
  { id: 15, name: '3CX', description: 'Open standards communications solution', category: 'ccaas' },
  { id: 16, name: 'RingCentral', description: 'Omnichannel contact center solution', category: 'ccaas' },
  
  // CRM
  { id: 17, name: 'Salesforce', description: 'CRM software solutions and enterprise cloud computing', category: 'crm', popular: true },
  { id: 18, name: 'HubSpot', description: 'Import and manage your contacts directly by integrating Hubspot', category: 'crm', popular: true },
  { id: 19, name: 'Pipedrive', description: 'Sales CRM and pipeline management software', category: 'crm' },
  { id: 20, name: 'Zoho CRM', description: 'Customer relationship management software', category: 'crm' },
  { id: 21, name: 'Monday.com', description: 'Work operating system for businesses', category: 'crm' },
  { id: 22, name: 'ActiveCampaign', description: 'Email marketing, marketing automation, and CRM tools', category: 'crm' },
  { id: 23, name: 'GoHighLevel', description: 'Import your subaccounts from GHL', category: 'crm' },
  
  // Vertical CRM
  { id: 24, name: 'AthenaOne', description: 'Healthcare CRM for clinical and operational efficiency', category: 'vertical-crm' },
  { id: 25, name: 'Bitrix24', description: 'Online workspace with various tools for business', category: 'vertical-crm' },
  { id: 26, name: 'ServiceTitan', description: 'Software platform for managing a service business', category: 'vertical-crm' },
  { id: 27, name: 'Bravity', description: 'CRM and transaction for real estate and brokerages', category: 'vertical-crm' },
  { id: 28, name: 'Practice Better', description: 'Practice management software for health and wellness', category: 'vertical-crm' },
  { id: 29, name: 'Velocify', description: 'CRM for mortgage brokers and insurance organizations', category: 'vertical-crm' },
  { id: 30, name: 'Dentrix', description: 'CRM for clinical and dental practices', category: 'vertical-crm' },
  { id: 31, name: 'Housecall Pro', description: 'Field service management and CRM for service professionals', category: 'vertical-crm' },
  { id: 32, name: 'Follow Up Boss', description: 'Sales software for real estate teams', category: 'vertical-crm' },
  { id: 33, name: 'Jobber', description: 'Scheduling and invoicing software for field services', category: 'vertical-crm' },
  
  // Sales
  { id: 34, name: 'Outreach', description: 'Sales execution platform for market-facing teams', category: 'sales', popular: true },
  { id: 35, name: 'Gong', description: 'Revenue intelligence platform for sales teams', category: 'sales' },
  { id: 36, name: 'Apollo.io', description: 'All-in-one sales intelligence platform', category: 'sales' },
  { id: 37, name: 'Clay', description: 'Data enrichment and automation platform', category: 'sales' },
  { id: 38, name: 'SalesLoft', description: 'Sales engagement platform', category: 'sales' },
  { id: 39, name: 'ZoomInfo', description: 'Go-to-market intelligence platform', category: 'sales' },
  
  // Telephony
  { id: 40, name: 'Twilio', description: 'Connect your Twilio account and use directly your phone numbers', category: 'telephony', popular: true },
  { id: 41, name: 'Ooma', description: 'Business VoIP solution for any size business', category: 'telephony' },
  { id: 42, name: '8x8', description: 'Secure solution for customer success', category: 'telephony' },
  { id: 43, name: 'Plivo', description: 'Cloud communication platform for customer engagement', category: 'telephony' },
  { id: 44, name: 'GoTo', description: 'Phone system and customer engagement software', category: 'telephony' },
  { id: 45, name: 'Asterisk', description: 'Open source communications development framework', category: 'telephony' },
  { id: 46, name: 'Telnyx', description: 'Communications and connectivity platform', category: 'telephony' },
  { id: 47, name: 'Vonage', description: 'Customized agent, employee, and customer workflows', category: 'telephony' },
  
  // Connectors
  { id: 48, name: 'Zapier', description: 'Automate tasks and workflows across multiple apps', category: 'connectors', popular: true },
  { id: 49, name: 'Make.com', description: 'Powerful visual platform for building and automating workflows', category: 'connectors' },
  { id: 50, name: 'ActivePieces', description: 'Get organized and stay on schedule', category: 'connectors' },
  { id: 51, name: 'Integromat', description: 'Advanced online automation platform', category: 'connectors' },
  { id: 52, name: 'Microsoft Power Automate', description: 'Workflow automation across Microsoft services', category: 'connectors' },
  
  // Developer Tools
  { id: 53, name: 'Azure', description: 'All-in-one AI automation designed to be extensible', category: 'developer', popular: true },
  { id: 54, name: 'n8n', description: 'The world\'s most popular workflow automation platform for technical teams', category: 'developer' },
  { id: 55, name: 'Bubble', description: 'The world\'s only full-stack, no-code platform', category: 'developer' },
  { id: 56, name: 'GitHub', description: 'Version control and collaboration platform', category: 'developer' },
  { id: 57, name: 'GitLab', description: 'DevOps platform for software development', category: 'developer' },
  { id: 58, name: 'AWS', description: 'Amazon Web Services cloud platform', category: 'developer' },
  { id: 59, name: 'Google Cloud', description: 'Google\'s cloud computing platform', category: 'developer' },
  
  // Customer Support
  { id: 60, name: 'Zendesk', description: 'Customer service software and support ticket system', category: 'support', popular: true },
  { id: 61, name: 'Intercom', description: 'Customer messaging platform for sales, marketing, and support', category: 'support' },
  { id: 62, name: 'Freshdesk', description: 'Cloud-based helpdesk solution', category: 'support' },
  { id: 63, name: 'Help Scout', description: 'Customer support software', category: 'support' },
  { id: 64, name: 'Crisp', description: 'Customer messaging platform', category: 'support' },
  { id: 65, name: 'LiveChat', description: 'Live chat software for customer support', category: 'support' },
  
  // AI
  { id: 66, name: 'OpenAI', description: 'Connect your own OpenAI key to power your assistants', category: 'ai', popular: true },
  { id: 67, name: 'Anthropic', description: 'Claude AI for business use cases', category: 'ai' },
  { id: 68, name: 'ElevenLabs', description: 'Research lab exploring new frontiers of Voice AI', category: 'ai' },
  { id: 69, name: 'Cohere', description: 'Natural language processing platform', category: 'ai' },
  { id: 70, name: 'Hugging Face', description: 'Machine learning model platform', category: 'ai' },
  
  // Commerce & Payments
  { id: 71, name: 'Shopify', description: 'Ecommerce platform for online stores', category: 'commerce', popular: true },
  { id: 72, name: 'Stripe', description: 'Connect your Stripe account to create new pricing plans', category: 'commerce', popular: true },
  { id: 73, name: 'PayPal', description: 'Digital payment platform', category: 'commerce' },
  { id: 74, name: 'Square', description: 'Payment processing and point of sale', category: 'commerce' },
  { id: 75, name: 'WooCommerce', description: 'WordPress ecommerce plugin', category: 'commerce' },
  { id: 76, name: 'Magento', description: 'Enterprise ecommerce platform', category: 'commerce' },
  
  // Productivity
  { id: 77, name: 'Airtable', description: 'Low-code platform to build apps', category: 'productivity', popular: true },
  { id: 78, name: 'Google Workspace', description: 'Cloud productivity suite', category: 'productivity', popular: true },
  { id: 79, name: 'Microsoft 365', description: 'Office productivity suite', category: 'productivity' },
  { id: 80, name: 'Notion', description: 'All-in-one workspace', category: 'productivity' },
  { id: 81, name: 'Trello', description: 'Visual project management', category: 'productivity' },
  { id: 82, name: 'Asana', description: 'Team project management', category: 'productivity' },
  { id: 83, name: 'ClickUp', description: 'All-in-one productivity platform', category: 'productivity' },
  { id: 84, name: 'Todoist', description: 'Task management application', category: 'productivity' },
  
  // Communication
  { id: 85, name: 'Slack', description: 'Team collaboration and messaging', category: 'communication', popular: true },
  { id: 86, name: 'Microsoft Teams', description: 'Video meetings and chat', category: 'communication', popular: true },
  { id: 87, name: 'Discord', description: 'Voice and text chat for communities', category: 'communication' },
  { id: 88, name: 'Telegram', description: 'Secure messaging platform', category: 'communication' },
  { id: 89, name: 'WhatsApp Business', description: 'Business messaging solution', category: 'communication' },
  { id: 90, name: 'Zoom', description: 'Video conferencing platform', category: 'communication' },
  
  // Marketing
  { id: 91, name: 'Mailchimp', description: 'Email marketing automation', category: 'marketing', popular: true },
  { id: 92, name: 'Klaviyo', description: 'Email and SMS marketing', category: 'marketing' },
  { id: 93, name: 'ConvertKit', description: 'Email marketing for creators', category: 'marketing' },
  { id: 94, name: 'Buffer', description: 'Social media management', category: 'marketing' },
  { id: 95, name: 'Hootsuite', description: 'Social media management platform', category: 'marketing' },
  { id: 96, name: 'Constant Contact', description: 'Email marketing and automation', category: 'marketing' },
  
  // Analytics
  { id: 97, name: 'Google Analytics', description: 'Web analytics platform', category: 'analytics', popular: true },
  { id: 98, name: 'Mixpanel', description: 'Product analytics', category: 'analytics' },
  { id: 99, name: 'Amplitude', description: 'Digital analytics platform', category: 'analytics' },
  { id: 100, name: 'Hotjar', description: 'Website heatmaps and recordings', category: 'analytics' },
  { id: 101, name: 'Adobe Analytics', description: 'Enterprise analytics platform', category: 'analytics' },
  { id: 102, name: 'Segment', description: 'Customer data platform', category: 'analytics' }
];

function IntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const filtersRef = useRef<HTMLDivElement>(null);

  // Scroll to filters section when category changes
  useEffect(() => {
    if (filtersRef.current) {
      filtersRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedCategory]);



  const filteredIntegrations = useMemo(() => {
    return integrations.filter(integration => {
      const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
      const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           integration.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const popularIntegrations = integrations.filter(integration => integration.popular);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Connect 200+ Apps &
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Automate Workflows
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                Seamlessly integrate with your favorite tools and supercharge your productivity with AI-powered automation.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur border-white/20 text-white placeholder-gray-300 rounded-xl focus:bg-white/20"
                />
              </div>

              {/* Featured Apps */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-8 max-w-3xl mx-auto">
                {popularIntegrations.slice(0, 8).filter(integration => 
                  integration.name !== 'Google Calendar' && 
                  integration.name !== 'Cal.com'
                ).map((integration) => (
                  <div key={integration.id} className="text-center hover:scale-110 transition-transform duration-200">
                    <div className="w-16 h-16 flex items-center justify-center mx-auto mb-3 p-2">
                      <img 
                        src={getBrandLogo(integration.name)} 
                        alt={`${integration.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="w-full h-full bg-white/20 rounded flex items-center justify-center text-xs font-bold text-white">${integration.name.charAt(0)}</div>`;
                          }
                        }}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-300">{integration.name}</p>
                  </div>
                )).slice(0, 6)}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                
                <div className="space-y-2">
                  {integrationCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:w-3/4">
              {/* Tabs and View Controls */}
              <div ref={filtersRef} className="flex items-center justify-between mb-8">
                <Tabs value={selectedCategory === 'all' ? 'all' : 'filtered'} className="w-auto">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="all">All Integrations</TabsTrigger>
                    <TabsTrigger value="filtered">Popular</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-gray-600">
                  Showing {filteredIntegrations.length} integrations
                  {selectedCategory !== 'all' && (
                    <span> in {integrationCategories.find(cat => cat.id === selectedCategory)?.name}</span>
                  )}
                  {searchQuery && (
                    <span> for "{searchQuery}"</span>
                  )}
                </p>

              </div>

              {/* Integrations Grid */}
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredIntegrations.map((integration) => (
                  <Card key={integration.id} className="hover:shadow-lg transition-all duration-200 border border-gray-200 shadow-sm bg-white cursor-pointer hover:border-gray-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 flex items-center justify-center p-1">
                            <img 
                              src={getBrandLogo(integration.name)} 
                              alt={`${integration.name} logo`}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<div class="w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">${integration.name.charAt(0)}</div>`;
                                }
                              }}
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold text-gray-900">
                              {integration.name}
                              {integration.popular && (
                                <span className="ml-2 inline-block px-2 py-1 text-xs font-bold uppercase tracking-wide bg-blue-100 text-blue-800 rounded-sm">
                                  Popular
                                </span>
                              )}
                            </CardTitle>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-gray-600 mb-4">
                        {integration.description}
                      </CardDescription>
                      <div className="flex items-center">
                        <span className="inline-block px-2 py-1 text-xs font-bold uppercase tracking-wide bg-gray-100 text-gray-700 rounded-sm">
                          {integrationCategories.find(cat => cat.id === integration.category)?.name}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* No Results */}
              {filteredIntegrations.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No integrations found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>


      </div>
  );
}

// Define custom layout to prevent double Layout wrapping
IntegrationsPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout
      title="Integrations - GoZupees | Connect with Your Favorite Apps"
      description="Browse our comprehensive integration library. Connect GoZupees AI employees with your CRM, help desk, marketing tools, and 200+ popular business applications."
      canonical="https://gozupees.com/integrations"
      ogImage="https://gozupees.com/integrations-og-image.jpg"
      ogType="website"
    >
      {page}
    </Layout>
  );
};

export default IntegrationsPage;