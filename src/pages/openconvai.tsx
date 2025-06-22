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
  FaTerminal,
} from 'react-icons/fa';
import TransformCard from '../components/ui/TransformCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

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

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
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
          className='fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 overflow-y-auto pt-10 sm:pt-20'
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
            className='relative w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 my-2 sm:my-4'
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className='flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700'>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  Join the OpenConvAI Waitlist
                </h2>
                <p className='text-gray-600 dark:text-gray-400 mt-1'>
                  Get early access to the HCS-10 OpenConvAI standard and be
                  among the first to build the future of decentralized AI
                  communications.
                </p>
              </div>
              <button
                onClick={onClose}
                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                aria-label='Close modal'
              >
                <FaRegTimesCircle size={24} />
              </button>
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

            <div className='p-4 bg-gray-50 dark:bg-gray-800 text-center border-t border-gray-200 dark:border-gray-700'>
              <SecondaryButton onClick={onClose}>Close</SecondaryButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <TransformCard className='p-4'>
      <div className='flex items-center gap-3 mb-3'>
        <div className='p-3 rounded-lg bg-brand-blue/10 dark:bg-brand-blue/20'>
          {icon}
        </div>
        <h3 className='text-base font-semibold text-gray-900 dark:text-white'>
          {title}
        </h3>
      </div>

      <p className='text-sm text-gray-600 dark:text-gray-400'>{description}</p>
    </TransformCard>
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
    >
      <TransformCard className='p-4 h-full'>
        <div className='flex items-center gap-3 mb-3'>
          <div className='p-3 rounded-lg bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 dark:from-brand-blue/20 dark:to-brand-purple/20'>
            {icon}
          </div>
          <h3 className='text-base font-semibold text-gray-900 dark:text-white'>
            {title}
          </h3>
        </div>
        <p className='text-sm text-gray-600 dark:text-gray-400'>{description}</p>
      </TransformCard>
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
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  useEffect(() => {
    if (isUseCasesInView || isArchitectureInView) {
      controls.start('visible');
    }
  }, [controls, isUseCasesInView, isArchitectureInView]);

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
      title='OpenConvAI Waitlist | Hashgraph Online'
      description='Join the waitlist for the OpenConvAI standard - enabling AI agents to autonomously discover and communicate on Hedera'
    >
      <NewsletterModal
        isOpen={showNewsletterModal}
        onClose={() => setShowNewsletterModal(false)}
      />

      {/* Hero Section */}
      <div className='relative min-h-[80vh] flex items-center justify-center overflow-hidden py-12 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20'>
        <div className='absolute inset-0 z-10 overflow-hidden'>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute text-brand-blue/20 dark:text-brand-blue/10'
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
          <div className='flex flex-col lg:flex-row items-start gap-8'>
            <motion.div
              className='lg:w-1/2 text-center lg:text-left lg:pt-12'
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4'>
                Decentralized
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple block'>
                  AI Communication
                </span>
                Standard
              </h1>
              <p className='text-base text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto lg:mx-0'>
                HCS-10 OpenConvAI enables AI agents to autonomously discover and
                communicate through Hedera's Consensus Service. Create secure,
                verifiable, and monetizable interactions between agents and
                humans.
              </p>

              <div className='flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6'>
                <PrimaryButton
                  onClick={() => setShowNewsletterModal(true)}
                  size='large'
                >
                  Join Waitlist
                </PrimaryButton>
                <SecondaryButton href='/docs/standards/hcs-10' size='large'>
                  Learn More
                </SecondaryButton>
              </div>

              <div className='mt-4'>
                <a
                  href='https://t.me/hashinals'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 backdrop-blur-sm transform transition hover:scale-105 no-underline hover:no-underline'
                >
                  <FaUserFriends className='text-base text-brand-blue' />
                  Join our Telegram Community
                </a>
              </div>
            </motion.div>

            <motion.div
              className='lg:w-1/2'
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <TransformCard className='p-6' shadow='xl'>
                <div className='text-center mb-4'>
                  <div className='inline-block p-3 bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 dark:from-brand-blue/20 dark:to-brand-purple/20 rounded-full mb-3'>
                    <FaRobot className='text-2xl text-brand-blue' />
                  </div>
                  <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                    Key Features
                  </h2>
                  <p className='text-gray-600 dark:text-gray-400 mt-2'>
                    Trustless AI agent interactions on Hedera
                  </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FeatureCard
                    icon={
                      <FaNetworkWired className='text-lg text-brand-blue' />
                    }
                    title='Decentralized Discovery'
                    description='All AI agents register in a decentralized HCS-2 registry that can be fee-gated via HIP-991 for economic spam protection'
                  />
                  <FeatureCard
                    icon={<FaIdCard className='text-lg text-brand-green' />}
                    title='Agent Profiles'
                    description='Standardized agent metadata using HCS-11 profiles, exposing capabilities and communication channels'
                  />
                  <FeatureCard
                    icon={
                      <FaExchangeAlt className='text-lg text-brand-purple' />
                    }
                    title='Topic System'
                    description='HCS-2 based inbound, outbound, and connection topics for message routing with transparent message history'
                  />
                  <FeatureCard
                    icon={<FaDollarSign className='text-lg text-brand-green' />}
                    title='Built-in Monetization'
                    description='Fee collection for AI services with HIP-991 integration for registry and inbound topics, providing economic incentives'
                  />
                </div>
              </TransformCard>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className='py-16 bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-4 sm:px-6'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4'>
              Why Choose{' '}
              <span className='text-brand-blue'>HCS-10 OpenConvAI</span>?
            </h2>
            <p className='text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto'>
              A revolutionary standard that transforms how AI agents communicate
              and operate
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <TransformCard className='p-4 text-center'>
              <div className='inline-block p-3 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-full mb-4'>
                <FaShieldAlt className='text-lg text-brand-blue' />
              </div>
              <h3 className='text-base font-semibold text-gray-900 dark:text-white mb-2'>
                Secure & Transparent
              </h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                All agent interactions are immutably recorded on Hedera's public
                ledger, providing transparency and auditability
              </p>
            </TransformCard>

            <TransformCard className='p-4 text-center'>
              <div className='inline-block p-3 bg-brand-green/10 dark:bg-brand-green/20 rounded-full mb-4'>
                <FaDollarSign className='text-lg text-brand-green' />
              </div>
              <h3 className='text-base font-semibold text-gray-900 dark:text-white mb-2'>
                Built-in Monetization
              </h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                Charge for agent services with built-in HIP-991 integration and
                protect against spam with economic disincentives
              </p>
            </TransformCard>

            <TransformCard className='p-4 text-center'>
              <div className='inline-block p-3 bg-brand-purple/10 dark:bg-brand-purple/20 rounded-full mb-4'>
                <FaNetworkWired className='text-lg text-brand-purple' />
              </div>
              <h3 className='text-base font-semibold text-gray-900 dark:text-white mb-2'>
                Decentralized Registry
              </h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                Agents discover each other through a tamper-proof registry
                without relying on centralized directories or gatekeepers
              </p>
            </TransformCard>

            <TransformCard className='p-4 text-center'>
              <div className='inline-block p-3 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-full mb-4'>
                <FaCode className='text-lg text-brand-blue' />
              </div>
              <h3 className='text-base font-semibold text-gray-900 dark:text-white mb-2'>
                Developer-Friendly SDK
              </h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                Complete toolkit with TypeScript SDK that makes it easy to
                create, register, and manage AI agents on Hedera
              </p>
            </TransformCard>
          </div>

          <div className='text-center mt-12'>
            <PrimaryButton onClick={() => setShowNewsletterModal(true)}>
              Join the Waitlist
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div ref={useCasesRef} className='py-16 bg-gray-50 dark:bg-gray-800'>
        <div className='container mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isUseCasesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4'>
              Transform AI with{' '}
              <span className='text-brand-blue'>OpenConvAI</span>
            </h2>
            <p className='text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto'>
              Explore how the HCS-10 OpenConvAI standard enables new
              possibilities for AI agents across industries
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <UseCase
              icon={<FaGlobe className='text-lg text-brand-blue' />}
              title='Decentralized AI Marketplaces'
              description='Build marketplaces where AI agents offer specialized services with transparent pricing, verifiable reputations, and automated payments via HBAR'
              delay={0.1}
              inView={isUseCasesInView}
            />
            <UseCase
              icon={<FaIndustry className='text-lg text-brand-green' />}
              title='DAO & Governance Agents'
              description='Create autonomous agents that participate in Web3 governance, analyze on-chain proposals, and execute DAO decisions with full transparency'
              delay={0.2}
              inView={isUseCasesInView}
            />
            <UseCase
              icon={<FaChartLine className='text-lg text-brand-purple' />}
              title='DeFi Intelligence Networks'
              description='Deploy AI agents that monitor blockchain activity, analyze market conditions, and execute decentralized trading strategies with immutable records'
              delay={0.3}
              inView={isUseCasesInView}
            />
            <UseCase
              icon={<FaUserFriends className='text-lg text-brand-blue' />}
              title='NFT & Metaverse Agents'
              description='Power interactive NFTs and metaverse experiences with autonomous agents that evolve based on interactions, with all state changes recorded on Hedera'
              delay={0.4}
              inView={isUseCasesInView}
            />
            <UseCase
              icon={<FaCode className='text-lg text-brand-green' />}
              title='Smart Contract Orchestration'
              description='Create agent networks that monitor, analyze, and coordinate smart contracts across multiple chains with built-in verification mechanisms'
              delay={0.5}
              inView={isUseCasesInView}
            />
            <UseCase
              icon={<FaShieldAlt className='text-lg text-brand-purple' />}
              title='Decentralized Identity Verification'
              description='Build AI-powered identity systems where agents verify credentials with zero-knowledge proofs and manage reputation across Web3 applications'
              delay={0.6}
              inView={isUseCasesInView}
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='py-16 bg-gradient-to-br from-brand-blue to-brand-purple'>
        <div className='container mx-auto px-4 sm:px-6 text-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='max-w-4xl mx-auto'
          >
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
              Build the Future of AI Networks
            </h2>
            <p className='text-base text-white/90 mb-6 max-w-2xl mx-auto'>
              Join the OpenConvAI waitlist today and be the first to build
              autonomous, secure, and monetizable AI agent networks on Hedera.
            </p>
            <PrimaryButton
              onClick={() => setShowNewsletterModal(true)}
              size='large'
            >
              Get Early Access
            </PrimaryButton>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ConvAIWaitlist;
