import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Timeline from './Timeline';

const MarkdownRenderer = ({ content, theme = 'default' }) => {
  const themeColors = {
    blue: {
      strong: '#0c7eb4', // 天蓝色
      code: 'rgb(234 234 156)',
      link: '#ffffff',
    },
    cyan: {
      strong: '#0c7eb4', // 天蓝色
      code: 'rgb(234 234 156)',
      link: '#ffffff',
    },
    orange: {
      strong: '#0c7eb4', // 天蓝色
      code: 'rgb(234 234 156)',
      link: '#ffffff',
    },
    gold: {
      strong: '#0c7eb4', // 天蓝色
      code: 'rgb(234 234 156)',
      link: '#ffffff',
    },
    lightCyan: {
      strong: '#0c7eb4', // 天蓝色
      code: 'rgb(234 234 156)',
      link: '#ffffff',
    },
    purple: {
      strong: '#0c7eb4', // 天蓝色
      code: 'rgb(234 234 156)',
      link: '#ffffff',
    },
    default: {
      strong: '#0c7eb4', // 天蓝色
      code: 'rgb(234 234 156)',
      link: '#ffffff',
    }
  };

  const colors = themeColors[theme] || themeColors.default;

  if (theme === 'orange') {
    // 为横向布局创建特殊的渲染逻辑
    const lines = content.split('\n');
    const sections = [];
    let currentSection = null;
    
    for (const line of lines) {
      if (line.startsWith('## ')) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: line.replace('## ', ''),
          content: ''
        };
      } else if (line.trim() && currentSection) {
        currentSection.content += line + '\n';
      }
    }
    if (currentSection) {
      sections.push(currentSection);
    }
    
    return (
      <div className="max-w-none text-sm sm:text-base lg:text-lg text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white/10 rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <h2 className="text-lg sm:text-xl font-bold text-white text-center p-3 sm:p-4 bg-white/10 border-b border-white/20 rounded-t-2xl">
                {section.title}
              </h2>
              <p className="text-white text-center text-sm sm:text-base p-4 sm:p-5">
                {section.content.trim()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (theme === 'gold') {
    // 为获奖情况创建时间轴渲染逻辑
    const lines = content.split('\n');
    const timelineItems = [];
    let currentYear = null;
    let currentAwards = [];
    
    for (const line of lines) {
      if (line.startsWith('## ')) {
        if (currentYear && currentAwards.length > 0) {
          timelineItems.push({
            year: currentYear,
            awards: currentAwards
          });
        }
        currentYear = line.replace('## ', '');
        currentAwards = [];
      } else if (line.startsWith('- ') && currentYear) {
        currentAwards.push(line.replace('- ', ''));
      }
    }
    if (currentYear && currentAwards.length > 0) {
      timelineItems.push({
        year: currentYear,
        awards: currentAwards
      });
    }
    
    return (
      <div className="max-w-none">
        <Timeline items={timelineItems} />
      </div>
    );
  }

  return (
    <div className="max-w-none text-sm sm:text-base lg:text-lg text-white leading-relaxed bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({children}) => (
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 mt-10 sm:mt-12 first:mt-0 relative">
              <div className="absolute inset-0 bg-blue-300/30 rounded-lg shadow-lg"></div>
              <div className="relative z-10 px-4 sm:px-6 py-3 sm:py-4 flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-300 rounded-full mr-3 sm:mr-4 animate-pulse"></div>
                <span className="text-blue-200 font-bold">
                  {children}
                </span>
                <div className="flex-1 h-px bg-blue-300/50 ml-4 sm:ml-6"></div>
              </div>
            </h1>
          ),
          h2: ({children}) => (
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 mt-8 sm:mt-10 first:mt-0 relative">
              <div className="absolute inset-0 bg-orange-400/20 rounded-lg shadow-md"></div>
              <div className="relative z-10 px-3 sm:px-5 py-2 sm:py-3 flex items-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full mr-2 sm:mr-3"></div>
                <span className="text-orange-300 font-bold">
                  {children}
                </span>
                <div className="flex-1 h-px bg-orange-400/35 ml-3 sm:ml-4"></div>
              </div>
            </h2>
          ),
          h3: ({children}) => (
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 mt-6 sm:mt-8 first:mt-0 relative">
              <div className="absolute inset-0 bg-cyan-300/20 rounded-lg shadow-md"></div>
              <div className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 flex items-center">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-300 rounded-full mr-2 sm:mr-3"></div>
                <span className="text-cyan-200 font-semibold">
                  {children}
                </span>
                <div className="flex-1 h-px bg-cyan-300/35 ml-2 sm:ml-3"></div>
              </div>
            </h3>
          ),
          h4: ({children}) => (
            <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 mt-4 sm:mt-6 first:mt-0 relative">
              <div className="absolute inset-0 bg-amber-400/15 rounded-lg shadow-sm"></div>
              <div className="relative z-10 px-2 sm:px-3 py-1 sm:py-1.5 flex items-center">
                <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-amber-400 rounded-full mr-1.5 sm:mr-2"></div>
                <span className="text-amber-300 font-semibold">
                  {children}
                </span>
                <div className="flex-1 h-px bg-amber-400/30 ml-1.5 sm:ml-2"></div>
              </div>
            </h4>
          ),
          h5: ({children}) => (
            <h5 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 sm:mb-3 mt-4 sm:mt-6 first:mt-0">
              {children}
            </h5>
          ),
          h6: ({children}) => (
            <h6 className="text-xs sm:text-sm md:text-base font-bold text-white mb-2 sm:mb-3 mt-4 sm:mt-6 first:mt-0">
              {children}
            </h6>
          ),
          p: ({children}) => (
            <p className="mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
              {children}
            </p>
          ),
          ul: ({children}) => (
            <ul className="mb-4 sm:mb-6 ml-4 sm:ml-6 space-y-1 sm:space-y-2">
              {children}
            </ul>
          ),
          ol: ({children}) => (
            <ol className="mb-4 sm:mb-6 ml-4 sm:ml-6 space-y-1 sm:space-y-2 list-decimal">
              {children}
            </ol>
          ),
          li: ({children}) => (
            <li className="text-sm sm:text-base leading-relaxed">
              {children}
            </li>
          ),
          strong: ({children}) => (
            <strong className="font-bold text-white relative group">
              <span className="relative z-10">
                {children}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-md -skew-x-6 transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-300/10 to-cyan-300/10 rounded-md transform scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </strong>
          ),
          em: ({children}) => (
            <em className="italic text-white">
              {children}
            </em>
          ),
          code: ({children, className}) => {
            const isBlock = className && className.includes('language-');
            if (isBlock) {
              return (
                <div className="my-4 sm:my-6 bg-black/50 rounded-lg border border-white/30 shadow-lg overflow-hidden">
                  <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-black/30 border-b border-white/20">
                    <div className="flex space-x-1 sm:space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-xs text-white/60 font-mono">
                      {className.replace('language-', '')}
                    </span>
                  </div>
                  <div className="p-3 sm:p-4 overflow-x-auto">
                    <code 
                      className="block text-xs sm:text-sm font-mono leading-relaxed break-all" 
                      style={{
                        color: colors.code,
                        wordBreak: 'break-all',
                        overflowWrap: 'break-word',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {children}
                    </code>
                  </div>
                </div>
              );
            }
            return (
              <code className="bg-black/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-mono border border-white/20 break-all" style={{color: colors.code}}>
                {children}
              </code>
            );
          },
          a: ({children, href}) => (
            <a href={href} className="text-white underline hover:no-underline hover:bg-black/40 px-1 sm:px-2 py-0.5 rounded transition-colors border border-transparent hover:border-white/20 break-all">
              {children}
            </a>
          ),
          blockquote: ({children}) => (
            <blockquote className="border-l-4 border-white/50 pl-3 sm:pl-6 italic text-white mb-4 sm:mb-6 ml-2 sm:ml-4 bg-black/30 rounded-r-lg p-3 sm:p-4 shadow-lg">
              {children}
            </blockquote>
          ),
          hr: () => (
            <div className="my-6 sm:my-10 flex items-center justify-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <div className="mx-2 sm:mx-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
          ),
          table: ({children}) => (
            <div className="overflow-x-auto mb-4 sm:mb-6 rounded-lg border border-white/40 bg-black/30 shadow-lg">
              <table className="min-w-full border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({children}) => (
            <thead className="bg-white/20">
              {children}
            </thead>
          ),
          tbody: ({children}) => (
            <tbody className="bg-black/20">
              {children}
            </tbody>
          ),
          tr: ({children}) => (
            <tr className="border-b border-white/20 hover:bg-white/10 transition-colors">
              {children}
            </tr>
          ),
          th: ({children}) => (
            <th className="border border-white/30 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-white break-all text-xs sm:text-sm">
              {children}
            </th>
          ),
          td: ({children}) => (
            <td className="border border-white/30 px-2 sm:px-4 py-2 sm:py-3 text-white break-all text-xs sm:text-sm">
              {children}
            </td>
          ),
          img: ({src, alt, width, height}) => (
            <div className="my-4 sm:my-6 text-center">
              <img 
                src={src} 
                alt={alt || '图片'} 
                width={width} 
                height={height}
                className="max-w-full h-auto rounded-lg border border-white/20 shadow-lg mx-auto"
                onError={(e) => {
                  console.warn(`图片加载失败: ${src}`);
                  e.target.style.display = 'none';
                  // 显示错误提示
                  const errorDiv = document.createElement('div');
                  errorDiv.className = 'text-red-400 text-sm p-2 bg-red-900/20 rounded border border-red-500/30';
                  errorDiv.textContent = `图片加载失败: ${alt || '未知图片'}`;
                  e.target.parentNode.appendChild(errorDiv);
                }}
              />
              {alt && (
                <p className="text-white/70 text-xs sm:text-sm mt-2 text-center">
                  {alt}
                </p>
              )}
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
