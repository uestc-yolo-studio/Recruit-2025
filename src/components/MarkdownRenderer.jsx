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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white/10 rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <h2 className="text-xl font-bold text-white text-center p-4 bg-white/10 border-b border-white/20 rounded-t-2xl">
                {section.title}
              </h2>
              <p className="text-white text-center text-base p-5">
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
        currentYear = line.replace('## ', '').replace('年获奖', '');
        currentAwards = [];
      } else if (line.startsWith('- **') && line.includes('**')) {
        const award = line.replace('- **', '').replace('**', '');
        currentAwards.push(award);
      }
    }
    
    if (currentYear && currentAwards.length > 0) {
      timelineItems.push({
        year: currentYear,
        awards: currentAwards
      });
    }
    
    return (
      <div className="max-w-none text-sm sm:text-base lg:text-lg text-white">
        <h1 className="text-2xl font-bold mb-8 text-white text-center">获奖情况</h1>
        <Timeline items={timelineItems} />
      </div>
    );
  }
  
  return (
    <div 
      className="max-w-none text-sm sm:text-base lg:text-lg text-white space-y-6 bg-black/20 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm"
      style={{
        color: '#ffffff',
        lineHeight: '1.8',
        wordBreak: 'break-all',
        overflowWrap: 'break-word'
      }}
    >
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({children}) => (
            <h1 className="text-3xl font-bold mb-8 text-white border-b-2 border-white/20 pb-4 break-all">
              {children}
            </h1>
          ),
          h2: ({children}) => (
            <h2 className="text-2xl font-bold mb-6 text-white pl-4 border-l-4 border-white/30 pl-6 break-all">
              {children}
            </h2>
          ),
          h3: ({children}) => (
            <h3 className="text-xl font-bold mb-4 text-white pl-8 bg-black/30 rounded-lg p-3 border border-white/20 break-all">
              {children}
            </h3>
          ),
          h4: ({children}) => (
            <h4 className="text-lg font-bold mb-3 text-white pl-12 break-all">
              {children}
            </h4>
          ),
          p: ({children}) => (
            <p className="mb-6 text-white pl-4 leading-relaxed break-all">
              {children}
            </p>
          ),
          ul: ({children}) => (
            <ul className="list-none mb-6 text-white pl-6 space-y-3">
              {children}
            </ul>
          ),
          ol: ({children}) => (
            <ol className="list-decimal list-inside mb-6 text-white pl-6 space-y-3">
              {children}
            </ol>
          ),
          li: ({children}) => (
            <li className="mb-3 text-white pl-3 leading-relaxed relative break-all">
              <div className="absolute left-0 top-3 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
              {children}
            </li>
          ),
          strong: ({children}) => (
            <strong className="font-bold text-white bg-black/40 px-2 py-0.5 rounded border border-white/20">
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
                <div className="my-6 bg-black/50 rounded-lg border border-white/30 shadow-lg overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-black/30 border-b border-white/20">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-xs text-white/60 font-mono">
                      {className.replace('language-', '')}
                    </span>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <code 
                      className="block text-sm font-mono leading-relaxed break-all" 
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
              <code className="bg-black/50 px-2 py-1 rounded text-sm font-mono border border-white/20 break-all" style={{color: colors.code}}>
                {children}
              </code>
            );
          },
          a: ({children, href}) => (
            <a href={href} className="text-white underline hover:no-underline hover:bg-black/40 px-2 py-0.5 rounded transition-colors border border-transparent hover:border-white/20">
              {children}
            </a>
          ),
          blockquote: ({children}) => (
            <blockquote className="border-l-4 border-white/50 pl-6 italic text-white mb-6 ml-4 bg-black/30 rounded-r-lg p-4 shadow-lg">
              {children}
            </blockquote>
          ),
          hr: () => (
            <div className="my-10 flex items-center justify-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <div className="mx-4 w-2 h-2 bg-white/40 rounded-full"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
          ),
          table: ({children}) => (
            <div className="overflow-x-auto mb-6 rounded-lg border border-white/40 bg-black/30 shadow-lg">
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
            <th className="border border-white/30 px-4 py-3 text-left font-bold text-white break-all">
              {children}
            </th>
          ),
          td: ({children}) => (
            <td className="border border-white/30 px-4 py-3 text-white break-all">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
