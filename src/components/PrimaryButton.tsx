import React from 'react';
import Link from '@docusaurus/Link';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

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
  const sizeMap = {
    small: 'sm' as const,
    medium: 'default' as const,
    large: 'lg' as const,
  };

  const buttonContent = (
    <Button
      variant="default"
      size={sizeMap[size]}
      onClick={href ? undefined : onClick}
      className={cn(
        'font-mono font-semibold bg-brand-blue hover:bg-[#4488ee] hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-xl',
        className
      )}
      asChild={!!href}
      {...props}
    >
      {href ? (
        <Link href={href} className="no-underline hover:no-underline">
          {children}
        </Link>
      ) : (
        children
      )}
    </Button>
  );

  return buttonContent;
};

export default PrimaryButton;
