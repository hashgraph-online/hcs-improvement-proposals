import React, { useRef, lazy, Suspense } from 'react';
import { Typography } from '../ui';

const HashgraphConsensusLazy = lazy(() =>
  import('../HashgraphConsensus').then((m) => ({ default: m.HashgraphConsensus }))
);

const WhatWeDoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = true;

  return (
    <section
      ref={sectionRef}
      className='relative py-24 lg:py-32 bg-white dark:bg-gray-900 overflow-hidden'
    >
      <div className='absolute inset-0 opacity-5 dark:opacity-10'>
        <Suspense fallback={null}>
          <HashgraphConsensusLazy animated={true} />
        </Suspense>
      </div>

      <div className='container mx-auto px-6 lg:px-12 relative z-10'>
        <div
          className='text-center mb-16'
        >
          <Typography
            variant='h2'
            className='text-4xl lg:text-5xl font-mono font-black text-gray-900 dark:text-white mb-4'
          >
            What We{' '}
            <Typography
              variant='h2'
              gradient='brand'
              as='span'
              className='text-4xl lg:text-5xl font-mono font-black inline-block'
            >
              Build_
            </Typography>
          </Typography>
          <Typography
            color='muted'
            className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'
          >
            A consortium of 10 organizations creating standards for the autonomous internet
          </Typography>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          <div
            className='group'
          >
            <div className='h-full bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300'>
              <div className='w-14 h-14 rounded-xl bg-brand-blue/10 dark:bg-brand-blue/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-7 h-7 text-brand-blue' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' />
                </svg>
              </div>
              <Typography variant='h3' className='text-xl font-mono font-bold text-gray-900 dark:text-white mb-3'>
                Open Standards
              </Typography>
              <Typography color='muted' className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
                15+ production-ready protocols for on-chain infrastructure, file storage, and agent communication
              </Typography>
            </div>
          </div>

          <div
            className='group'
          >
            <div className='h-full bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 rounded-2xl p-8 border border-purple-200/50 dark:border-purple-800/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300'>
              <div className='w-14 h-14 rounded-xl bg-brand-purple/10 dark:bg-brand-purple/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-7 h-7 text-brand-purple' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4' />
                </svg>
              </div>
              <Typography variant='h3' className='text-xl font-mono font-bold text-gray-900 dark:text-white mb-3'>
                Developer Tools
              </Typography>
              <Typography color='muted' className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
                SDKs, libraries, and infrastructure enabling developers to build on-chain applications
              </Typography>
            </div>
          </div>

          <div
            className='group'
          >
            <div className='h-full bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 rounded-2xl p-8 border border-green-200/50 dark:border-green-800/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300'>
              <div className='w-14 h-14 rounded-xl bg-brand-green/10 dark:bg-brand-green/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-7 h-7 text-brand-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
              </div>
              <Typography variant='h3' className='text-xl font-mono font-bold text-gray-900 dark:text-white mb-3'>
                Ecosystem Support
              </Typography>
              <Typography color='muted' className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
                Collaborative consortium providing resources and guidance for standard adoption
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
