'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GradientHeading from '../ui/GradientHeading';

interface HermesHeroProps {
  currentDate: string;
}

export default function HermesHero({ currentDate }: HermesHeroProps) {
  // Add useEffect to help prevent hydration errors by ensuring client-side rendering only
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Background animation effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: { x: number; y: number; size: number; vx: number; vy: number }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      
      // Create particles
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3
        });
      }
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    const draw = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update particles
      particles.forEach((p) => {
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
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Use a simpler skeleton loader to avoid hydration errors
  if (!isClient) {
    return null; // Return null on server-side to prevent hydration errors
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 z-0"></div>
      
      {/* Glowing orbs effect */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-[100px] opacity-15 z-0"></div>
      <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-purple-500 rounded-full filter blur-[100px] opacity-15 z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <div className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm font-medium mb-6">
              Supercharge Your Sales Team
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <GradientHeading 
                level={1}
                highlightWords="Our AI Won't."
                fullGradient={false}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-tight mb-6 text-white"
              >
                Your Sales Team Forgot About These Leads. Our AI Won't.
              </GradientHeading>
            </motion.div>
            
            <motion.p 
              className="text-2xl text-gray-300 mb-4 max-w-xl mx-auto lg:mx-0 font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Stop wasting paid traffic and database leads. Recover revenue from the 70% who went silent.
            </motion.p>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Revive your cold leads, missed demos, and inactive buyers. Zero lift. Full automation. New revenue every month.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/hermes/demo" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-md hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg duration-300 hover:shadow-blue-600/30 flex items-center justify-center gap-2">
                See How It Works <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="/hermes/pricing" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-md hover:bg-white/20 transition-all duration-300 shadow-md">
                Calculate Money Saved
              </Link>
            </motion.div>
            
            {/* Feature Highlights */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-6">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-green-500/20 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white">Works for B2B & eComm</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-green-500/20 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white">100% automated</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-green-500/20 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white">3X cheaper than ads</span>
                </div>
              </div>
            </motion.div>
            
            {/* Key Metrics */}
            <motion.div
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">3X</p>
                <p className="text-gray-300 text-sm">More Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">70%</p>
                <p className="text-gray-300 text-sm">Cost Reduction</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">100%</p>
                <p className="text-gray-300 text-sm">Automated</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">0</p>
                <p className="text-gray-300 text-sm">Manual Work</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Hero Right - Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative">
              {/* Gradient glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-20 blur-3xl"></div>
              
              {/* Dashboard container */}
              <div className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 p-1 rounded-3xl border border-gray-700">
                <div className="bg-gray-900 rounded-[22px] p-6 h-full">
                  {/* Dashboard header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-sm text-gray-400">AI Sales Agent Dashboard</span>
                    <div className="w-3"></div>
                  </div>
                  
                  {/* Campaign header */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-semibold text-lg">Lead Reactivation Campaign</h3>
                    <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full">Active</span>
                  </div>
                  
                  {/* Conversation thread */}
                  <div className="space-y-3 mb-4">
                    {/* Message 1 */}
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500/30 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg text-sm text-gray-300 max-w-[90%]">
                        Hi Sarah, I noticed you downloaded our whitepaper on "Scaling B2B Sales" but we haven't connected since. I'd love to learn what challenges you're facing with lead conversion.
                      </div>
                    </div>
                    
                    {/* Message 2 - Client */}
                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-gray-700 p-3 rounded-lg text-sm text-gray-300 max-w-[90%]">
                        Thanks for reaching out. We've been swamped with our Q2 planning. Maybe we can reconnect next quarter?
                      </div>
                      <div className="bg-gray-600 p-2 rounded-full flex-shrink-0">
                        <span className="text-white text-xs font-medium">SC</span>
                      </div>
                    </div>
                    
                    {/* Message 3 */}
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500/30 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg text-sm text-gray-300 max-w-[90%]">
                        I understand Q2 planning is a busy time. Actually, our latest case study shows how Company X saved 15 hours per week on lead follow-up during their busy season. Would a 15-minute call next Tuesday at 10am work to briefly discuss if this could help your team too?
                      </div>
                    </div>
                    
                    {/* Waiting indicator */}
                    <div className="flex justify-center">
                      <span className="bg-gray-800/60 text-gray-400 text-xs px-4 py-1 rounded-full flex items-center">
                        <svg className="animate-pulse h-2 w-2 mr-2 text-blue-400" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" fill="currentColor" />
                        </svg>
                        Waiting for response
                      </span>
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <div className="flex items-center mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        <span className="text-xs text-gray-400">Response Rate</span>
                      </div>
                      <div className="text-2xl font-bold text-white">68%</div>
                      <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <div className="flex items-center mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-gray-400">Meetings Set</span>
                      </div>
                      <div className="text-2xl font-bold text-white">23</div>
                      <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '55%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Latest Conversions */}
                  <div className="bg-gray-800/50 rounded-lg overflow-hidden">
                    <div className="flex justify-between items-center px-3 py-2">
                      <span className="text-white text-sm font-medium">Latest Conversions</span>
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">+5 Today</span>
                    </div>
                    
                    <div className="divide-y divide-gray-700">
                      <div className="px-3 py-2 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-700 w-6 h-6 rounded-md flex items-center justify-center">
                            <span className="text-xs text-white">JD</span>
                          </div>
                          <span className="text-sm text-gray-300">John Doe (Acme Inc)</span>
                        </div>
                        <span className="text-green-400 text-xs flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Meeting Set
                        </span>
                      </div>
                      <div className="px-3 py-2 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-700 w-6 h-6 rounded-md flex items-center justify-center">
                            <span className="text-xs text-white">LS</span>
                          </div>
                          <span className="text-sm text-gray-300">Lisa Smith (TechCorp)</span>
                        </div>
                        <span className="text-purple-400 text-xs flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          Demo Scheduled
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}