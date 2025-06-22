import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Modal from '../components/Modal';
import UseCaseSection from '../components/UseCaseSection';
import InteractiveShowcase, {
  ShowcaseItem,
} from '../components/InteractiveShowcase';
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
  const [copied, setCopied] = useState(false);
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');

  const line1 = '✓ Installing autonomous agent infrastructure...';
  const line2 = '// Ready to build the agentic internet';

  useEffect(() => {
    // Start first line after delay
    const timer1 = setTimeout(() => {
      setShowLine1(true);
      // Type out first line
      let index = 0;
      const typeInterval1 = setInterval(() => {
        if (index <= line1.length) {
          setTypedText1(line1.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval1);
        }
      }, 30);
    }, 800);

    // Start second line after first is done
    const timer2 = setTimeout(() => {
      setShowLine2(true);
      // Type out second line
      let index = 0;
      const typeInterval2 = setInterval(() => {
        if (index <= line2.length) {
          setTypedText2(line2.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval2);
        }
      }, 30);
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install @hashgraphonline/standards-sdk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
              <h1 className='text-4xl lg:text-5xl xl:text-6xl font-mono font-black leading-tight tracking-tight lg:whitespace-nowrap'>
                <span className='text-gray-900 dark:text-white'>on-chain </span>
                <span className='bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text text-transparent inline'>
                  internet
                </span>
              </h1>

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

              <div className='relative'>
                <Terminal title='terminal'>
                  <Terminal.Line
                    command='npm install @hashgraphonline/standards-sdk'
                    clickable
                    onClick={handleCopy}
                  />
                  <AnimatePresence>
                    {showLine1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <div className='font-mono text-sm pl-4 text-green-500 dark:text-green-400 flex items-center'>
                          <span>{typedText1}</span>
                          {typedText1.length < line1.length && (
                            <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className='ml-0.5 inline-block w-2 h-4 bg-green-500 dark:bg-green-400'
                            />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {showLine2 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <div className='font-mono text-sm pl-4 text-blue-500 dark:text-blue-400 flex items-center'>
                          <span>{typedText2}</span>
                          {typedText2.length < line2.length && (
                            <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className='ml-0.5 inline-block w-2 h-4 bg-blue-500 dark:bg-blue-400'
                            />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
            <div className='relative h-auto lg:h-96 rounded-3xl overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black'></div>

              <div className='absolute top-4 lg:top-8 left-4 lg:left-8 w-24 lg:w-32 h-24 lg: rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-purple/30 blur-2xl'></div>
              <div className='absolute bottom-8 lg:bottom-12 right-8 lg:right-12 w-16 lg:w-24 h-16 lg:h-24 rounded-full bg-gradient-to-tl from-brand-green/25 to-cyan-400/20 blur-xl'></div>
              <div className='absolute top-1/2 left-1/4 lg:left-1/3 w-12 lg:w-16 h-12 lg:h-16 rounded-full bg-gradient-to-r from-brand-purple/30 to-pink-400/25 blur-lg'></div>

              <div className='relative h-full p-4 lg:p-8 pb-8 lg:pb-8 flex flex-col justify-between'>
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

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 items-start'>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='flex flex-col items-center'
                  >
                    <motion.div
                      animate={{
                        rotateY: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className='mb-3 text-brand-blue/60'
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
                      rotation='rotate-[-0.5deg] lg:rotate-[-1deg]'
                      background='bg-gradient-to-br from-brand-blue/30 to-brand-blue/20'
                      border='border border-brand-blue/50'
                      shadow='lg'
                      className='p-4 backdrop-blur-sm hover:scale-105 transition-all duration-500 group w-full'
                      style={{ minHeight: '100px' }}
                    >
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <Typography
                          color='muted'
                          className='text-xs text-white/90 font-bold uppercase tracking-wide mb-2 group-hover:text-brand-blue transition-colors duration-300'
                        >
                          // Websites
                          <br />
                          exist
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
                        <Typography className='text-sm font-black text-white leading-tight'>
                          without web
                          <br />
                          servers
                        </Typography>
                      </motion.div>
                    </TransformCard>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className='flex flex-col items-center'
                  >
                    <div
                      className='mb-3 text-brand-green/60 relative'
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
                        {/* First robot */}
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
                        <line
                          x1='12'
                          y1='2'
                          x2='12'
                          y2='6'
                          strokeLinecap='round'
                        >
                          <animate
                            attributeName='opacity'
                            values='0;1;0'
                            dur='1.5s'
                            repeatCount='indefinite'
                            begin='0.5s'
                          />
                        </line>

                        {/* Second robot */}
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
                        <line
                          x1='48'
                          y1='2'
                          x2='48'
                          y2='6'
                          strokeLinecap='round'
                        >
                          <animate
                            attributeName='opacity'
                            values='0;1;0'
                            dur='1.5s'
                            repeatCount='indefinite'
                            begin='1s'
                          />
                        </line>
                        <line
                          x1='52'
                          y1='2'
                          x2='52'
                          y2='6'
                          strokeLinecap='round'
                        >
                          <animate
                            attributeName='opacity'
                            values='0;1;0'
                            dur='1.5s'
                            repeatCount='indefinite'
                            begin='1.5s'
                          />
                        </line>

                        {/* Communication waves between robots */}
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
                      rotation='rotate-[0.5deg] lg:rotate-[1deg]'
                      background='bg-gradient-to-br from-brand-green/30 to-brand-green/20'
                      border='border border-brand-green/50'
                      shadow='lg'
                      className='p-4 backdrop-blur-sm hover:scale-105 transition-all duration-500 group w-full'
                      style={{ minHeight: '100px' }}
                    >
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <Typography
                          color='muted'
                          className='text-xs text-white/90 font-bold uppercase tracking-wide mb-2 group-hover:text-brand-green transition-colors duration-300'
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
                          delay: 1,
                        }}
                      >
                        <Typography className='text-sm font-black text-white leading-tight'>
                          eachother
                          <br />
                          autonomously
                        </Typography>
                      </motion.div>
                    </TransformCard>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className='flex flex-col items-center'
                  >
                    <motion.div
                      animate={{
                        rotateY: [0, 180, 360],
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className='mb-3 text-brand-purple/60'
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
                        <path
                          d='M12 8 L12 16 M9 10 L15 10 M9 14 L15 14'
                          strokeLinecap='round'
                        />
                        <circle cx='12' cy='12' r='2' fill='currentColor' />
                      </svg>
                    </motion.div>
                    <TransformCard
                      rotation='rotate-[-0.25deg] lg:rotate-[-0.5deg]'
                      background='bg-gradient-to-br from-brand-purple/30 to-brand-purple/20'
                      border='border border-brand-purple/50'
                      shadow='lg'
                      className='p-4 backdrop-blur-sm hover:scale-105 transition-all duration-500 group w-full'
                      style={{ minHeight: '100px' }}
                    >
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <Typography
                          color='muted'
                          className='text-xs text-white/90 font-bold uppercase tracking-wide mb-2 group-hover:text-brand-purple transition-colors duration-300'
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
                          delay: 2,
                        }}
                      >
                        <Typography className='text-sm font-black text-white'>
                          run themselves
                        </Typography>
                      </motion.div>
                    </TransformCard>
                  </motion.div>
                </div>
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
              className='text-4xl lg:text-5xl xl:text-6xl font-mono font-black leading-tight tracking-tight inline-block'
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
    <section className='relative py-20 lg:py-32 pb-32 lg:pb-40 bg-white dark:bg-gray-900 overflow-hidden'>
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
        <div className='text-center mb-6'>
          <div className='mb-3'>
            <Typography
              variant='h2'
              className='text-4xl lg:text-5xl xl:text-6xl font-mono font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-2'
            >
              HCS{' '}
              <Typography
                variant='h2'
                gradient='brand'
                as='span'
                className='text-4xl lg:text-5xl xl:text-6xl font-mono font-black leading-tight tracking-tight inline-block'
              >
                Standards_
              </Typography>
            </Typography>
            <Typography
              color='muted'
              className='text-sm text-gray-600 dark:text-gray-300 max-w-lg mx-auto'
            >
              Battle-tested standards powering the autonomous internet.
            </Typography>
          </div>
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

        <div className='mt-16 text-center'>
          <div className='relative group max-w-2xl mx-auto'>
            <div className='absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-1000 animate-pulse'></div>
            <div className='relative bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-purple-950 border-4 border-blue-500/30 shadow-2xl rounded-3xl p-8 backdrop-blur-sm transform hover:scale-105 transition-all duration-500'>
              <div className='space-y-6'>
                <div className='text-center'>
                  <h3 className='text-4xl lg:text-5xl font-mono font-black text-gray-900 dark:text-white'>
                    <span
                      style={{
                        background:
                          'linear-gradient(45deg, #3b82f6, #8b5cf6, #10b981)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Start Building
                    </span>
                  </h3>
                </div>

                <p className='text-lg text-gray-700 dark:text-gray-200 font-medium leading-relaxed'>
                  Join{' '}
                  <span className='font-bold text-purple-600 dark:text-purple-400'>
                    10 consortium members
                  </span>{' '}
                  building the autonomous internet with{' '}
                  <span className='font-bold text-blue-600 dark:text-blue-400'>
                    15+ battle-tested standards
                  </span>
                </p>

                <div className='relative'>
                  <div
                    className='bg-gray-100 dark:bg-gray-800 rounded-xl p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'
                    onClick={() => {
                      navigator.clipboard.writeText(
                        'npm install @hashgraphonline/standards-sdk'
                      );
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    <div className='text-sm font-mono text-gray-600 dark:text-gray-300'>
                      <span className='text-green-600 dark:text-green-400'>
                        $
                      </span>{' '}
                      npm install @hashgraphonline/standards-sdk
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
                  <PrimaryButton
                    href='/docs/libraries/standards-sdk'
                    className='text-lg py-4 px-8 font-black shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300'
                  >
                    Standards SDK →
                  </PrimaryButton>
                  <SecondaryButton
                    href='https://github.com/hashgraph-online/standards-sdk'
                    className='text-lg py-4 px-8 font-bold border-2 border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950 hover:text-purple-700 dark:hover:text-purple-300 transform hover:scale-105 transition-all duration-300'
                  >
                    GitHub ↗
                  </SecondaryButton>
                </div>
              </div>
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
              className='text-4xl lg:text-5xl xl:text-6xl font-mono font-black text-gray-900 dark:text-white leading-tight tracking-tight'
            >
              <span className='block'>Production</span>
              <span className='bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text text-transparent inline-block'>
                Metrics_
              </span>
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
