import React from 'react';
import Layout from '@theme/Layout';
import { motion } from 'framer-motion';
import {
  FaGlobeAmericas,
  FaSatelliteDish,
  FaNetworkWired,
  FaExchangeAlt,
  FaLayerGroup,
  FaShieldAlt,
  FaRobot,
} from 'react-icons/fa';
import Typography from '../components/Typography';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import TransformCard from '../components/ui/TransformCard';

type HighlightItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
};

type FlowStep = {
  title: string;
  description: string;
  detail: string;
  icon: React.ReactNode;
};

type NetworkLayer = {
  title: string;
  description: string;
};

type HeroSignal = {
  label: string;
  value: string;
  description: string;
};

type HeroCard = {
  title: string;
  label: string;
  accent: string;
  description: string;
};

const highlightItems: HighlightItem[] = [
  {
    title: 'Agentic Matchmaking',
    description:
      'Intelligent discovery matches the right AI agent or MCP server to each request across every network we index.',
    icon: <FaSatelliteDish className='text-xl text-brand-purple' />,
    accent:
      'bg-gradient-to-br from-brand-purple/10 via-transparent to-brand-blue/5 dark:from-brand-purple/20 dark:to-brand-blue/10',
  },
  {
    title: 'Increased Discovery',
    description:
      'Register once and get discovered by users and other agents across all integrated networks without duplicate submissions.',
    icon: <FaLayerGroup className='text-xl text-brand-blue' />,
    accent:
      'bg-gradient-to-br from-brand-blue/10 via-transparent to-brand-purple/5 dark:from-brand-blue/20 dark:to-brand-purple/10',
  },
  {
    title: 'Unified Registry',
    description:
      'Trust verified agents through HCS-backed performance metrics, usage statistics, and community ratings surfaced in one API.',
    icon: <FaExchangeAlt className='text-xl text-brand-green' />,
    accent:
      'bg-gradient-to-br from-brand-green/10 via-transparent to-brand-blue/5 dark:from-brand-green/20 dark:to-brand-blue/10',
  },
];

const heroSignals: HeroSignal[] = [
  {
    label: 'Networks Monitored',
    value: 'Global coverage',
    description: 'Different blockchains and platforms continuously tracked.',
  },
  {
    label: 'Registries Connected',
    value: 'Unified access',
    description: 'Agent directories automatically synchronized and searchable.',
  },
  {
    label: 'Discovery Time',
    value: 'Rapid updates',
    description:
      'New agents become searchable within minutes of being published.',
  },
];

const heroCards: HeroCard[] = [
  {
    title: 'Agent Directory',
    label: 'Hedera Network',
    accent:
      'from-brand-blue/10 via-brand-purple/10 to-white/40 dark:from-brand-blue/20 dark:via-brand-purple/20 dark:to-slate-900/60',
    description: 'Secure agent listings you can verify and trust.',
  },
  {
    title: 'Cross-Platform Support',
    label: 'Multiple Networks',
    accent:
      'from-brand-purple/10 via-brand-blue/10 to-brand-green/10 dark:from-brand-purple/20 dark:via-brand-blue/20 dark:to-brand-green/20',
    description: 'Works seamlessly across Ethereum, Hedera, Solana, and more.',
  },
];

const flowSteps: FlowStep[] = [
  {
    title: 'Monitor & Collect',
    description:
      'Brokers continuously watch agent registries across different platforms and automatically gather new listings as they appear.',
    detail:
      'Compatible with all major platforms and protocols, from web APIs to blockchain networks.',
    icon: <FaNetworkWired className='text-lg text-brand-blue' />,
  },
  {
    title: 'Organize & Verify',
    description:
      'Agent information from different sources is organized into a consistent format, with trust scores and verification badges.',
    detail:
      'Automatically adds helpful tags, capabilities, and quality ratings to make choosing agents easier.',
    icon: <FaShieldAlt className='text-lg text-brand-purple' />,
  },
  {
    title: 'Search & Use',
    description:
      'Find the right agent for your needs and use it directly in your application, no matter which platform it came from.',
    detail:
      'Simple tools let you work with agents from any source without learning different systems.',
    icon: <FaGlobeAmericas className='text-lg text-brand-green' />,
  },
];

const networkLayers: NetworkLayer[] = [
  {
    title: 'Unified Agent Index',
    description:
      'A constantly updated directory of AI agents from all platforms, automatically removing duplicates and keeping information fresh.',
  },
  {
    title: 'Trust & Verification',
    description:
      'Clear ratings and verification badges help you choose reliable agents, with transparent quality scores anyone can check.',
  },
  {
    title: 'Easy Integration',
    description:
      'Simple tools and code libraries that work with any agent, making it easy to add, switch, or manage them in your projects.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function BrokersPage(): JSX.Element {
  return (
    <Layout
      title='Registry Brokers'
      description='Brokers are decentralized discovery nodes that aggregate and index agents across every registry, network, and protocol.'
    >
      <main className='bg-gradient-to-b from-white via-slate-50/80 to-white dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-950 min-h-screen text-brand-dark'>
        <section className='relative overflow-hidden pt-28 pb-24 md:pt-32 md:pb-32'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(100,115,255,0.12),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(100,115,255,0.18),_transparent_60%)]' />
          <div className='pointer-events-none absolute inset-y-0 left-1/2 w-[120vw] -translate-x-1/2 bg-[conic-gradient(from_120deg_at_50%_50%,rgba(129,85,255,0.08),rgba(56,189,248,0.08),transparent_70%)] blur-3xl' />

          <div className='relative z-10 mx-auto max-w-6xl px-6 md:px-10'>
            <div className='text-center space-y-6 mb-16'>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-white/80 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.22em] text-brand-purple shadow-sm dark:border-brand-purple/40 dark:bg-slate-950/60 dark:text-brand-purple/90'
              >
                <FaRobot className='text-base' />
                Registry Brokers
              </motion.span>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Typography
                  variant='h1'
                  className='text-4xl md:text-5xl lg:text-6xl font-mono font-black leading-tight text-brand-dark dark:text-white'
                >
                  One API for 190 agents & servers
                  <span className='block bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text text-transparent'>
                    across Virtuals, A2A, ERC-8004, x402 Bazaar, OpenConvAI, and
                    more
                  </span>
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Typography
                  variant='p'
                  color='secondary'
                  className='text-base md:text-lg max-w-3xl mx-auto'
                >
                  Brokers automatically track AI agents across different
                  networks, organize them in one searchable place, and make them
                  simple to use anywhere you build.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='flex flex-col items-center justify-center'
              >
                <PrimaryButton
                  href='https://hashgraphonline.com/connect'
                  size='large'
                  className='w-full sm:w-auto'
                >
                  Join Early Access
                </PrimaryButton>
              </motion.div>
            </div>

            <div className='relative'>
              <div className='absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-purple/15 via-brand-blue/10 to-brand-green/10 blur-3xl dark:from-brand-purple/25 dark:via-brand-blue/20 dark:to-brand-green/20' />

              <div className='grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto'>
                {heroCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + 0.1 * index,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <TransformCard
                      className='h-full p-6'
                      background={`bg-gradient-to-br ${card.accent} backdrop-blur`}
                      border='border border-white/60 dark:border-slate-800'
                      shadow='lg'
                    >
                      <Typography
                        variant='caption'
                        className='mb-2 block uppercase tracking-[0.22em] text-[9px] md:text-[10px] text-brand-purple'
                      >
                        {card.label}
                      </Typography>
                      <Typography
                        variant='h4'
                        className='mb-3 text-xl text-brand-dark dark:text-white'
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='secondary'
                        className='text-sm leading-relaxed'
                      >
                        {card.description}
                      </Typography>
                    </TransformCard>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className='mt-8 mx-auto w-fit rounded-full border border-brand-purple/30 bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 px-6 py-3 text-xs font-mono uppercase tracking-[0.25em] text-brand-purple shadow-lg dark:border-brand-purple/40 dark:from-brand-purple/20 dark:to-brand-blue/20'
              >
                Virtuals • A2A • ERC-8004 • x402 Bazaar • OpenConvAI
              </motion.div>
            </div>
          </div>
        </section>

        <section className='relative py-16 md:py-20'>
          <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent' />
          <div className='mx-auto max-w-6xl px-6 md:px-10'>
            <div className='grid md:grid-cols-[1fr,2px,1fr] gap-10 md:gap-0 items-center mb-16'>
              <div>
                <Typography
                  variant='h2'
                  className='text-3xl md:text-4xl text-brand-dark dark:text-white'
                >
                  Why use brokers
                </Typography>
                <Typography
                  variant='p'
                  color='secondary'
                  className='text-base md:text-lg'
                >
                  AI agents are scattered across dozens of platforms with
                  different formats. Brokers bring them together, match requests
                  to the right intelligence, and surface trustworthy context in
                  one API.
                </Typography>
              </div>

              <div className='hidden md:block h-full bg-gradient-to-b from-transparent via-brand-purple/30 to-transparent' />

              <div className='grid grid-cols-3 gap-4'>
                {heroSignals.map((signal, index) => (
                  <motion.div
                    key={signal.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className='text-center'
                  >
                    <Typography
                      variant='h3'
                      className='text-2xl md:text-3xl font-bold bg-gradient-to-br from-brand-purple via-brand-blue to-brand-green bg-clip-text text-transparent'
                    >
                      {signal.value}
                    </Typography>
                    <Typography
                      variant='caption'
                      className='uppercase tracking-[0.18em] text-[10px] text-brand-purple mt-1 block'
                    >
                      {signal.label}
                    </Typography>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className='grid gap-5 md:grid-cols-3'>
              {highlightItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  custom={index}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, amount: 0.35 }}
                  variants={fadeUp}
                >
                  <div
                    className={`h-full rounded-2xl border border-white/60 p-[1px] shadow-md shadow-brand-purple/5 backdrop-blur dark:border-slate-800`}
                  >
                    <div
                      className={`h-full rounded-[calc(1rem-1px)] p-6 ${item.accent}`}
                    >
                      <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 shadow dark:bg-slate-900/70'>
                        {item.icon}
                      </div>
                      <Typography
                        variant='h5'
                        className='mb-3 text-brand-dark dark:text-white'
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='secondary'
                        className='text-sm leading-relaxed'
                      >
                        {item.description}
                      </Typography>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className='relative overflow-hidden bg-gradient-to-br from-brand-purple/5 via-brand-blue/10 to-brand-purple/5 py-20 md:py-28 dark:from-brand-purple/15 dark:via-brand-blue/15 dark:to-brand-purple/15'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.6),_transparent_65%)] dark:bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.7),_transparent_70%)]' />
          <div className='relative mx-auto max-w-6xl px-6 md:px-10'>
            <div className='text-center mb-16'>
              <Typography
                variant='h2'
                className='text-3xl md:text-4xl text-brand-dark dark:text-white'
              >
                How brokers work
              </Typography>
              <Typography
                variant='p'
                color='secondary'
                className='mx-auto max-w-3xl text-base md:text-lg'
              >
                Brokers work together to keep agent information up-to-date and
                accurate. Each broker watches different platforms and shares
                what it finds with the network.
              </Typography>
            </div>

            <div className='relative'>
              <div className='absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-purple/30 via-brand-blue/30 to-brand-green/30 -translate-x-1/2 hidden md:block' />

              <div className='space-y-12'>
                {flowSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`grid md:grid-cols-2 gap-8 items-center ${
                      index % 2 === 0 ? '' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`${
                        index % 2 === 0
                          ? 'md:text-right md:pr-12'
                          : 'md:pl-12 md:col-start-2'
                      }`}
                    >
                      <div
                        className={`flex items-center gap-3 ${
                          index % 2 === 0 ? 'md:justify-end' : ''
                        }`}
                      >
                        <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple/20 via-brand-blue/20 to-brand-green/20 dark:from-brand-purple/30 dark:via-brand-blue/30 dark:to-brand-green/30 shadow-lg backdrop-blur'>
                          {step.icon}
                        </div>
                        <Typography
                          variant='h5'
                          className='text-brand-dark dark:text-white'
                        >
                          {index + 1}. {step.title}
                        </Typography>
                      </div>
                      <Typography
                        variant='body1'
                        color='secondary'
                        className='mt-3 text-sm md:text-base leading-relaxed'
                      >
                        {step.description}
                      </Typography>
                      <Typography
                        variant='caption'
                        className='mt-2 block text-xs text-brand-purple'
                      >
                        {step.detail}
                      </Typography>
                    </div>

                    <div
                      className={`${
                        index % 2 === 0
                          ? 'md:pl-12'
                          : 'md:pr-12 md:col-start-1 md:row-start-1'
                      }`}
                    >
                      <TransformCard
                        className='p-8'
                        background='bg-white/90 dark:bg-slate-950/80 backdrop-blur'
                        border='border border-white/60 dark:border-slate-800'
                        shadow='lg'
                      >
                        <div className='relative h-56 flex items-center justify-center'>
                          {index === 0 && (
                            <div className='relative w-full h-full'>
                              <motion.div
                                animate={{
                                  scale: [1, 1.1, 1],
                                  opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                }}
                                className='absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-brand-purple/20 to-brand-green/20 rounded-lg blur-2xl'
                              />
                              <div className='relative h-full flex items-center justify-center gap-6'>
                                <FaNetworkWired className='text-6xl text-brand-blue' />
                                <div className='flex flex-col gap-3'>
                                  {[...Array(3)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      animate={{ x: [0, 15, 0] }}
                                      transition={{
                                        duration: 2,
                                        delay: i * 0.3,
                                        repeat: Infinity,
                                      }}
                                      className='h-2 w-20 bg-gradient-to-r from-brand-blue to-brand-purple rounded-full'
                                    />
                                  ))}
                                </div>
                                <FaGlobeAmericas className='text-6xl text-brand-green' />
                              </div>
                            </div>
                          )}
                          {index === 1 && (
                            <div className='relative w-full h-full flex items-center justify-center'>
                              <div className='grid grid-cols-3 gap-4'>
                                {[...Array(6)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    animate={{
                                      scale: [1, 1.2, 1],
                                      backgroundColor: [
                                        'rgba(99, 102, 241, 0.3)',
                                        'rgba(139, 92, 246, 0.3)',
                                        'rgba(99, 102, 241, 0.3)',
                                      ],
                                    }}
                                    transition={{
                                      duration: 2,
                                      delay: i * 0.2,
                                      repeat: Infinity,
                                    }}
                                    className='h-14 w-14 rounded-xl border-2 border-brand-purple/30 flex items-center justify-center'
                                  >
                                    <FaShieldAlt className='text-brand-purple text-xl' />
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                          {index === 2 && (
                            <div className='relative w-full h-full'>
                              <div className='absolute inset-0 flex items-center justify-center'>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: 'linear',
                                  }}
                                  className='relative w-48 h-48'
                                >
                                  {[...Array(8)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.6, 1, 0.6],
                                      }}
                                      transition={{
                                        duration: 2,
                                        delay: i * 0.25,
                                        repeat: Infinity,
                                      }}
                                      className='absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-br from-brand-green to-brand-blue rounded-full'
                                      style={{
                                        transform: `rotate(${
                                          i * 45
                                        }deg) translate(0, -60px)`,
                                      }}
                                    />
                                  ))}
                                  <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                    <FaGlobeAmericas className='text-7xl text-brand-green' />
                                  </div>
                                </motion.div>
                              </div>
                            </div>
                          )}
                        </div>
                      </TransformCard>
                    </div>

                    <div className='absolute left-1/2 -translate-x-1/2 hidden md:block'>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className='w-6 h-6 rounded-full bg-gradient-to-br from-brand-purple via-brand-blue to-brand-green shadow-lg border-4 border-white dark:border-slate-900'
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className='relative py-20 md:py-28 overflow-hidden'>
          <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent' />
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.08),_transparent_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.12),_transparent_70%)]' />

          <div className='relative mx-auto max-w-6xl px-6 md:px-10'>
            <div className='text-center mb-16'>
              <Typography
                variant='h2'
                className='text-3xl md:text-4xl text-brand-dark dark:text-white'
              >
                Built for the future of AI
              </Typography>
              <Typography
                variant='p'
                color='secondary'
                className='mx-auto max-w-3xl text-base md:text-lg'
              >
                Brokers work with any platform and make it simple to connect
                different agent networks together.
              </Typography>
            </div>

            <div className='relative'>
              <div className='grid md:grid-cols-3 gap-8'>
                {networkLayers.map((layer, index) => (
                  <motion.div
                    key={layer.title}
                    custom={index}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    className='relative group'
                  >
                    <div className='absolute inset-0 bg-gradient-to-br from-brand-purple/20 via-brand-blue/20 to-brand-green/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100' />
                    <TransformCard
                      className='relative h-full p-6'
                      background='bg-white/90 dark:bg-slate-950/80 backdrop-blur'
                      border='border border-white/60 dark:border-slate-800'
                      shadow='lg'
                    >
                      <div className='mb-6 relative h-32 flex items-center justify-center'>
                        {index === 0 && (
                          <div className='relative w-full h-full'>
                            <motion.div
                              animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 180, 360],
                              }}
                              transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                              className='absolute inset-0 flex items-center justify-center'
                            >
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5],
                                  }}
                                  transition={{
                                    duration: 2,
                                    delay: i * 0.4,
                                    repeat: Infinity,
                                  }}
                                  className='absolute w-16 h-16 rounded-full border-2 border-brand-purple/40'
                                  style={{
                                    transform: `rotate(${
                                      i * 120
                                    }deg) translateY(-24px)`,
                                  }}
                                />
                              ))}
                            </motion.div>
                            <div className='absolute inset-0 flex items-center justify-center'>
                              <FaLayerGroup className='text-5xl text-brand-purple' />
                            </div>
                          </div>
                        )}
                        {index === 1 && (
                          <div className='relative w-full h-full flex items-center justify-center'>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                              className='absolute w-24 h-24'
                            >
                              {[...Array(6)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  animate={{
                                    scale: [1, 1.4, 1],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                  }}
                                  className='absolute top-1/2 left-1/2 w-2 h-2 bg-gradient-to-r from-brand-blue to-brand-green rounded-full'
                                  style={{
                                    transform: `rotate(${
                                      i * 60
                                    }deg) translate(0, -36px)`,
                                  }}
                                />
                              ))}
                            </motion.div>
                            <FaShieldAlt className='text-5xl text-brand-blue' />
                          </div>
                        )}
                        {index === 2 && (
                          <div className='relative w-full h-full flex items-center justify-center'>
                            <motion.div className='grid grid-cols-2 gap-3'>
                              {[...Array(4)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  animate={{
                                    y: [0, -8, 0],
                                    scale: [1, 1.1, 1],
                                  }}
                                  transition={{
                                    duration: 2,
                                    delay: i * 0.3,
                                    repeat: Infinity,
                                  }}
                                  className='w-12 h-12 rounded-lg bg-gradient-to-br from-brand-green/30 via-brand-blue/30 to-brand-purple/30 border border-brand-green/40 flex items-center justify-center'
                                >
                                  <FaExchangeAlt className='text-brand-green text-lg' />
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>
                        )}
                      </div>
                      <Typography
                        variant='h4'
                        className='mb-3 text-xl text-brand-dark dark:text-white'
                      >
                        {layer.title}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='secondary'
                        className='text-sm leading-relaxed'
                      >
                        {layer.description}
                      </Typography>
                    </TransformCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className='relative pb-28 pt-20'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(129,85,255,0.12),_transparent_60%)] dark:bg-[radial-gradient(circle_at_bottom,_rgba(129,85,255,0.18),_transparent_65%)]' />
          <div className='relative mx-auto max-w-4xl rounded-[2rem] border border-brand-purple/30 bg-white/90 px-6 py-12 text-center shadow-xl backdrop-blur dark:border-brand-purple/40 dark:bg-slate-950/85 md:px-12'>
            <Typography
              variant='h2'
              className='text-3xl md:text-4xl text-brand-dark dark:text-white'
            >
              Find, compare, and use trusted agents
            </Typography>
            <Typography
              variant='p'
              color='secondary'
              className='mx-auto mt-3 max-w-2xl text-base md:text-lg'
            >
              Brokers give you access to AI agents from across the internet in
              one place. Tap the network, review trustworthy context, and get to
              production faster.
            </Typography>

            <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5'>
              <PrimaryButton
                href='https://hashgraphonline.com/connect'
                size='large'
              >
                Join the Early Access List
              </PrimaryButton>
              <SecondaryButton href='/newsletter' size='large'>
                Join the Newsletter
              </SecondaryButton>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
