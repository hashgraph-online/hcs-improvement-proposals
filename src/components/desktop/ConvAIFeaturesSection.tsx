import React from 'react';
import { motion } from 'framer-motion';
import {
  FaComments,
  FaPlug,
  FaCog,
  FaNetworkWired,
  FaBrain,
  FaFileAlt,
  FaShield,
  FaDesktop,
  FaMobile,
  FaApple,
  FaWindows,
  FaLinux,
} from 'react-icons/fa';
import { TransformCard } from '../ui';

const ConvAIFeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <FaComments />,
      title: 'Advanced Chat Interface',
      description: 'Natural language conversations with file attachments, message chunking, and real-time typing indicators.',
      color: 'from-[#a679f0] to-[#5599fe]',
      details: ['File upload support (10MB max)', 'Automatic message chunking', 'Typing animations', 'Message history'],
    },
    {
      icon: <FaPlug />,
      title: 'MCP Server Management',
      description: 'Extend AI capabilities with Model Context Protocol servers for filesystem, GitHub, and database access.',
      color: 'from-[#5599fe] to-[#48df7b]',
      details: ['Browse MCP server catalog', 'One-click installation', 'Connection testing', 'Custom server configuration'],
    },
    {
      icon: <FaBrain />,
      title: 'HCS-10 Agent Registry',
      description: 'Register as an AI agent and discover other agents on the Hedera network for collaboration.',
      color: 'from-[#48df7b] to-[#a679f0]',
      details: ['Agent profile creation', 'Capability tagging', 'Agent discovery', 'Connection requests'],
    },
    {
      icon: <FaNetworkWired />,
      title: 'Hedera Network Integration',
      description: 'Seamlessly interact with the Hedera network through natural language commands.',
      color: 'from-[#a679f0] to-[#5599fe]',
      details: ['Account management', 'HBAR transfers', 'Token operations', 'Smart contract calls'],
    },
    {
      icon: <FaShield />,
      title: 'Secure Credential Management',
      description: 'Your private keys and API keys are stored securely using native OS credential managers.',
      color: 'from-[#5599fe] to-[#48df7b]',
      details: ['Native keychain integration', 'Encrypted storage', 'Auto-logout', 'Key derivation'],
    },
    {
      icon: <FaCog />,
      title: 'Configurable Settings',
      description: 'Customize your AI experience with model selection, operational modes, and advanced settings.',
      color: 'from-[#48df7b] to-[#a679f0]',
      details: ['Multiple AI models', 'Autonomous/manual modes', 'Network selection', 'Theme customization'],
    },
  ];

  const platforms = [
    {
      icon: <FaApple />,
      name: 'macOS',
      version: '10.15+',
      features: ['Native keychain', 'Auto dark mode', 'Code signing'],
      downloadLink: '#',
    },
    {
      icon: <FaWindows />,
      name: 'Windows',
      version: '10+',
      features: ['Credential Manager', 'NSIS installer', 'SmartScreen'],
      downloadLink: '#',
    },
    {
      icon: <FaLinux />,
      name: 'Linux',
      version: 'Ubuntu 18+',
      features: ['AppImage format', '.deb packages', 'XDG integration'],
      downloadLink: '#',
    },
  ];

  return (
    <section className='py-24 sm:py-32 relative bg-gray-50 dark:bg-gray-800 overflow-hidden'>
      <div className='absolute inset-0'>
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className='absolute inset-0 opacity-[0.03] dark:opacity-[0.05]'
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(166, 121, 240, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(85, 153, 254, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(72, 223, 123, 0.08) 0%, transparent 50%)`,
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Features Section */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#a679f0]/10 to-[#5599fe]/10 dark:from-[#a679f0]/20 dark:to-[#5599fe]/20 border border-[#a679f0]/20 dark:border-[#a679f0]/30 mb-6'
          >
            <FaComments className='text-[#a679f0] mr-2' />
            <span className='text-sm font-bold text-[#a679f0] dark:text-[#a679f0]'>
              KEY FEATURES
            </span>
          </motion.div>

          <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
            <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
              Everything You Need for AI-Blockchain Interaction
            </span>
          </h2>

          <p className='text-base text-gray-600 dark:text-white/70 max-w-3xl mx-auto'>
            A comprehensive desktop application that bridges the gap between conversational AI 
            and blockchain technology with enterprise-grade security.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TransformCard
                rotation={`rotate-[${index % 2 === 0 ? '-0.5' : '0.5'}deg]`}
                background='bg-white dark:bg-gray-900'
                border='border border-gray-200 dark:border-gray-700'
                shadow='shadow-xl'
                className='p-6 h-full hover:scale-105 transition-all duration-300'
              >
                <div className='flex flex-col h-full'>
                  <div className='mb-4'>
                    <div
                      className='w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mb-4'
                      style={{
                        background: `linear-gradient(135deg, ${feature.color})`,
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                      {feature.title}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300 mb-4'>
                      {feature.description}
                    </p>
                  </div>
                  <div className='mt-auto'>
                    <ul className='space-y-2'>
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                          <div className='w-1.5 h-1.5 rounded-full bg-[#5599fe] mr-2 flex-shrink-0' />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TransformCard>
            </motion.div>
          ))}
        </div>

        {/* Platform Support Section */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#5599fe]/10 to-[#48df7b]/10 dark:from-[#5599fe]/20 dark:to-[#48df7b]/20 border border-[#5599fe]/20 dark:border-[#5599fe]/30 mb-6'
          >
            <FaDesktop className='text-[#5599fe] mr-2' />
            <span className='text-sm font-bold text-[#5599fe] dark:text-[#48df7b]'>
              CROSS-PLATFORM SUPPORT
            </span>
          </motion.div>

          <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
            <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
              Available on All Major Platforms
            </span>
          </h2>

          <p className='text-base text-gray-600 dark:text-white/70 max-w-3xl mx-auto'>
            Native desktop applications built with Electron for seamless performance 
            and platform-specific integrations.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TransformCard
                rotation={`rotate-[${index === 1 ? '0' : index === 0 ? '-0.5' : '0.5'}deg]`}
                background='bg-white dark:bg-gray-900'
                border='border border-gray-200 dark:border-gray-700'
                shadow='shadow-lg'
                className='p-6 text-center hover:scale-105 transition-all duration-300'
              >
                <div className='text-4xl text-[#5599fe] mb-4'>
                  {platform.icon}
                </div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                  {platform.name}
                </h3>
                <p className='text-gray-500 dark:text-gray-400 text-sm mb-4'>
                  {platform.version}
                </p>
                <ul className='space-y-2 mb-6'>
                  {platform.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className='flex items-center text-sm text-gray-600 dark:text-gray-300'>
                      <div className='w-1.5 h-1.5 rounded-full bg-[#48df7b] mr-2 flex-shrink-0' />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className='w-full px-4 py-2 bg-gradient-to-r from-[#5599fe] to-[#48df7b] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50'
                  disabled={platform.downloadLink === '#'}
                >
                  {platform.downloadLink === '#' ? 'Coming Soon' : 'Download'}
                </button>
              </TransformCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConvAIFeaturesSection;