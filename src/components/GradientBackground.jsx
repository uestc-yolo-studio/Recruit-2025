import React from 'react';
import { motion } from 'framer-motion';
import BubbleBackground from './BubbleBackground';

const GradientBackground = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <BubbleBackground />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-from))]/90 via-[hsl(var(--gradient-via))]/40 to-[hsl(var(--gradient-to))]/20 animate-gradient"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;
