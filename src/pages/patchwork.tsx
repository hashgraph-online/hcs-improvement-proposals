import Layout from '@theme/Layout';
import { motion } from 'motion/react';
import { Typography, PrimaryButton } from '../components/ui';
import {
  FaCalendarAlt,
  FaClock,
  FaGlobeAmericas,
  FaVideo,
  FaUsers,
  FaLightbulb,
  FaNetworkWired,
  FaCheckCircle,
  FaCode,
  FaUserTie,
  FaBook,
  FaCloud,
  FaCubes,
  FaSearch,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

/**
 * Patchwork: AI Standards virtual conference landing page
 */
export default function PatchworkPage() {
  const [email, setEmail] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Everyone's shipping — but are we syncing?";

  /**
   * Typing animation effect
   */
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  /**
   * Handle registration form submission
   */
  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    window.open('https://forms.gle/your-registration-form', '_blank');
  };

  const presenters = [
    'Hashgraph Online (HCS-14)',
    'Ethereum Foundation – ERC-8004',
    'Anthropic – Model Context Protocol (MCP)',
    'Google – A2A Protocol at the Linux Foundation',
    'MIT Media Lab – Decentralized AI Lab (NANDA)',
    'IEEE',
    'First Person Project',
    'Distributed Trust Linux Foundation (DTLF) – Trust Over IP',
    'DIF Decentralized Trust Graph Working Group',
    'ToIP AI & Human Trust Working Group',
  ];

  const targetAudience = [
    {
      icon: <FaCode />,
      title: 'Protocol Builders',
      description:
        'Builders and maintainers of open agent, identity, and compute protocols',
      color: 'blue',
    },
    {
      icon: <FaUserTie />,
      title: 'AI Entrepreneurs',
      description: 'Entrepreneurs and engineers working on Proof-of-Control AI',
      color: 'purple',
    },
    {
      icon: <FaBook />,
      title: 'Standards Authors',
      description:
        'Standards authors and contributors (W3C, IETF, EBSI, and others)',
      color: 'green',
    },
    {
      icon: <FaCloud />,
      title: 'Hyperscaler Developers',
      description:
        'Developers at hyperscalers focused on agentic or privacy-preserving AI',
      color: 'blue',
    },
    {
      icon: <FaCubes />,
      title: 'Framework Teams',
      description:
        'Teams building federated, DePIN, or Web3 frameworks for decentralized systems',
      color: 'purple',
    },
    {
      icon: <FaSearch />,
      title: 'Researchers & Auditors',
      description:
        'Researchers, auditors, and governance leads working on interoperability',
      color: 'green',
    },
  ];

  return (
    <Layout
      title='Patchwork: AI Standards'
      description='A community working session bringing together AI standards builders to sync, align, and ensure interoperability for the agentic internet.'
    >
      <main className='bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black relative overflow-hidden'>
        {/* Animated background elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-20 left-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl animate-pulse'></div>
          <div
            className='absolute top-40 right-20 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl animate-pulse'
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className='absolute bottom-20 left-1/3 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl animate-pulse'
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        {/* Hero Section */}
        <section className='relative overflow-hidden py-12 lg:py-20'>
          <div className='absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-brand-purple/5 to-transparent animate-pulse'></div>
          <div className='absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-brand-purple/30 to-brand-blue/20 blur-3xl animate-pulse'></div>
          <div
            className='absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-brand-blue/30 to-brand-green/20 blur-3xl animate-pulse'
            style={{ animationDelay: '1.5s' }}
          ></div>

          <div className='container mx-auto px-6 lg:px-16 relative z-10'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='text-center max-w-5xl mx-auto'
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className='inline-block mb-6 px-6 py-2 bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 rounded-full border border-brand-blue/30'
              >
                <Typography className='text-sm font-mono font-normal text-brand-blue dark:text-blue-400 !mb-0'>
                  Virtual Conference • December 10, 2025
                </Typography>
              </motion.div>

              <h1 className='text-5xl lg:text-7xl font-mono font-bold mb-6'>
                <span className='text-gray-700 dark:text-white'>
                  Patchwork:{' '}
                </span>
                <span
                  className='bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text'
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  AI Standards
                </span>
              </h1>

              <Typography className='text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed'>
                A community working session bringing together AI standards
                builders to sync, align, and ensure interoperability for the
                agentic internet.
              </Typography>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className='relative inline-block mb-8 px-10 py-6 rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              >
                <div className='absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-brand-purple/20 to-brand-blue/10 rounded-full blur-3xl'></div>
                <div className='absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-brand-blue/20 to-brand-green/10 rounded-full blur-3xl'></div>
                <div className='relative'>
                  <Typography className='text-xl lg:text-2xl font-mono font-bold !mb-0'>
                    <span
                      className='bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text'
                      style={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {displayedText}
                    </span>
                    <span className='animate-pulse text-brand-purple'>
                      {displayedText.length < fullText.length && '|'}
                    </span>
                  </Typography>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <PrimaryButton
                  href='https://luma.com/rutu7j4a'
                  className='text-lg px-10 py-4'
                >
                  Register Now
                </PrimaryButton>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Event Details */}
        <section className='py-16 lg:py-24 bg-white dark:bg-gray-900'>
          <div className='container mx-auto px-6 lg:px-16'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className='max-w-6xl mx-auto'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {[
                  {
                    icon: <FaCalendarAlt />,
                    title: 'Date',
                    text: 'Wednesday, December 10, 2025',
                    colors:
                      'from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-blue-300 dark:border-blue-700',
                    iconColor: 'text-brand-blue',
                  },
                  {
                    icon: <FaClock />,
                    title: 'Time',
                    text: '10:30–3:30 PM ET',
                    colors:
                      'from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-300 dark:border-purple-700',
                    iconColor: 'text-brand-purple',
                  },
                  {
                    icon: <FaGlobeAmericas />,
                    title: 'Location',
                    text: 'Virtual',
                    colors:
                      'from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 border-green-300 dark:border-green-700',
                    iconColor: 'text-brand-green',
                  },
                  {
                    icon: <FaVideo />,
                    title: 'Format',
                    text: 'Talks, Panels & Discussions',
                    colors:
                      'from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-300 dark:border-blue-700',
                    iconColor: 'text-brand-blue',
                  },
                ].map((detail, index) => (
                  <motion.div
                    key={detail.title}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`text-center p-6 bg-gradient-to-br ${detail.colors} rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                  >
                    <div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50'></div>
                    <div className='relative z-10'>
                      <div
                        className={`${detail.iconColor} text-3xl mx-auto mb-2`}
                      >
                        {detail.icon}
                      </div>
                      <Typography className='text-base font-mono font-bold text-gray-700 dark:text-white mb-2'>
                        {detail.title}
                      </Typography>
                      <Typography className='text-sm text-gray-600 dark:text-gray-300 !mb-0'>
                        {detail.text}
                      </Typography>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Purpose & Objectives */}
        <section className='py-16 lg:py-24'>
          <div className='container mx-auto px-6 lg:px-16'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className='max-w-5xl mx-auto'
            >
              <div className='text-center mb-12'>
                <Typography
                  variant='h2'
                  className='mb-4 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text'
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Event Purpose
                </Typography>
                <Typography className='text-base text-gray-600 dark:text-gray-300 leading-relaxed'>
                  The AI ecosystem is rapidly producing new standards for
                  agents, identity, payments, and interoperability. Many
                  projects are solving similar problems in parallel, sometimes
                  causing accidental incompatibilities.
                </Typography>
                <Typography className='text-base text-gray-600 dark:text-gray-300 leading-relaxed mt-4'>
                  Patchwork is a community working session designed as a
                  "breather" — a chance for everyone building these standards to
                  sync, compare notes, and align on what's needed for a
                  cohesive, interoperable agentic internet.
                </Typography>
              </div>

              <div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                  {[
                    {
                      icon: <FaNetworkWired />,
                      title: 'Map the Landscape',
                      text: 'Lightning updates from leading projects and standards bodies to map the current AI standards landscape.',
                      color: 'blue',
                    },
                    {
                      icon: <FaSearch />,
                      title: 'Identify Gaps & Overlaps',
                      text: 'Discover overlaps, gaps, and potential collisions across emerging standards.',
                      color: 'purple',
                    },
                    {
                      icon: <FaCheckCircle />,
                      title: 'Prioritize Focus Areas',
                      text: 'Align on next steps including identity continuity, agent discovery, verifiable payments, and registry interoperability.',
                      color: 'green',
                    },
                  ].map((objective, index) => (
                    <motion.div
                      key={objective.title}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      transition={{
                        delay: index * 0.15,
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <div
                        className={`relative overflow-hidden rounded-2xl p-6 h-full transition-all duration-300 bg-gradient-to-br ${
                          objective.color === 'blue'
                            ? 'from-blue-50 via-blue-100 to-purple-50 dark:from-blue-900/20 dark:via-blue-800/20 dark:to-purple-900/20'
                            : objective.color === 'purple'
                            ? 'from-purple-50 via-purple-100 to-pink-50 dark:from-purple-900/20 dark:via-purple-800/20 dark:to-pink-900/20'
                            : 'from-green-50 via-green-100 to-teal-50 dark:from-green-900/20 dark:via-green-800/20 dark:to-teal-900/20'
                        } border-2 ${
                          objective.color === 'blue'
                            ? 'border-blue-300 dark:border-blue-700'
                            : objective.color === 'purple'
                            ? 'border-purple-300 dark:border-purple-700'
                            : 'border-green-300 dark:border-green-700'
                        } shadow-lg hover:shadow-xl`}
                      >
                        {/* Animated background gradient */}
                        <div className='absolute inset-0 opacity-10'>
                          <div
                            className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl animate-pulse ${
                              objective.color === 'blue'
                                ? 'bg-blue-400'
                                : objective.color === 'purple'
                                ? 'bg-purple-400'
                                : 'bg-green-400'
                            }`}
                          ></div>
                          <div
                            className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-2xl animate-pulse ${
                              objective.color === 'blue'
                                ? 'bg-purple-400'
                                : objective.color === 'purple'
                                ? 'bg-pink-400'
                                : 'bg-teal-400'
                            }`}
                            style={{ animationDelay: '1s' }}
                          ></div>
                        </div>

                        {/* Content */}
                        <div className='relative z-10 flex flex-col items-center'>
                          <motion.div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${
                              objective.color === 'blue'
                                ? 'bg-brand-blue text-white'
                                : objective.color === 'purple'
                                ? 'bg-brand-purple text-white'
                                : 'bg-brand-green text-white'
                            }`}
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className='text-3xl'>{objective.icon}</div>
                          </motion.div>
                          <Typography className='text-lg font-mono font-bold text-gray-700 dark:text-white mb-3 text-center'>
                            {objective.title}
                          </Typography>
                          <Typography className='text-sm text-gray-600 dark:text-gray-300 !mb-0 leading-relaxed text-center'>
                            {objective.text}
                          </Typography>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Confirmed Presenters */}
        <section className='py-16 lg:py-24 bg-white dark:bg-gray-900'>
          <div className='container mx-auto px-6 lg:px-16'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className='max-w-6xl mx-auto'
            >
              <div className='text-center mb-12'>
                <Typography
                  variant='h2'
                  className='mb-4 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text'
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Confirmed Presenters
                </Typography>
                <Typography className='text-base text-gray-600 dark:text-gray-300'>
                  Leading organizations shaping the future of AI standards
                </Typography>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {presenters.map((presenter, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className='flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-850 rounded-xl border border-gray-200 dark:border-gray-700'
                  >
                    <FaCheckCircle className='text-brand-green text-lg flex-shrink-0' />
                    <Typography className='text-sm text-gray-700 dark:text-white font-medium !mb-0'>
                      {presenter}
                    </Typography>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who Should Join */}
        <section className='py-16 lg:py-24'>
          <div className='container mx-auto px-6 lg:px-16'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className='max-w-5xl mx-auto'
            >
              <div className='text-center mb-12'>
                <Typography
                  variant='h2'
                  className='mb-4 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text'
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Who Should Join
                </Typography>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {targetAudience.map((audience, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className='group relative'
                  >
                    <div className='absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-brand-purple/10 to-brand-green/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                    <div className='relative p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
                      <motion.div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md ${
                          audience.color === 'blue'
                            ? 'bg-brand-blue text-white'
                            : audience.color === 'purple'
                            ? 'bg-brand-purple text-white'
                            : 'bg-brand-green text-white'
                        }`}
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className='text-2xl'>{audience.icon}</div>
                      </motion.div>
                      <Typography className='text-lg font-mono font-bold text-gray-700 dark:text-white mb-2'>
                        {audience.title}
                      </Typography>
                      <Typography className='text-sm text-gray-600 dark:text-gray-400 !mb-0 leading-relaxed'>
                        {audience.description}
                      </Typography>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Host Organizations */}
        <section className='py-16 lg:py-24 bg-white dark:bg-gray-900'>
          <div className='container mx-auto px-6 lg:px-16'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className='max-w-5xl mx-auto text-center'
            >
              <Typography
                variant='h2'
                className='mb-6 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text'
                style={{
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Hosted By
              </Typography>
              <Typography className='text-2xl lg:text-3xl font-mono font-bold text-brand-purple dark:text-purple-400 mb-6'>
                The Advanced AI Society
              </Typography>
              <Typography className='text-base text-gray-600 dark:text-gray-300 mb-12 leading-relaxed'>
                An industry association advancing enterprise-grade adoption of
                Proof-of-Control AI solutions that ensure verifiable trust among
                agents, humans, and infrastructure.
              </Typography>

              <div className='bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-850 rounded-2xl p-6 border border-blue-200 dark:border-gray-700 mb-6'>
                <Typography className='text-gray-700 dark:text-white font-semibold mb-3 text-center'>
                  Organized with participation from:
                </Typography>
                <div className='flex justify-center items-center gap-3'>
                  <img
                    src='/Logo_Icon.png'
                    alt='Hashgraph Online'
                    className='h-12 w-12 dark:invert'
                    style={{
                      filter:
                        'brightness(0) saturate(100%) invert(9%) sepia(5%) saturate(1298%) hue-rotate(202deg) brightness(95%) contrast(92%)',
                    }}
                  />
                  <Typography className='text-xl font-mono font-bold text-gray-700 dark:text-white !mb-0'>
                    Hashgraph Online
                  </Typography>
                </div>
              </div>

              <div className='bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-300 dark:border-gray-700 shadow-sm'>
                <div className='flex flex-wrap justify-center items-center gap-8 text-gray-700 dark:text-gray-300'>
                  <div className='text-center'>
                    <Typography className='text-sm text-gray-500 dark:text-gray-400 mb-2'>
                      Partner
                    </Typography>
                    <Typography className='text-base font-medium !mb-0'>
                      Morpheus
                    </Typography>
                  </div>
                  <span className='text-gray-400 text-lg'>•</span>
                  <div className='text-center'>
                    <Typography className='text-sm text-gray-500 dark:text-gray-400 mb-2'>
                      Knowledge Partner
                    </Typography>
                    <Typography className='text-base font-medium !mb-0'>
                      IEEE Blockchain
                    </Typography>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Hashgraph Online */}
        <section className='py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black'>
          <div className='container mx-auto px-6 lg:px-16'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='max-w-4xl mx-auto text-center'
            >
              <Typography
                variant='h3'
                className='mb-6 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text'
                style={{
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                About Hashgraph Online
              </Typography>
              <Typography className='text-base text-gray-600 dark:text-gray-300 leading-relaxed'>
                Hashgraph Online is a consortium led by a DAO, building
                open-source standards (30M+ mainnet transactions) and SDKs (1K+
                weekly downloads) for the emerging agentic internet.
              </Typography>
              <div className='mt-8 flex justify-center gap-6'>
                <PrimaryButton href='/'>Learn More About HOL</PrimaryButton>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
