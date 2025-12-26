import React, { useRef } from 'react';
import { motion, useInView, useScroll } from 'motion/react';
import {
  FaCode,
  FaRobot,
  FaPlug,
  FaLaptopCode,
  FaFlag,
  FaGithub,
  FaPaperPlane,
  FaTrophy,
  FaClock,
} from 'react-icons/fa';
import { TbBrandOpenai } from 'react-icons/tb';
import ToolCard from '../ui/ToolCard';
import Typography from '../Typography';
import { TimelineItem } from '../hackathon/TimelineItem';
import { Section } from '../hackathon/Section';

const TimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const tools = [
    {
      icon: <FaGithub />,
      title: 'Standards SDK',
      description:
        'Access the full suite of HCS Improvement Proposals and reference implementations including the OpenConvAI SDK.',
      link: 'https://hol.org/docs/libraries/standards-sdk/',
      isNew: false,
      color: 'green',
    },
    {
      icon: <FaRobot />,
      title: 'Standards Agent Kit',
      description:
        'LangChain-compatible toolkit for building AI agents that interact with the Hedera Network.',
      link: 'https://hol.org/docs/libraries/standards-agent-kit/',
      color: 'blue',
    },
    {
      icon: <TbBrandOpenai />,
      title: 'OpenConvAI Portal',
      description:
        'Deploy your agent to Moonscape OpenConvAI portal for demonstration and testing.',
      link: 'https://moonscape.tech/openconvai',
      isNew: true,
      color: 'green',
    },
    {
      icon: <FaCode />,
      title: 'Bonzo Finance API',
      description:
        'Official API for interacting with the Bonzo Finance protocol to build lending and borrowing features.',
      link: 'https://docs.bonzo.finance/hub/developer/bonzo-v1-data-api',
      color: 'blue',
    },
    {
      icon: <FaPlug />,
      title: 'Eliza Plugin Hedera',
      description:
        'Connect your AI agent to ElizaOS with this Hedera-specific integration plugin.',
      link: 'https://github.com/hashgraph/eliza-plugin-hedera',
      color: 'green',
    },
  ];

  const timeline = [
    {
      icon: <FaFlag />,
      date: 'May 1st, 2025',
      title: 'Challenge Launch',
      description:
        'The Bonzo Finance AI Agent Challenge officially begins. Start exploring the Bonzo Finance protocol and planning your AI agent implementation.',
      isHighlighted: true,
    },
    {
      icon: <FaLaptopCode />,
      date: 'May 1st - May 13th, 2025',
      title: 'Building Phase',
      description:
        'Participants work on their projects with support from Bonzo Finance and Hedera technical mentors.',
    },
    {
      icon: <FaPaperPlane />,
      date: 'May 13th, 2025',
      title: 'Submission Deadline',
      description:
        'Final projects must be submitted by 11:59 PM UTC. Ensure your repository is accessible and your agent is properly documented.',
    },
    {
      icon: <FaTrophy />,
      date: 'May 16th, 2025',
      title: 'Winners Announced',
      description:
        'Winners will be announced on the Bonzo Finance website and social media channels. Prizes will be distributed within 14 days of announcement.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id='timeline'
      className='py-16 sm:py-24 relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden isolation'
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

              <h2 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878]'>
                Tools & Resources
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='max-w-2xl'
            >
              <Typography variant='body1'>
                Challenge participants have access to these powerful developer
                tools. Leverage SDKs, APIs, and reference implementations to
                accelerate your development process and build innovative AI
                agents for Bonzo Finance.
              </Typography>
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
                buttonText='View Documentation'
              />
            ))}
          </div>
        </div>

        <div className='mt-32' id='schedule'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='max-w-4xl mx-auto text-center mb-16'
          >
            <Section icon={<FaClock />} title='Challenge Timeline' />
            <Typography variant='body1'>
              Key dates and milestones for the Bonzo Finance AI Agent Challenge.
              Mark your calendar and stay on track for your submission.
            </Typography>
          </motion.div>

          <div className='max-w-4xl mx-auto'>
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
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
