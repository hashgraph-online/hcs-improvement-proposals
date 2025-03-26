import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  FaCode,
  FaRobot,
  FaPlug,
  FaArrowRight,
  FaCalendarAlt,
  FaLaptopCode,
  FaVideo,
  FaTrophy,
  FaFlag,
  FaHeadset,
  FaUserFriends,
  FaGithub,
  FaBookOpen,
  FaComments,
  FaPaperPlane,
} from 'react-icons/fa';
import PrimaryButton from './PrimaryButton';
import HackathonTypography from './HackathonTypography';

const ToolCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  index: number;
  isNew?: boolean;
  color: 'purple' | 'blue' | 'green';
}> = ({ icon, title, description, link, index, isNew = false, color }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, amount: 0.3 });

  const colorMap = {
    purple: {
      bg: 'bg-gradient-to-br from-[#8259ef]/10 to-[#8259ef]/5',
      iconBg: 'bg-[#8259ef]/15',
      borderHover: 'group-hover:border-[#8259ef]',
      text: 'text-[#8259ef]',
      glow: 'rgba(130, 89, 239, 0.2)',
      solid: '#8259ef',
      buttonClass: 'bg-[#8259ef] hover:bg-[#8259ef]/90',
    },
    blue: {
      bg: 'bg-gradient-to-br from-[#2d84eb]/10 to-[#2d84eb]/5',
      iconBg: 'bg-[#2d84eb]/15',
      borderHover: 'group-hover:border-[#2d84eb]',
      text: 'text-[#2d84eb]',
      glow: 'rgba(45, 132, 235, 0.2)',
      solid: '#2d84eb',
      buttonClass: 'bg-[#2d84eb] hover:bg-[#2d84eb]/90',
    },
    green: {
      bg: 'bg-gradient-to-br from-[#3ec878]/10 to-[#3ec878]/5',
      iconBg: 'bg-[#3ec878]/15',
      borderHover: 'group-hover:border-[#3ec878]',
      text: 'text-[#3ec878]',
      glow: 'rgba(62, 200, 120, 0.2)',
      solid: '#3ec878',
      buttonClass: 'bg-[#3ec878] hover:bg-[#3ec878]/90',
    },
  };

  const colorStyle = colorMap[color];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className='relative h-full group'
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <motion.div
        className={`h-full overflow-hidden rounded-[2rem] border border-white/10 dark:border-gray-800/50 ${colorStyle.borderHover} transition-colors duration-700 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.2)]`}
        whileHover={{
          boxShadow: `0 30px 100px -20px ${colorStyle.glow}, 0 10px 20px -10px ${colorStyle.glow}`,
          translateY: -5,
        }}
        transition={{ duration: 0.4 }}
      >
        <div className={`relative ${colorStyle.bg} overflow-hidden`}>
          <div className='absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 blur-3xl transform translate-x-16 -translate-y-10'></div>
          <div className='absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 blur-2xl transform -translate-x-10 translate-y-10'></div>

          <div className='pt-10 pb-28 px-8 flex items-start relative z-50'>
            <div
              className={`${colorStyle.iconBg} rounded-xl p-4 transform -rotate-3 transition-transform group-hover:rotate-0 duration-500`}
            >
              <div className={`text-3xl ${colorStyle.text}`}>{icon}</div>
            </div>
          </div>

          <div className='absolute bottom-0 left-0 right-0 h-24 bg-white dark:bg-gray-900 rounded-t-[3rem]'></div>
        </div>

        <div className='relative z-50 px-8 pt-4 pb-8 bg-white dark:bg-gray-900'>
          <div className='flex items-center mb-3'>
            <HackathonTypography variant='h4' className={`${colorStyle.text}`}>
              {title}
            </HackathonTypography>
            {isNew && (
              <div className='ml-3 bg-gradient-to-r from-[#8259ef]/20 to-[#3ec878]/20 rounded-full px-3 py-1'>
                <span className='text-xs font-semibold text-[#3ec878]'>
                  NEW
                </span>
              </div>
            )}
          </div>

          <HackathonTypography
            variant='body1'
            color='muted'
            className='mb-6 font-light'
          >
            {description}
          </HackathonTypography>

          <PrimaryButton
            href={link}
            icon={<FaArrowRight />}
            className={`w-full justify-center ${colorStyle.buttonClass}`}
          >
            View Documentation
          </PrimaryButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TimelineItem: React.FC<{
  icon: React.ReactNode;
  date: string;
  title: string;
  description: string;
  index: number;
  isLast?: boolean;
  isHighlighted?: boolean;
}> = ({
  icon,
  date,
  title,
  description,
  index,
  isLast = false,
  isHighlighted = false,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`mb-16 last:mb-0 sm:pl-16 pl-8 relative ${
        isHighlighted ? 'z-50' : 'z-40'
      }`}
    >
      {!isLast && (
        <div className='absolute left-4 sm:left-8 top-14 bottom-0 w-[1px] bg-gradient-to-b from-[#8259ef]/30 via-[#2d84eb]/30 to-[#3ec878]/30 dark:from-[#8259ef]/40 dark:via-[#2d84eb]/40 dark:to-[#3ec878]/40'></div>
      )}

      {isHighlighted && (
        <div className='absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-r from-[#8259ef]/5 via-transparent to-[#3ec878]/5 dark:from-[#8259ef]/10 dark:via-transparent dark:to-[#3ec878]/10 backdrop-blur-[0px]'></div>
      )}

      <div className='relative flex flex-col sm:flex-row items-start gap-5'>
        <div className='relative flex-shrink-0 z-50'>
          <div
            className={`w-10 h-10 sm:w-16 sm:h-16 rounded-lg sm:rounded-2xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center ${
              isHighlighted ? 'text-[#3ec878]' : 'text-[#8259ef]'
            }`}
          >
            <div className='absolute inset-[2px] rounded-md sm:rounded-xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900'></div>
            <div className='relative text-lg sm:text-2xl z-50'>{icon}</div>
          </div>

          <div
            className={`absolute inset-0 rounded-lg sm:rounded-2xl blur-[3px] opacity-10 ${
              isHighlighted ? 'bg-[#3ec878]' : 'bg-[#8259ef]'
            }`}
          ></div>
        </div>

        <div className='relative z-50 pt-2'>
          <div
            className={`text-xs sm:text-sm font-medium mb-2 flex items-center gap-3 ${
              isHighlighted ? 'text-[#3ec878]' : 'text-[#8259ef]'
            }`}
          >
            <span className='h-[1px] w-6 bg-current'></span>
            {date}
          </div>

          <HackathonTypography
            variant='h4'
            className='mb-2 text-base sm:text-xl'
          >
            {title}
          </HackathonTypography>

          <HackathonTypography
            variant='body1'
            color='muted'
            className='font-light max-w-2xl text-sm sm:text-base'
          >
            {description}
          </HackathonTypography>
        </div>
      </div>
    </motion.div>
  );
};

const ToolsTimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const tools = [
    {
      icon: <FaGithub />,
      title: 'Standards Repository',
      description:
        'Access the full suite of HCS Improvement Proposals and reference implementations including the OpenConvAI SDK.',
      link: 'https://github.com/hashgraph-online/standards-sdk',
      isNew: true,
      color: 'green',
    },
    {
      icon: <FaRobot />,
      title: 'Hedera Agent Kit',
      description:
        'A LangChain-compatible toolkit for interacting with the Hedera Network',
      link: 'https://github.com/hedera-dev/hedera-agent-kit',
      color: 'purple',
    },
    {
      icon: <FaPlug />,
      title: 'Hedera Eliza Plugin',
      description:
        'Connect your AI agent to ElizaOS with this Hedera-specific integration plugin.',
      link: 'https://github.com/hedera-dev/hedera-plugin-eliza',
      color: 'blue',
    },
    {
      icon: <FaCode />,
      title: 'Hedera JavaScript SDK',
      description:
        'Official JavaScript SDK for interacting with the Hedera network and building Hedera-powered applications.',
      link: 'https://github.com/hiero-ledger/hiero-sdk-js',
      color: 'blue',
    },
    {
      icon: <FaRobot />,
      title: 'OpenConvAI AgentKit (Coming Soon)',
      description:
        'Next-generation toolkit for building conversational AI agents with integrated Hedera Consensus Service support.',
      link: '#',
      isNew: true,
      color: 'purple',
    },
    {
      icon: <FaPlug />,
      title: 'OpenConvAI Eliza Plugin (Coming Soon)',
      description:
        'Advanced integration plugin for connecting OpenConvAI agents to ElizaOS with enhanced capabilities.',
      link: '#',
      isNew: true,
      color: 'green',
    },
  ];

  const timeline = [
    {
      icon: <FaBookOpen />,
      date: 'April 11th, 2024',
      title: 'Registration Opens',
      description:
        'Register early for the hackathon to get access to exclusive workshops and resources.',
    },
    {
      icon: <FaHeadset />,
      date: 'April 11th - May 2nd, 2024',
      title: 'Office Hours',
      description:
        'Join our office hours every Tuesday and Thursday. Times will be announced soon.',
      isHighlighted: true,
    },
    {
      icon: <FaFlag />,
      date: 'April 11th, 2024',
      title: 'Hackathon Kickoff',
      description:
        'Official opening of the hackathon with introduction to the challenge, tools, and resources.',
    },
    {
      icon: <FaLaptopCode />,
      date: 'April 11th - May 2nd, 2024',
      title: 'Building Phase',
      description:
        'Participants work on their projects with support from our technical mentors and AI assistants.',
    },
    {
      icon: <FaUserFriends />,
      date: 'April 22nd, 2024',
      title: 'Midpoint Check-in',
      description:
        'Optional progress review with mentors to receive feedback and guidance for the final stretch.',
    },
    {
      icon: <FaVideo />,
      date: 'May 2nd, 2024',
      title: 'Submission Deadline',
      description:
        'Final projects must be submitted by 11:59 PM EST, including code, documentation, and video demo.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className='py-8 sm:py-10 md:py-16 relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden isolation'
      id='tools-timeline'
    >
      <div className='absolute inset-0 z-[-1] overflow-hidden'>
        <div
          className='absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full opacity-30 dark:opacity-20 blur-3xl'
          style={{
            background:
              'radial-gradient(circle at center, rgba(130, 89, 239, 0.4), rgba(130, 89, 239, 0) 70%)',
          }}
        ></div>
        <div
          className='absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full opacity-30 dark:opacity-20 blur-3xl'
          style={{
            background:
              'radial-gradient(circle at center, rgba(62, 200, 120, 0.4), rgba(62, 200, 120, 0) 70%)',
          }}
        ></div>

        <div
          className='absolute inset-0 opacity-[0.02] dark:opacity-[0.03]'
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(130, 89, 239, 0.3) 1px, transparent 1px),
              linear-gradient(rgba(45, 132, 235, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        ></div>

        <div
          className='absolute inset-0 opacity-[0.03] dark:opacity-[0.04]'
          style={{
            backgroundImage: `radial-gradient(rgba(62, 200, 120, 0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <div className='container mx-auto px-6 relative'>
        <div className='mb-24'>
          <div className='flex flex-col items-center text-center mb-20'>
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
                  <FaCode />
                </div>
              </div>

              <HackathonTypography
                variant='h1'
                className='bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878]'
              >
                Build with Hedera
              </HackathonTypography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='max-w-2xl'
            >
              <HackathonTypography
                variant='body1'
                color='muted'
                className='font-light'
              >
                Hackathon participants have access to these powerful developer
                tools. Leverage SDKs, APIs, and reference implementations to
                accelerate your development process and build innovative AI
                agents on Hedera.
              </HackathonTypography>
            </motion.div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10'>
            {tools.map((tool, index) => (
              <ToolCard
                key={index}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                link={tool.link}
                index={index}
                isNew={tool.isNew}
                color={tool.color as 'purple' | 'blue' | 'green'}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='relative max-w-5xl mx-auto mb-24 perspective'
        >
          <div className='relative'>
            <div className='absolute -inset-4 rounded-[2rem] blur-xl opacity-30 dark:opacity-20 bg-gradient-to-r from-[#8259ef]/20 via-[#2d84eb]/20 to-[#3ec878]/20'></div>

            <div className='relative rounded-[2rem] bg-white dark:bg-gray-800 overflow-hidden shadow-2xl'>
              <div className='h-2 bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878]'></div>

              <div className='p-12 sm:p-14 md:p-16'>
                <div className='flex flex-col md:flex-row md:items-center gap-10'>
                  <div className='md:w-1/3 flex justify-center'>
                    <div className='relative w-32 h-32 md:w-44 md:h-44'>
                      <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[#0088cc]/10 to-[#0088cc]/5 flex items-center justify-center overflow-hidden'>
                        <div className='absolute inset-[2px] rounded-full bg-white dark:bg-gray-800 flex items-center justify-center'>
                          <FaPaperPlane className='text-[#0088cc] text-7xl z-50' />
                        </div>
                      </div>
                      <div className='absolute -inset-1 rounded-full blur-[4px] opacity-30 bg-[#0088cc]/30'></div>
                    </div>
                  </div>

                  <div className='md:w-2/3'>
                    <HackathonTypography
                      variant='h2'
                      className='mb-4 text-[#0088cc]'
                    >
                      Need Support?
                    </HackathonTypography>

                    <HackathonTypography
                      variant='body1'
                      color='muted'
                      className='mb-8 font-light'
                    >
                      Join our Telegram group for real-time support and to
                      connect with other participants. Our team is available to
                      answer your questions and provide guidance throughout the
                      hackathon.
                    </HackathonTypography>

                    <PrimaryButton
                      href='https://t.me/hashinals'
                      icon={<FaPaperPlane />}
                      className='bg-[#0088cc] hover:bg-[#0088cc]/90'
                    >
                      Join Telegram Community
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div>
          <div className='flex flex-col items-center text-center mb-24'>
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
                  <FaCalendarAlt />
                </div>
              </div>

              <HackathonTypography
                variant='h1'
                className='bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878]'
              >
                Hackathon Schedule
              </HackathonTypography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='max-w-2xl'
            >
              <HackathonTypography
                variant='body1'
                color='muted'
                className='font-light'
              >
                Mark these important dates in your calendar to stay on track
                throughout the hackathon. Our team provides support at every
                stage of your build journey from registration to final
                submission.
              </HackathonTypography>
            </motion.div>
          </div>

          <div className='relative max-w-5xl mx-auto'>
            <div className='absolute left-4 sm:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#8259ef] via-[#2d84eb] to-[#3ec878] opacity-30'></div>

            <div className='space-y-0'>
              {timeline.map((item, index) => (
                <TimelineItem
                  key={index}
                  icon={item.icon}
                  date={item.date}
                  title={item.title}
                  description={item.description}
                  index={index}
                  isLast={item.isLast}
                  isHighlighted={item.isHighlighted}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsTimelineSection;
