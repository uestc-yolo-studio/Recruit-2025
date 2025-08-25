import React from 'react';
import { motion } from 'framer-motion';

const StudioLogo = () => {
  return (
    <motion.div
      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 relative mx-auto"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-[#0052AA] rounded-full opacity-30 blur-xl" />
      <img
        src="/yoloLogo.svg"
        alt="YOLO Studio Logo"
        className="w-full h-full object-cover rounded-full border-2 sm:border-3 md:border-4 border-[#ACFFF7] shadow-lg"
      />
    </motion.div>
  );
};

export default StudioLogo;
