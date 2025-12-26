import React from 'react';
import { motion } from 'motion/react';
import { FaTrophy, FaMicrophone, FaUsers } from 'react-icons/fa';
import HackathonTypography from './HackathonTypography';
import AIPulseEffect from './AIPulseEffect';
import { EventCountdown } from './EventCountdown';
import { useCountdown } from './useCountdown';

const DemoDayVisualCard: React.FC = () => {
  const EVENT_DATE = new Date('2025-05-20T10:00:00-04:00');
  const timeLeft = useCountdown(EVENT_DATE);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 50, delay: 0.4 }}
      className='relative w-full max-w-md sm:max-w-lg mx-auto lg:max-w-none'
    >
      <div className='absolute -inset-4 sm:-inset-6 bg-gradient-radial from-hedera-green/20 to-transparent blur-3xl opacity-30'></div>

      <div className='relative bg-white dark:bg-gray-800 p-5 sm:p-6 md:p-8 rounded-2xl border border-hedera-green/20 overflow-hidden backdrop-blur-sm shadow-xl shadow-hedera-green/20 z-10'>
        <div
          className='absolute top-0 left-0 w-full h-full opacity-20'
          style={{
            backgroundImage: `
              radial-gradient(circle at 25px 25px, rgba(62, 200, 120, 0.15) 2px, transparent 0),
              radial-gradient(circle at 75px 75px, rgba(62, 200, 120, 0.15) 2px, transparent 0),
              radial-gradient(circle at 50px 125px, rgba(45, 132, 235, 0.15) 2px, transparent 0),
              linear-gradient(rgba(62, 200, 120, 0.15) 1px, transparent 0),
              linear-gradient(90deg, rgba(45, 132, 235, 0.15) 1px, transparent 0)
            `,
            backgroundSize:
              '100px 100px, 100px 100px, 100px 100px, 25px 25px, 25px 25px',
          }}
        ></div>

        <div className='flex items-center justify-center mb-4 sm:mb-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <AIPulseEffect size='lg' color='green' intensity='medium' />
            </div>
            <div className='relative z-10 text-5xl sm:text-6xl md:text-7xl text-center text-hedera-green opacity-80'>
              <FaTrophy />
            </div>
          </div>
        </div>

        <div className='mb-3 sm:mb-4 text-center'>
          <HackathonTypography variant='h3' color='green' align='center'>
            Demo Day
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            color='muted'
            align='center'
            className='mt-1 mb-6'
          >
            Presentations & Judging
          </HackathonTypography>
        </div>

        <div className='mb-8'>
          <EventCountdown timeLeft={timeLeft} title='Starting In' />
        </div>

        <div className='space-y-3 sm:space-y-4'>
          <div className='bg-hedera-green/5 p-3 sm:p-4 rounded-xl border border-hedera-green/10'>
            <div className='flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2'>
              <div className='flex items-center'>
                <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-hedera-green-gradient flex items-center justify-center text-white'>
                  <FaMicrophone className='w-3 h-3 sm:w-4 sm:h-4' />
                </div>
                <span className='ml-2 sm:ml-3 text-sm sm:text-base md:text-lg font-semibold font-styrene text-hedera-green'>
                  Team Pitches
                </span>
              </div>
            </div>
            <HackathonTypography variant='body2' color='muted'>
              Finalists present their innovative AI solutions to the judges.
            </HackathonTypography>
          </div>

          <div className='bg-hedera-blue/5 p-3 sm:p-4 rounded-xl border border-hedera-blue/10'>
            <div className='flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2'>
              <div className='flex items-center'>
                <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-hedera-gradient flex items-center justify-center text-white'>
                  <FaUsers className='w-3 h-3 sm:w-4 sm:h-4' />
                </div>
                <span className='ml-2 sm:ml-3 text-sm sm:text-base md:text-lg font-semibold font-styrene text-hedera-blue'>
                  Expert Judging Panel
                </span>
              </div>
            </div>
            <HackathonTypography variant='body2' color='muted'>
              Industry leaders evaluate projects based on set criteria.
            </HackathonTypography>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DemoDayVisualCard;
