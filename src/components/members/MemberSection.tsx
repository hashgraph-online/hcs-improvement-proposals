import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
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
    primary: '#374151',
    secondary: '#6b7280',
    accent: '#9ca3af',
    background: 'from-gray-50 to-slate-50 dark:from-gray-950 dark:to-slate-950',
    text: 'text-gray-900 dark:text-gray-100',
    personality: 'professional',
    gradient: 'from-gray-700 to-slate-800',
    icon: FiDatabase,
    logo: '/logo_icons/SentX.png',
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
    specialty: 'Mirror Node Infrastructure',
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    messageStyle: 'technical-enterprise',
    brandElements: [
      'Query Hedera Data',
      'Enterprise APIs',
      'Mirror Node Hosting',
    ],
  },
  LaunchBadge: {
    primary: '#ea580c',
    secondary: '#c2410c',
    accent: '#f97316',
    background:
      'from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950',
    text: 'text-orange-900 dark:text-orange-100',
    personality: 'professional',
    gradient: 'from-orange-500 to-amber-600',
    icon: FiLayers,
    logo: '/logo_icons/Launchbadge.png',
    specialty: 'Software Engineering',
    fontFamily: 'system-ui, sans-serif',
    messageStyle: 'technical-excellence',
    brandElements: [
      'Build Hedera Apps',
      'SDK Development',
      'Wallet Integration',
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
    name: 'LaunchBadge',
    description:
      'LaunchBadge is a software engineering company dedicated to fostering excellence at the cutting edge of technology. We believe that the future of software is in the hands of those who are passionate about innovation.',
    logo: '/img/logos/lb_logo.png',
    website: 'https://launchbadge.com',
    realWorldFocus:
      'Premier Hedera development firm with verified deepest ecosystem expertise. Built fundamental infrastructure: official SDKs, MyHbarWallet (canonical), Kabuto API/Explorer, Hedera Developer Portal, Trezor/Ledger apps.',
    theme: {
      ...brandProfiles['LaunchBadge'],
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
  const theme = member.theme;
  const IconComponent = theme.icon;

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
        } rounded-r-xl p-4 group`}
        style={{
          borderLeftColor: isActive ? theme.primary : 'transparent',
          paddingTop: '1.25rem',
          paddingRight: '1.5rem',
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
              className={`w-16 h-16 rounded-2xl object-contain p-3 transition-all duration-500 relative ${
                isActive ? 'shadow-xl' : 'shadow-md'
              }`}
              style={{
                backgroundColor: isActive ? `${theme.primary}15` : '#f9fafb',
                border: isActive
                  ? `3px solid ${theme.primary}40`
                  : '3px solid transparent',
              }}
            >
              <img
                src={theme.logo}
                alt={member.name}
                className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-110'
              />

              {/* Floating icon indicator - positioned to avoid clipping */}
              <div
                className={`absolute top-0 right-0 w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 z-20 ${
                  isActive ? 'scale-100 rotate-0' : 'scale-75 rotate-12'
                }`}
                style={{
                  backgroundColor: theme.primary,
                  transform: 'translate(25%, -25%)',
                }}
              >
                <IconComponent className='w-3 h-3 text-white' />
              </div>
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
                  src={member.logo}
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

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    }, 10000); // Increased to 10 seconds for much better readability

    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeMember = teamMembers[activeIndex];
  const activeTheme = activeMember.theme;

  return (
    <section className='relative py-20 lg:py-32 bg-gray-50 dark:bg-gray-950 overflow-hidden'>
      <AnimatedBackground
        variant='lines'
        colors={['brand-functions', 'brand-variables']}
        intensity='low'
        opacity={0.03}
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 mb-6 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full backdrop-blur-sm'>
            <FiTerminal className='w-4 h-4' />
            <Typography className='text-xs font-mono text-brand-functions uppercase tracking-[0.3em] m-0'>
              Consortium Members
            </Typography>
          </div>

          <Typography
            variant='h2'
            className='text-4xl sm:text-5xl lg:text-6xl font-mono font-black text-gray-900 dark:text-white leading-tight mb-6'
          >
            <GradientText gradient='brand' as='span'>
              Consortium
            </GradientText>
            <br />
            Organizations
          </Typography>

          <Typography
            color='muted'
            className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'
          >
            10 pioneering organizations building the core infrastructure, tools,
            and applications that power the Hashgraph Online ecosystem.
          </Typography>
        </div>

        <div className='max-w-6xl mx-auto'>
          <div className='bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
            <div className='bg-gray-100 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <div className='flex gap-1.5'>
                    <div className='w-3 h-3 rounded-full bg-red-400'></div>
                    <div className='w-3 h-3 rounded-full bg-yellow-400'></div>
                    <div className='w-3 h-3 rounded-full bg-green-400'></div>
                  </div>
                  <div className='text-sm font-mono text-gray-700 dark:text-gray-300'>
                    consortium-members.dev
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div
                    className='px-2 py-1 rounded text-xs font-mono'
                    style={{
                      backgroundColor: `${activeTheme.primary}15`,
                      color: activeTheme.primary,
                    }}
                  >
                    {activeTheme.specialty}
                  </div>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className='p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors'
                  >
                    {isPlaying ? (
                      <FiPause className='w-4 h-4 text-gray-600 dark:text-gray-400' />
                    ) : (
                      <FiPlay className='w-4 h-4 text-gray-600 dark:text-gray-400' />
                    )}
                  </button>
                  <div className='text-xs text-gray-500 dark:text-gray-400'>
                    {teamMembers.length} organizations
                  </div>
                </div>
              </div>
            </div>

            <div className='flex'>
              <div className='w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col'>
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
                  className='flex-1 px-2 py-3 space-y-1 overflow-y-auto overflow-x-visible'
                  style={{ maxHeight: '440px' }}
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
              </div>

              <div className='flex-1 p-8'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className={`bg-gradient-to-br ${activeTheme.background} rounded-2xl p-6 border transition-all duration-500`}
                    style={{ borderColor: `${activeTheme.primary}30` }}
                  >
                    <div className='mb-6'>
                      <div className='flex items-center gap-4 mb-4'>
                        <div
                          className='w-16 h-16 rounded-xl object-contain p-2 transition-colors duration-500 relative'
                          style={{
                            backgroundColor: `${activeTheme.primary}15`,
                          }}
                        >
                          <img
                            src={activeTheme.logo}
                            alt={activeMember.name}
                            className='w-full h-full object-contain'
                          />
                        </div>
                        <div>
                          <Typography
                            variant='h3'
                            className='text-2xl font-mono font-bold transition-colors duration-500 text-gray-900 dark:text-white'
                          >
                            {activeMember.name}
                          </Typography>
                          <Typography
                            className={`text-sm font-mono mb-1 transition-colors duration-500`}
                          >
                            <span style={{ color: activeTheme.primary }}>
                              {activeTheme.specialty}
                            </span>
                          </Typography>
                          <a
                            href={activeMember.website}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='font-mono hover:underline transition-colors duration-500'
                            style={{ color: activeTheme.primary }}
                          >
                            {activeMember.website.replace('https://', '')}
                          </a>

                          {activeTheme.brandElements && (
                            <div className='flex flex-wrap gap-2 mt-3'>
                              {activeTheme.brandElements.map((element, idx) => (
                                <span
                                  key={idx}
                                  className='text-xs px-3 py-1 rounded-full font-medium'
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

                    <div className='space-y-6'>
                      <div>
                        <Typography
                          variant='h4'
                          className='text-sm font-mono font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2'
                        >
                          About
                        </Typography>
                        <Typography className='text-lg leading-relaxed transition-colors duration-500 text-gray-900 dark:text-white'>
                          {activeMember.description}
                        </Typography>
                      </div>

                      {activeMember.metrics && (
                        <div>
                          <Typography
                            variant='h4'
                            className='text-sm font-mono font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2'
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
                              <span className='font-mono transition-colors duration-500 text-gray-900 dark:text-white'>
                                {activeMember.metrics.primaryMetric}
                              </span>
                              <span
                                className='text-2xl font-bold'
                                style={{
                                  color: activeTheme.primary,
                                }}
                              >
                                {activeMember.metrics.value}
                              </span>
                            </div>
                            <Typography className='text-sm transition-colors duration-500 text-gray-700 dark:text-gray-300'>
                              {activeMember.metrics.description}
                            </Typography>
                          </div>
                        </div>
                      )}

                      {activeMember.contribution && (
                        <div className='bg-gray-900 dark:bg-gray-800 rounded-xl p-4'>
                          <Typography
                            variant='h4'
                            className='font-mono mb-2 text-white'
                          >
                            Consortium Contribution
                          </Typography>
                          <Typography
                            variant='body'
                            color='white'
                            className='text-sm'
                          >
                            {activeMember.contribution}
                          </Typography>
                        </div>
                      )}

                      <div className='flex gap-3'>
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
                  src={activeTheme.logo}
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
              <Typography
                variant='h4'
                className='font-semibold text-gray-900 dark:text-white mb-2'
              >
                About
              </Typography>
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
              <div className='bg-gray-900 dark:bg-gray-800 rounded-xl p-4'>
                <Typography variant='h4' className='font-mono mb-2 text-white'>
                  Consortium Contribution
                </Typography>
                <Typography variant='body' color='white' className='text-sm'>
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
