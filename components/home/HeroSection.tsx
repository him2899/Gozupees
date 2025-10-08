'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import LeadFormModal from '../ui/LeadFormModal';
import Vapi from '@vapi-ai/web';

interface HeroProps {
  currentDate: string;
}

export default function HeroSection({ currentDate }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeCall, setActiveCall] = useState(false);

  const handleTycheCall = async () => {
    try {
      // Prevent duplicate requests
      if (isConnecting) {
        console.log('Call already connecting');
        return;
      }

      // If there's already an active call, end it
      if (activeCall && vapi) {
        console.log('Ending VAPI call with Tyche');
        vapi.stop();
        setActiveCall(false);
        setVapi(null);
        setIsConnecting(false);
        return;
      }

      setIsConnecting(true);
      setActiveCall(true);

      // Fetch VAPI configuration from API
      const configResponse = await fetch('/api/vapi-config');
      if (!configResponse.ok) {
        throw new Error('Failed to fetch VAPI configuration');
      }

      const config = await configResponse.json();

      if (config.error) {
        console.error('VAPI configuration error:', config.error);
        setActiveCall(false);
        setIsConnecting(false);
        return;
      }

      // Initialize VAPI instance
      const vapiInstance = new Vapi(config.publicKey);
      setVapi(vapiInstance);

      // Set up event listeners
      vapiInstance.on('call-start', () => {
        console.log('VAPI call started successfully');
        setIsConnecting(false);
        setActiveCall(true);
      });

      vapiInstance.on('call-end', () => {
        console.log('VAPI call ended');
        setActiveCall(false);
        setVapi(null);
        setIsConnecting(false);
      });

      vapiInstance.on('error', (error) => {
        console.error('VAPI error:', error);
        setActiveCall(false);
        setVapi(null);
        setIsConnecting(false);
      });

      // Get Tyche's assistant ID
      const assistantId = config.tycheAssistantId;

      if (!assistantId) {
        console.error('Assistant ID not found for Tyche');
        setActiveCall(false);
        setIsConnecting(false);
        return;
      }

      console.log('Starting VAPI call with Tyche');
      await vapiInstance.start(assistantId);
    } catch (error) {
      console.error('Failed to start VAPI call:', error);
      setActiveCall(false);
      setVapi(null);
      setIsConnecting(false);
    }
  };
  
  // Neural network animation effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: { x: number; y: number; size: number; vx: number; vy: number }[] = [];
    let connections: { from: number; to: number; age: number; maxAge: number }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      
      // Create particles
      particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    const draw = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
      });
      
      // Create connections
      if (Math.random() > 0.95 && connections.length < 60) {
        const from = Math.floor(Math.random() * particles.length);
        let to = Math.floor(Math.random() * particles.length);
        while (to === from) to = Math.floor(Math.random() * particles.length);
        
        connections.push({
          from,
          to,
          age: 0,
          maxAge: Math.random() * 100 + 50
        });
      }
      
      // Update and draw connections
      connections = connections.filter(conn => {
        conn.age++;
        
        if (conn.age > conn.maxAge) return false;
        
        const from = particles[conn.from];
        const to = particles[conn.to];
        
        // Calculate opacity based on age
        const opacity = Math.sin((conn.age / conn.maxAge) * Math.PI) * 0.5;
        
        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(100, 149, 237, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        return true;
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark background with blue gradient matching About page */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900"></div>
      
      {/* Larger phone mockups in background - covering 3/4 of screen vertically */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/4 opacity-20">
        <div className="w-56 h-[75vh] bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 rounded-[3rem] border border-gray-500 shadow-2xl p-3">
          <div className="w-full h-full bg-black rounded-[2.5rem] relative">
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4 opacity-20">
        <div className="w-56 h-[75vh] bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 rounded-[3rem] border border-gray-500 shadow-2xl p-3">
          <div className="w-full h-full bg-black rounded-[2.5rem] relative">
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40"></div>

      {/* Content Container */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-6xl mx-auto">
          
          {/* Voice AI Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <div className="flex items-center gap-1">
                <div className="w-1 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-1 h-6 bg-purple-500 rounded-full animate-pulse delay-75"></div>
                <div className="w-1 h-5 bg-pink-500 rounded-full animate-pulse delay-150"></div>
                <div className="w-1 h-7 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                <div className="w-1 h-4 bg-purple-400 rounded-full animate-pulse delay-500"></div>
              </div>
              <span className="text-blue-300 text-sm font-medium">AI Employees Ready to Work</span>
            </div>
          </motion.div>



          {/* Main Headline - Now in Normal Case */}
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI Employees for Sales,<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Marketing & Support
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Hire ready-made AI workers to do the jobs your team can't scale - phone calls, appointments, lead qualification, follow-ups, and more.
          </motion.p>

          {/* Interactive Benefit Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* No Hiring Button */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="bg-white/10 border border-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>No Hiring</span>
              </button>
              {/* Tooltip */}
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                Skip recruitment, interviews, and training
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </motion.div>

            {/* No Burnout Button */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="bg-white/10 border border-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>No Burnout</span>
              </button>
              {/* Tooltip */}
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                AI works 24/7 without getting tired
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </motion.div>

            {/* Just Results Button */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="bg-white/10 border border-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>Just Results</span>
              </button>
              {/* Tooltip */}
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                Measurable outcomes from day one
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">5X</span>
              <span className="text-gray-400 text-sm">PRODUCTIVITY</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">100X</span>
              <span className="text-gray-400 text-sm">SCALABILITY</span>
            </div>
          </motion.div>

          {/* Talk to Tyche Button */}
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div 
              className="relative bg-cover bg-center border-2 border-blue-500/40 backdrop-blur-sm rounded-2xl p-8 text-center overflow-hidden"
              style={{ backgroundImage: 'url(/sound-waves.gif)' }}
            >
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <button 
                  onClick={handleTycheCall}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-10 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-blue-500/25 flex items-center justify-center space-x-3 mx-auto"
                >
                  <Phone className="w-5 h-5" />
                  <span>
                    {isConnecting 
                      ? 'Connecting...' 
                      : activeCall 
                        ? 'Call Active - Click to End' 
                        : 'Talk to Tyche'
                    }
                  </span>
                </button>
                
                <p className="text-white/90 text-sm mt-4 leading-relaxed italic">
                  Meet Tyche, your fortune-bringing sales assistant - named after the Greek goddess of luck and prosperity, ready to help turn opportunities into success.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lead Form Modal */}
      <LeadFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        useCase="General Inquiry"
      />
    </section>
  );
}