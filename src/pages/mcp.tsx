import Layout from '@theme/Layout';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Typography,
  PrimaryButton,
  TransformCard,
} from '../components/ui';
import {
  FaRocket,
  FaNetworkWired,
  FaSearch,
  FaShieldAlt,
  FaCode,
  FaCheckCircle,
  FaCopy,
  FaGlobeAmericas,
  FaLayerGroup,
  FaExchangeAlt,
  FaLock,
  FaCoins,
  FaPlug,
  FaCube,
  FaServer,
  FaLink,
  FaProjectDiagram,
} from 'react-icons/fa';

export default function MCPPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = async (code: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const installCommand = 'npx @hol-org/hashnet-mcp@latest up';

  return (
    <Layout
      title="HOL Hashnet MCP - The Backbone of the Agentic Internet"
      description="HOL Hashnet MCP is the central gateway to the emerging Agentic Internet with ERC-8004 and x402 support."
    >
      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
      <div className='min-h-screen bg-white dark:bg-gray-950'>
        <section className='relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)]' />
          <div className='relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20'>
            <div className='max-w-5xl mx-auto text-center space-y-6'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='space-y-4'
              >
                <div className='text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] mb-3 text-center'>
                  <span className='text-gray-600 dark:text-gray-500'>//</span> FOR_IMMEDIATE_RELEASE
                </div>
                <Typography variant='h1' align='center' gradient='brand' className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold leading-tight pb-2 bg-[length:200%_auto] animate-[gradient_8s_ease-in-out_infinite] [animation-direction:alternate]'>
                  The Unifying Hub of the Agentic Internet
                </Typography>
                <Typography variant='body1' color='muted' align='center' className='text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed'>
                  The backbone for agentic search. Interconnecting agents, services, and data across Web2 and Web3.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='max-w-3xl mx-auto relative'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-brand-purple/20 via-brand-blue/20 to-brand-green/20 rounded-2xl blur-2xl opacity-60' />
                <div className='relative bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-900/95 backdrop-blur-sm rounded-2xl px-6 pt-4 pb-6 border border-brand-blue/30 shadow-2xl shadow-brand-blue/20 group hover:shadow-brand-blue/30 transition-all duration-300'>
                  <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center gap-2'>
                      <div className='flex gap-1.5'>
                        <div className='w-3 h-3 rounded-full bg-brand-purple' />
                        <div className='w-3 h-3 rounded-full bg-brand-blue' />
                        <div className='w-3 h-3 rounded-full bg-brand-green' />
                      </div>
                      <Typography variant='caption' className='text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs ml-2'>
                        Quick Start
                      </Typography>
                    </div>
                    <button
                      onClick={() => handleCopyCode(installCommand)}
                      className='px-4 py-2 rounded-lg bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/30 hover:border-brand-blue/50 text-brand-blue hover:text-white dark:hover:text-white transition-all text-sm flex items-center gap-2 font-mono'
                      aria-label='Copy command'
                    >
                      {copiedCode === installCommand ? (
                        <>
                          <FaCheckCircle className='w-4 h-4 text-green-400' />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <FaCopy className='w-4 h-4' />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div
                    onClick={() => handleCopyCode(installCommand)}
                    className='bg-gray-100/80 dark:bg-black/40 rounded-lg p-4 border border-gray-300/50 dark:border-gray-700/50 cursor-pointer hover:border-brand-blue/50 transition-colors'
                  >
                    <code className='text-base sm:text-lg font-mono text-brand-blue block select-all'>
                      <span className='text-gray-400 dark:text-gray-500'>$</span> {installCommand}
                    </code>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='flex flex-col sm:flex-row justify-center items-center gap-4 pt-2'
              >
                <PrimaryButton
                  href='/docs'
                  variant='secondary'
                  umamiEvent='mcp-cta-docs'
                  className='!bg-[#5599fe] hover:!bg-[#4488ed] !text-white !shadow-lg !shadow-[#5599fe]/25 hover:!shadow-xl hover:!shadow-[#5599fe]/30'
                >
                  <span className='flex items-center gap-2'>
                    <FaCode className='w-5 h-5' />
                    View Documentation
                  </span>
                </PrimaryButton>
                <PrimaryButton
                  href='/search'
                  umamiEvent='mcp-cta-explore'
                  className='!bg-[#3f4174] hover:!bg-[#353763] !text-white !shadow-lg !shadow-[#3f4174]/25 hover:!shadow-xl hover:!shadow-[#3f4174]/30'
                >
                  <span className='flex items-center gap-2'>
                    <FaSearch className='w-5 h-5' />
                    Explore Agents
                  </span>
                </PrimaryButton>
              </motion.div>
            </div>
          </div>
        </section>

        <section className='relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden'>
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ willChange: 'transform' }}
            className='absolute top-20 left-10 w-96 h-96 bg-brand-purple/20 dark:bg-brand-purple/30 rounded-full blur-3xl opacity-60'
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            style={{ willChange: 'transform' }}
            className='absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-brand-blue/20 dark:bg-brand-blue/30 rounded-full blur-3xl opacity-50'
          />
          <div className='relative container mx-auto px-4'>
            <div className='max-w-7xl mx-auto'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className='text-center mb-12'
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className='text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] mb-4 text-center'
                >
                  <span className='text-gray-600 dark:text-gray-500'>//</span> THE_INTERCONNECTED_WORLD
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Typography variant='h2' align='center' className='text-2xl sm:text-3xl md:text-4xl font-mono font-bold mb-4'>
                    <span className='text-gray-700 dark:text-white'>One </span>
                    <Typography as='span' variant='h2' gradient='brand' className='inline bg-[length:200%_auto] animate-[gradient_8s_ease-in-out_infinite] [animation-direction:alternate]'>
                      Simple Utility
                    </Typography>
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Typography variant='body1' color='muted' align='center' className='text-base sm:text-lg max-w-2xl mx-auto'>
                    Find and connect everything in the agentic ecosystem
                  </Typography>
                </motion.div>
              </motion.div>

              <div className='relative mb-20'>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className='w-96 h-96 bg-linear-to-br from-brand-blue/20 via-brand-purple/20 to-brand-green/20 rounded-full blur-3xl'
                  />
                </div>

                <div className='relative grid grid-cols-3 gap-8 max-w-5xl mx-auto'>
                  <div className='col-span-3 flex justify-center mb-8'>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 40 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className='relative'
                    >
                      <div className='absolute inset-0 bg-linear-to-br from-brand-purple via-brand-blue to-brand-green rounded-2xl blur-xl opacity-60' />
                      <TransformCard
                        className='relative p-8'
                        background='bg-white dark:bg-gray-900'
                        border='border-2 border-brand-blue'
                        shadow='2xl'
                      >
                        <FaNetworkWired className='text-6xl text-brand-blue mx-auto mb-4' />
                        <Typography variant='h3' align='center' className='text-2xl font-mono font-bold text-gray-700 dark:text-white mb-2'>
                          HOL Registry Broker
                        </Typography>
                        <Typography variant='body2' align='center' className='text-sm text-brand-blue font-mono'>
                          + Hashnet MCP
                        </Typography>
                      </TransformCard>
                    </motion.div>
                  </div>

                  {[
                    { icon: <FaRocket />, label: 'AI Agents', color: 'purple' },
                    { icon: <FaServer />, label: 'MCP Servers', color: 'blue' },
                    { icon: <FaExchangeAlt />, label: 'Data Brokers', color: 'green' },
                    { icon: <FaPlug />, label: 'Agent Tools', color: 'purple' },
                    { icon: <FaNetworkWired />, label: 'AI Infrastructure', color: 'blue' },
                    { icon: <FaLayerGroup />, label: 'Data Sources', color: 'green' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.15,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className='relative group'
                    >
                      <motion.div
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      >
                        <div className={`absolute inset-0 bg-linear-to-br from-brand-${item.color}/20 via-brand-${item.color}/10 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity`} />
                        <div className='relative bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center shadow-lg'>
                          <div className={`text-4xl mb-3 text-brand-${item.color}`}>
                            {item.icon}
                          </div>
                          <Typography variant='body2' className='text-sm font-mono font-semibold text-gray-700 dark:text-white'>
                            {item.label}
                          </Typography>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='py-20 bg-white dark:bg-gray-950'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className='text-center mb-12'
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className='text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] mb-4 text-center'
                >
                  <span className='text-gray-600 dark:text-gray-500'>//</span> KEY_FEATURES
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Typography variant='h2' align='center' className='text-2xl sm:text-3xl md:text-4xl font-mono font-bold'>
                    <span className='text-gray-700 dark:text-white'>Built for </span>
                    <Typography as='span' variant='h2' gradient='brand' className='inline bg-[length:200%_auto] animate-[gradient_8s_ease-in-out_infinite] [animation-direction:alternate]'>
                      Production
                    </Typography>
                  </Typography>
                </motion.div>
              </motion.div>

              <div className='grid md:grid-cols-2 gap-6'>
                {[
                  {
                    icon: <FaShieldAlt className='text-3xl text-brand-purple' />,
                    title: 'Full ERC-8004 Support',
                    description: 'Production-grade implementation of the ERC-8004 standard.',
                    highlight: 'Live now',
                  },
                  {
                    icon: <FaCoins className='text-3xl text-brand-blue' />,
                    title: 'Universal x402 Payments',
                    description: 'Credit-based transactions from any blockchain implementing x402.',
                    highlight: 'Multi-chain',
                  },
                  {
                    icon: <FaLayerGroup className='text-3xl text-brand-green' />,
                    title: 'Multi-Protocol Indexing',
                    description: 'Indexing Virtuals, A2A, ERC-8004, x402 Bazaar, OpenConvAI, and more.',
                    highlight: 'Growing',
                  },
                  {
                    icon: <FaLock className='text-3xl text-brand-purple' />,
                    title: 'Identity & Trust',
                    description: 'Unified, verifiable agent identity with ledger-backed credits.',
                    highlight: 'Secure',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                  >
                    <TransformCard
                      className='h-full p-6'
                      background='bg-gray-50 dark:bg-gray-800'
                      border='border border-gray-200 dark:border-gray-700'
                      shadow='md'
                    >
                      <div className='flex flex-col items-center text-center gap-4'>
                        <div className='w-16 h-16 rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center shadow-lg'>
                          {item.icon}
                        </div>
                        <div>
                          <div className='flex items-center justify-center gap-2 mb-2'>
                            <Typography variant='h5' className='text-lg font-mono font-bold text-gray-700 dark:text-white'>
                              {item.title}
                            </Typography>
                          </div>
                          <span className='inline-block text-xs px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-mono mb-3'>
                            {item.highlight}
                          </span>
                          <Typography variant='body2' color='muted' className='text-sm'>
                            {item.description}
                          </Typography>
                        </div>
                      </div>
                    </TransformCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className='relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden'>
          <motion.div
            animate={{
              x: [0, 50, 0],
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className='absolute top-40 right-1/4 w-96 h-96 bg-gradient-to-br from-brand-blue/25 to-brand-purple/20 dark:from-brand-blue/35 dark:to-brand-purple/30 rounded-full blur-3xl'
          />
          <motion.div
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
            className='absolute bottom-40 left-1/4 w-[28rem] h-[28rem] bg-brand-green/20 dark:bg-brand-green/30 rounded-full blur-3xl opacity-50'
          />
          <div className='relative container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <div className='text-center mb-12'>
                <div className='text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] mb-4 text-center'>
                  <span className='text-gray-600 dark:text-gray-500'>//</span> YEARS_IN_THE_MAKING
                </div>
                <Typography variant='h2' align='center' className='text-2xl sm:text-3xl md:text-4xl font-mono font-bold mb-4'>
                  <span className='text-gray-700 dark:text-white'>Built on </span>
                  <Typography as='span' variant='h2' gradient='brand' className='inline bg-[length:200%_auto] animate-[gradient_8s_ease-in-out_infinite] [animation-direction:alternate]'>
                    Open Standards
                  </Typography>
                </Typography>
                <Typography variant='body1' color='muted' align='center' className='text-base sm:text-lg max-w-2xl mx-auto'>
                  Battle-tested with millions of transactions.
                </Typography>
              </div>

              <div className='relative max-w-4xl mx-auto'>
                <div className='absolute left-8 top-[2.625rem] w-1 bg-linear-to-b from-brand-purple via-brand-blue to-brand-green' style={{ height: 'calc(100% - 2.625rem - 4rem - 3rem)' }} />

                {[
                  {
                    standard: 'HCS-14',
                    title: 'Trustless Identity',
                    description: 'Verifiable identity without centralized control.',
                    year: 'Foundation',
                    icon: <FaShieldAlt className='text-4xl text-brand-purple' />,
                  },
                  {
                    standard: 'HCS-15',
                    title: 'Profile-Based Assets',
                    description: 'Silo assets per profile for clean context separation.',
                    year: 'Evolution',
                    icon: <FaLayerGroup className='text-4xl text-brand-blue' />,
                  },
                  {
                    standard: 'HCS-19',
                    title: 'Decentralized Privacy',
                    description: 'User-controlled data sharing and consent.',
                    year: 'Privacy',
                    icon: <FaLock className='text-4xl text-brand-green' />,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.standard}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className='relative pl-24 pr-8 pb-16 last:pb-0'
                  >
                    <div className='absolute left-4 top-6 w-9 h-9 rounded-full bg-white dark:bg-gray-900 border-4 border-brand-blue shadow-lg flex items-center justify-center'>
                      <div className='w-3 h-3 rounded-full bg-brand-blue' />
                    </div>

                    <TransformCard
                      className='p-8'
                      background='bg-white dark:bg-gray-800'
                      border='border border-gray-200 dark:border-gray-700'
                      shadow='lg'
                    >
                      <div className='flex items-start gap-6'>
                        <div className='shrink-0'>
                          {item.icon}
                        </div>
                        <div className='flex-1'>
                          <div className='flex items-center gap-3 mb-3'>
                            <Typography variant='h4' className='text-xl font-bold text-gray-700 dark:text-white'>
                              {item.title}
                            </Typography>
                            <span className='text-xs px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-mono'>
                              {item.standard}
                            </span>
                          </div>
                          <Typography variant='body2' color='muted' className='text-sm leading-relaxed'>
                            {item.description}
                          </Typography>
                        </div>
                      </div>
                    </TransformCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className='relative py-20 bg-linear-to-br from-brand-purple/5 via-brand-blue/10 to-brand-green/5 dark:from-brand-purple/15 dark:via-brand-blue/15 dark:to-brand-green/15 overflow-hidden'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6),transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.7),transparent_70%)]' />
          <div className='relative container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <div className='text-center mb-12'>
                <div className='text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] mb-4 text-center'>
                  <span className='text-gray-600 dark:text-gray-500'>//</span> THREE_PILLARS
                </div>
                <Typography variant='h2' align='center' className='text-2xl sm:text-3xl md:text-4xl font-mono font-bold'>
                  <span className='text-gray-700 dark:text-white'>Identity, Discovery & </span>
                  <Typography as='span' variant='h2' gradient='brand' className='inline bg-[length:200%_auto] animate-[gradient_8s_ease-in-out_infinite] [animation-direction:alternate]'>
                    Coordination
                  </Typography>
                </Typography>
              </div>

              <div className='grid md:grid-cols-3 gap-8'>
                {[
                  {
                    icon: <FaShieldAlt className='text-5xl text-brand-blue' />,
                    title: 'Identity',
                    description: 'Unified, verifiable agent registration using HCS standards.',
                  },
                  {
                    icon: <FaSearch className='text-5xl text-brand-purple' />,
                    title: 'Discovery',
                    description: 'Real-time indexing and intelligent search across all networks.',
                  },
                  {
                    icon: <FaExchangeAlt className='text-5xl text-brand-green' />,
                    title: 'Coordination',
                    description: 'Ledger-backed credits and standardized interaction protocols.',
                  },
                ].map((pillar, index) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <TransformCard
                      className='h-full p-8'
                      background='bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm'
                      border='border border-white/60 dark:border-gray-800'
                      shadow='lg'
                    >
                      <div className='flex flex-col items-center text-center gap-4'>
                        <div className='flex items-center justify-center w-24 h-24 rounded-2xl bg-linear-to-br from-brand-purple/10 via-brand-blue/10 to-brand-green/10 dark:from-brand-purple/20 dark:via-brand-blue/20 dark:to-brand-green/20'>
                          {pillar.icon}
                        </div>
                        <Typography variant='h3' className='text-2xl font-mono font-bold text-gray-700 dark:text-white'>
                          {pillar.title}
                        </Typography>
                        <Typography variant='body1' color='muted' className='text-sm leading-relaxed'>
                          {pillar.description}
                        </Typography>
                      </div>
                    </TransformCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className='py-20 bg-white dark:bg-gray-950'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <div className='text-center mb-12'>
                <div className='text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] mb-4 text-center'>
                  <span className='text-gray-600 dark:text-gray-500'>//</span> ECOSYSTEM
                </div>
                <Typography variant='h2' align='center' className='text-2xl sm:text-3xl md:text-4xl font-mono font-bold mb-4'>
                  <span className='text-gray-700 dark:text-white'>Indexing the </span>
                  <Typography as='span' variant='h2' gradient='brand' className='inline bg-[length:200%_auto] animate-[gradient_8s_ease-in-out_infinite] [animation-direction:alternate]'>
                    Agentic Ecosystem
                  </Typography>
                </Typography>
                <Typography variant='body1' color='muted' align='center' className='text-base sm:text-lg max-w-2xl mx-auto'>
                  Live integrations across major protocols
                </Typography>
              </div>

              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6'>
                {[
                  { name: 'Virtuals', badge: 'Live' },
                  { name: 'A2A', badge: 'Live' },
                  { name: 'ERC-8004', badge: 'Live' },
                  { name: 'x402 Bazaar', badge: 'Live' },
                  { name: 'OpenConvAI', badge: 'Live' },
                ].map((network, index) => (
                  <motion.div
                    key={network.name}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    className='relative group'
                  >
                    <div className='absolute inset-0 bg-linear-to-br from-brand-purple/20 via-brand-blue/20 to-brand-green/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity' />
                    <div className='relative bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center h-full flex flex-col justify-center items-center gap-3'>
                      <FaPlug className='text-3xl text-brand-blue' />
                      <Typography variant='h6' className='font-mono font-bold text-gray-700 dark:text-white'>
                        {network.name}
                      </Typography>
                      <span className='text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-mono'>
                        {network.badge}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className='text-center mt-12'>
                <Typography variant='body1' align='center' className='text-base sm:text-lg font-mono font-medium text-gray-600 dark:text-gray-400 tracking-wide'>
                  More integrations in development...
                </Typography>
              </div>
            </div>
          </div>
        </section>

        <section className='relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-black dark:via-slate-900 dark:to-black text-white overflow-hidden'>
          <motion.div
            animate={{
              x: [0, 80, 0],
              y: [0, -60, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className='absolute top-10 left-10 w-96 h-96 bg-brand-purple/15 rounded-full blur-3xl'
          />
          <motion.div
            animate={{
              x: [0, -70, 0],
              y: [0, 50, 0],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className='absolute bottom-10 right-10 w-[32rem] h-[32rem] bg-brand-blue/20 rounded-full blur-3xl'
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className='absolute top-1/3 right-1/4 w-80 h-80 bg-brand-green/15 rounded-full blur-3xl'
          />
          <div className='relative container mx-auto px-4'>
            <div className='max-w-5xl mx-auto text-center space-y-12'>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className='space-y-4 py-6'
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className='text-xs font-mono text-white/80 dark:text-gray-400 uppercase tracking-[0.3em] mb-6'
                >
                  <span className='text-white/60 dark:text-gray-500'>//</span> GET_STARTED
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className='relative inline-block'
                >
                  <div className='absolute inset-0 bg-linear-to-r from-white/20 via-white/30 to-white/20 dark:from-brand-purple dark:via-brand-blue dark:to-brand-green blur-2xl opacity-50' />
                  <Typography variant='h2' align='center' gradient='brand' className='relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-8 bg-[length:200%_auto] animate-[gradient_8s_ease-in-out_infinite] [animation-direction:alternate]'>
                    Join Us to Build the Future
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Typography variant='h4' align='center' className='text-lg sm:text-xl text-white/90 dark:text-gray-300 leading-relaxed font-normal'>
                    We welcome everyone to help build the next stage of computing.
                  </Typography>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto py-8'
              >
                {[
                  {
                    icon: <FaCode className='text-4xl' />,
                    title: 'Open Source',
                    desc: 'All code, all standards, completely transparent',
                  },
                  {
                    icon: <FaGlobeAmericas className='text-4xl' />,
                    title: 'Global Community',
                    desc: 'Built by developers worldwide, for everyone',
                  },
                  {
                    icon: <FaLink className='text-4xl' />,
                    title: 'True Interoperability',
                    desc: 'No lock-in, no gatekeepers, just connection',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className='bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10'
                  >
                    <div className='text-brand-blue mb-3'>
                      {item.icon}
                    </div>
                    <Typography variant='h5' className='text-lg font-bold text-white mb-2'>
                      {item.title}
                    </Typography>
                    <Typography variant='body2' className='text-sm text-white/70 dark:text-gray-400'>
                      {item.desc}
                    </Typography>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className='flex justify-center items-center py-4'
              >
                <PrimaryButton href='/docs#getting-started/quick-start.md' variant='primary' umamiEvent='mcp-footer-get-started'>
                  <span className='flex items-center gap-3 text-xl px-6 py-2'>
                    <FaRocket className='w-7 h-7' />
                    Start with Hashnet MCP
                  </span>
                </PrimaryButton>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
