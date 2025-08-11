import React from 'react';

interface TerminalProps {
  title?: string;
  children: React.ReactNode;
  theme?: 'dark' | 'light';
  className?: string;
  showControls?: boolean;
}

interface TerminalLineProps {
  command?: string;
  output?: string;
  prompt?: string;
  type?: 'command' | 'output' | 'comment';
  onClick?: () => void;
  clickable?: boolean;
}

const TerminalLine: React.FC<TerminalLineProps & { className?: string }> = ({
  command,
  output,
  prompt = '$',
  type = 'command',
  className = '',
  onClick,
  clickable = false,
}) => {
  if (command) {
    return (
      <div 
        className={`flex items-start space-x-2 ${className} ${clickable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 -mx-2 px-2 py-1 rounded transition-colors duration-200' : ''}`}
        onClick={onClick}
      >
        <span className='text-brand-green font-mono'>{prompt}</span>
        <span className='text-gray-900 dark:text-white font-mono'>{command}</span>
      </div>
    );
  }

  if (output) {
    return (
      <div
        className={`font-mono text-sm pl-4 ${
          type === 'comment' ? 'text-gray-600 dark:text-gray-500' : type === 'output' ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'
        } ${className}`}
      >
        {output}
      </div>
    );
  }

  return null;
};

interface TerminalComponent extends React.FC<TerminalProps> {
  Line: typeof TerminalLine;
}

const Terminal: TerminalComponent = ({
  title = 'terminal',
  children,
  theme = 'dark',
  className = '',
  showControls = true,
}) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return {
          container: 'bg-gray-100 border-gray-300',
          header: 'bg-gray-200',
          content: 'bg-white text-gray-900',
        };
      case 'dark':
      default:
        return {
          container: 'bg-gray-900 border-gray-700',
          header: 'bg-gray-800',
          content: 'bg-gray-900 text-gray-100',
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div
      className={`rounded-xl overflow-hidden border shadow-2xl bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 ${className}`}
    >
      {showControls && (
        <div
          className={`px-4 py-3 flex items-center space-x-2 bg-gray-200 dark:bg-gray-800`}
        >
          <div className='flex space-x-2'>
            <div className='w-3 h-3 bg-brand-purple rounded-full'></div>
            <div className='w-3 h-3 bg-brand-blue rounded-full'></div>
            <div className='w-3 h-3 bg-brand-green rounded-full'></div>
          </div>
          <span className='text-sm font-mono text-gray-600 dark:text-gray-400 ml-4'>{title}</span>
        </div>
      )}

      <div className={`p-6 space-y-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>{children}</div>
    </div>
  );
};

Terminal.Line = TerminalLine;

export default Terminal;
export { TerminalLine };
