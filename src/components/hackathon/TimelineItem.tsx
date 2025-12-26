import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import HackathonTypography from './HackathonTypography';

export const TimelineItem: React.FC<{
  icon: React.ReactNode;
  date: string;
  title: string;
  description: string;
  index: number;
  isLast?: boolean;
  isHighlighted?: boolean;
}> = ({
  icon,
  date,
  title,
  description,
  index,
  isLast = false,
  isHighlighted = false,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`mb-16 last:mb-0 relative ${
        isHighlighted ? 'z-50' : 'z-40'
      } ${
        index % 2 === 0 
          ? 'md:mr-[50%] md:pr-8 md:text-right' 
          : 'md:ml-[50%] md:pl-8 md:text-left'
      }`}
    >
      {!isLast && (
        <div className='absolute left-1/2 transform -translate-x-1/2 top-14 bottom-0 w-[1px] bg-gradient-to-b from-[#a679f0]/30 via-[#5599fe]/30 to-[#48df7b]/30 dark:from-[#a679f0]/40 dark:via-[#5599fe]/40 dark:to-[#48df7b]/40 hidden md:block'></div>
      )}

      {isHighlighted && (
        <div className='absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-r from-[#a679f0]/5 via-transparent to-[#48df7b]/5 dark:from-[#a679f0]/10 dark:via-transparent dark:to-[#48df7b]/10 backdrop-blur-[0px]'></div>
      )}

      <div className='relative flex flex-col sm:flex-row items-start gap-5'>
        <div className='relative flex-shrink-0 z-50'>
          <div
            className={`w-10 h-10 sm:w-16 sm:h-16 rounded-lg sm:rounded-2xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center ${
              isHighlighted ? 'text-[#48df7b]' : 'text-[#a679f0]'
            }`}
          >
            <div className='absolute inset-[2px] rounded-md sm:rounded-xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900'></div>
            <div className='relative text-lg sm:text-2xl z-50'>{icon}</div>
          </div>

          <div
            className={`absolute inset-0 rounded-lg sm:rounded-2xl blur-[3px] opacity-10 ${
              isHighlighted ? 'bg-[#48df7b]' : 'bg-[#a679f0]'
            }`}
          ></div>
        </div>

        <div className='relative z-50 pt-2'>
          <div
            className={`text-xs sm:text-sm font-medium mb-2 flex items-center gap-3 ${
              isHighlighted ? 'text-[#48df7b]' : 'text-[#a679f0]'
            }`}
          >
            <span className='h-[1px] w-6 bg-current'></span>
            {date}
          </div>

          <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-left`}>
            <HackathonTypography 
              variant='h4' 
              className='mb-2'
            >
              {title}
            </HackathonTypography>

            <HackathonTypography 
              variant='body1' 
              color='muted'
            >
              {description}
            </HackathonTypography>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
