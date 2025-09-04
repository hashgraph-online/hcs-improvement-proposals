import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCode,
  FiPackage,
  FiZap,
  FiArrowRight,
  FiArrowLeft,
  FiExternalLink,
  FiBook,
  FiMic,
  FiMessageCircle,
  FiMail,
  FiTerminal,
  FiDollarSign,
  FiShoppingBag,
} from 'react-icons/fi';
import { FaPalette, FaRocket, FaFlask } from 'react-icons/fa';
import Typography from '../components/ui/Typography';
import { Button } from '../components/ui/button';
import NewsletterModal from '../components/ui/NewsletterModal';

interface TrackCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  links: { label: string; href: string }[];
  color: string;
}

const StartPage: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string | null>('hacker');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [finishedSteps, setFinishedSteps] = useState<Set<number>>(new Set()); // Tracks both completed and skipped
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] =
    useState<boolean>(false);

  const STORAGE_KEY = 'startPageProgress';

  // Load saved progress on mount (browser only)
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as {
        currentStep?: number;
        completedSteps?: number[];
        finishedSteps?: number[];
        selectedTrack?: string | null;
      };
      if (parsed.selectedTrack !== undefined) {
        setSelectedTrack(parsed.selectedTrack);
      }
      if (typeof parsed.currentStep === 'number') {
        setCurrentStep(Math.min(Math.max(parsed.currentStep, 1), 5));
      }
      if (Array.isArray(parsed.completedSteps)) {
        setCompletedSteps(new Set(parsed.completedSteps));
      }
      if (Array.isArray(parsed.finishedSteps)) {
        setFinishedSteps(new Set(parsed.finishedSteps));
      }
    } catch {
      // ignore malformed storage
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist progress when it changes
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const payload = {
        currentStep,
        completedSteps: Array.from(completedSteps),
        finishedSteps: Array.from(finishedSteps),
        selectedTrack,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore write errors
    }
  }, [currentStep, completedSteps, finishedSteps, selectedTrack]);

  const completeStep = (step: number) => {
    setCompletedSteps((prev) => new Set([...prev, step]));
    setFinishedSteps((prev) => new Set([...prev, step]));
    if (step < 5) {
      setTimeout(() => setCurrentStep(step + 1), 1000); // Auto-advance after 1 second
    }
  };

  const skipStep = (step: number) => {
    setFinishedSteps((prev) => new Set([...prev, step]));
    if (step < 5) {
      setTimeout(() => setCurrentStep(step + 1), 300);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step < 1 || step > 5) {
      return;
    }
    if (step > currentStep) {
      const previousSteps = Array.from({ length: step - 1 }, (_, i) => i + 1);
      setFinishedSteps((prev) => new Set([...prev, ...previousSteps]));
    }
    setCurrentStep(step);
  };

  // Calculate progress to align with dot positions: 0%, 25%, 50%, 75%, 100%
  // Step 1=0%, Step 2=25%, Step 3=50%, Step 4=75%, Step 5=100%
  const progress = (currentStep - 1) * 25;

  const tracks: TrackCard[] = [
    {
      id: 'developer',
      icon: <FiCode className='text-3xl' />,
      title: "I'm a Developer",
      description: 'Start coding with our SDKs, Agent Kit, and standards.',
      links: [
        {
          label: '$1M Hackathon',
          href: 'https://hashgraphonline.com/hackathon',
        },
        { label: 'GitHub', href: 'https://github.com/hashgraph-online' },
        { label: 'Documentation', href: '/docs/libraries' },
        {
          label: 'Conversational Agent',
          href: '/docs/libraries/conversational-agent',
        },
        { label: 'Desktop App', href: '/desktop' },
      ],
      color: '#5599fe',
    },
    {
      id: 'hacker',
      icon: <FiTerminal className='text-3xl' />,
      title: "I'm a Hacker",
      description:
        'Win from $1 Million in prizes in the Hedera Africa Hackathon',
      links: [
        {
          label: '$1M Hackathon',
          href: 'https://hashgraphonline.com/hackathon',
        },
        {
          label: 'Register Now',
          href: 'https://link.hashgraphonline.com/hederahacks',
        },
        { label: 'Tools', href: '/tools' },
        { label: 'GitHub', href: 'https://github.com/hashgraph-online' },
        { label: 'Documentation', href: '/docs/libraries' },
      ],
      color: '#3f4174',
    },
    {
      id: 'degen',
      icon: <FaRocket className='text-3xl' />,
      title: "I'm a Degen",
      description:
        'The first step into the rabbit HOL. (see what we did there? 😉)',
      links: [
        { label: 'Create a Wallet', href: 'https://hashpack.app' },
        { label: 'Hedera x AI Spaces', href: 'https://x.com/HashgraphOnline' },
        { label: 'Join Telegram', href: 'https://t.me/hashinals' },
        { label: 'Blog', href: '/blog' },
      ],
      color: '#48df7b',
    },
    {
      id: 'creator',
      icon: <FaPalette className='text-3xl' />,
      title: "I'm a Creator",
      description: 'Put your NFTs and content 100% on-chain.',
      links: [{ label: 'Hashinals', href: 'https://kiloscribe.com' }],
      color: '#a679f0',
    },
  ];

  const getToolsForTrack = (trackId: string) => {
    const commonTools = [
      {
        name: '$1M Hackathon',
        description:
          'Win from $1 Million in prizes in the Hedera Africa Hackathon',
        icon: <FiDollarSign />,
        link: 'https://hashgraphonline.com/hackathon',
        color: '#14b8a6',
      },
    ];

    switch (trackId) {
      case 'developer':
        return [
          ...commonTools,
          {
            name: 'Desktop App',
            description: 'Desktop application for Hedera development tools',
            icon: <FiMessageCircle />,
            link: '/desktop',
            color: '#5599fe',
          },
          {
            name: 'Standards Agent Kit',
            description: 'Build intelligent agents that interact with Hedera',
            icon: <FiPackage />,
            link: '/docs/libraries/standards-agent-kit',
            color: '#48df7b',
          },
          {
            name: 'Standards SDK',
            description:
              'JavaScript library for HCS (Hashgraph Consensus Standards) implementation',
            icon: <FaFlask />,
            link: '/docs/libraries/standards-sdk',
            color: '#ff6b6b',
          },
          {
            name: 'Conversational Agent',
            description: 'AI-powered assistant for Hedera development',
            icon: <FiZap />,
            link: '/docs/libraries/conversational-agent',
            color: '#a679f0',
          },
          {
            name: 'Standards Docs',
            description: 'Technical standards for building on Hedera',
            icon: <FiBook />,
            link: '/docs/libraries',
            color: '#7c85d3',
          },
        ];

      case 'hacker':
        return [
          ...commonTools,
          {
            name: 'Moonscape',
            description: 'Trustless AI Agent Communication Portal on Hedera',
            icon: <FaRocket />,
            link: 'https://moonscape.tech',
            color: '#a679f0',
          },
          {
            name: 'Desktop App',
            description: 'Desktop application for Hedera development tools',
            icon: <FiMessageCircle />,
            link: '/desktop',
            color: '#5599fe',
          },
          {
            name: 'Standards Agent Kit',
            description: 'Build intelligent agents that interact with Hedera',
            icon: <FiPackage />,
            link: '/docs/libraries/standards-agent-kit',
            color: '#48df7b',
          },
          {
            name: 'Standards SDK',
            description:
              'JavaScript library for HCS (Hashgraph Consensus Standards) implementation',
            icon: <FaFlask />,
            link: '/docs/libraries/standards-sdk',
            color: '#ff6b6b',
          },
        ];

      case 'degen':
        return [
          {
            name: 'Create a Wallet',
            description: 'Get started with HashPack wallet for Hedera',
            icon: <FiShoppingBag />,
            link: 'https://www.hashpack.app/',
            color: '#48df7b',
          },
          {
            name: 'Follow on X',
            description: 'Stay connected with Hashgraph Online on X',
            icon: <FiExternalLink />,
            link: 'https://x.com/HashgraphOnline',
            color: '#a679f0',
          },
          {
            name: 'Blog',
            description: 'Stay updated with latest news and insights',
            icon: <FiBook />,
            link: 'https://hashgraphonline.com/blog/',
            color: '#5599fe',
          },
        ];

      case 'creator':
        return [
          {
            name: 'Put Your Work On-Chain',
            description:
              'Create and inscribe NFTs 100% on-chain with Kiloscribe',
            icon: <FaPalette />,
            link: 'https://kiloscribe.com/',
            color: '#a679f0',
          },
          {
            name: 'NFT Marketplace',
            description: 'Trade and discover NFTs on SentX marketplace',
            icon: <FiShoppingBag />,
            link: 'https://sentx.io/',
            color: '#64748b',
          },
        ];

      default:
        return commonTools;
    }
  };

  return (
    <Layout
      title='Get Started | Hashgraph Online'
      description='Choose your path and start building on Hedera with our open tools and standards'
    >
      <div className='min-h-screen bg-white dark:bg-gray-900'>
        {/* Progress Header */}
        <div className='sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4'>
            {/* Progress Bar */}
            <div className='max-w-2xl mx-auto'>
              <div className='relative'>
                <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                  <motion.div
                    className='h-full bg-gradient-to-r from-[#48df7b] via-[#5599fe] to-[#a679f0] rounded-full'
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  />
                </div>

                {/* Step Indicators */}
                <div className='absolute -top-1 left-0 w-full h-8'>
                  {[1, 2, 3, 4, 5].map((step) => (
                    <motion.div
                      key={step}
                      className={`absolute w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 cursor-pointer ${
                        completedSteps.has(step)
                          ? 'bg-green-500 border-green-500 text-white'
                          : finishedSteps.has(step)
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : currentStep === step
                          ? 'bg-white border-[#5599fe] shadow-lg'
                          : 'bg-gray-300 border-gray-300'
                      }`}
                      style={{
                        left: `calc(${(step - 1) * 20}% + 16px)`, // Position dots with padding: 16px, 36%, 56%, 76%, 96% of container width
                      }}
                      whileHover={{ scale: 1.1 }}
                      animate={
                        finishedSteps.has(step) ? { scale: [1, 1.2, 1] } : {}
                      }
                      data-umami-event={`goto-step-${step}`}
                      data-umami-event-category='navigation'
                      onClick={() => goToStep(step)}
                    >
                      {completedSteps.has(step)
                        ? '✓'
                        : finishedSteps.has(step)
                        ? '→'
                        : step}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div
          className='flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-black dark:to-blue-950/30 relative'
          style={{ minHeight: 'calc(100vh - 120px)' }}
        >
          <div className='absolute inset-0 z-0'>
            <motion.div
              className='absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#5599fe]/10 to-[#a679f0]/10 rounded-full blur-3xl'
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className='absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-[#48df7b]/10 to-[#5599fe]/10 rounded-full blur-3xl'
              animate={{
                x: [0, -30, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
            {/* Step 1: Newsletter */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className='text-center max-w-2xl mx-auto'
              >
                <Typography
                  variant='h1'
                  className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4'
                >
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#a679f0] via-[#48df7b] to-[#5599fe]'>
                    Join Our Newsletter
                  </span>
                </Typography>
                <Typography
                  variant='body'
                  className='text-lg text-gray-600 dark:text-gray-300 mb-6'
                >
                  Get the latest updates on HCS standards, tools, and ecosystem
                  developments delivered to your inbox.
                </Typography>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl cursor-pointer mb-6'
                >
                  <div className='flex justify-center mb-4'>
                    <div className='w-16 h-16 rounded-full bg-[#a679f0]/10 flex items-center justify-center'>
                      <FiMail className='text-3xl text-[#a679f0]' />
                    </div>
                  </div>
                  <Typography
                    variant='body'
                    className='text-sm text-gray-600 dark:text-gray-400 mb-4'
                  >
                    Stay informed with weekly updates, new tools, and important
                    announcements.
                  </Typography>
                  <div
                    className='inline-flex items-center gap-2 px-6 py-3 bg-[#a679f0] text-white rounded-lg font-semibold'
                    data-umami-event='newsletter-subscribe'
                    data-umami-event-category='engagement'
                    onClick={() => {
                      setIsNewsletterModalOpen(true);
                      completeStep(1);
                    }}
                  >
                    Subscribe Now <FiMail />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#a679f0]/10 to-[#a679f0]/20 hover:from-[#a679f0]/20 hover:to-[#a679f0]/30 border border-[#a679f0]/30 text-[#a679f0] dark:text-[#a679f0] rounded-xl font-medium cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg'
                  data-umami-event='skip-step-1'
                  data-umami-event-category='navigation'
                  onClick={() => {
                    skipStep(1);
                  }}
                >
                  Skip this step <FiArrowRight className='text-sm' />
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: X Spaces */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className='text-center max-w-2xl mx-auto'
              >
                <Typography
                  variant='h1'
                  className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4'
                >
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#5599fe] via-[#a679f0] to-[#48df7b]'>
                    Hedera x AI Spaces
                  </span>
                </Typography>
                <Typography
                  variant='body'
                  className='text-lg text-gray-600 dark:text-gray-300 mb-6'
                >
                  Join our Hedera x AI Space every Thursday at 12PM ET — Ask
                  questions, win $100, and connect live with builders.
                </Typography>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl cursor-pointer mb-6'
                >
                  <div className='flex justify-center mb-4'>
                    <div className='w-16 h-16 rounded-full bg-[#5599fe]/10 flex items-center justify-center'>
                      <FiMic className='text-3xl text-[#5599fe]' />
                    </div>
                  </div>
                  <Typography
                    variant='body'
                    className='text-sm text-gray-600 dark:text-gray-400 mb-4'
                  >
                    Connect with the Hedera x AI community, get your questions
                    answered, and participate in weekly giveaways.
                  </Typography>
                  <div
                    className='inline-flex items-center gap-2 px-6 py-3 bg-[#5599fe] text-white rounded-lg font-semibold'
                    data-umami-event='external-link-x-twitter'
                    data-umami-event-category='social'
                    onClick={() => {
                      completeStep(2);
                      window.open('https://x.com/HashgraphOnline', '_blank');
                    }}
                  >
                    Join Hedera x AI <FiExternalLink />
                  </div>
                </motion.div>

                <div className='flex justify-center gap-4'>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-700 dark:text-gray-200 rounded-xl font-medium cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg'
                    data-umami-event='back-step-2'
                    data-umami-event-category='navigation'
                    onClick={goBack}
                  >
                    <FiArrowLeft className='text-[#5599fe]' /> Back
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5599fe]/10 to-[#5599fe]/20 hover:from-[#5599fe]/20 hover:to-[#5599fe]/30 border border-[#5599fe]/30 text-[#5599fe] dark:text-[#5599fe] rounded-xl font-medium cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg'
                    data-umami-event='skip-step-2'
                    data-umami-event-category='navigation'
                    onClick={() => skipStep(2)}
                  >
                    Skip this step <FiArrowRight className='text-sm' />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Telegram */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className='text-center max-w-2xl mx-auto'
              >
                <Typography
                  variant='h1'
                  className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4'
                >
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#48df7b] via-[#5599fe] to-[#a679f0]'>
                    Telegram Community
                  </span>
                </Typography>
                <Typography
                  variant='body'
                  className='text-lg text-gray-600 dark:text-gray-300 mb-6'
                >
                  Join our dev & degen chat for real-time discussions, alpha,
                  and community support.
                </Typography>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl cursor-pointer mb-6'
                >
                  <div className='flex justify-center mb-4'>
                    <div className='w-16 h-16 rounded-full bg-[#48df7b]/10 flex items-center justify-center'>
                      <FiMessageCircle className='text-3xl text-[#48df7b]' />
                    </div>
                  </div>
                  <Typography
                    variant='body'
                    className='text-sm text-gray-600 dark:text-gray-400 mb-4'
                  >
                    Get instant access to our active community of builders,
                    share projects, and get help when you need it.
                  </Typography>
                  <div
                    className='inline-flex items-center gap-2 px-6 py-3 bg-[#48df7b] text-white rounded-lg font-semibold'
                    data-umami-event='external-link-telegram'
                    data-umami-event-category='social'
                    onClick={() => {
                      completeStep(3);
                      window.open('https://t.me/hashinals', '_blank');
                    }}
                  >
                    Join Telegram <FiExternalLink />
                  </div>
                </motion.div>

                <div className='flex justify-center gap-4'>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-700 dark:text-gray-200 rounded-xl font-medium cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg'
                    data-umami-event='back-step-3'
                    data-umami-event-category='navigation'
                    onClick={goBack}
                  >
                    <FiArrowLeft className='text-[#5599fe]' /> Back
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#a679f0]/10 to-[#a679f0]/20 hover:from-[#a679f0]/20 hover:to-[#a679f0]/30 border border-[#a679f0]/30 text-[#a679f0] dark:text-[#a679f0] rounded-xl font-medium cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg'
                    data-umami-event='skip-step-3'
                    data-umami-event-category='navigation'
                    onClick={() => skipStep(3)}
                  >
                    Skip this step <FiArrowRight className='text-sm' />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Choose Your Path */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className='text-center max-w-6xl mx-auto'
              >
                <Typography
                  variant='h1'
                  className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4'
                >
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#5599fe] via-[#a679f0] to-[#48df7b]'>
                    Choose Your Path
                  </span>
                </Typography>
                <Typography
                  variant='body'
                  className='text-lg text-gray-600 dark:text-gray-300 mb-6'
                >
                  Not a dev? Not a problem. Our tools are made for builders and
                  believers.
                </Typography>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                  {tracks.map((track, index) => (
                    <motion.div
                      key={track.id}
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg cursor-pointer'
                      data-umami-event={`select-track-${track.id}`}
                      data-umami-event-category='onboarding'
                      onClick={() => {
                        setSelectedTrack(track.id);
                        setTimeout(() => completeStep(4), 500);
                      }}
                    >
                      <div className='flex flex-row items-start gap-3 mb-3'>
                        <div
                          className='flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 mt-1'
                          style={{ backgroundColor: `${track.color}20` }}
                        >
                          <div style={{ color: track.color }}>{track.icon}</div>
                        </div>
                        <div className='flex-1'>
                          <Typography
                            variant='h4'
                            className='text-lg font-bold text-left mb-1'
                          >
                            <span style={{ color: track.color }}>
                              {track.title}
                            </span>
                          </Typography>
                          <Typography
                            variant='body'
                            className='text-xs text-gray-600 dark:text-gray-400 text-left'
                          >
                            {track.description}
                          </Typography>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className='flex justify-center mb-8'>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-700 dark:text-gray-200 rounded-xl font-semibold cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl'
                    data-umami-event='back-step-4'
                    data-umami-event-category='navigation'
                    onClick={goBack}
                  >
                    <FiArrowLeft className='text-[#5599fe]' /> Back
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Explore Tools */}
            {currentStep === 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                className='text-center max-w-6xl mx-auto relative'
              >
                {/* Floating celebration elements */}
                <motion.div
                  className='absolute -top-10 left-1/4 w-6 h-6 bg-[#48df7b] rounded-full opacity-20'
                  animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className='absolute -top-8 right-1/3 w-4 h-4 bg-[#5599fe] rounded-full opacity-20'
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.3, 1],
                    rotate: [0, -180, -360],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                />
                <motion.div
                  className='absolute -top-12 right-1/4 w-5 h-5 bg-[#a679f0] rounded-full opacity-20'
                  animate={{
                    y: [0, -25, 0],
                    scale: [1, 1.1, 1],
                    rotate: [0, 90, 180],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.3,
                    type: 'spring',
                    bounce: 0.4,
                  }}
                >
                  <Typography
                    variant='h1'
                    className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4'
                  >
                    <motion.span
                      className='text-transparent bg-clip-text bg-gradient-to-r from-[#a679f0] via-[#48df7b] to-[#5599fe]'
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{ backgroundSize: '200% 200%' }}
                    >
                      Welcome to the Hashgraph Online Ecosystem!
                    </motion.span>
                  </Typography>
                </motion.div>

                <motion.div
                  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {getToolsForTrack(selectedTrack).map((tool, index) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 50, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotateY: [0, 360, 0],
                      }}
                      transition={{
                        delay: 1 + index * 0.15,
                        duration: 0.8,
                        type: 'spring',
                        bounce: 0.4,
                        rotateY: { duration: 0.6, delay: 1 + index * 0.15 },
                      }}
                      whileHover={{
                        y: -12,
                        scale: 1.05,
                        rotateX: 5,
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      className='bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg cursor-pointer relative overflow-hidden'
                      data-umami-event={`select-tool-${tool.name
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`}
                      data-umami-event-category='tool-selection'
                      onClick={() => {
                        completeStep(5);
                        window.open(
                          tool.link.startsWith('http')
                            ? tool.link
                            : `${window.location.origin}${tool.link}`,
                          '_blank'
                        );
                      }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full'
                        animate={{ x: [-100, 400] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 2 + index * 0.3,
                          repeatDelay: 3,
                        }}
                      />
                      <div className='flex flex-row items-start gap-3 mb-3'>
                        <motion.div
                          className='flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 mt-1'
                          style={{ backgroundColor: `${tool.color}20` }}
                          animate={{
                            boxShadow: [
                              `0 0 0 0 ${tool.color}20`,
                              `0 0 0 8px ${tool.color}10`,
                              `0 0 0 0 ${tool.color}20`,
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 1.5 + index * 0.2,
                          }}
                        >
                          <motion.div
                            style={{ color: tool.color }}
                            className='text-2xl'
                            animate={{
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: 2 + index * 0.1,
                              repeatDelay: 2,
                            }}
                          >
                            {tool.icon}
                          </motion.div>
                        </motion.div>
                        <div className='flex-1'>
                          <Typography
                            variant='h4'
                            className='text-lg font-bold text-left mb-1'
                          >
                            <span style={{ color: tool.color }}>
                              {tool.name}
                            </span>
                          </Typography>
                          <Typography
                            variant='body'
                            className='text-xs text-gray-600 dark:text-gray-400 text-left'
                          >
                            {tool.description}
                          </Typography>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    boxShadow: [
                      '0 0 0 0 rgba(85, 153, 254, 0.3)',
                      '0 0 0 10px rgba(85, 153, 254, 0.1)',
                      '0 0 0 0 rgba(85, 153, 254, 0.3)',
                    ],
                  }}
                  transition={{
                    delay: 3,
                    duration: 0.8,
                    type: 'spring',
                    bounce: 0.3,
                    boxShadow: { duration: 2, repeat: Infinity, delay: 4 },
                  }}
                  whileHover={{
                    scale: 1.08,
                    y: -4,
                    boxShadow: '0 10px 30px rgba(85, 153, 254, 0.3)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  className='flex justify-center mt-6 mb-8'
                >
                  <div
                    className='inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#5599fe]/10 via-[#5599fe]/20 to-[#5599fe]/10 hover:from-[#5599fe]/20 hover:via-[#5599fe]/30 hover:to-[#5599fe]/20 border border-[#5599fe]/30 text-[#5599fe] dark:text-[#5599fe] rounded-2xl font-bold cursor-pointer transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-sm'
                    data-umami-event='back-step-5'
                    data-umami-event-category='navigation'
                    onClick={goBack}
                  >
                    <FiArrowLeft className='text-lg' /> Back to Previous Step
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />
    </Layout>
  );
};

export default StartPage;
