import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  gradient?: 'brand' | 'blue-green' | 'purple-blue' | 'green-blue' | 'custom';
  customGradient?: string;
  className?: string;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  gradient = 'brand',
  customGradient,
  className = '',
  as = 'span',
}) => {
  const getGradientClass = () => {
    if (customGradient) {
      return customGradient;
    }

    switch (gradient) {
      case 'brand':
        return 'bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green';
      case 'blue-green':
        return 'bg-gradient-to-r from-brand-blue to-brand-green';
      case 'purple-blue':
        return 'bg-gradient-to-r from-brand-purple to-brand-blue';
      case 'green-blue':
        return 'bg-gradient-to-r from-brand-green to-brand-blue';
      default:
        return 'bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green';
    }
  };

  const Component = as;
  const classes = `${getGradientClass()} bg-clip-text text-transparent ${className}`;

  return <Component className={classes}>{children}</Component>;
};

export default GradientText;
