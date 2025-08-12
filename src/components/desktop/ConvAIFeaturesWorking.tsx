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
  FaDownload
} from 'react-icons/fa';

const ConvAIFeaturesWorking: React.FC = () => {
  const features = [
    {
      icon: <FaComments />,
      title: 'AI-Powered Chat',
      description: 'Chat naturally with AI assistants that understand blockchain operations and execute Hedera transactions.',
      color: 'from-[#a679f0] to-[#5599fe]',
    },
    {
      icon: <FaNetworkWired />,
      title: 'Hedera Integration',
      description: 'Seamlessly interact with the Hedera network - send HBAR, manage tokens, create smart contracts.',
      color: 'from-[#5599fe] to-[#48df7b]',
    },
    {
      icon: <FaPlug />,
      title: 'MCP Extensions',
      description: 'Extend your assistant with Model Context Protocol servers for file access, databases, and more.',
      color: 'from-[#48df7b] to-[#a679f0]',
    },
    {
      icon: <FaRobot />,
      title: 'HCS-10 Profiles',
      description: 'Register as an AI agent on the Hedera network and connect with other decentralized agents.',
      color: 'from-[#a679f0] to-[#5599fe]',
    },
    {
      icon: <FaShield />,
      title: 'Secure & Private',
      description: 'Your credentials stay local. Native OS keychain integration keeps your private keys safe.',
      color: 'from-[#5599fe] to-[#48df7b]',
    },
    {
      icon: <FaCog />,
      title: 'Customizable',
      description: 'Configure AI models, network settings, and install plugins to match your workflow.',
      color: 'from-[#48df7b] to-[#a679f0]',
    }
  ];

  return (
    <section className='py-24 sm:py-32 relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden'>
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

          <p className='text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto'>
            A powerful desktop application that combines conversational AI with Hedera blockchain capabilities. 
            Chat naturally with your assistant to manage crypto, deploy contracts, and extend functionality.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl hover:scale-105 transition-all duration-300'
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
                  <p className='text-gray-600 dark:text-gray-300'>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className='text-center'>
          <motion.a
            href='https://github.com/hashgraph-online/conversational-agent/releases'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center px-8 py-4 bg-[#a679f0] hover:bg-[#a679f0]/90 text-white rounded-xl font-semibold text-lg shadow-xl shadow-[#a679f0]/25 transition-all duration-300 hover:scale-105'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload className='mr-3' />
            Download Desktop App
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ConvAIFeaturesWorking;