'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../../lib/queryClient';
import type { Demo } from '../../shared/schema';
import LeadFormModal from '../ui/LeadFormModal';

interface VoiceDemoGalleryProps {
  onTryAgentClick?: (demo: Demo) => void;
}

export default function VoiceDemoGallery({ onTryAgentClick }: VoiceDemoGalleryProps) {
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedTranscript, setDisplayedTranscript] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fetch demos from the database
  const { data: demos = [], isLoading } = useQuery({
    queryKey: ['/api/demos'],
    queryFn: () => apiRequest('/api/demos'),
  });

  // Set the first demo as selected by default
  React.useEffect(() => {
    if (demos.length > 0 && !selectedDemo) {
      setSelectedDemo(demos[0]);
    }
  }, [demos, selectedDemo]);

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
        // Update duration in database via API
        fetch('/api/demos', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: selectedDemo.id,
            duration: actualDuration
          })
        }).catch(console.error);
        
        // Update local state
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
      'Ella': '👩🏼‍💼'
    };
    return avatars[name] || '👤';
  };

  if (isLoading) {
    return (
      <section id="demo-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading voice demos...</p>
          </div>
        </div>
      </section>
    );
  }

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
                  {demos.map((demo: Demo, index: number) => (
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