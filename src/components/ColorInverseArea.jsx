import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

const ColorInverseArea = ({ children, className = '', backgroundColor = '#0c7eb4' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // 五个主题颜色 - 使用更明显的颜色差异
  const themeColors = ['#e1aa70', '#e99a28', '#0c7eb4', '#6da4aa', '#a3d4d1'];

  const [effectColors, setEffectColors] = useState({
    primary: 'rgba(255, 255, 255, 1.0)',
    secondary: 'rgba(255, 255, 255, 0.9)',
    accent: 'rgba(255, 255, 255, 0.95)'
  });

  // 检测主题并更新动效颜色
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      
      if (isDark) {
        // 深色模式：使用亮色动效
        setEffectColors({
          primary: 'rgba(255, 255, 255, 1.0)',
          secondary: 'rgba(255, 255, 255, 0.9)',
          accent: 'rgba(255, 255, 255, 0.95)'
        });
      } else {
        // 浅色模式：使用深色动效
        setEffectColors({
          primary: 'rgba(0, 0, 0, 0.9)',
          secondary: 'rgba(0, 0, 0, 0.7)',
          accent: 'rgba(0, 0, 0, 0.8)'
        });
      }
    };

    // 初始检查
    checkTheme();

    // 监听主题变化
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="relative z-10">
        {children}
      </div>
      {isHovering && (
        <>
          {/* 主跟随区域 - 波浪形状 */}
          <motion.div
            className="absolute pointer-events-none z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 0.6, 0.4],
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            style={{
              width: '120px',
              height: '120px',
              left: -60,
              top: -60,
              filter: 'blur(2px)',
              background: `radial-gradient(circle at center, 
                ${effectColors.primary} 0%, 
                ${effectColors.secondary} 25%, 
                ${effectColors.accent.replace('0.8', '0.4').replace('0.9', '0.4')} 50%, 
                ${effectColors.secondary.replace('0.7', '0.2').replace('0.9', '0.2')} 80%, 
                transparent 100%)`,
              borderRadius: '50%',
              transformOrigin: 'center',
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
              mass: 0.3
            }}
          />
          
          {/* 中心五角星 - 相对静止 */}
          <motion.div
            className="absolute pointer-events-none z-50"
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1, 0.9],
              opacity: [0, 0.9, 0.6],
              rotate: [0, 180, 360],
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            style={{
              width: '40px',
              height: '40px',
              left: -20,
              top: -20,
            }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 25,
              mass: 0.1,
              delay: 0.05
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z"
                fill={effectColors.primary}
                stroke={effectColors.secondary}
                strokeWidth="0.5"
              />
            </svg>
          </motion.div>
          
          {/* 从五角星中心发出的脉冲1 */}
          <motion.div
            className="absolute pointer-events-none z-50"
            animate={{ 
              scale: [0, 2.5, 0],
              opacity: [0, 0.6, 0],
            }}
            style={{
              width: '80px',
              height: '80px',
              left: mousePosition.x - 40,
              top: mousePosition.y - 40,
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z"
                fill="none"
                stroke={effectColors.accent}
                strokeWidth="1"
                strokeOpacity="0.8"
              />
            </svg>
          </motion.div>
          
          {/* 从五角星中心发出的脉冲2 */}
          <motion.div
            className="absolute pointer-events-none z-50"
            animate={{ 
              scale: [0, 3.5, 0],
              opacity: [0, 0.4, 0],
            }}
            style={{
              width: '80px',
              height: '80px',
              left: mousePosition.x - 40,
              top: mousePosition.y - 40,
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.6
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z"
                fill="none"
                stroke={effectColors.secondary}
                strokeWidth="0.8"
                strokeOpacity="0.6"
              />
            </svg>
          </motion.div>
          
          {/* 从五角星角尖发出的粒子 */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none z-50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                x: mousePosition.x + Math.cos((i * 72 - 90) * Math.PI / 180) * 30,
                y: mousePosition.y + Math.sin((i * 72 - 90) * Math.PI / 180) * 30,
              }}
              style={{
                width: '8px',
                height: '8px',
                left: -4,
                top: -4,
                background: i % 2 === 0 ? effectColors.primary : effectColors.secondary,
                borderRadius: '50%',
                filter: 'blur(1px)',
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
                mass: 0.1,
                delay: i * 0.1
              }}
            />
          ))}
          
          {/* 十字光标 */}
          <motion.div
            className="absolute pointer-events-none z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1,
              opacity: 0.3,
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            style={{
              width: '20px',
              height: '20px',
              left: -10,
              top: -10,
            }}
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 30,
              mass: 0.05
            }}
          >
            <div className="w-full h-full relative">
              <div 
                className="absolute top-1/2 left-0 w-full h-0.5 transform -translate-y-1/2 opacity-80"
                style={{ backgroundColor: effectColors.accent }}
              ></div>
              <div 
                className="absolute left-1/2 top-0 w-0.5 h-full transform -translate-x-1/2 opacity-60"
                style={{ backgroundColor: effectColors.secondary }}
              ></div>
            </div>
          </motion.div>

          {/* 大泡泡群 */}
          {[...Array(30)].map((_, i) => {
            const size = Math.random() * 100 + 30; // 30-130px 随机大小
            const colorIndex = i % 5;
            const color = themeColors[colorIndex];
            const delay = Math.random() * 3;
            const duration = Math.random() * 4 + 3; // 3-7秒随机持续时间
            
            return (
              <motion.div
                key={`large-bubble-${i}`}
                className="absolute pointer-events-none z-50"
                initial={{ 
                  scale: 0, 
                  opacity: 0,
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight
                }}
                animate={{ 
                  scale: [0, 1, 0.8, 0],
                  opacity: [0, 0.8, 0.6, 0],
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `radial-gradient(circle, ${color}80, ${color}50, ${color}20, transparent)`,
                  borderRadius: '50%',
                  filter: 'blur(2px)',
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut"
                }}
              />
            );
          })}

          {/* 中泡泡群 */}
          {[...Array(40)].map((_, i) => {
            const size = Math.random() * 60 + 15; // 15-75px 随机大小
            const colorIndex = (i + 2) % 5;
            const color = themeColors[colorIndex];
            const delay = Math.random() * 2;
            const duration = Math.random() * 3 + 2; // 2-5秒随机持续时间
            
            return (
              <motion.div
                key={`medium-bubble-${i}`}
                className="absolute pointer-events-none z-40"
                initial={{ 
                  scale: 0, 
                  opacity: 0,
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight
                }}
                animate={{ 
                  scale: [0, 1, 0.7, 0],
                  opacity: [0, 0.9, 0.5, 0],
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `radial-gradient(circle, ${color}90, ${color}60, ${color}30, transparent)`,
                  borderRadius: '50%',
                  filter: 'blur(1px)',
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut"
                }}
              />
            );
          })}

          {/* 小泡泡群 */}
          {[...Array(50)].map((_, i) => {
            const size = Math.random() * 25 + 8; // 8-33px 随机大小
            const colorIndex = (i + 4) % 5;
            const color = themeColors[colorIndex];
            const delay = Math.random() * 4;
            const duration = Math.random() * 5 + 3; // 3-8秒随机持续时间
            
            return (
              <motion.div
                key={`small-bubble-${i}`}
                className="absolute pointer-events-none z-30"
                initial={{ 
                  scale: 0, 
                  opacity: 0,
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight
                }}
                animate={{ 
                  scale: [0, 1, 0.6, 0],
                  opacity: [0, 1, 0.4, 0],
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `radial-gradient(circle, ${color}95, ${color}70, ${color}40, transparent)`,
                  borderRadius: '50%',
                  filter: 'blur(0.5px)',
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default ColorInverseArea;
