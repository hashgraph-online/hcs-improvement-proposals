import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import Link from '@docusaurus/Link';
import { useCases } from '../pages/use-cases';
import { 
  GradientText, 
  AnimatedBackground, 
  StatusBadge,
  TransformCard,
  Typography,
  Terminal,
  LaptopMockup
} from './ui';
import { HashgraphConsensus } from './HashgraphConsensus';

const UseCaseSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % useCases.length);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % useCases.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const getCardTransform = (index: number) => {
    const diff = index - currentIndex;
    const absDiff = Math.abs(diff);
    
    if (diff === 0) {
      // Center card - main focus
      return {
        x: 0,
        z: 100,
        rotateY: 0,
        scale: 1,
        opacity: 1,
      };
    } else if (absDiff === 1) {
      // Immediate neighbors - prominent secondary cards
      return {
        x: diff > 0 ? 280 : -280,
        z: 0,
        rotateY: diff > 0 ? -25 : 25,
        scale: 0.85,
        opacity: 0.8,
      };
    } else if (absDiff === 2) {
      // Second layer - visible but more receded
      return {
        x: diff > 0 ? 480 : -480,
        z: -80,
        rotateY: diff > 0 ? -40 : 40,
        scale: 0.7,
        opacity: 0.5,
      };
    } else if (absDiff === 3) {
      // Third layer - subtle background presence
      return {
        x: diff > 0 ? 650 : -650,
        z: -150,
        rotateY: diff > 0 ? -55 : 55,
        scale: 0.55,
        opacity: 0.3,
      };
    } else {
      // Far cards - barely visible depth
      return {
        x: diff > 0 ? 800 : -800,
        z: -200,
        rotateY: diff > 0 ? -70 : 70,
        scale: 0.4,
        opacity: 0.15,
      };
    }
  };

  return (
    <section className='relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/20 overflow-hidden'>
      <AnimatedBackground
        variant='blobs'
        colors={['brand-blue', 'brand-purple', 'brand-green']}
        intensity='low'
        opacity={0.1}
      />

      <div className='absolute inset-0 opacity-5 dark:opacity-10'>
        <HashgraphConsensus animated={true} />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-20 lg:mb-32'>
          <div className='mb-12'>
            <div className='text-xs font-mono text-gray-800 dark:text-gray-400 uppercase tracking-[0.4em] mb-6'>
              <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
              REAL_APPLICATIONS
            </div>
            <Typography
              variant='h2'
              className='text-4xl lg:text-5xl xl:text-6xl font-mono font-black text-gray-900 dark:text-white leading-tight tracking-tight'
            >
              <span className='block'>Standards in</span>
              <GradientText
                gradient='brand'
                as='span'
                className='inline-block'
              >
                Production_
              </GradientText>
            </Typography>
            <Typography
              color='muted'
              className='text-lg lg:text-xl text-gray-600 dark:text-gray-300 mt-12 max-w-4xl mx-auto'
            >
              Real companies building real applications.{' '}
              <span className='text-blue-600 dark:text-brand-blue'>Live implementations</span> of
              HCS standards.
            </Typography>
          </div>
        </div>

        {/* Static Layout with Dynamic Content */}
        <div className='relative max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'>
            
            {/* Left Side - Clean Laptop Mockup */}
            <div className='relative lg:col-span-7 transform scale-90 sm:scale-100 lg:scale-110 origin-left ml-2 sm:ml-4'>
              <LaptopMockup>
                {/* Dynamic Screen Content */}
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={`laptop-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className='relative w-full h-full'
                  >
                    {useCases[currentIndex]?.image ? (
                      <img
                        src={useCases[currentIndex].image}
                        alt={useCases[currentIndex].name}
                        className='w-full h-full object-cover object-left'
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className='w-full h-full bg-gray-700 flex items-center justify-center'>
                        <span className='text-white text-sm'>No Image</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </LaptopMockup>
            </div>

            {/* Right Side - Dynamic Browser Window */}
            <div className='lg:col-span-5 lg:-ml-12 lg:mt-8 relative z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
              {/* Browser Header */}
              <div className='bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='flex gap-1.5'>
                      <div className='w-3 h-3 rounded-full bg-brand-purple'></div>
                      <div className='w-3 h-3 rounded-full bg-brand-blue'></div>
                      <div className='w-3 h-3 rounded-full bg-green-400'></div>
                    </div>
                    <div className='text-xs font-mono text-gray-700 dark:text-gray-300'>
                      {useCases[currentIndex]?.link.replace(/^https?:\/\//, '')}
                    </div>
                  </div>
                  <div className='text-xs text-gray-600 dark:text-gray-400'>
                    {useCases[currentIndex]?.creator}
                  </div>
                </div>
              </div>

              {/* Dynamic Browser Content */}
              <div className='p-6' style={{ height: '360px' }}>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={`browser-${currentIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className='h-full flex flex-col justify-between'
                  >
                    <div className='flex-1 space-y-3'>
                      <div>
                        <div className='flex items-start justify-between mb-2'>
                          <Typography
                            variant='h3'
                            className='text-xl font-bold text-gray-900 dark:text-white'
                          >
                            {useCases[currentIndex]?.name}
                          </Typography>
                          <StatusBadge variant='success' animated>
                            LIVE
                          </StatusBadge>
                        </div>

                        <Typography
                          color='muted'
                          className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'
                        >
                          {useCases[currentIndex]?.description}
                        </Typography>
                      </div>

                      <div className='bg-gray-100/80 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200/50 dark:border-gray-700/30'>
                        <div className='text-sm font-mono text-purple-600 dark:text-brand-purple'>
                          {useCases[currentIndex]?.tagline}
                        </div>
                      </div>
                    </div>

                    <div className='flex gap-2'>
                      <PrimaryButton
                        href={useCases[currentIndex]?.link}
                        size='small'
                      >
                        Visit Site →
                      </PrimaryButton>
                      <SecondaryButton
                        size='small'
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? 'Pause' : 'Play'}
                      </SecondaryButton>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Arrow navigation buttons */}
          <button
            onClick={() => {
              goToPrevious();
            }}
            className='absolute -left-16 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 group'
            aria-label='Previous use case'
          >
            <FiChevronLeft className='w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-brand-blue transition-colors duration-300' />
          </button>

          <button
            onClick={() => {
              goToNext();
            }}
            className='absolute -right-16 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 group'
            aria-label='Next use case'
          >
            <FiChevronRight className='w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-brand-blue transition-colors duration-300' />
          </button>

          {/* Navigation dots */}
          <div className='flex justify-center mt-8 space-x-3'>
            {useCases.map((useCase, index) => (
              <div key={index} className='relative'>
                <div className='absolute inset-0 bg-slate-800/30 backdrop-blur-sm rounded-full scale-110 blur -z-10'></div>
                <button
                  onClick={() => setCurrentIndex(index)}
                  className={`w-6 h-6 rounded-full transition-all duration-300 border-0 outline-none relative z-10 flex items-center justify-center ${
                    index === currentIndex
                      ? 'bg-brand-blue scale-110'
                      : 'bg-white/80 hover:bg-brand-blue'
                  }`}
                  aria-label={`View ${useCase.name}`}
                >
                  <span className={`block w-3 h-3 rounded-full ${
                    index === currentIndex ? 'bg-white' : 'bg-gray-400'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-32 lg:mt-48'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='relative group'>
              <div className='absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000'></div>
              <div className='relative bg-white/95 dark:bg-gray-800/95 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm'>
                <Terminal title='production-impact.sh' className='text-left'>
                  <Terminal.Line output='#!/bin/bash' type='comment' />
                  <Terminal.Line
                    output='# Real applications leveraging HCS standards'
                    type='comment'
                  />
                  <Terminal.Line output='' type='output' />
                  <Terminal.Line command='./analyze-ecosystem --type=production' />
                  <Terminal.Line
                    output={`🚀 ${useCases.length} live applications in production...`}
                    type='output'
                  />
                  <Terminal.Line
                    output={`🏢 ${new Set(useCases.map(u => u.creator)).size} companies building on HCS...`}
                    type='output'
                  />
                  <Terminal.Line
                    output='📈 Real users, real value, real adoption...'
                    type='output'
                  />
                  <Terminal.Line output='' type='output' />
                  <Terminal.Line
                    output='✅ STATUS: Ecosystem thriving'
                    type='output'
                  />
                </Terminal>
              </div>
            </div>

            <div className='space-y-8'>
              <div className='bg-white/95 dark:bg-gray-800/95 border border-gray-200/50 dark:border-gray-700/50 shadow-lg rounded-2xl p-6 backdrop-blur-sm transform rotate-[-1deg]'>
                <div className='space-y-4'>
                  <div className='text-xs font-mono text-gray-500 dark:text-gray-400 mb-4'>
                    <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
                    ECOSYSTEM_GROWTH
                  </div>

                  <Typography
                    variant='h4'
                    className='text-gray-900 dark:text-white'
                  >
                    Join the
                    <br />
                    <span className='text-brand-green'>Production Ecosystem</span>
                  </Typography>

                  <Typography color='muted' className='text-sm'>
                    Build your application on battle-tested HCS standards and join the growing ecosystem of production applications.
                  </Typography>

                  <Link
                    to='/docs/libraries/standards-sdk'
                    className='block w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono font-bold py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300 text-center'
                  >
                    Start Building →
                  </Link>
                </div>
              </div>

              <Link
                to='/use-cases'
                className='block bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 dark:from-brand-blue/20 dark:to-brand-purple/20 border border-brand-blue/20 dark:border-brand-blue/30 rounded-2xl p-6 hover:scale-105 transition-all duration-300 transform rotate-[1deg]'
              >
                <div className='text-xs font-mono text-brand-blue mb-2'>
                  // EXPLORE_ALL
                </div>
                <Typography variant='h5' className='text-gray-900 dark:text-white mb-2'>
                  Browse All Applications
                </Typography>
                <Typography color='muted' className='text-sm'>
                  Discover more production applications →
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCaseSection;