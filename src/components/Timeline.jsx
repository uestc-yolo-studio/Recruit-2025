import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const Timeline = ({ items }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* 时间轴中心线 - 在移动端隐藏 */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30 transform -translate-x-1/2 hidden md:block"></div>
      
      <div className="space-y-6 sm:space-y-8 md:space-y-12">
        {items.map((item, index) => {
          const isExpanded = expandedItems[index];
          const hasMoreAwards = item.awards.length > 3;
          const displayedAwards = isExpanded ? item.awards : item.awards.slice(0, 3);
          
          return (
            <motion.div
              key={index}
              className={`relative flex items-start ${
                // 移动端统一左对齐，桌面端保持交替布局
                'justify-start md:justify-start' 
              } ${
                // 桌面端保持交替布局
                index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* 时间轴节点 - 移动端调整位置 */}
              <div className="absolute left-4 md:left-1/2 top-6 w-4 h-4 md:w-6 md:h-6 bg-white rounded-full border-2 md:border-4 border-[#e1aa70] shadow-lg z-10 transform md:-translate-x-1/2"></div>
              
              {/* 内容卡片 - 移动端全宽，桌面端保持原有布局 */}
              <div className={`w-full md:w-5/12 ${
                // 移动端左对齐，桌面端保持交替布局
                'ml-8 md:ml-0' 
              } ${
                index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
              }`}>
                <div className="bg-white/10 rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 backdrop-blur-sm">
                  {/* 年份标题 */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 text-center bg-white/10 p-2 sm:p-3 rounded-xl">
                    {item.year}
                  </h3>
                  
                  {/* 获奖列表 */}
                  <div className="space-y-2 sm:space-y-3">
                    <AnimatePresence>
                      {displayedAwards.map((award, awardIndex) => (
                        <motion.div
                          key={awardIndex}
                          className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded-xl border border-white/10"
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                          transition={{ duration: 0.2 }}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {/* 奖牌图标 */}
                          <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            🏆
                          </div>
                          
                          {/* 获奖内容 - 使用Markdown渲染器 */}
                          <div className="flex-1 min-w-0">
                            <div className="text-white text-xs sm:text-sm leading-relaxed break-words">
                              <ReactMarkdown
                                components={{
                                  strong: ({children}) => (
                                    <strong className="text-white font-semibold">
                                      {children}
                                    </strong>
                                  ),
                                  p: ({children}) => (
                                    <span className="text-white">
                                      {children}
                                    </span>
                                  )
                                }}
                              >
                                {award}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {/* 展开/收起按钮 */}
                    {hasMoreAwards && (
                      <motion.button
                        onClick={() => toggleExpanded(index)}
                        className="w-full mt-3 sm:mt-4 p-2 sm:p-3 bg-white/10 rounded-xl border border-white/20 text-white text-xs sm:text-sm font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{isExpanded ? '收起' : `展开更多 (${item.awards.length - 3}个奖项)`}</span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          ▼
                        </motion.div>
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline; 