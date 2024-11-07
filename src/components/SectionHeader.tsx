import React from 'react';

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ children, className = '', dark = false }) => {
  return (
    <h2 className={`text-4xl md:text-6xl font-extrabold text-center mb-8 underline decoration-blue-500 decoration-4 relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-indigo-500 after:transition-all after:duration-300 hover:after:from-indigo-500 hover:after:to-blue-500 ${dark ? 'text-white dark:text-gray-100' : 'text-gray-800 dark:text-white'} ${className}`}>
      {children}
    </h2>
  );
};

export default SectionHeader;