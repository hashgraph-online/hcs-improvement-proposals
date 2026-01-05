import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import {
  FaCalendarAlt,
  FaGlobe,
  FaArrowRight,
  FaRobot,
  FaMoneyBillWave,
  FaChartLine,
} from 'react-icons/fa';

type Props = {};

const FloatingParticle: React.FC<{
  size: number;
  delay: number;
  duration: number;
  x: number;
  y: number;
}> = ({ size, delay, duration, x, y }) => (
  <div
    className='absolute rounded-full bg-green-400/20 dark:bg-green-400/30'
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}%`,
      top: `${y}%`,
    }}
  />
);

const HeroSection: React.FC<Props> = () => {
  const agentContainerRef = useRef(null);
  const isAgentInView = true;
  const agentControls = { start: () => {} };

  useEffect(() => {
    if (isAgentInView) {
      agentControls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 50,
          delay: 0.2 + i * 0.1,
        },
      }));
    }
  }, [isAgentInView, agentControls]);

  const particles = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className='relative overflow-hidden pt-20 pb-16 sm:pb-24 sm:pt-24 md:pb-32 md:pt-28 lg:pb-36 lg:pt-32'>
      <div className='absolute inset-0 z-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800'></div>
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

      <div className='absolute inset-0 overflow-hidden'>
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
              className='inline-flex items-center rounded-full border border-green-400/20 px-2.5 py-0.5 text-xs font-medium bg-gradient-to-r from-blue-500/5 to-purple-500/5 mb-4'
            >
              <span className='text-green-500'>May 2nd - May 13th, 2025</span>
            </div>

            <div className='mb-3 sm:mb-4 md:mb-6'>
              <h1
                className='text-4xl md:text-5xl lg:text-5xl font-extrabold text-center lg:text-left mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 leading-tight'
              >
                Hashgraph Online Sprint
              </h1>

              <div
              >
                <span className='relative'>
                  <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-center lg:text-left text-gray-800 dark:text-white leading-tight'>
                    Bonzo Finance
                  </h1>
                  <span
                    className='absolute bottom-1 sm:bottom-2 left-0 w-full h-2 sm:h-3 bg-green-400/20 -z-10'
                  />
                </span>
              </div>
            </div>

            <p
              className='text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 text-center lg:text-left'
            >
              Join us to build the future of DeFi AI on Hedera. Create an
              innovative AI agent that leverages the{' '}
              <span className='text-purple-600 font-semibold'>
                Bonzo Finance
              </span>{' '}
              protocol and compete for{' '}
              <span className='text-green-500 font-semibold'>
                15,000 $BONZO
              </span>{' '}
              in prizes.
            </p>

            <div
              className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8'
            >
              <button 
                className='px-6 py-3 rounded-lg font-bold text-white bg-gray-400 cursor-not-allowed opacity-60'
                disabled
              >
                Event Ended
              </button>

              <Link
                to='#ideas'
                className='px-6 py-3 rounded-lg font-bold text-gray-800 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center'
              >
                <span>See Project Ideas</span>
                <FaArrowRight className='ml-2 text-sm' />
              </Link>
            </div>

            <div className='mt-8 flex flex-wrap align-middle justify-center lg:justify-start gap-4 sm:gap-6'>
              <div
                className='flex items-center gap-2 sm:gap-3'
              >
                <div className='flex items-center'>
                  <div className='w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500'>
                    <FaCalendarAlt className='w-4 h-4' />
                  </div>
                  <span className='ml-3 text-sm text-gray-600 dark:text-gray-300 font-medium'>
                    May 2nd - May 13th
                  </span>
                </div>
              </div>
              <div
                className='flex items-center gap-2 sm:gap-3'
              >
                <div className='flex items-center'>
                  <div className='w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500'>
                    <FaGlobe className='w-4 h-4' />
                  </div>
                  <span className='ml-3 text-sm text-gray-600 dark:text-gray-300 font-medium'>
                    Virtual Event
                  </span>
                </div>
              </div>
              <div
                className='flex items-center gap-2 sm:gap-3'
              >
                <div className='flex items-center'>
                  <div className='w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500'>
                    <FaMoneyBillWave className='w-4 h-4' />
                  </div>
                  <span className='ml-3 text-sm text-gray-600 dark:text-gray-300 font-medium'>
                    15,000 $BONZO Prize
                  </span>
                </div>
              </div>
            </div>

            <div
              className='mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6'
            >
              <div className='text-sm text-gray-500 dark:text-gray-400'>
                Powered by
              </div>
              <div className='flex space-x-4 items-center'>
                <img
                  src='/img/logos/bonzo.png'
                  alt='Bonzo Finance'
                  className='h-8'
                />
              </div>
            </div>
          </div>

          <div className='lg:w-1/2' ref={agentContainerRef}>
            <div
              className='relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700'
            >
              <div className='absolute top-0 inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10 z-0'></div>

              <div className='relative z-10 p-6 sm:p-8'>
                <div className='flex items-center mb-6'>
                  <div className='w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center shadow-md'>
                    <FaRobot className='text-white text-xl' />
                  </div>
                  <div className='ml-4'>
                    <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                      AI Agent Challenge
                    </h3>
                    <p className='text-sm text-gray-600 dark:text-gray-300'>
                      Build innovative solutions that leverage Bonzo Finance
                    </p>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div
                    className='flex items-start'
                    custom={0}
                  >
                    <div className='flex-shrink-0 mt-1'>
                      <div className='w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center'>
                        <FaChartLine className='text-blue-600 dark:text-blue-400 text-sm' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h4 className='text-base font-semibold text-gray-900 dark:text-white'>
                        DeFi Automation
                      </h4>
                      <p className='text-sm text-gray-600 dark:text-gray-300'>
                        Create agents that optimize lending and borrowing
                        strategies or automate liquidation monitoring
                      </p>
                    </div>
                  </div>

                  <div
                    className='flex items-start'
                    custom={1}
                  >
                    <div className='flex-shrink-0 mt-1'>
                      <div className='w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center'>
                        <FaRobot className='text-purple-600 dark:text-purple-400 text-sm' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h4 className='text-base font-semibold text-gray-900 dark:text-white'>
                        AI-Powered Insights
                      </h4>
                      <p className='text-sm text-gray-600 dark:text-gray-300'>
                        Build agents that analyze market data, provide
                        predictive insights, or assist with risk management
                      </p>
                    </div>
                  </div>

                  <div
                    className='flex items-start'
                    custom={2}
                  >
                    <div className='flex-shrink-0 mt-1'>
                      <div className='w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center'>
                        <FaMoneyBillWave className='text-green-600 dark:text-green-400 text-sm' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h4 className='text-base font-semibold text-gray-900 dark:text-white'>
                        Yield Optimization
                      </h4>
                      <p className='text-sm text-gray-600 dark:text-gray-300'>
                        Develop agents that maximize yields through automated
                        rebalancing or cross-protocol strategies
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className='mt-8 pt-6 border-t border-gray-200 dark:border-gray-700'
                >
                  <Link
                    to='#requirements'
                    className='flex items-center justify-center w-full py-3 rounded-lg font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors'
                  >
                    View Challenge Requirements
                    <FaArrowRight className='ml-2 text-xs' />
                  </Link>
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
