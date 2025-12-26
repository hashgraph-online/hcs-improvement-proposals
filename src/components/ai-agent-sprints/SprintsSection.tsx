import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  FaCalendarAlt,
  FaClock,
  FaTrophy,
  FaArrowRight,
  FaLock,
  FaCode,
  FaRobot,
  FaNetworkWired,
  FaLaptopCode,
  FaShieldAlt,
} from 'react-icons/fa';
import { PrimaryButton } from '../ui/primary-button';

type SprintStatus = 'active' | 'upcoming' | 'completed';

type SprintCardProps = {
  title: string;
  dates: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  status: SprintStatus;
  reward: string;
  index: number;
};

const SprintCard: React.FC<SprintCardProps> = ({
  title,
  dates,
  description,
  icon,
  link,
  status,
  reward,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Define status-based styling
  const statusStyles = {
    active: {
      badge:
        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      border: 'border-green-300 dark:border-green-700',
      shadow: 'shadow-lg shadow-green-500/10',
      gradient: 'from-green-500/20 to-blue-500/20',
    },
    upcoming: {
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800/50',
      shadow: 'shadow-md',
      gradient: 'from-blue-500/10 to-purple-500/10',
    },
    completed: {
      badge: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
      border: 'border-gray-200 dark:border-gray-700',
      shadow: 'shadow-sm',
      gradient: 'from-gray-500/10 to-gray-400/10',
    },
  };

  const style = statusStyles[status];

  // Different button text based on status
  const buttonText = {
    active: 'Join Challenge',
    upcoming: 'Get Notified',
    completed: 'View Results',
  };

  // Button variant based on status
  const buttonVariant = status === 'active' ? 'primary' : 'secondary';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`relative rounded-2xl bg-white dark:bg-gray-800/90 border ${style.border} ${style.shadow} overflow-hidden`}
    >
      {/* Status indicator */}
      <div
        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${style.badge}`}
      >
        {status === 'active'
          ? 'Active'
          : status === 'upcoming'
          ? 'Upcoming'
          : 'Completed'}
      </div>

      {/* Gradient header */}
      <div
        className={`h-24 bg-gradient-to-r ${style.gradient} relative overflow-hidden`}
      >
        <div className='absolute inset-0 opacity-20 dark:opacity-10'>
          <div className='absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10 blur-2xl'></div>
          <div className='absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 blur-2xl'></div>
        </div>
        <div className='absolute left-6 bottom-0 transform translate-y-1/2'>
          <div className='w-16 h-16 rounded-xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-2xl text-blue-600 dark:text-blue-400'>
            {icon}
          </div>
        </div>
      </div>

      <div className='pt-12 pb-6 px-6'>
        <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
          {title}
        </h3>
        <div className='flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4'>
          <FaCalendarAlt className='mr-2' /> {dates}
        </div>
        <p className='text-gray-600 dark:text-gray-300 mb-6 min-h-[80px]'>
          {description}
        </p>

        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
            <FaClock className='mr-2' /> 2 Weeks
          </div>
          <div className='flex items-center text-sm font-medium text-blue-600 dark:text-blue-400'>
            <FaTrophy className='mr-2' /> {reward}
          </div>
        </div>

        <PrimaryButton
          href={link}
          variant={buttonVariant}
          className='w-full'
          icon={<FaArrowRight className='ml-2' />}
        >
          {buttonText[status]}
        </PrimaryButton>
      </div>
    </motion.div>
  );
};

// Future Sprint Card - placeholder for upcoming sprints
const FutureSprintCard: React.FC<{ index: number }> = ({ index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1 + 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className='relative rounded-2xl bg-white/30 dark:bg-gray-800/30 border border-dashed border-gray-300 dark:border-gray-700 overflow-hidden'
    >
      <div className='h-24 bg-gradient-to-r from-gray-200/50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-800/50 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-20 dark:opacity-10'>
          <div className='absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10 blur-2xl'></div>
          <div className='absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 blur-2xl'></div>
        </div>
        <div className='absolute left-6 bottom-0 transform translate-y-1/2'>
          <div className='w-16 h-16 rounded-xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-2xl text-gray-400'>
            <FaLock />
          </div>
        </div>
      </div>

      <div className='pt-12 pb-6 px-6'>
        <h3 className='text-xl font-bold text-gray-500 dark:text-gray-400 mb-2'>
          Future Sprint Challenge
        </h3>
        <div className='flex items-center text-sm text-gray-400 dark:text-gray-500 mb-4'>
          <FaCalendarAlt className='mr-2' /> Coming Soon
        </div>
        <p className='text-gray-400 dark:text-gray-500 mb-6 min-h-[80px]'>
          Stay tuned for our next sprint challenge. Follow our Telegram
          community for announcements.
        </p>

        <div className='flex items-center justify-center mb-6 opacity-50'>
          <div className='flex items-center text-sm text-gray-400 dark:text-gray-500'>
            <FaClock className='mr-2' /> To Be Announced
          </div>
        </div>

        <PrimaryButton
          href='https://t.me/hashinals'
          isExternal={true}
          variant='secondary'
          className='w-full bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700 text-white'
          icon={<FaArrowRight className='ml-2' />}
        >
          Get Notifications
        </PrimaryButton>
      </div>
    </motion.div>
  );
};

const SprintsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const sprints = [
    {
      title: 'Bonzo Finance AI Agent Challenge',
      dates: 'July 15 - August 5, 2023',
      description:
        'Build an AI agent that helps users interact with Bonzo Finance for portfolio management, yield farming, and DeFi operations on Hedera.',
      icon: <FaRobot />,
      link: '/sprint#sprints',
      status: 'active' as SprintStatus,
      reward: '15,000 BONZO tokens',
      index: 0,
    },
  ];

  return (
    <section
      id='sprints'
      ref={sectionRef}
      className='py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden'
    >
      {/* Background decorations */}
      <div className='absolute inset-0 z-0 overflow-hidden'>
        <div
          className='absolute top-0 right-0 w-[80%] h-[80%] translate-x-[30%] -translate-y-[20%] opacity-20 dark:opacity-10'
          style={{
            background:
              'radial-gradient(circle at center, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0) 70%)',
            zIndex: -1,
          }}
        ></div>

        <div
          className='absolute bottom-0 left-0 w-[70%] h-[70%] -translate-x-[30%] translate-y-[20%] opacity-20 dark:opacity-10'
          style={{
            background:
              'radial-gradient(circle at center, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0) 70%)',
            zIndex: -1,
          }}
        ></div>

        <div
          className='absolute inset-0 opacity-[0.02] dark:opacity-[0.03]'
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>

      <div className='container mx-auto px-4 sm:px-6 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className='text-center max-w-3xl mx-auto mb-16'
        >
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
            Sprint Challenges
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            Participate in our AI agent development program on Hedera. Each
            time-boxed sprint focuses on solving specific challenges with
            cutting-edge AI technology.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-5xl mx-auto'>
          {sprints.map((sprint, index) => (
            <SprintCard key={index} {...sprint} index={index} />
          ))}
          <FutureSprintCard index={1} />
        </div>

        <div className='mt-16 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className='text-gray-600 dark:text-gray-300 mb-6'>
              More sprint challenges are in development. Join our community for
              early access and announcements about upcoming challenges.
            </p>
            <PrimaryButton
              href='https://t.me/hashinals'
              isExternal={true}
              variant='secondary'
              className='bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
            >
              Join our Telegram Community
            </PrimaryButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SprintsSection;
