import React, { ReactNode } from 'react';
import clsx from 'clsx';

type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption';

type TypographyProps = {
  variant: TypographyVariant;
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  align?: 'left' | 'center' | 'right';
  color?: 'default' | 'muted' | 'purple' | 'blue' | 'green';
  as?: React.ElementType;
  underline?: boolean;
  underlineColor?: 'purple' | 'blue' | 'green' | 'gradient';
};

const HackathonTypography: React.FC<TypographyProps> = ({
  variant,
  children,
  className = '',
  gradient = false,
  align = 'left',
  color = 'default',
  as,
  underline = false,
  underlineColor = 'gradient',
}) => {
  const getElementType = (): React.ElementType => {
    if (as) return as;

    switch (variant) {
      case 'display':
      case 'h1':
        return 'h1';
      case 'h2':
        return 'h2';
      case 'h3':
        return 'h3';
      case 'h4':
        return 'h4';
      case 'subtitle1':
      case 'subtitle2':
        return 'h5';
      case 'body1':
      case 'body2':
      case 'caption':
      default:
        return 'p';
    }
  };

  const Component = getElementType();

  const getColorClasses = (): string => {
    if (gradient) {
      return 'bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent';
    }

    switch (color) {
      case 'muted':
        return 'text-gray-600 dark:text-gray-300';
      case 'purple':
        return 'text-[#a679f0]';
      case 'blue':
        return 'text-[#5599fe]';
      case 'green':
        return 'text-[#48df7b]';
      case 'default':
      default:
        return 'text-gray-900 dark:text-white';
    }
  };

  const getFontClasses = (): string => {
    switch (variant) {
      case 'display':
        return 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-jakarta';
      case 'h1':
        return 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-jakarta';
      case 'h2':
        return 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-jakarta';
      case 'h3':
        return 'text-base sm:text-lg md:text-xl font-bold font-jakarta';
      case 'h4':
        return 'text-sm sm:text-base md:text-lg font-bold font-jakarta';
      case 'subtitle1':
        return 'text-sm sm:text-base md:text-lg font-semibold font-jakarta';
      case 'subtitle2':
        return 'text-xs sm:text-sm md:text-base font-semibold font-jakarta';
      case 'body1':
        return 'text-xs sm:text-sm md:text-base font-normal';
      case 'body2':
        return 'text-xs sm:text-sm font-normal';
      case 'caption':
        return 'text-xs font-medium';
      default:
        return 'text-sm sm:text-base font-normal';
    }
  };

  const getAlignmentClasses = (): string => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      case 'left':
      default:
        return 'text-left';
    }
  };

  const getUnderlineClasses = (): string => {
    if (!underline) return '';

    switch (underlineColor) {
      case 'purple':
        return 'border-b-2 border-[#a679f0] pb-1';
      case 'blue':
        return 'border-b-2 border-[#5599fe] pb-1';
      case 'green':
        return 'border-b-2 border-[#48df7b] pb-1';
      case 'gradient':
      default:
        return 'relative';
    }
  };

  return (
    <div
      className={
        underline && underlineColor === 'gradient'
          ? 'relative inline-block'
          : ''
      }
    >
      <Component
        className={clsx(
          getFontClasses(),
          getColorClasses(),
          getAlignmentClasses(),
          getUnderlineClasses(),
          className
        )}
        style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}
      >
        {children}
      </Component>
      {underline && underlineColor === 'gradient' && (
        <div
          className='absolute left-0 right-0 h-1 bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b]'
          style={{
            bottom: '-2px',
            height: '4px',
          }}
        />
      )}
    </div>
  );
};

export default HackathonTypography;
