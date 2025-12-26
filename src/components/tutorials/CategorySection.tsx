import React, { useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { Typography } from '../ui';
import TutorialCard from './TutorialCard';
import { TutorialCategory } from './types';

interface CategorySectionProps {
  category: TutorialCategory;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  const availableCount = category.tutorials.filter(t => t.href !== '#').length;
  const totalCount = category.tutorials.length;
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={controls}
      variants={{
        visible: { opacity: 1, transition: { duration: 0.6 } }
      }}
      className='py-8 sm:py-12'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-6 sm:mb-8'>
          <div className='flex items-center gap-2 sm:gap-3 mb-2'>
            {category.icon && <span className='text-2xl sm:text-3xl'>{category.icon}</span>}
            <Typography variant='h2' className='text-xl sm:text-2xl font-bold'>
              {category.title}
            </Typography>
          </div>
          <Typography color='muted' className='text-sm sm:text-base mb-3 sm:mb-4'>
            {category.description}
          </Typography>
          <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4'>
            <div className='flex-1 max-w-xs h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(availableCount / totalCount) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className='h-full bg-gradient-to-r from-brand-blue to-brand-green rounded-full'
              />
            </div>
            <Typography color='muted' className='text-xs sm:text-sm font-semibold'>
              {availableCount} of {totalCount} available
            </Typography>
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
          {category.tutorials.map((tutorial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 }
                }
              }}
            >
              <TutorialCard tutorial={tutorial} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CategorySection;