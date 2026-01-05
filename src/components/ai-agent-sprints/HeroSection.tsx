import React, { useRef } from 'react';
import {
  FaBrain,
  FaRobot,
  FaBolt,
  FaCalendarAlt,
  FaArrowRight,
  FaTrophy,
} from 'react-icons/fa';
import { SiHiveBlockchain } from 'react-icons/si';
import { PrimaryButton } from '../ui/primary-button';

const HeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  

  
  

  return (
    <div
      ref={ref}
      className='relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950'
    >
      {/* Background elements */}
      <div className='absolute inset-0 z-0 overflow-hidden'>
        <div
          className='absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full opacity-30 dark:opacity-20 blur-3xl'
          style={{
            background:
              'radial-gradient(circle at center, rgba(130, 89, 239, 0.4), rgba(130, 89, 239, 0) 70%)',
          }}
        ></div>
        <div
          className='absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full opacity-30 dark:opacity-20 blur-3xl'
          style={{
            background:
              'radial-gradient(circle at center, rgba(62, 200, 120, 0.4), rgba(62, 200, 120, 0) 70%)',
          }}
        ></div>

        <div
          className='absolute inset-0 opacity-[0.02] dark:opacity-[0.03]'
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(130, 89, 239, 0.3) 1px, transparent 1px),
              linear-gradient(rgba(45, 132, 235, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        ></div>

        <div
          className='absolute inset-0 opacity-[0.03] dark:opacity-[0.04]'
          style={{
            backgroundImage: `radial-gradient(rgba(62, 200, 120, 0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <div
        className='container mx-auto relative z-10'
      >
        <div className='max-w-5xl mx-auto'>
          <div className='text-center'>
            {/* Animated Icons */}
            <div
              className='flex justify-center mb-6 gap-4 sm:gap-6'
            >
              <div className='relative w-16 h-16 sm:w-20 sm:h-20'>
                <div
                  className='absolute inset-0 rounded-2xl bg-[#8259ef]/10 flex items-center justify-center'
                >
                  <FaBrain className='text-3xl sm:text-4xl text-[#8259ef]' />
                </div>
              </div>

              <div className='relative w-16 h-16 sm:w-20 sm:h-20'>
                <div
                  className='absolute inset-0 rounded-2xl bg-[#2d84eb]/10 flex items-center justify-center'
                >
                  <SiHiveBlockchain className='text-3xl sm:text-4xl text-[#2d84eb]' />
                </div>
              </div>

              <div className='relative w-16 h-16 sm:w-20 sm:h-20'>
                <div
                  className='absolute inset-0 rounded-2xl bg-[#3ec878]/10 flex items-center justify-center'
                >
                  <FaRobot className='text-3xl sm:text-4xl text-[#3ec878]' />
                </div>
              </div>
            </div>

            {/* Title */}
            <div
            >
              <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878]'>
                Hashgraph Online
                <br />
                <span className='text-3xl sm:text-4xl md:text-5xl'>
                  Sprint Series
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div
            >
              <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8'>
                Build AI agents on Hedera through focused, time-boxed challenges
                utilizing HCS Standards. Earn rewards by creating innovative
                solutions to real-world problems.
              </p>
            </div>

            {/* Action Buttons */}
            <div
              className='flex flex-col sm:flex-row gap-4 justify-center'
            >
              <PrimaryButton
                href='#sprints'
                icon={<FaCalendarAlt className='ml-2' />}
                variant='primary'
              >
                View Sprint Challenges
              </PrimaryButton>
              <PrimaryButton
                href='/sprint#sprints'
                variant='secondary'
                icon={<FaArrowRight className='ml-2' />}
              >
                Current Challenge
              </PrimaryButton>
            </div>

            {/* Stats */}
            <div
              className='mt-16 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl mx-auto'
            >
              <div className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700'>
                <div className='w-10 h-10 rounded-full bg-[#8259ef]/10 flex items-center justify-center text-[#8259ef] mb-3 mx-auto'>
                  <FaCalendarAlt />
                </div>
                <div className='text-3xl font-bold text-gray-900 dark:text-white mb-1'>
                  2-3
                </div>
                <div className='text-sm text-gray-500 dark:text-gray-400'>
                  Weeks Per Sprint
                </div>
              </div>

              <div className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700'>
                <div className='w-10 h-10 rounded-full bg-[#2d84eb]/10 flex items-center justify-center text-[#2d84eb] mb-3 mx-auto'>
                  <FaTrophy />
                </div>
                <div className='text-3xl font-bold text-gray-900 dark:text-white mb-1'>
                  Prizes
                </div>
                <div className='text-sm text-gray-500 dark:text-gray-400'>
                  For Winners
                </div>
              </div>

              <div className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700'>
                <div className='w-10 h-10 rounded-full bg-[#8259ef]/10 flex items-center justify-center text-[#8259ef] mb-3 mx-auto'>
                  <FaRobot />
                </div>
                <div className='text-3xl font-bold text-gray-900 dark:text-white mb-1'>
                  AI
                </div>
                <div className='text-sm text-gray-500 dark:text-gray-400'>
                  Agent Challenges
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
