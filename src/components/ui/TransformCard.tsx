import React from 'react';
import { motion } from 'framer-motion';

interface TransformCardProps {
  children: React.ReactNode;
  rotation?: string;
  background?: string;
  border?: string;
  className?: string;
  hover?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const TransformCard: React.FC<TransformCardProps> = ({
  children,
  rotation = '',
  background = 'bg-white dark:bg-gray-800',
  border = 'border border-gray-200 dark:border-gray-700',
  className = '',
  hover = true,
  shadow = 'lg',
  rounded = 'xl',
}) => {
  const getShadowClass = () => {
    switch (shadow) {
      case 'sm':
        return 'shadow-sm';
      case 'md':
        return 'shadow-md';
      case 'lg':
        return 'shadow-lg';
      case 'xl':
        return 'shadow-xl';
      default:
        return 'shadow-lg';
    }
  };

  const getRoundedClass = () => {
    switch (rounded) {
      case 'sm':
        return 'rounded-sm';
      case 'md':
        return 'rounded-md';
      case 'lg':
        return 'rounded-lg';
      case 'xl':
        return 'rounded-xl';
      case '2xl':
        return 'rounded-2xl';
      case '3xl':
        return 'rounded-3xl';
      default:
        return 'rounded-xl';
    }
  };

  const cardClasses = `
    ${background}
    ${border}
    ${getShadowClass()}
    ${getRoundedClass()}
    ${rotation}
    ${
      hover
        ? 'hover:scale-105 hover:-translate-y-1 transition-all duration-300'
        : ''
    }
    ${className}
  `.trim();

  return (
    <motion.div
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

export default TransformCard;
