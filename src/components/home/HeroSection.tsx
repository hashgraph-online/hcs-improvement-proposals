import React, { useState, useEffect, useCallback, Suspense, lazy, useMemo, useRef } from 'react';

import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import {
  AnimatedBackground,
  Terminal,
  Typography,
} from '../ui';
import { FaNetworkWired, FaFingerprint, FaCoins, FaRocket, FaServer, FaLayerGroup } from 'react-icons/fa';

const HashgraphConsensusLazy = lazy(() => import('../HashgraphConsensus').then(m => ({ default: m.HashgraphConsensus })));

const REACLE_FORM_ID = 'ac327b5768122432279ed0a9';

const NewsletterOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (!scriptLoadedRef.current) {
      (window as unknown as Record<string, string>).reacleFormId = REACLE_FORM_ID;

      const existingScript = document.querySelector('script[src="https://reacle.com/static/form.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://reacle.com/static/form.js';
        script.defer = true;
        document.body.appendChild(script);
      }
      scriptLoadedRef.current = true;
    }
  }, []);

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
        <div className='p-8 min-h-[400px]'>
          <div id='form-root-publish' className='min-h-[350px]' />
        </div>
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

  const handleCopy = useCallback((command: string) => {
    if (!command) return;
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

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
          <div
            className='relative z-10 w-full max-w-[400px] mb-4 hero-slide-up'
          >
             <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/50 dark:border-gray-700 rounded-xl p-3 shadow-xl shadow-brand-blue/5 flex items-center justify-between ring-1 ring-black/5">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center text-white shadow-lg shadow-brand-purple/20">
                      <FaNetworkWired className="text-lg" />
                   </div>
                   <div>
                      <div className="font-bold text-gray-900 dark:text-white text-sm">HOL Registry Broker</div>
                      <div className="text-[10px] text-blue-600 dark:text-brand-blue font-mono font-medium uppercase tracking-wider">Hashnet MCP Server</div>
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
          </div>

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
                <div
                  key={item.label}
                  className={`hero-slide-up hero-stagger-${Math.min(index + 1, 4)}`}
                >
                  <div className='bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 border border-white/40 dark:border-gray-700 shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-gray-800 hover:border-brand-blue/20 transition-all duration-300 flex flex-col items-center gap-2 group cursor-default h-full'>
                     <div className={`text-brand-${item.color} bg-brand-${item.color}/10 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                     </div>
                     <div className='text-xs font-bold text-gray-700 dark:text-gray-200 font-mono text-center leading-none'>
                        {item.label}
                     </div>
                  </div>
                </div>
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
                <div
                  key={line}
                  className={`hero-slide-up hero-stagger-${Math.min(i + 1, 4)}`}
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
                </div>
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
  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  /**
   * Navigate to next slide
   */
  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  return (
    <section
      className='relative overflow-hidden'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ minHeight: '650px', maxHeight: '650px' }}
    >
      {/* Background with CSS transition instead of motion */}
      <div
        key={`${currentSlideData.id}-background`}
        className={`absolute inset-0 pointer-events-none hero-bg-transition ${
          currentSlideData.sectionBackgroundClass ?? 'bg-white dark:bg-gray-900'
        }`}
      />

      <AnimatedBackground
        variant='blobs'
        colors={['brand-blue', 'brand-purple', 'brand-green']}
        intensity='medium'
        opacity={0.1}
      />

      {!currentSlideData.disableHashgraphPattern && (
        <div className='absolute inset-0 opacity-15 dark:opacity-10'>
          <Suspense fallback={null}>
            <HashgraphConsensusLazy animated={true} />
          </Suspense>
        </div>
      )}
      {/* Background layer with CSS animation */}
      {currentSlideData.backgroundLayer && (
        <div
          key={`${currentSlideData.id}-layer`}
          className='absolute inset-0 pointer-events-none overflow-hidden hero-bg-transition'
        >
          {currentSlideData.backgroundLayer}
        </div>
      )}

      <div className='relative z-10 h-full'>
        <div className='container mx-auto px-6 lg:px-16 xl:px-24 h-full'>
          <div
            className={`grid ${hasRightContent ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-12 lg:gap-16 items-center h-full py-12 lg:py-16`}
          >
            {/* Left content with CSS animation */}
              <div
                key={currentSlide}
                className={`space-y-8 ${isFirstRender && currentSlide === 0 ? '' : 'hero-fade-in'}`}
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
                          <div
                            key={i}
                            className={`hero-slide-up hero-stagger-${Math.min(i + 1, 4)}`}
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
                          </div>
                        ))}
                    </Terminal>
                    {/* Copied notification with CSS transition */}
                    {copied && (
                      <div
                        className='absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium shadow-lg hero-scale-in'
                      >
                        Copied!
                      </div>
                    )}
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
            </div>

          {hasRightContent && (
            <div className='hidden lg:block'>
              {/* Right content with CSS animation */}
                <div
                  key={`right-${currentSlide}`}
                  className={`relative flex items-center justify-center ${isFirstRender && currentSlide === 0 ? '' : 'hero-scale-in'}`}
                  style={{ height: '450px' }}
                >
                  {currentSlideData.rightContent}
                </div>
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
          className='w-8 h-8 lg:w-10 lg:h-10 text-gray-500 dark:text-gray-400 group-hover:text-brand-blue dark:group-hover:text-brand-blue transition-colors duration-300'
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
          className='w-8 h-8 lg:w-10 lg:h-10 text-gray-500 dark:text-gray-400 group-hover:text-brand-blue dark:group-hover:text-brand-blue transition-colors duration-300'
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

      <div className='absolute left-1/2 flex items-center gap-3' style={{ bottom: '32px', transform: 'translateX(-50%)', zIndex: 20 }}>
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
              index === currentSlide
                ? 'scale-110'
                : 'hover:scale-105'
            }`}
            style={{ border: 'none', outline: 'none' }}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
          >
            <span className={`block w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-brand-blue'
                : 'bg-gray-400 dark:bg-gray-600'
            }`} />
          </button>
        ))}
      </div>

      {showNewsletter && (
        <NewsletterOverlay onClose={() => setShowNewsletter(false)} />
      )}
    </section>
  );
};

export default HeroSection;
