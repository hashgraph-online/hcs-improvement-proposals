import React from 'react';
import classNames from 'classnames';

interface SecondaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  href,
  onClick,
  className,
  size = 'medium',
  ...props
}) => {
  const classes = classNames(
    'inline-block font-mono font-semibold text-brand-blue rounded-lg transition-all duration-300',
    'bg-transparent hover:bg-brand-blue hover:text-white',
    'border border-brand-blue shadow-sm hover:shadow-md',
    'focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50',
    'no-underline hover:no-underline text-center',
    {
      'text-sm py-2 px-4': size === 'small',
      'text-base py-3 px-6': size === 'medium',
      'text-lg py-4 px-8': size === 'large',
    },
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

export default SecondaryButton;
