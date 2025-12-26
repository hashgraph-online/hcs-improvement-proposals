import React from 'react';
import { motion } from 'motion/react';

interface StatusBadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'info' | 'warning' | 'default';
  animated?: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  variant = 'default',
  animated = false,
  className = '',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100/80 dark:bg-green-800/80 border-green-200/50 dark:border-green-700/50 text-green-700 dark:text-green-400';
      case 'info':
        return 'bg-blue-100/80 dark:bg-blue-800/80 border-blue-200/50 dark:border-blue-700/50 text-blue-600 dark:text-blue-400';
      case 'warning':
        return 'bg-yellow-100/80 dark:bg-yellow-800/80 border-yellow-200/50 dark:border-yellow-700/50 text-yellow-600 dark:text-yellow-400';
      default:
        return 'bg-gray-100/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400';
    }
  };

  const getDotColor = () => {
    switch (variant) {
      case 'success':
        return 'bg-gradient-to-r from-brand-green to-emerald-400';
      case 'info':
        return 'bg-gradient-to-r from-brand-blue to-blue-400';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500 to-orange-400';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-400';
    }
  };

  return (
    <div
      className={`inline-flex items-center space-x-2 backdrop-blur-sm rounded-full px-4 py-2 border ${getVariantClasses()} ${className}`}
    >
      <div
        className={`w-2 h-2 rounded-full ${getDotColor()} ${
          animated ? 'animate-pulse' : ''
        }`}
      ></div>
      <span className='text-xs font-mono uppercase tracking-wide text-current'>
        {children}
      </span>
    </div>
  );
};

export default StatusBadge;
