import React from 'react';
import {
  FaCalendarAlt,
  FaGlobe,
  FaMoneyBill,
  FaBell,
  FaTv,
} from 'react-icons/fa';
import HackathonTypography from './HackathonTypography';
import PrimaryButton from './PrimaryButton';
import DemoDayVisualCard from './DemoDayVisualCard';

const FloatingParticle: React.FC<{
  size: number;
  delay: number;
  duration: number;
  x: number;
  y: number;
}> = ({ size, delay, duration, x, y }) => (
  <div
    className='absolute rounded-full bg-hedera-purple/20 dark:bg-hedera-purple/30'
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}%`,
      top: `${y}%`,
    }}
  />
);

const HederaAIDemoDayHero: React.FC = () => {
  const particles = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className='relative overflow-hidden pt-20 pb-16 sm:pb-24 sm:pt-24 md:pb-32 md:pt-28 lg:pb-36 lg:pt-32'>
      <div className='absolute inset-0 z-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800'></div>
      <div
        className='absolute top-0 right-0 h-[600px] sm:h-[700px] md:h-[800px] lg:h-[900px] w-full'
        style={{
          backgroundImage:
            'radial-gradient(circle at top right, rgba(130, 89, 239, 0.07), transparent 60%)',
        }}
      ></div>
      <div
        className='absolute bottom-0 left-0 h-[600px] sm:h-[700px] md:h-[800px] lg:h-[900px] w-full'
        style={{
          backgroundImage:
            'radial-gradient(circle at bottom left, rgba(62, 200, 120, 0.07), transparent 60%)',
        }}
      ></div>

      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {particles.map((i) => (
          <FloatingParticle
            key={i}
            size={Math.random() * 6 + 2}
            delay={Math.random() * 2}
            duration={3 + Math.random() * 4}
            x={Math.random() * 100}
            y={Math.random() * 100}
          />
        ))}
      </div>

      <div className='container mx-auto px-4 sm:px-6 relative z-10'>
        <div className='flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16'>
          <div
            className='lg:w-1/2 text-center lg:text-left'
          >
            <div
              className='inline-flex items-center rounded-full border border-hedera-green/20 px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-hedera-blue/5 to-hedera-purple/5 mb-6'
            >
              <span className='text-hedera-purple'>
                May 20th-21st, 10AM EDT
              </span>
            </div>

            <div className='mb-6'>
              <HackathonTypography
                variant='display'
                gradient={true}
                align='left'
                className='leading-tight text-center lg:text-left'
              >
                Hedera x AI
              </HackathonTypography>
            </div>

            <HackathonTypography
              variant='body1'
              color='muted'
              align='left'
              className='mb-8 max-w-xl mx-auto lg:mx-0 text-center lg:text-left'
            >
              The final culmination of the Hedera OpenConvAI Hackathon where
              shortlisted teams will present their innovative projects to our
              panel of judges in a YC-style pitch competition for a chance to
              win from our $30,000 prize pool.
            </HackathonTypography>

            <div className='flex mb-10'>
              <PrimaryButton
                href='https://twitter.com/intent/follow?screen_name=hashgraphonline&notify_on_follow=true'
                size='sm'
                icon={<FaBell />}
                className='bg-gradient-to-r from-hedera-blue to-hedera-green hover:from-hedera-blue/90 hover:to-hedera-green/90 dark:from-hedera-blue/80 dark:to-hedera-green/80 dark:hover:from-hedera-blue/70 dark:hover:to-hedera-green/70'
              >
                <span>Follow & Get Notified</span>
              </PrimaryButton>
            </div>

            <div className='mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4'>
              <div className='flex items-center gap-2'>
                <div className='w-7 h-7 rounded-full bg-hedera-blue/10 flex items-center justify-center text-hedera-blue'>
                  <FaCalendarAlt className='w-3.5 h-3.5' />
                </div>
                <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium'>
                  May 20th-21st, 2025
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-7 h-7 rounded-full bg-hedera-purple/10 flex items-center justify-center text-hedera-purple'>
                  <FaGlobe className='w-3.5 h-3.5' />
                </div>
                <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium'>
                  Virtual Event
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-7 h-7 rounded-full bg-hedera-green/10 flex items-center justify-center text-hedera-green'>
                  <FaMoneyBill className='w-3.5 h-3.5' />
                </div>
                <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium'>
                  $30,000 Prize Pool
                </span>
              </div>
            </div>

            <div
              className='mt-10'
            >
              <HackathonTypography
                variant='caption'
                color='muted'
                className='text-center lg:text-left mb-3'
              >
                Sponsored by
              </HackathonTypography>
              <div className='flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4'>
                <img
                  src='/img/hackathon/hedera-black.svg'
                  alt='Hedera'
                  className='h-7 md:h-8 dark:hidden'
                />
                <img
                  src='/img/hackathon/hedera-white.svg'
                  alt='Hedera'
                  className='h-7 md:h-8 hidden dark:block'
                />
                <img
                  src='/img/hackathon/hbar-foundation-black.svg'
                  alt='HBAR Foundation'
                  className='h-6 sm:h-7 md:h-8 dark:hidden'
                />
                <img
                  src='/img/hackathon/hbar-foundation-white.svg'
                  alt='HBAR Foundation'
                  className='h-6 sm:h-7 md:h-8 hidden dark:block'
                />
                <div className='flex items-center align-middle justify-center gap-1'>
                  <div className='flex items-center justify-center w-8 h-8 rounded-full p-0.5 bg-hedera-gradient dark:bg-none'>
                    <img
                      src='/img/logo.png'
                      alt='Hashgraph Online Logo'
                      className='h-full w-full object-contain'
                    />
                  </div>
                  <h3 className='m-0 text-sm sm:text-base font-semibold text-black dark:text-white'>
                    Hashgraph Online
                  </h3>
                </div>
              </div>
            </div>

            <div
              className='mt-8'
            >
              <HackathonTypography
                variant='caption'
                color='muted'
                className='text-center lg:text-left mb-3'
              >
                Streamed & Hosted by
              </HackathonTypography>
              <div className='flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3'>
                <img
                  src='/img/hackathon/genfinity-logo.webp'
                  alt='Genfinity Logo'
                  className='h-8 w-auto'
                />
              </div>
            </div>
          </div>

          <div className='lg:w-1/2 mt-8 lg:mt-0'>
            <DemoDayVisualCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HederaAIDemoDayHero;
