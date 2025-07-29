import React from 'react';
import { FaCopy } from 'react-icons/fa';

interface TerminalProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

interface TerminalLineProps {
  command?: string;
  output?: string;
  prompt?: string;
}

const TerminalLine: React.FC<TerminalLineProps> = ({
  command,
  output,
  prompt = '$',
}) => {
  if (command) {
    return (
      <div className='flex items-start space-x-2'>
        <span className='text-brand-green font-mono'>{prompt}</span>
        <span className='text-white font-mono'>{command}</span>
      </div>
    );
  }

  if (output) {
    return <div className='text-gray-300 font-mono text-sm pl-4'>{output}</div>;
  }

  return null;
};

const Terminal: React.FC<TerminalProps> = ({
  title = 'Terminal',
  children,
  className = '',
}) => {
  return (
    <div
      className={`bg-gray-900 rounded-lg overflow-hidden shadow-lg ${className}`}
    >
      <div className='bg-gray-800 px-4 py-2 flex items-center space-x-2'>
        <div className='flex space-x-2'>
          <div className='w-3 h-3 bg-brand-purple rounded-full'></div>
          <div className='w-3 h-3 bg-brand-blue rounded-full'></div>
          <div className='w-3 h-3 bg-brand-green rounded-full'></div>
        </div>
        <span className='text-gray-400 text-sm font-mono ml-4'>{title}</span>
      </div>
      <div className='p-4 space-y-2'>{children}</div>
    </div>
  );
};

(Terminal as any).Line = TerminalLine;

export default Terminal;
