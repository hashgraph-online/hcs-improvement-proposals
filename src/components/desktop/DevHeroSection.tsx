import React from 'react';
import { motion } from 'framer-motion';
import { FaDesktop, FaCode, FaPlug, FaGithub, FaArrowRight } from 'react-icons/fa';
import Typography from '../ui/Typography';
import { LaptopMockup } from '../ui';
import PrimaryButton from '../hackathon/PrimaryButton';

type DevHeroSectionProps = {};

const DevHeroSection: React.FC<DevHeroSectionProps> = () => {
  return (
    <section className='relative py-20 lg:py-32 overflow-hidden'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className='mb-6'>
                <span className='inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium'>
                  Developer Alpha v0
                </span>
              </div>

              <Typography
                variant='h1'
                className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight'
              >
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600'>
                  AI + Hedera
                </span>
              </Typography>

              <Typography
                variant='body'
                className='text-lg text-gray-600 dark:text-gray-300 mb-8'
              >
                HOL Desktop is a cross-platform app for interacting with AI
                agents on Hedera. Connect MCP servers, execute transactions, and
                manage hashgraph operations through natural conversation.
              </Typography>

              <div className='flex flex-col sm:flex-row gap-4'>
                <PrimaryButton
                  href='https://github.com/hashgraph-online/conversational-agent'
                  target='_blank'
                  rel='noopener noreferrer'
                  size='lg'
                  className='bg-[#a679f0] hover:bg-[#a679f0]/90 text-white border-0'
                  icon={<FaGithub />}
                >
                  View on GitHub
                </PrimaryButton>
                <PrimaryButton
                  href='/newsletter'
                  size='lg'
                  className='bg-gray-600 hover:bg-gray-700 text-white border-0'
                  icon={<FaArrowRight />}
                >
                  Join Early Access
                </PrimaryButton>
              </div>

              <div className='mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8'>
                <div>
                  <div className='flex items-center gap-2 mb-2'>
                    <FaDesktop className='text-purple-600 flex-shrink-0 text-lg' />
                    <span className='font-semibold text-base'>Desktop App</span>
                  </div>
                  <Typography variant='caption' color='muted' className='block'>
                    Cross-platform Electron app for Windows, macOS, and Linux
                  </Typography>
                </div>
                <div>
                  <div className='flex items-center gap-2 mb-2'>
                    <FaPlug className='text-blue-600 flex-shrink-0 text-lg' />
                    <span className='font-semibold text-base'>MCP Support</span>
                  </div>
                  <Typography variant='caption' color='muted' className='block'>
                    Model Context Protocol for AI-system integration
                  </Typography>
                </div>
                <div>
                  <div className='flex items-center gap-2 mb-2'>
                    <FaCode className='text-green-600 flex-shrink-0 text-lg' />
                    <span className='font-semibold text-base'>Extensible</span>
                  </div>
                  <Typography variant='caption' color='muted' className='block'>
                    Plugin architecture for custom tools and workflows
                  </Typography>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='relative'
            >
              <LaptopMockup>
                <img
                  src='/hol-desktop.png'
                  alt='Conversational Agent Desktop App'
                  className='w-full h-full object-cover object-top'
                />
              </LaptopMockup>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevHeroSection;
