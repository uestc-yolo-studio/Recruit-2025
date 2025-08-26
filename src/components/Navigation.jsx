import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrainCircuitIcon, Github, ImageIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0c7eb4] via-[#0c7eb4]/95 to-[#0c7eb4] backdrop-blur-md border-b border-[#0c7eb4]/40 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center cursor-pointer gap-3"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
              <img
                src="/yoloLogo.svg"
                alt="YOLO Studio Logo"
                className="w-full h-full object-cover rounded-full border-2 border-white/30"
              />
            </div>
            <span className="text-white font-bold text-lg sm:text-xl tracking-tight">
              YOLO工作室
            </span>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <motion.button
              onClick={() => navigate('/')}
              className={`px-3 py-2 rounded-xl text-sm sm:text-base font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-white bg-white/20' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              首页
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/questions')}
              className={`px-4 py-2 rounded-xl text-sm sm:text-base font-medium transition-colors flex items-center gap-2 ${
                location.pathname === '/questions' 
                  ? 'text-white bg-white/30' 
                  : 'text-white bg-white/20 hover:bg-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BrainCircuitIcon className="w-4 h-4" />
              招新答题
            </motion.button>

            <motion.button
              onClick={() => navigate('/photos')}
              className={`px-4 py-2 rounded-xl text-sm sm:text-base font-medium transition-colors flex items-center gap-2 ${
                location.pathname === '/photos' 
                  ? 'text-white bg-white/30' 
                  : 'text-white bg-white/20 hover:bg-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ImageIcon className="w-4 h-4" />
              照片墙
            </motion.button>

            {/* GitHub Button */}
            <motion.a
              href="https://github.com/uestc-yolo-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="GitHub 仓库"
            >
              <Github className="w-4 h-4" />
            </motion.a>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
