import React from 'react';
import { Highlight } from 'prism-react-renderer';

interface CodeTerminalProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  className?: string;
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

const CodeTerminal: React.FC<CodeTerminalProps> = ({
  code,
  language = 'typescript',
  title = 'code.ts',
  showLineNumbers = false,
  className = '',
}) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

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

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkDarkMode);
    };
  }, []);

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl lg:rounded-3xl shadow-2xl ring-1 ring-gray-200/50 dark:ring-gray-600 overflow-hidden backdrop-blur-xl ${className}`}>
      <div className='bg-gray-100 dark:bg-gray-800 px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200/30 dark:border-gray-700'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 lg:gap-4 min-w-0'>
            <div className='flex gap-1 lg:gap-1.5 flex-shrink-0'>
              <div className='w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-red-500'></div>
              <div className='w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-yellow-500'></div>
              <div className='w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-green-500'></div>
            </div>
            <div className='text-xs lg:text-sm font-mono text-gray-600 dark:text-white/60 truncate'>
              {title}
            </div>
          </div>
        </div>
      </div>
      
      <div className='bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black overflow-hidden'>
        <Highlight
          theme={isDarkMode ? customDarkTheme : customLightTheme}
          code={code}
          language={language}
        >
          {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${highlightClassName} p-4 text-sm font-mono leading-relaxed overflow-x-auto`}
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
                  className='hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200'
                >
                  {showLineNumbers && (
                    <span className='inline-block w-8 text-gray-500 dark:text-gray-600 select-none'>
                      {i + 1}
                    </span>
                  )}
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
  );
};

export default CodeTerminal;