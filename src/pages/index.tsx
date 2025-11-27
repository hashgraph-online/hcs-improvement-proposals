import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence, useInView } from 'framer-motion';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Modal from '../components/Modal';
import UseCaseSection from '../components/UseCaseSection';
import InteractiveShowcase, {
  ShowcaseItem,
} from '../components/InteractiveShowcase';
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
import { FaNetworkWired, FaFingerprint, FaCoins, FaSearch, FaRocket, FaServer, FaCube, FaProjectDiagram, FaCode, FaLayerGroup } from 'react-icons/fa';

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

/**
 * Individual slide configuration for the hero carousel
 */
interface HeroSlide {
  id: string;
  title: string;
  titleGradient?: string;
  subtitle: string;
  stats?: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
  terminalCommand?: string;
  terminalLines?: string[];
  rightContent?: React.ReactNode;
  forceSingleLine?: boolean;
  titleSizeClass?: string;
  backgroundLayer?: React.ReactNode;
  sectionBackgroundClass?: string;
  disableHashgraphPattern?: boolean;
  statsBelowTitle?: boolean;
}

const HeroSection: React.FC = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleCopy = (command: string) => {
    if (!command) return;
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const standardsTerminalCommand = 'npm install @hashgraphonline/standards-sdk';
  const standardsTerminalLines = [
    '✓ Installing autonomous agent infrastructure...',
    '// Ready to build the agentic internet',
  ];

  /**
   * Configuration for all hero carousel slides
   */
  const slides: HeroSlide[] = [
    {
      id: 'mcp',
      title: 'Hashnet MCP Server',
      titleGradient: 'linear-gradient(90deg, #b56cff, #5599fe, #48df7b)',
      subtitle:
        'The backbone for agentic search. Interconnecting agents, services, and data across Web2 and Web3.',
      primaryButton: {
        text: 'Explore MCP →',
        href: '/mcp',
      },
      secondaryButton: {
        text: 'Documentation →',
        href: '/docs/registry-broker/mcp-server',
      },
      terminalCommand: 'npx @hol-org/hashnet-mcp@latest up',
      terminalLines: [
        '✓ Hashnet MCP Server starting...',
        '✓ ERC-8004 Identity: CONNECTED',
        '✓ x402 Payments: ENABLED',
        '✓ Agent Discovery: ONLINE',
      ],
      rightContent: (
        <div className='relative w-full h-full flex flex-col items-center justify-center p-4'>
          {/* Decorative Background Elements */}
          <div className='absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-brand-purple/5 to-brand-green/5 rounded-3xl blur-2xl' />
          
          {/* Main System Status Card - Compact */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='relative z-10 w-full max-w-[400px] mb-4'
          >
             <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/50 dark:border-gray-700 rounded-xl p-3 shadow-xl shadow-brand-blue/5 flex items-center justify-between ring-1 ring-black/5">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center text-white shadow-lg shadow-brand-purple/20">
                      <FaNetworkWired className="text-lg" />
                   </div>
                   <div>
                      <div className="font-bold text-gray-900 dark:text-white text-sm">HOL Registry Broker</div>
                      <div className="text-[10px] text-brand-blue font-mono font-medium uppercase tracking-wider">Hashnet MCP Server</div>
                   </div>
                </div>
                <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full border border-green-100 dark:border-green-900/30">
                   <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                   <span className="text-[9px] font-bold text-green-700 dark:text-green-400 tracking-wide">ONLINE</span>
                </div>
             </div>
          </motion.div>

          {/* Module Grid - Compact & Icon-First */}
          <div className='grid grid-cols-3 gap-3 w-full max-w-[400px] relative z-10'>
            {[
                { icon: <FaRocket />, label: 'Agents', status: 'On', color: 'purple' },
                { icon: <FaServer />, label: 'Servers', status: 'On', color: 'blue' },
                { icon: <FaCoins />, label: 'Payments', status: 'On', color: 'green' },
                { icon: <FaFingerprint />, label: 'Identity', status: 'On', color: 'purple' },
                { icon: <FaNetworkWired />, label: 'Infra', status: 'On', color: 'blue' },
                { icon: <FaLayerGroup />, label: 'Data', status: 'On', color: 'green' },
            ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className='bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 border border-white/40 dark:border-gray-700 shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-gray-800 hover:border-brand-blue/20 transition-all duration-300 flex flex-col items-center gap-2 group cursor-default h-full'>
                     <div className={`text-brand-${item.color} bg-brand-${item.color}/10 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                     </div>
                     <div className='text-xs font-bold text-gray-700 dark:text-gray-200 font-mono text-center leading-none'>
                        {item.label}
                     </div>
                  </div>
                </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'registry',
      title: 'Universal Agentic Registry',
      titleGradient: 'linear-gradient(45deg, #8b5cf6, #3b82f6)',
      subtitle:
        'Discover, integrate, and trust AI agents and MCP servers from leading networks. One API for agents and servers across Virtuals, A2A, ERC-8004, x402 Baazar, OpenConvAI, and more.',
      primaryButton: {
        text: 'Browse All →',
        href: 'https://hol.org/registry',
      },
      secondaryButton: {
        text: 'Register Your Agent →',
        href: 'https://hol.org/registry/register',
      },
      sectionBackgroundClass:
        'bg-gradient-to-br from-brand-blue/20 via-brand-purple/20 to-brand-green/20 dark:from-gray-900 dark:via-gray-950 dark:to-black',
      disableHashgraphPattern: true,
      backgroundLayer: (
        <>
          <div className='absolute -top-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-brand-blue/40 to-brand-purple/30 blur-[140px] opacity-70'></div>
          <div className='absolute top-1/4 right-0 w-80 h-80 rounded-full bg-gradient-to-tl from-brand-green/30 via-cyan-400/20 to-transparent blur-[160px] opacity-70'></div>
          <div className='absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-brand-purple/25 via-brand-blue/20 to-brand-green/20 blur-[130px] opacity-60'></div>
        </>
      ),
      rightContent: (
        <div className='relative h-full rounded-3xl overflow-hidden bg-white dark:bg-[#1f1f33] p-5 lg:p-6 flex items-center shadow-2xl'>
          <div className='absolute inset-0 bg-white/40 dark:bg-white/5'></div>
          <div className='absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/15 blur-3xl'></div>
          <div className='absolute bottom-1/4 right-1/4 w-36 h-36 rounded-full bg-gradient-to-tl from-purple-500/15 to-green-400/10 blur-3xl'></div>
          <div className='absolute top-1/2 right-1/3 w-28 h-28 rounded-full bg-gradient-to-r from-green-400/15 to-blue-400/10 blur-2xl'></div>
          <div className='absolute top-0 left-0 right-0 px-4 py-3 flex items-center gap-2 bg-gray-200/90 dark:bg-white/10 backdrop-blur border-b border-black/5 dark:border-white/10'>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 rounded-full bg-brand-purple'></span>
              <span className='w-3 h-3 rounded-full bg-brand-blue'></span>
              <span className='w-3 h-3 rounded-full bg-brand-green'></span>
            </div>
            <span className='text-xs font-mono uppercase tracking-wide text-gray-600 dark:text-gray-300'>
              Agent Registry Console
            </span>
          </div>

          <div className='relative w-full flex flex-col space-y-4 pt-12'>
              <div className='space-y-2'>
                <div className='flex items-center gap-2' style={{ alignItems: 'center' }}>
                  <svg
                    className='w-6 h-6 text-blue-400 flex-shrink-0'
                    fill='none'
                    stroke='currentColor'
                  viewBox='0 0 24 24'
                  style={{ marginTop: '0', marginBottom: '0' }}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
                <Typography variant='h3' className='!text-gray-900 dark:!text-white font-bold !text-2xl !md:text-2xl !leading-none !mb-0'>
                  AI Agent Discovery
                </Typography>
              </div>
              <Typography variant='body1' className='!text-gray-700 dark:!text-blue-100 text-sm leading-relaxed mb-0'>
                Cross-network agent registry with trust scores, capabilities, and verified integrations.
              </Typography>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center gap-2' style={{ alignItems: 'center' }}>
                <svg
                  className='w-6 h-6 text-purple-400 flex-shrink-0'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  style={{ marginTop: '0', marginBottom: '0' }}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
                <Typography variant='h3' className='!text-gray-900 dark:!text-white font-bold !text-2xl !md:text-2xl !leading-none !mb-0'>
                  MCP Server Hub
                </Typography>
              </div>
              <Typography variant='body1' className='!text-gray-700 dark:!text-purple-100 text-sm leading-relaxed mb-0'>
                Standardized protocols for agent communication and tool integration.
              </Typography>
            </div>

            <div className='p-3 bg-black/5 dark:bg-black/30 rounded-lg border border-black/10 dark:border-white/10'>
              <Typography className='text-gray-700 dark:text-white/60 text-sm font-mono mb-1'>
                // Example Query
              </Typography>
              <Typography className='text-gray-900 dark:text-white font-mono text-sm'>
                search("chat agents")
              </Typography>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'standards',
      title: 'On-Chain Internet',
      titleGradient: 'linear-gradient(90deg, #0ea5e9, #8b5cf6, #22c55e)',
      subtitle: 'Complete internet infrastructure living entirely on-chain through Hedera Consensus Service.',
      stats: '28M+ transactions • 15+ standards • 10 consortium members',
      statsBelowTitle: true,
      primaryButton: {
        text: 'Standards SDK Docs →',
        href: '/docs/libraries/standards-sdk',
      },
      secondaryButton: {
        text: 'Get Started →',
        href: '/start',
      },
      terminalCommand: standardsTerminalCommand,
      terminalLines: standardsTerminalLines,
      rightContent: (
        <div className='relative rounded-3xl overflow-hidden bg-white dark:bg-[#1f1f33] shadow-2xl' style={{ height: 'auto', maxHeight: '350px' }}>
          <div className='absolute inset-0 bg-white/40 dark:bg-white/5'></div>
          <div className='absolute top-4 left-6 w-28 h-28 rounded-full bg-gradient-to-br from-brand-blue/25 to-brand-purple/20 blur-2xl'></div>
          <div className='absolute bottom-6 right-8 w-20 h-20 rounded-full bg-gradient-to-tl from-brand-green/20 to-cyan-400/15 blur-xl'></div>
          <div className='absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-brand-purple/20 to-pink-400/15 blur-lg'></div>
          <div className='absolute top-0 left-0 right-0 px-4 py-3 flex items-center gap-2 bg-gray-200/90 dark:bg-white/10 backdrop-blur border-b border-black/5 dark:border-white/10'>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 rounded-full bg-brand-blue'></span>
              <span className='w-3 h-3 rounded-full bg-brand-purple'></span>
              <span className='w-3 h-3 rounded-full bg-brand-green'></span>
            </div>
            <span className='text-xs font-mono uppercase tracking-wide text-gray-600 dark:text-gray-200'>
              install.sh
            </span>
          </div>

          <div className='relative w-full px-6 py-6 pt-14'>
            <Terminal
              title=''
              showControls={false}
              className='w-full bg-transparent border-0 shadow-none'
            >
              <Terminal.Line
                command={standardsTerminalCommand}
                clickable
                onClick={() => handleCopy(standardsTerminalCommand)}
              />
              {standardsTerminalLines.map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.4, duration: 0.3 }}
                >
                  <div
                    className={`font-mono text-sm pl-4 ${
                      i === 0
                        ? 'text-green-500 dark:text-green-400'
                        : 'text-blue-500 dark:text-blue-400'
                    }`}
                  >
                    {line}
                  </div>
                </motion.div>
              ))}
            </Terminal>
          </div>
        </div>
      ),
    },
  ];

  /**
   * Auto-advance carousel every 8 seconds unless paused
   */
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const currentSlideData = slides[currentSlide];
  const hasRightContent = Boolean(currentSlideData.rightContent);

  /**
   * Navigate to previous slide
   */
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  /**
   * Navigate to next slide
   */
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      className='relative overflow-hidden'
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ minHeight: '650px', maxHeight: '650px' }}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={`${currentSlideData.id}-background`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className={`absolute inset-0 pointer-events-none ${
            currentSlideData.sectionBackgroundClass ?? 'bg-white dark:bg-gray-900'
          }`}
        />
      </AnimatePresence>

      <AnimatedBackground
        variant='blobs'
        colors={['brand-blue', 'brand-purple', 'brand-green']}
        intensity='medium'
        opacity={0.1}
      />

      {!currentSlideData.disableHashgraphPattern && (
        <div className='absolute inset-0 opacity-15 dark:opacity-10'>
          <HashgraphConsensus animated={true} />
        </div>
      )}
      <AnimatePresence mode='wait'>
        {currentSlideData.backgroundLayer && (
          <motion.div
            key={`${currentSlideData.id}-layer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className='absolute inset-0 pointer-events-none overflow-hidden'
          >
            {currentSlideData.backgroundLayer}
          </motion.div>
        )}
      </AnimatePresence>

      <div className='relative z-10 h-full'>
        <div className='container mx-auto px-6 lg:px-16 xl:px-24 h-full'>
          <div
            className={`grid ${hasRightContent ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-12 lg:gap-16 items-center h-full py-12 lg:py-16`}
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className='space-y-8'
              >
              <div className='space-y-6'>
                <h1
                  className={`${
                    currentSlideData.titleSizeClass ||
                    'text-4xl lg:text-5xl xl:text-6xl'
                  } font-mono font-black leading-tight tracking-tight ${
                    currentSlideData.forceSingleLine ? 'whitespace-nowrap' : ''
                  }`}
                >
                  {currentSlideData.titleGradient &&
                  !currentSlideData.titleGradient.startsWith('linear') ? (
                    <>
                      <span className='text-gray-900 dark:text-white'>
                        {currentSlideData.title}
                      </span>
                      <span className='bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text text-transparent inline'>
                        {currentSlideData.titleGradient}
                      </span>
                    </>
                  ) : currentSlideData.titleGradient ? (
                    <span
                      style={{
                        background: currentSlideData.titleGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {currentSlideData.title}
                    </span>
                  ) : (
                    <span className='text-gray-900 dark:text-white'>
                      {currentSlideData.title}
                    </span>
                  )}
                </h1>
                {currentSlideData.stats &&
                  currentSlideData.statsBelowTitle && (
                    <Typography
                      color='gray'
                      className='text-base mt-2 text-gray-600 dark:text-gray-300'
                    >
                      {currentSlideData.stats}
                    </Typography>
                  )}

                {(currentSlideData.subtitle ||
                  (currentSlideData.stats && !currentSlideData.statsBelowTitle)) && (
                  <Typography
                    color='muted'
                    className='text-lg lg:text-xl leading-relaxed max-w-2xl'
                  >
                    {currentSlideData.subtitle}
                    {currentSlideData.stats && !currentSlideData.statsBelowTitle && (
                      <>
                        <br />
                        <Typography color='gray' className='text-sm'>
                          {currentSlideData.stats}
                        </Typography>
                      </>
                    )}
                  </Typography>
                )}

                {currentSlideData.terminalCommand && !currentSlideData.rightContent && (
                  <div className='relative'>
                    <Terminal title='terminal'>
                      <Terminal.Line
                        command={currentSlideData.terminalCommand}
                        clickable
                        onClick={() => handleCopy(currentSlideData.terminalCommand!)}
                      />
                      {currentSlideData.terminalLines &&
                        currentSlideData.terminalLines.map((line, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + i * 0.4, duration: 0.3 }}
                          >
                            <div
                              className={`font-mono text-sm pl-4 flex items-center ${
                                i === 0
                                  ? 'text-green-500 dark:text-green-400'
                                  : 'text-blue-500 dark:text-blue-400'
                              }`}
                            >
                              {line}
                            </div>
                          </motion.div>
                        ))}
                    </Terminal>
                    <AnimatePresence>
                      {copied && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className='absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium shadow-lg'
                        >
                          Copied!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <div className='flex flex-col sm:flex-row gap-4'>
                  <PrimaryButton href={currentSlideData.primaryButton.href}>
                    {currentSlideData.primaryButton.text}
                  </PrimaryButton>

                  <SecondaryButton href={currentSlideData.secondaryButton.href}>
                    {currentSlideData.secondaryButton.text}
                  </SecondaryButton>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {hasRightContent && (
            <div className='hidden lg:block'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={`right-${currentSlide}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className='relative flex items-center justify-center'
                  style={{ height: '450px' }}
                >
                  {currentSlideData.rightContent}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      </div>

      <button
        onClick={goToPrevSlide}
        className='absolute left-4 lg:left-8 group transition-all duration-300'
        aria-label='Previous slide'
        style={{ background: 'none', border: 'none', padding: 0, top: '325px', zIndex: 30 }}
      >
        <svg
          className='w-8 h-8 lg:w-10 lg:h-10 text-gray-400 dark:text-gray-600 group-hover:text-brand-blue dark:group-hover:text-brand-blue transition-colors duration-300'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          style={{ filter: 'none' }}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </button>

      <button
        onClick={goToNextSlide}
        className='absolute right-4 lg:right-8 group transition-all duration-300'
        aria-label='Next slide'
        style={{ background: 'none', border: 'none', padding: 0, top: '325px', zIndex: 30 }}
      >
        <svg
          className='w-8 h-8 lg:w-10 lg:h-10 text-gray-400 dark:text-gray-600 group-hover:text-brand-blue dark:group-hover:text-brand-blue transition-colors duration-300'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          style={{ filter: 'none' }}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
      </button>

      <div className='absolute left-1/2 flex items-center gap-2' style={{ bottom: '32px', transform: 'translateX(-50%)', zIndex: 20 }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-brand-blue scale-125'
                : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-400'
            }`}
            style={{ border: 'none', outline: 'none' }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {showNewsletter && (
        <NewsletterOverlay onClose={() => setShowNewsletter(false)} />
      )}
    </section>
  );
};

const AutonomousInfrastructureSection: React.FC = () => {
  return (
    <section className='relative py-24 lg:py-32 text-white overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-950 dark:to-black'>
      <div className='absolute inset-0 opacity-10'>
        <HashgraphConsensus animated={true} />
      </div>
      <div className='absolute inset-0 opacity-30 blur-3xl bg-gradient-to-br from-brand-blue/20 via-brand-purple/15 to-brand-green/20'></div>

      <div className='container mx-auto px-6 lg:px-12 relative z-10'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <Typography
              color='muted'
              className='text-xs text-gray-400 uppercase tracking-[0.3em] mb-4'
            >
              // PARADIGM SHIFT
            </Typography>
            <Typography
              variant='h2'
              className='text-3xl lg:text-5xl font-black leading-tight tracking-tight text-white mb-4'
            >
              When Infrastructure{' '}
              <Typography
                variant='h2'
                gradient='brand'
                as='span'
                className='text-3xl lg:text-5xl font-black inline-block'
              >
                Becomes Autonomous_
              </Typography>
            </Typography>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className='flex flex-col items-center text-center space-y-3'
                >
                  <motion.div
                    animate={{
                      rotateY: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className='text-brand-blue/70'
                    style={{
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      width='40'
                      height='40'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1'
                    >
                      <circle cx='12' cy='12' r='10' />
                      <ellipse cx='12' cy='12' rx='10' ry='5' />
                      <path d='M2 12 Q12 8 22 12' />
                      <path d='M2 12 Q12 16 22 12' />
                      <line x1='12' y1='2' x2='12' y2='22' />
                    </svg>
                  </motion.div>
                  <TransformCard
                    rotation='rotate-[-1deg]'
                    background='bg-gradient-to-br from-brand-blue/30 to-brand-blue/20'
                    border='border border-brand-blue/50'
                    shadow='lg'
                    className='p-4 backdrop-blur-sm w-full min-h-[120px]'
                  >
                    <motion.div
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Typography
                        color='muted'
                        className='text-lg text-white/90 font-bold uppercase tracking-wide mb-2'
                      >
                        // Websites exist
                      </Typography>
                    </motion.div>
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [0.95, 1.05, 0.95],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Typography className='text-xl font-black text-white leading-tight'>
                        without web servers
                      </Typography>
                    </motion.div>
                  </TransformCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  viewport={{ once: true }}
                  className='flex flex-col items-center text-center space-y-3'
                >
                  <div
                    className='text-brand-green/70'
                    style={{
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      width='108'
                      height='40'
                      viewBox='0 0 60 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1'
                    >
                      <rect x='4' y='6' width='12' height='14' rx='2' />
                      <circle cx='7' cy='11' r='1.5' fill='currentColor'>
                        <animate
                          attributeName='opacity'
                          values='1;0.1;1'
                          dur='2s'
                          repeatCount='indefinite'
                        />
                      </circle>
                      <circle cx='13' cy='11' r='1.5' fill='currentColor'>
                        <animate
                          attributeName='opacity'
                          values='1;0.3;1'
                          dur='3s'
                          repeatCount='indefinite'
                          begin='0.5s'
                        />
                      </circle>
                      <path d='M7 15 Q10 17 13 15' strokeLinecap='round' />
                      <line x1='8' y1='2' x2='8' y2='6' strokeLinecap='round'>
                        <animate
                          attributeName='opacity'
                          values='0;1;0'
                          dur='1.5s'
                          repeatCount='indefinite'
                        />
                      </line>
                      <line x1='12' y1='2' x2='12' y2='6' strokeLinecap='round'>
                        <animate
                          attributeName='opacity'
                          values='0;1;0'
                          dur='1.5s'
                          repeatCount='indefinite'
                          begin='0.5s'
                        />
                      </line>
                      <rect x='44' y='6' width='12' height='14' rx='2' />
                      <circle cx='47' cy='11' r='1.5' fill='currentColor'>
                        <animate
                          attributeName='opacity'
                          values='1;0.3;1'
                          dur='3s'
                          repeatCount='indefinite'
                          begin='1s'
                        />
                      </circle>
                      <circle cx='53' cy='11' r='1.5' fill='currentColor'>
                        <animate
                          attributeName='opacity'
                          values='1;0.3;1'
                          dur='3s'
                          repeatCount='indefinite'
                          begin='1.5s'
                        />
                      </circle>
                      <path d='M47 15 Q50 17 53 15' strokeLinecap='round' />
                      <line x1='48' y1='2' x2='48' y2='6' strokeLinecap='round'>
                        <animate
                          attributeName='opacity'
                          values='0;1;0'
                          dur='1.5s'
                          repeatCount='indefinite'
                          begin='1s'
                        />
                      </line>
                      <line x1='52' y1='2' x2='52' y2='6' strokeLinecap='round'>
                        <animate
                          attributeName='opacity'
                          values='0;1;0'
                          dur='1.5s'
                          repeatCount='indefinite'
                          begin='1.5s'
                        />
                      </line>
                      <path
                        d='M16 12 C20 10, 25 10, 30 12 C35 14, 40 14, 44 12'
                        strokeDasharray='2 1'
                        opacity='0.5'
                      >
                        <animate
                          attributeName='opacity'
                          values='0;1;0'
                          dur='1.5s'
                          repeatCount='indefinite'
                        />
                      </path>
                      <path
                        d='M16 12 C20 14, 25 14, 30 12 C35 10, 40 10, 44 12'
                        strokeDasharray='2 1'
                        opacity='0.5'
                      >
                        <animate
                          attributeName='opacity'
                          values='0;1;0'
                          dur='1.5s'
                          repeatCount='indefinite'
                          begin='0.75s'
                        />
                      </path>
                    </svg>
                  </div>
                  <TransformCard
                    rotation='rotate-[1deg]'
                    background='bg-gradient-to-br from-brand-green/30 to-brand-green/20'
                    border='border border-brand-green/50'
                    shadow='lg'
                    className='p-4 backdrop-blur-sm w-full min-h-[120px]'
                  >
                    <motion.div
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Typography
                        color='muted'
                        className='text-lg text-white/90 font-bold uppercase tracking-wide mb-2'
                      >
                        // AI agents discover
                      </Typography>
                    </motion.div>
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [0.95, 1.05, 0.95],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.6,
                      }}
                    >
                      <Typography className='text-xl font-black text-white leading-tight'>
                        each other autonomously
                      </Typography>
                    </motion.div>
                  </TransformCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className='flex flex-col items-center text-center space-y-3'
                >
                  <motion.div
                    animate={{
                      rotateY: [0, 180, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className='text-brand-purple/70'
                    style={{
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      width='40'
                      height='40'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1'
                    >
                      <circle cx='12' cy='12' r='10' />
                      <circle cx='12' cy='12' r='6' strokeDasharray='2 1' />
                      <path d='M12 8 L12 16 M9 10 L15 10 M9 14 L15 14' strokeLinecap='round' />
                      <circle cx='12' cy='12' r='2' fill='currentColor' />
                    </svg>
                  </motion.div>
                  <TransformCard
                    rotation='rotate-[-0.5deg]'
                    background='bg-gradient-to-br from-brand-purple/30 to-brand-purple/20'
                    border='border border-brand-purple/50'
                    shadow='lg'
                    className='p-4 backdrop-blur-sm w-full min-h-[120px]'
                  >
                    <motion.div
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Typography
                        color='muted'
                        className='text-lg text-white/90 font-bold uppercase tracking-wide mb-2'
                      >
                        // Economic systems
                      </Typography>
                    </motion.div>
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [0.95, 1.05, 0.95],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1.2,
                      }}
                    >
                      <Typography className='text-xl font-black text-white leading-tight'>
                        run themselves
                      </Typography>
                    </motion.div>
                  </TransformCard>
                </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhatWeDoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className='relative py-24 lg:py-32 bg-white dark:bg-gray-900 overflow-hidden'
    >
      <div className='absolute inset-0 opacity-5 dark:opacity-10'>
        <HashgraphConsensus animated={true} />
      </div>

      <div className='container mx-auto px-6 lg:px-12 relative z-10'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Typography
            variant='h2'
            className='text-4xl lg:text-5xl font-mono font-black text-gray-900 dark:text-white mb-4'
          >
            What We{' '}
            <Typography
              variant='h2'
              gradient='brand'
              as='span'
              className='text-4xl lg:text-5xl font-mono font-black inline-block'
            >
              Build_
            </Typography>
          </Typography>
          <Typography
            color='muted'
            className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'
          >
            A consortium of 10 organizations creating standards for the autonomous internet
          </Typography>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className='group'
          >
            <div className='h-full bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300'>
              <div className='w-14 h-14 rounded-xl bg-brand-blue/10 dark:bg-brand-blue/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-7 h-7 text-brand-blue' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' />
                </svg>
              </div>
              <Typography variant='h3' className='text-xl font-mono font-bold text-gray-900 dark:text-white mb-3'>
                Open Standards
              </Typography>
              <Typography color='muted' className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
                15+ production-ready protocols for on-chain infrastructure, file storage, and agent communication
              </Typography>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className='group'
          >
            <div className='h-full bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 rounded-2xl p-8 border border-purple-200/50 dark:border-purple-800/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300'>
              <div className='w-14 h-14 rounded-xl bg-brand-purple/10 dark:bg-brand-purple/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-7 h-7 text-brand-purple' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4' />
                </svg>
              </div>
              <Typography variant='h3' className='text-xl font-mono font-bold text-gray-900 dark:text-white mb-3'>
                Developer Tools
              </Typography>
              <Typography color='muted' className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
                SDKs, libraries, and infrastructure enabling developers to build on-chain applications
              </Typography>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className='group'
          >
            <div className='h-full bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 rounded-2xl p-8 border border-green-200/50 dark:border-green-800/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300'>
              <div className='w-14 h-14 rounded-xl bg-brand-green/10 dark:bg-brand-green/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-7 h-7 text-brand-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
              </div>
              <Typography variant='h3' className='text-xl font-mono font-bold text-gray-900 dark:text-white mb-3'>
                Ecosystem Support
              </Typography>
              <Typography color='muted' className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
                Collaborative consortium providing resources and guidance for standard adoption
              </Typography>
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

interface StandardItem extends ShowcaseItem {
  id: string;
  name: string;
  description: string;
  specification: string;
  status: string;
  adoptions: string[];
  codeExample: string;
}

interface StandardMainContentProps {
  item: StandardItem;
  index: number;
}

interface StandardSidebarItemProps {
  item: StandardItem;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const StandardMainContent: React.FC<StandardMainContentProps> = ({
  item: standard,
}) => (
  <div className='relative'>
    <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden'>
      <div className='p-4 space-y-3'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-mono text-brand-blue'>
            {standard.id}
          </span>
          <StatusBadge
            variant={standard.status === 'PUBLISHED' ? 'success' : 'warning'}
            className='font-bold'
          >
            {standard.status}
          </StatusBadge>
        </div>

        <div className='space-y-2'>
          <h3 className='text-2xl font-semibold text-gray-900 dark:text-white'>
            {standard.name}
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'>
            {standard.description}
          </p>
        </div>

        <div className='bg-gray-50 dark:bg-gray-900 rounded p-2'>
          <div className='text-xs text-gray-500 mb-1'>Example:</div>
          <code className='text-xs font-mono text-gray-700 dark:text-gray-300'>
            {standard.codeExample}
          </code>
        </div>

        {standard.adoptions.length > 0 && (
          <div>
            <div className='text-xs text-gray-500 mb-1'>Implementations:</div>
            <div className='flex flex-wrap gap-1'>
              {standard.adoptions.map((adoption) => {
                const getOrgColor = (orgName: string) => {
                  const orgColors: Record<string, string> = {
                    'Bonzo Finance': '#6366f1',
                    HashPack: '#8a1b7a',
                    SentX: '#64748b',
                    Neuron: '#0ea5e9',
                    KiloScribe: '#7c3aed',
                    'Builder Labs': '#2563eb',
                    Hashgate: '#059669',
                    Hgraph: '#0ea5e9',
                    LaunchBadge: '#ea580c',
                    Turtlemoon: '#0891b2',
                    TurtleMoon: '#0891b2',
                    'Hashinals.com': '#0891b2',
                    OpenConvAI: '#0ea5e9',
                    Moonscape: '#ea580c',
                  };
                  return orgColors[orgName] || '#059669';
                };

                const color = getOrgColor(adoption);
                return (
                  <span
                    key={adoption}
                    className='px-2 py-0.5 rounded text-xs font-medium'
                    style={{
                      backgroundColor: `${color}15`,
                      color: color,
                    }}
                  >
                    {adoption}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <div className='flex gap-2 pt-2'>
          <PrimaryButton href={standard.specification} size='small'>
            View Specifications →
          </PrimaryButton>
        </div>
      </div>
    </div>
  </div>
);

const StandardSidebarItem: React.FC<StandardSidebarItemProps> = ({
  item: standard,
  index,
  isActive,
  onClick,
}) => (
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
        <span
          className={`text-sm font-mono transition-colors duration-500 ${
            isActive ? 'text-brand-blue' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {standard.id}
        </span>

        <div
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-500 ${
            isActive ? 'scale-105 shadow-sm' : 'scale-100'
          } ${
            standard.status === 'PUBLISHED'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400'
          }`}
        >
          {standard.status}
        </div>
      </div>

      <Typography
        className={`text-sm font-mono font-semibold transition-colors duration-500 ${
          isActive
            ? 'text-gray-900 dark:text-white'
            : 'text-gray-700 dark:text-gray-300'
        }`}
      >
        {standard.name}
      </Typography>

      {/* Show adoption tags when active */}
      {isActive && standard.adoptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className='flex flex-wrap gap-1 mt-2'
        >
          {standard.adoptions.slice(0, 2).map((adoption) => {
            const getOrgColor = (orgName: string) => {
              const orgColors: Record<string, string> = {
                'Bonzo Finance': '#6366f1',
                HashPack: '#8a1b7a',
                SentX: '#64748b',
                Neuron: '#0ea5e9',
                KiloScribe: '#7c3aed',
                'Builder Labs': '#2563eb',
                Hashgate: '#059669',
                Hgraph: '#0ea5e9',
                LaunchBadge: '#ea580c',
                Turtlemoon: '#0891b2',
                TurtleMoon: '#0891b2',
                'Hashinals.com': '#0891b2',
                OpenConvAI: '#0ea5e9',
                Moonscape: '#ea580c',
              };
              return orgColors[orgName] || '#059669';
            };

            const color = getOrgColor(adoption);
            return (
              <span
                key={adoption}
                className='text-xs px-2 py-0.5 rounded-full font-medium'
                style={{
                  backgroundColor: `${color}15`,
                  color: color,
                }}
              >
                {adoption}
              </span>
            );
          })}
          {standard.adoptions.length > 2 && (
            <span
              className='text-xs px-2 py-0.5 rounded-full font-medium'
              style={{
                backgroundColor: '#64748b15',
                color: '#64748b',
              }}
            >
              +{standard.adoptions.length - 2}
            </span>
          )}
        </motion.div>
      )}
    </div>
  </motion.div>
);

const StandardsSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // Convert to InteractiveShowcase format
  const allStandards: StandardItem[] = [
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
      id: 'HCS-4',
      name: 'HCS Standardization Process',
      description: 'Defines the lifecycle, roles, criteria, and repository workflow for HCS standards.',
      specification: '/docs/standards/hcs-4',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'submitProposal(title, description)',
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
      name: 'Dynamic Hashinals',
      description: 'Framework for creating dynamic Hashinals with updatable on-chain metadata',
      specification: '/docs/standards/hcs-6',
      status: 'PUBLISHED',
      adoptions: ['KiloScribe'],
      codeExample: 'register(hcs1TopicId)',
    },
    {
      id: 'HCS-7',
      name: 'Smart Hashinals',
      description: 'Dynamic NFTs with metadata driven by smart contract state and WASM processing',
      specification: '/docs/standards/hcs-7',
      status: 'DRAFT',
      adoptions: ['KiloScribe'],
      codeExample: 'registerConfig(type, config)',
    },
    {
      id: 'HCS-8',
      name: 'Governance & Voting',
      description: 'Transparent voting systems with tamper-proof results',
      specification: '/docs/standards/hcs-8',
      status: 'PUBLISHED',
      adoptions: ['HashPack'],
      codeExample: 'createPoll(question, options, duration)',
    },
    {
      id: 'HCS-9',
      name: 'Modular Governance Framework',
      description: 'Flexible governance system with pluggable voting modules',
      specification: '/docs/standards/hcs-9',
      status: 'PUBLISHED',
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
      id: 'HCS-12',
      name: 'HashLinks - Actions & Blocks',
      description: 'Framework for building interactive experiences using WebAssembly and Gutenberg blocks.',
      specification: '/docs/standards/hcs-12',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'assemble(actionId, blockId)',
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
      id: 'HCS-14',
      name: 'Universal Agent ID',
      description: 'Systematic approach for generating globally unique identifiers for AI agents.',
      specification: '/docs/standards/hcs-14',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'resolveAgent(did)',
    },
    {
      id: 'HCS-15',
      name: 'Petals - Profile Accounts',
      description: 'Enables multiple account instances using the same private key for isolated identities.',
      specification: '/docs/standards/hcs-15',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'createPetal(baseKey, profile)',
    },
    {
      id: 'HCS-16',
      name: 'Floras - AppNet Accounts',
      description: 'Multi-signature coordination accounts for decentralized AppNets.',
      specification: '/docs/standards/hcs-16',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'createFlora(members, threshold)',
    },
    {
      id: 'HCS-17',
      name: 'State Hash Calculation',
      description: 'Methodology for calculating cryptographic state hashes of accounts and formations.',
      specification: '/docs/standards/hcs-17',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'calculateStateHash(accountState)',
    },
    {
      id: 'HCS-18',
      name: 'Flora Discovery Protocol',
      description: 'Discovery and formation protocol for Floras to find compatible partners.',
      specification: '/docs/standards/hcs-18',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'announceAvailability(capabilities)',
    },
    {
      id: 'HCS-19',
      name: 'AI Agent Privacy Compliance',
      description: 'ISO/IEC TS 27560-aligned framework for AI privacy compliance.',
      specification: '/docs/standards/hcs-19',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'recordConsent(userId, policyId)',
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
    {
      id: 'HCS-21',
      name: 'Package Declaration Registry',
      description: 'Lightweight package declaration registry for ecosystem metadata.',
      specification: '/docs/standards/hcs-21',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'declarePackage(registry, topicId)',
    },
  ];

  return (
    <section className='relative py-24 lg:py-32 bg-white dark:bg-gray-900 overflow-hidden'>
      <AnimatedBackground
        variant='blobs'
        colors={['brand-blue', 'brand-purple', 'brand-green']}
        intensity='low'
        opacity={0.1}
      />

      <div className='absolute inset-0 opacity-5 dark:opacity-10'>
        <HashgraphConsensus animated={true} />
      </div>

      <div className='container mx-auto px-6 lg:px-12 relative z-10'>
        <div className='text-center mb-16'>
          <div className='text-xs font-mono text-gray-600 dark:text-gray-400 uppercase tracking-[0.3em] mb-4'>
            <span className='text-gray-800 dark:text-gray-400'>//</span> OPEN PROTOCOLS
          </div>
          <Typography
            variant='h2'
            className='text-4xl lg:text-5xl font-mono font-black text-gray-900 dark:text-white mb-4'
          >
            HCS{' '}
            <Typography
              variant='h2'
              gradient='brand'
              as='span'
              className='text-4xl lg:text-5xl font-mono font-black inline-block'
            >
              Standards_
            </Typography>
          </Typography>
          <Typography
            color='muted'
            className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'
          >
            Production-ready protocols for the autonomous internet
          </Typography>
        </div>

        <InteractiveShowcase
          items={allStandards}
          title=''
          MainContent={StandardMainContent}
          SidebarItem={StandardSidebarItem}
          terminalTitle='standards-browser.sh'
          rotationInterval={8000}
          className='p-0 bg-transparent'
        />

        <div className='mt-20 text-center max-w-4xl mx-auto'>
          <div className='bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-10 border border-gray-200 dark:border-gray-700'>
            <Typography
              variant='h3'
              className='text-3xl font-mono font-black text-gray-900 dark:text-white mb-4'
            >
              Start{' '}
              <Typography
                variant='h3'
                gradient='brand'
                as='span'
                className='text-3xl font-mono font-black inline-block'
              >
                Building_
              </Typography>
            </Typography>
            <Typography
              color='muted'
              className='text-base text-gray-600 dark:text-gray-300 mb-6'
            >
              Join 10 consortium members building with 15+ production standards
            </Typography>

            <div className='relative mb-6'>
              <div
                className='bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-300 dark:border-gray-600 cursor-pointer hover:border-brand-blue dark:hover:border-brand-blue transition-colors duration-200'
                onClick={() => {
                  navigator.clipboard.writeText(
                    'npm install @hashgraphonline/standards-sdk'
                  );
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                <div className='text-sm font-mono text-gray-700 dark:text-gray-300'>
                  <span className='text-brand-green'>$</span> npm install @hashgraphonline/standards-sdk
                </div>
              </div>
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className='absolute top-1/2 right-4 -translate-y-1/2 bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium shadow-lg'
                  >
                    Copied!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <PrimaryButton href='/docs/libraries/standards-sdk'>
                View Documentation →
              </PrimaryButton>
              <SecondaryButton href='https://github.com/hashgraph-online/standards-sdk'>
                GitHub ↗
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MetricsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className='relative py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-black dark:to-gray-900 overflow-hidden'
    >
      <AnimatedBackground
        variant='blobs'
        colors={['brand-blue', 'brand-purple', 'brand-green']}
        intensity='medium'
        opacity={0.15}
      />

      <div className='absolute inset-0 opacity-10 dark:opacity-5'>
        <HashgraphConsensus animated={true} />
      </div>

      <div className='container mx-auto px-6 lg:px-12 relative z-10'>
        <motion.div
          className='text-center mb-20'
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className='text-xs font-mono text-gray-600 dark:text-gray-400 uppercase tracking-[0.3em] mb-4'>
            <span className='text-gray-800 dark:text-gray-400'>//</span> LIVE IN PRODUCTION
          </div>
          <Typography
            variant='h2'
            className='text-4xl lg:text-5xl font-mono font-black text-gray-900 dark:text-white mb-6'
          >
            Production{' '}
            <Typography
              variant='h2'
              gradient='brand'
              as='span'
              className='text-4xl lg:text-5xl font-mono font-black inline-block'
            >
              Metrics_
            </Typography>
          </Typography>
          <Typography
            color='muted'
            className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'
          >
            Battle-tested infrastructure powering real applications at internet scale
          </Typography>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16'>
          <motion.div
            className='relative group'
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div className='absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green rounded-3xl blur-lg opacity-25 group-hover:opacity-50 transition duration-700 group-hover:duration-300'></div>
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
          </motion.div>

          <motion.div
            className='relative group lg:mt-12'
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <div className='absolute -inset-1 bg-gradient-to-r from-brand-green via-brand-blue to-brand-purple rounded-3xl blur-lg opacity-25 group-hover:opacity-50 transition duration-700 group-hover:duration-300'></div>
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
          </motion.div>

          <motion.div
            className='relative group lg:mt-6'
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          >
            <div className='absolute -inset-1 bg-gradient-to-r from-brand-purple via-brand-green to-brand-blue rounded-3xl blur-lg opacity-25 group-hover:opacity-50 transition duration-700 group-hover:duration-300'></div>
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
          </motion.div>
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
        <AutonomousInfrastructureSection />
        <WhatWeDoSection />
        <MetricsSection />
        <UseCaseSection />
        <StandardsSection />
      </main>
    </Layout>
  );
};

export default Home;
