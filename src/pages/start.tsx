import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiPackage, FiZap, FiArrowRight, FiExternalLink, FiBook, FiMic, FiMessageCircle, FiMail, FiTerminal } from 'react-icons/fi';
import { FaPalette, FaRocket, FaFlask } from 'react-icons/fa';
import Typography from '../components/ui/Typography';

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

  const tracks: TrackCard[] = [
    {
      id: 'developer',
      icon: <FiCode className='text-3xl' />,
      title: "I'm a Developer",
      description: 'Start coding with our SDKs, Agent Kit, and standards.',
      links: [
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
        { label: 'Register Now', href: 'https://link.hashgraphonline.com/hederahacks' },
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
      description: "The first step into the rabbit HOL. (see what we did there? 😉)",
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
      links: [
        { label: 'Hashinals', href: 'https://kiloscribe.com' },
      ],
      color: '#a679f0',
    },
  ];

  const tools = [
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
      description: 'JavaScript library for HCS (Hashgraph Consensus Standards) implementation',
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

  return (
    <Layout
      title='Get Started | Hashgraph Online'
      description='Choose your path and start building on Hedera with our open tools and standards'
    >
      <div className='min-h-screen bg-white dark:bg-gray-900'>
        {/* Hero Section - Join the Community */}
        <section className='relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-black dark:to-blue-950/30'>
          <div className='absolute inset-0 z-0'>
            <motion.div 
              className='absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#5599fe]/10 to-[#a679f0]/10 rounded-full blur-3xl'
              animate={{ 
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className='absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-[#48df7b]/10 to-[#5599fe]/10 rounded-full blur-3xl'
              animate={{ 
                x: [0, -30, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className='absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-[#a679f0]/5 to-[#48df7b]/5 rounded-full blur-3xl'
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className='text-center mb-12'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div 
                  className='flex items-center justify-center gap-4 mb-4'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                >
                  <motion.div 
                    className='flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#48df7b] to-[#5599fe] rounded-full text-white font-bold text-2xl shadow-lg relative overflow-hidden'
                    whileHover={{ scale: 1.1 }}
                    animate={{ boxShadow: ['0 10px 30px rgba(72, 223, 123, 0.3)', '0 10px 30px rgba(85, 153, 254, 0.3)', '0 10px 30px rgba(72, 223, 123, 0.3)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className='relative z-10'>1</span>
                    <motion.div
                      className='absolute inset-0 bg-white/20 rounded-full'
                      animate={{ scale: [0, 2, 0], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </motion.div>
                <Typography variant='h1' className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-4'>
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#48df7b] via-[#5599fe] to-[#a679f0]'>
                    Get Connected
                  </span>
                </Typography>
                <Typography variant='body' className='text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-8'>
                  Connect with builders, creators, and degens — get updates on our weekly $100 giveaways and exclusive alpha
                </Typography>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className='flex justify-center'
                >
                  <motion.a
                    href='https://t.me/hashinals'
                    target='_blank'
                    rel='noopener noreferrer'
                    whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(72, 223, 123, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    className='inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-[#48df7b] to-[#3dcf6b] text-white hover:text-white rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 shadow-xl text-xl group'
                    data-umami-event="start-join-telegram"
                    data-umami-event-category="start-page"
                  >
                    <motion.div
                      className='w-8 h-8 flex items-center justify-center'
                      whileHover={{ rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FiMessageCircle className='text-2xl' />
                    </motion.div>
                    Join Telegram Community
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FiExternalLink className='text-xl' />
                    </motion.div>
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Choose Your Path Section */}
        <section className='py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/30'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className='text-center mb-12'>
                <motion.div
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                >
                  <motion.div 
                    className='flex items-center justify-center gap-4 mb-6'
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <motion.div 
                      className='flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#5599fe] to-[#a679f0] rounded-full text-white font-bold text-2xl shadow-lg relative overflow-hidden'
                      whileHover={{ scale: 1.1 }}
                      animate={{ boxShadow: ['0 10px 30px rgba(85, 153, 254, 0.3)', '0 10px 30px rgba(166, 121, 240, 0.3)', '0 10px 30px rgba(85, 153, 254, 0.3)'] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                      <span className='relative z-10'>2</span>
                      <motion.div
                        className='absolute inset-0 bg-white/20 rounded-full'
                        animate={{ scale: [0, 2, 0], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                      />
                    </motion.div>
                  </motion.div>
                  <Typography variant='h2' className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4'>
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#5599fe] via-[#a679f0] to-[#48df7b]'>
                      Start building on
                    </span>
                    <motion.span 
                      className='block text-transparent bg-clip-text bg-gradient-to-r from-[#a679f0] via-[#48df7b] to-[#5599fe]'
                      animate={{ 
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      style={{ backgroundSize: '200% 200%' }}
                    >
                      the new internet
                    </motion.span>
                  </Typography>
                </motion.div>
                <Typography variant='body' className='text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-2'>
                  Not a dev? Not a problem. Our tools are made for builders and believers.
                </Typography>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
                {tracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className='relative'
                  >
                    <motion.div
                      onClick={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
                      className='bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 relative overflow-hidden group'
                      style={{
                        borderColor: selectedTrack === track.id ? track.color : 'transparent',
                        background: selectedTrack === track.id ? `linear-gradient(135deg, ${track.color}08, ${track.color}03)` : undefined,
                      }}
                      whileHover={{ scale: 1.02, rotateZ: 0.5 }}
                      whileTap={{ scale: 0.98 }}
                      data-umami-event={`start-track-${track.id}-select`}
                      data-umami-event-category="start-page"
                    >
                      <div className='absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500' style={{ background: `linear-gradient(135deg, ${track.color}10, transparent)` }} />
                      <motion.div 
                        className='flex items-center justify-center w-14 h-14 rounded-xl mb-4 relative z-10' 
                        style={{ backgroundColor: `${track.color}20` }}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className={track.id === 'hacker' ? 'text-[#3f4174] dark:text-[#8b92d4]' : track.id === 'degen' ? 'text-[#3bb768] dark:text-[#48df7b]' : ''} style={{ color: track.id === 'hacker' || track.id === 'degen' ? undefined : track.color }}>{track.icon}</div>
                      </motion.div>
                      <Typography variant='h4' className='text-xl font-bold mb-2 relative z-10'>
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${track.id === 'hacker' ? 'text-transparent dark:text-[#8b92d4] dark:bg-none' : track.id === 'degen' ? 'text-transparent dark:text-[#48df7b] dark:bg-none' : ''}`} style={{ backgroundImage: track.id === 'degen' ? `linear-gradient(45deg, #3bb768, #3bb768aa)` : `linear-gradient(45deg, ${track.color}, ${track.color}aa)` }}>
                          {track.title}
                        </span>
                      </Typography>
                      <Typography variant='body' className='text-sm text-gray-600 dark:text-gray-400 relative z-10'>
                        {track.description}
                      </Typography>
                    </motion.div>

                    <AnimatePresence>
                      {selectedTrack === track.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, scale: 0.95 }}
                          animate={{ 
                            opacity: 1, 
                            height: track.links.length * 48 + 32, // Calculate proper height based on number of links
                            scale: 1 
                          }}
                          exit={{ opacity: 0, height: 0, scale: 0.95 }}
                          transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                          className='mt-4 bg-gradient-to-br rounded-xl p-4 overflow-hidden border backdrop-blur-sm'
                          style={{ 
                            background: `linear-gradient(135deg, ${track.color}20, ${track.color}10)`,
                            borderColor: `${track.color}50`
                          }}
                        >
                          <div className='space-y-2'>
                            {track.links.map((link) => (
                              <motion.a
                                key={link.label}
                                href={link.href}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center justify-between p-3 rounded-lg hover:bg-white/80 dark:hover:bg-gray-600/80 transition-all group backdrop-blur-sm bg-white/20 dark:bg-gray-800/40'
                                whileHover={{ x: 4 }}
                                data-umami-event={`start-track-${track.id}-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                                data-umami-event-category="start-page"
                              >
                                <span className='text-sm font-semibold text-gray-900' style={{ color: 'inherit' }}>
                                  <span className={`dark:hidden ${track.id === 'degen' ? 'text-[#3bb768]' : 'text-gray-900'}`}>{link.label}</span>
                                  <span className='hidden dark:inline' style={{ color: track.id === 'hacker' ? '#8b92d4' : track.id === 'degen' ? '#48df7b' : track.color }}>{link.label}</span>
                                </span>
                                <FiArrowRight className='opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1' style={{ color: track.id === 'hacker' ? '#8b92d4' : track.id === 'degen' ? '#3bb768' : track.color }} />
                              </motion.a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Tools Section */}
        <section className='py-16 lg:py-20'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className='text-center mb-12'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.div 
                  className='flex items-center justify-center gap-4 mb-6'
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 200, delay: 0.3 }}
                >
                  <motion.div 
                    className='flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#a679f0] to-[#48df7b] rounded-full text-white font-bold text-2xl shadow-lg relative overflow-hidden'
                    whileHover={{ scale: 1.1 }}
                    animate={{ boxShadow: ['0 10px 30px rgba(166, 121, 240, 0.3)', '0 10px 30px rgba(72, 223, 123, 0.3)', '0 10px 30px rgba(166, 121, 240, 0.3)'] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  >
                    <span className='relative z-10'>3</span>
                    <motion.div
                      className='absolute inset-0 bg-white/20 rounded-full'
                      animate={{ scale: [0, 2, 0], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.3 }}
                    />
                  </motion.div>
                </motion.div>
                <Typography variant='h2' className='text-3xl lg:text-4xl font-bold mb-4'>
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#5599fe] via-[#a679f0] to-[#48df7b]'>
                    Featured Tools
                  </span>
                </Typography>
                <Typography variant='body' className='text-gray-600 dark:text-gray-300'>
                  Everything you need to build on Hedera
                </Typography>
              </motion.div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className='bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group'
                  >
                    <div className='absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500' style={{ background: `linear-gradient(135deg, ${tool.color}10, transparent)` }} />
                    
                    <motion.a
                      href={tool.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='absolute top-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm opacity-60 hover:opacity-100 transition-all z-10 cursor-pointer'
                      whileHover={{ scale: 1.1 }}
                      data-umami-event={`start-tool-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                      data-umami-event-category="start-page"
                    >
                      <FiExternalLink className='text-base' style={{ color: tool.color }} />
                    </motion.a>

                    <motion.div 
                      className='flex items-center justify-center w-14 h-14 rounded-xl mb-4 relative z-10' 
                      style={{ backgroundColor: `${tool.color}20` }}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div style={{ color: tool.color }} className='text-3xl'>
                        {tool.icon}
                      </div>
                    </motion.div>
                    <Typography variant='h4' className='text-xl font-bold mb-2 relative z-10'>
                      <span className='text-transparent bg-clip-text bg-gradient-to-r' style={{ backgroundImage: `linear-gradient(45deg, ${tool.color}, ${tool.color}cc)` }}>
                        {tool.name}
                      </span>
                    </Typography>
                    <Typography variant='body' className='text-sm text-gray-600 dark:text-gray-400 relative z-10'>
                      {tool.description}
                    </Typography>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        
      </div>
    </Layout>
  );
};

export default StartPage;
