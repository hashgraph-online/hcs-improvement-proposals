import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaCode, FaCopy, FaCheck } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneLight,
  materialDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useColorMode } from '@docusaurus/theme-common';
export interface CodeTabItem {
  id: string;
  title: string;
  code: string;
  language?: string;
}

type TabbedCodeBlockProps = {
  tabs: CodeTabItem[];
  defaultTabId?: string;
};

const TabbedCodeBlock: React.FC<TabbedCodeBlockProps> = ({
  tabs,
  defaultTabId,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultTabId || tabs[0]?.id || ''
  );
  const [isCopied, setIsCopied] = useState(false);
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';
  const codeRef = useRef<HTMLDivElement>(null);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  const copyToClipboard = () => {
    if (activeTab) {
      navigator.clipboard
        .writeText(activeTab.code)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((err) => console.error('Failed to copy: ', err));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      copyToClipboard();
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
  };

  const lightThemeWithCustomBg = {
    ...oneLight,
    'pre[class*="language-"]': {
      ...oneLight['pre[class*="language-"]'],
      background: 'transparent',
      margin: 0,
      padding: '2rem 1rem 1rem',
    },
    'code[class*="language-"]': {
      ...oneLight['code[class*="language-"]'],
      background: 'transparent',
    },
  };

  const darkThemeWithCustomBg = {
    ...materialDark,
    'pre[class*="language-"]': {
      ...materialDark['pre[class*="language-"]'],
      background: 'transparent',
      margin: 0,
      padding: '2rem 1rem 1rem',
    },
    'code[class*="language-"]': {
      ...materialDark['code[class*="language-"]'],
      background: 'transparent',
    },
  };

  return (
    <div className='relative rounded-lg sm:rounded-xl overflow-hidden backdrop-blur-sm transform transition-all duration-300 bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/30'>
      <div className='flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-50/90 to-gray-100/90 dark:from-gray-800/90 dark:to-gray-900/90 border-b border-gray-200/50 dark:border-gray-700/50'>
        <div className='flex items-center gap-2'>
          <div className='flex gap-1.5 mr-3'>
            <div className='w-3 h-3 rounded-full bg-brand-purple'></div>
            <div className='w-3 h-3 rounded-full bg-brand-blue'></div>
            <div className='w-3 h-3 rounded-full bg-[#28CA41]'></div>
          </div>

          <div className='flex overflow-x-auto scrollbar-thin py-1 max-w-[calc(100vw-150px)] sm:max-w-none code-tabs-container'>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center px-3 py-1.5 mr-1 rounded-t-md text-xs font-medium whitespace-nowrap transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-hedera-purple/40 code-tab ${
                  activeTabId === tab.id ? 'active' : ''
                } ${
                  activeTabId === tab.id
                    ? 'bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white border-t border-l border-r border-gray-200/50 dark:border-gray-700/50'
                    : 'bg-gray-100/70 dark:bg-gray-700/70 text-gray-600 dark:text-gray-300'
                }`}
                aria-selected={activeTabId === tab.id}
                role='tab'
              >
                <span className='mr-1.5 text-hedera-purple dark:text-hedera-purple/80'>
                  <FaCode size={10} />
                </span>
                {tab.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='relative overflow-auto'>
        <button
          onClick={copyToClipboard}
          onKeyDown={handleKeyDown}
          className='code-copy-button'
          aria-label={isCopied ? 'Copied!' : 'Copy code'}
          title={isCopied ? 'Copied!' : 'Copy code'}
        >
          {isCopied ? (
            <>
              <FaCheck className='copied-indicator' />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <FaCopy />
              <span>Copy</span>
            </>
          )}
        </button>

        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='relative p-0 overflow-x-auto max-h-[500px] code-backdrop'
            ref={codeRef}
          >
            <SyntaxHighlighter
              language={activeTab?.language || 'javascript'}
              style={
                isDarkTheme ? darkThemeWithCustomBg : lightThemeWithCustomBg
              }
              showLineNumbers={true}
              wrapLines={true}
              customStyle={{
                background: isDarkTheme
                  ? 'rgba(30, 30, 40, 0.85)'
                  : 'rgba(245, 245, 255, 0.85)',
              }}
              codeTagProps={{
                className: isDarkTheme ? 'dark-code' : 'light-code',
              }}
            >
              {activeTab?.code || ''}
            </SyntaxHighlighter>
          </motion.div>
        </AnimatePresence>

        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-transparent via-hedera-purple/5 to-transparent'></div>
          <div className='absolute -inset-[100px] bg-gradient-to-r from-hedera-purple/5 via-hedera-blue/5 to-hedera-green/5 dark:from-hedera-purple/10 dark:via-hedera-blue/10 dark:to-hedera-green/10 blur-3xl duration-700'></div>
        </div>
      </div>
    </div>
  );
};

export default TabbedCodeBlock;
