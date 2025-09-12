import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaTrophy,
  FaUserGraduate,
  FaNetworkWired,
  FaHandshake,
  FaLightbulb,
  FaMedal,
} from 'react-icons/fa';
import { PrimaryButton } from '../ui/primary-button';

const BenefitItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}> = ({ icon, title, description, index }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700'
    >
      <div className='w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4'>
        {icon}
      </div>
      <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
        {title}
      </h3>
      <p className='text-gray-600 dark:text-gray-300'>{description}</p>
    </motion.div>
  );
};

const BenefitsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const benefits = [
    {
      icon: <FaTrophy />,
      title: 'Rewards',
      description:
        'Earn tokens, prizes, and recognition for building innovative AI agents. Check current challenge for specific reward details.',
    },
    {
      icon: <FaUserGraduate />,
      title: 'Skill Development',
      description:
        'Build practical AI and blockchain skills through real-world agent development using the HCS Standards SDK.',
    },
    {
      icon: <FaNetworkWired />,
      title: 'Industry Recognition',
      description:
        'Gain visibility in the Hedera ecosystem with featured community spotlights and case studies for top projects.',
    },
    {
      icon: <FaHandshake />,
      title: 'Networking',
      description:
        'Connect with developers, AI researchers, and Hedera ecosystem partners during and after each sprint challenge.',
    },
    {
      icon: <FaLightbulb />,
      title: 'Innovation',
      description:
        'Experiment with cutting-edge AI agent technologies in a structured environment with technical support.',
    },
    {
      icon: <FaMedal />,
      title: 'Early Adopter Advantage',
      description:
        'Position yourself at the forefront of AI agent technology on Hedera before mainstream adoption.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className='py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden'
    >
      {/* Background decorations */}
      <div className='absolute inset-0 z-0 overflow-hidden'>
        <div
          className='absolute -right-10 bottom-0 w-[35%] h-[70%] rounded-full opacity-20 dark:opacity-10 blur-3xl'
          style={{
            background:
              'radial-gradient(circle at center, rgba(59, 130, 246, 0.5), rgba(59, 130, 246, 0) 70%)',
          }}
        ></div>

        <div
          className='absolute inset-0 opacity-[0.03] dark:opacity-[0.05]'
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(59, 130, 246, 0.1) 25%, transparent 25%, transparent 50%, rgba(59, 130, 246, 0.1) 50%, rgba(59, 130, 246, 0.1) 75%, transparent 75%, transparent)
            `,
            backgroundSize: '20px 20px',
          }}
        ></div>
      </div>

      <div className='container mx-auto px-4 sm:px-6 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='max-w-4xl mx-auto text-center mb-16'
        >
          <div className='inline-block mb-6 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium'>
            Why Participate
          </div>

          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6'>
            Benefits of Joining AI Agent Sprints
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            Accelerate your development skills and earn rewards by participating
            in our time-boxed AI agent challenges.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {benefits.map((benefit, index) => (
            <BenefitItem
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='mt-16 text-center'
        >
          <PrimaryButton href='/sprint#sprints' variant='primary'>
            Join Current Challenge
          </PrimaryButton>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
