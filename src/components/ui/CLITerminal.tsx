import React from 'react';

type CLITerminalProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * CLI Terminal component with macOS-style window chrome
 */
const CLITerminal: React.FC<CLITerminalProps> = ({ 
  title = 'Conversational Agent Chat (testnet)', 
  children, 
  className = '' 
}) => {
  return (
    <div className={`bg-gray-900 rounded-lg p-4 font-mono text-xs leading-relaxed shadow-2xl ${className}`}>
      <div className='flex items-center gap-2 mb-3 pb-2 border-b border-gray-700'>
        <div className='flex gap-1.5'>
          <div className='w-3 h-3 rounded-full bg-red-500'></div>
          <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
          <div className='w-3 h-3 rounded-full bg-green-500'></div>
        </div>
        <span className='text-gray-400 text-xs ml-2'>{title}</span>
      </div>
      <div className='space-y-2 text-gray-300'>
        {children}
      </div>
    </div>
  );
};

export default CLITerminal;