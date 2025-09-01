import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrainCircuitIcon, Github, ImageIcon, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMobileMenu();
  };

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
            className="flex items-center cursor-pointer gap-2 sm:gap-3"
            onClick={() => handleNavigation('/')}
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
            <span className="text-white font-bold text-base sm:text-lg lg:text-xl tracking-tight">
              YOLO工作室
            </span>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <motion.button
              onClick={() => handleNavigation('/')}
              className={`px-3 py-2 rounded-xl text-sm lg:text-base font-medium transition-colors ${
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
              onClick={() => handleNavigation('/questions')}
              className={`px-4 py-2 rounded-xl text-sm lg:text-base font-medium transition-colors flex items-center gap-2 ${
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
              onClick={() => handleNavigation('/photos')}
              className={`px-4 py-2 rounded-xl text-sm lg:text-base font-medium transition-colors flex items-center gap-2 ${
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <motion.button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20"
          >
            <div className="px-4 py-4 space-y-3">
              <motion.button
                onClick={() => handleNavigation('/')}
                className={`w-full px-4 py-3 rounded-xl text-base font-medium transition-colors text-left ${
                  location.pathname === '/' 
                    ? 'text-white bg-white/20' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                首页
              </motion.button>
              
              <motion.button
                onClick={() => handleNavigation('/questions')}
                className={`w-full px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center gap-3 ${
                  location.pathname === '/questions' 
                    ? 'text-white bg-white/30' 
                    : 'text-white bg-white/20 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BrainCircuitIcon className="w-5 h-5" />
                招新答题
              </motion.button>

              <motion.button
                onClick={() => handleNavigation('/photos')}
                className={`w-full px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center gap-3 ${
                  location.pathname === '/photos' 
                    ? 'text-white bg-white/30' 
                    : 'text-white bg-white/20 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ImageIcon className="w-5 h-5" />
                照片墙
              </motion.button>

              <motion.a
                href="https://github.com/uestc-yolo-studio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center gap-3 text-white bg-white/20 hover:bg-white/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-5 h-5" />
                GitHub 仓库
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
