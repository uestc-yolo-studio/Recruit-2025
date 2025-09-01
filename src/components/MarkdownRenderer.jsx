import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Timeline from './Timeline';

const MarkdownRenderer = ({ content, theme = 'default' }) => {
  const themeColors = {
    blue: {
      strong: '#ffffff',
      code: '#e1aa70',
      link: '#ffffff',
    },
    cyan: {
      strong: '#ffffff',
      code: '#e99a28',
      link: '#ffffff',
    },
    orange: {
      strong: '#ffffff',
      code: '#6da4aa',
      link: '#ffffff',
    },
    gold: {
      strong: '#ffffff',
      code: '#a3d4d1',
      link: '#ffffff',
    },
    lightCyan: {
      strong: '#ffffff',
      code: '#e99a28',
      link: '#ffffff',
    },
    purple: {
      strong: '#ffffff',
      code: '#e1aa70',
      link: '#ffffff',
    },
    default: {
      strong: '#ffffff',
      code: '#e1aa70',
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
    <div className="max-w-none text-sm sm:text-base lg:text-lg text-white leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({children}) => (
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 mt-8 sm:mt-10 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({children}) => (
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 mt-6 sm:mt-8 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({children}) => (
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 mt-4 sm:mt-6 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({children}) => (
            <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 mt-4 sm:mt-6 first:mt-0">
              {children}
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
            <strong className="font-bold text-white" style={{color: colors.strong}}>
              {children}
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
