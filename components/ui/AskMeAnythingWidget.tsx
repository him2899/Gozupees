import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import Link from 'next/link';

const AskMeAnythingWidget = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="relative"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors z-10"
          >
            <X className="w-3 h-3" />
          </button>

          {/* Main widget */}
          <Link href="/ask-me-anything">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-2xl cursor-pointer overflow-hidden transition-all duration-300"
            >
              {/* Compact state */}
              <motion.div
                animate={{
                  width: isHovered ? '280px' : '60px',
                  height: isHovered ? '80px' : '60px'
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex items-center p-3"
              >
                {/* GoZupees Logo/Icon */}
                <div className="flex-shrink-0 w-9 h-9 bg-white/10 rounded-full flex items-center justify-center p-1">
                  <img 
                    src="/gozupees-logo.png"
                    alt="GoZupees Logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: 0.1 }}
                      className="ml-3 flex-1"
                    >
                      <div className="text-sm font-semibold">Ask Me Anything</div>
                      <div className="text-xs opacity-90">Chat with Sandeep's AI clone</div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Chat icon (always visible when compact) */}
                {!isHovered && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isHovered ? 0 : 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </motion.div>
                )}
              </motion.div>

              {/* Animated pulse rings */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl"
                />
              </div>
            </motion.div>
          </Link>

          {/* Floating notification dot */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute -top-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AskMeAnythingWidget;