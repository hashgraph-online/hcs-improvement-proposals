import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { StatusBadge, TransformCard, Typography } from '../ui';
import TutorialSecondaryButton from './TutorialSecondaryButton';
import { Tutorial } from './types';

interface TutorialCardProps {
  tutorial: Tutorial;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial }) => {
  const isAvailable = tutorial.href !== '#';
  const [isHovered, setIsHovered] = useState(false);
  
  const variants = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'error'
  } as const;
  
  return (
    <div
    >
      <Link 
        to={isAvailable ? tutorial.href : '#'} 
        className={`block h-full ${!isAvailable ? 'opacity-60 cursor-not-allowed' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <TransformCard
          rotation={isHovered ? 'rotate-[-1deg]' : 'rotate-0'}
          background='bg-white dark:bg-gray-800'
          border='border border-gray-200 dark:border-gray-700'
          shadow='md'
          rounded='xl'
          className='p-4 sm:p-6 h-full hover:shadow-xl transition-all duration-300 min-h-[280px] sm:min-h-[320px]'
        >
          <div className='flex flex-col h-full justify-between'>
            <div>
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3 sm:mb-4'>
                <Typography variant='h4' className='text-base sm:text-lg font-bold flex-1'>
                  {tutorial.title}
                </Typography>
                <StatusBadge variant='primary' className='text-xs flex-shrink-0 self-start'>
                  {tutorial.standard}
                </StatusBadge>
              </div>
              
              <Typography color='muted' className='text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3'>
                {tutorial.description}
              </Typography>
            </div>
            
            <div className='mt-auto'>
              <div className='flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700'>
                <StatusBadge variant={variants[tutorial.difficulty]} className='font-bold text-xs sm:text-sm'>
                  {tutorial.difficulty}
                </StatusBadge>
                <div className='flex items-center gap-1 text-gray-500 dark:text-gray-400'>
                  <svg width="12" height="12" className='sm:w-[14px] sm:h-[14px]' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <Typography color='muted' className='text-xs sm:text-sm'>
                    {tutorial.duration}
                  </Typography>
                </div>
              </div>
              
              {isAvailable ? (
                <div
                  className='mt-3 sm:mt-4'
                >
                  <TutorialSecondaryButton 
                    href={tutorial.href} 
                    size='small'
                  >
                    Start Tutorial →
                  </TutorialSecondaryButton>
                </div>
              ) : (
                <div className='mt-3 sm:mt-4 text-center'>
                  <StatusBadge variant='warning' className='text-xs sm:text-sm'>
                    Coming Soon
                  </StatusBadge>
                </div>
              )}
            </div>
          </div>
        </TransformCard>
      </Link>
    </div>
  );
};

export default TutorialCard;