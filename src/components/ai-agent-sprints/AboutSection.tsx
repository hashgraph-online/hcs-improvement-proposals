import React, { useRef } from 'react';
import {
  FaLightbulb,
  FaRocket,
  FaUsers,
  FaCubes,
  FaMicrochip,
} from 'react-icons/fa';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  color: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  index,
  color,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = true;

  return (
    <div
      ref={cardRef}
      className='flex'
    >
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white shadow-sm mr-4`}
      >
        {icon}
      </div>
      <div>
        <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
          {title}
        </h3>
        <p className='text-gray-600 dark:text-gray-300'>{description}</p>
      </div>
    </div>
  );
};

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = true;

  const features = [
    {
      icon: <FaLightbulb />,
      title: 'Specialized Focus Areas',
      description:
        'Each sprint targets a specific use case, like DeFi agents, cross-chain data retrieval, or NFT collection management, with clear requirements and success criteria.',
      color: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    },
    {
      icon: <FaRocket />,
      title: 'Limited Timeframes',
      description:
        'Challenges run for 2-3 weeks, helping developers ship functioning prototypes quickly without scope creep or excessive development cycles.',
      color: 'bg-gradient-to-br from-blue-500 to-purple-600',
    },
    {
      icon: <FaUsers />,
      title: 'Developer Community',
      description:
        'Connect with other Hedera developers, AI researchers, and blockchain experts through our Telegram group and community events.',
      color: 'bg-gradient-to-br from-green-500 to-teal-500',
    },
    {
      icon: <FaCubes />,
      title: 'Technical Resources',
      description:
        'Access the Standards SDK, Standards Agent Kit, and other tools designed specifically for building AI agents on Hedera.',
      color: 'bg-gradient-to-br from-red-500 to-pink-500',
    },
    {
      icon: <FaMicrochip />,
      title: 'Real-World Applications',
      description:
        'Build AI agents that solve actual problems in DeFi, data retrieval, governance, and other domains with clear applications on Hedera.',
      color: 'bg-gradient-to-br from-indigo-500 to-blue-600',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className='py-24 bg-white dark:bg-gray-900 relative overflow-hidden'
    >
      {/* Background elements */}
      <div className='absolute inset-0 opacity-[0.02] dark:opacity-[0.03]'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(rgba(51, 65, 85, 0.5) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        ></div>
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='flex flex-col lg:flex-row gap-16'>
          <div className='lg:w-1/2'>
            <div
            >
              <div className='inline-block mb-6'>
                <div className='px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium'>
                  AI Agent Sprints
                </div>
              </div>

              <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6'>
                Building the AI Agent Ecosystem on Hedera
              </h2>

              <p className='text-lg text-gray-600 dark:text-gray-300 mb-8'>
                The Hashgraph Online Sprint Series offers focused development
                challenges for building AI agents on Hedera. Each challenge runs
                for 2-3 weeks with specific objectives and rewards.
              </p>

              <p className='text-lg text-gray-600 dark:text-gray-300 mb-8'>
                Our current challenge focuses on Bonzo Finance, where developers
                create AI agents for DeFi applications. Winners receive BONZO
                tokens and recognition within the Hedera ecosystem.
              </p>

              <div className='flex items-center gap-4 mb-8'>
                <div className='h-0.5 w-12 bg-blue-500'></div>
                <a
                  href='/sprint#sprints'
                  className='text-blue-600 dark:text-blue-400 font-medium hover:underline'
                >
                  View Current Challenge
                </a>
              </div>
            </div>
          </div>

          <div className='lg:w-1/2 space-y-8'>
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
                color={feature.color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
