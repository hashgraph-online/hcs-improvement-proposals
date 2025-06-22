import React from 'react';
import classNames from 'classnames';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'caption'
  | 'code'
  | 'comment'
  | 'function'
  | 'variable';

type GradientType = 'brand' | 'blue' | 'green' | 'purple';
type ColorType =
  | 'default'
  | 'muted'
  | 'blue'
  | 'green'
  | 'purple'
  | 'white'
  | 'gray';

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  gradient?: GradientType;
  color?: ColorType;
  mono?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  gradient,
  color,
  mono = false,
  className,
  as,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'h1':
        return 'text-4xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight';
      case 'h2':
        return 'text-3xl lg:text-5xl xl:text-6xl font-black leading-tight tracking-tight';
      case 'h3':
        return 'text-2xl lg:text-4xl font-bold leading-tight';
      case 'h4':
        return 'text-xl lg:text-2xl font-bold leading-tight';
      case 'h5':
        return 'text-lg lg:text-xl font-bold';
      case 'h6':
        return 'text-base lg:text-lg font-bold';
      case 'body':
        return 'text-base leading-relaxed';
      case 'caption':
        return 'text-sm';
      case 'code':
        return 'text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border';
      case 'comment':
        return 'text-xs uppercase tracking-[0.3em] lg:tracking-[0.6em]';
      case 'function':
        return 'font-semibold';
      case 'variable':
        return 'font-medium';
      default:
        return 'text-base';
    }
  };

  const getGradientClasses = () => {
    if (!gradient) return '';

    switch (gradient) {
      case 'brand':
        return 'bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text text-transparent';
      case 'blue':
        return 'bg-gradient-to-r from-brand-blue to-blue-400 bg-clip-text text-transparent';
      case 'green':
        return 'bg-gradient-to-r from-brand-green to-emerald-400 bg-clip-text text-transparent';
      case 'purple':
        return 'bg-gradient-to-r from-brand-purple to-purple-400 bg-clip-text text-transparent';
      default:
        return '';
    }
  };

  const getColorClasses = () => {
    if (gradient) return ''; // Gradient overrides color

    switch (color) {
      case 'muted':
        return 'text-gray-600 dark:text-gray-400';
      case 'blue':
        return 'text-brand-blue';
      case 'green':
        return 'text-brand-green';
      case 'purple':
        return 'text-brand-purple';
      case 'white':
        return 'text-white';
      case 'gray':
        return 'text-gray-500 dark:text-gray-400';
      case 'default':
      default:
        return 'text-gray-900 dark:text-white';
    }
  };

  const classes = classNames(
    getVariantClasses(),
    getGradientClasses(),
    getColorClasses(),
    mono ||
      [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'code',
        'comment',
        'function',
        'variable',
      ].includes(variant)
      ? 'font-mono'
      : '',
    className
  );

  const Component =
    as ||
    (() => {
      switch (variant) {
        case 'h1':
          return 'h1';
        case 'h2':
          return 'h2';
        case 'h3':
          return 'h3';
        case 'h4':
          return 'h4';
        case 'h5':
          return 'h5';
        case 'h6':
          return 'h6';
        case 'code':
          return 'code';
        case 'comment':
          return 'span';
        case 'function':
          return 'span';
        case 'variable':
          return 'span';
        default:
          return 'p';
      }
    })();

  return <Component className={classes}>{children}</Component>;
};

// Specialized coding components
export const CodeComment: React.FC<{
  children: React.ReactNode;
  color?: ColorType;
  className?: string;
}> = ({ children, color = 'green', className }) => (
  <Typography variant='comment' color={color} className={className}>
    <span className='text-muted'>//</span> {children}
  </Typography>
);

export const FunctionCall: React.FC<{
  name: string;
  params?: string;
  color?: ColorType;
  className?: string;
}> = ({ name, params, color = 'blue', className }) => (
  <Typography variant='function' color={color} mono className={className}>
    {name}({params})
  </Typography>
);

export const Variable: React.FC<{
  name: string;
  value?: string;
  color?: ColorType;
  className?: string;
}> = ({ name, value, color = 'purple', className }) => (
  <Typography variant='variable' color={color} mono className={className}>
    {name}
    {value && ` = ${value}`}
  </Typography>
);

export const CodeHeading: React.FC<{
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  gradient?: GradientType;
  className?: string;
}> = ({ children, level = 2, gradient = 'brand', className }) => (
  <Typography
    variant={`h${level}` as TypographyVariant}
    gradient={gradient}
    mono
    className={className}
  >
    {children}
  </Typography>
);

export default Typography;
