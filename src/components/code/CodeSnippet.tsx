import React, { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { lightTheme, darkTheme } from './themes';
import { FiCopy, FiCheck } from 'react-icons/fi';

type CodeSnippetProps = {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  title?: string;
  maxHeight?: string;
};

export const CodeSnippet = ({
  code,
  language,
  showLineNumbers = true,
  title,
  maxHeight = '500px',
}: CodeSnippetProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='relative rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md my-6'>
      {title && (
        <div className='px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between'>
          <span className='font-mono text-sm text-gray-600 dark:text-gray-300'>
            {title}
          </span>
          <button
            onClick={copyToClipboard}
            className='p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
            aria-label='Copy code'
          >
            {copied ? (
              <FiCheck className='h-4 w-4 text-green-500' />
            ) : (
              <FiCopy className='h-4 w-4 text-gray-500 dark:text-gray-400' />
            )}
          </button>
        </div>
      )}

      <div className='relative overflow-auto' style={{ maxHeight }}>
        <Highlight
          {...defaultProps}
          code={code.trim()}
          language={language}
          theme={
            typeof document !== 'undefined' &&
            document.documentElement.classList.contains('dark')
              ? darkTheme
              : lightTheme
          }
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} p-4 overflow-x-auto`} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {showLineNumbers && (
                    <span className='inline-block w-8 select-none opacity-50 text-right mr-4'>
                      {i + 1}
                    </span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>

        {!title && (
          <button
            onClick={copyToClipboard}
            className='absolute top-2 right-2 p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
            aria-label='Copy code'
          >
            {copied ? (
              <FiCheck className='h-4 w-4 text-green-500' />
            ) : (
              <FiCopy className='h-4 w-4 text-gray-500 dark:text-gray-400' />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CodeSnippet;
