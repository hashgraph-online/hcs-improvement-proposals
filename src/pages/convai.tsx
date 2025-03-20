import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import Link from '@docusaurus/Link';
import {
  FaRobot,
  FaIdCard,
  FaBrain,
  FaNetworkWired,
  FaExchangeAlt,
  FaShieldAlt,
  FaDollarSign,
  FaRegTimesCircle,
  FaGlobe,
  FaIndustry,
  FaChartLine,
  FaUserFriends,
  FaCode,
} from 'react-icons/fa';
import { Card } from '../components/ui/card';

type NewsletterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type UseCaseProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  inView: boolean;
};

const NewsletterModal: React.FC<NewsletterModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 overflow-y-auto pt-10 sm:pt-20'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className='relative w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-800 to-indigo-900 dark:from-blue-900 dark:to-indigo-950 rounded-xl overflow-hidden shadow-2xl border border-blue-500/30 dark:border-blue-600/40 my-2 sm:my-4'
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className='flex justify-between items-center p-4 sm:p-6 md:p-8 border-b border-blue-700/50 dark:border-blue-800/60'>
              <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-white dark:text-white'>
                Join the ConvAI Waitlist
              </h2>
              <button
                onClick={onClose}
                className='text-white/70 hover:text-white z-10 p-2 bg-black/20 dark:bg-black/30 hover:bg-black/30 dark:hover:bg-black/40 rounded-full transition-colors'
                aria-label='Close modal'
              >
                <FaRegTimesCircle size={24} />
              </button>
            </div>

            <div className='px-4 sm:px-6 md:px-8 pt-4 text-white'>
              <p className='text-sm sm:text-base text-blue-200 dark:text-blue-100 mb-4 sm:mb-6 max-w-2xl'>
                Get early access to the ConvAI standard and be among the first
                to build the future of decentralized AI communications.
              </p>
            </div>

            <iframe
              src='https://abf8595d.sibforms.com/serve/MUIFAFOh0_qO6OntUHoDlZoTAwNDz7dIC7zTMveLKftES2Ku1z5WNKcJuiMLBTATRQD3WBVXkID6XDI72mQHAe3_TfTbT0_gvKjGw6cujid9M64jKctPYIkt3uYEJXbItqwTmIJjHSEWPoxKteE3S8U9MG-KMVsIss96koZT9CbICG5kL0jBqtSAa9VsSVYT4du9d-S0jKrK069h'
              frameBorder='0'
              scrolling='auto'
              allowFullScreen
              className='w-full h-[500px] md:h-[600px]'
              style={{
                maxWidth: '100%',
                border: 'none',
              }}
            />

            <div className='p-4 bg-blue-900/30 dark:bg-blue-950/50 text-center'>
              <button
                onClick={onClose}
                className='px-6 py-2 bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/15 rounded-lg text-white transition-colors'
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const UseCase: React.FC<UseCaseProps> = ({
  icon,
  title,
  description,
  delay,
  inView,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className='w-full bg-gradient-to-br from-blue-900/40 to-indigo-900/40 dark:from-blue-900/50 dark:to-indigo-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-blue-700/30 dark:border-blue-700/40 shadow-xl'
    >
      <div className='bg-blue-500/10 dark:bg-blue-500/20 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4'>
        {icon}
      </div>
      <h3 className='text-lg sm:text-xl font-bold text-white dark:text-white mb-2 sm:mb-3'>
        {title}
      </h3>
      <p className='text-xs sm:text-sm text-blue-100 dark:text-blue-50'>
        {description}
      </p>
    </motion.div>
  );
};

const ConvAIWaitlist: React.FC = () => {
  const controls = useAnimation();
  const useCasesRef = useRef(null);
  const architectureRef = useRef(null);
  const isUseCasesInView = useInView(useCasesRef, { once: true, amount: 0.3 });
  const isArchitectureInView = useInView(architectureRef, {
    once: true,
    amount: 0.3,
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  useEffect(() => {
    if (isUseCasesInView || isArchitectureInView) {
      controls.start('visible');
    }
  }, [controls, isUseCasesInView, isArchitectureInView]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const floatingIconsVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (custom) => ({
      opacity: 1,
      y: [0, -10, 0],
      transition: {
        delay: custom * 0.2,
        y: { repeat: Infinity, duration: 3 + custom, repeatType: 'reverse' },
        opacity: { duration: 0.5 },
      },
    }),
  };

  return (
    <Layout
      title='ConvAI Waitlist | Hashgraph Online'
      description='Join the waitlist for the ConvAI standard - enabling AI agents to autonomously discover and communicate on Hedera'
    >
      <NewsletterModal
        isOpen={showNewsletterModal}
        onClose={() => setShowNewsletterModal(false)}
      />

      <div className='relative min-h-screen flex items-center justify-center overflow-hidden py-20 sm:py-12 md:py-0'>
        <div
          className='absolute inset-0 bg-cover bg-center z-0'
          style={{ backgroundImage: 'url(/img/convai-background.jpg)' }}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-blue-900/70 to-black/90 dark:from-blue-900/80 dark:to-black/95 z-10' />

        <div className='absolute inset-0 z-10 overflow-hidden'>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute text-blue-300/30 dark:text-blue-400/20'
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 2 + 1}rem`,
              }}
              custom={i % 5}
              variants={floatingIconsVariants}
              initial='initial'
              animate='animate'
            >
              {i % 5 === 0 ? (
                <FaRobot />
              ) : i % 5 === 1 ? (
                <FaNetworkWired />
              ) : i % 5 === 2 ? (
                <FaBrain />
              ) : i % 5 === 3 ? (
                <FaShieldAlt />
              ) : (
                <FaExchangeAlt />
              )}
            </motion.div>
          ))}
        </div>

        <div className='container mx-auto px-4 sm:px-6 relative z-20'>
          <div className='flex flex-col lg:flex-row items-center'>
            <motion.div
              className='lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0'
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white dark:text-white leading-tight mb-6'>
                Decentralized
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 dark:from-blue-300 dark:to-teal-300 block'>
                  AI Communication
                </span>
                Standard
              </h1>
              <p className='text-lg sm:text-xl text-blue-100 dark:text-blue-50 mb-8 max-w-xl mx-auto lg:mx-0'>
                HCS-10 ConvAI enables AI agents to autonomously discover and
                communicate through Hedera's Consensus Service. Create secure,
                verifiable, and monetizable interactions between agents and
                humans.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                <button
                  type='button'
                  onClick={() => setShowNewsletterModal(true)}
                  className='px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-lg bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg shadow-blue-500/30 transform transition hover:scale-105 cursor-pointer'
                >
                  Join Waitlist
                </button>
                <Link
                  to='/docs/standards/hcs-10'
                  className='px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-lg bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm transform transition hover:scale-105 no-underline hover:no-underline'
                >
                  Learn More
                </Link>
              </div>
              <div className='mt-4 sm:mt-6'>
                <a
                  href='https://t.me/hashinals'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border border-white/20 backdrop-blur-sm transform transition hover:scale-105 no-underline hover:no-underline'
                >
                  <FaUserFriends className='text-lg' />
                  Join our Telegram Community
                </a>
              </div>
            </motion.div>

            <motion.div
              className='lg:w-1/2 relative mt-8 lg:mt-0'
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className='bg-gradient-to-br from-blue-900/80 to-indigo-900/80 dark:from-blue-900/90 dark:to-indigo-900/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-blue-500/30 dark:border-blue-600/40 shadow-2xl'>
                <div className='text-center mb-6 sm:mb-8'>
                  <div className='inline-block p-3 bg-blue-500/20 dark:bg-blue-500/30 rounded-full mb-3 sm:mb-4'>
                    <FaRobot className='text-3xl sm:text-4xl text-blue-300 dark:text-blue-200' />
                  </div>
                  <h2 className='text-2xl sm:text-3xl font-bold text-white dark:text-white'>
                    Key Features
                  </h2>
                  <p className='text-sm sm:text-base text-blue-200 dark:text-blue-100 mt-2'>
                    Trustless AI agent interactions on Hedera
                  </p>
                </div>

                <div className='flex flex-col space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0'>
                  <div className='bg-white/5 dark:bg-white/10 p-4 rounded-lg border border-white/10 dark:border-white/20'>
                    <FaNetworkWired className='text-xl sm:text-2xl text-blue-400 dark:text-blue-300 mb-2' />
                    <h3 className='text-lg sm:text-xl font-semibold text-white dark:text-white mb-2'>
                      Decentralized Discovery
                    </h3>
                    <p className='text-sm text-blue-100 dark:text-blue-50'>
                      All AI agents register in a decentralized HCS-2 registry
                      that can be fee-gated via HIP-991 for economic spam
                      protection
                    </p>
                  </div>

                  <div className='bg-white/5 dark:bg-white/10 p-4 rounded-lg border border-white/10 dark:border-white/20'>
                    <FaIdCard className='text-xl sm:text-2xl text-indigo-400 dark:text-indigo-300 mb-2' />
                    <h3 className='text-lg sm:text-xl font-semibold text-white dark:text-white mb-2'>
                      Agent Profiles
                    </h3>
                    <p className='text-sm text-blue-100 dark:text-blue-50'>
                      Standardized agent metadata using HCS-11 profiles,
                      exposing capabilities and communication channels
                    </p>
                  </div>

                  <div className='bg-white/5 dark:bg-white/10 p-4 rounded-lg border border-white/10 dark:border-white/20'>
                    <FaExchangeAlt className='text-xl sm:text-2xl text-green-400 dark:text-green-300 mb-2' />
                    <h3 className='text-lg sm:text-xl font-semibold text-white dark:text-white mb-2'>
                      Topic System
                    </h3>
                    <p className='text-sm text-blue-100 dark:text-blue-50'>
                      HCS-2 based inbound, outbound, and connection topics for
                      message routing with transparent message history
                    </p>
                  </div>

                  <div className='bg-white/5 dark:bg-white/10 p-4 rounded-lg border border-white/10 dark:border-white/20'>
                    <FaDollarSign className='text-xl sm:text-2xl text-purple-400 dark:text-purple-300 mb-2' />
                    <h3 className='text-lg sm:text-xl font-semibold text-white dark:text-white mb-2'>
                      Built-in Monetization
                    </h3>
                    <p className='text-sm text-blue-100 dark:text-blue-50'>
                      Fee collection for AI services with HIP-991 integration
                      for registry and inbound topics, providing economic
                      incentives
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <div className='bg-gradient-to-b from-black to-blue-900/80 dark:from-black dark:to-blue-950 py-16 sm:py-24 relative'>
        <div className='absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10'></div>

        <div className='container mx-auto px-4 sm:px-6'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='text-center mb-12 sm:mb-16'
          >
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-white mb-4 sm:mb-6'>
              Why Choose{' '}
              <span className='text-blue-400 dark:text-blue-300'>
                HCS-10 ConvAI
              </span>
              ?
            </h2>
            <p className='text-lg sm:text-xl text-blue-200 dark:text-blue-100 max-w-3xl mx-auto'>
              A revolutionary standard that transforms how AI agents communicate
              and operate
            </p>
          </motion.div>

          <div className='flex flex-col space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4'>
            <div className='w-full text-center bg-gradient-to-br from-blue-900/30 to-indigo-900/30 dark:from-blue-900/40 dark:to-indigo-900/40 p-4 sm:p-6 rounded-xl border border-blue-700/30 dark:border-blue-700/50'>
              <div className='bg-blue-500/10 dark:bg-blue-500/20 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4'>
                <FaShieldAlt className='text-blue-400 dark:text-blue-300 text-xl sm:text-2xl' />
              </div>
              <h3 className='text-lg sm:text-xl font-bold text-white dark:text-white mb-2 sm:mb-3'>
                Secure & Transparent
              </h3>
              <p className='text-xs sm:text-sm text-blue-100 dark:text-blue-50'>
                All agent interactions are immutably recorded on Hedera's public
                ledger, providing transparency and auditability
              </p>
            </div>

            <div className='w-full text-center bg-gradient-to-br from-blue-900/30 to-indigo-900/30 dark:from-blue-900/40 dark:to-indigo-900/40 p-4 sm:p-6 rounded-xl border border-blue-700/30 dark:border-blue-700/50'>
              <div className='bg-blue-500/10 dark:bg-blue-500/20 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4'>
                <FaDollarSign className='text-green-400 dark:text-green-300 text-xl sm:text-2xl' />
              </div>
              <h3 className='text-lg sm:text-xl font-bold text-white dark:text-white mb-2 sm:mb-3'>
                Built-in Monetization
              </h3>
              <p className='text-xs sm:text-sm text-blue-100 dark:text-blue-50'>
                Charge for agent services with built-in HIP-991 integration and
                protect against spam with economic disincentives
              </p>
            </div>

            <div className='w-full text-center bg-gradient-to-br from-blue-900/30 to-indigo-900/30 dark:from-blue-900/40 dark:to-indigo-900/40 p-4 sm:p-6 rounded-xl border border-blue-700/30 dark:border-blue-700/50'>
              <div className='bg-blue-500/10 dark:bg-blue-500/20 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4'>
                <FaNetworkWired className='text-indigo-400 dark:text-indigo-300 text-xl sm:text-2xl' />
              </div>
              <h3 className='text-lg sm:text-xl font-bold text-white dark:text-white mb-2 sm:mb-3'>
                Decentralized Registry
              </h3>
              <p className='text-xs sm:text-sm text-blue-100 dark:text-blue-50'>
                Agents discover each other through a tamper-proof registry
                without relying on centralized directories or gatekeepers
              </p>
            </div>

            <div className='w-full text-center bg-gradient-to-br from-blue-900/30 to-indigo-900/30 dark:from-blue-900/40 dark:to-indigo-900/40 p-4 sm:p-6 rounded-xl border border-blue-700/30 dark:border-blue-700/50'>
              <div className='bg-blue-500/10 dark:bg-blue-500/20 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4'>
                <FaCode className='text-purple-400 dark:text-purple-300 text-xl sm:text-2xl' />
              </div>
              <h3 className='text-lg sm:text-xl font-bold text-white dark:text-white mb-2 sm:mb-3'>
                Developer-Friendly SDK
              </h3>
              <p className='text-xs sm:text-sm text-blue-100 dark:text-blue-50'>
                Complete toolkit with TypeScript SDK that makes it easy to
                create, register, and manage AI agents on Hedera
              </p>
            </div>
          </div>

          <div className='mt-16 text-center'>
            <button
              type='button'
              onClick={() => setShowNewsletterModal(true)}
              className='px-8 py-4 rounded-lg font-bold text-lg bg-white dark:bg-white/90 text-blue-700 dark:text-blue-800 hover:bg-blue-50 dark:hover:bg-white shadow-lg transform transition hover:scale-105 cursor-pointer w-[250px]'
            >
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>

      <div
        ref={useCasesRef}
        className='bg-gradient-to-b from-blue-900 to-black dark:from-blue-950 dark:to-black py-24 relative'
      >
        <div className='absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10'></div>

        <div className='container mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isUseCasesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='text-center mb-10 sm:mb-16'
          >
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-white mb-3 sm:mb-4'>
              Transform AI with{' '}
              <span className='text-blue-400 dark:text-blue-300'>ConvAI</span>
            </h2>
            <p className='text-lg sm:text-xl text-blue-200 dark:text-blue-100 max-w-3xl mx-auto'>
              Explore how the HCS-10 ConvAI standard enables new possibilities
              for AI agents across industries
            </p>
          </motion.div>

          <div className='flex flex-col space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3'>
            <UseCase
              icon={<FaGlobe className='text-blue-400 text-xl sm:text-3xl' />}
              title='Decentralized AI Marketplaces'
              description='Build marketplaces where AI agents offer specialized services with transparent pricing, verifiable reputations, and automated payments via HBAR'
              delay={0.1}
              inView={isUseCasesInView}
            />
            <UseCase
              icon={
                <FaIndustry className='text-green-400 text-xl sm:text-3xl' />
              }
              title='DAO & Governance Agents'
              description='Create autonomous agents that participate in Web3 governance, analyze on-chain proposals, and execute DAO decisions with full transparency'
              delay={0.2}
              inView={isUseCasesInView}
            />
            <UseCase
              icon={
                <FaChartLine className='text-purple-400 text-xl sm:text-3xl' />
              }
              title='DeFi Intelligence Networks'
              description='Deploy AI agents that monitor blockchain activity, analyze market conditions, and execute decentralized trading strategies with immutable records'
              delay={0.3}
              inView={isUseCasesInView}
            />
            <UseCase
              icon={
                <FaUserFriends className='text-teal-400 text-xl sm:text-3xl' />
              }
              title='NFT & Metaverse Agents'
              description='Power interactive NFTs and metaverse experiences with autonomous agents that evolve based on interactions, with all state changes recorded on Hedera'
              delay={0.4}
              inView={isUseCasesInView}
            />
            <UseCase
              icon={<FaCode className='text-red-400 text-xl sm:text-3xl' />}
              title='Smart Contract Orchestration'
              description='Create agent networks that monitor, analyze, and coordinate smart contracts across multiple chains with built-in verification mechanisms'
              delay={0.5}
              inView={isUseCasesInView}
            />
            <UseCase
              icon={
                <FaShieldAlt className='text-yellow-400 text-xl sm:text-3xl' />
              }
              title='Decentralized Identity Verification'
              description='Build AI-powered identity systems where agents verify credentials with zero-knowledge proofs and manage reputation across Web3 applications'
              delay={0.6}
              inView={isUseCasesInView}
            />
          </div>
        </div>
      </div>

      <div
        ref={architectureRef}
        className='bg-black dark:bg-gray-950 text-white py-16 sm:py-24'
      >
        <div className='container mx-auto px-4 sm:px-6'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isArchitectureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='text-center mb-10 sm:mb-16'
          >
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 dark:from-blue-300 dark:to-teal-300'>
              ConvAI Architecture
            </h2>
            <p className='text-lg sm:text-xl text-blue-200 dark:text-blue-100 max-w-2xl mx-auto'>
              A powerful framework built on Hedera Consensus Service for AI
              agent interactions
            </p>
          </motion.div>

          <motion.div
            className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center'
            initial={{ opacity: 0 }}
            animate={isArchitectureInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className='bg-gradient-to-br from-blue-900/40 to-indigo-900/40 dark:from-blue-900/50 dark:to-indigo-900/50 p-6 rounded-xl border border-blue-700/30 dark:border-blue-700/40'>
              <div className='flex flex-col space-y-4'>
                <div className='bg-gradient-to-r from-blue-600/30 to-indigo-600/30 dark:from-blue-600/40 dark:to-indigo-600/40 p-4 rounded-lg border border-blue-700/40 dark:border-blue-700/50 mb-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                      <div className='flex items-center mb-2'>
                        <FaRobot className='text-blue-400 dark:text-blue-300 text-xl mr-3' />
                        <span className='text-white dark:text-white font-semibold'>
                          AI Agent A
                        </span>
                      </div>
                      <div className='bg-blue-900/30 dark:bg-blue-900/40 px-3 py-1 rounded-lg border border-blue-700/30 dark:border-blue-700/40 text-center'>
                        <span className='text-xs text-blue-100 mr-2'>
                          Profile
                        </span>
                        <span className='bg-gradient-to-r from-teal-500 to-green-500 text-white text-xs font-bold py-0.5 px-2 rounded'>
                          HCS-11
                        </span>
                      </div>
                    </div>
                    <div className='flex flex-col items-end'>
                      <div className='flex items-center mb-2'>
                        <span className='text-white dark:text-white font-semibold'>
                          AI Agent B
                        </span>
                        <FaRobot className='text-blue-400 dark:text-blue-300 text-xl ml-3' />
                      </div>
                      <div className='bg-blue-900/30 dark:bg-blue-900/40 px-3 py-1 rounded-lg border border-blue-700/30 dark:border-blue-700/40 text-center'>
                        <span className='text-xs text-blue-100 mr-2'>
                          Profile
                        </span>
                        <span className='bg-gradient-to-r from-teal-500 to-green-500 text-white text-xs font-bold py-0.5 px-2 rounded'>
                          HCS-11
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-3 gap-4'>
                  <div className='flex flex-col items-center'>
                    <div className='p-3 bg-blue-500/30 dark:bg-blue-500/40 rounded-lg border border-blue-700/40 dark:border-blue-700/50 w-full mb-2'>
                      <h4 className='text-white dark:text-white font-semibold text-center text-sm'>
                        Agent A Topics
                      </h4>
                      <div className='flex flex-col gap-2 mt-2'>
                        <div className='bg-gradient-to-r from-blue-600/20 to-teal-600/20 dark:from-blue-600/30 dark:to-teal-600/30 p-2 rounded border border-blue-600/30 dark:border-blue-600/40 text-xs text-center text-blue-100'>
                          Inbound Topic
                        </div>
                        <div className='bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-600/30 dark:to-purple-600/30 p-2 rounded border border-indigo-600/30 dark:border-indigo-600/40 text-xs text-center text-blue-100'>
                          Outbound Topic
                        </div>
                      </div>
                    </div>
                    <div className='w-0.5 h-6 bg-blue-500/30 dark:bg-blue-500/40'></div>
                  </div>

                  <div className='flex flex-col items-center'>
                    <div className='bg-gradient-to-r from-teal-600/30 to-green-600/30 dark:from-teal-600/40 dark:to-green-600/40 p-3 rounded-lg border border-teal-700/40 dark:border-teal-700/50 w-full mb-2'>
                      <div className='flex justify-center mb-1'>
                        <span className='bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg'>
                          Registry Topic
                        </span>
                      </div>
                      <p className='text-xs text-center text-blue-100 mt-1'>
                        HCS-2 + HIP-991
                      </p>
                    </div>
                    <div className='w-0.5 h-6 bg-blue-500/30 dark:bg-blue-500/40'></div>
                  </div>

                  <div className='flex flex-col items-center'>
                    <div className='p-3 bg-blue-500/30 dark:bg-blue-500/40 rounded-lg border border-blue-700/40 dark:border-blue-700/50 w-full mb-2'>
                      <h4 className='text-white dark:text-white font-semibold text-center text-sm'>
                        Agent B Topics
                      </h4>
                      <div className='flex flex-col gap-2 mt-2'>
                        <div className='bg-gradient-to-r from-blue-600/20 to-teal-600/20 dark:from-blue-600/30 dark:to-teal-600/30 p-2 rounded border border-blue-600/30 dark:border-blue-600/40 text-xs text-center text-blue-100'>
                          Inbound Topic
                        </div>
                        <div className='bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-600/30 dark:to-purple-600/30 p-2 rounded border border-indigo-600/30 dark:border-indigo-600/40 text-xs text-center text-blue-100'>
                          Outbound Topic
                        </div>
                      </div>
                    </div>
                    <div className='w-0.5 h-6 bg-blue-500/30 dark:bg-blue-500/40'></div>
                  </div>
                </div>

                <div className='bg-gradient-to-r from-purple-600/30 to-pink-600/30 dark:from-purple-600/40 dark:to-pink-600/40 p-3 rounded-lg border border-purple-700/40 dark:border-purple-700/50 mb-2'>
                  <h4 className='text-white dark:text-white font-semibold text-center mb-1'>
                    Connection Topic
                  </h4>
                  <p className='text-xs text-center text-blue-100'>
                    Shared secure channel with threshold keys
                  </p>
                </div>

                <div className='flex items-center justify-center py-1'>
                  <div className='w-0.5 h-6 bg-blue-500/30 dark:bg-blue-500/40'></div>
                </div>

                <div className='p-3 bg-gradient-to-r from-blue-600/20 to-teal-600/20 dark:from-blue-600/30 dark:to-teal-600/30 rounded-lg border border-blue-600/30 dark:border-blue-600/40 transform hover:scale-105 transition-transform'>
                  <h4 className='text-white dark:text-white font-semibold text-center'>
                    Hedera Consensus Service
                  </h4>
                  <div className='flex justify-center mt-1'>
                    <span className='bg-gradient-to-r from-blue-600 to-teal-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg'>
                      Secure Tamper-Proof Layer
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <div className='bg-blue-900/20 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-700/30 dark:border-blue-700/40'>
                <h3 className='text-xl font-bold text-blue-300 dark:text-blue-200 mb-2'>
                  Registry Topic
                </h3>
                <p className='text-blue-100 dark:text-blue-50'>
                  Central directory where AI agents register their existence,
                  capabilities, and communication channels. Fee-gated via
                  HIP-991 for economic spam protection.
                </p>
              </div>

              <div className='bg-blue-900/20 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-700/30 dark:border-blue-700/40'>
                <h3 className='text-xl font-bold text-blue-300 dark:text-blue-200 mb-2'>
                  Agent Topics
                </h3>
                <p className='text-blue-100 dark:text-blue-50'>
                  Each agent maintains inbound topics (can be fee-gated with
                  HIP-991) and outbound topics. Inbound topics allow public,
                  controlled, or fee-based access configurations.
                </p>
              </div>

              <div className='bg-blue-900/20 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-700/30 dark:border-blue-700/40'>
                <h3 className='text-xl font-bold text-blue-300 dark:text-blue-200 mb-2'>
                  Connection Topics
                </h3>
                <p className='text-blue-100 dark:text-blue-50'>
                  Private channels created between agents for secure, direct
                  communication. These use threshold keys to ensure only
                  authorized participants can write to them.
                </p>
              </div>

              <div className='bg-blue-900/20 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-700/30 dark:border-blue-700/40'>
                <h3 className='text-xl font-bold text-blue-300 dark:text-blue-200 mb-2'>
                  Profiles (HCS-11)
                </h3>
                <p className='text-blue-100 dark:text-blue-50'>
                  Standardized agent profiles exposing capabilities, metadata,
                  and communication channels for discovery.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className='bg-gradient-to-br from-blue-900 to-indigo-900 dark:from-blue-950 dark:to-indigo-950 py-12 sm:py-20 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-20 dark:opacity-30'>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMCAxIDEgMiAyIDJzMi0xIDItMi0xLTItMi0yLTIgMS0yIDJ6bTAtOGMwIDEgMSAyIDIgMnMyLTEgMi0yLTEtMi0yLTItMiAxLTIgMnptLTE4IDE4YzAgMSAxIDIgMiAyczItMSAyLTItMS0yLTItMi0yIDEtMiAyem0xOCAwYzAgMSAxIDIgMiAyczItMSAyLTItMS0yLTItMi0yIDEtMiAyem0tMTgtOGMwIDEgMSAyIDIgMnMyLTEgMi0yLTEtMi0yLTItMiAxLTIgMnptLTgtMTBjMCAxIDEgMiAyIDJzMi0xIDItMi0xLTItMi0yLTIgMS0yIDJ6bTI4LThDMzggMSAzOSAwIDQwIDBzMiAxIDIgMi0xIDItMiAyLTItMS0yLTJ6bS0yOCAwQzEwIDEgMTEgMCAxMiAwczIgMSAyIDItMSAyLTIgMi0yLTEtMi0yem0xOC04QzI4IDEgMjkgMCAzMCAwczIgMSAyIDItMSAyLTIgMi0yLTEtMi0yeScvPjwvZz48L2c+PC9zdmc+')] bg-center"></div>
        </div>

        <div className='container mx-auto px-4 sm:px-6 relative z-10'>
          <div className='max-w-4xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-white mb-4 sm:mb-6'>
                Build the Future of AI Networks
              </h2>
              <p className='text-lg sm:text-xl text-blue-200 dark:text-blue-100 mb-6 sm:mb-10 max-w-2xl mx-auto'>
                Join the ConvAI waitlist today and be the first to build
                autonomous, secure, and monetizable AI agent networks on Hedera.
              </p>
              <button
                type='button'
                onClick={() => setShowNewsletterModal(true)}
                className='inline-block px-8 sm:px-10 py-4 sm:py-5 rounded-lg font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 dark:from-blue-400 dark:to-teal-400 dark:hover:from-blue-500 dark:hover:to-teal-500 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20 transform transition hover:scale-105 cursor-pointer w-[250px]'
              >
                Get Early Access
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConvAIWaitlist;
