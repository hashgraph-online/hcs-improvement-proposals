import React, { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

interface CodeSnippetProps {
  code: string;
  language?: string;
  className?: string;
  showCopy?: boolean;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = 'typescript',
  className = '',
  showCopy = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <div className='bg-brand-dark rounded-lg p-4 overflow-x-auto'>
        <pre className='text-sm font-mono text-white leading-relaxed'>
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
      {showCopy && (
        <button
          onClick={handleCopy}
          className='absolute top-3 right-3 p-2 bg-brand-blue hover:bg-opacity-80 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200'
          aria-label='Copy code'
        >
          {copied ? <FaCheck size={14} /> : <FaCopy size={14} />}
        </button>
      )}
    </div>
  );
};

export default CodeSnippet;
