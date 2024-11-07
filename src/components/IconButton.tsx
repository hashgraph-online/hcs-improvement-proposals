import React from 'react';

interface IconButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  children,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full transition-colors duration-200 ease-in-out 
                  hover:bg-gray-200 dark:hover:bg-gray-700 
                  focus:outline-none focus:ring-2 focus:ring-primary-500 
                  ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
