import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold font-mono transition-all transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 no-underline hover:no-underline hover:scale-105 hover:-translate-y-1 active:scale-95',
  {
    variants: {
      variant: {
        primary: 'bg-brand-blue hover:bg-[#4488ee] dark:bg-brand-blue dark:hover:bg-[#4488ee] text-white dark:text-white shadow-md hover:shadow-xl',
        secondary: 'bg-[#3f4174] hover:bg-[#2f315f] dark:bg-[#4b5563] dark:hover:bg-[#374151] text-white dark:text-white shadow-md hover:shadow-xl',
        outline: 'border-2 border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
        ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
        link: 'text-blue-600 underline-offset-4 hover:underline dark:text-blue-400',
        // Keep original variants for compatibility
        default: 'bg-blue-600 text-white shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600 hover:shadow-xl',
        destructive: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600',
      },
      size: {
        default: 'h-10 px-5 py-2 text-base',
        small: 'h-8 px-4 py-1.5 text-sm',
        sm: 'h-9 px-3 text-sm',
        medium: 'h-10 px-5 py-2 text-base',
        large: 'h-12 px-6 py-3 text-lg',
        lg: 'h-11 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
