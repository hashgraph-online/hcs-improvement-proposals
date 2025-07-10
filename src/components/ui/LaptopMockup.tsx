import React from 'react';

interface LaptopMockupProps {
  children: React.ReactNode;
  className?: string;
}

export const LaptopMockup: React.FC<LaptopMockupProps> = ({ children, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Laptop Frame */}
      <div className='bg-gray-800 dark:bg-gray-700 rounded-t-2xl p-3 shadow-2xl relative'>
        {/* Screen Area */}
        <div className='bg-black rounded-lg overflow-hidden' style={{ aspectRatio: '16/10' }}>
          {children}
        </div>
        
        {/* Camera dot */}
        <div className='absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-600 dark:bg-gray-500 rounded-full'></div>
      </div>

      {/* Laptop Base Edge */}
      <div className='bg-gray-700 dark:bg-gray-600 h-6 rounded-b-2xl shadow-xl' style={{ width: '105%', marginLeft: '-2.5%' }}></div>
    </div>
  );
};