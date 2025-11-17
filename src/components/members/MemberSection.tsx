import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  FiTerminal,
  FiGitBranch,
  FiPlay,
  FiPause,
  FiTrendingUp,
  FiShield,
  FiCode,
  FiZap,
  FiDatabase,
  FiCpu,
  FiSettings,
  FiTarget,
  FiUsers,
  FiLayers,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import SecondaryButton from '../SecondaryButton';
import PrimaryButton from '../PrimaryButton';
import Modal from '../Modal';
import { GradientText, AnimatedBackground } from '../ui';
import { Typography } from '../ui';

interface MemberTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  personality:
    | 'professional'
    | 'technical'
    | 'creative'
    | 'futuristic'
    | 'venture'
    | 'enterprise';
  gradient: string;
  icon: React.ComponentType<any>;
  logo: string;
  logoDark?: string;
  specialty: string;
  fontFamily: string;
  messageStyle: string;
  brandElements: string[];
}

interface TeamMember {
  name: string;
  description: string;
  logo: string;
  website: string;
  contribution?: string;
  theme: MemberTheme;
  realWorldFocus: string;
  metrics?: {
    primaryMetric: string;
    value: string;
    description: string;
  };
}

const brandProfiles: Record<string, MemberTheme> = {
  'Bonzo Finance': {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#a855f7',
    background:
      'from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950',
    text: 'text-indigo-900 dark:text-indigo-100',
    personality: 'professional',
    gradient: 'from-indigo-500 to-purple-600',
    icon: FiTrendingUp,
    logo: '/logo_icons/Bonzo.png',
    logoDark: '/logo_icons/Bonzo_Dark.png',
    specialty: 'DeFi Lending Protocol',
    fontFamily: '"SuisseIntl", system-ui, sans-serif',
    messageStyle: 'corporate-finance',
    brandElements: ['Lend & Borrow HBAR', 'Earn Yield', 'DeFi Liquidity'],
  },
  HashPack: {
    primary: '#8a1b7a',
    secondary: '#9d4edd',
    accent: '#c77dff',
    background:
      'from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950',
    text: 'text-purple-900 dark:text-purple-100',
    personality: 'creative',
    gradient: 'from-purple-500 to-pink-600',
    icon: FiShield,
    logo: '/logo_icons/Hashpack.png',
    specialty: 'Leading Hedera Wallet',
    fontFamily: 'system-ui, sans-serif',
    messageStyle: 'community-creative',
    brandElements: [
      'Store Crypto Securely',
      'Collect NFTs',
      'Connect to dApps',
    ],
  },
  SentX: {
    primary: '#64748b',
    secondary: '#94a3b8',
    accent: '#cbd5e1',
    background: 'from-gray-50 to-slate-50 dark:from-gray-950 dark:to-slate-950',
    text: 'text-gray-900 dark:text-gray-100',
    personality: 'professional',
    gradient: 'from-slate-600 to-slate-700',
    icon: FiDatabase,
    logo: '/logo_icons/SentX.png',
    logoDark: '/logo_icons/SentX_Dark.png',
    specialty: 'Leading NFT Marketplace',
    fontFamily: 'system-ui, sans-serif',
    messageStyle: 'trading-professional',
    brandElements: [
      'Buy & Sell NFTs',
      'Discover Collections',
      'Track Market Data',
    ],
  },
  Neuron: {
    primary: '#0ea5e9',
    secondary: '#0284c7',
    accent: '#0369a1',
    background: 'from-sky-50 to-blue-50 dark:from-sky-950 dark:to-blue-950',
    text: 'text-sky-900 dark:text-sky-100',
    personality: 'futuristic',
    gradient: 'from-sky-500 to-blue-600',
    icon: FiCpu,
    logo: '/logo_icons/Neuron.png',
    logoDark: '/logo_icons/Neuron_Dark.png',
    specialty: 'Machine-to-Machine Commerce',
    fontFamily: '"Inter", system-ui, sans-serif',
    messageStyle: 'futuristic-technical',
    brandElements: ['AI Agent Payments', 'M2M Commerce', 'Edge Computing'],
  },
  KiloScribe: {
    primary: '#7c3aed',
    secondary: '#5b21b6',
    accent: '#8b5cf6',
    background:
      'from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950',
    text: 'text-violet-900 dark:text-violet-100',
    personality: 'technical',
    gradient: 'from-violet-500 to-purple-600',
    icon: FiCode,
    logo: '/logo_icons/Kiloscribe.png',
    logoDark: '/logo_icons/Kiloscribe_Dark.png',
    specialty: 'On-Graph File Storage',
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    messageStyle: 'code-as-brand',
    brandElements: ['Store Files On-Chain', 'Create Hashinals', 'Build Games'],
  },
  'Builder Labs': {
    primary: '#2563eb',
    secondary: '#1d4ed8',
    accent: '#3b82f6',
    background:
      'from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950',
    text: 'text-blue-900 dark:text-blue-100',
    personality: 'venture',
    gradient: 'from-blue-500 to-indigo-600',
    icon: FiTarget,
    logo: '/logo_icons/Buidler Labs.png',
    specialty: 'Venture Studio',
    fontFamily: 'system-ui, sans-serif',
    messageStyle: 'venture-professional',
    brandElements: [
      'Build Web3 Projects',
      'Launch Startups',
      'Hardware Wallets',
    ],
  },
  Hashgate: {
    primary: '#059669',
    secondary: '#047857',
    accent: '#10b981',
    background:
      'from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950',
    text: 'text-emerald-900 dark:text-emerald-100',
    personality: 'professional',
    gradient: 'from-emerald-500 to-green-600',
    icon: FiSettings,
    logo: '/logo_icons/Hashgate.png',
    specialty: 'Payment Gateway',
    fontFamily: 'system-ui, sans-serif',
    messageStyle: 'fintech-professional',
    brandElements: [
      'Accept HBAR Payments',
      'Merchant Integration',
      'Payment Processing',
    ],
  },
  Hgraph: {
    primary: '#0ea5e9',
    secondary: '#0284c7',
    accent: '#0369a1',
    background: 'from-sky-50 to-blue-50 dark:from-sky-950 dark:to-blue-950',
    text: 'text-sky-900 dark:text-sky-100',
    personality: 'enterprise',
    gradient: 'from-sky-500 to-blue-600',
    icon: FiUsers,
    logo: '/logo_icons/HGRAPH.png',
    logoDark: '/logo_icons/HGraph_Dark.png',
    specialty: 'Mirror Node Infrastructure',
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    messageStyle: 'technical-enterprise',
    brandElements: [
      'Query Hedera Data',
      'Enterprise APIs',
      'Mirror Node Hosting',
    ],
  },
  Tashi: {
    primary: '#ea580c',
    secondary: '#c2410c',
    accent: '#f97316',
    background:
      'from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950',
    text: 'text-orange-900 dark:text-orange-100',
    personality: 'futuristic',
    gradient: 'from-orange-500 to-amber-600',
    icon: FiLayers,
    logo: '/logo_icons/Tashi.png',
    specialty: 'Real-Time Mesh Network',
    fontFamily: 'system-ui, sans-serif',
    messageStyle: 'futuristic-technical',
    brandElements: [
      'Robotic Orchestration',
      'AI Agent Coordination',
      'Decentralized MQTT',
    ],
  },
  Turtlemoon: {
    primary: '#0891b2',
    secondary: '#0e7490',
    accent: '#06b6d4',
    background: 'from-cyan-50 to-teal-50 dark:from-cyan-950 dark:to-teal-950',
    text: 'text-cyan-900 dark:text-cyan-100',
    personality: 'creative',
    gradient: 'from-cyan-500 to-teal-600',
    icon: FiZap,
    logo: '/logo_icons/Turtlemoon.png',
    specialty: 'Web3 Platforms',
    fontFamily: 'system-ui, sans-serif',
    messageStyle: 'developer-friendly',
    brandElements: ['Web3 Development', 'Platform Creation', 'Ecosystem Tools'],
  },
};

const teamMembers: TeamMember[] = [
  {
    name: 'Bonzo Finance',
    description:
      'Bonzo Finance is The Liquidity Layer of Hedera — an open source, non-custodial lending protocol based on Aave, designed to facilitate the lending and borrowing of digital assets.',
    logo: '/img/logos/bonzo.png',
    website: 'https://bonzo.finance',
    contribution:
      'Bonzo Finance actively utilizes HCS-20 as part of their points leaderboard.',
    realWorldFocus:
      'Leading DeFi lending protocol with professional financial platform providing transparent incentive systems, yield optimization, and regulatory compliance for institutional and retail users. Battle-tested Aave v2 architecture.',
    theme: {
      ...brandProfiles['Bonzo Finance'],
    },
  },
  {
    name: 'Builder Labs',
    description:
      'Buidler Labs is a venture studio focused on Web3 solutions, with an emphasis on Hedera',
    logo: '/img/logos/builder-labs.png',
    website: 'https://buidlerlabs.com',
    realWorldFocus:
      'Venture studio with verified portfolio: Headstarter (project accelerator), MemeJob (tradeable coins), TOMAS Finance (investment platform), Citadel Wallet (hardware), plus open-source initiatives.',
    theme: {
      ...brandProfiles['Builder Labs'],
    },
  },
  {
    name: 'HashPack',
    description:
      'HashPack is the leading wallet on Hedera and is the gateway to services and assets across the entire Hedera ecosystem.',
    logo: '/img/logos/hashpack.png',
    website: 'https://hashpack.app',
    contribution:
      'HashPack actively supports and renders hashinal NFTs inside our wallet, enabling users and creators to take advantage of this innovative standard.',
    realWorldFocus:
      'Gateway to Hedera ecosystem with non-custodial security, biometric authentication, audited codebase, and strong community partnerships. Extensive theme system and collectible integration.',
    theme: {
      ...brandProfiles['HashPack'],
    },
  },
  {
    name: 'Hashgate',
    description:
      'HashGate is your reliable non-custodial payment gateway, combining speed, security, and simplicity. Experience decentralized payments like they should be.',
    logo: '/img/logos/hashgate.svg',
    website: 'https://hashgate.app',
    realWorldFocus:
      'Payment infrastructure enabling seamless HBAR transactions for merchants and businesses. Focus on security, user experience, and bridging traditional commerce with decentralized payments.',
    theme: {
      ...brandProfiles['Hashgate'],
    },
  },
  {
    name: 'Hgraph',
    description:
      'Hgraph is a trusted software engineering firm and Hedera mirror node provider. For enterprise, startups, and developers.',
    logo: '/img/logos/hgraph.svg',
    website: 'https://hgraph.com',
    contribution:
      'Hgraph is proud to provide infrastructure for Hashgraph Online and continue developing methods to further enhance data accessibility of information stored using HCS standards.',
    realWorldFocus:
      'Enterprise infrastructure trusted by HashPack, Bonzo Finance, and Hedera foundation. Own hardware, AI Assistant, GraphQL/REST/JSON-RPC APIs starting at $18/mo from verified research.',
    theme: {
      ...brandProfiles['Hgraph'],
    },
  },
  {
    name: 'Tashi',
    description:
      'Tashi Network is a real-time, global mesh network that empowers robotics communication, AI agent coordination, multiplayer gaming and IoT interactions. Tashi mesh eliminates dependency on central servers, allowing almost instantaneous sync between machines.',
    logo: '/img/logos/tashi.png',
    website: 'https://tashi.network',
    realWorldFocus:
      'Real-time mesh network with 50,000+ nodes enabling machine-to-machine coordination. Successfully closed $2M funding round led by Blockchain Founders Fund. Targets robotics, AI agents, multiplayer gaming, and IoT with decentralized MQTT (FoxMQ) and DePIN infrastructure.',
    theme: {
      ...brandProfiles['Tashi'],
    },
  },
  {
    name: 'Neuron',
    description:
      'Neuron is creating a world where machines buy from machines, facilitating a new era of agentic abundance',
    logo: '/img/logos/neuron.avif',
    website: 'https://neuron.world',
    realWorldFocus:
      'Pioneering autonomous M2M commerce with verified $3.3M+ projects awarded and 40M+ network transactions. Edge computing infrastructure unlocking premium data access for AI agents.',
    theme: {
      ...brandProfiles['Neuron'],
    },
    metrics: {
      primaryMetric: 'Projects Awarded',
      value: '$3.3M+',
      description: 'Verified project funding value',
    },
  },
  {
    name: 'SentX',
    description:
      'SentX is the leading NFT Marketplace on Hedera to buy, sell, and discover digital collectibles.',
    logo: '/img/logos/sentx-white.webp',
    website: 'https://sentx.io',
    contribution:
      'SentX actively supports and renders hashinal NFTs inside their marketplace, enabling users and creators to take advantage of this innovative standard.',
    realWorldFocus:
      'Professional NFT marketplace with non-custodial trading, developer-focused APIs, and partnerships with major Hedera projects. Dark mode interface with emphasis on analytics and ecosystem integration.',
    theme: {
      ...brandProfiles['SentX'],
    },
  },
  {
    name: 'KiloScribe',
    description:
      'Effortless storage and retrieval of on-graph files - empowering developers, creators, and influencers to build on-graph.',
    logo: '/img/logos/kiloscribe-wordmark.png',
    website: 'https://kiloscribe.com',
    contribution:
      'KiloScribe operates the Hashinals CDN, inscription tools and services.',
    realWorldFocus:
      'Verified 120K+ files stored using HCS-1, recursion capabilities, creator tools, and developer SDKs.',
    theme: {
      ...brandProfiles['KiloScribe'],
    },
    metrics: {
      primaryMetric: 'Files Stored',
      value: '120K+',
      description: 'Verified on-graph files using HCS-1',
    },
  },
  {
    name: 'Turtlemoon',
    description:
      'Creating web 3 platforms, services, and applications using Hedera',
    logo: '/img/logos/TM_logo.webp',
    website: 'https://turtlemoon.io',
    contribution:
      'Develops standards and maintains Hashinals.com for the ecosystem.',
    realWorldFocus:
      'Platform development with Web3 focus, creating services and applications that enhance the Hedera ecosystem through developer-friendly integration and user experience.',
    theme: {
      ...brandProfiles['Turtlemoon'],
    },
  },
];

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  index,
  isActive,
  onClick,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const theme = member.theme;
  const IconComponent = theme.icon;

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark') || 
                     document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className={`cursor-pointer transition-all duration-500 relative ${
          isActive
            ? `bg-gradient-to-r ${theme.background} shadow-2xl border-l-4 border-opacity-80 scale-[1.02]`
            : 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-l-4 border-transparent hover:scale-[1.01]'
        } rounded-r-xl p-3 lg:p-4 group`}
        style={{
          borderLeftColor: isActive ? theme.primary : 'transparent',
          paddingTop: '0.75rem',
          paddingRight: '1rem',
          margin: '0.25rem 0.5rem 0.25rem 0',
        }}
      >
        {/* Background gradient effect for active state */}
        {isActive && (
          <div
            className='absolute inset-0 opacity-5'
            style={{
              background: `linear-gradient(135deg, ${theme.primary}40, ${theme.secondary}20)`,
            }}
          />
        )}

        <div className='flex items-center gap-4 relative z-10'>
          <div className='relative flex-shrink-0'>
            <div
              className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl object-contain p-2 lg:p-3 transition-all duration-500 relative ${
                isActive ? 'shadow-xl' : 'shadow-md'
              } ${!isActive ? 'bg-gray-50 dark:bg-white/20' : ''}`}
              style={{
                backgroundColor: isActive ? `${theme.primary}15` : undefined,
                border: isActive
                  ? `3px solid ${theme.primary}40`
                  : '3px solid transparent',
              }}
            >
              <img
                src={isDarkMode && theme.logoDark ? theme.logoDark : theme.logo}
                alt={member.name}
                className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-110'
              />
            </div>
          </div>

          <div className='flex-1 min-w-0'>
            <Typography
              className={`text-sm font-mono font-bold transition-colors duration-500 truncate mb-2 ${
                isActive
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {member.name}
            </Typography>

            {/* Prominent specialty badge */}
            <div
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-500 ${
                isActive ? 'scale-105 shadow-md' : 'scale-100'
              }`}
              style={{
                backgroundColor: `${theme.primary}20`,
                color: theme.primary,
              }}
            >
              {theme.specialty}
            </div>

            {/* Brand elements as visual tags */}
            {isActive && theme.brandElements && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className='flex flex-wrap gap-1 mt-3'
              >
                {theme.brandElements.slice(0, 2).map((element, idx) => (
                  <span
                    key={idx}
                    className='text-xs px-2 py-0.5 rounded-full font-medium'
                    style={{
                      backgroundColor: `${theme.primary}08`,
                      color: theme.primary,
                      fontFamily:
                        theme.messageStyle === 'corporate-finance'
                          ? theme.fontFamily
                          : 'inherit',
                    }}
                  >
                    {element}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Enhanced metrics display */}
        {member.metrics && isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className='mt-4 p-3 rounded-xl transition-all duration-500 relative overflow-hidden'
            style={{ backgroundColor: `${theme.primary}10` }}
          >
            <div
              className='absolute inset-0 opacity-10'
              style={{
                background: `linear-gradient(90deg, ${theme.primary}40, transparent)`,
              }}
            />
            <div className='flex items-center justify-between relative z-10'>
              <span className='text-sm font-mono font-medium text-gray-900 dark:text-white'>
                {member.metrics.primaryMetric}
              </span>
              <span
                className='text-xl font-bold'
                style={{ color: theme.primary }}
              >
                {member.metrics.value}
              </span>
            </div>
            <Typography className='text-xs mt-1 text-gray-700 dark:text-gray-300 opacity-80'>
              {member.metrics.description}
            </Typography>
          </motion.div>
        )}

        {/* Subtle hover effect line */}
        <div
          className={`absolute bottom-0 left-0 h-0.5 transition-all duration-500 ${
            isActive ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
          style={{ backgroundColor: theme.primary }}
        />
      </motion.div>

      {showModal && (
        <Modal
          isOpen={showModal}
          handleClose={() => setShowModal(false)}
          modalTitle={`${member.name} - Consortium Member`}
        >
          <div className='space-y-6'>
            <div className='flex items-center gap-4'>
              <div
                className='w-16 h-16 rounded-lg object-contain p-2 relative'
                style={{ backgroundColor: `${theme.primary}10` }}
              >
                <img
                  src={isDarkMode && theme.logoDark ? theme.logoDark : theme.logo}
                  alt={member.name}
                  className='w-full h-full object-contain'
                />
              </div>
              <div>
                <Typography
                  variant='h3'
                  className='text-xl font-mono font-bold text-gray-900 dark:text-white'
                >
                  {member.name}
                </Typography>
                <Typography className={`text-sm font-mono mb-2`}>
                  <span style={{ color: theme.primary }}>
                    {theme.specialty}
                  </span>
                </Typography>
                <a
                  href={member.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline'
                  style={{ color: theme.primary }}
                >
                  {member.website.replace('https://', '')}
                </a>
              </div>
            </div>

            <div
              className='rounded-xl p-4'
              style={{ backgroundColor: `${theme.primary}08` }}
            >
              <Typography
                variant='h4'
                className='font-semibold text-gray-900 dark:text-white mb-2'
              >
                About
              </Typography>
              <Typography className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                {member.description}
              </Typography>
            </div>

            {member.metrics && (
              <div
                className='rounded-xl p-4'
                style={{ backgroundColor: `${theme.primary}10` }}
              >
                <Typography
                  variant='h4'
                  className='font-mono font-semibold mb-2'
                >
                  <span style={{ color: theme.primary }}>Key Metrics</span>
                </Typography>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-700 dark:text-gray-300'>
                    {member.metrics.primaryMetric}
                  </span>
                  <span
                    className='font-bold text-lg'
                    style={{ color: theme.primary }}
                  >
                    {member.metrics.value}
                  </span>
                </div>
                <Typography className='text-xs text-gray-600 dark:text-gray-400 mt-1'>
                  {member.metrics.description}
                </Typography>
              </div>
            )}

            {member.contribution && (
              <div className='rounded-xl p-4'>
                <Typography variant='h4' className='font-mono mb-2 text-white'>
                  Consortium Contribution
                </Typography>
                <Typography variant='body' color='white' className='text-sm'>
                  {member.contribution}
                </Typography>
              </div>
            )}

            <PrimaryButton href={member.website} className='w-full'>
              Visit {member.name}
            </PrimaryButton>
          </div>
        </Modal>
      )}
    </>
  );
};

export const MemberSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<'top' | 'middle' | 'bottom'>('top');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    }, 10000); // Increased to 10 seconds for much better readability

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      
      if (scrollPercentage === 0) {
        setScrollPosition('top');
      } else if (scrollPercentage >= 0.95) {
        setScrollPosition('bottom');
      } else {
        setScrollPosition('middle');
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial position
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Auto-scroll to active member
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const activeElement = scrollRef.current.children[activeIndex] as HTMLElement;
    if (!activeElement) return;
    
    const container = scrollRef.current;
    const containerHeight = container.clientHeight;
    const scrollTop = container.scrollTop;
    const elementTop = activeElement.offsetTop;
    const elementHeight = activeElement.offsetHeight;
    
    // Check if element is not fully visible
    if (elementTop < scrollTop || elementTop + elementHeight > scrollTop + containerHeight) {
      // Scroll to center the element in the container
      const targetScroll = elementTop - containerHeight / 2 + elementHeight / 2;
      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark') || 
                     document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    });
    
    return () => observer.disconnect();
  }, []);

  const activeMember = teamMembers[activeIndex];
  const activeTheme = activeMember.theme;

  return (
    <section className='relative py-12 lg:py-20 overflow-hidden'>
      <AnimatedBackground
        variant='lines'
        colors={['brand-functions', 'brand-variables']}
        intensity='low'
        opacity={0.03}
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-12'>
          <Typography
            variant='h1'
            className='text-4xl lg:text-5xl xl:text-6xl font-mono font-black text-white mb-4'
          >
            Hashgraph Online Members
          </Typography>
          <Typography
            variant='lead'
            className='text-lg lg:text-xl text-white font-bold max-w-3xl mx-auto'
          >
            10 pioneering organizations building the core infrastructure, tools, and applications that power the Hashgraph Online ecosystem.
          </Typography>
        </div>

        <div className='max-w-6xl mx-auto'>
          <div className='bg-white dark:bg-gray-900 rounded-xl lg:rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
            <div className='bg-gray-100 dark:bg-gray-800 px-4 lg:px-6 py-2 lg:py-4 border-b border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 lg:gap-4'>
                  <div className='flex gap-1 lg:gap-1.5'>
                    <div className='w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-brand-purple'></div>
                    <div className='w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-brand-blue'></div>
                    <div className='w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-green-400'></div>
                  </div>
                  <div className='text-xs lg:text-sm font-mono text-gray-700 dark:text-gray-300'>
                    consortium-members.dev
                  </div>
                </div>
                <div className='flex items-center gap-2 lg:gap-3'>
                  <div
                    className='hidden lg:block px-2 py-1 rounded text-xs font-mono'
                    style={{
                      backgroundColor: `${activeTheme.primary}15`,
                      color: activeTheme.primary,
                    }}
                  >
                    {activeTheme.specialty}
                  </div>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className='p-1 lg:p-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-all duration-200'
                  >
                    {isPlaying ? (
                      <FiPause className='w-3 h-3 lg:w-3.5 lg:h-3.5 text-gray-700 dark:text-gray-300' />
                    ) : (
                      <FiPlay className='w-3 h-3 lg:w-3.5 lg:h-3.5 text-gray-700 dark:text-gray-300' />
                    )}
                  </button>
                  <div className='hidden lg:block text-xs text-gray-500 dark:text-gray-400'>
                    {teamMembers.length} organizations
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Accordion layout */}
            <div className='lg:hidden'>
              <div className='space-y-2'>
                {teamMembers.map((member, index) => (
                  <div key={index} className='bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
                    <div className='relative'>
                      <TeamMemberCard
                        member={member}
                        index={index}
                        isActive={expandedMobile === index}
                        onClick={() => setExpandedMobile(expandedMobile === index ? null : index)}
                      />
                      <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
                        <motion.div
                          animate={{ rotate: expandedMobile === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FiChevronDown className='w-5 h-5 text-gray-500' />
                        </motion.div>
                      </div>
                    </div>
                    <AnimatePresence>
                      {expandedMobile === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className='overflow-hidden'
                        >
                          <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
                            <div className='space-y-3'>
                              <Typography className='text-sm leading-relaxed transition-colors duration-500 text-gray-900 dark:text-white'>
                                {member.description}
                              </Typography>

                              {member.metrics && (
                                <div
                                  className='rounded-xl p-4 transition-colors duration-500'
                                  style={{
                                    backgroundColor: `${member.theme.primary}10`,
                                  }}
                                >
                                  <div className='flex items-center justify-between mb-2'>
                                    <span className='text-xs font-mono transition-colors duration-500 text-gray-900 dark:text-white'>
                                      {member.metrics.primaryMetric}
                                    </span>
                                    <span
                                      className='text-lg font-bold'
                                      style={{
                                        color: member.theme.primary,
                                      }}
                                    >
                                      {member.metrics.value}
                                    </span>
                                  </div>
                                  <Typography className='text-xs transition-colors duration-500 text-gray-700 dark:text-gray-300'>
                                    {member.metrics.description}
                                  </Typography>
                                </div>
                              )}

                              {member.contribution && (
                                <div 
                                  className='rounded-xl p-4'
                                  style={{ backgroundColor: `${member.theme.primary}10` }}
                                >
                                  <Typography
                                    variant='h4'
                                    className='font-mono mb-2 font-bold text-sm'
                                    style={{ color: member.theme.primary }}
                                  >
                                    Consortium Contribution
                                  </Typography>
                                  <Typography
                                    variant='body'
                                    className='text-sm text-gray-700 dark:text-gray-300'
                                  >
                                    {member.contribution}
                                  </Typography>
                                </div>
                              )}

                              <div className='flex gap-2'>
                                <PrimaryButton
                                  href={member.website}
                                  size='small'
                                  className='flex-1'
                                >
                                  Visit {member.name}
                                </PrimaryButton>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Original layout */}
            <div className='hidden lg:flex' style={{ height: '640px' }}>
              <div className='w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full relative'>
                <div className='px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0'>
                  <div className='flex items-center gap-2 text-sm font-mono text-gray-700 dark:text-gray-300'>
                    <FiGitBranch className='w-4 h-4' />
                    <span>member directory</span>
                    <div
                      className='w-2 h-2 rounded-full animate-pulse'
                      style={{ backgroundColor: activeTheme.primary }}
                    ></div>
                  </div>
                </div>

                <div
                  ref={scrollRef}
                  className='flex-1 px-2 py-3 space-y-1 overflow-y-auto overflow-x-visible'
                >
                  {teamMembers.map((member, index) => (
                    <TeamMemberCard
                      key={index}
                      member={member}
                      index={index}
                      isActive={activeIndex === index}
                      onClick={() => setActiveIndex(index)}
                    />
                  ))}
                </div>
                
                {/* Scroll indicator */}
                {scrollPosition !== 'middle' && (
                  <div className={`absolute ${scrollPosition === 'bottom' ? 'top-14' : 'bottom-2'} left-1/2 transform -translate-x-1/2 pointer-events-none z-10`}>
                    <motion.div
                      animate={{ y: scrollPosition === 'bottom' ? [0, -5, 0] : [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className='text-gray-400 dark:text-gray-600'
                    >
                      {scrollPosition === 'bottom' ? (
                        <FiChevronUp className='w-5 h-5' />
                      ) : (
                        <FiChevronDown className='w-5 h-5' />
                      )}
                    </motion.div>
                  </div>
                )}
              </div>

              <div className='flex-1 p-8 flex items-start'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className={`bg-gradient-to-br ${activeTheme.background} rounded-2xl p-4 border transition-all duration-500 w-full`}
                    style={{ borderColor: `${activeTheme.primary}30` }}
                  >
                    <div className='mb-4'>
                      <div className='flex items-center gap-4 mb-4'>
                        <div
                          className='w-16 h-16 rounded-xl object-contain p-2 transition-colors duration-500 relative'
                          style={{
                            backgroundColor: `${activeTheme.primary}15`,
                          }}
                        >
                          <img
                            src={isDarkMode && activeTheme.logoDark ? activeTheme.logoDark : activeTheme.logo}
                            alt={activeMember.name}
                            className='w-full h-full object-contain'
                          />
                        </div>
                        <div>
                          <Typography
                            variant='h3'
                            className='text-lg font-mono font-bold transition-colors duration-500 text-gray-900 dark:text-white mb-1'
                          >
                            {activeMember.name}
                          </Typography>
                          <Typography
                            className={`text-sm font-mono transition-colors duration-500 mb-1`}
                          >
                            <span style={{ color: activeTheme.primary }}>
                              {activeTheme.specialty}
                            </span>
                          </Typography>
                          {activeTheme.brandElements && (
                            <div className='flex flex-wrap gap-2'>
                              {activeTheme.brandElements.map((element, idx) => (
                                <span
                                  key={idx}
                                  className='text-xs px-2 py-0.5 rounded-full font-medium'
                                  style={{
                                    backgroundColor: `${activeTheme.primary}15`,
                                    color: activeTheme.primary,
                                  }}
                                >
                                  {element}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <Typography className='text-sm leading-relaxed transition-colors duration-500 text-gray-900 dark:text-white'>
                        {activeMember.description}
                      </Typography>

                      {activeMember.metrics && (
                        <div>
                          <Typography
                            variant='h4'
                            className='text-xs font-mono font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2'
                          >
                            Key Metrics
                          </Typography>
                          <div
                            className='rounded-xl p-4 transition-colors duration-500'
                            style={{
                              backgroundColor: `${activeTheme.primary}10`,
                            }}
                          >
                            <div className='flex items-center justify-between mb-2'>
                              <span className='text-xs font-mono transition-colors duration-500 text-gray-900 dark:text-white'>
                                {activeMember.metrics.primaryMetric}
                              </span>
                              <span
                                className='text-lg font-bold'
                                style={{
                                  color: activeTheme.primary,
                                }}
                              >
                                {activeMember.metrics.value}
                              </span>
                            </div>
                            <Typography className='text-xs transition-colors duration-500 text-gray-700 dark:text-gray-300'>
                              {activeMember.metrics.description}
                            </Typography>
                          </div>
                        </div>
                      )}

                      {activeMember.contribution && (
                        <div 
                          className='rounded-xl p-4'
                          style={{ backgroundColor: `${activeTheme.primary}10` }}
                        >
                          <Typography
                            variant='h4'
                            className='font-mono mb-2 font-bold'
                            style={{ color: activeTheme.primary }}
                          >
                            Consortium Contribution
                          </Typography>
                          <Typography
                            variant='body'
                            className='text-sm text-gray-700 dark:text-gray-300'
                          >
                            {activeMember.contribution}
                          </Typography>
                        </div>
                      )}

                      <div className='flex gap-2'>
                        <SecondaryButton
                          className='flex-1'
                          onClick={() => setShowModal(true)}
                        >
                          View Details
                        </SecondaryButton>
                        <PrimaryButton
                          href={activeMember.website}
                          className='flex-1'
                        >
                          Visit {activeMember.name}
                        </PrimaryButton>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          isOpen={showModal}
          handleClose={() => setShowModal(false)}
          modalTitle={`${activeMember.name} - Consortium Member`}
        >
          <div className='space-y-6'>
            <div className='flex items-center gap-4'>
              <div
                className='w-16 h-16 rounded-lg object-contain p-2 relative'
                style={{ backgroundColor: `${activeTheme.primary}10` }}
              >
                <img
                  src={isDarkMode && activeTheme.logoDark ? activeTheme.logoDark : activeTheme.logo}
                  alt={activeMember.name}
                  className='w-full h-full object-contain'
                />
              </div>
              <div>
                <Typography
                  variant='h3'
                  className='text-xl font-mono font-bold text-gray-900 dark:text-white'
                >
                  {activeMember.name}
                </Typography>
                <Typography className={`text-sm font-mono mb-2`}>
                  <span style={{ color: activeTheme.primary }}>
                    {activeTheme.specialty}
                  </span>
                </Typography>
                <a
                  href={activeMember.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline'
                  style={{ color: activeTheme.primary }}
                >
                  {activeMember.website.replace('https://', '')}
                </a>
              </div>
            </div>

            <div
              className='rounded-xl p-4'
              style={{ backgroundColor: `${activeTheme.primary}08` }}
            >
              <Typography className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                {activeMember.description}
              </Typography>
            </div>

            {activeMember.metrics && (
              <div
                className='rounded-xl p-4'
                style={{ backgroundColor: `${activeTheme.primary}10` }}
              >
                <Typography
                  variant='h4'
                  className='font-mono font-semibold mb-2'
                >
                  <span style={{ color: activeTheme.primary }}>
                    Key Metrics
                  </span>
                </Typography>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-700 dark:text-gray-300'>
                    {activeMember.metrics.primaryMetric}
                  </span>
                  <span
                    className='font-bold text-lg'
                    style={{ color: activeTheme.primary }}
                  >
                    {activeMember.metrics.value}
                  </span>
                </div>
                <Typography className='text-xs text-gray-600 dark:text-gray-400 mt-1'>
                  {activeMember.metrics.description}
                </Typography>
              </div>
            )}

            {activeMember.contribution && (
              <div 
                className='rounded-xl p-4'
                style={{ backgroundColor: `${activeTheme.primary}10` }}
              >
                <Typography 
                  variant='h4' 
                  className='font-mono mb-2 font-bold'
                  style={{ color: activeTheme.primary }}
                >
                  Consortium Contribution
                </Typography>
                <Typography variant='body' className='text-sm text-gray-700 dark:text-gray-300'>
                  {activeMember.contribution}
                </Typography>
              </div>
            )}

            <PrimaryButton href={activeMember.website} className='w-full'>
              Visit {activeMember.name}
            </PrimaryButton>
          </div>
        </Modal>
      )}
    </section>
  );
};
