import React, { useState, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import styles from './TutorialShowcase.module.css';
import {
  StatusBadge,
  TransformCard,
  AnimatedBackground,
  Terminal,
  Typography,
} from './ui';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { HashgraphConsensus } from './HashgraphConsensus';

type TutorialCategory = {
  title: string;
  description: string;
  icon?: string;
  tutorials: Tutorial[];
};

type Tutorial = {
  title: string;
  description: string;
  href: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  standard: string;
  featured?: boolean;
  image?: string;
  tags?: string[];
};

const tutorialCategories: TutorialCategory[] = [
  {
    title: 'Getting Started',
    description: 'Set up your development environment and learn HCS fundamentals',
    icon: '🚀',
    tutorials: [
      {
        title: 'Setup Your Environment',
        description: 'Configure your development environment with Node.js, create a Hedera testnet account, and install the Standards SDK.',
        href: '/docs/tutorials/getting-started/setup-environment',
        difficulty: 'beginner',
        duration: '10 min',
        standard: 'Setup',
        featured: true,
        tags: ['setup', 'basics'],
      },
      {
        title: 'Submit Your First HCS Message',
        description: 'Learn HCS fundamentals by creating topics, submitting messages, and subscribing to real-time updates.',
        href: '/docs/tutorials/getting-started/submit-your-first-hcs-message',
        difficulty: 'beginner',
        duration: '15 min',
        standard: 'HCS Basics',
        featured: true,
        tags: ['messages', 'topics'],
      },
    ],
  },
  {
    title: 'Inscriptions & Storage',
    description: 'Store data permanently on Hedera using HCS inscriptions',
    icon: '💾',
    tutorials: [
      {
        title: 'Inscribe Your First File',
        description: 'Store any file permanently on Hedera using HCS inscriptions. Learn chunking, verification, and retrieval.',
        href: '/docs/tutorials/inscriptions/inscribe-your-first-file',
        difficulty: 'beginner',
        duration: '20 min',
        standard: 'HCS-1',
        featured: true,
        tags: ['storage', 'files'],
      },
      {
        title: 'Create NFT with Inscriptions',
        description: 'Build fully on-chain NFTs (Hashinals) where both image and metadata are stored permanently on Hedera.',
        href: '/docs/tutorials/inscriptions/create-nft-with-inscriptions',
        difficulty: 'intermediate',
        duration: '30 min',
        standard: 'HCS-5',
        tags: ['nft', 'hashinals'],
      },
    ],
  },
  {
    title: 'Registries & Discovery',
    description: 'Build decentralized registries for data organization',
    icon: '🔍',
    tutorials: [
      {
        title: 'Create Your First Registry',
        description: 'Build a decentralized registry using HCS-2 for organizing and discovering on-chain data.',
        href: '#',
        difficulty: 'intermediate',
        duration: '25 min',
        standard: 'HCS-2',
        tags: ['registry', 'discovery'],
      },
      {
        title: 'Build a Name Service',
        description: 'Create a decentralized naming system similar to ENS using HCS registries.',
        href: '#',
        difficulty: 'advanced',
        duration: '45 min',
        standard: 'HCS-2',
        tags: ['naming', 'dns'],
      },
    ],
  },
  {
    title: 'AI Agents',
    description: 'Deploy autonomous agents on the Hedera network',
    icon: '🤖',
    tutorials: [
      {
        title: 'Deploy Your First Agent',
        description: 'Create an autonomous AI agent that can communicate through HCS using the OpenConvAI standard.',
        href: '#',
        difficulty: 'intermediate',
        duration: '30 min',
        standard: 'HCS-10',
        tags: ['ai', 'agents'],
      },
      {
        title: 'Agent-to-Agent Messaging',
        description: 'Enable secure, verifiable communication between AI agents on the Hedera network.',
        href: '#',
        difficulty: 'advanced',
        duration: '40 min',
        standard: 'HCS-10',
        tags: ['ai', 'messaging'],
      },
    ],
  },
  {
    title: 'Points & Rewards',
    description: 'Implement auditable points and reward systems',
    icon: '🏆',
    tutorials: [
      {
        title: 'Deploy Points System',
        description: 'Create an auditable points system using HCS-20 for transparent reward distribution.',
        href: '#',
        difficulty: 'intermediate',
        duration: '25 min',
        standard: 'HCS-20',
        tags: ['points', 'rewards'],
      },
      {
        title: 'Build Rewards Program',
        description: 'Implement a complete loyalty program with point minting, transfers, and redemption.',
        href: '#',
        difficulty: 'advanced',
        duration: '50 min',
        standard: 'HCS-20',
        tags: ['loyalty', 'gamification'],
      },
    ],
  },
];

const DifficultyBadge: React.FC<{ difficulty: Tutorial['difficulty'] }> = ({ difficulty }) => {
  const variants = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'error'
  } as const;
  
  return (
    <StatusBadge variant={variants[difficulty]} className='font-bold'>
      {difficulty}
    </StatusBadge>
  );
};

const FeaturedCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const featuredTutorials = tutorialCategories.flatMap(cat => 
    cat.tutorials.filter(t => t.featured && t.href !== '#')
  );

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredTutorials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, featuredTutorials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredTutorials.length) % featuredTutorials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredTutorials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  if (featuredTutorials.length === 0) return null;

  return (
    <section className='relative py-12 overflow-hidden'>
      <AnimatedBackground
        variant='lines'
        colors={['brand-blue', 'brand-purple', 'brand-green']}
        opacity={0.1}
      />
      
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-8'
        >
          <Typography variant='h2' className='text-3xl font-mono font-black mb-2'>
            Featured{' '}
            <Typography variant='h2' gradient='brand' as='span'>
              Tutorials_
            </Typography>
          </Typography>
        </motion.div>

        <div className='max-w-4xl mx-auto'>
          <div className='relative'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <TransformCard
                  rotation='rotate-0'
                  background='bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900'
                  border='border-2 border-brand-blue/20'
                  shadow='xl'
                  rounded='3xl'
                  className='p-8'
                >
                  {featuredTutorials[currentIndex] && (
                    <div className='space-y-6'>
                      <div className='flex items-center justify-between'>
                        <StatusBadge variant='info' className='font-bold'>
                          {featuredTutorials[currentIndex].standard}
                        </StatusBadge>
                        <DifficultyBadge difficulty={featuredTutorials[currentIndex].difficulty} />
                      </div>
                      
                      <div>
                        <Typography variant='h3' className='text-2xl font-bold mb-3'>
                          {featuredTutorials[currentIndex].title}
                        </Typography>
                        <Typography color='muted' className='text-lg'>
                          {featuredTutorials[currentIndex].description}
                        </Typography>
                      </div>
                      
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                          </svg>
                          <Typography color='muted' className='font-semibold'>
                            {featuredTutorials[currentIndex].duration}
                          </Typography>
                        </div>
                        
                        <PrimaryButton href={featuredTutorials[currentIndex].href} size='small' className='!text-white'>
                          Start Tutorial →
                        </PrimaryButton>
                      </div>
                    </div>
                  )}
                </TransformCard>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <button
              onClick={goToPrev}
              className='absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 md:p-3 shadow-lg hover:scale-110 transition-transform z-10'
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className='absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 md:p-3 shadow-lg hover:scale-110 transition-transform z-10'
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
          
          {/* Indicators */}
          <div className='flex justify-center gap-2 mt-6'>
            {featuredTutorials.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-brand-blue' : 'w-2 bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const InteractiveLearningPath: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const controls = useAnimation();
  
  const pathSteps = [
    {
      number: 1,
      title: 'Environment Setup',
      subtitle: 'Configure your dev environment',
      time: '10 min',
      href: '/docs/tutorials/getting-started/setup-environment',
      icon: '⚙️',
    },
    {
      number: 2,
      title: 'First HCS Message',
      subtitle: 'Send your first message',
      time: '15 min',
      href: '/docs/tutorials/getting-started/submit-your-first-hcs-message',
      icon: '📨',
    },
    {
      number: 3,
      title: 'First Inscription',
      subtitle: 'Store data on-chain',
      time: '20 min',
      href: '/docs/tutorials/inscriptions/inscribe-your-first-file',
      icon: '💾',
    },
  ];

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  return (
    <section className='relative py-16 overflow-hidden'>
      <AnimatedBackground
        variant='blobs'
        colors={['brand-green', 'brand-blue', 'brand-purple']}
        intensity='low'
        opacity={0.08}
      />
      
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className='text-center mb-12'
        >
          <Typography variant='h2' className='text-3xl font-mono font-black mb-2'>
            Quick Start{' '}
            <Typography variant='h2' gradient='brand' as='span'>
              Journey_
            </Typography>
          </Typography>
          <Typography color='muted' className='text-lg'>
            Master the essentials in under an hour
          </Typography>
        </motion.div>

        <div className='max-w-4xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {pathSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: index * 0.1 }
                  }
                }}
                onMouseEnter={() => setActiveStep(step.number)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <Link to={step.href} className='block group'>
                  <TransformCard
                    rotation={activeStep === step.number ? 'rotate-[-2deg]' : 'rotate-0'}
                    background='bg-white dark:bg-gray-800'
                    border='border-2 border-gray-200 dark:border-gray-700'
                    shadow='lg'
                    rounded='2xl'
                    className='p-6 hover:scale-105 transition-all duration-300'
                  >
                    <div className='text-center space-y-4'>
                      <div className='relative inline-block'>
                        <div className='text-4xl mb-2'>{step.icon}</div>
                        <div className='absolute -top-2 -right-2 bg-brand-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold'>
                          {step.number}
                        </div>
                      </div>
                      
                      <div>
                        <Typography variant='h4' className='text-lg font-bold mb-1'>
                          {step.title}
                        </Typography>
                        <Typography color='muted' className='text-sm mb-2'>
                          {step.subtitle}
                        </Typography>
                        <StatusBadge variant='info' className='text-xs'>
                          {step.time}
                        </StatusBadge>
                      </div>
                      
                      <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <Typography color='blue' className='font-semibold text-sm'>
                          Start Step {step.number} →
                        </Typography>
                      </div>
                    </div>
                  </TransformCard>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, transition: { duration: 0.6, delay: 0.4 } }
            }}
            className='text-center mt-8'
          >
            <PrimaryButton href='/docs/tutorials/getting-started/setup-environment' className='!text-white'>
              Begin Your Journey →
            </PrimaryButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TutorialCard: React.FC<{ tutorial: Tutorial; categoryIcon?: string }> = ({ tutorial, categoryIcon }) => {
  const isAvailable = tutorial.href !== '#';
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link 
        to={isAvailable ? tutorial.href : '#'} 
        className={`block ${!isAvailable ? 'opacity-60 cursor-not-allowed' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <TransformCard
          rotation={isHovered ? 'rotate-[-1deg]' : 'rotate-0'}
          background='bg-white dark:bg-gray-800'
          border='border border-gray-200 dark:border-gray-700'
          shadow='md'
          rounded='xl'
          className='p-6 h-full hover:shadow-xl transition-all duration-300'
        >
          <div className='flex flex-col h-full'>
            <div className='flex justify-between items-start mb-4'>
              <Typography variant='h4' className='text-lg font-bold flex-1'>
                {tutorial.title}
              </Typography>
              <StatusBadge variant='primary' className='ml-2 text-xs'>
                {tutorial.standard}
              </StatusBadge>
            </div>
            
            <Typography color='muted' className='text-sm mb-4 flex-1'>
              {tutorial.description}
            </Typography>
            
            <div className='flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700'>
              <DifficultyBadge difficulty={tutorial.difficulty} />
              <div className='flex items-center gap-1 text-gray-500 dark:text-gray-400'>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <Typography color='muted' className='text-sm'>
                  {tutorial.duration}
                </Typography>
              </div>
            </div>
            
            {isAvailable ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className='mt-4'
              >
                <SecondaryButton href={tutorial.href} size='small' className='w-full text-brand-blue dark:text-brand-blue font-bold'>
                  Start Tutorial →
                </SecondaryButton>
              </motion.div>
            ) : (
              <div className='mt-4 text-center'>
                <StatusBadge variant='warning'>
                  Coming Soon
                </StatusBadge>
              </div>
            )}
          </div>
        </TransformCard>
      </Link>
    </motion.div>
  );
};

const CategorySection: React.FC<{ category: TutorialCategory }> = ({ category }) => {
  const availableCount = category.tutorials.filter(t => t.href !== '#').length;
  const totalCount = category.tutorials.length;
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={controls}
      variants={{
        visible: { opacity: 1, transition: { duration: 0.6 } }
      }}
      className='py-12'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            {category.icon && <span className='text-3xl'>{category.icon}</span>}
            <Typography variant='h2' className='text-2xl font-bold'>
              {category.title}
            </Typography>
          </div>
          <Typography color='muted' className='mb-4'>
            {category.description}
          </Typography>
          <div className='flex items-center gap-4'>
            <div className='flex-1 max-w-xs h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(availableCount / totalCount) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className='h-full bg-gradient-to-r from-brand-blue to-brand-green rounded-full'
              />
            </div>
            <Typography color='muted' className='text-sm font-semibold'>
              {availableCount} of {totalCount} available
            </Typography>
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {category.tutorials.map((tutorial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 }
                }
              }}
            >
              <TutorialCard tutorial={tutorial} categoryIcon={category.icon} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const TutorialShowcase: React.FC = () => {
  const totalTutorials = tutorialCategories.reduce(
    (acc, cat) => acc + cat.tutorials.filter(t => t.href !== '#').length, 
    0
  );
  
  const totalPlanned = tutorialCategories.reduce(
    (acc, cat) => acc + cat.tutorials.length, 
    0
  );

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install @hashgraphonline/standards-sdk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      {/* Hero Section */}
      <section className='relative py-20 overflow-hidden'>
        <AnimatedBackground
          variant='blobs'
          colors={['brand-blue', 'brand-purple', 'brand-green']}
          intensity='medium'
          opacity={0.1}
        />
        
        <div className='absolute inset-0 opacity-5 dark:opacity-10'>
          <HashgraphConsensus animated={true} />
        </div>
        
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center'
          >
            <Typography
              variant='h1'
              className='text-4xl lg:text-5xl xl:text-6xl font-mono font-black mb-6'
            >
              Learn{' '}
              <Typography
                variant='h1'
                gradient='brand'
                as='span'
                className='inline-block'
              >
                HCS Standards_
              </Typography>
            </Typography>
            <Typography
              color='muted'
              className='text-lg lg:text-xl max-w-3xl mx-auto mb-8'
            >
              Practical tutorials to build real applications with{' '}
              <Typography color='blue' as='span' className='font-semibold'>
                Hedera Consensus Service
              </Typography>
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='max-w-2xl mx-auto mb-8'
          >
            <Terminal title='quick-start.sh'>
              <Terminal.Line
                command='npm install @hashgraphonline/standards-sdk'
                clickable
                onClick={handleCopy}
              />
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className='font-mono text-sm pl-4 text-green-500'
                  >
                    ✓ Copied to clipboard!
                  </motion.div>
                )}
              </AnimatePresence>
            </Terminal>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='text-center'
          >
            <div className='inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-6 sm:px-8 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl sm:rounded-full'>
              <div className='flex items-center gap-2'>
                <span className='text-2xl sm:text-3xl font-bold text-brand-blue'>{totalTutorials}</span>
                <Typography color='muted' className='text-sm sm:text-base font-semibold'>
                  tutorials available
                </Typography>
              </div>
              <div className='hidden sm:block w-px h-8 bg-gray-300 dark:bg-gray-600' />
              <div className='flex items-center gap-2'>
                <span className='text-2xl sm:text-3xl font-bold text-brand-purple'>{totalPlanned - totalTutorials}</span>
                <Typography color='muted' className='text-sm sm:text-base font-semibold'>
                  coming soon
                </Typography>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <FeaturedCarousel />
      <InteractiveLearningPath />

      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        {tutorialCategories.map((category, index) => (
          <CategorySection key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default TutorialShowcase;