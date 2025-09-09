import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const NavCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const targetDate = new Date('2025-10-09T23:59:59');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <motion.div 
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#e1aa70] text-slate-900 shadow-sm hover:brightness-105 transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Clock className="w-4 h-4" />
      {isExpired ? (
        <span className="text-xs sm:text-sm font-semibold">已结束</span>
      ) : (
        <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
          {timeLeft.days}天 {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </span>
      )}
    </motion.div>
  );
};

export default NavCountdown;


