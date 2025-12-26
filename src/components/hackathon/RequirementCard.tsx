import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import HackathonTypography from './HackathonTypography';

type RequirementCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  iconBg: string;
  borderColor: string;
};

const RequirementCard: React.FC<RequirementCardProps> = ({
  icon,
  title,
  description,
  index,
  iconBg,
  borderColor,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 50,
              },
            }
          : {}
      }
      className='group relative'
    >
      <div
        className={`absolute inset-0 ${borderColor} rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur transition-opacity duration-500`}
        aria-hidden='true'
      ></div>

      <div
        className='h-full backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-2.5 sm:p-4 md:p-5 relative z-10 overflow-hidden group-hover:shadow-lg group-focus-within:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-hedera-purple'
        tabIndex={0}
      >
        <div
          className='absolute top-0 left-0 h-full w-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500'
          style={{
            background: `linear-gradient(to bottom, ${iconBg}, transparent)`,
          }}
          aria-hidden='true'
        ></div>

        <div className='flex items-start gap-2 sm:gap-3 md:gap-4'>
          <div
            className={`${iconBg} w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-white text-sm sm:text-base md:text-lg shrink-0 shadow-md group-hover:scale-110 group-focus-within:scale-110 transition-transform duration-500 mt-0.5`}
            aria-hidden='true'
          >
            {icon}
          </div>

          <div className='flex-1 min-w-0'>
            <HackathonTypography
              variant='h3'
              className='mb-0.5 sm:mb-1 md:mb-2 truncate'
            >
              {title}
            </HackathonTypography>
            <HackathonTypography
              variant='subtitle2'
              color='muted'
              className='line-clamp-3 sm:line-clamp-none font-normal'
            >
              {description}
            </HackathonTypography>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RequirementCard;
