import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaComments, 
  FaRobot, 
  FaNetworkWired, 
  FaPlug, 
  FaShield, 
  FaCog,
  FaDesktop,
  FaApple,
  FaWindows,
  FaLinux
} from 'react-icons/fa';
import { TransformCard } from '../ui';
import PrimaryButton from '../hackathon/PrimaryButton';

const ConvAIFeaturesSectionSimple: React.FC = () => {
  const features = [
    {
      icon: <FaComments />,
      title: 'AI-Powered Chat',
      description: 'Chat naturally with AI assistants that understand blockchain operations and execute Hedera transactions.',
      color: 'from-[#a679f0] to-[#5599fe]',
      details: ['Natural language processing', 'Context-aware responses', 'Transaction explanations', 'File attachments']
    },
    {
      icon: <FaNetworkWired />,
      title: 'Hedera Integration',
      description: 'Seamlessly interact with the Hedera network - send HBAR, manage tokens, create smart contracts.',
      color: 'from-[#5599fe] to-[#48df7b]',
      details: ['HBAR transfers', 'Token management', 'Smart contracts', 'Account operations']
    },
    {
      icon: <FaPlug />,
      title: 'MCP Extensions',
      description: 'Extend your assistant with Model Context Protocol servers for file access, databases, and more.',
      color: 'from-[#48df7b] to-[#a679f0]',
      details: ['Filesystem access', 'Database connections', 'GitHub integration', 'Custom servers']
    },
    {
      icon: <FaRobot />,
      title: 'HCS-10 Profiles',
      description: 'Register as an AI agent on the Hedera network and connect with other decentralized agents.',
      color: 'from-[#a679f0] to-[#5599fe]',
      details: ['Agent registration', 'Peer connections', 'Capability sharing', 'Network discovery']
    },
    {
      icon: <FaShield />,
      title: 'Secure & Private',
      description: 'Your credentials stay local. Native OS keychain integration keeps your private keys safe.',
      color: 'from-[#5599fe] to-[#48df7b]',
      details: ['Local key storage', 'OS keychain sync', 'No cloud dependencies', 'Encrypted communications']
    },
    {
      icon: <FaCog />,
      title: 'Customizable',
      description: 'Configure AI models, network settings, and install plugins to match your workflow.',
      color: 'from-[#48df7b] to-[#a679f0]',
      details: ['Model selection', 'Network switching', 'Plugin system', 'Custom configurations']
    }
  ];

  const platforms = [
    {
      name: 'macOS',
      icon: <FaApple />,
      version: '10.15+',
      features: ['Native keychain', 'Dark mode support', 'Apple Silicon optimized']
    },
    {
      name: 'Windows',
      icon: <FaWindows />,
      version: '10+',
      features: ['Credential manager', 'Auto updates', 'Windows Hello support']
    },
    {
      name: 'Linux',
      icon: <FaLinux />,
      version: 'Ubuntu 18+',
      features: ['AppImage format', 'XDG integration', 'Package manager support']
    }
  ];

  return (
    <section className='py-24 sm:py-32 relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden'>
      {/* Animated background */}
      <div className='absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none'>
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(166, 121, 240, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(85, 153, 254, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(72, 223, 123, 0.08) 0%, transparent 50%)`,
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
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
            className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#a679f0]/20 to-[#5599fe]/20 dark:from-[#a679f0]/30 dark:to-[#5599fe]/30 border border-[#a679f0]/30 dark:border-[#a679f0]/40 mb-6'
          >
            <FaDesktop className='text-[#a679f0] mr-2' />
            <span className='text-sm font-bold text-[#a679f0] dark:text-[#a679f0]'>
              DESKTOP APPLICATION
            </span>
          </motion.div>

          <h2 className='text-4xl sm:text-5xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
              Your AI Assistant for Hedera
            </span>
          </h2>

          <p className='text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8'>
            A powerful desktop application that combines conversational AI with Hedera blockchain capabilities. 
            Chat naturally with your assistant to manage crypto, deploy contracts, and extend functionality.
          </p>
        </motion.div>

        {/* Features Grid */}
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

        {/* Platform Support */}
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className='text-2xl font-bold mb-8 text-gray-900 dark:text-white'>
            Available on All Platforms
          </h3>

          <div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8'>
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
                  <h4 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                    {platform.name}
                  </h4>
                  <p className='text-gray-500 dark:text-gray-400 text-sm mb-4'>
                    {platform.version}
                  </p>
                  <ul className='space-y-2'>
                    {platform.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className='flex items-center justify-center text-sm text-gray-600 dark:text-gray-300'>
                        <div className='w-1.5 h-1.5 rounded-full bg-[#48df7b] mr-2 flex-shrink-0' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </TransformCard>
              </motion.div>
            ))}
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <PrimaryButton
              href='https://github.com/hashgraph-online/conversational-agent/releases'
              target='_blank'
              rel='noopener noreferrer'
              size='lg'
              className='bg-[#a679f0] hover:bg-[#a679f0]/90 text-white border-0 shadow-xl shadow-[#a679f0]/25'
              icon={<FaDesktop />}
              data-umami-event='conversational-agent-download-features'
              data-umami-event-category='conversational-agent'
            >
              Download Desktop App
            </PrimaryButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConvAIFeaturesSectionSimple;