import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      {/* 时间轴中心线 */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30 transform -translate-x-1/2"></div>
      
      <div className="space-y-12">
        {items.map((item, index) => {
          const isExpanded = expandedItems[index];
          const hasMoreAwards = item.awards.length > 3;
          const displayedAwards = isExpanded ? item.awards : item.awards.slice(0, 3);
          
          return (
            <motion.div
              key={index}
              className={`relative flex items-start ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* 时间轴节点 */}
              <div className="absolute left-1/2 top-6 w-6 h-6 bg-white rounded-full border-4 border-[#e1aa70] shadow-lg z-10 transform -translate-x-1/2"></div>
              
              {/* 内容卡片 */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
                <div className="bg-white/10 rounded-2xl p-6 shadow-lg border border-white/20 backdrop-blur-sm">
                  {/* 年份标题 */}
                  <h3 className="text-xl font-bold text-white mb-4 text-center bg-white/10 p-3 rounded-xl">
                    {item.year}
                  </h3>
                  
                  {/* 获奖列表 */}
                  <div className="space-y-3">
                    <AnimatePresence>
                      {displayedAwards.map((award, awardIndex) => (
                        <motion.div
                          key={awardIndex}
                          className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                          transition={{ duration: 0.2 }}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {/* 奖牌图标 */}
                          <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            🏆
                          </div>
                          
                          {/* 获奖内容 */}
                          <div className="flex-1">
                            <p className="text-white text-sm leading-relaxed">
                              <strong className="text-white font-semibold">{award}</strong>
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {/* 展开/收起按钮 */}
                    {hasMoreAwards && (
                      <motion.button
                        onClick={() => toggleExpanded(index)}
                        className="w-full mt-4 p-3 bg-white/10 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
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