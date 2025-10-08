'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, MessageCircle, User, Bot } from 'lucide-react';
import Vapi from '@vapi-ai/web';

interface CallManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  agentId?: string;
  publicKey?: string;
}

interface TranscriptMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const CallManagementModal: React.FC<CallManagementModalProps> = ({
  isOpen,
  onClose,
  agentName,
  agentId,
  publicKey
}) => {
  const [vapi, setVapi] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'ended' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const transcriptRef = useRef<HTMLDivElement>(null);
  const callStartTime = useRef<Date | null>(null);
  const durationInterval = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll transcript to bottom
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  // Call duration timer
  useEffect(() => {
    if (isCallActive && callStartTime.current) {
      durationInterval.current = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - callStartTime.current!.getTime()) / 1000);
        setCallDuration(diff);
      }, 1000);
    } else {
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
        durationInterval.current = null;
      }
    }

    return () => {
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
      }
    };
  }, [isCallActive]);

  // Add transcript message
  const addTranscriptMessage = (type: 'user' | 'assistant' | 'system', content: string) => {
    const message: TranscriptMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setTranscript(prev => [...prev, message]);
  };

  // Format call duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start VAPI call
  const startCall = async () => {
    console.log('Starting call with:', { agentName, agentId, publicKey: publicKey?.substring(0, 8) + '...' });
    
    if (!publicKey || !agentId) {
      console.error('Missing VAPI configuration:', { publicKey: !!publicKey, agentId: !!agentId });
      setErrorMessage('Missing VAPI configuration');
      setConnectionStatus('error');
      return;
    }

    try {
      setIsConnecting(true);
      setConnectionStatus('connecting');
      setErrorMessage('');
      addTranscriptMessage('system', `Connecting to ${agentName}...`);

      // Initialize VAPI instance
      const vapiInstance = new Vapi(publicKey);
      setVapi(vapiInstance);

      // Set up event listeners
      vapiInstance.on('call-start', () => {
        console.log('VAPI call started successfully');
        setIsConnecting(false);
        setIsCallActive(true);
        setConnectionStatus('connected');
        callStartTime.current = new Date();
        addTranscriptMessage('system', `Connected to ${agentName}`);
      });

      vapiInstance.on('call-end', () => {
        console.log('VAPI call ended');
        setIsCallActive(false);
        setConnectionStatus('ended');
        callStartTime.current = null;
        addTranscriptMessage('system', 'Call ended');
      });

      vapiInstance.on('speech-start', () => {
        console.log('User started speaking');
        setIsListening(false);
      });

      vapiInstance.on('speech-end', () => {
        console.log('User stopped speaking');
        setIsListening(true);
      });

      vapiInstance.on('message', (message: any) => {
        console.log('VAPI message:', message);
        if (message.type === 'transcript' && message.transcriptType === 'final') {
          if (message.role === 'user') {
            addTranscriptMessage('user', message.transcript);
          } else if (message.role === 'assistant') {
            addTranscriptMessage('assistant', message.transcript);
          }
        }
      });

      vapiInstance.on('error', (error: any) => {
        console.error('VAPI error:', error);
        setErrorMessage(error.message || 'Call failed');
        setConnectionStatus('error');
        setIsConnecting(false);
        setIsCallActive(false);
        addTranscriptMessage('system', `Error: ${error.message || 'Call failed'}`);
      });

      // Start the call
      console.log('Attempting VAPI start with agentId:', agentId);
      await vapiInstance.start(agentId);

    } catch (error: any) {
      console.error('Error starting VAPI call:', error);
      setErrorMessage(error.message || 'Failed to start call');
      setConnectionStatus('error');
      setIsConnecting(false);
      addTranscriptMessage('system', `Error: ${error.message || 'Failed to start call'}`);
    }
  };

  // End VAPI call
  const endCall = async () => {
    if (vapi) {
      try {
        console.log('Ending VAPI call');
        await vapi.stop();
        setIsCallActive(false);
        setConnectionStatus('ended');
        callStartTime.current = null;
        addTranscriptMessage('system', 'Call ended by user');
      } catch (error: any) {
        console.error('Error ending VAPI call:', error);
        addTranscriptMessage('system', `Error ending call: ${error.message}`);
      }
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (vapi) {
      try {
        if (isMuted) {
          vapi.setMuted(false);
          addTranscriptMessage('system', 'Microphone unmuted');
        } else {
          vapi.setMuted(true);
          addTranscriptMessage('system', 'Microphone muted');
        }
        setIsMuted(!isMuted);
      } catch (error) {
        console.error('Error toggling mute:', error);
      }
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (isCallActive && vapi) {
      endCall();
    }
    setVapi(null);
    setTranscript([]);
    setCallDuration(0);
    setConnectionStatus('idle');
    setErrorMessage('');
    onClose();
  };

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      if (vapi && isCallActive) {
        endCall();
      }
      setVapi(null);
      setTranscript([]);
      setCallDuration(0);
      setConnectionStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-blue-900 p-6 text-white border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{agentName}</h2>
                  <p className="text-gray-300 text-sm">
                    {connectionStatus === 'idle' && 'Ready to connect'}
                    {connectionStatus === 'connecting' && 'Connecting...'}
                    {connectionStatus === 'connected' && `Connected • ${formatDuration(callDuration)}`}
                    {connectionStatus === 'ended' && 'Call ended'}
                    {connectionStatus === 'error' && 'Connection failed'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Transcript Area */}
          <div className="flex-1 p-6 h-96 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Conversation
                </h3>
                {isListening && isCallActive && (
                  <div className="flex items-center text-green-600 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    Listening...
                  </div>
                )}
              </div>

              <div
                ref={transcriptRef}
                className="flex-1 overflow-y-auto space-y-3 bg-gray-800 rounded-lg p-4 border border-gray-700"
              >
                {transcript.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Conversation will appear here...</p>
                  </div>
                ) : (
                  transcript.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : message.type === 'assistant'
                            ? 'bg-gray-700 border border-gray-600 text-gray-100'
                            : 'bg-gray-600 text-gray-300 text-sm'
                        }`}
                      >
                        {message.type !== 'system' && (
                          <div className="flex items-center mb-1">
                            {message.type === 'user' ? (
                              <User className="w-3 h-3 mr-1" />
                            ) : (
                              <Bot className="w-3 h-3 mr-1" />
                            )}
                            <span className="text-xs opacity-75">
                              {message.type === 'user' ? 'You' : agentName}
                            </span>
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-50 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mx-6 mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Controls */}
          <div className="p-6 border-t border-gray-700 bg-gray-800">
            <div className="flex items-center justify-center space-x-4">
              {!isCallActive ? (
                <button
                  onClick={startCall}
                  disabled={isConnecting || connectionStatus === 'connecting'}
                  className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 disabled:bg-gray-600 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2 shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  <span>{isConnecting ? 'Connecting...' : 'Start Call'}</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={toggleMute}
                    className={`${
                      isMuted ? 'bg-red-900/30 text-red-400 border-red-500/30' : 'bg-gray-700 text-gray-300 border-gray-600'
                    } border hover:bg-gray-600 px-4 py-3 rounded-full transition-colors flex items-center space-x-2`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                  </button>

                  <button
                    onClick={endCall}
                    className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2 shadow-lg"
                  >
                    <PhoneOff className="w-5 h-5" />
                    <span>End Call</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CallManagementModal;