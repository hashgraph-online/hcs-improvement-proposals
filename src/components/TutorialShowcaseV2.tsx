import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { motion, AnimatePresence } from 'framer-motion';
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

interface TutorialMainContentProps {
  item: TutorialItem;
  index: number;
}

interface TutorialSidebarItemProps {
  item: TutorialItem;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

// All tutorials in a flat structure for the showcase
const allTutorials: TutorialItem[] = [
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
  {
    id: 'create-registry',
    name: 'Create Registry',
    title: 'Create Your First Registry',
    description: 'Build a decentralized registry using HCS-2 for organizing and discovering on-chain data.',
    href: '#',
    difficulty: 'intermediate',
    duration: '25 min',
    standard: 'HCS-2',
    category: 'Registries & Discovery',
    tags: ['registry', 'discovery', 'organization'],
    codeExample: 'registerService(topicId, metadata)',
    prerequisites: ['HCS basics', 'JSON schemas'],
    learningOutcomes: [
      'Design registry schemas',
      'Register services',
      'Query registry data',
      'Implement discovery patterns'
    ],
  },
  {
    id: 'ai-agent',
    name: 'Deploy AI Agent',
    title: 'Deploy Your First Agent',
    description: 'Create an autonomous AI agent that can communicate through HCS using the OpenConvAI standard.',
    href: '#',
    difficulty: 'intermediate',
    duration: '30 min',
    standard: 'HCS-10',
    category: 'AI Agents',
    tags: ['ai', 'agents', 'automation'],
    codeExample: 'deployAgent(agentConfig, topicId)',
    prerequisites: ['HCS messaging', 'Basic AI concepts'],
    learningOutcomes: [
      'Deploy autonomous agents',
      'Configure agent behavior',
      'Enable agent communication',
      'Monitor agent activity'
    ],
  },
  {
    id: 'points-system',
    name: 'Points System',
    title: 'Deploy Auditable Points System',
    description: 'Create an auditable points system using HCS-20 for transparent reward distribution.',
    href: '#',
    difficulty: 'intermediate',
    duration: '25 min',
    standard: 'HCS-20',
    category: 'Points & Rewards',
    tags: ['points', 'rewards', 'incentives'],
    codeExample: 'mintPoints(account, amount, reason)',
    prerequisites: ['HCS basics', 'Account management'],
    learningOutcomes: [
      'Design point economics',
      'Implement minting logic',
      'Create audit trails',
      'Build leaderboards'
    ],
  },
];

const TutorialMainContent: React.FC<TutorialMainContentProps> = ({ item: tutorial }) => {
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
          {/* Header with badges */}
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

          {/* Title and description */}
          <div className='space-y-2'>
            <Typography variant='h3' className='text-2xl font-bold'>
              {tutorial.title}
            </Typography>
            <Typography color='muted' className='text-sm leading-relaxed'>
              {tutorial.description}
            </Typography>
          </div>

          {/* Code example */}
          {tutorial.codeExample && (
            <div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-3'>
              <div className='text-xs text-gray-500 mb-1'>Example:</div>
              <code className='text-xs font-mono text-brand-blue dark:text-brand-blue'>
                {tutorial.codeExample}
              </code>
            </div>
          )}

          {/* Learning outcomes */}
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

          {/* Prerequisites */}
          {tutorial.prerequisites && tutorial.prerequisites.length > 0 && (
            <div className='border-t border-gray-100 dark:border-gray-700 pt-4'>
              <Typography variant='h4' className='text-xs font-bold text-gray-600 dark:text-gray-400 mb-2'>
                Prerequisites:
              </Typography>
              <div className='flex flex-wrap gap-1'>
                {tutorial.prerequisites.map((prereq, idx) => (
                  <span key={idx} className='px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs'>
                    {prereq}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className='pt-4'>
            {isAvailable ? (
              <PrimaryButton href={tutorial.href} size='small' className='w-full !text-white'>
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

const TutorialSidebarItem: React.FC<TutorialSidebarItemProps> = ({ 
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

  const isAvailable = tutorial.href !== '#';

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onClick={onClick}
      className={`cursor-pointer transition-all duration-500 relative ${
        isActive
          ? 'bg-gradient-to-r from-brand-blue/10 via-brand-purple/5 to-brand-green/10 dark:from-brand-blue/15 dark:via-brand-purple/8 dark:to-brand-green/15 shadow-lg border-l-4 border-brand-blue scale-[1.02]'
          : 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-l-4 border-transparent hover:scale-[1.01]'
      } rounded-r-xl p-3 group`}
      style={{
        borderLeftColor: isActive ? '#3b82f6' : 'transparent',
        margin: '0.25rem 0.5rem 0.25rem 0',
      }}
    >
      {/* Background gradient effect for active state */}
      {isActive && (
        <div
          className='absolute inset-0 opacity-5'
          style={{
            background: 'linear-gradient(135deg, #3b82f640, #8b5cf620)',
          }}
        />
      )}

      <div className='relative z-10 space-y-2'>
        <div className='flex items-center justify-between'>
          <span className={`text-xs font-mono font-bold ${
            isActive ? 'text-brand-blue' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {tutorial.category}
          </span>
          {!isAvailable && (
            <StatusBadge variant='warning' className='text-xs'>
              Soon
            </StatusBadge>
          )}
        </div>

        <Typography className={`text-sm font-semibold transition-colors duration-500 ${
          isActive ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
        }`}>
          {tutorial.name}
        </Typography>

        <div className='flex items-center gap-2'>
          <div 
            className='px-2 py-0.5 rounded-full text-xs font-medium'
            style={{
              backgroundColor: `${getDifficultyColor(tutorial.difficulty)}20`,
              color: getDifficultyColor(tutorial.difficulty),
            }}
          >
            {tutorial.difficulty}
          </div>
          <span className='text-xs text-gray-500 dark:text-gray-400'>
            {tutorial.duration}
          </span>
        </div>

        {/* Show tags when active */}
        {isActive && tutorial.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className='flex flex-wrap gap-1'
          >
            {tutorial.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className='text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              >
                #{tag}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const TutorialShowcaseV2: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  const availableTutorials = allTutorials.filter(t => t.href !== '#').length;
  const totalTutorials = allTutorials.length;

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install @hashgraphonline/standards-sdk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      {/* Hero Section with Terminal */}
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
            className='text-center mb-8'
          >
            <Typography
              variant='h1'
              className='text-4xl lg:text-5xl xl:text-6xl font-mono font-black mb-4'
            >
              Interactive{' '}
              <Typography
                variant='h1'
                gradient='brand'
                as='span'
                className='inline-block'
              >
                Tutorials_
              </Typography>
            </Typography>
            <Typography
              color='muted'
              className='text-lg lg:text-xl max-w-3xl mx-auto'
            >
              Learn by building with step-by-step tutorials for{' '}
              <Typography color='blue' as='span' className='font-semibold'>
                HCS Standards
              </Typography>
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='max-w-2xl mx-auto mb-8'
          >
            <Terminal title='install.sh'>
              <Terminal.Line
                command='npm install @hashgraphonline/standards-sdk'
                clickable
                onClick={handleCopy}
              />
              <Terminal.Line output='+ @hashgraphonline/standards-sdk@latest' type='output' />
              <Terminal.Line output='added 42 packages in 3.7s' type='output' />
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
        </div>
      </section>

      {/* Interactive Tutorial Showcase */}
      <section className='relative py-20 lg:py-32 bg-gray-50 dark:bg-gray-950 overflow-hidden'>
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
              Browse All{' '}
              <Typography variant='h2' gradient='brand' as='span'>
                Tutorials_
              </Typography>
            </Typography>
            <div className='inline-flex items-center gap-4 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg'>
              <div className='flex items-center gap-2'>
                <span className='text-2xl font-bold text-brand-blue'>{availableTutorials}</span>
                <Typography color='muted' className='text-sm font-semibold'>
                  available now
                </Typography>
              </div>
              <div className='w-px h-6 bg-gray-300 dark:bg-gray-600' />
              <div className='flex items-center gap-2'>
                <span className='text-2xl font-bold text-brand-purple'>{totalTutorials - availableTutorials}</span>
                <Typography color='muted' className='text-sm font-semibold'>
                  coming soon
                </Typography>
              </div>
            </div>
          </div>

          <InteractiveShowcase
            items={allTutorials}
            title=''
            MainContent={TutorialMainContent}
            SidebarItem={TutorialSidebarItem}
            terminalTitle='tutorial-browser.sh'
            rotationInterval={8000}
            className='p-0 bg-transparent'
          />

          {/* Call to Action */}
          <div className='mt-16 text-center'>
            <div className='relative group max-w-2xl mx-auto'>
              <div className='absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-1000 animate-pulse'></div>
              <div className='relative bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-purple-950 border-4 border-blue-500/30 shadow-2xl rounded-3xl p-8 backdrop-blur-sm transform hover:scale-105 transition-all duration-500'>
                <div className='space-y-6'>
                  <h3 className='text-3xl lg:text-4xl font-mono font-black'>
                    <span style={{
                      background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #10b981)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      Ready to Build?
                    </span>
                  </h3>
                  
                  <p className='text-lg text-gray-700 dark:text-gray-200 font-medium'>
                    Start with our beginner tutorials and progress through{' '}
                    <span className='font-bold text-blue-600 dark:text-blue-400'>
                      {availableTutorials} hands-on lessons
                    </span>{' '}
                    to master HCS standards
                  </p>

                  <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <PrimaryButton 
                      href='/docs/tutorials/getting-started/setup-environment'
                      className='text-lg py-4 px-8 font-black !text-white'
                    >
                      Start Learning →
                    </PrimaryButton>
                    <SecondaryButton 
                      href='/docs/tutorials'
                      className='text-lg py-4 px-8 font-bold !text-brand-blue dark:!text-brand-blue'
                    >
                      View All Tutorials
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

export default TutorialShowcaseV2;