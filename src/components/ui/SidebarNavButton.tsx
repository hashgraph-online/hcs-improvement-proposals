import React from 'react';
import { motion } from 'framer-motion';

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
    <motion.button
      onClick={onClick}
      className={`
        w-full text-left rounded-lg transition-all duration-200
        ${isActive
          ? 'bg-gray-100 dark:bg-white/10 shadow-lg border border-gray-300 dark:border-white/20'
          : 'bg-transparent hover:bg-gray-50 dark:hover:bg-white/5'
        }
        ${className}
      `}
      whileHover={{ x: 2 }}
    >
      {children}
    </motion.button>
  );
};

export default SidebarNavButton;