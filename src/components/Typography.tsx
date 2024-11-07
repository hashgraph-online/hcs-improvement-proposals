import React from 'react';
import clsx from 'clsx';

interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'default';
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className,
  color = 'default',
}) => {
  const baseStyles = 'font-sans leading-relaxed';
  const colorStyles = {
    primary: 'text-blue-600 dark:text-blue-400',
    secondary: 'text-gray-700 dark:text-gray-300',
    default: 'text-gray-900 dark:text-white',
  };

  const variantStyles = {
    h1: 'text-4xl md:text-6xl font-extrabold mb-6',
    h2: 'text-3xl md:text-5xl font-bold mb-5',
    h3: 'text-2xl md:text-4xl font-semibold mb-4',
    h4: 'text-xl md:text-3xl font-semibold mb-3',
    h5: 'text-lg md:text-2xl font-medium mb-2',
    h6: 'text-base md:text-xl font-medium mb-2',
    p: 'text-base md:text-lg mb-4',
  };

  const Component = variant;

  return (
    <Component
      className={clsx(
        baseStyles,
        variantStyles[variant],
        colorStyles[color],
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Typography;
