import { useState, useRef, useEffect } from 'react';
import { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import { motion } from 'framer-motion';
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
  Shield,
  Scale,
  FileText,
  Heart,
  Award,
  Building2,
  Languages,
  Clock,
  AlertTriangle,
  TrendingUp,
  UserCheck,
  Settings,
  Target,
  BookOpen
} from 'lucide-react';

export default function HRMultinationalDemo() {
  const [activeLanguage, setActiveLanguage] = useState(0);
  const [playingDemo, setPlayingDemo] = useState<number | null>(null);
  const [activeScenario, setActiveScenario] = useState(0);
  
  const languages = [
    {
      name: 'English',
      flag: '🇬🇧',
      code: 'en',
      country: 'United Kingdom',
      greeting: 'Hello, I\'m Hannah, your HR assistant for the UK. I understand you\'re asking about your annual leave entitlement. In the UK, you\'re legally entitled to 28 days of paid holiday, including bank holidays.',
      buttonText: 'Talk to Hannah',
      accent: 'British Professional',
      laws: ['Employment Rights Act 1996', 'Working Time Regulations 1998', 'Equality Act 2010'],
      taxSystem: 'PAYE system with P60/P45/P11D forms',
      culturalNotes: 'Bank holidays vary by region (Scotland, Northern Ireland)',
      leaveEntitlement: '28 days statutory minimum including bank holidays'
    },
    {
      name: 'French',
      flag: '🇫🇷',
      code: 'fr',
      country: 'France',
      greeting: 'Bonjour, je suis Hannah, votre assistante RH pour la France. Je comprends que vous demandez des informations sur vos congés payés. En France, vous avez droit à 5 semaines de congés payés par an selon le Code du Travail.',
      buttonText: 'Parler à Hannah',
      accent: 'Professional French',
      laws: ['Code du Travail', '35-hour work week legislation', 'CDI vs CDD regulations'],
      taxSystem: 'Social security contributions with RTT calculations',
      culturalNotes: 'Formal workplace etiquette, collective agreements',
      leaveEntitlement: '5 weeks paid leave (congés payés) minimum'
    },
    {
      name: 'Spanish',
      flag: '🇪🇸',
      code: 'es',
      country: 'Spain',
      greeting: 'Hola, soy Hannah, tu asistente de recursos humanos para España. Entiendo que preguntas sobre tus días de vacaciones. En España, tienes derecho a un mínimo de 30 días naturales de vacaciones al año según el Estatuto de los Trabajadores.',
      buttonText: 'Hablar con Hannah',
      accent: 'Professional Spanish',
      laws: ['Estatuto de los Trabajadores', 'Regional autonomy variations', 'Collective bargaining agreements'],
      taxSystem: '14 monthly salary structure with Seguridad Social',
      culturalNotes: 'Autonomous community differences, regional holidays',
      leaveEntitlement: '30 calendar days minimum annual leave'
    },
    {
      name: 'Dutch',
      flag: '🇳🇱',
      code: 'nl',
      country: 'Netherlands',
      greeting: 'Hallo, ik ben Hannah, je HR-assistent voor Nederland. Ik begrijp dat je vraagt over je vakantiedagen. In Nederland heb je recht op minimaal 20 vakantiedagen per jaar, plus 8% vakantiegeld over je brutoloon.',
      buttonText: 'Praat met Hannah',
      accent: 'Professional Dutch',
      laws: ['Dutch Civil Code (Burgerlijk Wetboek)', 'Wet verbetering poortwachter', 'Fixed-term vs permanent contract rules'],
      taxSystem: '30% ruling for expats, vakantiegeld allowance',
      culturalNotes: 'Direct communication style, work-life balance focus',
      leaveEntitlement: '20 days minimum plus 8% holiday allowance'
    },
    {
      name: 'German',
      flag: '🇩🇪',
      code: 'de',
      country: 'Germany',
      greeting: 'Hallo, ich bin Hannah, deine HR-Assistentin für Deutschland. Ich verstehe, dass du nach deinen Urlaubstagen fragst. Nach dem Bundesurlaubsgesetz hast du Anspruch auf mindestens 20 Urlaubstage bei einer 5-Tage-Woche.',
      buttonText: 'Mit Hannah sprechen',
      accent: 'Professional German',
      laws: ['Arbeitsrecht (German Labour Law)', 'Kündigungsschutzgesetz', 'Works council (Betriebsrat) rights'],
      taxSystem: 'Church tax, solidarity surcharge, collective agreements',
      culturalNotes: 'Structured processes, Betriebsrat involvement',
      leaveEntitlement: '20 days minimum (Bundesurlaubsgesetz), often 13th month salary'
    }
  ];

  const hrScenarios = [
    {
      title: 'Leave Management',
      icon: Calendar,
      description: 'Handling all types of leave requests with country-specific compliance',
      examples: [
        'Maternity/paternity leave calculations per local law',
        'Sick leave certification requirements by country',
        'Holiday entitlement calculations and booking',
        'Emergency leave and bereavement policies'
      ]
    },
    {
      title: 'Legal Compliance',
      icon: Scale,
      description: 'Ensuring adherence to local employment laws and regulations',
      examples: [
        'Working time directive compliance',
        'Minimum wage and overtime calculations',
        'Employment contract compliance checking',
        'Grievance procedure management'
      ]
    },
    {
      title: 'Payroll & Benefits',
      icon: Award,
      description: 'Managing compensation and benefits according to local standards',
      examples: [
        'Tax deduction explanations by country',
        'Pension contribution calculations',
        'Expense claim processing and approval',
        'Benefits enrollment and management'
      ]
    },
    {
      title: 'Employee Relations',
      icon: Heart,
      description: 'Supporting employees with workplace concerns and development',
      examples: [
        'Workplace conflict resolution',
        'Performance review scheduling',
        'Career development guidance',
        'Mental health and wellness resources'
      ]
    }
  ];

  const keyFeatures = [
    {
      icon: Languages,
      title: 'Native Language Fluency',
      description: 'Hannah speaks like a local HR professional in each language, understanding cultural nuances and workplace etiquette.'
    },
    {
      icon: Scale,
      title: 'Legal Expertise Per Country',
      description: 'Trained on complete labor law frameworks for each jurisdiction, ensuring 100% compliant advice.'
    },
    {
      icon: Brain,
      title: 'Context-Aware Responses',
      description: 'Understands your company policies alongside local laws to provide personalized guidance.'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Always available across all time zones for urgent HR matters and employee queries.'
    },
    {
      icon: RefreshCw,
      title: 'Real-time Policy Updates',
      description: 'Automatically updated with the latest labor law changes and company policy modifications.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption with GDPR compliance and data residency controls.'
    }
  ];

  const businessBenefits = [
    {
      metric: '70%',
      label: 'Reduction in HR Workload',
      description: 'Automate repetitive policy questions and routine HR tasks'
    },
    {
      metric: '100%',
      label: 'Legal Compliance',
      description: 'Ensure all advice meets local employment law requirements'
    },
    {
      metric: '24/7',
      label: 'Employee Support',
      description: 'Provide instant HR assistance across all time zones'
    },
    {
      metric: '5 Countries',
      label: 'European Coverage',
      description: 'Unified HR support across major European markets'
    }
  ];

  const realWorldExamples = [
    {
      country: 'United Kingdom',
      scenario: 'Sick Leave Inquiry',
      employee: 'How many sick days can I take without a doctor\'s note?',
      hannah: 'By UK law, you can self-certify for up to 7 consecutive days. After that, you\'ll need a fit note from your GP. Your company policy also provides full pay for the first 6 months of sick leave. Would you like me to log this absence for you?'
    },
    {
      country: 'France',
      scenario: 'Holiday Carryover',
      employee: 'Puis-je reporter mes jours de congés à l\'année prochaine?',
      hannah: 'En France, les congés payés doivent généralement être pris avant la fin de la période de référence. Cependant, votre convention collective permet de reporter 5 jours maximum. Je peux faire la demande de report pour vous si vous le souhaitez.'
    },
    {
      country: 'Germany',
      scenario: 'Vacation Balance',
      employee: 'Wie viele Urlaubstage habe ich noch übrig?',
      hannah: 'Nach dem Bundesurlaubsgesetz haben Sie mindestens 20 Tage Anspruch bei einer 5-Tage-Woche. Laut unserer HR-Datenbank haben Sie aktuell noch 7 Urlaubstage übrig. Soll ich einen Urlaubsantrag für Sie stellen?'
    }
  ];

  const toggleAudio = (index: number) => {
    if (playingDemo === index) {
      setPlayingDemo(null);
    } else {
      setPlayingDemo(index);
      // In a real implementation, you would play the audio here
      setTimeout(() => setPlayingDemo(null), 3000); // Auto-stop after 3 seconds for demo
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-blue-600/20 rounded-full px-6 py-3 mb-6 backdrop-blur-sm border border-blue-500/30">
                <Globe className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">5 Countries • 5 Languages • 1 AI Solution</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">HR Manager</span> in Your Country
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Meet Hannah: Your multilingual AI HR assistant trained on local labor laws, 
                fluent in native languages, and deeply familiar with country-specific workplace policies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                  <PhoneCall className="w-5 h-5" />
                  <span>Talk to Hannah Now</span>
                </button>
                
                <button className="border-2 border-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm">
                  <FileText className="w-5 h-5" />
                  <span>Download HR Guide</span>
                </button>
              </div>

              {/* Business Benefits Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {businessBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">
                      {benefit.metric}
                    </div>
                    <div className="text-sm font-medium text-gray-300 mb-1">
                      {benefit.label}
                    </div>
                    <div className="text-xs text-gray-400 leading-tight">
                      {benefit.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Language Selection & Demo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Hannah Speaks Your Language
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Not just translation – Hannah understands the cultural nuances, legal frameworks, 
                and workplace etiquette of each country she serves.
              </p>
            </motion.div>
          </div>

          {/* Language Selector */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
            {languages.map((language, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveLanguage(index)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  activeLanguage === index
                    ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-4xl mb-3">{language.flag}</div>
                <div className="font-semibold text-gray-900 mb-1">{language.name}</div>
                <div className="text-sm text-gray-500 mb-2">{language.country}</div>
                <div className="text-xs text-blue-600 font-medium">{language.accent}</div>
              </motion.button>
            ))}
          </div>

          {/* Active Language Demo */}
          <motion.div
            key={activeLanguage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Hannah - {languages[activeLanguage].country}
                    </h3>
                    <p className="text-gray-600">HR Manager specializing in local employment law</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => toggleAudio(activeLanguage)}
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        playingDemo === activeLanguage
                          ? 'bg-red-100 text-red-600 animate-pulse'
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {playingDemo === activeLanguage ? (
                        <div className="w-3 h-3 bg-red-600 rounded-sm"></div>
                      ) : (
                        <Play className="w-5 h-5 ml-0.5" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-2">Hannah responds:</div>
                      <p className="text-gray-800 leading-relaxed italic">
                        "{languages[activeLanguage].greeting}"
                      </p>
                    </div>
                  </div>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                  <Phone className="w-5 h-5" />
                  <span>{languages[activeLanguage].buttonText}</span>
                </button>
              </div>

              {/* Country-Specific Information */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Scale className="w-5 h-5 mr-2 text-blue-600" />
                    Legal Framework
                  </h4>
                  <ul className="space-y-2">
                    {languages[activeLanguage].laws.map((law, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{law}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-green-600" />
                    Tax & Payroll System
                  </h4>
                  <p className="text-sm text-gray-600">{languages[activeLanguage].taxSystem}</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                    Leave Entitlements
                  </h4>
                  <p className="text-sm text-gray-600">{languages[activeLanguage].leaveEntitlement}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HR Scenarios */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Real HR Scenarios, Real Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hannah handles complex HR situations with the precision of a local expert 
                and the availability of AI technology.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {hrScenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group hover:border-blue-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <scenario.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{scenario.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{scenario.description}</p>
                <ul className="space-y-2">
                  {scenario.examples.map((example, exIndex) => (
                    <li key={exIndex} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span className="text-xs text-gray-500">{example}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Real World Examples */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              See Hannah in Action
            </h3>
            
            <div className="grid gap-8">
              {realWorldExamples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
                >
                  <div className="mb-4">
                    <div className="inline-flex items-center bg-blue-100 rounded-full px-3 py-1 text-sm font-medium text-blue-800 mb-2">
                      {example.country} • {example.scenario}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border-l-4 border-gray-300">
                      <div className="text-sm text-gray-500 mb-1">Employee asks:</div>
                      <p className="text-gray-800">{example.employee}</p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                      <div className="text-sm text-blue-600 mb-1">Hannah responds:</div>
                      <p className="text-gray-800">{example.hannah}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Enterprise-Grade HR Intelligence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built for multinational companies that need precision, compliance, and cultural awareness.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Deploy Hannah Across Europe in Days
            </h2>
            <p className="text-xl mb-4 text-gray-200">
              Ready to revolutionize your multinational HR operations?
            </p>
            <p className="text-lg mb-10 text-gray-300">
              Hannah isn't just a demo – she's deployable today.
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

HRMultinationalDemo.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="HR Multinational AI Voice Agent | GoZupees - 5 European Countries"
      description="Meet Hannah: Your multilingual AI HR assistant trained on local labor laws across UK, France, Spain, Netherlands & Germany. Native language fluency with legal compliance."
      canonical="https://gozupees.com/ai-voice-agents/hr-multinational"
      ogImage="https://gozupees.com/images/hr-multinational-ai-agent.jpg"
    >
      {page}
    </Layout>
  );
};