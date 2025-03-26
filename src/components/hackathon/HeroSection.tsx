import React, { useEffect, useRef } from 'react';
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
import NeuralNetworkAnimation from './NeuralNetworkAnimation';
import AIPulseEffect from './AIPulseEffect';
import PrimaryButton from './PrimaryButton';
import HackathonTypography from './HackathonTypography';

const FloatingParticle: React.FC<{
  size: number;
  delay: number;
  duration: number;
  x: number;
  y: number;
}> = ({ size, delay, duration, x, y }) => (
  <motion.div
    className='absolute rounded-full bg-hedera-purple/20 dark:bg-hedera-purple/30'
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}%`,
      top: `${y}%`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.8, 0],
      scale: [0, 1, 0.8],
      y: [-20, 20],
    }}
    transition={{
      repeat: Infinity,
      duration,
      delay,
      ease: 'easeInOut',
    }}
  />
);

const aiMessages = [
  'Deploying consensus protocol...',
  'Optimizing neural pathways...',
  'Calibrating semantic models...',
  'Establishing peer connections...',
  'Ready to collaborate with humans.',
];

const HeroSection: React.FC = () => {
  const agentContainerRef = useRef(null);
  const isAgentInView = useInView(agentContainerRef, { once: true });
  const agentControls = useAnimation();

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
          <motion.div
            className='lg:w-1/2 text-center lg:text-left'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className='inline-flex items-center rounded-full border border-hedera-green/20 px-2.5 py-0.5 text-xs font-medium bg-gradient-to-r from-hedera-blue/5 to-hedera-purple/5 mb-4'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className='text-hedera-green'>April 11th - May 2nd</span>
            </motion.div>

            <div className='mb-3 sm:mb-4 md:mb-6'>
              <HackathonTypography
                variant='display'
                gradient={true}
                align='left'
                className='leading-tight text-center lg:text-left'
              >
                Hedera OpenConvAI
              </HackathonTypography>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <span className='relative'>
                  <HackathonTypography
                    variant='display'
                    align='left'
                    className='relative z-10 leading-tight text-center lg:text-left'
                  >
                    & Agents Hackathon
                  </HackathonTypography>
                  <motion.span
                    className='absolute bottom-1 sm:bottom-2 left-0 w-full h-2 sm:h-3 bg-hedera-green/20 -z-10'
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 1.2 }}
                  />
                </span>
              </motion.div>
            </div>

            <HackathonTypography
              variant='body1'
              color='muted'
              align='left'
              className='mb-5 sm:mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 text-center lg:text-left'
            >
              Join us for a revolutionary hackathon designed for{' '}
              <span className='text-hedera-purple font-semibold'>
                AI agents and their human collaborators
              </span>
              . Compete for a{' '}
              <span className='text-hedera-green font-semibold'>
                $30,000 prize pool
              </span>{' '}
              and shape the future of autonomous AI communication on Hedera.
            </HackathonTypography>

            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8'>
              <PrimaryButton
                href='https://dorahacks.io/org/hedera'
                className='z-10 px-3 py-2 text-xs sm:text-sm sm:px-4 sm:py-2.5'
                size='sm'
              >
                <span>Register Now</span>
              </PrimaryButton>

              <Link
                to='/convai'
                className='px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm sm:text-base bg-hedera-green text-white hover:text-white focus:text-white active:text-white visited:text-white hover:bg-hedera-green/90 border border-hedera-green transform transition-all duration-300 flex items-center justify-center gap-2 no-underline hover:no-underline focus:no-underline active:no-underline visited:no-underline focus:outline-none focus:ring-2 focus:ring-hedera-green/50 focus:ring-offset-2 shadow-md hover:shadow-lg hover:brightness-110'
                style={{ textDecoration: 'none' }}
              >
                <span className='text-white'>Learn About ConvAI</span>{' '}
                <FaArrowRight className='ml-1 text-xs sm:text-sm' />
              </Link>
            </div>

            <div className='mt-6 sm:mt-8 flex flex-wrap align-middle justify-center lg:justify-start gap-4 sm:gap-6'>
              <div className='hidden sm:flex items-center gap-2 sm:gap-3'>
                <div className='flex items-center'>
                  <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-hedera-blue/10 flex items-center justify-center text-hedera-blue'>
                    <FaCalendarAlt className='w-3 h-3 sm:w-4 sm:h-4' />
                  </div>
                  <span className='ml-2 sm:ml-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium'>
                    April 11th - May 2nd
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-2 sm:gap-3'>
                <div className='flex items-center'>
                  <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-hedera-purple/10 flex items-center justify-center text-hedera-purple'>
                    <FaGlobe className='w-3 h-3 sm:w-4 sm:h-4' />
                  </div>
                  <span className='ml-2 sm:ml-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium'>
                    Virtual Event
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-2 sm:gap-3'>
                <div className='flex items-center'>
                  <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-hedera-green/10 flex items-center justify-center text-hedera-green'>
                    <FaMoneyBill className='w-3 h-3 sm:w-4 sm:h-4' />
                  </div>
                  <span className='ml-2 sm:ml-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium'>
                    $30,000 Prize Pool
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              className='mt-8 sm:mt-10 lg:mt-12'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              <HackathonTypography
                variant='caption'
                color='muted'
                className='text-center lg:text-left mb-2 sm:mb-3'
              >
                Sponsored by
              </HackathonTypography>
              <div className='flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6'>
                <div className='h-8 md:h-8'>
                  <img
                    src='/img/hackathon/hedera-black.svg'
                    alt='Hedera'
                    className='h-full dark:hidden'
                  />
                  <img
                    src='/img/hackathon/hedera-white.svg'
                    alt='Hedera'
                    className='h-full hidden dark:block'
                  />
                </div>
                <div className='h-6 sm:h-8 md:h-10'>
                  <img
                    src='/img/hackathon/hbar-foundation-black.svg'
                    alt='HBAR Foundation'
                    className='h-full dark:hidden'
                  />
                  <img
                    src='/img/hackathon/hbar-foundation-white.svg'
                    alt='HBAR Foundation'
                    className='h-full hidden dark:block'
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            ref={agentContainerRef}
            animate={agentControls}
            initial={{ opacity: 0, y: 50 }}
            className='lg:w-1/2 relative mt-8 lg:mt-0 w-full max-w-md sm:max-w-lg mx-auto lg:max-w-none'
          >
            <div className='relative'>
              <div className='absolute -inset-4 sm:-inset-6 bg-gradient-radial from-hedera-purple/20 to-transparent blur-3xl opacity-30'></div>

              <div className='relative bg-white dark:bg-gray-800 p-5 sm:p-6 md:p-8 rounded-2xl border border-hedera-purple/20 overflow-hidden backdrop-blur-sm shadow-xl shadow-hedera-purple/20 z-10'>
                <div
                  className='absolute top-0 left-0 w-full h-full opacity-20'
                  style={{
                    backgroundImage: `
                    radial-gradient(circle at 25px 25px, rgba(61, 50, 235, 0.15) 2px, transparent 0),
                    radial-gradient(circle at 75px 75px, rgba(61, 50, 235, 0.15) 2px, transparent 0),
                    radial-gradient(circle at 50px 125px, rgba(130, 89, 239, 0.15) 2px, transparent 0),
                    linear-gradient(rgba(61, 50, 235, 0.15) 1px, transparent 0),
                    linear-gradient(90deg, rgba(61, 50, 235, 0.15) 1px, transparent 0)
                  `,
                    backgroundSize:
                      '100px 100px, 100px 100px, 100px 100px, 25px 25px, 25px 25px',
                  }}
                ></div>

                <div className='flex items-center justify-center mb-4 sm:mb-6'>
                  <div className='relative'>
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <AIPulseEffect
                        size='lg'
                        color='purple'
                        intensity='medium'
                      />
                    </div>
                    <div className='relative z-10 text-5xl sm:text-6xl md:text-7xl text-center text-hedera-purple opacity-80'>
                      <FaBrain />
                    </div>
                  </div>
                </div>

                <div className='mb-3 sm:mb-4 text-center'>
                  <HackathonTypography
                    variant='h3'
                    color='purple'
                    align='center'
                  >
                    Calling All AI Agents
                  </HackathonTypography>
                  <HackathonTypography
                    variant='body1'
                    color='muted'
                    align='center'
                  >
                    (and their Humans)
                  </HackathonTypography>
                  <div className='h-5 sm:h-6 text-gray-700 dark:text-gray-300 font-mono text-xs sm:text-sm mt-1 sm:mt-2'>
                    <TypingEffect
                      texts={aiMessages}
                      typingSpeed={40}
                      deletingSpeed={30}
                      delayBetweenTexts={1500}
                    />
                  </div>
                </div>

                <div className='space-y-3 sm:space-y-4 mt-5 sm:mt-6 md:mt-8'>
                  <div className='bg-hedera-purple/5 p-3 sm:p-4 rounded-xl border border-hedera-purple/10'>
                    <div className='flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2'>
                      <div className='flex items-center'>
                        <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-hedera-gradient flex items-center justify-center text-white'>
                          <FaNetworkWired className='w-3 h-3 sm:w-4 sm:h-4' />
                        </div>
                        <span className='ml-2 sm:ml-3 text-sm sm:text-base md:text-lg font-semibold font-styrene text-hedera-purple'>
                          Best use of OpenConvAI
                        </span>
                      </div>
                    </div>
                    <HackathonTypography variant='body2' color='muted'>
                      Build AI agents that autonomously collaborate using the
                      OpenConvAI (HCS-10) protocol
                    </HackathonTypography>
                  </div>

                  <div className='bg-hedera-blue/5 p-3 sm:p-4 rounded-xl border border-hedera-blue/10'>
                    <div className='flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2'>
                      <div className='flex items-center'>
                        <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-hedera-gradient flex items-center justify-center text-white'>
                          <FaPlug className='w-3 h-3 sm:w-4 sm:h-4' />
                        </div>
                        <span className='ml-2 sm:ml-3 text-sm sm:text-base md:text-lg font-semibold font-styrene text-hedera-blue'>
                          Best use of Hedera ElizaOS Plugin
                        </span>
                      </div>
                    </div>
                    <HackathonTypography variant='body2' color='muted'>
                      Utilize the Hedera ElizaOS Plugin to empower your AI
                      Agents to utilize Hedera.
                    </HackathonTypography>
                  </div>

                  <div className='bg-hedera-green/5 p-3 sm:p-4 rounded-xl border border-hedera-green/10'>
                    <div className='flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2'>
                      <div className='flex items-center'>
                        <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-hedera-green-gradient flex items-center justify-center text-white'>
                          <FaRobot className='w-3 h-3 sm:w-4 sm:h-4' />
                        </div>
                        <span className='ml-2 sm:ml-3 text-sm sm:text-base md:text-lg font-semibold font-styrene text-hedera-green'>
                          Best use of Hedera Agent Kit or MCP
                        </span>
                      </div>
                    </div>
                    <HackathonTypography variant='body2' color='muted'>
                      Give your agents superpowers with the Hedera Agent Kit and
                      / or the Hedera MCP Server.
                    </HackathonTypography>
                  </div>

                  <motion.div
                    className='p-3 sm:p-4 rounded-xl border border-hedera-blue/20 bg-white dark:bg-gray-700'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                  >
                    <div className='text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-mono overflow-x-auto'>
                      <span className='text-hedera-blue'>const agent = </span>
                      <span className='text-hedera-purple'>await</span>{' '}
                      client.createAndRegisterAgent(
                      <br />
                      <span className='pl-3 sm:pl-4'>new AgentBuilder()</span>
                      <br />
                      <span className='pl-6 sm:pl-8'>.setName(</span>
                      <span className='text-green-600'>"HackathonAgent"</span>
                      <span>)</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
