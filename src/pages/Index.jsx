import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedCard from '../components/AnimatedCard';
import MarkdownRenderer from '../components/MarkdownRenderer';
import GradientBackground from '../components/GradientBackground';
import ColorInverseArea from '../components/ColorInverseArea';
import { ArrowRight, Users, Code, Trophy, GraduationCap, Award, MapPin, Heart } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [aboutUs, setAboutUs] = useState('');
  const [directions, setDirections] = useState('');
  const [benefits, setBenefits] = useState('');
  const [achievements, setAchievements] = useState('');
  const [graduation, setGraduation] = useState('');

  useEffect(() => {
    // 加载所有 Markdown 内容
    Promise.all([
      fetch('/content/about-us.md').then(res => res.text()),
      fetch('/content/directions.md').then(res => res.text()),
      fetch('/content/benefits.md').then(res => res.text()),
      fetch('/content/achievements.md').then(res => res.text()),
      fetch('/content/graduation.md').then(res => res.text()),
    ]).then(([about, dir, ben, ach, grad]) => {
      setAboutUs(about);
      setDirections(dir);
      setBenefits(ben);
      setAchievements(ach);
      setGraduation(grad);
    });
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3,
        duration: 0.8
      }
    }
  };

  return (
    <GradientBackground>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* 主标题区域 */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          {/* 圆形Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ 
              scale: 1.1, 
              rotate: 360,
              transition: { duration: 0.6, type: "spring" }
            }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto mb-8 relative z-10 cursor-pointer"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0c7eb4] to-[#6da4aa] rounded-full opacity-20 blur-xl animate-pulse" />
              <img
                src="/yoloLogo.svg"
                alt="YOLO Studio Logo"
                className="w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl relative z-20"
              />
            </div>
          </motion.div>
          
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 text-[hsl(var(--text-primary))] drop-shadow-lg tracking-tight"
          >
            YOLO工作室招新
          </motion.h1>
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className="text-xl sm:text-2xl lg:text-3xl text-[hsl(var(--text-secondary))] drop-shadow px-4 font-medium"
          >
            You Only Live Once
          </motion.p>
        </div>

        {/* 关于我们模块 - 蓝色主题 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-6 h-6 text-[#0c7eb4]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white dark:text-[#0c7eb4]">关于我们</h2>
          </div>
          <ColorInverseArea backgroundColor="#0c7eb4">
            <AnimatedCard className="bg-gradient-to-r from-[#0c7eb4] via-[#0c7eb4]/90 to-[#0c7eb4] animate-gradient p-8 sm:p-10 lg:p-12 border-[#0c7eb4]/30">
              <div className="text-white text-base sm:text-lg leading-relaxed">
                <MarkdownRenderer content={aboutUs} theme="blue" />
              </div>
            </AnimatedCard>
          </ColorInverseArea>
        </motion.div>

        {/* 聚焦方向模块 - 青色主题 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12 sm:mb-16"
        >
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Code className="w-6 h-6 text-[#6da4aa]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white dark:text-[#6da4aa]">聚焦方向</h2>
          </div>
          <ColorInverseArea backgroundColor="#6da4aa">
            <AnimatedCard className="bg-gradient-to-r from-[#6da4aa] via-[#6da4aa]/90 to-[#6da4aa] animate-gradient p-8 sm:p-10 lg:p-12 border-[#6da4aa]/30">
              <div className="text-white text-base sm:text-lg leading-relaxed">
                <MarkdownRenderer content={directions} theme="cyan" />
              </div>
            </AnimatedCard>
          </ColorInverseArea>
        </motion.div>

        {/* 加入我们获得什么模块 - 橙色主题 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-[#e1aa70]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white dark:text-[#8B4513]">加入我们，你可以获得</h2>
          </div>
          <ColorInverseArea backgroundColor="#e1aa70">
            <AnimatedCard className="bg-gradient-to-r from-[#e1aa70] via-[#e1aa70]/90 to-[#e1aa70] animate-gradient p-8 sm:p-10 lg:p-12 border-[#e1aa70]/30">
              <div className="text-white text-base sm:text-lg leading-relaxed">
                <MarkdownRenderer content={benefits} theme="orange" />
              </div>
            </AnimatedCard>
          </ColorInverseArea>
        </motion.div>

        {/* 获奖情况模块 - 金色主题 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-[#e99a28]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white dark:text-[#8B4513]">获奖情况</h2>
          </div>
          <ColorInverseArea backgroundColor="#e99a28">
            <AnimatedCard className="bg-gradient-to-r from-[#e99a28] via-[#e99a28]/90 to-[#e99a28] animate-gradient p-8 sm:p-10 lg:p-12 border-[#e99a28]/30">
              <div className="text-white text-base sm:text-lg leading-relaxed">
                <MarkdownRenderer content={achievements} theme="gold" />
              </div>
            </AnimatedCard>
          </ColorInverseArea>
        </motion.div>

        {/* 毕业去向模块 - 浅青色主题 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-12 sm:mb-16"
        >
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-[#a3d4d1]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white dark:text-[#2F4F4F]">毕业去向</h2>
          </div>
          <ColorInverseArea backgroundColor="#a3d4d1">
            <AnimatedCard className="bg-gradient-to-r from-[#a3d4d1] via-[#a3d4d1]/90 to-[#a3d4d1] animate-gradient p-8 sm:p-10 lg:p-12 border-[#a3d4d1]/30">
              <div className="text-white text-base sm:text-lg leading-relaxed">
                <MarkdownRenderer content={graduation} theme="lightCyan" />
              </div>
            </AnimatedCard>
          </ColorInverseArea>
        </motion.div>

        {/* 加入我们按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <ColorInverseArea backgroundColor="#0c7eb4">
            <AnimatedCard className="flex flex-col justify-center items-center bg-gradient-to-r from-[#0c7eb4] via-[#0c7eb4]/90 to-[#0c7eb4] animate-gradient p-8 sm:p-10 lg:p-12 border-[#0c7eb4]/30">
              <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-[#0c7eb4]" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-white drop-shadow-lg text-center tracking-tight">
                加入我们
              </h2>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--text-accent))' }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#0c7eb4] font-semibold py-4 sm:py-5 px-8 sm:px-10 rounded-full text-lg sm:text-xl flex items-center gap-3 shadow-lg transition-colors hover:text-[#0c7eb4] w-full sm:w-auto justify-center border-2 border-white/30"
                onClick={() => navigate('/questions')}
              >
                开始招新答题
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </AnimatedCard>
          </ColorInverseArea>
        </motion.div>
      </div>
    </GradientBackground>
  );
};

export default Index;
