import React from 'react';

interface SyntaxHighlightProps {
  code: string;
  language?: string;
  inline?: boolean;
  theme?: 'brand' | 'dark' | 'light';
  className?: string;
}

const SyntaxHighlight: React.FC<SyntaxHighlightProps> = ({
  code,
  language = 'javascript',
  inline = true,
  theme = 'brand',
  className = '',
}) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 text-gray-100';
      case 'light':
        return 'bg-gray-100 text-gray-900';
      case 'brand':
      default:
        return 'bg-gray-900 dark:bg-black text-gray-300';
    }
  };

  const getSyntaxHighlighting = (code: string) => {
    const keywords = [
      'const',
      'let',
      'var',
      'function',
      'class',
      'import',
      'export',
      'from',
      'await',
      'async',
      'return',
    ];
    const strings = /"[^"]*"/g;
    const comments = /\/\/.*$/gm;

    let highlighted = code;

    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(
        regex,
        `<span class="text-brand-purple">${keyword}</span>`
      );
    });

    highlighted = highlighted.replace(
      strings,
      '<span class="text-brand-green">$&</span>'
    );
    highlighted = highlighted.replace(
      comments,
      '<span class="text-gray-500">$&</span>'
    );

    return highlighted;
  };

  if (inline) {
    return (
      <code
        className={`px-2 py-1 rounded text-sm font-mono ${getThemeClasses()} ${className}`}
        dangerouslySetInnerHTML={{ __html: getSyntaxHighlighting(code) }}
      />
    );
  }

  return (
    <pre
      className={`p-4 rounded-lg overflow-x-auto ${getThemeClasses()} ${className}`}
    >
      <code
        className='text-sm font-mono'
        dangerouslySetInnerHTML={{ __html: getSyntaxHighlighting(code) }}
      />
    </pre>
  );
};

export default SyntaxHighlight;
