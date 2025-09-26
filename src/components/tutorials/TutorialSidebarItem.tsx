import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../ui';
import { TutorialItem } from './types';

interface TutorialSidebarItemProps {
  item: TutorialItem;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const TutorialSidebarItem: React.FC<TutorialSidebarItemProps> = ({ 
  item: tutorial, 
  index, 
  isActive, 
  onClick 
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onClick={onClick}
      className={`cursor-pointer transition-all duration-500 relative ${
        isActive
          ? 'bg-gradient-to-r from-brand-blue/20 via-brand-purple/10 to-brand-green/20 shadow-lg border-l-4 border-brand-blue scale-[1.02]'
          : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-transparent hover:scale-[1.01]'
      } rounded-r-xl p-2 sm:p-3 group`}
      style={{
        borderLeftColor: isActive ? '#3b82f6' : 'transparent',
        margin: '0.25rem 0.5rem 0.25rem 0',
      }}
    >
      <div className='relative z-10 space-y-1 sm:space-y-2'>
        <span className={`text-xs font-mono font-bold ${
          isActive ? 'text-brand-blue dark:text-brand-blue' : 'text-gray-700 dark:text-gray-400'
        }`}>
          {tutorial.category}
        </span>

        <Typography className={`text-xs sm:text-sm font-semibold ${
          isActive ? 'text-gray-900 dark:text-white' : 'text-gray-800 dark:text-gray-300'
        }`}>
          {tutorial.name}
        </Typography>

        <div className='flex flex-wrap items-center gap-1 sm:gap-2'>
          <div className='px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium'
            style={{
              backgroundColor: `${getDifficultyColor(tutorial.difficulty)}20`,
              color: getDifficultyColor(tutorial.difficulty),
            }}
          >
            {tutorial.difficulty}
          </div>
          <span className='text-xs text-gray-500'>{tutorial.duration}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorialSidebarItem;