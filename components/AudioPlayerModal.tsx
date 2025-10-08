import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, X, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Demo {
  id: number;
  name: string;
  useCaseName: string;
  industry: string;
  language: string;
  function: string;
  country: string;
  audioUrl: string;
  transcript: string;
  duration: number;
  createdAt: string;
}

interface AudioPlayerModalProps {
  agent: Demo;
  isOpen: boolean;
  onClose: () => void;
}

export default function AudioPlayerModal({ agent, isOpen, onClose }: AudioPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Calculate words per second for typewriter effect
  const wordsPerSecond = agent.transcript.split(' ').length / agent.duration;
  const charactersPerSecond = agent.transcript.length / agent.duration;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      
      // Calculate how much text to show based on audio progress
      const progress = audio.currentTime / audio.duration;
      const charactersToShow = Math.floor(progress * agent.transcript.length);
      
      if (isPlaying) {
        setDisplayedText(agent.transcript.substring(0, charactersToShow));
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setDisplayedText(agent.transcript); // Show full transcript when ended
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [agent.transcript, agent.duration, isPlaying]);

  // Reset when modal opens/closes or agent changes
  useEffect(() => {
    if (isOpen) {
      setCurrentTime(0);
      setDisplayedText('');
      setIsPlaying(false);
    }
  }, [isOpen, agent.id]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    
    // Update displayed text based on new position
    const progress = newTime / duration;
    const charactersToShow = Math.floor(progress * agent.transcript.length);
    setDisplayedText(agent.transcript.substring(0, charactersToShow));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getAvatarEmoji = (name: string) => {
    const avatars: { [key: string]: string } = {
      'Nina': '👩🏼‍💼',
      'Zara': '👩🏿‍💼',
      'Jake': '👨🏻‍💼',
      'Carlos': '👨🏽‍💼',
      'Raj': '👨🏾‍💼',
      'Pam': '👩🏼‍💼',
      'Klaus': '👨🏻‍💼'
    };
    return avatars[name] || '👤';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-xl">
                {getAvatarEmoji(agent.name)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                <p className="text-blue-600 font-medium">{agent.useCaseName}</p>
                <p className="text-sm text-gray-500">{agent.industry} • {agent.language}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Audio Player Controls */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={togglePlayPause}
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>

          {/* Live Transcript */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <h4 className="text-lg font-semibold text-gray-900">Live Transcript</h4>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
              <p className="text-gray-800 leading-relaxed text-lg">
                {displayedText}
                {isPlaying && (
                  <span className="inline-block w-0.5 h-5 bg-blue-600 ml-1 animate-pulse"></span>
                )}
              </p>
              
              {!isPlaying && currentTime === 0 && (
                <p className="text-gray-500 italic">
                  Click play to see the live transcript as the conversation unfolds...
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Duration:</span> {agent.duration} seconds
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                  Try Live Demo
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Deploy This Agent
                </button>
              </div>
            </div>
          </div>

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={agent.audioUrl}
            preload="metadata"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}