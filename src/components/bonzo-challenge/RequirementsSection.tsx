import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaGithub,
  FaYoutube,
  FaFileAlt,
  FaCog,
  FaNetworkWired,
  FaTools,
  FaBrain,
  FaRobot,
  FaMicrochip,
  FaCode,
  FaLock,
  FaAward,
  FaBullhorn,
  FaChartLine,
  FaGavel,
  FaWeight,
  FaVideo,
  FaDesktop,
  FaGlobe,
} from 'react-icons/fa';
import { DataNodes, DataFlowLines } from '../hackathon/BackgroundAnimations';
import { CodeStyleTag } from '../hackathon/CodeStyleTag';
import CriterionCard from '../hackathon/CriterionCard';
import RequirementCard from '../hackathon/RequirementCard';
import PrimaryButton from '../hackathon/PrimaryButton';
import Typography from '../Typography';

type Constants = {
  SUBMISSION_URL: string;
};

const CONSTANTS: Constants = {
  SUBMISSION_URL: 'https://forms.gle/7XGz2RYGzfFyVqZC9',
};

const RequirementsSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: '-100px' });
  const metricsRef = useRef<HTMLDivElement>(null);
  const isMetricsInView = useInView(metricsRef, {
    once: true,
    margin: '-100px',
  });

  return (
    <section
      className='relative py-16 sm:py-20 md:py-24 lg:py-32 bg-white dark:bg-gray-900 overflow-hidden'
      aria-labelledby='ai-requirements-title'
      style={{
        backgroundImage: 'url("/img/hackathon/stars.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      id='requirements'
    >
      <CodeStyleTag />
      <DataNodes />
      <DataFlowLines />

      <div className='container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-10 sm:mb-14 md:mb-20 max-w-4xl mx-auto'>
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 50 }}
            animate={
              isTitleInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      type: 'spring',
                      stiffness: 50,
                    },
                  }
                : {}
            }
            className='relative inline-block pb-2'
          >
            <Typography
              variant='h1'
              align='center'
              className='inline-block'
              underline={true}
              underlineColor='gradient'
            >
              Submission Requirements
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isTitleInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.3,
                    },
                  }
                : {}
            }
          >
            <Typography
              variant='body1'
              color='muted'
              align='center'
              className='max-w-3xl mx-auto mb-5 sm:mb-6 md:mb-8 px-1 sm:px-2'
            >
              For the Bonzo Finance AI Agent Challenge, your project must meet
              these requirements to qualify for evaluation. Our judging process
              will analyze each submission based on innovation, technical
              implementation, and potential impact.
            </Typography>
          </motion.div>

          <motion.div
            className='flex flex-wrap gap-1.5 sm:gap-2 justify-center'
            initial={{ opacity: 0, y: 20 }}
            animate={
              isTitleInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.5,
                    },
                  }
                : {}
            }
          >
            <span className='px-2 py-1 sm:px-3 sm:py-1.5 bg-hedera-purple/10 dark:bg-hedera-purple/20 text-hedera-purple rounded-full text-xs sm:text-sm font-medium'>
              #AI
            </span>
            <span className='px-2 py-1 sm:px-3 sm:py-1.5 bg-hedera-blue/10 dark:bg-hedera-blue/20 text-hedera-blue rounded-full text-xs sm:text-sm font-medium'>
              #Bonzo
            </span>
            <span className='px-2 py-1 sm:px-3 sm:py-1.5 bg-hedera-green/10 dark:bg-hedera-green/20 text-hedera-green rounded-full text-xs sm:text-sm font-medium'>
              #Finance
            </span>
          </motion.div>
        </div>

        <div className='max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20'>
          <motion.div
            className='grid grid-cols-2 gap-1.5 sm:gap-3 md:gap-4 lg:gap-5'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <RequirementCard
              icon={<FaGithub />}
              title='Repository Access'
              description="Provide source code with documentation explaining how your agent leverages Bonzo Finance protocol and Hedera's messaging services"
              index={0}
              iconBg='bg-gradient-to-r from-[#6e5494] to-[#4f3a6b]'
              borderColor='bg-[#6e5494]/30'
            />
            <RequirementCard
              icon={<FaVideo />}
              title='Visual Demonstration'
              description="Create a 5-minute video showcasing your agent's capabilities and communication with the Bonzo Finance protocol"
              index={1}
              iconBg='bg-gradient-to-r from-hedera-purple to-hedera-blue'
              borderColor='bg-hedera-purple/30'
            />
            <RequirementCard
              icon={<FaGlobe />}
              title='OpenConvAI Portal Access'
              description='Ensure your agent is accessible in the Moonscape OpenConvAI portal for evaluation and demonstration'
              index={2}
              iconBg='bg-gradient-to-r from-[#3ec878] to-[#2a9c5a]'
              borderColor='bg-[#3ec878]/30'
            />
            <RequirementCard
              icon={<FaCog />}
              title='Protocol Integration'
              description='Your agent must demonstrate direct interaction with the Bonzo Finance protocol on Hedera testnet or mainnet'
              index={3}
              iconBg='bg-gradient-to-r from-[#2d84eb] to-[#1c5da3]'
              borderColor='bg-[#2d84eb]/30'
            />
          </motion.div>
        </div>

        <motion.div
          className='relative max-w-5xl mx-auto mb-12 sm:mb-16 md:mb-20'
          initial={{ opacity: 0, y: 30 }}
          animate={
            isTitleInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.6,
                  },
                }
              : {}
          }
        >
          <div
            className='absolute -inset-3 sm:-inset-6 lg:-inset-10 bg-gradient-to-r from-hedera-purple/5 to-hedera-blue/5 dark:from-hedera-purple/10 dark:to-hedera-blue/10 rounded-2xl sm:rounded-3xl blur-xl'
            aria-hidden='true'
          ></div>

          <div className='flex flex-col sm:flex-row justify-between relative border border-hedera-purple/20 dark:border-hedera-purple/40 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-5 md:p-6 lg:p-8 overflow-hidden bg-white/30 dark:bg-gray-800/50 backdrop-blur-sm gap-3 sm:gap-4 md:gap-6'>
            <div className='flex items-start gap-2.5 sm:gap-4 md:gap-5'>
              <div
                className='w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0 bg-gradient-to-r from-hedera-purple to-hedera-blue rounded-md sm:rounded-lg shadow-md flex items-center justify-center text-white'
                aria-hidden='true'
              >
                <FaLock className='text-base sm:text-xl md:text-2xl' />
              </div>

              <div>
                <Typography variant='subtitle1' className='mb-1 sm:mb-2 mr-2'>
                  Submission Portal
                </Typography>

                <Typography
                  variant='body2'
                  color='secondary'
                  className='mb-3 sm:mb-0 max-w-xl'
                >
                  Submit your project before May 13th, 2025 at 11:59 PM UTC
                </Typography>
              </div>
            </div>

            <div className='flex items-center justify-start sm:items-start'>
              <PrimaryButton
                href={CONSTANTS.SUBMISSION_URL}
                aria-label='Submit your project to the Bonzo Finance AI Agent Challenge'
                className='z-10 relative text-xs sm:text-sm'
                size='sm'
              >
                Submit Project
              </PrimaryButton>
            </div>

            <div
              className='absolute -right-12 -bottom-12 sm:-right-16 sm:-bottom-16 w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-hedera-purple/10 dark:bg-hedera-purple/20 rounded-full blur-3xl'
              aria-hidden='true'
            ></div>
          </div>
        </motion.div>

        <motion.div
          ref={metricsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={
            isMetricsInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    type: 'spring',
                    stiffness: 50,
                  },
                }
              : {}
          }
          className='relative max-w-7xl mx-auto mb-12 sm:mb-16'
        >
          <div className='mb-10 sm:mb-14 md:mb-16 text-center'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='relative mb-8'
            >
              <div className='relative w-24 h-24 mx-auto mb-6'>
                <div className='absolute inset-0 rounded-2xl bg-[#8259ef]/10 transform rotate-45'></div>
                <div className='absolute inset-[6px] rounded-xl bg-[#2d84eb]/10 transform rotate-45'></div>
                <div className='absolute inset-[12px] rounded-lg bg-[#3ec878]/10 transform rotate-45'></div>
                <div className='absolute inset-0 flex items-center justify-center text-4xl text-[#8259ef]'>
                  <FaGavel />
                </div>
              </div>

              <Typography
                variant='h1'
                className='text-center bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878]'
              >
                Judging Criteria
              </Typography>
            </motion.div>

            <Typography
              variant='body1'
              color='muted'
              align='center'
              className='max-w-3xl mx-auto'
            >
              Your project will be evaluated by industry experts based on these
              prestigious criteria. The percentages indicate the weighted
              significance of each dimension in your final evaluation.
            </Typography>
          </div>

          <div className='relative'>
            <div className='absolute inset-0 bg-gradient-to-br from-hedera-purple/10 via-hedera-blue/10 to-hedera-green/10 dark:from-hedera-purple/20 dark:via-hedera-blue/20 dark:to-hedera-green/20 rounded-3xl blur-xl'></div>

            <div className='absolute -inset-1 bg-gradient-to-r from-hedera-purple/5 via-hedera-blue/5 to-hedera-green/5 dark:from-hedera-purple/15 dark:via-hedera-blue/15 dark:to-hedera-green/15 rounded-3xl'></div>

            <div className='relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/40 dark:border-gray-700/40 p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden shadow-xl'>
              <div className='absolute -inset-px bg-gradient-to-r from-hedera-purple/20 via-hedera-blue/20 to-hedera-green/20 dark:from-hedera-purple/30 dark:via-hedera-blue/30 dark:to-hedera-green/30 rounded-2xl pointer-events-none'></div>

              <div className='absolute right-0 top-0 w-full h-full overflow-hidden pointer-events-none'>
                <div className='absolute -right-20 -top-20 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-hedera-purple/5 dark:bg-hedera-purple/10 rounded-full blur-3xl'></div>
                <div className='absolute -bottom-20 -left-20 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-hedera-blue/5 dark:bg-hedera-blue/10 rounded-full blur-3xl'></div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10 z-10 relative'>
                <CriterionCard
                  icon={<FaCode />}
                  title='Technical Implementation'
                  description='Quality of code, architecture choices, and effective use of the Standards SDK and Hedera services.'
                  percentage='30%'
                  gradientStart='hedera-purple'
                  gradientEnd='hedera-blue'
                  progressBarWidth='w-24 sm:w-28 md:w-32'
                />

                <CriterionCard
                  icon={<FaRobot />}
                  title='User Experience'
                  description='Intuitiveness, responsiveness, and overall user experience of your AI agent.'
                  percentage='20%'
                  gradientStart='hedera-blue'
                  gradientEnd='hedera-green'
                  progressBarWidth='w-16 sm:w-20 md:w-24'
                />

                <CriterionCard
                  icon={<FaBrain />}
                  title='Innovation'
                  description='Originality and creativity of your approach to Bonzo Finance interactions.'
                  percentage='15%'
                  gradientStart='hedera-green'
                  gradientEnd='hedera-purple'
                  progressBarWidth='w-12 sm:w-16 md:w-20'
                />

                <CriterionCard
                  icon={<FaNetworkWired />}
                  title='Integration'
                  description='Effective use of Bonzo Finance protocol features and the extent of functionality coverage.'
                  percentage='15%'
                  gradientStart='hedera-purple'
                  gradientEnd='hedera-blue'
                  progressBarWidth='w-12 sm:w-16 md:w-20'
                />

                <CriterionCard
                  icon={<FaMicrochip />}
                  title='Security & Reliability'
                  description='Robustness, error handling, and security considerations in your implementation.'
                  percentage='10%'
                  gradientStart='hedera-blue'
                  gradientEnd='hedera-green'
                  progressBarWidth='w-8 sm:w-12 md:w-14'
                />

                <CriterionCard
                  icon={<FaChartLine />}
                  title='Market Potential'
                  description='Real-world utility and adoption potential for Bonzo Finance users.'
                  percentage='10%'
                  gradientStart='hedera-green'
                  gradientEnd='hedera-purple'
                  progressBarWidth='w-8 sm:w-12 md:w-14'
                  isCompact={true}
                />
              </div>

              <div className='w-full h-px bg-gradient-to-r from-transparent via-hedera-purple/30 to-transparent my-8 sm:my-10 md:my-12'></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RequirementsSection;
