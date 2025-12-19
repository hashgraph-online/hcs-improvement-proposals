import React from 'react';

interface TerminalProps {
  title?: string;
  children: React.ReactNode;
  theme?: 'dark' | 'light' | 'system';
  className?: string;
  showControls?: boolean;
  headerActions?: React.ReactNode;
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
  prompt,
  type = 'command',
  className = '',
  onClick,
  clickable = false,
}) => {
  if (command) {
    return (
      <div 
        className={`flex items-center ${prompt ? 'space-x-2' : ''} ${className} ${clickable ? 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 py-1 rounded transition-colors duration-200' : ''}`}
        onClick={onClick}
      >
        {prompt && <span className='text-brand-green font-mono'>{prompt}</span>}
        <span className='font-mono'>{command}</span>
      </div>
    );
  }

  if (output) {
    return (
      <div
        className={`font-mono text-sm pl-4 ${
          type === 'comment' ? 'text-gray-500' : type === 'output' ? 'text-green-500' : 'opacity-90'
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
  theme = 'system',
  className = '',
  showControls = true,
  headerActions,
}) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return {
          container: 'bg-gray-100 border-gray-300',
          header: 'bg-gray-200',
          content: 'bg-white text-gray-900',
          title: 'text-gray-600',
        };
      case 'dark':
        return {
          container: 'bg-gray-900 border-gray-700',
          header: 'bg-gray-800',
          content: 'bg-gray-900 text-gray-100',
          title: 'text-gray-400',
        };
      case 'system':
      default:
        return {
          container: 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700',
          header: 'bg-gray-200 dark:bg-gray-800',
          content: 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100',
          title: 'text-gray-600 dark:text-gray-400',
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div
      className={`rounded-xl overflow-hidden border shadow-2xl ${themeClasses.container} ${className}`}
    >
      {showControls && (
        <div
          className={`px-4 py-3 flex items-center justify-between ${themeClasses.header}`}
        >
          <div className='flex items-center space-x-2'>
            <div className='flex space-x-2'>
              <div className='w-3 h-3 bg-brand-purple rounded-full'></div>
              <div className='w-3 h-3 bg-brand-blue rounded-full'></div>
              <div className='w-3 h-3 bg-brand-green rounded-full'></div>
            </div>
            <span className={`text-sm font-mono ml-4 ${themeClasses.title}`}>{title}</span>
          </div>
          {headerActions && <div className='flex items-center gap-2'>{headerActions}</div>}
        </div>
      )}

      <div className={`p-3 space-y-2 ${themeClasses.content}`}>{children}</div>
    </div>
  );
};

Terminal.Line = TerminalLine;

export default Terminal;
export { TerminalLine };
