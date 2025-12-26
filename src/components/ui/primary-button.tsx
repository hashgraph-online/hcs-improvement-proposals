import React from 'react';
import { Button, buttonVariants } from './button';
import { motion } from 'motion/react';
import { FaArrowRight } from 'react-icons/fa';
import { cn } from '../../lib/utils';
import Link from '@docusaurus/Link';

type PrimaryButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
  isExternal?: boolean;
  umamiEvent?: string;
};

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (
    {
      children,
      href,
      onClick,
      className = '',
      icon = <FaArrowRight className='ml-2' />,
      size = 'md',
      variant = 'primary',
      isExternal = false,
      umamiEvent,
      ...props
    },
    ref
  ) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return 'bg-gradient-to-r from-[#8259ef] to-[#2d84eb] hover:from-[#7249df] hover:to-[#1d74db] text-white shadow-md hover:shadow-lg';
        case 'secondary':
          return 'bg-[#2d84eb]/10 text-[#2d84eb] hover:bg-[#2d84eb]/15 shadow-sm hover:shadow';
        case 'outline':
          return 'border border-[#2d84eb] text-[#2d84eb] hover:bg-[#2d84eb]/5';
        default:
          return 'bg-gradient-to-r from-[#8259ef] to-[#2d84eb] hover:from-[#7249df] hover:to-[#1d74db] text-white shadow-md hover:shadow-lg';
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case 'sm':
          return 'px-3 py-1.5 text-sm';
        case 'lg':
          return 'px-8 py-4 text-lg';
        default:
          return 'px-6 py-3 text-base';
      }
    };

    const buttonClass = cn(
      'font-medium rounded-lg transition-all inline-flex items-center justify-center no-underline hover:no-underline focus:no-underline active:no-underline',
      getVariantClasses(),
      getSizeClasses(),
      className
    );

    const MotionWrapper = ({ children }: { children: React.ReactNode }) => (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className='inline-block'
      >
        {children}
      </motion.div>
    );

    if (onClick) {
      return (
        <MotionWrapper>
          <button
            ref={ref}
            className={buttonClass}
            onClick={onClick}
            data-umami-event={umamiEvent}
            {...props}
          >
            <span className={cn(variant === 'primary' ? 'text-white' : '')}>
              {children}
            </span>
            {icon}
          </button>
        </MotionWrapper>
      );
    }

    if (href) {
      return (
        <MotionWrapper>
          {isExternal ? (
            <a
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              className={buttonClass}
              style={{ textDecoration: 'none' }}
              data-umami-event={umamiEvent}
            >
              <span className={cn(variant === 'primary' ? 'text-white' : '')}>
                {children}
              </span>
              {icon}
            </a>
          ) : (
            <Link
              to={href}
              className={buttonClass}
              style={{ textDecoration: 'none' }}
              data-umami-event={umamiEvent}
            >
              <span className={cn(variant === 'primary' ? 'text-white' : '')}>
                {children}
              </span>
              {icon}
            </Link>
          )}
        </MotionWrapper>
      );
    }

    return (
      <MotionWrapper>
        <button
          ref={ref}
          className={buttonClass}
          data-umami-event={umamiEvent}
          {...props}
        >
          <span className={cn(variant === 'primary' ? 'text-white' : '')}>
            {children}
          </span>
          {icon}
        </button>
      </MotionWrapper>
    );
  }
);

PrimaryButton.displayName = 'PrimaryButton';

export { PrimaryButton };
