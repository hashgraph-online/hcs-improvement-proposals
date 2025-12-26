'use client';
import { cn } from '@site/src/lib/utils';
import { motion } from 'motion/react';
import { forwardRef, HTMLAttributes, useState } from 'react';
import Typography from '../Typography';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  image?: string;
  noBorder?: boolean;
  disableGrow?: boolean;
  disableUnderline?: boolean; // Add this new prop
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      image,
      noBorder = false,
      disableGrow = false,
      disableUnderline = false,
      ...props
    }, // Add disableUnderline here
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative flex flex-col overflow-hidden rounded-lg text-gray-900 dark:text-white',
          !noBorder && 'border border-gray-200 dark:border-gray-800',
          !noBorder && 'shadow-md transition-shadow duration-300 ease-in-out',
          isHovered && !disableGrow && 'shadow-xl',
          className
        )}
        initial={false}
        animate={{
          scale: isHovered && !disableGrow ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {image && (
          <div
            className='absolute inset-0 bg-cover bg-center z-0'
            style={{ backgroundImage: `url(${image})` }}
          />
        )}
        <div className='absolute inset-0 bg-gradient-to-br from-transparent to-gray-100/50 dark:to-gray-800/50' />
        <div className='relative z-10 flex flex-col flex-grow'>
          {props.children}
        </div>
        {!disableUnderline && ( // Add this condition
          <div
            className={cn(
              'absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500',
              'transform transition-transform duration-300 ease-in-out',
              isHovered ? 'scale-x-100' : 'scale-x-0'
            )}
          />
        )}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn('flex flex-col p-2 px-6', className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'inherit';
  noMargin?: boolean;
}

const CardTitle = forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, variant, noMargin = false, ...props }, ref) => (
    <Typography
      ref={ref}
      variant={variant || 'h5'}
      noMargin={noMargin}
      {...props}
      className={cn(className, 'font-bold')}
    />
  )
);
CardTitle.displayName = 'CardTitle';
const CardSubTitle = forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, variant, ...props }, ref) => (
    <Typography
      ref={ref}
      {...props}
      className={cn(className, 'font-bold mb-none mt-none')}
    />
  )
);

CardSubTitle.displayName = 'CardSubTitle';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn('p-6 pt-0 flex-grow', className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn('flex items-center p-6 pt-0 mt-auto', className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

const CardImage = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn('overflow-hidden', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  )
);
CardImage.displayName = 'CardImage';

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn('text-sm text-gray-500 dark:text-gray-400 mt-4', className)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.2, delay: 0.1 }}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle,
  CardSubTitle,
  CardContent,
  CardImage,
};
