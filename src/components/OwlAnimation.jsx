import React from 'react';
import { motion } from 'framer-motion';

const OwlAnimation = () => {
  return (
    <motion.div
      className="fixed top-20 sm:top-24 right-4 w-20 h-20 sm:w-24 sm:h-24 cursor-pointer z-40"
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <img
        src="/yoloLogo.svg"
        alt="YOLO Studio Logo"
        className="w-full h-full object-cover rounded-full shadow-lg border-2 border-[#ACFFF7]/30"
      />
    </motion.div>
  );
};

export default OwlAnimation;
