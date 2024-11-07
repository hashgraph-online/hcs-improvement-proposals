import React from 'react';
import classNames from 'classnames';

interface SecondaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  href,
  onClick,
  className,
  ...props
}) => {
  const classes = classNames(
    'text-sm inline-block font-semibold text-blue-600 py-1 px-3 rounded transition-colors duration-300',
    'bg-transparent hover:bg-blue-100',
    'border border-blue-600',
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

export default SecondaryButton;
