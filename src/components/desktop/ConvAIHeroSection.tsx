import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaDesktop,
  FaRobot,
  FaPlug,
  FaArrowRight,
  FaDownload,
  FaGithub,
  FaComments,
  FaCog,
  FaNetworkWired,
  FaBrain,
} from 'react-icons/fa';
import PrimaryButton from '../hackathon/PrimaryButton';
import TypingEffect from '../hackathon/TypingEffect';

const ConvAIHeroSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <FaComments />,
      title: 'AI Chat Interface',
      description: 'Natural language conversations with intelligent AI agents',
      color: 'from-[#a679f0] to-[#5599fe]',
    },
    {
      icon: <FaPlug />,
      title: 'MCP Server Integration', 
      description: 'Extend capabilities with Model Context Protocol servers',
      color: 'from-[#5599fe] to-[#48df7b]',
    },
    {
      icon: <FaNetworkWired />,
      title: 'Hedera Network',
      description: 'Seamless blockchain transactions and smart contracts',
      color: 'from-[#48df7b] to-[#a679f0]',
    },
    {
      icon: <FaBrain />,
      title: 'HCS-10 Agent Registry',
      description: 'Discover and connect with decentralized AI agents',
      color: 'from-[#a679f0] to-[#5599fe]',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='relative overflow-hidden bg-white dark:bg-gray-900'>
      {/* Animated background */}
      <div className='absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none'>
        <motion.div
          className='absolute inset-0'
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(166, 121, 240, 0.1) 35px, rgba(166, 121, 240, 0.1) 70px)`,
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-2 h-2 bg-gradient-to-r from-[#a679f0] to-[#5599fe] rounded-full opacity-40'
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${15 + i * 12}%`,
              top: `${5 + i * 15}%`,
            }}
          />
        ))}
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
          <div className='space-y-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='space-y-4'
            >
              <div className='space-y-2'>
                <motion.div
                  className='text-sm font-medium text-[#a679f0] dark:text-[#48df7b] uppercase tracking-wide'
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Hashgraph Online
                </motion.div>
                <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight'>
                  <motion.span
                    className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent inline-block'
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  >
                    Conversational Agent
                  </motion.span>
                </h1>
              </div>

              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white leading-tight'>
                Desktop App for AI-Powered Hedera Interaction
              </h2>

              <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl'>
                A modern Electron desktop application that combines conversational AI 
                with Hedera blockchain capabilities. Chat naturally with AI agents, 
                manage transactions, and extend functionality through MCP servers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='flex flex-wrap gap-6'
            >
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-lg bg-[#5599fe]/10 dark:bg-[#5599fe]/20 flex items-center justify-center'>
                  <FaDesktop className='text-[#5599fe]' />
                </div>
                <div>
                  <div className='text-sm text-gray-500 dark:text-gray-400'>
                    Platform
                  </div>
                  <div className='font-semibold text-gray-900 dark:text-white'>
                    Cross-Platform Desktop
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-lg bg-[#48df7b]/10 dark:bg-[#48df7b]/20 flex items-center justify-center'>
                  <FaRobot className='text-[#48df7b]' />
                </div>
                <div>
                  <div className='text-sm text-gray-500 dark:text-gray-400'>
                    Technology
                  </div>
                  <div className='font-semibold text-gray-900 dark:text-white'>
                    AI + Blockchain
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='flex flex-col sm:flex-row gap-4'
            >
              <PrimaryButton
                href='https://github.com/hashgraph-online/conversational-agent/releases'
                target='_blank'
                rel='noopener noreferrer'
                size='lg'
                className='bg-[#a679f0] hover:bg-[#a679f0]/90 text-white border-0'
                icon={<FaDownload />}
                data-umami-event='conversational-agent-download'
                data-umami-event-category='conversational-agent'
              >
                Download App
              </PrimaryButton>

              <PrimaryButton
                href='https://github.com/hashgraph-online/conversational-agent'
                target='_blank'
                rel='noopener noreferrer'
                size='lg'
                className='bg-gray-600 hover:bg-gray-700 text-white border-0'
                icon={<FaGithub />}
                data-umami-event='conversational-agent-github'
                data-umami-event-category='conversational-agent'
              >
                View Source
              </PrimaryButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='relative z-10'
            whileHover={{ scale: 1.02 }}
          >
            <div className='bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 lg:p-12 border border-gray-200 dark:border-gray-700 min-h-[520px] flex flex-col'>
              <div className='text-center flex-1 flex flex-col justify-center'>
                <div>
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className='inline-flex items-center justify-center w-20 h-20 rounded-2xl text-white text-3xl mb-4 mx-auto'
                    style={{
                      background: `linear-gradient(135deg, ${features[activeFeature].color})`,
                    }}
                  >
                    {features[activeFeature].icon}
                  </motion.div>

                  <motion.h3
                    key={`title-${activeFeature}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className='text-2xl font-bold text-gray-900 dark:text-white mb-2'
                  >
                    {features[activeFeature].title}
                  </motion.h3>

                  <motion.p
                    key={`desc-${activeFeature}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className='text-gray-600 dark:text-gray-400 mb-4'
                  >
                    {features[activeFeature].description}
                  </motion.p>

                  <div className='flex justify-center gap-2 mt-6'>
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveFeature(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 border-0 outline-none ring-0 ${
                          index === activeFeature
                            ? 'bg-[#a679f0]'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        style={{
                          border: 'none',
                          outline: 'none',
                          boxShadow: 'none',
                        }}
                        aria-label={`View feature ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className='mt-8 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700'>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                  <span className='text-xs text-gray-500 dark:text-gray-400'>
                    AI Assistant Ready
                  </span>
                </div>
                <div className='text-sm text-gray-700 dark:text-gray-300 font-mono'>
                  <TypingEffect
                    texts={[
                      'Send 5 HBAR to account 0.0.12345',
                      'Register me as an AI agent on the network',
                      'What is my current HBAR balance?',
                      'Create a new token called MyToken',
                      'Connect to filesystem MCP server',
                    ]}
                    typingSpeed={35}
                    deletingSpeed={25}
                    delayBetweenTexts={2500}
                    cursorClassName='text-[#5599fe] animate-pulse'
                  />
                </div>
              </div>
            </div>

            <motion.div
              className='absolute -top-4 -right-4 w-32 h-32 bg-[#a679f0]/10 rounded-full blur-3xl'
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className='absolute -bottom-4 -left-4 w-32 h-32 bg-[#48df7b]/10 rounded-full blur-3xl'
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConvAIHeroSection;