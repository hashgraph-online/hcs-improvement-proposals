import React, { useRef } from 'react';
import HackathonTypography from './HackathonTypography';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  percentage: number;
  index: number;
  gradientStart: string;
  gradientEnd: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  percentage,
  index,
  gradientStart,
  gradientEnd,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = true;

  return (
    <div
      ref={cardRef}
      className='relative'
    >
      <div
        className='relative p-4 md:p-5 bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200/40 dark:border-gray-700/40 hover:border-opacity-60 dark:hover:border-opacity-60 transition-all duration-300 backdrop-blur-sm'
        style={{
          boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025), 0 0 0 1px rgba(${parseInt(
            gradientStart.slice(1, 3),
            16
          )}, ${parseInt(gradientStart.slice(3, 5), 16)}, ${parseInt(
            gradientStart.slice(5, 7),
            16
          )}, 0.05)`,
        }}
      >
        <div
          className='absolute -right-12 -top-12 w-36 h-36 rounded-full blur-2xl opacity-20 dark:opacity-30 z-0 mix-blend-multiply'
          style={{
            background: `radial-gradient(circle, ${gradientStart} 0%, ${gradientEnd} 70%, transparent 100%)`,
          }}
          aria-hidden='true'
        ></div>

        <div className='flex items-center justify-between relative z-10 gap-3'>
          <div className='flex items-center gap-3'>
            <div
              className='w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg'
              style={{
                background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                boxShadow: `0 4px 6px -1px rgba(${parseInt(
                  gradientStart.slice(1, 3),
                  16
                )}, ${parseInt(gradientStart.slice(3, 5), 16)}, ${parseInt(
                  gradientStart.slice(5, 7),
                  16
                )}, 0.2)`,
              }}
              aria-hidden='true'
            >
              {icon}
            </div>
            <HackathonTypography variant='subtitle2'>
              {title}
            </HackathonTypography>
          </div>
          <div
            className='px-2 py-1 rounded-md font-medium'
            style={{
              background: `linear-gradient(135deg, ${gradientStart}15, ${gradientEnd}15)`,
              color: `${gradientStart}`,
            }}
          >
            <HackathonTypography variant='caption' as='span'>
              {percentage}%
            </HackathonTypography>
          </div>
        </div>

        <div
          className='h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative mt-3'
          role='progressbar'
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${title} metric: ${percentage}%`}
        >
          <div
            className='h-full absolute top-0 left-0 rounded-full'
            style={{
              background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
              boxShadow: `0 0 8px ${gradientStart}80`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
