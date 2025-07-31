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
  'data-umami-event'?: string;
  'data-umami-event-category'?: string;
  [key: string]: any;
};

const PrimaryButton = ({
  children,
  href,
  onClick,
  className = '',
  icon = <FaArrowRight className='text-xs sm:text-sm' />,
  size = 'md',
  ...dataAttributes
}: PrimaryButtonProps) => {
  const baseStyle =
    'font-mono font-bold rounded-lg bg-[#5599fe] hover:bg-[#3f82e4] text-white hover:text-white focus:text-white active:text-white visited:text-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-1 sm:gap-2 no-underline hover:no-underline focus:no-underline active:no-underline visited:no-underline focus:outline-none focus:ring-2 focus:ring-[#5599fe]/50 focus:ring-offset-2';

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-xs',
    md: 'px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm',
    lg: 'px-3.5 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base',
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
        {...dataAttributes}
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
      {...dataAttributes}
    >
      <span className='text-white'>{children}</span> {icon}
    </motion.a>
  );
};

export default PrimaryButton;
