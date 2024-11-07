import { cn } from '@site/src/lib/utils';
import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className='relative'>
        {icon && (
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:border-gray-700 dark:text-gray-100',
            'dark:focus-visible:border-gray-500 dark:focus-visible:ring-gray-400',
            'dark:placeholder:text-gray-400',
            'dark:focus:bg-gray-800',
            icon ? 'pl-10' : 'pl-3',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
