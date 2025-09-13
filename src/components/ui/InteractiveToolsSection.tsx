import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaBookOpen } from 'react-icons/fa';
import { FiTerminal, FiGitBranch } from 'react-icons/fi';
import PrimaryButton from '../hackathon/PrimaryButton';
import { SidebarNavButton } from '../ui';
import { Highlight } from 'prism-react-renderer';

export interface Tool {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  installCommand?: string;
  color: 'purple' | 'blue' | 'green';
  quickStart?: string;
  docsLink?: string;
  isNew?: boolean;
}

interface InteractiveToolsSectionProps {
  tools: Tool[];
  title?: string;
  subtitle?: string;
  browserTitle?: string;
}

const customLightTheme = {
  plain: {
    color: '#1a202c',
    backgroundColor: '#f9fafb',
  },
  styles: [
    {
      types: ['comment', 'block-comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#6b7280', fontStyle: 'italic' },
    },
    {
      types: ['punctuation'],
      style: { color: '#6b7280' },
    },
    {
      types: ['tag', 'attr-name', 'namespace', 'deleted'],
      style: { color: '#dc2626' },
    },
    {
      types: ['function-name'],
      style: { color: '#2563eb' },
    },
    {
      types: ['boolean', 'number', 'function'],
      style: { color: '#7c3aed' },
    },
    {
      types: ['property', 'class-name', 'constant', 'symbol'],
      style: { color: '#ea580c' },
    },
    {
      types: ['selector', 'important', 'atrule', 'keyword', 'builtin'],
      style: { color: '#0891b2' },
    },
    {
      types: ['string', 'char', 'attr-value', 'regex', 'variable'],
      style: { color: '#059669' },
    },
    {
      types: ['operator', 'entity', 'url'],
      style: { color: '#7c3aed' },
    },
    {
      types: ['at-rule', 'keyword'],
      style: { color: '#7c3aed', fontWeight: 'bold' },
    },
  ],
};

const customDarkTheme = {
  plain: {
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  styles: [
    {
      types: ['comment', 'block-comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#a1a1aa', fontStyle: 'italic' },
    },
    {
      types: ['punctuation'],
      style: { color: '#fafafa' },
    },
    {
      types: ['tag', 'attr-name', 'namespace', 'deleted'],
      style: { color: '#ff6b6b' },
    },
    {
      types: ['function-name'],
      style: { color: '#4fc3f7' },
    },
    {
      types: ['boolean', 'number', 'function'],
      style: { color: '#ba68c8' },
    },
    {
      types: ['property', 'class-name', 'constant', 'symbol'],
      style: { color: '#ffb74d' },
    },
    {
      types: ['selector', 'important', 'atrule', 'keyword', 'builtin'],
      style: { color: '#4dd0e1' },
    },
    {
      types: ['string', 'char', 'attr-value', 'regex', 'variable'],
      style: { color: '#81c784' },
    },
    {
      types: ['operator', 'entity', 'url'],
      style: { color: '#ce93d8' },
    },
    {
      types: ['at-rule', 'keyword'],
      style: { color: '#ba68c8', fontWeight: 'bold' },
    },
  ],
};

const InteractiveToolsSection: React.FC<InteractiveToolsSectionProps> = ({
  tools,
  title = 'Developer Tools & Resources',
  subtitle = 'Everything you need to build with AI agents on Hedera',
  browserTitle = 'developer-tools.dev'
}) => {
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      const isDark =
        document.documentElement.classList.contains('dark') ||
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkDarkMode);
    };
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className='max-w-5xl mx-auto'
    >
      <div className='text-center mb-12'>
        <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#c89fff] to-[#a679f0]'>
            {title}
          </span>
        </h2>
        <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
          {subtitle}
        </p>
      </div>

      <div className='bg-white dark:bg-gray-900 rounded-xl lg:rounded-3xl shadow-2xl ring-1 ring-gray-200/50 dark:ring-gray-600 overflow-hidden'>
        <div className='bg-gray-100 dark:bg-gray-800 px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200/30 dark:border-gray-700'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 lg:gap-4 min-w-0'>
              <div className='flex gap-1 lg:gap-1.5 flex-shrink-0'>
                <div className='w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-purple-600'></div>
                <div className='w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-blue-600'></div>
                <div className='w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-green-600'></div>
              </div>
              <div className='text-xs lg:text-sm font-mono text-gray-600 dark:text-white/60 truncate'>
                {browserTitle}
              </div>
            </div>
            <div className='flex items-center gap-3 flex-shrink-0'>
              <div className='px-2 py-1 rounded text-xs font-mono bg-purple-600/20 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 font-semibold whitespace-nowrap'>
                {tools.length} tools available
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row min-h-[480px] overflow-hidden'>
          <div className='w-full lg:w-80 lg:min-w-[20rem] lg:max-w-[20rem] lg:flex-shrink-0 bg-white dark:bg-gray-900 border-b lg:border-b-0 lg:border-r border-gray-200/30 dark:border-gray-700'>
            <div className='px-4 py-3 border-b border-gray-200/30 dark:border-gray-700'>
              <div className='flex items-center gap-2 text-sm font-mono text-gray-600 dark:text-white/60'>
                <FiGitBranch className='w-4 h-4 flex-shrink-0 text-white/60' />
                <span className='truncate'>tool directory</span>
                <div className='w-2 h-2 rounded-full animate-pulse bg-purple-600 flex-shrink-0'></div>
              </div>
            </div>

            <div className='p-2 space-y-1 bg-white dark:bg-gray-900 overflow-y-auto max-h-96 lg:max-h-none lg:h-full'>
              {tools.map((tool, index) => (
                <SidebarNavButton
                  key={index}
                  isActive={activeToolIndex === index}
                  onClick={() => setActiveToolIndex(index)}
                  className='p-3'
                >
                  <div className='flex items-start gap-3 min-w-0'>
                    <div
                      className='w-8 h-8 rounded-lg flex items-center justify-center text-sm text-white flex-shrink-0'
                      style={{
                        background:
                          tool.color === 'purple'
                            ? 'linear-gradient(135deg, #a679f0, #9333ea)'
                            : tool.color === 'green'
                            ? 'linear-gradient(135deg, #48df7b, #16a34a)'
                            : 'linear-gradient(135deg, #5599fe, #2563eb)',
                      }}
                    >
                      {tool.icon}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-start gap-2'>
                        <h3 className={`text-sm font-semibold transition-colors truncate ${
                          activeToolIndex === index
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-white/80'
                        }`}>
                          {tool.title}
                        </h3>
                        {tool.isNew && (
                          <span className='text-xs px-1.5 rounded-full bg-[#48df7b]/20 text-[#48df7b] font-bold flex-shrink-0'>
                            NEW
                          </span>
                        )}
                      </div>
                      <p className={`text-xs line-clamp-2 transition-colors -mt-1 ${
                        activeToolIndex === index
                          ? 'text-gray-600 dark:text-white/90'
                          : 'text-gray-500 dark:text-white/60'
                      }`}>
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </SidebarNavButton>
              ))}
            </div>
          </div>

          <div className='flex-1 min-w-0 max-w-full p-4 lg:p-6 xl:p-8 bg-white dark:bg-gray-900 overflow-auto'>
            <motion.div
              key={activeToolIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className='mb-6'>
                {tools[activeToolIndex].isNew && (
                  <span className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#48df7b]/10 text-[#48df7b] border border-[#48df7b]/20 mb-2'>
                    NEW
                  </span>
                )}
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>
                  {tools[activeToolIndex].title}
                </h2>
                <p className='text-base text-gray-600 dark:text-white/70 leading-relaxed'>
                  {tools[activeToolIndex].description}
                </p>
              </div>

              {tools[activeToolIndex].installCommand && (
                <div className='mb-8'>
                  <h3 className='text-sm font-medium text-gray-500 dark:text-white/60 mb-3'>
                    QUICK INSTALL
                  </h3>
                  <div className='relative group'>
                    <div
                      onClick={() => copyToClipboard(tools[activeToolIndex].installCommand!)}
                      className='relative overflow-hidden bg-gray-100 dark:bg-black rounded-xl border border-gray-200/50 dark:border-white/20 hover:border-gray-300/50 dark:hover:border-white/30 transition-all cursor-pointer'
                    >
                      <div className='flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-black border-b border-gray-200/50 dark:border-white/20'>
                        <div className='flex items-start gap-2'>
                          <div className='flex gap-1.5'>
                            <div className='w-3 h-3 rounded-full bg-purple-600' />
                            <div className='w-3 h-3 rounded-full bg-blue-600' />
                            <div className='w-3 h-3 rounded-full bg-green-600' />
                          </div>
                          <FiTerminal className='w-3 h-3 text-gray-600 dark:text-white/60' />
                        </div>
                        <div className='flex items-start gap-2'>
                          {copied ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className='flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/20 text-green-500'
                            >
                              <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                              </svg>
                              <span className='text-xs font-medium'>Copied!</span>
                            </motion.div>
                          ) : (
                            <div className='flex items-center gap-1.5 px-2 py-0.5 rounded text-gray-500 hover:text-gray-400 hover:bg-gray-800/50 transition-all'>
                              <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
                              </svg>
                              <span className='text-xs font-medium'>Copy</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='p-4 bg-gray-50 dark:bg-black'>
                        <div className='flex items-center gap-3 font-mono text-sm'>
                          <span className='text-green-600 dark:text-green-400'>$</span>
                          <code className='text-gray-900 dark:text-white/80'>
                            {tools[activeToolIndex].installCommand}
                          </code>
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className='inline-block w-2 h-4 bg-gray-600 dark:bg-white/70'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tools[activeToolIndex].quickStart && (
                <div className='mb-8'>
                  <h3 className='text-sm font-medium text-gray-500 dark:text-white/60 mb-3'>
                    QUICK START
                  </h3>
                  <div className='bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black overflow-hidden rounded-xl border border-gray-200/50 dark:border-white/20'>
                    <Highlight
                      theme={isDarkMode ? customDarkTheme : customLightTheme}
                      code={tools[activeToolIndex].quickStart!}
                      language='typescript'
                    >
                      {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre
                          className={`${className} p-4 text-sm font-mono leading-relaxed overflow-x-auto`}
                          style={{
                            ...style,
                            backgroundColor: 'transparent',
                            margin: 0,
                          }}
                        >
                          {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })} className='hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200'>
                              {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token })} />
                              ))}
                            </div>
                          ))}
                        </pre>
                      )}
                    </Highlight>
                  </div>
                </div>
              )}

              <div className='flex flex-col sm:flex-row gap-4 flex-wrap'>
                <PrimaryButton
                  href={tools[activeToolIndex].link}
                  target='_blank'
                  rel='noopener noreferrer'
                  icon={<FaExternalLinkAlt />}
                >
                  View on GitHub
                </PrimaryButton>

                {tools[activeToolIndex].docsLink && tools[activeToolIndex].docsLink !== tools[activeToolIndex].link && (
                  <PrimaryButton
                    href={tools[activeToolIndex].docsLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    icon={<FaBookOpen />}
                    className='bg-gray-600 hover:bg-gray-700'
                  >
                    Documentation
                  </PrimaryButton>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveToolsSection;