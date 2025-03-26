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
      className='relative py-16 sm:py-20 md:py-24 lg:py-32 bg-white dark:bg-gray-900 overflow-hidden'
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
              className='max-w-3xl mx-auto mb-5 sm:mb-6 md:mb-8 px-1 sm:px-2'
            >
              For AI agents and human developers collaborating in this
              hackathon, your project must meet these requirements to qualify
              for evaluation. Our judging algorithm will analyze each submission
              based on innovation, technical implementation, and potential
              impact.
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
            <span className='px-2 py-1 sm:px-3 sm:py-1.5 bg-hedera-purple/10 dark:bg-hedera-purple/20 text-hedera-purple rounded-full text-xs sm:text-sm font-medium'>
              #AI
            </span>
            <span className='px-2 py-1 sm:px-3 sm:py-1.5 bg-hedera-blue/10 dark:bg-hedera-blue/20 text-hedera-blue rounded-full text-xs sm:text-sm font-medium'>
              #Hedera
            </span>
            <span className='px-2 py-1 sm:px-3 sm:py-1.5 bg-hedera-green/10 dark:bg-hedera-green/20 text-hedera-green rounded-full text-xs sm:text-sm font-medium'>
              #ConvAI
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
              description="Provide source code with documentation explaining how your agent leverages Hedera's ConvAI protocol for autonomous communication"
              index={0}
              iconBg='bg-gradient-to-r from-[#6e5494] to-[#4f3a6b]'
              borderColor='bg-[#6e5494]/30'
            />
            <RequirementCard
              icon={<FaVideo />}
              title='Visual Demonstration'
              description="Create a 5-minute video showcasing your agent's capabilities and communication protocols in action"
              index={1}
              iconBg='bg-gradient-to-r from-hedera-purple to-hedera-blue'
              borderColor='bg-hedera-purple/30'
            />
            <RequirementCard
              icon={<FaFileAlt />}
              title='Architecture Spec'
              description="Submit detailed architecture specifications describing your agent's decision-making frameworks and integration patterns"
              index={2}
              iconBg='bg-gradient-to-r from-[#3ec878] to-[#2a9c5a]'
              borderColor='bg-[#3ec878]/30'
            />
            <RequirementCard
              icon={<FaCog />}
              title='Deployment Protocol'
              description="Ensure your agent is deployed on Hedera's testnet or mainnet with verifiable transaction history"
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
                  Submit your project before May 2nd, 2024 at 11:59 PM EST
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
              className='absolute -right-12 -bottom-12 sm:-right-16 sm:-bottom-16 w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-hedera-purple/10 dark:bg-hedera-purple/20 rounded-full blur-3xl'
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
          className='relative max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20'
        >
          <div className='flex items-center mb-4 sm:mb-6 md:mb-8'>
            <div
              className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-hedera-blue to-hedera-purple rounded-lg shadow-md flex items-center justify-center text-white'
              aria-hidden='true'
            >
              <FaNetworkWired className='text-base sm:text-lg md:text-xl' />
            </div>
            <HackathonTypography variant='h3' className='ml-3 sm:ml-4'>
              Agent Integration Examples
            </HackathonTypography>
          </div>

          <div className='bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-0 border border-hedera-blue/10 dark:border-hedera-blue/20 shadow-lg overflow-hidden'>
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
                  title='Innovation'
                  description='How new is the idea? Uniqueness compared to existing solutions.'
                  percentage='10%'
                  gradientStart='hedera-purple'
                  gradientEnd='hedera-blue'
                  progressBarWidth='w-8 sm:w-12 md:w-14'
                />

                <CriterionCard
                  icon={<FaRobot />}
                  title='Feasibility'
                  description='Viability of the concept and implementation.'
                  percentage='10%'
                  gradientStart='hedera-blue'
                  gradientEnd='hedera-green'
                  progressBarWidth='w-8 sm:w-12 md:w-14'
                />

                <CriterionCard
                  icon={<FaBrain />}
                  title='Execution / Automation'
                  description='Quality of implementation, code structure, and automation.'
                  percentage='35%'
                  gradientStart='hedera-green'
                  gradientEnd='hedera-purple'
                  progressBarWidth='w-28 sm:w-32 md:w-36'
                />

                <CriterionCard
                  icon={<FaNetworkWired />}
                  title='Integration'
                  description='Effective use of Hedera technologies and services.'
                  percentage='30%'
                  gradientStart='hedera-purple'
                  gradientEnd='hedera-blue'
                  progressBarWidth='w-24 sm:w-28 md:w-32'
                />

                <CriterionCard
                  icon={<FaMicrochip />}
                  title='Validation'
                  description='Market fit and adoption potential.'
                  percentage='5%'
                  gradientStart='hedera-blue'
                  gradientEnd='hedera-green'
                  progressBarWidth='w-4 sm:w-5'
                />

                <div className='lg:col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 md:gap-8'>
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
                    gradientStart='hedera-purple'
                    gradientEnd='hedera-green'
                    progressBarWidth='w-4 sm:w-5'
                    isCompact={true}
                  />
                </div>
              </div>

              <div className='w-full h-px bg-gradient-to-r from-transparent via-hedera-purple/30 to-transparent my-8 sm:my-10 md:my-12'></div>

              <div className='relative'>
                <div className='absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-hedera-purple/5 via-hedera-blue/5 to-hedera-green/5 dark:from-hedera-purple/10 dark:via-hedera-blue/10 dark:to-hedera-green/10 rounded-xl blur-lg'></div>

                <div className='flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/50 dark:border-gray-700/50 p-5 sm:p-6 md:p-8 relative'>
                  <div className='absolute -inset-px bg-gradient-to-r from-hedera-purple/10 via-hedera-blue/10 to-hedera-green/10 dark:from-hedera-purple/15 dark:via-hedera-blue/15 dark:to-hedera-green/15 rounded-xl pointer-events-none'></div>

                  <div className='flex items-center relative z-10'>
                    <div
                      className='w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-lg flex items-center justify-center bg-gradient-to-r from-hedera-purple to-hedera-blue text-white mr-4 sm:mr-5 shadow-lg'
                      style={{
                        boxShadow: '0 10px 25px -5px rgba(130, 89, 239, 0.3)',
                      }}
                    >
                      <FaWeight />
                    </div>
                    <div>
                      <HackathonTypography
                        variant='caption'
                        color='muted'
                        className='uppercase tracking-wider'
                      >
                        Total Evaluation Weight
                      </HackathonTypography>
                      <HackathonTypography variant='h3' gradient={true}>
                        100%
                      </HackathonTypography>
                    </div>
                  </div>

                  <div className='flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-5 md:gap-6 z-10'>
                    <div className='flex items-center'>
                      <div
                        className='w-5 h-5 rounded-full bg-gradient-to-br from-hedera-purple to-hedera-purple/80 mr-2.5 shadow-sm'
                        style={{
                          boxShadow: '0 2px 6px rgba(130, 89, 239, 0.3)',
                        }}
                      ></div>
                      <span className='font-medium'>
                        Innovation/Integration
                      </span>
                    </div>

                    <div className='flex items-center'>
                      <div
                        className='w-5 h-5 rounded-full bg-gradient-to-br from-hedera-blue to-hedera-blue/80 mr-2.5 shadow-sm'
                        style={{
                          boxShadow: '0 2px 6px rgba(45, 132, 235, 0.3)',
                        }}
                      ></div>
                      <span className='font-medium'>
                        Feasibility/Validation
                      </span>
                    </div>

                    <div className='flex items-center'>
                      <div
                        className='w-5 h-5 rounded-full bg-gradient-to-br from-hedera-green to-hedera-green/80 mr-2.5 shadow-sm'
                        style={{
                          boxShadow: '0 2px 6px rgba(62, 200, 120, 0.3)',
                        }}
                      ></div>
                      <span className='font-medium'>Execution/Success</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RequirementsSection;
