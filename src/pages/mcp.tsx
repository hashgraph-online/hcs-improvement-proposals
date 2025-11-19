import Layout from '@theme/Layout';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Typography,
  PrimaryButton,
  TransformCard,
  Terminal,
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

  const [packageManager, setPackageManager] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');

  const commands = {
    npm: 'npx -y @hol-org/hashnet-mcp@latest quickstart',
    pnpm: 'pnpm dlx @hol-org/hashnet-mcp@latest quickstart',
    yarn: 'yarn dlx @hol-org/hashnet-mcp@latest quickstart',
    bun: 'bun x @hol-org/hashnet-mcp@latest quickstart',
  };

  const installCommand = commands[packageManager];

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

                <div className='relative max-w-3xl mx-auto'>
                  <Terminal 
                    title='hashnet-setup.exe' 
                    className='relative z-10' 
                    theme='system'
                    headerActions={
                      <>
                        {(['npm', 'pnpm', 'yarn', 'bun'] as const).map((pm) => (
                          <button
                            key={pm}
                            onClick={() => setPackageManager(pm)}
                            className={`text-xs font-mono font-bold uppercase tracking-wider transition-colors px-2 py-1 rounded outline-none border-none focus:outline-none focus:ring-0 ${
                              packageManager === pm
                                ? 'text-brand-green bg-brand-green/10'
                                : 'text-gray-400 dark:text-gray-800 hover:text-gray-700 dark:hover:text-gray-500'
                            }`}
                          >
                            {pm}
                          </button>
                        ))}
                      </>
                    }
                  >
                    <div className='flex flex-col justify-center min-h-[120px]'>
                      <div className='flex justify-center'>
                        <Terminal.Line
                          prompt='>'
                          command={installCommand}
                          clickable
                          onClick={() => handleCopyCode(installCommand)}
                        />
                      </div>
                      <div className='mt-2 text-center'>
                        {copiedCode === installCommand && (
                          <div className='text-xs font-mono text-green-400'>
                            ✓ Command copied to clipboard
                          </div>
                        )}
                      </div>
                      <div className='text-[10px] font-mono text-gray-500 border-t border-gray-200 dark:border-gray-800 mt-1 pt-1'>
                        <span className='text-gray-600'>[SYSTEM_CHECK]</span> ERC-8004: <span className='text-green-500'>DETECTED</span> | x402: <span className='text-green-500'>ONLINE</span>
                      </div>
                    </div>
                  </Terminal>
                </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='flex flex-col sm:flex-row justify-center items-center gap-4 pt-2'
              >
                <PrimaryButton
                  href='/docs/registry-broker/mcp-server'
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
                  href='https://mcp.org/registry/search'
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

        <div className='w-full bg-slate-100 dark:bg-gray-950 border-y border-slate-200 dark:border-gray-800 overflow-hidden py-3 relative z-10'>
          <div className='absolute inset-0 bg-brand-blue/3'></div>
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className='flex whitespace-nowrap w-fit'
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className='flex items-center gap-16 px-8'>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 bg-green-500/70 rounded-full animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.5)]' />
                  <span className='text-sm font-mono font-bold text-gray-400 dark:text-gray-400 uppercase tracking-[0.15em]'>
                    Find and connect to any agent on the planet
                  </span>
                </div>
                <span className='text-brand-blue/40 font-mono text-lg'>///</span>
                <div className='flex items-center gap-3'>
                  <FaGlobeAmericas className='text-brand-blue/70 animate-pulse' />
                  <span className='text-sm font-mono font-bold text-brand-blue/80 uppercase tracking-[0.15em]'>
                    Native x402 & ERC-8004 Support
                  </span>
                </div>
                <span className='text-brand-blue/40 font-mono text-lg'>///</span>
              </div>
            ))}
          </motion.div>
        </div>

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

                <div className='relative grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto'>
                  <div className='col-span-2 md:col-span-3 flex justify-center mb-8'>
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
                    { label: 'AI_AGENTS', color: 'purple', code: 'CONNECT', status: 'ONLINE' },
                    { label: 'MCP_SERVERS', color: 'blue', code: 'INIT', status: 'ACTIVE' },
                    { label: 'x402_PAYMENTS', color: 'green', code: 'SYNC', status: 'READY' },
                    { label: 'ERC-8004_STD', color: 'purple', code: 'REGISTER', status: 'LOADED' },
                    { label: 'INFRASTRUCTURE', color: 'blue', code: 'SCALE', status: 'OPTIMAL' },
                    { label: 'DATA_STREAMS', color: 'green', code: 'STREAM', status: 'FLOWING' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                      className='relative group'
                    >
                      <div className='bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-sm p-1 shadow-sm'>
                        <div className='bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-4 relative overflow-hidden'>
                          <div className={`absolute top-0 left-0 w-1 h-full bg-brand-${item.color}`} />
                          <div className='flex justify-between items-start mb-3'>
                            <div className='text-[10px] font-mono text-gray-400'>
                              MOD_{index.toString().padStart(2, '0')}
                            </div>
                            <div className={`w-2 h-2 rounded-full bg-brand-${item.color} animate-pulse`} />
                          </div>
                          <Typography variant='body2' className='font-mono font-bold text-gray-700 dark:text-white mb-1 tracking-tight'>
                            {item.label}
                          </Typography>
                          <div className='flex items-center gap-2 mt-2'>
                            <span className='text-[10px] font-mono text-brand-blue bg-brand-blue/10 px-1 rounded'>
                              {item.code}()
                            </span>
                            <span className='text-[10px] font-mono text-green-500'>
                              [{item.status}]
                            </span>
                          </div>
                        </div>
                      </div>
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
                    title: 'Full ERC-8004 Support',
                    description: 'Production-grade implementation of the ERC-8004 standard.',
                    highlight: 'Live now',
                    color: 'purple',
                  },
                  {
                    title: 'Universal x402 Payments',
                    description: 'Credit-based transactions from any blockchain implementing x402.',
                    highlight: 'Multi-chain',
                    color: 'blue',
                  },
                  {
                    title: 'Multi-Protocol Indexing',
                    description: 'Indexing Virtuals, A2A, ERC-8004, x402 Bazaar, OpenConvAI, and more.',
                    highlight: 'Growing',
                    color: 'green',
                  },
                  {
                    title: 'Identity & Trust',
                    description: 'Unified, verifiable agent identity with ledger-backed credits.',
                    highlight: 'Secure',
                    color: 'purple',
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
                      className='h-full p-8 overflow-hidden relative'
                      background='bg-gray-50 dark:bg-gray-800'
                      border='border border-gray-200 dark:border-gray-700'
                      shadow='md'
                    >
                      <div className='absolute -top-6 -right-6 text-9xl font-bold text-gray-200/50 dark:text-gray-700/20 font-mono select-none pointer-events-none'>
                        0{index + 1}
                      </div>
                      <div className='relative z-10'>
                        <div className='flex items-center gap-3 mb-4'>
                          <div className={`w-1 h-8 bg-brand-${item.color} rounded-full`} />
                          <Typography variant='h5' className='text-xl font-mono font-bold text-gray-700 dark:text-white'>
                            {item.title}
                          </Typography>
                        </div>
                        <span className='inline-block text-xs px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-mono mb-4'>
                          {item.highlight}
                        </span>
                        <Typography variant='body2' color='muted' className='text-base leading-relaxed'>
                          {item.description}
                        </Typography>
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
                        <div className='shrink-0 pt-1'>
                          {item.icon}
                        </div>
                        <div className='flex-1'>
                          <div className='flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2'>
                            <Typography variant='h4' className='text-xl font-bold text-gray-700 dark:text-white'>
                              {item.title}
                            </Typography>
                            <span className='text-xs px-2.5 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue font-mono font-medium border border-brand-blue/20'>
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
                    title: 'IDENTITY',
                    description: 'Unified, verifiable agent registration using HCS standards.',
                    color: 'purple',
                    icon: 'ID',
                  },
                  {
                    title: 'DISCOVERY',
                    description: 'Real-time indexing and intelligent search across all networks.',
                    color: 'blue',
                    icon: 'SRCH',
                  },
                  {
                    title: 'COORDINATION',
                    description: 'Ledger-backed credits and standardized interaction protocols.',
                    color: 'green',
                    icon: 'SYNC',
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
                    <div className='h-full bg-gray-100 dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-800'>
                      <div className='h-full bg-white dark:bg-black rounded-md p-8 relative overflow-hidden group border border-gray-200 dark:border-gray-800'>
                        <div className='absolute top-0 right-0 p-4 opacity-20 font-mono text-4xl font-bold text-gray-300 dark:text-gray-700 select-none'>
                          0{index + 1}
                        </div>
                        <div className={`w-16 h-16 mb-6 rounded-lg bg-brand-${pillar.color}/10 flex items-center justify-center border border-brand-${pillar.color}/20`}>
                          <span className={`font-mono font-bold text-brand-${pillar.color}`}>
                            {pillar.icon}
                          </span>
                        </div>
                        <Typography variant='h3' className='text-lg font-mono font-bold text-gray-700 dark:text-white mb-3'>
                          {pillar.title}
                        </Typography>
                        <Typography variant='body1' color='muted' className='text-sm leading-relaxed font-mono'>
                          {pillar.description}
                        </Typography>
                        <div className={`absolute bottom-0 left-0 w-full h-1 bg-brand-${pillar.color}/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                      </div>
                    </div>
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

              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'>
                {[
                  { name: 'Virtuals', badge: 'CONNECTED', latency: '12ms' },
                  { name: 'A2A Network', badge: 'CONNECTED', latency: '24ms' },
                  { name: 'ERC-8004', badge: 'CONNECTED', latency: '08ms' },
                  { name: 'x402 Bazaar', badge: 'CONNECTED', latency: '15ms' },
                  { name: 'OpenConvAI', badge: 'CONNECTED', latency: '31ms' },
                ].map((network, index) => (
                  <motion.div
                    key={network.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                    }}
                    className='group'
                  >
                    <div className='bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 rounded-sm hover:border-brand-blue/50 transition-colors relative overflow-hidden'>
                      <div className='flex justify-between items-center mb-2'>
                        <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]' />
                        <span className='text-[10px] font-mono text-gray-500'>{network.latency}</span>
                      </div>
                      <Typography variant='body2' className='font-mono font-bold text-gray-700 dark:text-gray-300 group-hover:text-brand-blue dark:group-hover:text-white transition-colors mb-1'>
                        {network.name}
                      </Typography>
                      <div className='text-[10px] font-mono text-brand-blue/80'>
                        [{network.badge}]
                      </div>
                      <div className='absolute bottom-0 left-0 w-full h-[2px] bg-brand-blue/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left' />
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
                <PrimaryButton href='/docs/registry-broker/mcp-server' variant='primary' umamiEvent='mcp-footer-get-started'>
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
