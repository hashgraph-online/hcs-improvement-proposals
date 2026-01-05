import React from 'react';

interface SidebarNavButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable sidebar navigation button with consistent dark mode styling
 */
const SidebarNavButton: React.FC<SidebarNavButtonProps> = ({
  isActive,
  onClick,
  children,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left rounded-lg transition-all duration-200 border
        ${isActive
          ? 'bg-gray-100 dark:bg-white/10 shadow-lg border-gray-200/50 dark:border-white/20 backdrop-blur-sm'
          : 'bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 border-transparent hover:border-gray-200/30 dark:hover:border-white/10'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default SidebarNavButton;