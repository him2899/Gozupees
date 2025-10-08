import { ReactElement, useState, useRef, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Phone, MessageCircle, Send, Mic, MicOff, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import sandeepCallImage from '../attached_assets/GoZupes AI Agents (37)_1753885002711.png';
import sandeepProfileImage from '../attached_assets/image_1753888520897.png';
import CallManagementModal from '../components/ui/CallManagementModal';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AskMeAnything = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
    // Add initial message after mounting to avoid hydration issues
    setMessages([{
      id: '1',
      type: 'assistant',
      content: "Hi! I'm Sandeep's AI clone. I'm here to answer anything you need to know about GoZupees before you jump in. What would you like to know?",
      timestamp: new Date()
    }]);
    
    // Ensure page starts at top
    window.scrollTo(0, 0);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Only scroll to bottom if there are user messages (not just the initial message)
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! GoZupees AI voice agents are designed to handle complex customer interactions with human-like conversation skills. We can help streamline your business processes significantly.",
        "I'm excited to help you understand how our AI voice agents can transform your business operations. Our agents handle lead qualification, customer support, and appointment scheduling 24/7.",
        "Absolutely! Our AI voice agents integrate seamlessly with your existing CRM and business systems. We've helped companies reduce operational costs by up to 70% while improving customer satisfaction.",
        "That's exactly what we specialize in! Our agents are trained for specific industries and can handle complex workflows with emotional intelligence and conversation memory.",
        "Great insight! Our multilingual agents support over 50 languages with cultural awareness. This allows businesses to expand globally without language barriers."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant' as const,
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };



  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
    if (!isVoiceMode) {
      // Simulate voice call initiation
      setIsListening(true);
      setTimeout(() => setIsListening(false), 3000);
    }
  };

  const quickQuestions = [
    "How do your AI agents work?",
    "What's the pricing structure?",
    "Can I see a live demo?",
    "What integrations do you support?",
    "How long is implementation?"
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-blue-500/30">
                <img 
                  src={typeof sandeepProfileImage === 'string' ? sandeepProfileImage : sandeepProfileImage.src} 
                  alt="Sandeep Bansal"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">Ask Me Anything</h1>
              <p className="text-xl text-blue-200 mb-4">Sandeep Bansal - CEO/Founder of GoZupees</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto bg-gray-800 rounded-2xl p-6 border border-gray-700"
            >
              <p className="text-gray-300 text-xl leading-relaxed font-medium mb-6">
                I'm Sandeep's clone, here to answer anything you need to know about GoZupees before you jump in.
              </p>
              
              {/* Collapsible Details */}
              <details className="group">
                <summary className="cursor-pointer text-blue-400 hover:text-blue-300 font-semibold mb-3 list-none">
                  <span className="flex items-center">
                    What I can help with
                    <svg className="w-4 h-4 ml-2 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                
                <div className="mt-4 text-left">
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      How our AI voice & chat agents work
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Pricing, ROI, and pilot options
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      A live demo on your own use-case
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      SIP, CRM, and custom API integrations
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Our 2-week implementation process from kickoff to go-live
                    </li>
                  </ul>

                  <div className="mt-6 pt-4 border-t border-gray-600 text-sm text-gray-400">
                    <p>For existing-customer support, please use the help widget inside your GoZupees dashboard or email <span className="text-blue-400">support@gozupees.com</span>.</p>
                    <p className="mt-2">If I ever miss the mark on anything else, just drop a note to <span className="text-blue-400">sandeep@gozupees.com</span>.</p>
                  </div>
                </div>
              </details>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-4 max-w-7xl mx-auto relative">
          {/* Dividing Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-700 transform -translate-x-1/2"></div>
          {/* Chat Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 h-[600px] flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-gray-700 to-blue-800 p-4 border-b border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-400/30">
                    <img 
                      src={typeof sandeepProfileImage === 'string' ? sandeepProfileImage : sandeepProfileImage.src} 
                      alt="Sandeep"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Sandeep's AI Clone</h3>
                    <p className="text-gray-300 text-sm">Online • Ready to help</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleVoiceMode}
                    className={`p-2 rounded-full transition-colors ${
                      isVoiceMode 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {isMounted ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="p-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm mb-3">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                    setInputMessage(question);
                    const e = { preventDefault: () => {} } as React.FormEvent;
                    handleSendMessage(e);
                  }}
                    className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-gray-700 border-t border-gray-600">
              <form onSubmit={handleSendMessage} className="flex space-x-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about GoZupees..."
                  className="flex-1 bg-gray-600 text-white placeholder-gray-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white p-2 rounded-full transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Phone Column - Closer to dividing line */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-start justify-center h-[600px] pl-8"
          >
            <div className="relative mb-6">
              {/* Phone Interface - Complete Image Display */}
              <div className="relative shadow-2xl">
                <img 
                  src={typeof sandeepCallImage === 'string' ? sandeepCallImage : sandeepCallImage.src}
                  alt="Sandeep Call Interface"
                  className="block rounded-3xl"
                  style={{ maxHeight: '480px', width: 'auto', height: 'auto' }}
                />
              </div>

              {/* Voice Mode Indicator */}
              <AnimatePresence>
                {isVoiceMode && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-black/50 rounded-3xl flex items-center justify-center"
                  >
                    <div className="bg-green-600 text-white px-6 py-3 rounded-full flex items-center space-x-2">
                      {isListening ? (
                        <>
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                          <span>Listening...</span>
                        </>
                      ) : (
                        <>
                          <Phone className="w-5 h-5" />
                          <span>Voice Mode Active</span>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Talk to Sandeep CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => setShowCallModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
            >
              <Phone className="w-6 h-6" />
              <span>Talk to Sandeep</span>
            </motion.button>
          </motion.div>
        </div>


      </div>

      {/* VAPI Call Modal */}
      {showCallModal && (
        <CallManagementModal
          isOpen={showCallModal}
          agentId="99fd845e-36f5-4e34-a0a0-f32ecd4736f0" // Sandeep's voice demo agent ID
          agentName="Sandeep Bansal"
          publicKey="b38c975f-ed60-4944-9846-36fca37e5305" // Voice demo API key
          onClose={() => setShowCallModal(false)}
        />
      )}
    </div>
  );
};

AskMeAnything.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="Ask Me Anything - Sandeep Bansal | GoZupees"
      description="Chat directly with Sandeep's AI clone. Get answers about GoZupees AI voice agents, pricing, demos, and implementation. Available 24/7 to help you get started."
      canonical="https://gozupees.com/ask-me-anything"
      ogImage="https://gozupees.com/images/sandeep-ask-me-anything.jpg"
    >
      {page}
    </Layout>
  );
};

export default AskMeAnything;