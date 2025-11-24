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
      link: 'https://hol.org/docs/libraries/standards-sdk/',
    },
    {
      icon: <FaPlug />,
      title: 'Standards Agent Kit',
      description: 'Production-ready AI agent framework',
      link: 'https://hol.org/docs/libraries/standards-agent-kit/',
    },
    {
      icon: <FaBrain />,
      title: 'OpenConvAI Standard',
      description: 'Build AI solutions using the HCS-10 standard',
      link: 'https://hol.org/docs/standards/hcs-10/',
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
      {/* Animated background */}
      <div className='absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none'>
        <motion.div
          className='absolute inset-0'
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(166, 121, 240, 0.1) 35px, rgba(166, 121, 240, 0.1) 70px)`,
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-2 h-2 bg-gradient-to-r from-[#a679f0] to-[#5599fe] rounded-full opacity-40'
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
          />
        ))}
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
                <motion.div
                  className='text-sm font-medium text-[#a679f0] dark:text-[#48df7b] uppercase tracking-wide'
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Hedera Africa Hackathon
                </motion.div>
                <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight'>
                  <motion.span
                    className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent inline-block'
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  >
                    AI Track
                  </motion.span>
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
                data-umami-event='hackathon-register-dorahacks-hero'
                data-umami-event-category='hackathon'
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
                data-umami-event='hackathon-view-main-event-hero'
                data-umami-event-category='hackathon'
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
            whileHover={{ scale: 1.02 }}
          >
            <div className='bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 lg:p-12 border border-gray-200 dark:border-gray-700 min-h-[520px] flex flex-col'>
              <div className='text-center flex-1 flex flex-col justify-center'>
                <div>
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#a679f0] to-[#5599fe] text-white text-3xl mb-4 mx-auto'
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

                  <div className='h-6 mt-2'>
                    {features[activeFeature].link && (
                      <motion.a
                        href={features[activeFeature].link}
                        target='_blank'
                        rel='noopener noreferrer'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className='inline-flex items-center gap-2 text-sm text-[#5599fe] hover:text-[#5599fe]/80 transition-colors mx-auto'
                      >
                        Learn more
                        <FaArrowRight className='w-3 h-3' />
                      </motion.a>
                    )}
                  </div>

                  <div className='flex justify-center gap-2 mt-6'>
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveFeature(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 border-0 outline-none ring-0 ${
                          index === activeFeature
                            ? 'bg-[#a679f0]'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        style={{
                          border: 'none',
                          outline: 'none',
                          boxShadow: 'none',
                        }}
                        aria-label={`View feature ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className='mt-8'
              >
                <p className='text-xs text-gray-500 dark:text-gray-400 mb-4 text-center'>
                  Organized by THA & ESF, operated by DAR Blockchain, and AI
                  Track sponsored by Hashgraph Online
                </p>
                <div className='flex flex-wrap items-center justify-center gap-6'>
                  <div className='flex flex-wrap items-center justify-center gap-4'>
                    <img
                      src='/img/logos/THA.svg'
                      alt='The Hashgraph Association - Organizer'
                      className='h-6 [filter:brightness(0)_saturate(100%)_invert(40%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(70%)_contrast(100%)] dark:[filter:none]'
                    />
                    <img
                      src='/img/logos/exponential-science.png'
                      alt='Exponential Science - Organizer'
                      className='h-6 [filter:brightness(0)_saturate(100%)_invert(40%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(70%)_contrast(100%)] dark:[filter:none]'
                    />
                    <img
                      src='/img/dar-blockchain-light.png'
                      alt='DAR Blockchain - Operator'
                      className='h-6 block dark:hidden'
                    />
                    <img
                      src='/img/logos/dark-blockchain-dark.jpg'
                      alt='DAR Blockchain - Operator'
                      className='h-6 hidden dark:block'
                    />
                    <div className='flex items-center gap-0.5'>
                      <img
                        src='/img/logo.png'
                        alt='Hashgraph Online'
                        className='h-6 [filter:brightness(0)_saturate(100%)_invert(40%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(70%)_contrast(100%)] dark:[filter:none]'
                      />
                      <div className='text-xs font-semibold text-gray-700 dark:text-white'>
                        Hashgraph Online
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-4 pl-6 border-l border-gray-300 dark:border-gray-600'>
                    <div className='flex flex-col items-center gap-1'>
                      <span className='text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500'>
                        Media Partner
                      </span>
                      <a
                        href='https://genfinity.io/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-block'
                        data-umami-event='hackathon-genfinity-visit'
                        data-umami-event-category='hackathon'
                      >
                        <img
                          src='/img/hackathon/genfinity-logo.webp'
                          alt='Genfinity - Media Partner'
                          className='h-5 [filter:brightness(0)_saturate(100%)_invert(40%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(70%)_contrast(100%)] dark:[filter:none] hover:opacity-80 transition-opacity'
                        />
                      </a>
                    </div>
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

            <motion.div
              className='absolute -top-4 -right-4 w-32 h-32 bg-[#a679f0]/10 rounded-full blur-3xl'
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className='absolute -bottom-4 -left-4 w-32 h-32 bg-[#48df7b]/10 rounded-full blur-3xl'
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HAHHeroSection;
