import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedCard from '../components/AnimatedCard';
import MarkdownRenderer from '../components/MarkdownRenderer';
import OwlAnimation from '../components/OwlAnimation';
import GradientBackground from '../components/GradientBackground';
import ColorInverseArea from '../components/ColorInverseArea';

const Questions = () => {
  const [frontendQuestions, setFrontendQuestions] = useState('');
  const [backendQuestions, setBackendQuestions] = useState('');
  const [machineLearningQuestions, setMachineLearningQuestions] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [cssContent, setCssContent] = useState('');
  const [jsContent, setJsContent] = useState('');
  const [practiceContent, setPracticeContent] = useState('');
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedFrontendTopic, setSelectedFrontendTopic] = useState(null);

  useEffect(() => {
    fetch('/content/frontend-questions.md')
      .then(res => res.text())
      .then(text => setFrontendQuestions(text));

    fetch('/content/backend-questions.md')
      .then(res => res.text())
      .then(text => setBackendQuestions(text));

    fetch('/content/machine-learning-questions.md')
      .then(res => res.text())
      .then(text => setMachineLearningQuestions(text));

    // 加载前端招新题的四个文档
    fetch('/content/fronted-question/1.md')
      .then(res => res.text())
      .then(text => setHtmlContent(text));

    fetch('/content/fronted-question/2.md')
      .then(res => res.text())
      .then(text => setCssContent(text));

    fetch('/content/fronted-question/3.md')
      .then(res => res.text())
      .then(text => setJsContent(text));

    fetch('/content/fronted-question/4.md')
      .then(res => res.text())
      .then(text => setPracticeContent(text));
  }, []);

  const frontendTopics = [
    {
      id: 'html',
      title: 'HTML：结构与语义',
      description: '学习网页的基础结构和语义化标签',
      color: '#3b82f6',
      content: htmlContent
    },
    {
      id: 'css',
      title: 'CSS：视觉呈现与布局',
      description: '掌握样式设计和页面布局技巧',
      color: '#8b5cf6',
      content: cssContent
    },
    {
      id: 'javascript',
      title: 'JavaScript：网页的灵魂与交互',
      description: '学习动态交互和逻辑处理',
      color: '#f59e0b',
      content: jsContent
    },
    {
      id: 'practice',
      title: '前端综合练习：打造"个人作品展示页"',
      description: '综合运用所学知识完成实战项目',
      color: '#10b981',
      content: practiceContent
    }
  ];

  const getContent = () => {
    if (selectedDirection === 'frontend' && selectedFrontendTopic) {
      const topic = frontendTopics.find(t => t.id === selectedFrontendTopic);
      return topic ? topic.content : '';
    }
    
    if (selectedDirection === 'frontend') {
      return frontendQuestions;
    } else if (selectedDirection === 'backend') {
      return backendQuestions;
    } else if (selectedDirection === 'machine-learning') {
      return machineLearningQuestions;
    }
    return '';
  };

  const getCurrentColor = () => {
    if (selectedDirection === 'frontend' && selectedFrontendTopic) {
      const topic = frontendTopics.find(t => t.id === selectedFrontendTopic);
      return topic ? topic.color : '#0c7eb4';
    }
    
    if (selectedDirection === 'frontend') return '#0c7eb4';
    if (selectedDirection === 'backend') return '#6da4aa';
    if (selectedDirection === 'machine-learning') return '#e99a28';
    return '#0c7eb4';
  };

  const handleBack = () => {
    if (selectedDirection === 'frontend' && selectedFrontendTopic) {
      setSelectedFrontendTopic(null);
    } else {
      setSelectedDirection(null);
    }
  };

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
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[hsl(var(--text-primary))] tracking-tight">
              招新考核题目
            </h1>
          </div>
          
          {!selectedDirection ? (
            <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
              <ColorInverseArea backgroundColor="#0c7eb4">
                <motion.div
                  onClick={() => setSelectedDirection('frontend')}
                >
                  <AnimatedCard className="cursor-pointer bg-gradient-to-r from-[#0c7eb4] via-[#0c7eb4]/90 to-[#0c7eb4] animate-gradient p-6 sm:p-8 border-[#0c7eb4]/30">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 text-white text-center tracking-tight">
                      前端方向
                    </h2>
                    <p className="text-white text-base sm:text-lg text-center font-medium">
                      探索用户界面和交互体验的奥秘
                    </p>
                  </AnimatedCard>
                </motion.div>
              </ColorInverseArea>

              <ColorInverseArea backgroundColor="#6da4aa">
                <motion.div
                  onClick={() => setSelectedDirection('backend')}
                >
                  <AnimatedCard className="cursor-pointer bg-gradient-to-r from-[#6da4aa] via-[#6da4aa]/90 to-[#6da4aa] animate-gradient p-6 sm:p-8 border-[#6da4aa]/30">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 text-white text-center tracking-tight">
                      后端方向
                    </h2>
                    <p className="text-white text-base sm:text-lg text-center font-medium">
                      深入服务器端和系统架构的世界
                    </p>
                  </AnimatedCard>
                </motion.div>
              </ColorInverseArea>

              <ColorInverseArea backgroundColor="#e99a28">
                <motion.div
                  onClick={() => setSelectedDirection('machine-learning')}
                >
                  <AnimatedCard className="cursor-pointer bg-gradient-to-r from-[#e99a28] via-[#e99a28]/90 to-[#e99a28] animate-gradient p-6 sm:p-8 border-[#e99a28]/30">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 text-white text-center tracking-tight">
                      机器学习方向
                    </h2>
                    <p className="text-white text-base sm:text-lg text-center font-medium">
                      探索人工智能和深度学习的奥秘
                    </p>
                  </AnimatedCard>
                </motion.div>
              </ColorInverseArea>
            </div>
          ) : selectedDirection === 'frontend' && !selectedFrontendTopic ? (
            // 前端方向选择页面
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={handleBack}
                className="mb-4 sm:mb-6 text-[hsl(var(--text-primary))] hover:text-[#e1aa70] text-base sm:text-lg font-medium"
              >
                ← 返回选择
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {frontendTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setSelectedFrontendTopic(topic.id)}
                    className="cursor-pointer"
                  >
                    <AnimatedCard 
                      className="animate-gradient p-6 sm:p-8 h-full"
                      style={{
                        background: `linear-gradient(to right, ${topic.color}, ${topic.color}e6, ${topic.color})`,
                        borderColor: `${topic.color}4d`
                      }}>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white text-center tracking-tight">
                        {topic.title}
                      </h3>
                      <p className="text-white text-sm sm:text-base text-center font-medium">
                        {topic.description}
                      </p>
                    </AnimatedCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            // 内容展示页面
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={handleBack}
                className="mb-4 sm:mb-6 text-[hsl(var(--text-primary))] hover:text-[#e1aa70] text-base sm:text-lg font-medium"
              >
                ← 返回选择
              </button>
              <ColorInverseArea backgroundColor={getCurrentColor()}>
                <AnimatedCard 
                  enableHover={false}
                  style={{
                    background: `linear-gradient(to right, ${getCurrentColor()}, ${getCurrentColor()}e6, ${getCurrentColor()})`
                  }}
                  className="animate-gradient p-4 sm:p-6 lg:p-8 border-opacity-30">
                  <div className="text-white text-base sm:text-lg leading-relaxed">
                    <MarkdownRenderer 
                      content={getContent()} 
                      theme={
                        selectedDirection === 'frontend' ? 'blue' : 
                        selectedDirection === 'backend' ? 'cyan' : 'default'
                      }
                    />
                  </div>
                </AnimatedCard>
              </ColorInverseArea>
            </motion.div>
          )}
        </motion.div>
      </div>
    </GradientBackground>
  );
};

export default Questions;
