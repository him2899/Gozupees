'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2 } from 'lucide-react';
import LeadFormModal from '../ui/LeadFormModal';

interface Demo {
  id: number;
  name: string;
  useCaseName: string;
  industry: string;
  language: string;
  function: string;
  country: string;
  audioUrl: string;
  avatarUrl?: string | null;
  transcript: string;
  duration: number;
  createdAt: Date;
}

// Hardcoded demo data for performance
const hardcodedDemos: Demo[] = [
  {
    id: 1,
    name: 'Nina',
    useCaseName: 'Real Estate Lead Qualification',
    industry: 'Real Estate',
    language: 'English (US)',
    function: 'Lead Qualification',
    country: '🇺🇸 USA',
    audioUrl: '/audio/Nina.mp3',
    avatarUrl: null,
    transcript: 'Hi there! I\'m Nina, your real estate assistant at GoZupees. I\'m here to help you navigate the home buying or selling process - whether you\'re a first-time buyer or looking to upgrade. If you have questions about pricing, neighborhoods, or next steps - I\'ve got you covered. Let\'s find the right place for you.',
    duration: 19,
    createdAt: new Date('2025-05-28T10:18:59.976Z')
  },
  {
    id: 2,
    name: 'Raj',
    useCaseName: 'Appointment Booking',
    industry: 'Dental Clinic',
    language: 'English (IN)',
    function: 'Appointment Booking',
    country: '🇮🇳 India',
    audioUrl: '/audio/Raj.mp3',
    avatarUrl: null,
    transcript: 'Hi there! I\'m Raj, your appointment assistant here at GoZupees Dental Clinic. I\'m here to help you book, reschedule, or cancel your dental appointments - quickly and easily. Whether it\'s a routine cleaning, a consultation, or an urgent visit, I\'ll make sure you\'re scheduled at the right time with the right doctor. Let\'s get started!',
    duration: 19,
    createdAt: new Date('2025-05-28T10:18:59.976Z')
  },
  {
    id: 3,
    name: 'Jake',
    useCaseName: 'Trial Conversion',
    industry: 'SaaS',
    language: 'English (US)',
    function: 'Trial Conversion',
    country: '🇺🇸 USA',
    audioUrl: '/audio/jake_trial.mp3',
    avatarUrl: null,
    transcript: 'Hey there! I\'m Jake, your sales assistant at GoZupees. I\'m here to help you make the most of your trial - whether that means walking you through key features, answering any upgrade questions, or showing you how our platform fits your goals. If you\'re finding value already, let\'s explore the best plan to keep things rolling.',
    duration: 21,
    createdAt: new Date('2025-05-28T10:18:59.976Z')
  },
  {
    id: 4,
    name: 'Carlos',
    useCaseName: 'Order Support',
    industry: 'E-commerce',
    language: 'English (Latino)',
    function: 'Order Support',
    country: '🇲🇽 Mexico',
    audioUrl: '/audio/carlos_ordersupport.mp3',
    avatarUrl: null,
    transcript: 'Hi! I\'m Carlos, your order support assistant at GoZupees. I can help you track your delivery, update your shipping info, handle returns, or answer any questions about your purchase. If something\'s not right, I\'ll make sure we get it sorted quickly. How can I assist you today?',
    duration: 16,
    createdAt: new Date('2025-05-28T10:18:59.976Z')
  },
  {
    id: 5,
    name: 'Zara',
    useCaseName: 'Outbound Sales',
    industry: 'B2B SaaS',
    language: 'English (African)',
    function: 'Outbound Sales',
    country: '🇳🇬 Nigeria',
    audioUrl: '/audio/zara_sales.mp3',
    avatarUrl: null,
    transcript: "Hello! I'm Zara, your sales assistant from GoZupees. I reach out to help businesses like yours discover how our platform can streamline operations and drive results. I'd love to learn more about what you're working on and see how we can support your goals. Let me know if you're open to a quick chat!",
    duration: 20,
    createdAt: new Date('2025-05-28T10:18:59.976Z')
  },
  {
    id: 6,
    name: 'Pam',
    useCaseName: 'Job Screening',
    industry: 'Recruitment',
    language: 'English (UK)',
    function: 'Job Screening',
    country: '🇬🇧 UK',
    audioUrl: '/audio/Pam_screening_assistant.mp3',
    avatarUrl: null,
    transcript: 'Hello! I\'m Pam, your screening assistant at GoZupees. I\'ll be guiding you through a few quick questions to help us understand if this role\'s a good fit for you. Nothing too formal - just a simple way to get to know you better before we move forward. Shall we begin?',
    duration: 14,
    createdAt: new Date('2025-05-28T10:18:59.976Z')
  },
  {
    id: 7,
    name: 'Klaus',
    useCaseName: 'Booking Assistant',
    industry: 'Wellness',
    language: 'English (UK)',
    function: 'Booking Assistant',
    country: '🇬🇧 UK',
    audioUrl: '/audio/Klaus_wellness.mp3',
    avatarUrl: null,
    transcript: 'Hello there, I\'m Klaus - your booking assistant at GoZupees Wellness. I\'m here to help you schedule your next session, whether it\'s a massage, therapy, or a well-deserved self-care treatment. Just let me know what you\'re looking for, and I\'ll take care of the rest. Shall we get started?',
    duration: 19,
    createdAt: new Date('2025-05-28T10:18:59.976Z')
  }
];

interface VoiceDemoGalleryProps {
  onTryAgentClick?: (demo: Demo) => void;
}

export default function VoiceDemoGalleryHardcoded({ onTryAgentClick }: VoiceDemoGalleryProps) {
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedTranscript, setDisplayedTranscript] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  // Set the first demo as selected by default
  React.useEffect(() => {
    if (hardcodedDemos.length > 0 && !selectedDemo) {
      setSelectedDemo(hardcodedDemos[0]);
    }
  }, [selectedDemo]);

  const handlePlayPause = () => {
    if (!audioRef.current || !selectedDemo) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleDemoSelect = (demo: Demo) => {
    if (selectedDemo?.id !== demo.id) {
      // Stop current audio if playing
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      setSelectedDemo(demo);
      setCurrentTime(0);
      setDisplayedTranscript('');
    }
  };

  // Auto-detect audio duration when audio loads
  const handleAudioLoad = () => {
    if (audioRef.current && selectedDemo) {
      const actualDuration = Math.floor(audioRef.current.duration);
      if (actualDuration !== selectedDemo.duration) {
        // Update local state only (no database call)
        setSelectedDemo(prev => prev ? { ...prev, duration: actualDuration } : null);
      }
    }
  };

  // Typewriter effect for transcript
  React.useEffect(() => {
    if (!selectedDemo?.transcript || !isPlaying) return;

    const transcript = selectedDemo.transcript;
    const totalDuration = selectedDemo.duration * 1000; // Convert to milliseconds
    const charDelay = totalDuration / transcript.length; // Delay per character

    let charIndex = 0;
    const typewriterInterval = setInterval(() => {
      if (charIndex < transcript.length) {
        setDisplayedTranscript(transcript.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, charDelay);

    return () => clearInterval(typewriterInterval);
  }, [selectedDemo, isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAvatarEmoji = (name: string) => {
    const avatars: { [key: string]: string } = {
      'Nina': '👩🏼‍💼',
      'Raj': '👨🏽‍💼', 
      'Jake': '👨🏻‍💼',
      'Carlos': '👨🏽‍💼',
      'Zara': '👩🏿‍💼',
      'Priya': '👩🏽‍💼',
      'Ella': '👩🏼‍💼',
      'Klaus': '👨🏼‍💼',
      'Pam': '👩🏻‍💼'
    };
    return avatars[name] || '👤';
  };

  return (
    <section id="demo-section" className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 md:py-20 lg:min-h-screen lg:flex lg:items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              AI Agents Across Industries
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              From healthcare to logistics, see how intelligent AI agents transform customer interactions across every sector
            </motion.p>
          </div>

          {/* Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            
            {/* Left Panel - Demo Details */}
            <div className="flex flex-col order-2 lg:order-1">
              {selectedDemo && (
                <motion.div 
                  className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 md:p-6 flex flex-col backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  key={selectedDemo.id}
                >
                  {/* Demo Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                    <div className="flex-1 mb-4 sm:mb-0">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {(selectedDemo.function || selectedDemo.useCaseName)} for {selectedDemo.industry}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base">
                        {selectedDemo.name} demonstrating {(selectedDemo.function || selectedDemo.useCaseName).toLowerCase()} capabilities
                      </p>
                    </div>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-700 rounded-full flex items-center justify-center text-xl md:text-2xl sm:ml-4">
                      {selectedDemo.avatarUrl ? (
                        <img 
                          src={selectedDemo.avatarUrl} 
                          alt={selectedDemo.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        getAvatarEmoji(selectedDemo.name)
                      )}
                    </div>
                  </div>

                  {/* Demo Meta Info */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="bg-gray-700/50 rounded-lg p-2 md:p-3">
                      <div className="text-xs md:text-sm text-gray-400 mb-1">Industry</div>
                      <div className="font-semibold text-white text-sm md:text-base">{selectedDemo.industry}</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-2 md:p-3">
                      <div className="text-xs md:text-sm text-gray-400 mb-1">Language</div>
                      <div className="font-semibold text-white text-sm md:text-base">{selectedDemo.language}</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-2 md:p-3">
                      <div className="text-xs md:text-sm text-gray-400 mb-1">Function</div>
                      <div className="font-semibold text-white text-sm md:text-base">{selectedDemo.function}</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-2 md:p-3">
                      <div className="text-xs md:text-sm text-gray-400 mb-1">Country</div>
                      <div className="font-semibold text-white text-sm md:text-base">{selectedDemo.country}</div>
                    </div>
                  </div>

                  {/* Audio Player and Transcript */}
                  <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/30 rounded-xl p-4 md:p-6 mb-4 md:mb-6 flex-1 flex flex-col">
                    {/* Audio Controls */}
                    <div className="flex items-center gap-4 mb-4">
                      <button
                        onClick={handlePlayPause}
                        className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                      >
                        {isPlaying ? <Pause className="w-4 h-4 md:w-6 md:h-6" /> : <Play className="w-4 h-4 md:w-6 md:h-6 ml-1" />}
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs md:text-sm font-medium text-white">
                            {selectedDemo.name} - {selectedDemo.useCaseName}
                          </span>
                          <span className="text-xs md:text-sm text-gray-400">
                            {formatTime(currentTime)} / {formatTime(selectedDemo.duration)}
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-200"
                            style={{ 
                              width: `${selectedDemo.duration > 0 ? (currentTime / selectedDemo.duration) * 100 : 0}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    </div>

                    {/* Transcript Area */}
                    <div className="flex-1 bg-gray-800/50 rounded-lg p-3 md:p-4 min-h-[120px] md:min-h-[150px]">
                      <div className="text-xs md:text-sm font-semibold text-gray-400 mb-2">Live Transcript</div>
                      <div className="text-sm md:text-base text-white leading-relaxed h-full overflow-y-auto">
                        {isPlaying && selectedDemo?.transcript ? (
                          <span>
                            {displayedTranscript}
                            <span className="animate-pulse">|</span>
                          </span>
                        ) : selectedDemo?.transcript ? (
                          <span className="text-gray-500 italic">Press play to see live transcript...</span>
                        ) : (
                          <span className="text-gray-500 italic">No transcript available</span>
                        )}
                      </div>
                    </div>

                    {/* Hidden Audio Element */}
                    <audio
                      ref={audioRef}
                      src={selectedDemo.audioUrl}
                      onTimeUpdate={handleTimeUpdate}
                      onEnded={() => setIsPlaying(false)}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onLoadedMetadata={handleAudioLoad}
                    />
                  </div>

                  {/* Try Agent CTA */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Try This Agent Live
                  </button>
                </motion.div>
              )}
            </div>

            {/* Right Panel - Demo List */}
            <div className="flex flex-col order-1 lg:order-2">
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 md:p-6 h-full backdrop-blur-sm">
                <h4 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">All Voice Demos</h4>
                
                <div className="space-y-2 md:space-y-3 h-full overflow-y-auto lg:overflow-hidden">
                  {hardcodedDemos.map((demo: Demo, index: number) => (
                    <motion.div
                      key={demo.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-3 md:p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedDemo?.id === demo.id 
                          ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-600/50' 
                          : 'bg-gray-700/30 hover:bg-gray-700/50'
                      }`}
                      onClick={() => handleDemoSelect(demo)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-3 flex-1">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-600 rounded-full flex items-center justify-center">
                            {demo.avatarUrl ? (
                              <img 
                                src={demo.avatarUrl} 
                                alt={demo.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-base md:text-lg">{getAvatarEmoji(demo.name)}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-white text-sm md:text-lg mb-1 leading-tight">
                              {demo.function}
                            </h5>
                            <p className="text-xs md:text-sm text-gray-400 truncate">
                              {demo.name} • {formatTime(demo.duration)}
                            </p>
                          </div>
                        </div>
                        <div className="text-lg md:text-2xl ml-2 md:ml-3">
                          {demo.country.split(' ')[0]}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Form Modal */}
      <LeadFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        useCase={selectedDemo ? `${selectedDemo.useCaseName} - ${selectedDemo.industry}` : ''}
      />
    </section>
  );
}