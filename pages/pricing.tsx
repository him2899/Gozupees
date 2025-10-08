import { useState } from 'react';
import { Check, Settings, Mic, Brain, FileText, Phone, ArrowUpRight, MessageCircle, Calendar, X, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';

function Pricing() {
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'GBP' | 'EUR'>('GBP');
  const [selectedMinutes, setSelectedMinutes] = useState(1000);
  const [billingPeriod] = useState<'payg'>('payg');
  const [serviceType, setServiceType] = useState<'voice' | 'chat'>('voice');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showCallVolumeTooltip, setShowCallVolumeTooltip] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    company: '',
    phone: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailSubmit = () => {
    setFormData(prev => ({ ...prev, email: emailInput }));
    setIsOpen(true);
  };

  const faqData = [
    {
      question: "How quickly can I implement AI employees in my business?",
      answer: "Most businesses can have their AI employees up and running within 24-48 hours. Our team handles the initial setup, training, and integration with your existing systems. You'll receive full onboarding support to ensure a smooth transition."
    },
    {
      question: "What happens if the AI employee can't handle a customer inquiry?",
      answer: "Our AI employees are designed with intelligent escalation protocols. When they encounter complex issues beyond their scope, they seamlessly transfer the conversation to your human team members while providing a full context summary of the interaction."
    },
    {
      question: "How do AI employees learn about my specific business and products?",
      answer: "During setup, we train your AI employees using your existing knowledge base, product catalogs, FAQs, and business processes. They continuously learn from interactions while maintaining your brand voice and following your specific guidelines."
    },
    {
      question: "Is my customer data secure with AI employees?",
      answer: "Absolutely. We use enterprise-grade security with end-to-end encryption, SOC 2 compliance, and GDPR adherence. Your customer data is never shared with third parties and is processed according to strict privacy protocols."
    },
    {
      question: "Can AI employees work outside normal business hours?",
      answer: "Yes, AI employees work 24/7 without breaks, holidays, or sick days. This means your customers receive instant support at any time, helping you capture leads and serve customers around the clock while your human team rests."
    },
    {
      question: "What's the difference between AI employees and traditional chatbots?",
      answer: "AI employees use advanced natural language processing to have human-like conversations. Unlike basic chatbots with scripted responses, they understand context, handle complex queries, and can perform multiple tasks like scheduling, qualifying leads, and processing orders."
    },
    {
      question: "Do I need technical expertise to manage AI employees?",
      answer: "No technical expertise required. Our platform includes an intuitive dashboard where you can monitor performance, update knowledge, and adjust settings with simple point-and-click controls. We also provide ongoing support and training."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/trial-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          requestType: 'personalised_demo',
          selectedPlan: `Pay-as-you-go ${serviceType} agents`,
          estimatedUsage: `${selectedMinutes} ${serviceType === 'voice' ? 'minutes' : 'conversations'}/month`,
          currency: selectedCurrency,
          serviceType: serviceType,
          pricing: serviceType === 'voice' ? 'per minute' : 'per conversation'
        })
      });

      if (response.ok) {
        setIsOpen(false);
        router.push('/book-demo');
      } else {
        console.error('Failed to submit trial request');
      }
    } catch (error) {
      console.error('Error submitting trial request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currencies = {
    USD: { symbol: '$', flag: '🇺🇸' },
    GBP: { symbol: '£', flag: '🇬🇧' },
    EUR: { symbol: '€', flag: '🇪🇺' }
  };

  const getPricing = (units: number, currency: 'USD' | 'GBP' | 'EUR', type: 'voice' | 'chat') => {
    // Voice rates per minute, Chat rates per conversation
    const baseRates = {
      voice: {
        GBP: 0.90, // £0.90 per minute
        USD: 1.15, // ~$1.15 per minute (converted from GBP)
        EUR: 1.05  // ~€1.05 per minute (converted from GBP)
      },
      chat: {
        GBP: 0.75, // £0.75 per conversation
        USD: 0.96, // ~$0.96 per conversation (converted from GBP)
        EUR: 0.88  // ~€0.88 per conversation (converted from GBP)
      }
    };
    
    if (units === 10000) return null; // Contact Sales
    return Math.round(units * baseRates[type][currency] * 100) / 100; // Round to 2 decimal places
  };

  const features = [
    { title: "Platform", subtitle: "No-code builder, custom workflows & actions", icon: Settings },
    { title: "Voice API", subtitle: "Tested voices in 10+ languages", icon: Mic },
    { title: "LLM", subtitle: "OpenAI GPT 4o-based, finetuned for conversations", icon: Brain },
    { title: "Transcription API", subtitle: "Deepgram-based speech-to-text transcription", icon: FileText },
    { title: "Telephony", subtitle: "Included for numbers bought via platform", icon: Phone }
  ];

  const minuteOptions = [100, 500, 1000, 2000, 5000, 10000];

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Simple, Transparent Pricing for 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                AI Employees
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Pay only for actual usage with our transparent pricing. No hidden fees, no setup costs, no monthly minimums.
            </p>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h2>
              <p className="text-lg text-gray-600">Two week free trial. No credit card required.</p>
            </div>

            {/* Service Type Toggle */}
            <div className="flex justify-center items-center mb-8">
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setServiceType('voice')}
                  className={`px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2 ${
                    serviceType === 'voice' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <Mic className="h-4 w-4" />
                  Voice Agents
                </button>
                <button
                  onClick={() => setServiceType('chat')}
                  className={`px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2 ${
                    serviceType === 'chat' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat Agents
                </button>
              </div>
            </div>



            {/* Main Pricing Layout */}
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                
                {/* Left Side - Feature Selector (3 columns) */}
                <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{serviceType === 'voice' ? 'Minutes per month' : 'Conversations per month'}</h3>
                      <div className="relative">
                        <button
                          onClick={() => setShowCallVolumeTooltip(!showCallVolumeTooltip)}
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <HelpCircle className="h-4 w-4" />
                        </button>
                        
                        {showCallVolumeTooltip && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
                            <div className="text-sm text-gray-700">
                              {serviceType === 'voice' ? (
                                <>
                                  <h4 className="font-semibold mb-2">How to calculate your monthly minutes:</h4>
                                  <ul className="space-y-1 list-disc list-inside">
                                    <li>Average call duration: 3-5 minutes</li>
                                    <li>If you get 20 calls/day averaging 4 minutes = 80 minutes/day</li>
                                    <li>That's approximately 2,400 minutes per month</li>
                                    <li>Consider peak periods and growth projections</li>
                                  </ul>
                                  <p className="mt-2 text-xs text-gray-500">
                                    Example: 15 calls per day × 4 minutes = 60 minutes/day × 30 days = 1,800 minutes/month.
                                  </p>
                                </>
                              ) : (
                                <>
                                  <h4 className="font-semibold mb-2">How to calculate your monthly conversations:</h4>
                                  <ul className="space-y-1 list-disc list-inside">
                                    <li>Average conversation length: 5-15 messages</li>
                                    <li>If you get 50 chats/day = 1,500 conversations/month</li>
                                    <li>Consider chat volume during business hours</li>
                                    <li>Include follow-up conversations and support tickets</li>
                                  </ul>
                                  <p className="mt-2 text-xs text-gray-500">
                                    Example: 30 chats per day × 30 days = 900 conversations/month.
                                  </p>
                                </>
                              )}
                            </div>
                            <button
                              onClick={() => setShowCallVolumeTooltip(false)}
                              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Units Display */}
                    <div className="mb-6">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block font-semibold">
                        {selectedMinutes === 10000 ? '10,000+' : selectedMinutes.toLocaleString()} {serviceType === 'voice' ? 'minutes' : 'conversations'}
                      </div>
                    </div>
                    
                    {/* Slider */}
                    <div className="relative mb-8">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                          style={{ width: `${(minuteOptions.indexOf(selectedMinutes) / (minuteOptions.length - 1)) * 100}%` }}
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={minuteOptions.length - 1}
                        value={minuteOptions.indexOf(selectedMinutes)}
                        onChange={(e) => setSelectedMinutes(minuteOptions[parseInt(e.target.value)])}
                        className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                      />
                      <div 
                        className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full pointer-events-none transition-all duration-300"
                        style={{ left: `calc(${(minuteOptions.indexOf(selectedMinutes) / (minuteOptions.length - 1)) * 100}% - 8px)` }}
                      />
                    </div>
                  </div>



                  {/* Features List */}
                  <div>
                    <h4 className="text-blue-600 font-semibold mb-6">What's included</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">24/7 {serviceType} agent availability</span>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Call summary with action points</span>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Pre-trained voice personas</span>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Natural-sounding AI voice</span>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Regional Dialects</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Calendars Integration</span>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">CRM Sync & Lead Capture</span>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">WhatsApp, SMS, and email follow-up</span>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Multi-language support</span>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Dynamic product/service suggestions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Pricing Display (2 columns) */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center relative">
                  {/* Pay-as-you-go Tag - Top Left */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Pay-as-you-go
                    </span>
                  </div>

                  {/* Currency Selector - Top Right */}
                  <div className="absolute top-4 right-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedCurrency('GBP')}
                        className={`flex items-center gap-1 px-2 py-1 rounded text-sm transition-colors ${
                          selectedCurrency === 'GBP' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        🇬🇧 GBP
                      </button>
                      <button
                        onClick={() => setSelectedCurrency('USD')}
                        className={`flex items-center gap-1 px-2 py-1 rounded text-sm transition-colors ${
                          selectedCurrency === 'USD' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        🇺🇸 USD
                      </button>
                      <button
                        onClick={() => setSelectedCurrency('EUR')}
                        className={`flex items-center gap-1 px-2 py-1 rounded text-sm transition-colors ${
                          selectedCurrency === 'EUR' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        🇪🇺 EUR
                      </button>
                    </div>
                  </div>

                  <div className="mb-8 mt-12">
                    <p className="text-gray-500 mb-2">Estimated Monthly Cost</p>
                    <div className="text-center">
                      {selectedMinutes === 10000 ? (
                        <div className="text-4xl font-bold text-gray-900 mb-2">
                          Contact Sales
                        </div>
                      ) : (
                        <div className="text-4xl font-bold text-gray-900 mb-2">
                          {currencies[selectedCurrency].symbol}{getPricing(selectedMinutes, selectedCurrency, serviceType)}
                          <span className="text-lg text-gray-500 font-normal">/month</span>
                        </div>
                      )}
                      <p className="text-sm text-gray-500">
                        {currencies[selectedCurrency].symbol}{serviceType === 'voice' 
                          ? (selectedCurrency === 'GBP' ? '0.90' : selectedCurrency === 'USD' ? '1.15' : '1.05')
                          : (selectedCurrency === 'GBP' ? '0.75' : selectedCurrency === 'USD' ? '0.96' : '0.88')
                        } per {serviceType === 'voice' ? 'minute' : 'conversation'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsOpen(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-4 py-3 rounded-md shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mb-6"
                  >
                    Get a personalised demo
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

              </div>
            </div>

            {/* Technology Partners - Moved outside and below */}
            <div className="max-w-6xl mx-auto mt-12">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-6">Built with industry-leading AI platforms</p>
                <div className="flex flex-wrap justify-center items-center gap-8">
                  <img src="https://logo.clearbit.com/openai.com" alt="OpenAI" className="h-10" />
                  <img src="https://logo.clearbit.com/anthropic.com" alt="Anthropic" className="h-10" />
                  <img src="https://logo.clearbit.com/google.com" alt="Google" className="h-10" />
                  <img src="https://logo.clearbit.com/elevenlabs.io" alt="ElevenLabs" className="h-10" />
                  <img src="https://logo.clearbit.com/vapi.ai" alt="VAPI" className="h-10" />
                  <img src="https://logo.clearbit.com/twilio.com" alt="Twilio" className="h-10" />
                  <img src="https://logo.clearbit.com/deepgram.com" alt="Deepgram" className="h-10" />
                  <img src="https://logo.clearbit.com/aws.amazon.com" alt="AWS" className="h-10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Leaders Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-4">TESTIMONIALS</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Industry Leaders Say About AI Agents
              </h2>
            </div>
            
            <div className="max-w-7xl mx-auto">
              {/* Three-column layout: 2-3-2 distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Column 1: 2 cards */}
                <div className="space-y-6">
                  {/* Mark Zuckerberg */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      "Every business in the future, just like they have an email address, a website, and a social media presence today, is going to have an AI agent that their customers can talk to."
                    </p>
                    <div className="flex items-center">
                      <img src="https://logo.clearbit.com/meta.com" alt="Meta" className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Mark Zuckerberg</p>
                        <p className="text-gray-500 text-xs">CEO, Meta</p>
                      </div>
                    </div>
                  </div>

                  {/* Sundar Pichai */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      "I believe it's a huge deal for the interface product, the idea that you can talk to the internet and just ask it anything. I think we are still wrapping our heads around how powerful that is."
                    </p>
                    <div className="flex items-center">
                      <img src="https://logo.clearbit.com/google.com" alt="Google" className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Sundar Pichai</p>
                        <p className="text-gray-500 text-xs">CEO, Google</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: 3 cards (2 in first row, 1 in second row) */}
                <div className="space-y-6">
                  {/* First row: 2 cards side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                    {/* Bill Gates */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <p className="text-gray-700 mb-3 text-xs leading-relaxed">
                        "Agents are smarter. They're proactive – capable of making suggestions before you ask for them."
                      </p>
                      <div className="flex items-center">
                        <img src="https://logo.clearbit.com/microsoft.com" alt="Microsoft" className="w-8 h-8 rounded-full mr-2" />
                        <div>
                          <p className="font-semibold text-gray-900 text-xs">Bill Gates</p>
                          <p className="text-gray-500 text-xs">Co-founder, Microsoft</p>
                        </div>
                      </div>
                    </div>

                    {/* Satya Nadella */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <p className="text-gray-700 mb-3 text-xs leading-relaxed">
                        "AI is going to reshape every software category and every business, including our own."
                      </p>
                      <div className="flex items-center">
                        <img src="https://logo.clearbit.com/microsoft.com" alt="Microsoft" className="w-8 h-8 rounded-full mr-2" />
                        <div>
                          <p className="font-semibold text-gray-900 text-xs">Satya Nadella</p>
                          <p className="text-gray-500 text-xs">CEO, Microsoft</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second row: 1 card */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      "We plan to integrate a large number of AI agents to work alongside our human workforce, enhancing productivity and operational efficiency."
                    </p>
                    <div className="flex items-center">
                      <img src="https://logo.clearbit.com/tcs.com" alt="TCS" className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">N. Chandrasekaran</p>
                        <p className="text-gray-500 text-xs">Chairman, Tata Consultancy Services</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: 2 cards */}
                <div className="space-y-6">
                  {/* Jensen Huang */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      "AI agents will be the future of computing. Every company, every industry will have AI agents working alongside humans to augment human capabilities."
                    </p>
                    <div className="flex items-center">
                      <img src="https://logo.clearbit.com/nvidia.com" alt="NVIDIA" className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Jensen Huang</p>
                        <p className="text-gray-500 text-xs">CEO, NVIDIA</p>
                      </div>
                    </div>
                  </div>

                  {/* David Hsu */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      "AI agents are built to be hyperspecific for higher accuracy and managed through a centralized interface that allows full oversight of their behavior."
                    </p>
                    <div className="flex items-center">
                      <img src="https://logo.clearbit.com/retool.com" alt="Retool" className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">David Hsu</p>
                        <p className="text-gray-500 text-xs">CEO, Retool</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>



        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                Questions & Answers
              </h2>
              
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <span className="text-gray-400 text-xl ml-4">
                        {openFaq === index ? '−' : '+'}
                      </span>
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-gray-500 mb-4">Still can't find the answer?</p>
                <button
                  onClick={() => router.push('/contact')}
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  Contact our team
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Modal */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
              className="fixed inset-0 bg-black/80" 
              onClick={() => setIsOpen(false)}
            ></div>
            <div className="relative bg-gray-800 border border-gray-700 text-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="mb-6 text-left">
                <h2 className="text-xl font-semibold text-white mb-2 text-left">Start Your Free Trial</h2>
                <p className="text-gray-300 text-sm text-left">
                  Book a personalized demo and get started with GoZupees AI employees today.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="text-white text-sm font-medium block mb-1">
                    Full Name
                  </label>
                  <Input
                    id="firstName"
                    placeholder="Jane Smith"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="text-white text-sm font-medium block mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane.smith@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="text-white text-sm font-medium block mb-1">
                    Company
                  </label>
                  <Input
                    id="company"
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="text-white text-sm font-medium block mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 rounded-md shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Booking Demo...' : 'Book Free Demo'}
                  <Calendar className="h-4 w-4" />
                </Button>
                
                <p className="text-sm text-gray-400 text-center">
                  No credit card required • Setup takes less than 15 minutes
                </p>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

// Define custom layout to prevent double Layout wrapping
Pricing.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout
      title="AI Voice Agent Pricing Plans | GoZupees - Transparent & Scalable Rates"
      description="Transparent AI voice agent pricing starting from $79/month. No hidden fees, no setup costs. Scale your sales and customer service with cost-effective voice automation solutions."
      canonical="https://gozupees.com/pricing"
      ogImage="https://gozupees.com/pricing-og-image.jpg"
      ogType="website"
    >
      {page}
    </Layout>
  );
};

export default Pricing;