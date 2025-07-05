import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaTrophy,
  FaArrowRight,
  FaRobot,
  FaCalendarAlt,
  FaGlobe,
  FaCode,
  FaBrain,
  FaNetworkWired,
} from 'react-icons/fa';
import PrimaryButton from './PrimaryButton';
import { TransformCard, Typography } from '../ui';

const HAHRegisterSection: React.FC = () => {
  const [commandTyped, setCommandTyped] = useState('');
  const command = 'hackathon --register --track=ai';

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index <= command.length) {
          setCommandTyped(command.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className='pt-24 sm:pt-32 relative bg-white dark:bg-gray-900 overflow-hidden'>
      <div className='absolute inset-0'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(166, 121, 240, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, rgba(72, 223, 123, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 50% 100%, rgba(85, 153, 254, 0.1) 0%, transparent 50%)`,
          }}
        />

        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className='absolute inset-0 opacity-[0.03] dark:opacity-[0.05]'
          style={{
            backgroundImage: `linear-gradient(rgba(166, 121, 240, 0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(85, 153, 254, 0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className='relative z-10'>
        <div className='container mx-auto px-4 sm:px-6 max-w-7xl'>
          <div className='text-center mb-16'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className='text-3xl sm:text-4xl font-bold mb-6'>
                <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
                  Ready to Join?
                </span>
              </h2>
              <Typography
                variant='body1'
                color='muted'
                className='max-w-2xl mx-auto'
              >
                Register now for the AI Track at Hedera Africa Hackathon. Build
                the future of autonomous AI on the world's most sustainable
                public ledger.
              </Typography>
            </motion.div>
          </div>

          <div className='grid lg:grid-cols-2 gap-8 mb-16'>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <TransformCard
                rotation='rotate-[-1deg]'
                background='bg-gray-900 dark:bg-black'
                border='border border-gray-800'
                shadow='2xl'
                className='p-8 h-full'
              >
                <div className='space-y-4'>
                  <div className='flex items-center gap-2 mb-6'>
                    <div className='w-3 h-3 rounded-full bg-red-500' />
                    <div className='w-3 h-3 rounded-full bg-yellow-500' />
                    <div className='w-3 h-3 rounded-full bg-green-500' />
                    <span className='ml-auto text-xs text-gray-500 font-mono'>
                      hackathon.sh
                    </span>
                  </div>

                  <div className='font-mono text-sm'>
                    <div className='text-gray-500 mb-2'>
                      # Register for the AI Track
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-[#48df7b]'>$</span>
                      <span className='text-white'>{commandTyped}</span>
                      {commandTyped.length < command.length && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className='inline-block w-2 h-4 bg-[#48df7b]'
                        />
                      )}
                    </div>

                    {commandTyped.length === command.length && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className='mt-4 text-gray-400'
                      >
                        <div>✓ Checking requirements...</div>
                        <div className='text-[#48df7b]'>
                          ✓ AI Track available!
                        </div>
                        <div className='text-[#a679f0]'>
                          ✓ $2M prize pool confirmed
                        </div>
                        <div className='mt-2 text-white'>
                          → Ready to build amazing AI agents!
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </TransformCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='space-y-4'
            >
              <TransformCard
                rotation='rotate-[0.5deg]'
                background='bg-gradient-to-br from-[#a679f0]/10 to-[#5599fe]/10 dark:from-[#a679f0]/20 dark:to-[#5599fe]/20'
                border='border border-[#a679f0]/20'
                className='p-6'
              >
                <div className='flex items-start gap-4'>
                  <div className='p-3 rounded-xl bg-[#a679f0]/20 dark:bg-[#a679f0]/30'>
                    <FaCalendarAlt className='text-2xl text-[#a679f0]' />
                  </div>
                  <div>
                    <Typography variant='h3' className='mb-1'>
                      2 Months to Build
                    </Typography>
                    <Typography variant='body2' color='muted'>
                      August 1 - September 30, 2025
                    </Typography>
                  </div>
                </div>
              </TransformCard>

              <TransformCard
                rotation='rotate-[-0.5deg]'
                background='bg-gradient-to-br from-[#5599fe]/10 to-[#48df7b]/10 dark:from-[#5599fe]/20 dark:to-[#48df7b]/20'
                border='border border-[#5599fe]/20'
                className='p-6'
              >
                <div className='flex items-start gap-4'>
                  <div className='p-3 rounded-xl bg-[#5599fe]/20 dark:bg-[#5599fe]/30'>
                    <FaGlobe className='text-2xl text-[#5599fe]' />
                  </div>
                  <div>
                    <Typography variant='h3' className='mb-1'>
                      Global Virtual Event
                    </Typography>
                    <Typography variant='body2' color='muted'>
                      Open worldwide with IRL stations in Africa
                    </Typography>
                  </div>
                </div>
              </TransformCard>

              <TransformCard
                rotation='rotate-[0.5deg]'
                background='bg-gradient-to-br from-[#48df7b]/10 to-[#a679f0]/10 dark:from-[#48df7b]/20 dark:to-[#a679f0]/20'
                border='border border-[#48df7b]/20'
                className='p-6'
              >
                <div className='flex items-start gap-4'>
                  <div className='p-3 rounded-xl bg-[#48df7b]/20 dark:bg-[#48df7b]/30'>
                    <FaTrophy className='text-2xl text-[#48df7b]' />
                  </div>
                  <div>
                    <Typography variant='h3' className='mb-1'>
                      $2M Prize Pool
                    </Typography>
                    <Typography variant='body2' color='muted'>
                      Compete across all tracks including AI
                    </Typography>
                  </div>
                </div>
              </TransformCard>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-center'
          >
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
              <PrimaryButton
                href='https://dorahacks.io/hackathon/hederahackafrica/detail'
                target='_blank'
                rel='noopener noreferrer'
                size='lg'
                className='bg-gradient-to-r from-[#a679f0] to-[#5599fe] hover:from-[#a679f0]/90 hover:to-[#5599fe]/90 text-white border-0'
                icon={<FaArrowRight />}
              >
                Register on DoraHacks
              </PrimaryButton>

              <PrimaryButton
                href='https://hedera-hackathon.hashgraph.swiss/'
                target='_blank'
                rel='noopener noreferrer'
                size='lg'
                variant='secondary'
                className='border-2 border-gray-300 dark:border-gray-600 hover:border-[#a679f0] dark:hover:border-[#48df7b] transition-colors'
                icon={<FaGlobe />}
              >
                View Main Event
              </PrimaryButton>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className='mt-16 bg-gray-900'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className='py-12'>
          <p className='text-sm text-gray-400 text-center mb-8'>
            In collaboration with
          </p>
          <div className='flex flex-wrap items-center justify-center gap-8 sm:gap-16 md:gap-24'>
            <img
              src='/img/logos/THA.svg'
              alt='The Hashgraph Association'
              className='h-10 sm:h-12 object-contain'
            />
            <img
              src='/img/logos/exponential-science.png'
              alt='Exponential Science'
              className='h-10 sm:h-12 object-contain'
            />
            <div className='flex items-center gap-3'>
              <img
                src='/img/logo.png'
                alt='Hashgraph Online'
                className='h-10 sm:h-12 object-contain'
              />
              <div>
                <div className='text-lg font-semibold text-white'>
                  Hashgraph Online
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HAHRegisterSection;
