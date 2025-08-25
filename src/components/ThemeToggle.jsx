import React from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: 'light', icon: Sun, label: '亮色模式' },
    { name: 'dark', icon: Moon, label: '暗色模式' },
    { name: 'system', icon: Monitor, label: '系统模式' }
  ];

  const currentTheme = themes.find(t => t.name === theme) || themes[2];
  const IconComponent = currentTheme.icon;

  const cycleTheme = () => {
    const currentIndex = themes.findIndex(t => t.name === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].name);
  };

  return (
    <motion.button
      onClick={cycleTheme}
      className="p-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={currentTheme.label}
    >
      <IconComponent className="w-4 h-4" />
    </motion.button>
  );
};

export default ThemeToggle; 