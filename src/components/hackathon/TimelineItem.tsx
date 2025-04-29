import { motion, useInView } from 'framer-motion';
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
      className={`mb-16 last:mb-0 sm:pl-16 pl-8 relative ${
        isHighlighted ? 'z-50' : 'z-40'
      }`}
    >
      {!isLast && (
        <div className='absolute left-4 sm:left-8 top-14 bottom-0 w-[1px] bg-gradient-to-b from-[#8259ef]/30 via-[#2d84eb]/30 to-[#3ec878]/30 dark:from-[#8259ef]/40 dark:via-[#2d84eb]/40 dark:to-[#3ec878]/40'></div>
      )}

      {isHighlighted && (
        <div className='absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-r from-[#8259ef]/5 via-transparent to-[#3ec878]/5 dark:from-[#8259ef]/10 dark:via-transparent dark:to-[#3ec878]/10 backdrop-blur-[0px]'></div>
      )}

      <div className='relative flex flex-col sm:flex-row items-start gap-5'>
        <div className='relative flex-shrink-0 z-50'>
          <div
            className={`w-10 h-10 sm:w-16 sm:h-16 rounded-lg sm:rounded-2xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center ${
              isHighlighted ? 'text-[#3ec878]' : 'text-[#8259ef]'
            }`}
          >
            <div className='absolute inset-[2px] rounded-md sm:rounded-xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900'></div>
            <div className='relative text-lg sm:text-2xl z-50'>{icon}</div>
          </div>

          <div
            className={`absolute inset-0 rounded-lg sm:rounded-2xl blur-[3px] opacity-10 ${
              isHighlighted ? 'bg-[#3ec878]' : 'bg-[#8259ef]'
            }`}
          ></div>
        </div>

        <div className='relative z-50 pt-2'>
          <div
            className={`text-xs sm:text-sm font-medium mb-2 flex items-center gap-3 ${
              isHighlighted ? 'text-[#3ec878]' : 'text-[#8259ef]'
            }`}
          >
            <span className='h-[1px] w-6 bg-current'></span>
            {date}
          </div>

          <HackathonTypography variant='h4'>{title}</HackathonTypography>

          <HackathonTypography variant='body1'>
            {description}
          </HackathonTypography>
        </div>
      </div>
    </motion.div>
  );
};
