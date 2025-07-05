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
} from 'react-icons/fa';
import TabbedCodeBlock from './TabbedCodeBlock';
import RequirementCard from './RequirementCard';
import MetricCard from './MetricCard';
import { DataNodes, DataFlowLines } from './BackgroundAnimations';
import { CodeStyleTag } from './CodeStyleTag';
import { CODE_EXAMPLES } from './codeExamples';
import PrimaryButton from './PrimaryButton';
import HackathonTypography from './HackathonTypography';
import CriterionCard from './CriterionCard';

type Constants = {
  DORAHACKS_URL: string;
};

const CONSTANTS: Constants = {
  DORAHACKS_URL: 'https://dorahacks.io/hackathon/hedera-ai-agents/',
};

const RequirementsSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: '-100px' });
  const codeRef = useRef<HTMLDivElement>(null);
  const isCodeInView = useInView(codeRef, { once: true, margin: '-100px' });
  const metricsRef = useRef<HTMLDivElement>(null);
  const isMetricsInView = useInView(metricsRef, {
    once: true,
    margin: '-100px',
  });

  return (
    <section
      className='relative py-8 sm:py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900 overflow-hidden'
      aria-labelledby='ai-requirements-title'
      style={{
        backgroundImage: 'url("/img/hackathon/stars.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <CodeStyleTag />
      <DataNodes />
      <DataFlowLines />

      <div className='container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto'>
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
            <HackathonTypography
              variant='h1'
              gradient={true}
              align='center'
              className='inline-block'
              underline={true}
              underlineColor='gradient'
            >
              Submission Requirements
            </HackathonTypography>
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
            <HackathonTypography
              variant='body1'
              color='muted'
              align='center'
              className='max-w-3xl mx-auto mb-3 sm:mb-4 md:mb-5 px-1 sm:px-2'
            >
              For all AI solutions built during this hackathon, your project
              must meet these requirements to qualify for evaluation. Our
              judging panel will analyze each submission based on innovation,
              technical implementation, and potential impact.
            </HackathonTypography>
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
            <span className='px-2 py-1 sm:px-3 sm:py-1.5 bg-[#a679f0]/10 dark:bg-[#a679f0]/20 text-[#a679f0] rounded-full text-xs sm:text-sm font-medium'>
              #AI
            </span>
            <span className='px-2 py-1 sm:px-3 sm:py-1.5 bg-[#5599fe]/10 dark:bg-[#5599fe]/20 text-[#5599fe] rounded-full text-xs sm:text-sm font-medium'>
              #Hedera
            </span>
            <span className='px-2 py-1 sm:px-3 sm:py-1.5 bg-[#48df7b]/10 dark:bg-[#48df7b]/20 text-[#48df7b] rounded-full text-xs sm:text-sm font-medium'>
              #ConvAI
            </span>
          </motion.div>
        </div>

        <div className='max-w-6xl mx-auto mb-6 sm:mb-8 md:mb-10'>
          <motion.div
            className='grid grid-cols-2 gap-1.5 sm:gap-3 md:gap-4 lg:gap-5'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <RequirementCard
              icon={<FaGithub />}
              title='Repository Access'
              description="Provide source code with documentation explaining how your AI solution leverages Hedera's technology and protocols"
              index={0}
              iconBg='bg-gradient-to-r from-[#6e5494] to-[#4f3a6b]'
              borderColor='bg-[#6e5494]/30'
            />
            <RequirementCard
              icon={<FaVideo />}
              title='Visual Demonstration'
              description="Create a 5-minute video showcasing your AI solution's capabilities and features in action"
              index={1}
              iconBg='bg-gradient-to-r from-[#a679f0] to-[#5599fe]'
              borderColor='bg-[#a679f0]/30'
            />
            <RequirementCard
              icon={<FaFileAlt />}
              title='Architecture Spec'
              description="Submit detailed architecture specifications describing your AI solution's design and integration patterns"
              index={2}
              iconBg='bg-gradient-to-r from-[#3ec878] to-[#2a9c5a]'
              borderColor='bg-[#3ec878]/30'
            />
            <RequirementCard
              icon={<FaCog />}
              title='Deployment Protocol'
              description="Ensure your solution is deployed on Hedera's testnet or mainnet with verifiable transaction history"
              index={3}
              iconBg='bg-gradient-to-r from-[#2d84eb] to-[#1c5da3]'
              borderColor='bg-[#2d84eb]/30'
            />
          </motion.div>
        </div>

        <motion.div
          className='relative max-w-5xl mx-auto mb-6 sm:mb-8 md:mb-10'
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
            className='absolute -inset-3 sm:-inset-6 lg:-inset-10 bg-gradient-to-r from-[#a679f0]/5 to-[#5599fe]/5 dark:from-[#a679f0]/10 dark:to-[#5599fe]/10 rounded-2xl sm:rounded-3xl blur-xl'
            aria-hidden='true'
          ></div>

          <div className='flex flex-col sm:flex-row justify-between relative border border-[#a679f0]/20 dark:border-[#a679f0]/40 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-5 overflow-hidden bg-white/30 dark:bg-gray-800/50 backdrop-blur-sm gap-2 sm:gap-3 md:gap-4'>
            <div className='flex items-start gap-2 sm:gap-3 md:gap-4'>
              <div
                className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0 bg-gradient-to-r from-[#a679f0] to-[#5599fe] rounded-md sm:rounded-lg shadow-md flex items-center justify-center text-white'
                aria-hidden='true'
              >
                <FaLock className='text-sm sm:text-base md:text-lg' />
              </div>

              <div>
                <HackathonTypography
                  variant='subtitle1'
                  className='mb-1 sm:mb-2'
                >
                  Submission Portal
                </HackathonTypography>

                <HackathonTypography
                  variant='body2'
                  color='muted'
                  className='mb-3 sm:mb-0 max-w-xl'
                >
                  Submit your project before May 2nd, 2025 at 11:59 PM EST
                </HackathonTypography>
              </div>
            </div>

            <div className='flex items-center justify-start sm:items-start'>
              <PrimaryButton
                href={CONSTANTS.DORAHACKS_URL}
                aria-label='Register for the hackathon on DoraHacks'
                className='z-10 relative text-xs sm:text-sm'
                size='sm'
              >
                Register
              </PrimaryButton>
            </div>

            <div
              className='absolute -right-12 -bottom-12 sm:-right-16 sm:-bottom-16 w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-[#a679f0]/10 dark:bg-[#a679f0]/20 rounded-full blur-3xl'
              aria-hidden='true'
            ></div>
          </div>
        </motion.div>

        <motion.div
          ref={codeRef}
          initial={{ opacity: 0, y: 40 }}
          animate={
            isCodeInView
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
          className='relative max-w-6xl mx-auto mb-6 sm:mb-8 md:mb-10'
        >
          <div className='flex items-center mb-3 sm:mb-4 md:mb-5'>
            <div
              className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-[#5599fe] to-[#a679f0] rounded-lg shadow-md flex items-center justify-center text-white'
              aria-hidden='true'
            >
              <FaNetworkWired className='text-sm sm:text-base md:text-lg' />
            </div>
            <HackathonTypography variant='h3' className='ml-3 sm:ml-4'>
              AI Solution Integration Examples
            </HackathonTypography>
          </div>

          <div className='bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-0 border border-[#5599fe]/10 dark:border-[#5599fe]/20 shadow-lg overflow-hidden'>
            <TabbedCodeBlock tabs={CODE_EXAMPLES} />
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
          className='relative max-w-7xl mx-auto mb-6 sm:mb-8'
        >
          <div className='mb-6 sm:mb-8 md:mb-10 text-center'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='relative mb-8'
            >
              <div className='relative w-16 h-16 mx-auto mb-4'>
                <div className='absolute inset-0 rounded-2xl bg-[#8259ef]/10 transform rotate-45'></div>
                <div className='absolute inset-[6px] rounded-xl bg-[#2d84eb]/10 transform rotate-45'></div>
                <div className='absolute inset-[12px] rounded-lg bg-[#3ec878]/10 transform rotate-45'></div>
                <div className='absolute inset-0 flex items-center justify-center text-2xl text-[#8259ef]'>
                  <FaGavel />
                </div>
              </div>

              <HackathonTypography
                variant='h1'
                className='text-center bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878]'
                underline={true}
                underlineColor='gradient'
              >
                Judging Criteria
              </HackathonTypography>
            </motion.div>

            <HackathonTypography
              variant='body1'
              color='muted'
              align='center'
              className='max-w-3xl mx-auto'
            >
              Your project will be evaluated by industry experts based on these
              prestigious criteria. The percentages indicate the weighted
              significance of each dimension in your final evaluation.
            </HackathonTypography>
          </div>

          <div className='relative'>
            <div className='absolute inset-0 bg-gradient-to-br from-[#a679f0]/10 via-[#5599fe]/10 to-[#48df7b]/10 dark:from-[#a679f0]/20 dark:via-[#5599fe]/20 dark:to-[#48df7b]/20 rounded-3xl blur-xl'></div>

            <div className='absolute -inset-1 bg-gradient-to-r from-[#a679f0]/5 via-[#5599fe]/5 to-[#48df7b]/5 dark:from-[#a679f0]/15 dark:via-[#5599fe]/15 dark:to-[#48df7b]/15 rounded-3xl'></div>

            <div className='relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/40 dark:border-gray-700/40 p-4 sm:p-5 md:p-6 lg:p-8 overflow-hidden shadow-xl'>
              <div className='absolute -inset-px bg-gradient-to-r from-[#a679f0]/20 via-[#5599fe]/20 to-[#48df7b]/20 dark:from-[#a679f0]/30 dark:via-[#5599fe]/30 dark:to-[#48df7b]/30 rounded-2xl pointer-events-none'></div>

              <div className='absolute right-0 top-0 w-full h-full overflow-hidden pointer-events-none'>
                <div className='absolute -right-20 -top-20 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-[#a679f0]/5 dark:bg-[#a679f0]/10 rounded-full blur-3xl'></div>
                <div className='absolute -bottom-20 -left-20 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-[#5599fe]/5 dark:bg-[#5599fe]/10 rounded-full blur-3xl'></div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 z-10 relative'>
                <CriterionCard
                  icon={<FaCode />}
                  title='Innovation'
                  description='How new is the idea? Uniqueness compared to existing solutions.'
                  percentage='10%'
                  gradientStart='[#a679f0]'
                  gradientEnd='[#5599fe]'
                  progressBarWidth='w-8 sm:w-12 md:w-14'
                />

                <CriterionCard
                  icon={<FaRobot />}
                  title='Feasibility'
                  description='Viability of the concept and implementation.'
                  percentage='10%'
                  gradientStart='[#5599fe]'
                  gradientEnd='[#48df7b]'
                  progressBarWidth='w-8 sm:w-12 md:w-14'
                />

                <CriterionCard
                  icon={<FaBrain />}
                  title='Execution / Automation'
                  description='Quality of implementation, code structure, and automation.'
                  percentage='35%'
                  gradientStart='[#48df7b]'
                  gradientEnd='[#a679f0]'
                  progressBarWidth='w-28 sm:w-32 md:w-36'
                />

                <CriterionCard
                  icon={<FaNetworkWired />}
                  title='Integration'
                  description='Effective use of Hedera technologies and services.'
                  percentage='30%'
                  gradientStart='[#a679f0]'
                  gradientEnd='[#5599fe]'
                  progressBarWidth='w-24 sm:w-28 md:w-32'
                />

                <CriterionCard
                  icon={<FaMicrochip />}
                  title='Validation'
                  description='Market fit and adoption potential.'
                  percentage='5%'
                  gradientStart='[#5599fe]'
                  gradientEnd='[#48df7b]'
                  progressBarWidth='w-4 sm:w-5'
                />

                <div className='lg:col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4'>
                  <CriterionCard
                    icon={<FaChartLine />}
                    title='Success'
                    description='Impact on Hedera ecosystem growth metrics.'
                    percentage='5%'
                    gradientStart='hedera-green'
                    gradientEnd='hedera-purple'
                    progressBarWidth='w-4 sm:w-5'
                    isCompact={true}
                  />

                  <CriterionCard
                    icon={<FaBullhorn />}
                    title='Pitch'
                    description='Presentation quality and problem-solving relevance.'
                    percentage='5%'
                    gradientStart='[#a679f0]'
                    gradientEnd='[#48df7b]'
                    progressBarWidth='w-4 sm:w-5'
                    isCompact={true}
                  />
                </div>
              </div>

              <div className='w-full h-px bg-gradient-to-r from-transparent via-hedera-purple/30 to-transparent my-4 sm:my-5 md:my-6'></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RequirementsSection;
