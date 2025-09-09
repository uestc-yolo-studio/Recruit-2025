import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpanded, setIsExpanded] = useState(true);

  // 设置目标时间：2025年10月9日23:59:59
  const targetDate = new Date('2025-10-09T23:59:59');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // 立即执行一次
    updateTimer();
    
    // 设置定时器
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && 
                   timeLeft.minutes === 0 && timeLeft.seconds === 0;

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-20 left-4 z-40"
    >
      <motion.div
        animate={{
          boxShadow: isUrgent 
            ? "0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            : "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
        }}
        transition={{ duration: 0.5 }}
        className={`relative bg-gradient-to-br ${
          isUrgent 
            ? 'from-red-900/95 via-red-800/90 to-red-900/95 border-red-400/60' 
            : 'from-slate-900/95 via-gray-900/90 to-slate-900/95 border-white/30'
        } backdrop-blur-xl border rounded-2xl p-5 shadow-2xl overflow-hidden`}
      >
        {/* 背景装饰效果 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
        
        {/* 紧急状态指示器 */}
        {isUrgent && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-3 -right-3"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-7 h-7 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <Zap className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>
        )}

        <div className="relative z-10">
          {/* 标题区域 - 只在展开时显示 */}
          <motion.div 
            className="flex items-center justify-between mb-4"
            animate={{ 
              scale: isUrgent ? 1.02 : 1,
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ 
                  rotate: isUrgent ? 360 : 0,
                  scale: isUrgent ? 1.1 : 1
                }}
                transition={{ 
                  duration: 1, 
                  repeat: isUrgent ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className={`p-2 rounded-lg ${
                  isUrgent 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-[#e1aa70]/20 text-[#e1aa70]'
                }`}
              >
                <Clock className="h-4 w-4" />
              </motion.div>
              <div>
                <span className={`text-sm font-semibold ${
                  isUrgent ? 'text-red-200' : 'text-white'
                }`}>
                  {isExpired ? '已结束' : isUrgent ? '‼️距提交截止只剩' : '☺️距提交截止还剩'}
                </span>
                <div className="flex items-center space-x-1 mt-1">
                  <Calendar className="h-3 w-3 text-white/60" />
                  <span className="text-xs text-white/60">2025年10月9日23:59:59</span>
                </div>
              </div>
            </div>
            
            {/* 展开收起按钮 */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isUrgent 
                  ? 'hover:bg-red-500/20 text-red-300' 
                  : 'hover:bg-white/10 text-white/70'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </motion.div>
            </motion.button>
          </motion.div>

          {/* 收起状态下的紧凑倒计时 */}
          {!isExpanded && !isExpired && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gradient-to-r from-white/5 to-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/10 mb-4"
            >
              <div className="flex items-center justify-center space-x-3">
                {/* 天数 */}
                <div className="flex items-center space-x-1">
                  <span className={`text-xl font-bold ${
                    isUrgent ? 'text-red-300' : 'text-[#e1aa70]'
                  }`}>
                    {timeLeft.days}
                  </span>
                  <span className="text-sm text-white/60 font-medium">天</span>
                </div>
                
                <motion.span 
                  className={`text-lg ${isUrgent ? 'text-red-400' : 'text-[#e1aa70]'}`}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  :
                </motion.span>
                
                {/* 小时 */}
                <div className="flex items-center space-x-1">
                  <span className={`text-xl font-bold ${
                    isUrgent ? 'text-red-300' : 'text-[#e1aa70]'
                  }`}>
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </span>
                  <span className="text-sm text-white/60 font-medium">时</span>
                </div>
                
                <motion.span 
                  className={`text-lg ${isUrgent ? 'text-red-400' : 'text-[#e1aa70]'}`}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                >
                  :
                </motion.span>
                
                {/* 分钟 */}
                <div className="flex items-center space-x-1">
                  <span className={`text-xl font-bold ${
                    isUrgent ? 'text-red-300' : 'text-[#e1aa70]'
                  }`}>
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </span>
                  <span className="text-sm text-white/60 font-medium">分</span>
                </div>
                
                <motion.span 
                  className={`text-lg ${isUrgent ? 'text-red-400' : 'text-[#e1aa70]'}`}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 1 }}
                >
                  :
                </motion.span>
                
                {/* 秒钟 */}
                <motion.div 
                  className="flex items-center space-x-1"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className={`text-xl font-bold ${
                    isUrgent ? 'text-red-300' : 'text-[#e1aa70]'
                  }`}>
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </span>
                  <span className="text-sm text-white/60 font-medium">秒</span>
                </motion.div>
              </div>
              
              {/* 背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg"></div>
            </motion.div>
          )}

          {/* 收起状态下的按钮 */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center mb-4"
            >
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isUrgent 
                    ? 'hover:bg-red-500/20 text-red-300 bg-red-500/10' 
                    : 'hover:bg-white/10 text-white/70 bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-2">
                  <ChevronDown className="h-4 w-4" />
                  <span className="text-sm font-medium">展开详情</span>
                </div>
              </motion.button>
            </motion.div>
          )}
          
          <motion.div
            initial={false}
            animate={{ 
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ 
              duration: 0.3, 
              ease: "easeInOut" 
            }}
            className="overflow-hidden"
          >
            {!isExpired ? (
              <div className="grid grid-cols-4 gap-3">
              {/* 天数 */}
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`relative bg-gradient-to-br ${
                  isUrgent 
                    ? 'from-red-500/20 to-red-600/20 border-red-400/30' 
                    : 'from-[#e1aa70]/20 to-[#e99a28]/20 border-[#e1aa70]/30'
                } border rounded-xl p-3 backdrop-blur-sm`}>
                  <div className={`text-2xl font-bold ${
                    isUrgent ? 'text-red-300' : 'text-[#e1aa70]'
                  }`}>
                    {timeLeft.days.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-white/60 mt-1 font-medium">天</div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-xl"></div>
                </div>
              </motion.div>

              {/* 小时 */}
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`relative bg-gradient-to-br ${
                  isUrgent 
                    ? 'from-red-500/20 to-red-600/20 border-red-400/30' 
                    : 'from-[#e1aa70]/20 to-[#e99a28]/20 border-[#e1aa70]/30'
                } border rounded-xl p-3 backdrop-blur-sm`}>
                  <div className={`text-2xl font-bold ${
                    isUrgent ? 'text-red-300' : 'text-[#e1aa70]'
                  }`}>
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-white/60 mt-1 font-medium">时</div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-xl"></div>
                </div>
              </motion.div>

              {/* 分钟 */}
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`relative bg-gradient-to-br ${
                  isUrgent 
                    ? 'from-red-500/20 to-red-600/20 border-red-400/30' 
                    : 'from-[#e1aa70]/20 to-[#e99a28]/20 border-[#e1aa70]/30'
                } border rounded-xl p-3 backdrop-blur-sm`}>
                  <div className={`text-2xl font-bold ${
                    isUrgent ? 'text-red-300' : 'text-[#e1aa70]'
                  }`}>
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-white/60 mt-1 font-medium">分</div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-xl"></div>
                </div>
              </motion.div>

              {/* 秒钟 */}
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`relative bg-gradient-to-br ${
                  isUrgent 
                    ? 'from-red-500/20 to-red-600/20 border-red-400/30' 
                    : 'from-[#e1aa70]/20 to-[#e99a28]/20 border-[#e1aa70]/30'
                } border rounded-xl p-3 backdrop-blur-sm`}>
                  <motion.div 
                    className={`text-2xl font-bold ${
                      isUrgent ? 'text-red-300' : 'text-[#e1aa70]'
                    }`}
                    animate={{ 
                      scale: [1, 1.05, 1],
                      color: isUrgent ? '#fca5a5' : '#fbbf24'
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </motion.div>
                  <div className="text-xs text-white/60 mt-1 font-medium">秒</div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-xl"></div>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div 
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-400/30 rounded-xl p-4 backdrop-blur-sm">
                <motion.div 
                  className="text-lg font-bold text-red-300 flex items-center justify-center space-x-2"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    color: ['#fca5a5', '#f87171', '#fca5a5']
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Zap className="h-5 w-5" />
                  <span>时间已到</span>
                </motion.div>
                <div className="text-xs text-red-200/80 mt-2 font-medium">
                  2025年10月9日 23:59:59
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-500/5 to-transparent rounded-xl"></div>
              </div>
            </motion.div>
          )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CountdownTimer;