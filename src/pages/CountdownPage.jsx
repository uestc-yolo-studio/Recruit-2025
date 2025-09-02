import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Clock, ArrowRight } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';
import GradientBackground from '../components/GradientBackground';
import OwlAnimation from '../components/OwlAnimation';
import { getEncryptedRoute } from '../lib/hashUtils';

const CountdownPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 设置目标时间：2025年9月8号12点
  const targetDate = new Date('2025-09-08T12:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // 时间到了，自动进入招新题页面
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        
        // 延迟1秒后自动跳转，给用户一个视觉反馈
        setTimeout(() => {
          // 设置访问权限标记
          localStorage.setItem('yolo-recruit-access', 'granted');
          navigate(getEncryptedRoute());
        }, 1000);
      }
    }, 1000);

    // 立即执行一次，避免延迟
    const now = new Date();
    const difference = targetDate - now;
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }

    return () => clearInterval(timer);
  }, [targetDate, navigate]);

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 模拟验证延迟
    setTimeout(() => {
      if (passcode === 'YouOnlyLiveOnce0908') {
        // 验证成功，设置访问权限标记并跳转到真正的招新题页面
        localStorage.setItem('yolo-recruit-access', 'granted');
        navigate(getEncryptedRoute());
      } else {
        setError('通行码错误，请重新输入');
      }
      setIsLoading(false);
    }, 500);
  };

  const canEnter = timeLeft.days === 0 && timeLeft.hours === 0 && 
                   timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <GradientBackground>
      <div className="relative z-10">
        <OwlAnimation />
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <Lock className="h-16 w-16 mx-auto text-[#e1aa70] mb-4" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[hsl(var(--text-primary))] tracking-tight mb-4">
                招新考核入口
              </h1>
              <p className="text-lg text-[hsl(var(--text-secondary))]">
                请输入通行码以访问招新考核题目
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <AnimatedCard className="bg-gradient-to-r from-[#0c7eb4] via-[#6da4aa] to-[#e99a28] p-6 sm:p-8 border-[#0c7eb4]/30">
                <div className="flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-white mr-2" />
                  <span className="text-white font-semibold text-lg">开放倒计时</span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="text-2xl sm:text-3xl font-bold text-white">
                        {timeLeft.days.toString().padStart(2, '0')}
                      </div>
                      <div className="text-white/80 text-sm">天</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="text-2xl sm:text-3xl font-bold text-white">
                        {timeLeft.hours.toString().padStart(2, '0')}
                      </div>
                      <div className="text-white/80 text-sm">时</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="text-2xl sm:text-3xl font-bold text-white">
                        {timeLeft.minutes.toString().padStart(2, '0')}
                      </div>
                      <div className="text-white/80 text-sm">分</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="text-2xl sm:text-3xl font-bold text-white">
                        {timeLeft.seconds.toString().padStart(2, '0')}
                      </div>
                      <div className="text-white/80 text-sm">秒</div>
                    </div>
                  </div>
                </div>

                {!canEnter ? (
                  <p className="text-white/80 text-sm">
                    招新考核将于 9月8日 12:00 正式开放
                  </p>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-green-500/20 border border-green-400/30 rounded-lg p-3"
                  >
                    <p className="text-green-400 text-sm font-medium">
                      🎉 倒计时结束！正在自动跳转...
                    </p>
                  </motion.div>
                )}
              </AnimatedCard>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <AnimatedCard className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 border-white/20">
                <form onSubmit={handlePasscodeSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="passcode" className="block text-sm font-medium text-[hsl(var(--text-primary))] mb-2">
                      通行码
                    </label>
                    <input
                      type="password"
                      id="passcode"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="请输入通行码"
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-[hsl(var(--text-primary))] placeholder-[hsl(var(--text-secondary))] focus:outline-none focus:ring-2 focus:ring-[#e1aa70] focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || !passcode.trim()}
                    className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      passcode.trim() && !isLoading
                        ? 'bg-gradient-to-r from-[#e1aa70] to-[#e99a28] text-white hover:from-[#e99a28] hover:to-[#e1aa70] transform hover:scale-105'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <span>进入招新考核</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </button>
                </form>

                {!canEnter ? (
                  <div className="mt-4 text-center">
                    <p className="text-[hsl(var(--text-secondary))] text-sm">
                      😊请输入通行码！
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 text-center">
                    <p className="text-[hsl(var(--text-secondary))] text-sm">
                      🎉 倒计时结束！您可以输入通行码进入，或等待自动跳转
                    </p>
                  </div>
                )}
              </AnimatedCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </GradientBackground>
  );
};

export default CountdownPage;
