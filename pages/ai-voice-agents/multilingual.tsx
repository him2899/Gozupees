import { useState, useEffect } from 'react';
import { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import { motion } from 'framer-motion';
import Vapi from '@vapi-ai/web';
import { 
  Phone, 
  PhoneCall, 
  Mic, 
  Globe, 
  Brain, 
  Users, 
  Zap, 
  RefreshCw,
  Calendar,
  CheckCircle,
  ArrowRight,
  Play,
  Volume2,
  Stethoscope,
  ShoppingBag,
  Plane,
  CreditCard,
  Building,
  UserCheck
} from 'lucide-react';

// Image paths
const chloeEnglishImage = '/chloe-english.png';
const chloeSpanishImage = '/chloe-spanish.png';
const chloeDutchImage = '/chloe-dutch.png';
const chloeGermanImage = '/chloe-german.png';

export default function MultilingualDemo() {
  const [activeLanguage, setActiveLanguage] = useState(0);
  const [playingDemo, setPlayingDemo] = useState<number | null>(null);
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [activeCall, setActiveCall] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [assistantIds, setAssistantIds] = useState<{[key: string]: string}>({});

  // Load assistant IDs on component mount
  useEffect(() => {
    const loadAssistantIds = async () => {
      try {
        const response = await fetch('/api/multilingual-config');
        const data = await response.json();
        if (data.assistantIds) {
          setAssistantIds(data.assistantIds);
        }
      } catch (error) {
        console.error('Failed to load assistant IDs:', error);
      }
    };
    loadAssistantIds();
  }, []);

  const languages = [
    {
      name: 'English',
      flag: '🇬🇧',
      code: 'en',
      greeting: 'Hi, this is Chloe from Smile Clinic. How can I help you today?',
      buttonText: 'Talk',
      image: chloeEnglishImage,
      accent: 'British Professional'
    },
    {
      name: 'Spanish',
      flag: '🇪🇸',
      code: 'es',
      greeting: 'Hola, soy Chloe de Smile Clinic. ¿En qué puedo ayudarle hoy?',
      buttonText: 'Hablar',
      image: chloeSpanishImage,
      accent: 'Native Spanish'
    },
    {
      name: 'German',
      flag: '🇩🇪',
      code: 'de',
      greeting: 'Guten Tag, Sie sprechen mit Chloe von Smile Clinic. Wie kann ich Ihnen helfen?',
      buttonText: 'Sprechen',
      image: chloeGermanImage,
      accent: 'Professional German'
    },
    {
      name: 'Dutch',
      flag: '🇳🇱',
      code: 'nl',
      greeting: 'Goedemiddag, u spreekt met Chloe van Smile Clinic. Waarmee kan ik u helpen?',
      buttonText: 'Praten',
      image: chloeDutchImage,
      accent: 'Netherlands Dutch'
    }
  ];

  const features = [
    {
      icon: Mic,
      title: 'Native AI Voices',
      description: 'Sounds like a real receptionist in each language, not robotic translation'
    },
    {
      icon: Brain,
      title: 'Intent Flow Logic Stays Intact',
      description: 'Same intelligence and conversation flow, adapted for each language'
    },
    {
      icon: Globe,
      title: 'Cultural Etiquette Awareness',
      description: 'Uses "Sie" in German, "usted" in Spanish, and proper formal address'
    },
    {
      icon: RefreshCw,
      title: 'Dynamic Language Switching',
      description: 'Detects when users change language mid-conversation and adapts'
    },

  ];

  const industries = [
    {
      icon: Stethoscope,
      title: 'Dental Clinic',
      description: 'Booking appointments in Spanish for local community',
      example: '"Me duele una muela, ¿pueden verme hoy?"'
    },
    {
      icon: Building,
      title: 'Private Medical',
      description: 'Patient triage and consultation booking in German',
      example: '"Ich brauche einen Termin beim Kardiologen"'
    },
    {
      icon: Plane,
      title: 'Travel Agency',
      description: 'Flight rescheduling and booking support in Dutch',
      example: '"Mijn vlucht is geannuleerd, wat nu?"'
    },
    {
      icon: ShoppingBag,
      title: 'Retail Support',
      description: 'Customer service in English and Spanish markets',
      example: '"Do you have this in size medium?"'
    },
    {
      icon: CreditCard,
      title: 'Banking',
      description: 'Fraud prevention callbacks in multiple languages',
      example: '"We detected unusual activity on your account"'
    },
    {
      icon: UserCheck,
      title: 'Professional Services',
      description: 'Client intake and scheduling across language barriers',
      example: '"I need to schedule a consultation"'
    }
  ];

  const handlePlayDemo = (index: number) => {
    setPlayingDemo(index);
    // Simulate audio playback
    setTimeout(() => {
      setPlayingDemo(null);
    }, 3000);
  };

  const handleVapiCall = async (languageName: string) => {
    try {
      // Prevent duplicate requests
      if (isConnecting === languageName) {
        console.log('Call already connecting for', languageName);
        return;
      }

      setIsConnecting(languageName);
      
      // Fetch VAPI configuration
      const configResponse = await fetch('/api/vapi-config');
      const config = await configResponse.json();
      
      if (config.error) {
        console.error('VAPI configuration error:', config.error);
        setIsConnecting(null);
        return;
      }

      // Initialize VAPI instance
      const vapiInstance = new Vapi(config.publicKey);
      setVapi(vapiInstance);

      // Set up event listeners
      vapiInstance.on('call-start', () => {
        console.log('VAPI call started successfully for', languageName);
        setIsConnecting(null);
        setActiveCall(languageName);
      });

      vapiInstance.on('call-end', () => {
        console.log('VAPI call ended for', languageName);
        setActiveCall(null);
        setVapi(null);
        setIsConnecting(null);
      });

      vapiInstance.on('error', (error) => {
        console.error('VAPI error:', error);
        setActiveCall(null);
        setVapi(null);
        setIsConnecting(null);
      });

      // Get the assistant ID for this language
      const assistantId = assistantIds[languageName];

      if (!assistantId) {
        console.error('Assistant ID not found for', languageName);
        setIsConnecting(null);
        return;
      }

      console.log(`Starting VAPI call with ${languageName} Chloe`);
      await vapiInstance.start(assistantId);
    } catch (error) {
      console.error('Failed to start VAPI call:', error);
      setActiveCall(null);
      setVapi(null);
      setIsConnecting(null);
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-48 h-48 bg-purple-400/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-cyan-400/10 rounded-full blur-xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center mb-6"
              >
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-6 py-3 backdrop-blur-sm">
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium">Multilingual AI</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                One Agent. Four Languages.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  Zero Friction.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto"
              >
                Experience Chloe, our multilingual AI receptionist in action.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto"
              >
                Built to speak like your best front desk team member — in English, Spanish, German, and Dutch.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a 
                  href="#demo-languages"
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>Hear Chloe in 4 Languages</span>
                </a>
                
                <button className="border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Demo Languages Section */}
        <section id="demo-languages" className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                <Volume2 className="inline w-8 h-8 mr-3 text-blue-600" />
                Chloe in 4 Languages
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Listen to how naturally Chloe communicates in each language
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {languages.map((language, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                    activeLanguage === index ? 'border-blue-500 ring-4 ring-blue-100' : 'border-gray-200'
                  }`}
                  onClick={() => setActiveLanguage(index)}
                >
                  <div className="text-center">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{language.name}</h3>
                      <p className="text-sm text-gray-500">{language.accent}</p>
                    </div>

                    <div className="mb-6">
                      <button
                        onClick={() => {
                          if (activeCall === language.name) {
                            endCall();
                          } else {
                            handleVapiCall(language.name);
                          }
                        }}
                        className="relative group cursor-pointer"
                      >
                        <img 
                          src={language.image}
                          alt={`Chloe speaking ${language.name}`}
                          className="w-full max-w-[200px] mx-auto rounded-lg shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-105"
                        />
                        {activeCall === language.name && (
                          <div className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              On Call
                            </div>
                          </div>
                        )}
                        {isConnecting === language.name && (
                          <div className="absolute inset-0 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                            <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Connecting...
                            </div>
                          </div>
                        )}
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (activeCall === language.name) {
                          endCall();
                        } else {
                          handleVapiCall(language.name);
                        }
                      }}
                      disabled={isConnecting === language.name}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                        activeCall === language.name
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : isConnecting === language.name
                          ? 'bg-yellow-100 text-yellow-700 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                      }`}
                    >
                      {isConnecting === language.name ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full"></div>
                          <span>Connecting...</span>
                        </>
                      ) : activeCall === language.name ? (
                        <>
                          <PhoneCall className="w-4 h-4" />
                          <span>End Call</span>
                        </>
                      ) : (
                        <>
                          <PhoneCall className="w-4 h-4" />
                          <span>{language.buttonText}</span>
                        </>
                      )}
                    </button>

                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 italic">
                        "{language.greeting}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Advantages Section */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                What Makes Chloe Multilingual — Not Just Translated
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Built Natively. Trained Culturally. Trusted Globally.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Use Cases Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Where This Works Best
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Perfect for Clinics, Retail, Travel, Finance — Anywhere Language Matters
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <industry.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {industry.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {industry.description}
                    </p>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-800 italic">
                        {industry.example}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Deploy a Multilingual AI Agent in Days
              </h2>
              <p className="text-xl mb-4 text-gray-200">
                Want to speak your customers' language — literally?
              </p>
              <p className="text-lg mb-10 text-gray-300">
                Chloe's not a demo. She's deployable.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                  <PhoneCall className="w-5 h-5" />
                  <span>Book a Live Demo with Our Team</span>
                </button>
                
                <button className="border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm">
                  <span>See Pricing</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
  );
}

MultilingualDemo.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="Multilingual AI Voice Agents | GoZupes - English, Spanish, German, Dutch"
      description="Experience Chloe speaking fluently in 4 languages. Native AI voices, cultural awareness, and seamless language switching for global businesses."
      canonical="https://gozupees.com/ai-voice-agents/multilingual"
      ogImage="https://gozupees.com/images/multilingual-ai-agents.jpg"
    >
      {page}
    </Layout>
  );
};