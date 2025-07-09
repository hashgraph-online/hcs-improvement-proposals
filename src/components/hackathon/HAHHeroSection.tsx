import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from '@docusaurus/Link';
import {
  FaCalendarAlt,
  FaGlobe,
  FaArrowRight,
  FaBrain,
  FaRobot,
  FaNetworkWired,
  FaDollarSign,
  FaMoneyBill,
  FaPlug,
} from 'react-icons/fa';
import TypingEffect from './TypingEffect';
import PrimaryButton from './PrimaryButton';
import HackathonTypography from './HackathonTypography';

const HAHHeroSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <FaNetworkWired />,
      title: 'Standards SDK',
      description: 'Full suite of HCS standards and implementations',
      link: 'https://hashgraphonline.com/docs/libraries/standards-sdk/',
    },
    {
      icon: <FaPlug />,
      title: 'Standards Agent Kit',
      description: 'Production-ready AI agent framework',
      link: 'https://hashgraphonline.com/docs/libraries/standards-agent-kit/',
    },
    {
      icon: <FaBrain />,
      title: 'OpenConvAI Standard',
      description: 'Build AI solutions using the HCS-10 standard',
      link: 'https://hashgraphonline.com/docs/standards/hcs-10/',
    },
    {
      icon: <FaDollarSign />,
      title: '$1M Prize Pool',
      description: 'Compete for your share across all tracks',
      link: null,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='relative overflow-hidden bg-white dark:bg-gray-900'>
      <div className='absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(166, 121, 240, 0.1) 35px, rgba(166, 121, 240, 0.1) 70px)`,
          }}
        />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
          <div className='space-y-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='space-y-4'
            >
              <div className='space-y-2'>
                <div className='text-sm font-medium text-[#a679f0] dark:text-[#48df7b] uppercase tracking-wide'>
                  Hedera Africa Hackathon
                </div>
                <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight'>
                  <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
                    AI Track
                  </span>
                </h1>
              </div>

              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white leading-tight'>
                Build the AI-Powered Web3 Future
              </h2>

              <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl'>
                The AI Track is co-led and sponsored by Hashgraph Online in
                collaboration with The Hashgraph Association and Exponential
                Science. Join developers worldwide to create innovative AI
                solutions on Hedera.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='flex flex-wrap gap-6'
            >
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-lg bg-[#5599fe]/10 dark:bg-[#5599fe]/20 flex items-center justify-center'>
                  <FaGlobe className='text-[#5599fe]' />
                </div>
                <div>
                  <div className='text-sm text-gray-500 dark:text-gray-400'>
                    Format
                  </div>
                  <div className='font-semibold text-gray-900 dark:text-white'>
                    Global Virtual
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-lg bg-[#48df7b]/10 dark:bg-[#48df7b]/20 flex items-center justify-center'>
                  <FaMoneyBill className='text-[#48df7b]' />
                </div>
                <div>
                  <div className='text-sm text-gray-500 dark:text-gray-400'>
                    Prize Pool
                  </div>
                  <div className='font-semibold text-gray-900 dark:text-white'>
                    $1,000,000
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='flex flex-col sm:flex-row gap-4'
            >
              <PrimaryButton
                href='https://dorahacks.io/hackathon/hederahackafrica/detail'
                target='_blank'
                rel='noopener noreferrer'
                size='lg'
                className='bg-[#a679f0] hover:bg-[#a679f0]/90 text-white border-0'
                icon={<FaArrowRight />}
              >
                Register on DoraHacks
              </PrimaryButton>

              <PrimaryButton
                href='https://hedera-hackathon.hashgraph.swiss/'
                target='_blank'
                rel='noopener noreferrer'
                size='lg'
                className='bg-gray-600 hover:bg-gray-700 text-white border-0'
                icon={<FaGlobe />}
              >
                View Main Event
              </PrimaryButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='relative z-10'
          >
            <div className='bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 lg:p-12 border border-gray-200 dark:border-gray-700'>
              <div className='text-center mb-8'>
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#a679f0] to-[#5599fe] text-white text-3xl mb-4'
                >
                  {features[activeFeature].icon}
                </motion.div>

                <motion.h3
                  key={`title-${activeFeature}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className='text-2xl font-bold text-gray-900 dark:text-white mb-2'
                >
                  {features[activeFeature].title}
                </motion.h3>

                <motion.p
                  key={`desc-${activeFeature}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className='text-gray-600 dark:text-gray-400 mb-4'
                >
                  {features[activeFeature].description}
                </motion.p>

                {features[activeFeature].link && (
                  <motion.a
                    href={features[activeFeature].link}
                    target='_blank'
                    rel='noopener noreferrer'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className='inline-flex items-center gap-2 text-sm text-[#5599fe] hover:text-[#5599fe]/80 transition-colors'
                  >
                    Learn more
                    <FaArrowRight className='w-3 h-3' />
                  </motion.a>
                )}
              </div>

              <div className='flex justify-center gap-2'>
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeFeature
                        ? 'w-8 bg-[#a679f0]'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                    aria-label={`View feature ${index + 1}`}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className='mt-8'
              >
                <p className='text-xs text-gray-500 dark:text-gray-400 mb-4 text-center'>
                  In collaboration with
                </p>
                <div className='bg-gray-900 rounded-xl p-4'>
                  <div className='flex flex-wrap items-center justify-center gap-4'>
                    <div className='flex items-center gap-2'>
                      <img
                        src='/img/logo.png'
                        alt='Hashgraph Online'
                        className='h-6'
                      />
                      <div className='text-xs font-semibold text-white'>
                        Hashgraph Online
                      </div>
                    </div>
                    <img
                      src='/img/logos/THA.svg'
                      alt='The Hashgraph Association'
                      className='h-6'
                    />
                    <img
                      src='/img/logos/exponential-science.png'
                      alt='Exponential Science'
                      className='h-6'
                    />
                  </div>
                </div>
              </motion.div>

              <div className='mt-6 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700'>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                  <span className='text-xs text-gray-500 dark:text-gray-400'>
                    AI Assistant
                  </span>
                </div>
                <div className='text-sm text-gray-700 dark:text-gray-300 font-mono'>
                  <TypingEffect
                    texts={[
                      'Ready to build autonomous AI agents?',
                      'Leverage Hedera for scalable AI solutions',
                      'Join the Web3 AI revolution',
                      'Transform ideas into reality',
                    ]}
                    typingSpeed={30}
                    deletingSpeed={20}
                    delayBetweenTexts={2000}
                  />
                </div>
              </div>
            </div>

            <div className='absolute -top-4 -right-4 w-32 h-32 bg-[#a679f0]/10 rounded-full blur-3xl' />
            <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-[#48df7b]/10 rounded-full blur-3xl' />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HAHHeroSection;
