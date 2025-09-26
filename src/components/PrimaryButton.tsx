import React from 'react';
import classNames from 'classnames';

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  href,
  onClick,
  className,
  size = 'medium',
  ...props
}) => {
  const classes = classNames(
    'inline-block font-mono font-semibold text-white rounded-lg transition-all duration-300 transform',
    'bg-brand-blue hover:bg-[#4488ee] hover:text-white hover:scale-105 hover:-translate-y-1',
    'border border-transparent shadow-md hover:shadow-xl active:scale-95',
    'focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50',
    'no-underline hover:no-underline text-center',
    size === 'small' && 'text-sm py-2 px-4',
    size === 'medium' && 'text-base py-3 px-6',
    size === 'large' && 'text-lg py-4 px-8',
    className
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default PrimaryButton;