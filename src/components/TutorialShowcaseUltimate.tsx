import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
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
import InteractiveShowcase, { ShowcaseItem } from './InteractiveShowcase';

// Tutorial types
interface TutorialItem extends ShowcaseItem {
  id: string;
  name: string;
  title: string;
  description: string;
  href: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  standard: string;
  category: string;
  tags: string[];
  codeExample?: string;
  prerequisites?: string[];
  learningOutcomes?: string[];
}

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

// Tutorial data for carousel
const carouselTutorials: TutorialItem[] = [
  {
    id: 'setup-environment',
    name: 'Setup Environment',
    title: 'Setup Your Development Environment',
    description: 'Configure your development environment with Node.js, create a Hedera testnet account, and install the Standards SDK.',
    href: '/docs/tutorials/getting-started/setup-environment',
    difficulty: 'beginner',
    duration: '10 min',
    standard: 'Setup',
    category: 'Getting Started',
    tags: ['setup', 'basics', 'environment'],
    codeExample: 'npm install @hashgraphonline/standards-sdk',
    learningOutcomes: [
      'Install Node.js and npm',
      'Create a Hedera testnet account',
      'Configure environment variables',
      'Install Standards SDK'
    ],
  },
  {
    id: 'first-hcs-message',
    name: 'First HCS Message',
    title: 'Submit Your First HCS Message',
    description: 'Learn HCS fundamentals by creating topics, submitting messages, and subscribing to real-time updates.',
    href: '/docs/tutorials/getting-started/submit-your-first-hcs-message',
    difficulty: 'beginner',
    duration: '15 min',
    standard: 'HCS Basics',
    category: 'Getting Started',
    tags: ['messages', 'topics', 'consensus'],
    codeExample: 'await client.submitMessage(topicId, message)',
    prerequisites: ['Environment setup completed'],
    learningOutcomes: [
      'Create HCS topics',
      'Submit messages to topics',
      'Subscribe to topic updates',
      'Handle message ordering'
    ],
  },
  {
    id: 'inscribe-file',
    name: 'File Inscription',
    title: 'Inscribe Your First File',
    description: 'Store any file permanently on Hedera using HCS inscriptions. Learn chunking, verification, and retrieval.',
    href: '/docs/tutorials/inscriptions/inscribe-your-first-file',
    difficulty: 'beginner',
    duration: '20 min',
    standard: 'HCS-1',
    category: 'Inscriptions & Storage',
    tags: ['storage', 'files', 'inscriptions'],
    codeExample: 'inscribe(fileBuffer, metadata)',
    prerequisites: ['HCS basics understanding'],
    learningOutcomes: [
      'Inscribe files on-chain',
      'Handle file chunking',
      'Verify inscriptions',
      'Retrieve stored files'
    ],
  },
  {
    id: 'create-hashinal',
    name: 'Create Hashinal NFT',
    title: 'Create NFT with Inscriptions',
    description: 'Build fully on-chain NFTs (Hashinals) where both image and metadata are stored permanently on Hedera.',
    href: '/docs/tutorials/inscriptions/create-nft-with-inscriptions',
    difficulty: 'intermediate',
    duration: '30 min',
    standard: 'HCS-5',
    category: 'Inscriptions & Storage',
    tags: ['nft', 'hashinals', 'tokenization'],
    codeExample: 'createHashinal(fileId, tokenConfig)',
    prerequisites: ['HCS-1 understanding', 'Token service knowledge'],
    learningOutcomes: [
      'Create Hashinal NFTs',
      'Store NFT metadata on-chain',
      'Link inscriptions to tokens',
      'Implement evolving NFTs'
    ],
  },
];

// Tutorial categories for grid section
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

// Components for carousel
const TutorialMainContent: React.FC<{ item: TutorialItem; index: number }> = ({ item: tutorial }) => {
  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'info';
    }
  };

  const isAvailable = tutorial.href !== '#';

  return (
    <div className='relative'>
      <TransformCard
        rotation='rotate-0'
        background='bg-white dark:bg-gray-800'
        border='border border-gray-200 dark:border-gray-700'
        shadow='lg'
        rounded='2xl'
        className='overflow-hidden'
      >
        <div className='p-6 space-y-4'>
          <div className='flex items-center justify-between flex-wrap gap-2'>
            <div className='flex items-center gap-2'>
              <StatusBadge variant='primary' className='font-bold'>
                {tutorial.standard}
              </StatusBadge>
              <StatusBadge variant={getDifficultyVariant(tutorial.difficulty)}>
                {tutorial.difficulty}
              </StatusBadge>
            </div>
            <div className='flex items-center gap-2 text-gray-500 dark:text-gray-400'>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span className='text-sm font-semibold'>{tutorial.duration}</span>
            </div>
          </div>

          <div className='space-y-2'>
            <Typography variant='h3' className='text-2xl font-bold'>
              {tutorial.title}
            </Typography>
            <Typography color='muted' className='text-sm leading-relaxed'>
              {tutorial.description}
            </Typography>
          </div>

          {tutorial.codeExample && (
            <div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-3'>
              <div className='text-xs text-gray-500 mb-1'>Example:</div>
              <code className='text-xs font-mono text-brand-blue dark:text-brand-blue'>
                {tutorial.codeExample}
              </code>
            </div>
          )}

          {tutorial.learningOutcomes && (
            <div className='space-y-2'>
              <Typography variant='h4' className='text-sm font-bold text-gray-700 dark:text-gray-300'>
                What you'll learn:
              </Typography>
              <div className='grid grid-cols-2 gap-2'>
                {tutorial.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className='flex items-start gap-2'>
                    <svg className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <Typography className='text-xs text-gray-600 dark:text-gray-400'>
                      {outcome}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className='pt-4'>
            {isAvailable ? (
              <PrimaryButton href={tutorial.href} size='small' className='w-full text-white dark:text-white font-bold'>
                Start Tutorial →
              </PrimaryButton>
            ) : (
              <div className='text-center py-3 bg-gray-100 dark:bg-gray-700 rounded-lg'>
                <StatusBadge variant='warning'>Coming Soon</StatusBadge>
              </div>
            )}
          </div>
        </div>
      </TransformCard>
    </div>
  );
};

const TutorialSidebarItem: React.FC<{ item: TutorialItem; index: number; isActive: boolean; onClick: () => void }> = ({ 
  item: tutorial, 
  index, 
  isActive, 
  onClick 
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onClick={onClick}
      className={`cursor-pointer transition-all duration-500 relative ${
        isActive
          ? 'bg-gradient-to-r from-brand-blue/10 via-brand-purple/5 to-brand-green/10 shadow-lg border-l-4 border-brand-blue scale-[1.02]'
          : 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-l-4 border-transparent hover:scale-[1.01]'
      } rounded-r-xl p-3 group`}
      style={{
        borderLeftColor: isActive ? '#3b82f6' : 'transparent',
        margin: '0.25rem 0.5rem 0.25rem 0',
      }}
    >
      <div className='relative z-10 space-y-2'>
        <span className={`text-xs font-mono font-bold ${
          isActive ? 'text-brand-blue' : 'text-gray-600 dark:text-gray-400'
        }`}>
          {tutorial.category}
        </span>

        <Typography className={`text-sm font-semibold ${
          isActive ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
        }`}>
          {tutorial.name}
        </Typography>

        <div className='flex items-center gap-2'>
          <div className='px-2 py-0.5 rounded-full text-xs font-medium'
            style={{
              backgroundColor: `${getDifficultyColor(tutorial.difficulty)}20`,
              color: getDifficultyColor(tutorial.difficulty),
            }}
          >
            {tutorial.difficulty}
          </div>
          <span className='text-xs text-gray-500'>{tutorial.duration}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Tutorial card component for category grid
const TutorialCard: React.FC<{ tutorial: Tutorial }> = ({ tutorial }) => {
  const isAvailable = tutorial.href !== '#';
  const [isHovered, setIsHovered] = useState(false);
  
  const variants = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'error'
  } as const;
  
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
              <StatusBadge variant={variants[tutorial.difficulty]} className='font-bold'>
                {tutorial.difficulty}
              </StatusBadge>
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

// Category section component
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
              <TutorialCard tutorial={tutorial} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Main component combining both versions
const TutorialShowcaseUltimate: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  const totalTutorials = tutorialCategories.reduce(
    (acc, cat) => acc + cat.tutorials.filter(t => t.href !== '#').length, 
    0
  );
  
  const totalPlanned = tutorialCategories.reduce(
    (acc, cat) => acc + cat.tutorials.length, 
    0
  );

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

      {/* Interactive Carousel Section */}
      <section className='relative py-16 bg-gray-50 dark:bg-gray-950 overflow-hidden'>
        <AnimatedBackground
          variant='lines'
          colors={['brand-blue', 'brand-purple', 'brand-green']}
          intensity='low'
          opacity={0.05}
        />

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center mb-12'>
            <Typography
              variant='h2'
              className='text-3xl lg:text-4xl font-mono font-black mb-4'
            >
              Featured{' '}
              <Typography variant='h2' gradient='brand' as='span'>
                Tutorials_
              </Typography>
            </Typography>
            <Typography color='muted' className='text-lg max-w-2xl mx-auto'>
              Browse our interactive tutorial showcase with detailed examples and learning outcomes
            </Typography>
          </div>

          <InteractiveShowcase
            items={carouselTutorials}
            title=''
            MainContent={TutorialMainContent}
            SidebarItem={TutorialSidebarItem}
            terminalTitle='tutorial-browser.sh'
            rotationInterval={8000}
            className='p-0 bg-transparent'
          />
        </div>
      </section>

      {/* Category Grid Section */}
      <section className='relative py-16 bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <Typography
              variant='h2'
              className='text-3xl lg:text-4xl font-mono font-black mb-4'
            >
              Browse by{' '}
              <Typography variant='h2' gradient='brand' as='span'>
                Category_
              </Typography>
            </Typography>
            <Typography color='muted' className='text-lg max-w-2xl mx-auto'>
              Explore all tutorials organized by topic and difficulty level
            </Typography>
          </div>

          <div className='divide-y divide-gray-200 dark:divide-gray-700'>
            {tutorialCategories.map((category, index) => (
              <CategorySection key={index} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='relative py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden'>
        <AnimatedBackground
          variant='blobs'
          colors={['brand-blue', 'brand-purple', 'brand-green']}
          intensity='low'
          opacity={0.1}
        />
        
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center'>
            <div className='relative group max-w-2xl mx-auto'>
              <div className='absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-1000 animate-pulse'></div>
              <div className='relative bg-white dark:bg-gray-800 border-4 border-blue-500/30 shadow-2xl rounded-3xl p-8 backdrop-blur-sm transform hover:scale-105 transition-all duration-500'>
                <div className='space-y-6'>
                  <h3 className='text-3xl lg:text-4xl font-mono font-black'>
                    <span style={{
                      background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #10b981)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      Start Your Journey
                    </span>
                  </h3>
                  
                  <p className='text-lg text-gray-700 dark:text-gray-200 font-medium'>
                    Join thousands of developers building on{' '}
                    <span className='font-bold text-blue-600 dark:text-blue-400'>
                      Hedera
                    </span>{' '}
                    with our comprehensive tutorials
                  </p>

                  <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <PrimaryButton 
                      href='/docs/tutorials/getting-started/setup-environment'
                      className='text-lg py-4 px-8 font-black !text-white'
                    >
                      Start First Tutorial →
                    </PrimaryButton>
                    <SecondaryButton 
                      href='https://github.com/hashgraph-online/standards-sdk'
                      className='text-lg py-4 px-8 font-bold !text-brand-blue dark:!text-brand-blue'
                    >
                      View on GitHub ↗
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorialShowcaseUltimate;