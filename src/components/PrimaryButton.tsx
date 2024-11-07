import React from 'react';
import classNames from 'classnames';

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  href,
  onClick,
  className,
  ...props
}) => {
  const classes = classNames(
    'text-sm hinline-block font-semibold text-white py-1.5 px-3 rounded transition-colors duration-300',
    'bg-blue-500 hover:bg-blue-600 hover:text-white',
    'border border-transparent', // Added transparent border
    'focus:outline-none focus:ring-2 focus:ring-blue-600',
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
