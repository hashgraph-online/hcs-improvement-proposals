import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCode,
  FaTerminal,
  FaCopy,
  FaCheck,
} from 'react-icons/fa';
import { SidebarNavButton } from './index';
import { Highlight } from 'prism-react-renderer';

interface CodeExample {
  id: string;
  title: string;
  description?: string;
  language: string;
  code: string;
  icon?: React.ReactNode;
  color?: 'purple' | 'blue' | 'green';
  difficulty?: string;
}

interface TabbedTerminalProps {
  title?: string;
  examples: CodeExample[];
  defaultActiveIndex?: number;
  className?: string;
  height?: string;
}

const customLightTheme = {
  plain: {
    color: '#1a202c',
    backgroundColor: '#f9fafb',
  },
  styles: [
    {
      types: ['comment', 'block-comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#6b7280', fontStyle: 'italic' as const },
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
      style: { color: '#7c3aed', fontWeight: 'bold' as const },
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
      style: { color: '#a1a1aa', fontStyle: 'italic' as const },
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
      style: { color: '#ba68c8', fontWeight: 'bold' as const },
    },
  ],
};

export default function TabbedTerminal({
  title = 'Code Examples',
  examples,
  defaultActiveIndex = 0,
  className = '',
  height
}: TabbedTerminalProps) {
  const [activeExample, setActiveExample] = useState(defaultActiveIndex);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  React.useEffect(() => {
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

    return () => {
      observer.disconnect();
    };
  }, []);

  const copyToClipboard = async (code: string, exampleId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedStates((prev) => ({ ...prev, [exampleId]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [exampleId]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const current = examples[activeExample];

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-3xl shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 overflow-hidden ${className}`}>
        {/* Header */}
        <div className='bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex items-center gap-3'>
            <FaTerminal className='text-[#5599fe] text-xl' />
            <span className='text-lg font-semibold text-gray-900 dark:text-white'>
                {title}
            </span>
            </div>
        </div>

        <div className='flex flex-col lg:flex-row h-full' style={{ height: height }}>
            {/* Sidebar */}
            <div className='lg:w-1/3 lg:flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 overflow-y-auto max-h-[300px] lg:max-h-[none]'>
                <div className='p-2'>
                    {examples.map((example, index) => (
                    <SidebarNavButton
                        key={example.id}
                        isActive={activeExample === index}
                        onClick={() => setActiveExample(index)}
                        className='p-4 mb-2'
                    >
                        <div className='flex items-start gap-3'>
                        <div
                            className='w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0'
                            style={{
                            background:
                                example.color === 'purple'
                                ? 'linear-gradient(135deg, #a679f0, #5599fe)'
                                : example.color === 'green'
                                ? 'linear-gradient(135deg, #48df7b, #54ae70)'
                                : 'linear-gradient(135deg, #5599fe, #48df7b)',
                            }}
                        >
                            {example.icon || <FaCode />}
                        </div>
                        <div className='flex-1 text-left'>
                            <div className='flex items-start gap-2'>
                                <h3
                                    className={`text-sm font-semibold transition-colors ${
                                    activeExample === index
                                        ? 'text-gray-900 dark:text-white'
                                        : 'text-gray-700 dark:text-white/80'
                                    }`}
                                >
                                    {example.title}
                                </h3>
                                {example.difficulty && (
                                    <span
                                    className={`text-[10px] px-2 rounded-full font-medium ${
                                        example.difficulty === 'Beginner'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-400/20 dark:text-green-400'
                                        : example.difficulty === 'Intermediate'
                                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-400/20 dark:text-yellow-400'
                                        : 'bg-red-100 text-red-700 dark:bg-red-400/20 dark:text-red-400'
                                    }`}
                                    >
                                    {example.difficulty}
                                    </span>
                                )}
                            </div>
                            {example.description && (
                                <p
                                    className={`text-xs line-clamp-2 transition-colors mt-0.5 ${
                                    activeExample === index
                                        ? 'text-gray-600 dark:text-white/90'
                                        : 'text-gray-500 dark:text-white/60'
                                    }`}
                                >
                                    {example.description}
                                </p>
                             )}
                        </div>
                        </div>
                    </SidebarNavButton>
                    ))}
                </div>
            </div>

            {/* Code View */}
            <div className='flex-1 lg:min-w-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black min-h-[400px] flex flex-col'>
                {/* Code Header */}
                <div className='p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 shrink-0'>
                    <div className='flex items-center justify-between mb-2'>
                        <h3 className='text-lg sm:text-xl font-bold text-gray-900 dark:text-white'>
                            {current.title}
                        </h3>
                        <div className='flex items-center gap-2'>
                            <span className='text-xs text-gray-500 dark:text-white/60 font-mono hidden sm:inline-block'>
                                {current.language}
                            </span>
                            <motion.button
                                onClick={() => copyToClipboard(current.code, current.id)}
                                className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 shadow-sm border border-gray-200 dark:border-gray-600'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {copiedStates[current.id] ? (
                                    <div className='flex items-center gap-1.5'>
                                        <FaCheck className='text-green-600 dark:text-green-400' />
                                        <span className='text-green-600 dark:text-green-400'>
                                            Copied!
                                        </span>
                                    </div>
                                ) : (
                                    <>
                                        <FaCopy className='text-gray-500 dark:text-gray-400' />
                                        <span className='text-gray-700 dark:text-gray-200'>
                                            Copy Code
                                        </span>
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>
                    {current.description && (
                        <p className='text-sm text-gray-600 dark:text-white/70'>
                            {current.description}
                        </p>
                    )}
                </div>

                {/* Scroller */}
                <div className='flex-1 overflow-hidden relative'>
                    <div className='absolute inset-0 overflow-auto'>
                         <Highlight
                            theme={isDarkMode ? customDarkTheme : customLightTheme}
                            code={current.code}
                            language={current.language as any}
                        >
                            {({
                            className,
                            style,
                            tokens,
                            getLineProps,
                            getTokenProps,
                            }) => (
                            <pre
                                className={`${className} p-6 text-sm font-mono leading-relaxed min-h-full`}
                                style={{
                                ...style,
                                backgroundColor: 'transparent',
                                margin: 0,
                                }}
                            >
                                {tokens.map((line, i) => (
                                <div
                                    key={i}
                                    {...getLineProps({ line })}
                                    className='hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200 w-full'
                                >
                                    <span className='inline-block w-8 sm:w-12 text-gray-400 dark:text-gray-500 select-none text-right pr-4 text-xs opacity-50'>
                                    {i + 1}
                                    </span>
                                    {line.map((token, key) => (
                                    <span
                                        key={key}
                                        {...getTokenProps({ token })}
                                    />
                                    ))}
                                </div>
                                ))}
                            </pre>
                            )}
                        </Highlight>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
