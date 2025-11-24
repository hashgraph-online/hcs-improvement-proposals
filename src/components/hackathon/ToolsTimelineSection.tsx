import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll } from 'framer-motion';
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
} from 'react-icons/fa';
import PrimaryButton from './PrimaryButton';
import HackathonTypography from './HackathonTypography';
import ToolCard from '../ui/ToolCard';
import { TimelineItem } from './TimelineItem';

const ToolsTimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.commoninja.com/sdk/latest/commonninja.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      const widget = document.querySelector(
        '.commonninja_component.pid-dc86fd1a-0e8b-4491-b0e0-9d331d2dd52b'
      );
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  const tools = [
    {
      icon: <FaGithub />,
      title: 'Standards SDK',
      description:
        'Access the full suite of HCS Improvement Proposals and reference implementations including the OpenConvAI SDK.',
      link: 'https://hol.org/docs/libraries/standards-sdk/',
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
        'Official JavaScript SDK for interacting with Hedera and building Hedera-powered applications.',
      link: 'https://github.com/hiero-ledger/hiero-sdk-js',
      color: 'blue',
    },
    {
      icon: <FaRobot />,
      title: 'Standards AgentKit',
      description:
        'Next-generation toolkit for building conversational AI agents with integrated Hedera Consensus Service support.',
      link: 'https://hol.org/docs/libraries/standards-agent-kit/',
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
      date: 'March 26th, 2025',
      title: 'Registration Opens',
      description:
        'Register early for the hackathon to get access to exclusive workshops and resources.',
    },
    {
      icon: <FaHeadset />,
      date: 'March 26th - May 2nd, 2025',
      title: 'Office Hours',
      description: 'Join our office hours every Tuesday and Thursday.',
      isHighlighted: true,
    },
    {
      icon: <FaFlag />,
      date: 'April 11th, 2025',
      title: 'Hackathon Kickoff',
      description:
        'Official opening of the hackathon with introduction to the challenge, tools, and resources.',
    },
    {
      icon: <FaLaptopCode />,
      date: 'April 11th - May 2nd, 2025',
      title: 'Building Phase',
      description:
        'Participants work on their projects with support from our technical mentors and AI assistants.',
    },
    {
      icon: <FaUserFriends />,
      date: 'April 22nd, 2025',
      title: 'Midpoint Check-in',
      description:
        'Optional progress review with mentors to receive feedback and guidance for the final stretch.',
    },
    {
      icon: <FaVideo />,
      date: 'May 2nd, 2025',
      title: 'Submission Deadline',
      description:
        'Final projects must be submitted by 11:59 PM EST, including code, documentation, and video demo.',
    },
    {
      icon: <FaVideo />,
      date: 'May 20th, 2025',
      title: 'Demo Day',
      description:
        'Top projects will have the opportunity to pitch their ideas live.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className='py-6 sm:py-8 md:py-10 relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden isolation'
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

      <div className='container mx-auto px-3 relative'>
        <div className='mb-16'>
          <div className='flex flex-col items-center text-center mb-12'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='relative mb-6'
            >
              <div className='relative w-16 h-16 mx-auto mb-4'>
                <div className='absolute inset-0 rounded-2xl bg-[#8259ef]/10 transform rotate-45'></div>
                <div className='absolute inset-[6px] rounded-xl bg-[#2d84eb]/10 transform rotate-45'></div>
                <div className='absolute inset-[12px] rounded-lg bg-[#3ec878]/10 transform rotate-45'></div>
                <div className='absolute inset-0 flex items-center justify-center text-2xl text-[#8259ef]'>
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

          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6'>
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
          className='relative max-w-5xl mx-auto mb-16 perspective'
        >
          <div className='relative'>
            <div className='absolute -inset-4 rounded-[2rem] blur-xl opacity-30 dark:opacity-20 bg-gradient-to-r from-[#8259ef]/20 via-[#2d84eb]/20 to-[#3ec878]/20'></div>

            <div className='relative rounded-[2rem] bg-white dark:bg-gray-800 overflow-hidden shadow-2xl'>
              <div className='h-2 bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878]'></div>

              <div className='p-8 sm:p-10 md:p-12'>
                <div className='flex flex-col md:flex-row md:items-center gap-6'>
                  <div className='md:w-1/3 flex justify-center'>
                    <div className='relative w-24 h-24 md:w-32 md:h-32'>
                      <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[#0088cc]/10 to-[#0088cc]/5 flex items-center justify-center overflow-hidden'>
                        <div className='absolute inset-[2px] rounded-full bg-white dark:bg-gray-800 flex items-center justify-center'>
                          <FaPaperPlane className='text-[#0088cc] text-5xl z-50' />
                        </div>
                      </div>
                      <div className='absolute -inset-1 rounded-full blur-[4px] opacity-30 bg-[#0088cc]/30'></div>
                    </div>
                  </div>

                  <div className='md:w-2/3'>
                    <HackathonTypography
                      variant='h2'
                      className='mb-3 text-[#0088cc]'
                    >
                      Need Support?
                    </HackathonTypography>

                    <HackathonTypography
                      variant='body1'
                      color='muted'
                      className='mb-6 font-light'
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

        <div className='mt-20' id='schedule'>
          <HackathonTypography
            variant='h2'
            className='text-center mb-3'
            as='h3'
          >
            Hackathon Timeline
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            color='muted'
            className='text-center max-w-3xl mx-auto mb-10 font-light'
          >
            Key dates and milestones for the Hedera AI Hackathon. Stay tuned for
            updates and detailed schedules.
          </HackathonTypography>

          <div className='flex flex-col lg:flex-row gap-10 items-start'>
            <div className='relative lg:w-1/2 w-full'>
              {timeline.map((event, index) => (
                <TimelineItem
                  key={index}
                  icon={event.icon}
                  date={event.date}
                  title={event.title}
                  description={event.description}
                  index={index}
                  isLast={index === timeline.length - 1}
                  isHighlighted={event.isHighlighted}
                />
              ))}
            </div>
            <div className='lg:w-1/2 w-full lg:sticky lg:top-24'>
              <div className='commonninja_component pid-dc86fd1a-0e8b-4491-b0e0-9d331d2dd52b'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsTimelineSection;
