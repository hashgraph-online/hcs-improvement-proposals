import React, { useState } from 'react';
import Layout from '@theme/Layout';
import {
  FiCode,
  FiPackage,
  FiZap,
  FiArrowRight,
  FiExternalLink,
  FiBook,
  FiMessageCircle,
  FiMail,
  FiTerminal,
  FiDollarSign,
  FiShoppingBag,
  FiSearch,
} from 'react-icons/fi';
import { FaPalette, FaRocket, FaFlask } from 'react-icons/fa';
import { FaXTwitter, FaTelegram } from 'react-icons/fa6';
import Typography from '../components/ui/Typography';
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
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState<boolean>(false);

  const tracks: TrackCard[] = [
    {
      id: 'developer',
      icon: <FiCode className='text-3xl' />,
      title: "I'm a Developer",
      description: 'Start coding with our SDKs, Agent Kit, and standards.',
      links: [
        { label: '$1M Hackathon', href: 'https://hol.org/hackathon' },
        { label: 'GitHub', href: 'https://github.com/hashgraph-online' },
        { label: 'Documentation', href: '/docs/libraries' },
        { label: 'Conversational Agent', href: '/docs/libraries/conversational-agent' },
        { label: 'Desktop App', href: '/desktop' },
      ],
      color: '#5599fe',
    },
    {
      id: 'hacker',
      icon: <FiTerminal className='text-3xl' />,
      title: "I'm a Hacker",
      description: 'Win from $1 Million in prizes in the Hedera Africa Hackathon',
      links: [
        { label: '$1M Hackathon', href: 'https://hol.org/hackathon' },
        { label: 'Register Now', href: 'https://click.hol.org/hederahacks' },
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
      description: 'The first step into the rabbit HOL. (see what we did there? 😉)',
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
        description: 'Win from $1 Million in prizes in the Hedera Africa Hackathon',
        icon: <FiDollarSign />,
        link: 'https://hol.org/hackathon',
        color: '#14b8a6',
      },
    ];

    switch (trackId) {
      case 'developer':
        return [
          ...commonTools,
          { name: 'Desktop App', description: 'Desktop application for Hedera development tools', icon: <FiMessageCircle />, link: '/desktop', color: '#5599fe' },
          { name: 'Standards Agent Kit', description: 'Build intelligent agents that interact with Hedera', icon: <FiPackage />, link: '/docs/libraries/standards-agent-kit', color: '#48df7b' },
          { name: 'Standards SDK', description: 'JavaScript library for HCS (Hashgraph Consensus Standards) implementation', icon: <FaFlask />, link: '/docs/libraries/standards-sdk', color: '#ff6b6b' },
          { name: 'Conversational Agent', description: 'AI-powered assistant for Hedera development', icon: <FiZap />, link: '/docs/libraries/conversational-agent', color: '#a679f0' },
          { name: 'Standards Docs', description: 'Technical standards for building on Hedera', icon: <FiBook />, link: '/docs/libraries', color: '#7c85d3' },
          { name: 'Registry Broker', description: 'Universal directory for discovering and interacting with AI agents and MCP servers', icon: <FiSearch />, link: 'https://hol.org/registry', color: '#FFE1AF' },
        ];
      case 'hacker':
        return [
          ...commonTools,
          { name: 'Moonscape', description: 'Trustless AI Agent Communication Portal on Hedera', icon: <FaRocket />, link: 'https://moonscape.tech', color: '#a679f0' },
          { name: 'Desktop App', description: 'Desktop application for Hedera development tools', icon: <FiMessageCircle />, link: '/desktop', color: '#5599fe' },
          { name: 'Standards Agent Kit', description: 'Build intelligent agents that interact with Hedera', icon: <FiPackage />, link: '/docs/libraries/standards-agent-kit', color: '#48df7b' },
          { name: 'Standards SDK', description: 'JavaScript library for HCS (Hashgraph Consensus Standards) implementation', icon: <FaFlask />, link: '/docs/libraries/standards-sdk', color: '#ff6b6b' },
          { name: 'Registry Broker', description: 'Universal directory for discovering and interacting with AI agents and MCP servers', icon: <FiSearch />, link: 'https://hol.org/registry', color: '#FFE1AF' },
        ];
      case 'degen':
        return [
          { name: 'Create a Wallet', description: 'Get started with HashPack wallet for Hedera', icon: <FiShoppingBag />, link: 'https://www.hashpack.app/', color: '#48df7b' },
          { name: 'Follow on X', description: 'Stay connected with Hashgraph Online on X', icon: <FiExternalLink />, link: 'https://x.com/HashgraphOnline', color: '#a679f0' },
          { name: 'Blog', description: 'Stay updated with latest news and insights', icon: <FiBook />, link: 'https://hol.org/blog/', color: '#5599fe' },
        ];
      case 'creator':
        return [
          { name: 'Put Your Work On-Chain', description: 'Create and inscribe NFTs 100% on-chain with Kiloscribe', icon: <FaPalette />, link: 'https://kiloscribe.com/', color: '#a679f0' },
          { name: 'NFT Marketplace', description: 'Trade and discover NFTs on SentX marketplace', icon: <FiShoppingBag />, link: 'https://sentx.io/', color: '#64748b' },
        ];
      default:
        return commonTools;
    }
  };

  return (
    <Layout title='Hashgraph Online' description='Everything about the $1M Hedera Hackathon on a single page — plus community and tools'>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 overflow-x-hidden'>
        {/* Hero Section with Enhanced Background */}
        <div className='relative overflow-hidden'>
          <div className='absolute inset-0 z-0'>
            <div className='absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-[#5599fe]/20 to-[#a679f0]/20 rounded-full blur-3xl' />
            <div className='absolute -bottom-20 -left-40 w-96 h-96 bg-gradient-to-br from-[#48df7b]/20 to-[#5599fe]/20 rounded-full blur-3xl' />
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#a679f0]/10 via-transparent to-[#48df7b]/10 rounded-full blur-3xl' />
          </div>
          
          <div className='container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-20 sm:py-24 lg:py-32'>
            {/* Enhanced Hero Section */}
            <section 
              className='text-center max-w-6xl mx-auto'
            >
              <div
                className='mb-8'
              >
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#a679f0]/20 to-[#5599fe]/20 border border-[#a679f0]/30 mb-6'>
                  <div className='w-2 h-2 bg-[#48df7b] rounded-full animate-pulse'></div>
                  <span className='text-sm font-semibold text-[#a679f0] dark:text-[#a679f0]'>Live Now • $1M in Prizes</span>
                </div>
                <Typography variant='h1' className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight'>
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#a679f0] via-[#48df7b] to-[#5599fe] animate-gradient bg-[length:200%_200%]'>
                    Dev Community, Giveaways,<br />& $1M Hackathon
                  </span>
                </Typography>
                <Typography variant='body' className='text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed'>
                  Win from <span className='font-bold text-[#5599fe]'>$1 Million</span> in prizes, win a <span className='font-bold text-[#48df7b]'>$100</span> giveaway on our weekly X space, and build the future of AI.
                  <br />
                  Get details on our <span className='font-bold text-[#1DA1F2]'>X</span> and <span className='font-bold text-[#48df7b]'>Telegram</span>.
                </Typography>
              </div>
              
              <div
                className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'
              >
                <div
                  className='group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1DA1F2] to-[#1a91da] hover:from-[#1a91da] hover:to-[#1681c2] text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 w-full sm:w-auto sm:min-w-[220px]' 
                  data-umami-event='start-hero-twitter' 
                  onClick={() => { if (typeof window !== 'undefined') window.open('https://x.com/HashgraphOnline', '_blank'); }}
                >
                  <FaXTwitter className='text-xl' />
                  Get Details on X
                  <FiArrowRight className='text-xl group-hover:translate-x-1 transition-transform' />
                </div>
                <div
                  className='group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#48df7b] to-[#3aca6c] hover:from-[#3aca6c] hover:to-[#2fb35c] text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 w-full sm:w-auto sm:min-w-[220px]' 
                  data-umami-event='start-hero-telegram' 
                  onClick={() => { if (typeof window !== 'undefined') window.open('https://t.me/hashinals', '_blank'); }}
                >
                  <FaTelegram className='text-xl' />
                  Get Details on Telegram
                  <FiExternalLink className='text-xl group-hover:translate-x-1 transition-transform' />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className='bg-white dark:bg-gray-900 relative'>
          <div className='container mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24'>

            {/* Tools Section */}
            <section 
              className='mb-20'
            >
              <div
                className='text-center mb-12'
              >
                <div className='flex items-center justify-center gap-3 mb-4'>
                  <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-[#48df7b] to-[#5599fe] flex items-center justify-center'>
                    <FiZap className='text-white text-xl' />
                  </div>
                  <Typography variant='h2' className='text-3xl font-bold text-slate-800 dark:text-slate-100'>Developer Tools</Typography>
                </div>
                <Typography variant='body' className='text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto'>
                  Everything you need to build winning applications on Hedera. Follow our channels for hackathon details and giveaway info.
                </Typography>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {getToolsForTrack('hacker').map((tool, index) => (
                  <div 
                    key={tool.name} 
                    className='group relative bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 shadow-lg hover:shadow-2xl cursor-pointer border border-slate-200/50 dark:border-gray-700/50 transition-all duration-300 overflow-hidden' 
                    data-umami-event={`start-tool-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => { 
                      if (typeof window !== 'undefined') { 
                        const target = tool.link.startsWith('http') ? tool.link : `${window.location.origin}${tool.link}`; 
                        window.open(target, '_blank'); 
                      } 
                    }}
                  >
                    {/* Subtle background gradient */}
                    <div className='absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300' style={{ background: `linear-gradient(135deg, ${tool.color}20, transparent)` }}></div>
                    
                    <div className='relative z-10'>
                      <div className='flex items-start gap-4 mb-4'>
                        <div 
                          className='w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110' 
                          style={{ backgroundColor: `${tool.color}15`, border: `2px solid ${tool.color}20` }}
                        >
                          <div style={{ color: tool.color }} className='text-2xl'>
                            {tool.icon}
                          </div>
                        </div>
                        <div className='flex-1'>
                          <Typography variant='h4' className='font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-opacity-90 transition-all' style={{ color: tool.color }}>
                            {tool.name}
                          </Typography>
                          <Typography variant='body' className='text-sm text-slate-600 dark:text-slate-400 leading-relaxed'>
                            {tool.description}
                          </Typography>
                        </div>
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <div className='w-2 h-2 rounded-full bg-[#48df7b] animate-pulse'></div>
                          <span className='text-xs font-medium text-slate-500 dark:text-slate-400'>Available Now</span>
                        </div>
                        <FiArrowRight className='text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-hover:translate-x-1 transition-all duration-300' />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Enhanced Newsletter CTA */}
            <section 
              className='mb-20'
            >
              <div className='relative max-w-5xl mx-auto'>
                <div 
                  className='bg-gradient-to-r from-[#5599fe]/10 via-[#a679f0]/10 to-[#48df7b]/10 dark:from-[#5599fe]/20 dark:via-[#a679f0]/20 dark:to-[#48df7b]/20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-[#a679f0]/20 dark:border-[#a679f0]/30'
                >
                  {/* Background decoration */}
                  <div className='absolute inset-0 bg-gradient-to-r from-[#5599fe]/5 to-[#a679f0]/5 rounded-3xl'></div>
                  <div 
                    className='absolute top-4 right-4 w-16 h-16 bg-[#48df7b]/20 rounded-full blur-xl'
                  ></div>
                  <div 
                    className='absolute bottom-4 left-4 w-12 h-12 bg-[#a679f0]/20 rounded-full blur-xl'
                  ></div>
                  
                  <div className='relative z-10'>
                    <div
                      className='w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#a679f0] to-[#5599fe] flex items-center justify-center shadow-lg'
                    >
                      <FiMail className='text-white text-2xl' />
                    </div>
                    <Typography variant='h3' className='text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3'>
                      Never Miss an Update
                    </Typography>
                    <Typography variant='body' className='text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed'>
                      Get weekly updates on new bounties, tools, community highlights, and exclusive hackathon insights delivered to your inbox.
                    </Typography>
                    <div
                      className='inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#a679f0] to-[#925fe0] hover:from-[#925fe0] hover:to-[#7c4fd6] text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300' 
                      onClick={() => setIsNewsletterModalOpen(true)} 
                      data-umami-event='start-newsletter-cta'
                    >
                      <FiMail className='text-xl' />
                      Subscribe to Newsletter
                      <FiArrowRight className='text-xl' />
                    </div>
                    <p className='text-xs text-slate-500 dark:text-slate-400 mt-4'>
                      Join 5,000+ developers • No spam, unsubscribe anytime
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <NewsletterModal isOpen={isNewsletterModalOpen} onClose={() => setIsNewsletterModalOpen(false)} />
    </Layout>
  );
};

export default StartPage;
