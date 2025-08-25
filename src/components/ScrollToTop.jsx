import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      
      setScrollProgress(scrollPercent);
      
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // 初始检查
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed top-1/2 right-8 z-[9999] w-14 h-14 bg-gradient-to-br from-[#0c7eb4] to-[#6da4aa] rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-sm text-white flex items-center justify-center cursor-pointer transform -translate-y-1/2"
          initial={{ 
            opacity: 0, 
            scale: 0, 
            y: 50
          }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0, 
            y: 50
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 20px 25px -5px rgba(12, 126, 180, 0.4)'
          }}
          whileTap={{ 
            scale: 0.95
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20
          }}
        >
          {/* 圆形进度条背景 */}
          <svg
            className="absolute inset-0 w-full h-full transform -rotate-90"
            viewBox="0 0 56 56"
          >
            {/* 背景圆环 */}
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="3"
              fill="none"
            />
            {/* 进度圆环 */}
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
              style={{
                transition: 'stroke-dashoffset 0.3s ease'
              }}
            />
          </svg>

          {/* 箭头图标 */}
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white relative z-10"
            animate={{ y: [0, -1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <path
              d="M12 4L12 20M12 4L6 10M12 4L18 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 