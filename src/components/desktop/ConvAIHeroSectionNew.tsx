import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaDesktop,
  FaDownload,
  FaGithub,
  FaPlay,
  FaComments,
  FaRobot,
  FaNetworkWired,
} from 'react-icons/fa';
import PrimaryButton from '../hackathon/PrimaryButton';
import TypingEffect from '../hackathon/TypingEffect';

const ConvAIHeroSectionNew: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState(0);

  const demoConversations = [
    "Send 5 HBAR to account 0.0.12345",
    "Create a new token called MyToken with 1000 supply",
    "What's my current HBAR balance?",
    "Register me as an AI agent on the network",
    "Connect to my GitHub repository via MCP",
    "Deploy a smart contract for token transfers"
  ];

  const features = [
    {
      icon: <FaComments />,
      title: 'Natural Conversations',
      description: 'Chat with AI that understands blockchain'
    },
    {
      icon: <FaNetworkWired />,
      title: 'Hedera Native',
      description: 'Direct integration with the Hedera network'
    },
    {
      icon: <FaRobot />,
      title: 'AI Agent Network',
      description: 'Connect with decentralized AI agents'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800'>
      {/* Animated background elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <motion.div
          className='absolute top-20 right-20 w-72 h-72 bg-[#a679f0]/10 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute bottom-20 left-20 w-72 h-72 bg-[#48df7b]/10 rounded-full blur-3xl'
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
        />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-gradient-to-r from-[#a679f0] to-[#5599fe] rounded-full opacity-40'
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 0.7,
            }}
            style={{
              left: `${10 + i * 10}%`,
              top: `${5 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
          
          {/* Content */}
          <div className='space-y-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <motion.div
                className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#a679f0]/20 to-[#5599fe]/20 dark:from-[#a679f0]/30 dark:to-[#5599fe]/30 border border-[#a679f0]/30 dark:border-[#a679f0]/40 mb-6'
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <FaDesktop className='text-[#a679f0] mr-2' />
                <span className='text-sm font-bold text-[#a679f0] dark:text-[#a679f0]'>
                  DESKTOP AI ASSISTANT
                </span>
              </motion.div>

              {/* Main heading */}
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight'>
                <span className='text-gray-900 dark:text-white'>
                  Your AI Assistant
                </span>
                <br />
                <motion.span
                  className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent inline-block'
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  for Hedera
                </motion.span>
              </h1>

              {/* Description */}
              <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed'>
                Chat naturally with AI to manage your crypto, deploy smart contracts, 
                and interact with the Hedera network. No complex commands—just conversation.
              </p>
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='flex flex-wrap gap-6'
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className='flex items-center gap-3'
                  animate={{
                    scale: activeDemo === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    activeDemo === index 
                      ? 'bg-gradient-to-br from-[#a679f0] to-[#5599fe] shadow-lg scale-110' 
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    <div className={`transition-colors duration-300 ${
                      activeDemo === index ? 'text-white' : 'text-[#5599fe]'
                    }`}>
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <div className={`text-sm font-semibold transition-colors duration-300 ${
                      activeDemo === index ? 'text-[#5599fe] dark:text-[#48df7b]' : 'text-gray-900 dark:text-white'
                    }`}>
                      {feature.title}
                    </div>
                    <div className='text-xs text-gray-500 dark:text-gray-400'>
                      {feature.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='flex flex-col sm:flex-row gap-4'
            >
              <PrimaryButton
                href='https://github.com/hashgraph-online/conversational-agent/releases'
                target='_blank'
                rel='noopener noreferrer'
                size='lg'
                className='bg-[#a679f0] hover:bg-[#a679f0]/90 text-white border-0 shadow-xl shadow-[#a679f0]/30'
                icon={<FaDownload />}
                data-umami-event='conversational-agent-hero-download'
                data-umami-event-category='conversational-agent'
              >
                Download for Free
              </PrimaryButton>

              <PrimaryButton
                href='https://github.com/hashgraph-online/conversational-agent'
                target='_blank'
                rel='noopener noreferrer'
                size='lg'
                className='bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                icon={<FaGithub />}
                data-umami-event='conversational-agent-hero-github'
                data-umami-event-category='conversational-agent'
              >
                View Source
              </PrimaryButton>
            </motion.div>
          </div>

          {/* Demo Interface */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='relative z-10'
          >
            <div className='bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
              {/* App window header */}
              <div className='flex items-center gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
                <div className='flex gap-2'>
                  <div className='w-3 h-3 bg-red-400 rounded-full'></div>
                  <div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
                  <div className='w-3 h-3 bg-green-400 rounded-full'></div>
                </div>
                <div className='flex-1 text-center'>
                  <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    HashgraphOnline AI Assistant
                  </span>
                </div>
              </div>

              {/* Chat interface */}
              <div className='p-6 min-h-[400px] flex flex-col'>
                <div className='flex-1 space-y-4 mb-6'>
                  {/* Assistant message */}
                  <div className='flex items-start gap-3'>
                    <div className='w-8 h-8 bg-gradient-to-br from-[#a679f0] to-[#5599fe] rounded-full flex items-center justify-center'>
                      <FaRobot className='text-white text-sm' />
                    </div>
                    <div className='flex-1'>
                      <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm'>
                        Hi! I'm your Hedera AI assistant. I can help you manage HBAR, 
                        create tokens, deploy contracts, and more. What would you like to do?
                      </div>
                    </div>
                  </div>

                  {/* User message */}
                  <div className='flex items-start gap-3 justify-end'>
                    <div className='flex-1 max-w-xs'>
                      <div className='bg-[#5599fe] text-white rounded-lg p-3 text-sm ml-auto text-right'>
                        Send 10 HBAR to account 0.0.98765
                      </div>
                    </div>
                    <div className='w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center'>
                      <span className='text-xs font-semibold'>U</span>
                    </div>
                  </div>

                  {/* Assistant response */}
                  <div className='flex items-start gap-3'>
                    <div className='w-8 h-8 bg-gradient-to-br from-[#a679f0] to-[#5599fe] rounded-full flex items-center justify-center'>
                      <FaRobot className='text-white text-sm' />
                    </div>
                    <div className='flex-1'>
                      <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm'>
                        I'll help you transfer 10 HBAR to account 0.0.98765. 
                        Let me prepare the transaction...
                        <div className='mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border-l-4 border-green-400'>
                          <div className='text-xs text-green-700 dark:text-green-300'>
                            ✅ Transaction successful! TxID: 0.0.12345@1234567890.123456789
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input area */}
                <div className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700'>
                  <div className='flex-1 text-sm text-gray-600 dark:text-gray-400 font-mono'>
                    <TypingEffect
                      texts={demoConversations}
                      typingSpeed={40}
                      deletingSpeed={25}
                      delayBetweenTexts={3000}
                      cursorClassName='text-[#5599fe] animate-pulse'
                    />
                  </div>
                  <motion.div
                    className='w-8 h-8 bg-[#5599fe] rounded-lg flex items-center justify-center cursor-pointer'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPlay className='text-white text-xs ml-0.5' />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating elements around the demo */}
            <motion.div
              className='absolute -top-4 -right-4 w-24 h-24 bg-[#a679f0]/10 rounded-full blur-2xl'
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className='absolute -bottom-4 -left-4 w-24 h-24 bg-[#48df7b]/10 rounded-full blur-2xl'
              animate={{
                scale: [1.3, 1, 1.3],
                opacity: [0.3, 0.6, 0.3],
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

export default ConvAIHeroSectionNew;