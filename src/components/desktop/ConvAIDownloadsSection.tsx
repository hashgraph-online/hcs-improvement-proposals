import React from 'react';
import { motion } from 'framer-motion';
import {
  FaDownload,
  FaGithub,
  FaApple,
  FaWindows,
  FaLinux,
  FaRocket,
  FaCode,
  FaBook,
} from 'react-icons/fa';
import PrimaryButton from '../hackathon/PrimaryButton';
import { TransformCard } from '../ui';

const ConvAIDownloadsSection: React.FC = () => {
  const downloads = [
    {
      platform: 'macOS',
      icon: <FaApple />,
      version: '10.15+',
      format: '.dmg',
      color: 'from-[#a679f0] to-[#5599fe]',
      features: ['Native keychain', 'Auto dark mode', 'Notarized'],
      downloadLink: '#',
      comingSoon: true,
    },
    {
      platform: 'Windows',
      icon: <FaWindows />,
      version: '10+',
      format: '.exe',
      color: 'from-[#5599fe] to-[#48df7b]',
      features: ['Credential Manager', 'Auto updates', 'Signed'],
      downloadLink: '#',
      comingSoon: true,
    },
    {
      platform: 'Linux',
      icon: <FaLinux />,
      version: 'Ubuntu 18+',
      format: '.AppImage / .deb',
      color: 'from-[#48df7b] to-[#a679f0]',
      features: ['Portable', 'Package manager', 'XDG integration'],
      downloadLink: '#',
      comingSoon: true,
    },
  ];

  const quickLinks = [
    {
      title: 'Source Code',
      description: 'Complete source code and build instructions',
      icon: <FaGithub />,
      link: 'https://github.com/hashgraph-online/conversational-agent',
      color: 'from-gray-600 to-gray-800',
    },
    {
      title: 'NPM Package',
      description: 'Conversational agent library for developers',
      icon: <FaCode />,
      link: 'https://www.npmjs.com/package/@hashgraphonline/conversational-agent',
      color: 'from-red-500 to-red-700',
    },
    {
      title: 'Documentation',
      description: 'Complete API reference and guides',
      icon: <FaBook />,
      link: 'https://hashgraphonline.com/docs/libraries/conversational-agent/',
      color: 'from-blue-500 to-blue-700',
    },
  ];

  return (
    <section className='py-24 sm:py-32 relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden'>
      <div className='absolute inset-0'>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='absolute top-20 right-20 w-96 h-96 bg-[#a679f0]/10 rounded-full blur-3xl'
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
          className='absolute bottom-20 left-20 w-96 h-96 bg-[#48df7b]/10 rounded-full blur-3xl'
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
            <FaDownload className='text-[#a679f0] mr-2' />
            <span className='text-sm font-bold text-[#a679f0] dark:text-[#a679f0]'>
              DOWNLOAD & GET STARTED
            </span>
          </motion.div>

          <h2 className='text-4xl sm:text-5xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
              Start Building Today
            </span>
          </h2>

          <p className='text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8'>
            Download the Conversational Agent desktop app or integrate the library 
            into your own applications. Everything you need to build AI-powered 
            blockchain experiences.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <PrimaryButton
              href='https://github.com/hashgraph-online/conversational-agent/releases'
              target='_blank'
              rel='noopener noreferrer'
              size='lg'
              className='bg-[#a679f0] hover:bg-[#a679f0]/90 text-white border-0 shadow-xl shadow-[#a679f0]/25'
              icon={<FaRocket />}
              data-umami-event='conversational-agent-download-main'
              data-umami-event-category='conversational-agent'
            >
              Download Latest Release
            </PrimaryButton>
            <PrimaryButton
              href='https://github.com/hashgraph-online/conversational-agent'
              target='_blank'
              rel='noopener noreferrer'
              size='lg'
              className='bg-gray-700 hover:bg-gray-600 text-white border-0 shadow-xl shadow-gray-700/25'
              icon={<FaGithub />}
              data-umami-event='conversational-agent-github-main'
              data-umami-event-category='conversational-agent'
            >
              View on GitHub
            </PrimaryButton>
          </div>
        </motion.div>

        {/* Platform Downloads */}
        <div className='grid md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto'>
          {downloads.map((download, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TransformCard
                rotation={`rotate-[${index === 1 ? '0' : index === 0 ? '-0.5' : '0.5'}deg]`}
                background='bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm'
                border='border border-gray-200 dark:border-gray-700'
                shadow='shadow-2xl'
                className='p-8 text-center hover:scale-105 transition-all duration-300'
              >
                <div className='mb-6'>
                  <div
                    className='w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg'
                    style={{
                      background: `linear-gradient(135deg, ${download.color})`,
                    }}
                  >
                    {download.icon}
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
                    {download.platform}
                  </h3>
                  <p className='text-gray-500 dark:text-gray-400 text-sm mb-1'>
                    {download.version}
                  </p>
                  <p className='text-gray-400 dark:text-gray-500 text-xs'>
                    {download.format}
                  </p>
                </div>

                <div className='mb-6'>
                  <ul className='space-y-2'>
                    {download.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className='flex items-center justify-center text-sm text-gray-600 dark:text-gray-300'>
                        <div className='w-1.5 h-1.5 rounded-full bg-[#5599fe] mr-2 flex-shrink-0' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {download.comingSoon ? (
                  <button
                    disabled
                    className='w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl font-semibold cursor-not-allowed'
                  >
                    Coming Soon
                  </button>
                ) : (
                  <PrimaryButton
                    href={download.downloadLink}
                    className='w-full'
                    icon={<FaDownload />}
                    data-umami-event={`conversational-agent-download-${download.platform.toLowerCase()}`}
                    data-umami-event-category='conversational-agent'
                  >
                    Download
                  </PrimaryButton>
                )}
              </TransformCard>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className='text-2xl font-bold mb-8 text-gray-900 dark:text-white'>
            Developer Resources
          </h3>

          <div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
            {quickLinks.map((link, index) => (
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
                  className='p-6 hover:scale-105 transition-all duration-300'
                >
                  <div className='text-center'>
                    <div
                      className='w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mx-auto mb-4'
                      style={{
                        background: `linear-gradient(135deg, ${link.color})`,
                      }}
                    >
                      {link.icon}
                    </div>
                    <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                      {link.title}
                    </h4>
                    <p className='text-sm text-gray-600 dark:text-gray-300 mb-4'>
                      {link.description}
                    </p>
                    <PrimaryButton
                      href={link.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      size='sm'
                      className='w-full text-sm'
                      data-umami-event={`conversational-agent-${link.title.toLowerCase().replace(' ', '-')}`}
                      data-umami-event-category='conversational-agent'
                    >
                      Visit
                    </PrimaryButton>
                  </div>
                </TransformCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Installation Command */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='max-w-2xl mx-auto'
        >
          <div className='bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800'>
            <div className='text-center mb-6'>
              <h4 className='text-xl font-bold text-white mb-2'>
                Quick Install via NPM
              </h4>
              <p className='text-gray-400 text-sm'>
                Add the conversational agent to your project
              </p>
            </div>
            
            <div className='bg-black rounded-xl p-4 font-mono text-sm'>
              <div className='flex items-center gap-2 text-green-400 mb-1'>
                <span>$</span>
                <span className='text-white'>npm install @hashgraphonline/conversational-agent</span>
                <button
                  onClick={() => navigator.clipboard.writeText('npm install @hashgraphonline/conversational-agent')}
                  className='ml-auto px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded transition-colors'
                >
                  Copy
                </button>
              </div>
            </div>

            <div className='mt-4 flex items-center justify-center'>
              <a
                href='https://www.npmjs.com/package/@hashgraphonline/conversational-agent'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors'
                data-umami-event='conversational-agent-npm'
                data-umami-event-category='conversational-agent'
              >
                View on NPM
                <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z' clipRule='evenodd' />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConvAIDownloadsSection;