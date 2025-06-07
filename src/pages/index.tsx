import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Modal from '../components/Modal';
import UseCaseSection from '../components/UseCaseSection';
import { MemberSection } from '../components/members/MemberSection';
import { HashgraphConsensus } from '../components/HashgraphConsensus';
import {
  StatusBadge,
  TransformCard,
  AnimatedBackground,
  Terminal,
  Typography,
  CodeComment,
  CodeHeading,
} from '../components/ui';

interface Tool {
  title: string;
  description: string;
  link: string;
  highlight?: string | null;
  image: string;
  relatedStandard: string;
}

const NewsletterOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4'>
      <div className='relative w-full max-w-3xl mx-auto bg-white rounded-lg overflow-hidden'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-10'
          aria-label='Close newsletter signup'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
        <iframe
          src='https://abf8595d.sibforms.com/serve/MUIFAFOh0_qO6OntUHoDlZoTAwNDz7dIC7zTMveLKftES2Ku1z5WNKcJuiMLBTATRQD3WBVXkID6XDI72mQHAe3_TfTbT0_gvKjGw6cujid9M64jKctPYIkt3uYEJXbItqwTmIJjHSEWPoxKteE3S8U9MG-KMVsIss96koZT9CbICG5kL0jBqtSAa9VsSVYT4du9d-S0jKrK069h'
          frameBorder='0'
          scrolling='auto'
          allowFullScreen
          className='w-full h-full py-8 overflow-auto'
          style={{
            width: '100%',
            height: '80vh',
            border: 'none',
          }}
        />
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);

  return (
    <section className='relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden'>
      <AnimatedBackground
        variant='blobs'
        colors={['brand-blue', 'brand-purple', 'brand-green']}
        intensity='medium'
        opacity={0.1}
      />

      <div className='absolute inset-0 opacity-15 dark:opacity-10'>
        <HashgraphConsensus animated={true} />
      </div>

      <div className='relative z-10 container mx-auto px-6 lg:px-8 min-h-screen'>
        <div className='grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20'>
          <div className='space-y-8'>
            <div className='space-y-6'>
              <Typography variant='h1' className='leading-tight tracking-tight'>
                <span className='block text-2xl lg:text-3xl xl:text-4xl font-normal text-gray-600 dark:text-gray-400 mb-2'>
                  /hashgraph-online_
                </span>
                <span className='block'>on-chain</span>
                <Typography
                  variant='h1'
                  gradient='brand'
                  as='span'
                  className='inline-block'
                >
                  internet
                </Typography>
              </Typography>

              <Terminal title='terminal'>
                <Terminal.Line command='npm install @hashgraphonline/standards-sdk' />
                <Terminal.Line
                  output='✓ Installing autonomous agent infrastructure...'
                  type='output'
                />
                <Terminal.Line
                  output='// Ready to build the agentic internet'
                  type='comment'
                />
              </Terminal>

              <Typography
                color='muted'
                className='text-lg lg:text-xl leading-relaxed max-w-2xl'
              >
                Complete internet infrastructure living entirely on-chain
                through{' '}
                <Typography
                  color='blue'
                  as='span'
                  className='text-lg lg:text-xl font-semibold'
                >
                  Hedera Consensus Service
                </Typography>
                .
                <br />
                <Typography color='gray' className='text-sm'>
                  28M+ transactions • 15+ standards • 10 consortium members
                </Typography>
              </Typography>

              <div className='flex flex-col sm:flex-row gap-4'>
                <PrimaryButton href='/docs/libraries/standards-sdk'>
                  Standards SDK Docs →
                </PrimaryButton>

                <SecondaryButton onClick={() => setShowNewsletter(true)}>
                  Join Newsletter ↗
                </SecondaryButton>
              </div>
            </div>
          </div>

          <div className='space-y-8'>
            <div className='relative h-80 lg:h-96 rounded-3xl overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black'></div>

              <div className='absolute top-4 lg:top-8 left-4 lg:left-8 w-24 lg:w-32 h-24 lg: rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-purple/30 blur-2xl'></div>
              <div className='absolute bottom-8 lg:bottom-12 right-8 lg:right-12 w-16 lg:w-24 h-16 lg:h-24 rounded-full bg-gradient-to-tl from-brand-green/25 to-cyan-400/20 blur-xl'></div>
              <div className='absolute top-1/2 left-1/4 lg:left-1/3 w-12 lg:w-16 h-12 lg:h-16 rounded-full bg-gradient-to-r from-brand-purple/30 to-pink-400/25 blur-lg'></div>

              <div className='relative h-full p-4 lg:p-8 flex flex-col justify-between'>
                <div className='transform rotate-[-1deg] lg:rotate-[-2deg]'>
                  <div className='inline-block'>
                    <Typography
                      color='muted'
                      className='text-xs text-gray-300 uppercase tracking-[0.2em] lg:tracking-[0.4em] mb-2'
                    >
                      // PARADIGM SHIFT
                    </Typography>
                    <div>
                      <Typography
                        variant='h3'
                        className='text-2xl lg:text-4xl font-black leading-none tracking-tight text-white'
                      >
                        When Infrastructure
                        <br />
                        <Typography
                          variant='h3'
                          gradient='brand'
                          as='span'
                          className='inline-block'
                        >
                          Becomes Autonomous_
                        </Typography>
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 items-end mt-8 lg:mt-0'>
                  <div className='lg:col-span-5 space-y-3'>
                    <TransformCard
                      rotation='rotate-[0.5deg] lg:rotate-[1deg]'
                      background='bg-gray-800/80'
                      border='border-l-4 border-brand-blue'
                      shadow='lg'
                      className='backdrop-blur-sm p-4'
                    >
                      <Typography
                        color='muted'
                        className='text-xs text-white font-semibold mb-1'
                      >
                        // TODAY
                      </Typography>
                      <div className='space-y-1'>
                        <Typography className='text-sm text-white font-medium'>
                          Servers
                        </Typography>
                        <Typography className='text-sm text-white font-medium'>
                          Databases
                        </Typography>
                        <Typography className='text-sm text-white font-medium'>
                          APIs
                        </Typography>
                      </div>
                    </TransformCard>
                  </div>

                  <div className='hidden lg:block lg:col-span-2 flex justify-center'>
                    <div className='w-8 h-px bg-gradient-to-r from-brand-blue to-brand-green'></div>
                  </div>

                  <div className='lg:col-span-5 space-y-3'>
                    <TransformCard
                      rotation='rotate-[-0.5deg] lg:rotate-[-1deg]'
                      background='bg-gradient-to-br from-brand-blue/30 to-brand-green/30'
                      border='border-l-4 border-brand-green'
                      shadow='lg'
                      className='backdrop-blur-sm p-4'
                    >
                      <Typography
                        color='muted'
                        className='text-xs text-white font-semibold mb-1'
                      >
                        // TOMORROW
                      </Typography>
                      <div className='space-y-1'>
                        <Typography className='text-sm text-white font-bold'>
                          Consensus
                        </Typography>
                        <Typography className='text-sm text-white font-bold'>
                          Consensus
                        </Typography>
                        <Typography className='text-sm text-white font-bold'>
                          Consensus
                        </Typography>
                      </div>
                    </TransformCard>
                  </div>
                </div>

                <div className='lg:absolute lg:bottom-4 lg:right-4 mt-6 lg:mt-0 transform rotate-[1deg] lg:rotate-[2deg]'>
                  <TransformCard
                    background='bg-gradient-to-br from-gray-800/95 to-gray-900/95 dark:from-gray-700/95 dark:to-gray-800/95'
                    border='border border-gray-600/50 dark:border-gray-500/50'
                    shadow='xl'
                    rounded='2xl'
                    className='backdrop-blur-sm p-4'
                  >
                    <Typography
                      color='muted'
                      className='text-xs text-white font-semibold mb-1'
                    >
                      // BUILDING
                    </Typography>
                    <Typography className='text-sm text-white font-bold'>
                      Decentralized Internet Protocols.
                    </Typography>
                  </TransformCard>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
              <div className='lg:col-span-4'>
                <TransformCard
                  rotation='rotate-[-0.5deg] lg:rotate-[-1deg]'
                  background='bg-gradient-to-br from-brand-blue/90 to-brand-blue/70'
                  border='border border-brand-blue/50'
                  shadow='lg'
                  className='p-6  flex flex-col justify-start'
                >
                  <Typography
                    color='muted'
                    className='text-xs text-gray-400 dark:text-white font-bold uppercase tracking-wide mb-3'
                  >
                    // Websites exist
                  </Typography>
                  <Typography className='text-base lg:text-lg font-black text-white'>
                    without web servers
                  </Typography>
                </TransformCard>
              </div>

              <div className='lg:col-span-4 lg:mt-4'>
                <TransformCard
                  rotation='rotate-[0.5deg] lg:rotate-[1deg]'
                  background='bg-gradient-to-br from-brand-green/90 to-brand-green/70'
                  border='border border-brand-green/50'
                  shadow='lg'
                  className='p-6 flex flex-col justify-start'
                >
                  <Typography
                    color='muted'
                    className='text-xs text-gray-400 dark:text-white font-bold uppercase tracking-wide mb-3'
                  >
                    // AI agents discover
                  </Typography>
                  <Typography className='text-base lg:text-lg font-black text-white leading-tight'>
                    each other
                    <br />
                    autonomously_
                  </Typography>
                </TransformCard>
              </div>

              <div className='lg:col-span-4 lg:mt-2'>
                <TransformCard
                  rotation='rotate-[-0.25deg] lg:rotate-[-0.5deg]'
                  background='bg-gradient-to-br from-brand-purple/90 to-brand-purple/70'
                  border='border border-brand-purple/50'
                  shadow='lg'
                  className='p-6  flex flex-col justify-start'
                >
                  <Typography
                    color='muted'
                    className='text-xs text-gray-400 dark:text-white font-bold uppercase tracking-wide mb-3'
                  >
                    // Economic systems
                  </Typography>
                  <Typography className='text-base lg:text-lg font-black text-white'>
                    run themselves
                  </Typography>
                </TransformCard>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNewsletter && (
        <NewsletterOverlay onClose={() => setShowNewsletter(false)} />
      )}
    </section>
  );
};

const VisionSection: React.FC = () => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  return (
    <section
      ref={sectionRef}
      className='relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/30 overflow-hidden'
    >
      <AnimatedBackground
        variant='blobs'
        colors={['brand-blue', 'brand-purple', 'brand-green']}
        intensity='low'
        opacity={0.15}
      />

      <div className='absolute inset-0 opacity-5 dark:opacity-10'>
        <HashgraphConsensus animated={true} />
      </div>

      <AnimatedBackground
        variant='lines'
        colors={['brand-blue', 'brand-green', 'brand-purple']}
        opacity={0.3}
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          className='mb-20 lg:mb-32'
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          <div>
            <div className='text-xs font-mono text-gray-600 dark:text-gray-300 uppercase tracking-[0.3em] mb-4'>
              <span className='text-gray-800 dark:text-gray-400'>//</span> Our
              Vision
            </div>
            <Typography
              variant='h2'
              gradient='brand'
              as='span'
              className='inline-block'
            >
              Our Mandate_
            </Typography>
          </div>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
          <motion.div
            className='lg:col-span-8 space-y-8'
            initial={{ opacity: 0, x: -30 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, delay: 0.2 },
              },
            }}
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <TransformCard
                rotation='rotate-[1deg]'
                background='bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700'
                border='border border-gray-700/50'
                shadow='xl'
                rounded='3xl'
                className='p-8 h-64 flex flex-col justify-between'
              >
                <div className='text-xs font-mono text-gray-600 dark:text-gray-300 mb-2'>
                  <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
                  HCS_STANDARDS
                </div>
                <div>
                  <Typography
                    variant='h3'
                    className='text-xl font-mono font-black text-white mb-3 leading-tight'
                  >
                    Protocol
                    <br />
                    Development
                  </Typography>
                  <Typography
                    color='white'
                    className='text-sm text-gray-300 leading-relaxed'
                  >
                    Standards for fully on-chain internet utilizing Hedera
                    Consensus Service
                  </Typography>
                </div>
              </TransformCard>

              <TransformCard
                rotation='rotate-[-0.5deg]'
                background='bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700'
                border='border border-gray-700/50'
                shadow='xl'
                rounded='3xl'
                className='p-8 h-64 flex flex-col justify-between md:mt-12'
              >
                <div className='text-xs font-mono text-gray-600 dark:text-gray-300 mb-2'>
                  <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
                  ECOSYSTEM_SUPPORT
                </div>
                <div>
                  <Typography
                    variant='h3'
                    className='text-xl font-mono font-black text-white mb-3 leading-tight'
                  >
                    Developer
                    <br />
                    Enablement
                  </Typography>
                  <Typography
                    color='white'
                    className='text-sm text-gray-300 leading-relaxed'
                  >
                    Logistical support for companies implementing HCS standards
                  </Typography>
                </div>
              </TransformCard>
            </div>

            <TransformCard
              rotation='rotate-[0.5deg]'
              background='bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700'
              border='border border-gray-700/50'
              shadow='xl'
              rounded='3xl'
              className='p-8 h-64 flex flex-col justify-between max-w-lg mx-auto md:mx-0'
            >
              <div className='text-xs font-mono text-gray-600 dark:text-gray-300 mb-2'>
                <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
                OPEN_SOURCE
              </div>
              <div>
                <Typography
                  variant='h3'
                  className='text-xl font-mono font-black text-white mb-3 leading-tight'
                >
                  Accessible
                  <br />
                  Tools
                </Typography>
                <Typography
                  color='white'
                  className='text-sm text-gray-300 leading-relaxed'
                >
                  Open source applications enabling broader access to on-chain
                  capabilities
                </Typography>
              </div>
            </TransformCard>
          </motion.div>

          <motion.div
            className='lg:col-span-4'
            initial={{ opacity: 0, x: 30 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, delay: 0.4 },
              },
            }}
          >
            <div className='space-y-6'>
              <TransformCard
                rotation='rotate-[-1deg]'
                background='bg-white/90 dark:bg-gray-900/90'
                border='border border-gray-200/50 dark:border-gray-700/50'
                shadow='xl'
                rounded='3xl'
                className='p-8 backdrop-blur-sm'
              >
                <div className='text-xs font-mono text-gray-500 dark:text-gray-400 mb-4'>
                  <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
                  Vision Statement
                </div>
                <div className='text-lg font-mono font-bold text-gray-900 dark:text-white leading-tight mb-4'>
                  Creating new standards
                  <br />
                  <Typography
                    color='green'
                    as='span'
                    className='text-brand-green'
                  >
                    for digital interactions
                  </Typography>
                </div>
                <Typography
                  color='muted'
                  className='text-sm font-mono text-gray-700 dark:text-gray-300'
                >
                  <Typography
                    color='blue'
                    as='span'
                    className='text-brand-green'
                  >
                    enhancing
                  </Typography>
                  (
                  <Typography
                    color='green'
                    as='span'
                    className='text-brand-green'
                  >
                    "security"
                  </Typography>
                  ,{' '}
                  <Typography
                    color='green'
                    as='span'
                    className='text-brand-green'
                  >
                    "transparency"
                  </Typography>
                  ,{' '}
                  <Typography
                    color='green'
                    as='span'
                    className='text-brand-green'
                  >
                    "efficiency"
                  </Typography>
                  )
                </Typography>
              </TransformCard>

              <TransformCard
                rotation='rotate-[0.8deg]'
                background='bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 dark:from-brand-blue/20 dark:to-brand-purple/20'
                border='border border-brand-blue/20 dark:border-brand-blue/30'
                shadow='lg'
                rounded='2xl'
                className='p-6 backdrop-blur-sm'
              >
                <div className='text-xs font-mono text-brand-blue dark:text-brand-blue mb-2'>
                  <span className='text-gray-800 dark:text-gray-500'>//</span>{' '}
                  DEVELOPMENT_APPROACH
                </div>
                <div className='space-y-2'>
                  <div className='text-sm font-mono text-gray-900 dark:text-white'>
                    <Typography
                      color='purple'
                      as='span'
                      className='text-brand-purple'
                    >
                      import
                    </Typography>{' '}
                    <Typography
                      color='green'
                      as='span'
                      className='text-brand-green'
                    >
                      "collaborative"
                    </Typography>
                  </div>
                  <div className='text-sm font-mono text-gray-900 dark:text-white'>
                    <Typography
                      color='purple'
                      as='span'
                      className='text-brand-purple'
                    >
                      export
                    </Typography>{' '}
                    <Typography color='white' as='span' className='text-white'>
                      *
                    </Typography>{' '}
                    <Typography
                      color='gray'
                      as='span'
                      className='text-gray-600 dark:text-gray-400'
                    >
                      from
                    </Typography>{' '}
                    <Typography
                      color='green'
                      as='span'
                      className='text-brand-green'
                    >
                      "./standards"
                    </Typography>
                  </div>
                  <div className='text-sm font-mono text-gray-900 dark:text-white'>
                    <Typography
                      color='blue'
                      as='span'
                      className='text-brand-blue'
                    >
                      deploy
                    </Typography>
                    (
                    <Typography
                      color='green'
                      as='span'
                      className='text-brand-green'
                    >
                      "production"
                    </Typography>
                    )
                  </div>
                </div>
              </TransformCard>

              <TransformCard
                rotation='rotate-[-0.3deg]'
                background='bg-gradient-to-br from-brand-green/10 to-emerald-400/10 dark:from-brand-green/20 dark:to-emerald-400/20'
                border='border border-brand-green/20 dark:border-brand-green/30'
                shadow='lg'
                rounded='2xl'
                className='p-6 backdrop-blur-sm'
              >
                <div className='text-xs font-mono text-brand-green dark:text-brand-green mb-2'>
                  <span className='text-gray-800 dark:text-gray-500'>//</span>{' '}
                  CONSORTIUM_MODEL
                </div>
                <div className='text-sm font-mono text-gray-900 dark:text-white'>
                  <Typography
                    color='purple'
                    as='span'
                    className='text-brand-purple'
                  >
                    const
                  </Typography>{' '}
                  <Typography
                    color='gray'
                    as='span'
                    className='text-gray-900 dark:text-white'
                  >
                    organizations
                  </Typography>{' '}
                  ={' '}
                  <Typography
                    color='blue'
                    as='span'
                    className='text-brand-blue'
                  >
                    10
                  </Typography>
                  ;<br />
                  <Typography
                    color='purple'
                    as='span'
                    className='text-brand-purple'
                  >
                    const
                  </Typography>{' '}
                  <Typography
                    color='gray'
                    as='span'
                    className='text-gray-900 dark:text-white'
                  >
                    approach
                  </Typography>{' '}
                  ={' '}
                  <Typography
                    color='green'
                    as='span'
                    className='text-brand-green'
                  >
                    "collaborative"
                  </Typography>
                  ;
                </div>
              </TransformCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface StandardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  relatedTools: Tool[];
}

const StandardsSection: React.FC = () => {
  const [selectedStandard, setSelectedStandard] = useState<string | null>(null);

  const allStandards = [
    {
      id: 'HCS-1',
      name: 'File Storage & Retrieval',
      description:
        'On-chain file storage and content-addressed retrieval system',
      specification: '/docs/standards/hcs-1',
      status: 'PUBLISHED',
      adoptions: ['KiloScribe', 'TurtleMoon'],
      codeExample: 'inscribe(fileBuffer, metadata)',
    },
    {
      id: 'HCS-2',
      name: 'Discovery Registries',
      description: 'Topic registries for service and agent discovery',
      specification: '/docs/standards/hcs-2',
      status: 'PUBLISHED',
      adoptions: [],
      codeExample: 'registerService(topicId, metadata)',
    },
    {
      id: 'HCS-3',
      name: 'Resource Linking & Recursion',
      description:
        'Enables recursive referencing of inscriptions within Hedera',
      specification: '/docs/standards/hcs-3',
      status: 'PUBLISHED',
      adoptions: ['KiloScribe', 'HashPack'],
      codeExample: 'reference("hcs://0.0.123456/file.json")',
    },
    {
      id: 'HCS-5',
      name: 'Dynamic NFTs (Hashinals)',
      description: 'Tokenized HCS-1 files with evolving metadata',
      specification: '/docs/standards/hcs-5',
      status: 'PUBLISHED',
      adoptions: [
        'KiloScribe',
        'TurtleMoon',
        'SentX',
        'HashPack',
        'Hashinals.com',
      ],
      codeExample: 'createHashinal(fileId, tokenConfig)',
    },
    {
      id: 'HCS-6',
      name: 'Time-Based Evolution',
      description: 'NFTs that change over time based on predefined rules',
      specification: '/docs/standards/hcs-6',
      status: 'PUBLISHED',
      adoptions: ['KiloScribe'],
      codeExample: 'scheduleEvolution(tokenId, trigger)',
    },
    {
      id: 'HCS-7',
      name: 'Smart Hashinals',
      description: 'WASM-powered Hashinals with programmable behavior',
      specification: '/docs/standards/hcs-7',
      status: 'DRAFT',
      adoptions: ['KiloScribe'],
      codeExample: 'deployWasm(contractBytes, tokenId)',
    },
    {
      id: 'HCS-8',
      name: 'Governance & Voting',
      description: 'Transparent voting systems with tamper-proof results',
      specification: '/docs/standards/hcs-8',
      status: 'DRAFT',
      adoptions: ['HashPack'],
      codeExample: 'createPoll(question, options, duration)',
    },
    {
      id: 'HCS-9',
      name: 'Modular Governance Framework',
      description: 'Flexible governance system with pluggable voting modules',
      specification: '/docs/standards/hcs-9',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'createGovernance(modules, rules)',
    },
    {
      id: 'HCS-10',
      name: 'AI Agent Communication',
      description: 'Secure communication protocol for autonomous agents',
      specification: '/docs/standards/hcs-10',
      status: 'DRAFT',
      adoptions: ['Moonscape'],
      codeExample: 'sendMessage(agentId, payload)',
    },
    {
      id: 'HCS-11',
      name: 'Identity Profiles',
      description: 'Standardized profile management for humans and agents',
      specification: '/docs/standards/hcs-11',
      status: 'DRAFT',
      adoptions: ['OpenConvAI'],
      codeExample: 'createProfile(identity, metadata)',
    },
    {
      id: 'HCS-13',
      name: 'Schema Validation',
      description:
        'Data validation and schema enforcement for structured content',
      specification: '/docs/standards/hcs-13',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'validate(data, schema)',
    },
    {
      id: 'HCS-20',
      name: 'Auditable Points',
      description: 'Transparent point systems with full auditability',
      specification: '/docs/standards/hcs-20',
      status: 'PUBLISHED',
      adoptions: ['Bonzo Finance'],
      codeExample: 'mintPoints(account, amount, reason)',
    },
  ];

  return (
    <section className='relative py-20 lg:py-32 bg-white dark:bg-gray-900 overflow-hidden'>
      <AnimatedBackground
        variant='blobs'
        colors={['brand-blue', 'brand-purple', 'brand-green']}
        intensity='high'
        opacity={0.15}
      />

      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-purple/5 dark:from-brand-blue/10 dark:to-brand-purple/10'></div>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/5 dark:bg-brand-green/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/3 right-1/4 w-80 h-80 bg-brand-blue/10 dark:bg-brand-blue/15 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 right-1/3 w-72 h-72 bg-brand-purple/5 dark:bg-brand-purple/10 rounded-full blur-3xl'></div>
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-20 lg:mb-32'>
          <div className='mb-12'>
            <div className='text-xs font-mono text-gray-800 dark:text-gray-400 uppercase tracking-[0.4em] mb-6'>
              <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
              COMPLETE_STANDARDS_SUITE
            </div>
            <Typography
              variant='h2'
              className='text-5xl lg:text-7xl xl:text-8xl font-mono font-black text-gray-900 dark:text-white leading-tight tracking-tight'
            >
              <Typography
                variant='h2'
                gradient='brand'
                as='span'
                className='inline-block'
              >
                HCS Standards_
              </Typography>
            </Typography>
            <Typography
              color='muted'
              className='text-lg lg:text-xl text-gray-600 dark:text-gray-300 mt-12 max-w-4xl mx-auto'
            >
              <Typography color='blue' as='span' className='text-brand-blue'>
                Battle-tested standards
              </Typography>{' '}
              powering the autonomous internet.
              <br />
              <Typography color='green' as='span' className='text-brand-green'>
                Deployed. Proven. Ready to integrate.
              </Typography>
            </Typography>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12'>
          {allStandards.map((standard, index) => (
            <motion.div
              key={standard.id}
              initial={{ opacity: 0, y: 200, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 1.2,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 50,
              }}
            >
              <div className='relative group h-full'>
                <div className='absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green rounded-3xl blur-lg opacity-0 group-hover:opacity-40 dark:group-hover:opacity-75 transition duration-1000 animate-pulse'></div>

                <TransformCard
                  rotation={
                    index % 4 === 0
                      ? 'rotate-[2deg]'
                      : index % 4 === 1
                      ? 'rotate-[-1.5deg]'
                      : index % 4 === 2
                      ? 'rotate-[2.5deg]'
                      : 'rotate-[-1deg]'
                  }
                  background='bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl'
                  border='border border-gray-200/50 dark:border-gray-700/50'
                  shadow='xl'
                  rounded='3xl'
                  className='relative h-full group-hover:scale-105 group-hover:-rotate-1 transition-all duration-700'
                >
                  <div className='p-6 lg:p-8 h-full flex flex-col'>
                    <div className='space-y-4 flex-grow'>
                      <Typography
                        variant='h4'
                        className='!text-brand-blue group-hover:text-brand-green group-hover:scale-110 transition-all duration-500'
                      >
                        {standard.id}
                      </Typography>

                      <div className='space-y-3'>
                        <Typography
                          variant='h5'
                          className='text-gray-900 dark:text-white group-hover:text-brand-purple transition-colors duration-500'
                        >
                          {standard.name}
                        </Typography>

                        <StatusBadge
                          variant={
                            standard.status === 'PUBLISHED'
                              ? 'success'
                              : 'warning'
                          }
                          animated
                        >
                          {standard.status}
                        </StatusBadge>
                      </div>

                      <Typography
                        color='muted'
                        className='text-gray-600 dark:text-gray-300 leading-relaxed'
                      >
                        {standard.description}
                      </Typography>
                    </div>

                    <div className='mt-6 space-y-4'>
                      <div className='flex items-center gap-2'>
                        <PrimaryButton
                          href={standard.specification}
                          size='small'
                        >
                          Docs
                        </PrimaryButton>
                        {standard.adoptions.length > 0 && (
                          <SecondaryButton
                            size='small'
                            onClick={() =>
                              setSelectedStandard(
                                selectedStandard === standard.id
                                  ? null
                                  : standard.id
                              )
                            }
                          >
                            Uses ({standard.adoptions.length})
                          </SecondaryButton>
                        )}
                      </div>

                      {selectedStandard === standard.id &&
                        standard.adoptions.length > 0 && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className='border-t border-gray-200/50 dark:border-gray-600/30 pt-4'
                          >
                            <div className='flex flex-wrap gap-2'>
                              {standard.adoptions.map((adoption) => (
                                <span
                                  key={adoption}
                                  className='bg-brand-green/10 dark:bg-brand-green/20 text-brand-green text-xs font-mono px-2 py-1 rounded'
                                >
                                  {adoption}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                    </div>
                  </div>
                </TransformCard>
              </div>
            </motion.div>
          ))}
        </div>

        <div className='mt-32 lg:mt-48 text-center'>
          <div className='max-w-6xl mx-auto'>
            <div className='relative group'>
              <div className='absolute -inset-2 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green rounded-3xl blur-2xl opacity-30 dark:opacity-50 group-hover:opacity-60 dark:group-hover:opacity-100 transition duration-1000'></div>
              <TransformCard
                rotation='rotate-[1deg]'
                background='bg-white/95 dark:bg-gray-800/90 backdrop-blur-xl'
                border='border border-gray-200/50 dark:border-gray-600/50'
                shadow='xl'
                rounded='3xl'
                className='relative p-12 lg:p-20'
              >
                <div className='space-y-12'>
                  <div className='text-sm font-mono text-gray-800 dark:text-gray-400 uppercase tracking-[0.5em]'>
                    <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
                    DEVELOPER_GATEWAY
                  </div>

                  <Typography
                    variant='h3'
                    className='text-4xl lg:text-6xl xl:text-7xl font-mono font-black text-gray-900 dark:text-white leading-tight'
                  >
                    Start Building with
                    <br />
                    <Typography
                      variant='h3'
                      gradient='brand'
                      as='span'
                      className='inline-block'
                    >
                      HCS Standards_
                    </Typography>
                  </Typography>

                  <Terminal
                    title='standards-deployment.sh'
                    className='max-w-4xl mx-auto'
                  >
                    <Terminal.Line command='npm install @hashgraphonline/standards-sdk' />
                    <Terminal.Line
                      output='✓ Installing 12 published protocols...'
                      type='output'
                    />
                    <Terminal.Line
                      output='✓ Connecting to Hedera Consensus Service...'
                      type='output'
                    />
                    <Terminal.Line
                      output='✓ Autonomous systems ready for deployment'
                      type='output'
                    />
                    <Terminal.Line output='' type='output' />
                    <Terminal.Line
                      output='🚀 The on-chain internet is live'
                      type='output'
                    />
                  </Terminal>

                  <div className='flex flex-col sm:flex-row gap-8 justify-center'>
                    <PrimaryButton
                      href='/docs/libraries/standards-sdk'
                      size='large'
                    >
                      Standards SDK →
                    </PrimaryButton>
                    <SecondaryButton href='https://github.com/hashgraph-online/standards-sdk'>
                      GitHub Repository ↗
                    </SecondaryButton>
                  </div>
                </div>
              </TransformCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MetricsSection: React.FC = () => {
  return (
    <section className='relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-black dark:to-gray-900 overflow-hidden'>
      <AnimatedBackground
        variant='blobs'
        colors={['brand-blue', 'brand-purple', 'brand-green']}
        intensity='medium'
        opacity={0.15}
      />

      <div className='absolute inset-0 opacity-10 dark:opacity-5'>
        <HashgraphConsensus animated={true} />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-20 lg:mb-32'>
          <div className='mb-12'>
            <div className='text-xs font-mono text-gray-800 dark:text-gray-400 uppercase tracking-[0.4em] mb-6'>
              <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
              ECOSYSTEM_DOMINANCE
            </div>
            <Typography
              variant='h2'
              className='text-5xl lg:text-7xl xl:text-8xl font-mono font-black text-gray-900 dark:text-white leading-tight tracking-tight'
            >
              <span className='block'>Production</span>
              <Typography
                variant='h2'
                gradient='brand'
                as='span'
                className='inline-block'
              >
                Metrics_
              </Typography>
            </Typography>
            <Typography
              color='muted'
              className='text-lg lg:text-xl text-gray-600 dark:text-gray-300 mt-12 max-w-4xl mx-auto'
            >
              Real applications. Real users. Real value.{' '}
              <Typography color='blue' as='span' className='text-brand-blue'>
                Production-ready
              </Typography>{' '}
              infrastructure powering the autonomous internet.
            </Typography>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16'>
          <div className='relative group'>
            <div className='absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200'></div>
            <TransformCard
              rotation='rotate-[1.5deg]'
              background='bg-white/95 dark:bg-gray-800/95'
              border='border border-gray-200/50 dark:border-gray-700/50'
              shadow='xl'
              rounded='3xl'
              className='relative p-8 lg:p-12 backdrop-blur-sm hover:scale-105 transition-all duration-700 group-hover:-rotate-1'
            >
              <div className='space-y-8'>
                <div className='text-xs font-mono text-gray-800 dark:text-gray-400'>
                  <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
                  totalTransactions
                </div>

                <div className='space-y-6'>
                  <div className='relative'>
                    <div className='text-5xl lg:text-6xl font-mono font-black text-brand-blue leading-none'>
                      28M+
                    </div>
                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-brand-green rounded-full animate-pulse'></div>
                  </div>

                  <div className='space-y-3'>
                    <Typography
                      variant='h4'
                      className='text-lg lg:text-xl font-mono font-bold text-gray-900 dark:text-white'
                    >
                      Total Transactions
                    </Typography>
                    <Typography
                      color='muted'
                      className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'
                    >
                      <Typography
                        color='purple'
                        as='span'
                        className='text-brand-purple'
                      >
                        Processing
                      </Typography>{' '}
                      millions of on-chain operations across all HCS standards —
                      proving our infrastructure works at internet scale.
                    </Typography>
                  </div>
                </div>
              </div>
            </TransformCard>
          </div>

          <div className='relative group lg:mt-12'>
            <div className='absolute -inset-1 bg-gradient-to-r from-brand-green via-brand-blue to-brand-purple rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200'></div>
            <TransformCard
              rotation='rotate-[-1deg]'
              background='bg-white/95 dark:bg-gray-800/95'
              border='border border-gray-200/50 dark:border-gray-700/50'
              shadow='xl'
              rounded='3xl'
              className='relative p-8 lg:p-12 backdrop-blur-sm hover:scale-105 transition-all duration-700 group-hover:rotate-1'
            >
              <div className='space-y-8'>
                <div className='text-xs font-mono text-gray-800 dark:text-gray-400'>
                  <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
                  globalInfrastructure
                </div>

                <div className='space-y-6'>
                  <div className='relative'>
                    <div className='text-5xl lg:text-6xl font-mono font-black text-brand-green leading-none'>
                      300K+
                    </div>
                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-brand-blue rounded-full animate-pulse delay-300'></div>
                  </div>

                  <div className='space-y-3'>
                    <Typography
                      variant='h4'
                      className='text-lg lg:text-xl font-mono font-bold text-gray-900 dark:text-white'
                    >
                      CDN Requests Daily
                    </Typography>
                    <Typography
                      color='muted'
                      className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'
                    >
                      <Typography
                        color='blue'
                        as='span'
                        className='text-brand-blue'
                      >
                        Serving
                      </Typography>{' '}
                      on-chain data globally through our infrastructure,
                      enabling seamless access to decentralized content.
                    </Typography>
                  </div>
                </div>
              </div>
            </TransformCard>
          </div>

          <div className='relative group lg:mt-6'>
            <div className='absolute -inset-1 bg-gradient-to-r from-brand-purple via-brand-green to-brand-blue rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200'></div>
            <TransformCard
              rotation='rotate-[2deg]'
              background='bg-white/95 dark:bg-gray-800/95'
              border='border border-gray-200/50 dark:border-gray-700/50'
              shadow='xl'
              rounded='3xl'
              className='relative p-8 lg:p-12 backdrop-blur-sm hover:scale-105 transition-all duration-700 group-hover:-rotate-2'
            >
              <div className='space-y-8'>
                <div className='text-xs font-mono text-gray-800 dark:text-gray-400'>
                  <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
                  onGraphStorage
                </div>

                <div className='space-y-6'>
                  <div className='relative'>
                    <div className='text-5xl lg:text-6xl font-mono font-black text-brand-purple leading-none'>
                      120K+
                    </div>
                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-brand-green rounded-full animate-pulse delay-700'></div>
                  </div>

                  <div className='space-y-3'>
                    <Typography
                      variant='h4'
                      className='text-lg lg:text-xl font-mono font-bold text-gray-900 dark:text-white'
                    >
                      Files Stored
                    </Typography>
                    <Typography
                      color='muted'
                      className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'
                    >
                      <Typography
                        color='green'
                        as='span'
                        className='text-brand-green'
                      >
                        On-graph
                      </Typography>{' '}
                      storage via HCS-1, proving our standards work for real
                      applications and creators.
                    </Typography>
                  </div>
                </div>
              </div>
            </TransformCard>
          </div>
        </div>

        <div className='mt-20 lg:mt-32 text-center'>
          <div className='max-w-4xl mx-auto'>
            <div className='relative group'>
              <div className='absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000'></div>
              <div className='relative bg-white/95 dark:bg-gray-800/95 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm'>
                <Terminal title='ecosystem-impact.sh' className='text-left'>
                  <Terminal.Line output='#!/bin/bash' type='comment' />
                  <Terminal.Line
                    output='# Battle-tested infrastructure powering real applications'
                    type='comment'
                  />
                  <Terminal.Line output='' type='output' />
                  <Terminal.Line command='./deploy-standards --scale=production --users=millions' />
                  <Terminal.Line
                    output='🚀 Processing 28M+ transactions across HCS standards...'
                    type='output'
                  />
                  <Terminal.Line
                    output='🌍 Serving 300K+ daily requests through global CDN...'
                    type='output'
                  />
                  <Terminal.Line
                    output='💾 Storing 120K+ files on-graph via HCS-1...'
                    type='output'
                  />
                  <Terminal.Line output='' type='output' />
                  <Terminal.Line
                    output='✅ STATUS: Internet-scale adoption achieved'
                    type='output'
                  />
                  <Terminal.Line
                    output='✅ RESULT: The autonomous internet is live'
                    type='output'
                  />
                </Terminal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <Layout
      title={`Welcome to Hashgraph Online`}
      description='Hashgraph Online DAO is a consortium of companies and organizations building the future of the internet, on-chain, utilizing the Hedera Hashgraph and Consensus Service.'
    >
      <main>
        <HeroSection />
        <VisionSection />
        <MemberSection />
        <MetricsSection />
        <UseCaseSection />
        <StandardsSection />
      </main>
    </Layout>
  );
};

export default Home;
