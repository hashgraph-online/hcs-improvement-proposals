import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

type PrimaryButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

const PrimaryButton = ({
  children,
  href,
  onClick,
  className = '',
  icon = <FaArrowRight className='text-xs sm:text-sm' />,
  size = 'md',
}: PrimaryButtonProps) => {
  const baseStyle =
    'font-bold rounded-lg bg-gradient-to-r from-hedera-purple to-hedera-blue text-white hover:text-white focus:text-white active:text-white visited:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:brightness-110 flex items-center justify-center gap-1 sm:gap-2 no-underline hover:no-underline focus:no-underline active:no-underline visited:no-underline focus:outline-none focus:ring-2 focus:ring-hedera-purple/50 focus:ring-offset-2';

  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm',
    md: 'px-3.5 py-2 text-sm sm:px-6 sm:py-3 sm:text-base',
    lg: 'px-4 py-2.5 text-base sm:px-8 sm:py-4 sm:text-lg',
  };

  const combinedClassName = `${baseStyle} ${sizeClasses[size]} ${className}`;

  const isExternalLink = href?.startsWith('http');

  if (onClick) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={combinedClassName}
        onClick={onClick}
      >
        <span className='text-white'>{children}</span> {icon}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      target={isExternalLink ? '_blank' : undefined}
      rel={isExternalLink ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={combinedClassName}
      style={{ textDecoration: 'none' }}
    >
      <span className='text-white'>{children}</span> {icon}
    </motion.a>
  );
};

export default PrimaryButton;
