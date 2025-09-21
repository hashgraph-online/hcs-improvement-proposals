import React from 'react';
import { StatusBadge, TransformCard, Typography } from '../ui';
import TutorialPrimaryButton from './TutorialPrimaryButton';
import { TutorialItem } from './types';

interface TutorialMainContentProps {
  item: TutorialItem;
  index: number;
}

const TutorialMainContent: React.FC<TutorialMainContentProps> = ({ item: tutorial }) => {
  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'info';
    }
  };

  const isAvailable = tutorial.href !== '#';

  return (
    <div className='relative'>
      <TransformCard
        rotation='rotate-0'
        background='bg-white dark:bg-gray-800'
        border='border border-gray-200 dark:border-gray-700'
        shadow='lg'
        rounded='2xl'
        className='overflow-hidden'
      >
        <div className='p-4 sm:p-6 space-y-4'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
            <div className='flex flex-wrap items-center gap-2'>
              <StatusBadge variant='primary' className='font-bold text-xs sm:text-sm'>
                {tutorial.standard}
              </StatusBadge>
              <StatusBadge variant={getDifficultyVariant(tutorial.difficulty)} className='text-xs sm:text-sm'>
                {tutorial.difficulty}
              </StatusBadge>
            </div>
            <div className='flex items-center gap-2 text-gray-500 dark:text-gray-400'>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span className='text-xs sm:text-sm font-semibold'>{tutorial.duration}</span>
            </div>
          </div>

          <div className='space-y-2'>
            <Typography variant='h3' className='text-xl sm:text-2xl font-bold'>
              {tutorial.title}
            </Typography>
            <Typography color='muted' className='text-xs sm:text-sm leading-relaxed'>
              {tutorial.description}
            </Typography>
          </div>

          {tutorial.codeExample && (
            <div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-3'>
              <div className='text-xs text-gray-500 mb-1'>Example:</div>
              <code className='text-xs font-mono text-brand-blue dark:text-brand-blue break-all'>
                {tutorial.codeExample}
              </code>
            </div>
          )}

          {tutorial.learningOutcomes && (
            <div className='space-y-2'>
              <Typography variant='h4' className='text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300'>
                What you'll learn:
              </Typography>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {tutorial.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className='flex items-start gap-2'>
                    <svg className='w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <Typography className='text-xs text-gray-600 dark:text-gray-400'>
                      {outcome}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className='pt-4'>
            {isAvailable ? (
              <TutorialPrimaryButton 
                href={tutorial.href} 
                size='small'
              >
                Start Tutorial →
              </TutorialPrimaryButton>
            ) : (
              <div className='text-center py-2 sm:py-3 bg-gray-100 dark:bg-gray-700 rounded-lg'>
                <StatusBadge variant='warning' className='text-xs sm:text-sm'>
                  Coming Soon
                </StatusBadge>
              </div>
            )}
          </div>
        </div>
      </TransformCard>
    </div>
  );
};

export default TutorialMainContent;