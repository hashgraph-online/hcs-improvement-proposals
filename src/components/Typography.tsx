import React from 'react';
import clsx from 'clsx';

interface TypographyProps {
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'body1'
    | 'body2'
    | 'subtitle1'
    | 'code'
    | 'mono'
    | 'caption';
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'default' | 'success' | 'accent';
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className,
  color = 'default',
}) => {
  const baseStyles = 'font-sans leading-relaxed';
  const colorStyles = {
    primary: 'text-brand-blue',
    secondary: 'text-gray-700 dark:text-gray-300',
    default: 'text-brand-dark',
    success: 'text-brand-green',
    accent: 'text-brand-purple',
  };

  const variantStyles = {
    h1: 'text-4xl md:text-6xl font-mono font-bold mb-6 text-brand-dark',
    h2: 'text-3xl md:text-5xl font-mono font-bold mb-5 text-brand-dark',
    h3: 'text-2xl md:text-4xl font-mono font-semibold mb-4 text-brand-dark',
    h4: 'text-xl md:text-3xl font-mono font-semibold mb-3 text-brand-dark',
    h5: 'text-lg md:text-2xl font-mono font-medium mb-2 text-brand-dark',
    h6: 'text-base md:text-xl font-mono font-medium mb-2 text-brand-dark',
    p: 'text-base md:text-lg mb-4 font-sans text-brand-dark',
    body1: 'text-base md:text-lg mb-4 font-sans text-brand-dark',
    body2: 'text-sm md:text-base mb-2 font-sans text-brand-dark',
    subtitle1:
      'text-base md:text-lg font-medium mb-2 font-mono text-brand-dark',
    code: 'text-sm font-mono bg-gray-100 px-2 py-1 rounded border text-brand-dark',
    mono: 'text-base font-mono text-brand-dark',
    caption: 'text-xs md:text-sm text-gray-600 font-sans',
  };

  const getHtmlElement = () => {
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'].includes(variant)) {
      return variant as keyof JSX.IntrinsicElements;
    }
    if (variant === 'code') {
      return 'code';
    }
    return 'p'; // Default for body1, body2, subtitle1, mono, caption
  };

  const Component = getHtmlElement();

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
