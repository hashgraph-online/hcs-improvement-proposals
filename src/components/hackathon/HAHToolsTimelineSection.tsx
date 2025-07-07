import React, { useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import {
  FaCode,
  FaRobot,
  FaPlug,
  FaArrowRight,
  FaCalendarAlt,
  FaLaptopCode,
  FaVideo,
  FaFlag,
  FaHeadset,
  FaGithub,
  FaBookOpen,
  FaUserFriends,
  FaPaperPlane,
  FaExternalLinkAlt,
  FaGlobe,
  FaComments,
} from 'react-icons/fa';
import { FiTerminal, FiGitBranch } from 'react-icons/fi';
import PrimaryButton from './PrimaryButton';
import HackathonTypography from './HackathonTypography';
import ToolCard from '../ui/ToolCard';
import { TimelineItem } from './TimelineItem';
import { TransformCard, Typography, SidebarNavButton } from '../ui';

interface Tool {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  installCommand?: string;
  visitCommand?: string;
  image?: string;
  isNew?: boolean;
  color: 'purple' | 'blue' | 'green';
}

const HAHToolsTimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tools: Tool[] = [
    {
      icon: <FaGithub />,
      title: 'Standards SDK',
      description:
        'Access the full suite of HCS Improvement Proposals and reference implementations including the OpenConvAI SDK.',
      link: 'https://hashgraphonline.com/docs/libraries/standards-sdk/',
      installCommand: 'npm install @hashgraphonline/standards-sdk',
      isNew: true,
      color: 'green',
    },
    {
      icon: <FaRobot />,
      title: 'Hedera Agent Kit',
      description:
        'A LangChain-compatible toolkit for interacting with the Hedera Network',
      link: 'https://github.com/hedera-dev/hedera-agent-kit',
      installCommand: 'npm i hedera-agent-kit',
      color: 'purple',
    },
    {
      icon: <FaCode />,
      title: 'Hedera JavaScript SDK',
      description:
        'Official JavaScript SDK for interacting with Hedera and building Hedera-powered applications.',
      link: 'https://github.com/hiero-ledger/hiero-sdk-js',
      installCommand: 'npm install @hashgraph/sdk',
      color: 'blue',
    },
    {
      icon: <FaRobot />,
      title: 'Standards AgentKit',
      description:
        'Next-generation toolkit for building conversational AI agents with integrated Hedera Consensus Service support.',
      link: 'https://hashgraphonline.com/docs/libraries/standards-agent-kit/',
      installCommand: 'npm install @hashgraphonline/standards-agent-kit',
      isNew: true,
      color: 'purple',
    },
    {
      icon: <FaComments />,
      title: 'Moonscape Portal',
      description:
        'Decentralized portal for discovering, testing, and interacting with AI agents on Hedera using the OpenConvAI standard.',
      link: 'https://moonscape.tech',
      visitCommand: 'Open moonscape.tech in your browser',
      image: '/use-cases/moonscape-portal.jpg',
      color: 'blue',
    },
  ];

  const timeline = [
    {
      icon: <FaBookOpen />,
      date: 'Now - August 1st, 2025',
      title: 'Registration Open',
      description:
        'Register early for the hackathon to get access to exclusive workshops and resources.',
      isHighlighted: true,
    },
    {
      icon: <FaHeadset />,
      date: 'Now - September 30th, 2025',
      title: 'Weekly X Spaces & Workshops',
      description:
        'Join us every Thursday at 10am EDT for Hedera x AI X Spaces, plus hands-on workshops and tutorials.',
      isHighlighted: true,
    },
    {
      icon: <FaFlag />,
      date: 'August 1st, 2025',
      title: 'Hackathon Kickoff',
      description:
        'Official opening of the AI Track with introduction to the challenges, tools, and resources.',
    },
    {
      icon: <FaLaptopCode />,
      date: 'August 1st - September 30th, 2025',
      title: 'Building Phase',
      description:
        'Two months to build innovative AI agents on Hedera with support from technical mentors.',
    },
    {
      icon: <FaUserFriends />,
      date: 'Early September 2025',
      title: 'Midpoint Check-in',
      description:
        'Optional progress review with mentors to receive feedback and guidance for the final stretch.',
    },
    {
      icon: <FaVideo />,
      date: 'September 30th, 2025',
      title: 'Submission Deadline',
      description:
        'Final projects must be submitted, including code, documentation, and video demo.',
    },
    {
      icon: <FaCalendarAlt />,
      date: 'October 2025',
      title: 'Winners Announced',
      description:
        'Top projects will be announced and winners will receive their prizes.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className='py-24 sm:py-32 relative bg-white dark:bg-black overflow-hidden'
      id='tools-timeline'
    >
      <div className='absolute inset-0'>
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: 'linear',
          }}
          className='absolute -top-1/2 -right-1/2 w-full h-full'
        >
          <div className='w-full h-full bg-gradient-conic from-[#a679f0]/20 via-transparent to-[#5599fe]/20 blur-3xl' />
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='absolute bottom-0 left-0 w-96 h-96 bg-[#48df7b]/20 rounded-full blur-3xl'
        />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='mb-24'>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#48df7b]/10 to-[#a679f0]/10 dark:from-[#48df7b]/20 dark:to-[#a679f0]/20 border border-[#48df7b]/20 dark:border-[#48df7b]/30 mb-6'
            >
              <FaCode className='text-[#48df7b] mr-2' />
              <span className='text-sm font-bold text-[#48df7b] dark:text-[#a679f0]'>
                DEVELOPER RESOURCES
              </span>
            </motion.div>

            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
              <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
                Essential Tools for AI Development
              </span>
            </h2>

            <p className='text-base text-gray-600 dark:text-white/70 max-w-3xl mx-auto'>
              Everything you need to build autonomous AI solutions on Hedera.
              From SDKs to integration plugins, we've got you covered.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='max-w-5xl mx-auto mb-16'
          >
            <div className='bg-white dark:bg-gray-900 rounded-xl lg:rounded-3xl shadow-2xl ring-1 ring-gray-300 dark:ring-gray-600 overflow-hidden'>
              <div className='bg-gray-100 dark:bg-gray-800 px-4 lg:px-6 py-2 lg:py-4 border-b border-gray-200 dark:border-gray-700'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2 lg:gap-4'>
                    <div className='flex gap-1 lg:gap-1.5'>
                      <div className='w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-red-400'></div>
                      <div className='w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-yellow-400'></div>
                      <div className='w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-green-400'></div>
                    </div>
                    <div className='text-xs lg:text-sm font-mono text-gray-600 dark:text-white/60'>
                      ai-developer-tools.dev
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='px-2 py-1 rounded text-xs font-mono bg-[#48df7b]/10 dark:bg-[#48df7b]/20 text-[#48df7b] dark:text-[#48df7b]'>
                      {tools.length} tools available
                    </div>
                  </div>
                </div>
              </div>

              <div
                className='flex flex-col lg:flex-row'
                style={{ minHeight: '480px' }}
              >
                <div className='lg:w-80 bg-white dark:bg-gray-900 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700'>
                  <div className='px-4 py-3 border-b border-gray-200 dark:border-gray-700'>
                    <div className='flex items-center gap-2 text-sm font-mono text-gray-600 dark:text-white/60'>
                      <FiGitBranch className='w-4 h-4' />
                      <span>tool directory</span>
                      <div className='w-2 h-2 rounded-full animate-pulse bg-[#48df7b]'></div>
                    </div>
                  </div>

                  <div className='p-2 space-y-1 bg-white dark:bg-gray-900'>
                    {tools.map((tool, index) => (
                      <SidebarNavButton
                        key={index}
                        isActive={activeToolIndex === index}
                        onClick={() => setActiveToolIndex(index)}
                        className='p-3'
                      >
                        <div className='flex items-center gap-3'>
                          <div
                            className='w-8 h-8 rounded-lg flex items-center justify-center text-sm'
                            style={{
                              background:
                                tool.color === 'purple'
                                  ? 'linear-gradient(135deg, #a679f0, #5599fe)'
                                  : tool.color === 'green'
                                  ? 'linear-gradient(135deg, #48df7b, #54ae70)'
                                  : 'linear-gradient(135deg, #5599fe, #48df7b)',
                            }}
                          >
                            {tool.icon}
                          </div>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2'>
                              <h3 className={`text-sm font-semibold transition-colors ${
                                activeToolIndex === index
                                  ? 'text-gray-900 dark:text-white'
                                  : 'text-gray-700 dark:text-white/80'
                              }`}>
                                {tool.title}
                              </h3>
                              {tool.isNew && (
                                <span className='text-xs px-1.5 py-0.5 rounded-full bg-[#48df7b]/20 text-[#48df7b] font-bold'>
                                  NEW
                                </span>
                              )}
                            </div>
                            <p className={`text-xs line-clamp-1 transition-colors ${
                              activeToolIndex === index
                                ? 'text-gray-600 dark:text-white/90'
                                : 'text-gray-500 dark:text-white/60'
                            }`}>
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      </SidebarNavButton>
                    ))}
                  </div>
                </div>

                <div className='flex-1 p-6 lg:p-8 bg-white dark:bg-gray-900'>
                  <motion.div
                    key={activeToolIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className='mb-6'>
                      <div className='flex items-center gap-2 mb-2'>
                        {tools[activeToolIndex].isNew && (
                          <span className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#48df7b]/10 text-[#48df7b] border border-[#48df7b]/20'>
                            NEW
                          </span>
                        )}
                      </div>
                      <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>
                        {tools[activeToolIndex].title}
                      </h2>
                      <p className='text-base text-gray-600 dark:text-white/70 leading-relaxed'>
                        {tools[activeToolIndex].description}
                      </p>
                    </div>

                    {tools[activeToolIndex].image && (
                      <div className='mb-6'>
                        <img
                          src={tools[activeToolIndex].image}
                          alt={tools[activeToolIndex].title}
                          className='w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg'
                        />
                      </div>
                    )}

                    {tools[activeToolIndex].installCommand && (
                      <div className='mb-8'>
                        <h3 className='text-sm font-medium text-gray-500 dark:text-white/60 mb-3'>
                          QUICK INSTALL
                        </h3>
                        <div className='relative group'>
                          <div className='absolute inset-0 bg-gradient-to-r from-[#a679f0]/20 via-[#5599fe]/20 to-[#48df7b]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                          <div
                            onClick={() =>
                              copyToClipboard(
                                tools[activeToolIndex].installCommand!
                              )
                            }
                            className='relative overflow-hidden bg-gray-100 dark:bg-black rounded-xl border border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/30 transition-all cursor-pointer'
                          >
                            <div className='flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-black border-b border-gray-300 dark:border-white/20'>
                              <div className='flex items-center gap-2'>
                                <div className='flex gap-1.5'>
                                  <div className='w-3 h-3 rounded-full bg-red-400' />
                                  <div className='w-3 h-3 rounded-full bg-yellow-400' />
                                  <div className='w-3 h-3 rounded-full bg-green-400' />
                                </div>
                                <FiTerminal className='w-3 h-3 text-gray-600 dark:text-white/50' />
                              </div>
                              <div className='flex items-center gap-2'>
                                {copied ? (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className='flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/20 text-green-500'
                                  >
                                    <svg
                                      className='w-3 h-3'
                                      fill='currentColor'
                                      viewBox='0 0 20 20'
                                    >
                                      <path
                                        fillRule='evenodd'
                                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                        clipRule='evenodd'
                                      />
                                    </svg>
                                    <span className='text-xs font-medium'>
                                      Copied!
                                    </span>
                                  </motion.div>
                                ) : (
                                  <div className='flex items-center gap-1.5 px-2 py-0.5 rounded text-gray-500 hover:text-gray-400 hover:bg-gray-800/50 transition-all'>
                                    <svg
                                      className='w-3 h-3'
                                      fill='none'
                                      stroke='currentColor'
                                      viewBox='0 0 24 24'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                                      />
                                    </svg>
                                    <span className='text-xs font-medium'>
                                      Copy
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className='p-4 bg-gray-50 dark:bg-black'>
                              <div className='flex items-center gap-3 font-mono text-sm'>
                                <span className='text-green-600 dark:text-green-400'>
                                  $
                                </span>
                                <code className='text-gray-900 dark:text-white/80'>
                                  {tools[activeToolIndex].installCommand}
                                </code>
                                <motion.span
                                  animate={{ opacity: [1, 0] }}
                                  transition={{ duration: 0.8, repeat: Infinity }}
                                  className='inline-block w-2 h-4 bg-gray-600 dark:bg-white/70'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {tools[activeToolIndex].visitCommand && (
                      <div className='mb-8'>
                        <h3 className='text-sm font-medium text-gray-500 dark:text-white/60 mb-3'>
                          HOW TO ACCESS
                        </h3>
                        <div className='bg-gray-100 dark:bg-black rounded-xl border border-gray-300 dark:border-white/20 p-4'>
                          <div className='flex items-center gap-3'>
                            <FaGlobe className='w-5 h-5 text-[#5599fe]' />
                            <span className='text-base text-gray-900 dark:text-white'>
                              {tools[activeToolIndex].visitCommand}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className='flex gap-4'>
                      {tools[activeToolIndex].link !== '#' ? (
                        <PrimaryButton
                          href={tools[activeToolIndex].link}
                          target='_blank'
                          rel='noopener noreferrer'
                          icon={<FaExternalLinkAlt />}
                        >
                          Explore {tools[activeToolIndex].title}
                        </PrimaryButton>
                      ) : (
                        <button
                          disabled
                          className='px-6 py-3 bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-white/40 rounded-xl font-medium cursor-not-allowed'
                        >
                          Coming Soon
                        </button>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className='mt-8 text-center'>
            <a
              href='https://github.com/hashgraph-online'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 text-sm text-gray-600 dark:text-white/60 hover:text-[#5599fe] dark:hover:text-[#48df7b] transition-colors'
            >
              <span>More developer resources</span>
              <FaArrowRight className='w-3 h-3' />
            </a>
          </div>
        </div>

        <div className='mt-32'>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#5599fe]/10 to-[#48df7b]/10 dark:from-[#5599fe]/20 dark:to-[#48df7b]/20 border border-[#5599fe]/20 dark:border-[#5599fe]/30 mb-6'
            >
              <FaCalendarAlt className='text-[#5599fe] mr-2' />
              <span className='text-sm font-bold text-[#5599fe] dark:text-[#48df7b]'>
                EVENT SCHEDULE
              </span>
            </motion.div>

            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
              <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
                Hackathon Timeline
              </span>
            </h2>

            <p className='text-base text-gray-600 dark:text-white/70 max-w-3xl mx-auto'>
              Mark your calendar with these important dates for the AI Track at
              Hedera Africa Hackathon.
            </p>
          </motion.div>

          <div className='relative max-w-4xl mx-auto'>
            <motion.div
              className='absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full'
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                background:
                  'linear-gradient(180deg, #a679f0 0%, #5599fe 50%, #48df7b 100%)',
                transformOrigin: 'top',
              }}
            />

            <div className='space-y-12'>
              {timeline.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className='absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10'
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-4 ${
                        event.isHighlighted
                          ? 'bg-white border-[#a679f0] shadow-lg shadow-[#a679f0]/50'
                          : 'bg-white border-[#5599fe]'
                      }`}
                    />
                  </motion.div>

                  <div
                    className={`ml-16 md:ml-0 ${
                      index % 2 === 0
                        ? 'md:mr-auto md:pr-16'
                        : 'md:ml-auto md:pl-16'
                    } md:w-[calc(50%-4rem)]`}
                  >
                    <TransformCard
                      rotation={`rotate-[${
                        index % 2 === 0 ? '-0.5' : '0.5'
                      }deg]`}
                      background={
                        event.isHighlighted
                          ? 'bg-gradient-to-br from-[#a679f0]/10 to-[#5599fe]/10 dark:from-[#a679f0]/20 dark:to-[#5599fe]/20'
                          : 'bg-white dark:bg-black'
                      }
                      border={`border ${
                        event.isHighlighted
                          ? 'border-[#a679f0]/20'
                          : 'border-gray-200 dark:border-white/20'
                      }`}
                      shadow='lg'
                      className='p-6 hover:scale-[1.02] transition-all duration-300'
                    >
                      <div className='flex items-start gap-4'>
                        <div
                          className='w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0'
                          style={{
                            background: event.isHighlighted
                              ? 'linear-gradient(135deg, #a679f0, #5599fe)'
                              : 'linear-gradient(135deg, #5599fe, #48df7b)',
                          }}
                        >
                          {event.icon}
                        </div>
                        <div className='flex-grow'>
                          <div className='text-xs font-bold text-[#a679f0] uppercase tracking-wide mb-1'>
                            {event.date}
                          </div>
                          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                            {event.title}
                          </h3>
                          <p className='text-sm text-gray-600 dark:text-white/70'>
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </TransformCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HAHToolsTimelineSection;
