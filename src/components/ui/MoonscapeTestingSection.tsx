import React from 'react';
import { motion } from 'motion/react';
import {
  FaComments,
  FaExternalLinkAlt,
  FaGlobe,
  FaUserFriends,
} from 'react-icons/fa';
import { LaptopMockup } from './index';

interface MoonscapeTestingSectionProps {
  variant?: 'hackathon' | 'general';
}

const MoonscapeTestingSection: React.FC<MoonscapeTestingSectionProps> = ({ 
  variant = 'general' 
}) => {
  const isHackathon = variant === 'hackathon';
  
  return (
    <div className='mt-24'>
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
          className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#48df7b]/10 to-[#5599fe]/10 dark:from-[#48df7b]/20 dark:to-[#5599fe]/20 border border-[#48df7b]/20 dark:border-[#48df7b]/30 mb-6'
        >
          <FaComments className='text-[#48df7b] mr-2' />
          <span className='text-sm font-bold text-[#48df7b] dark:text-[#5599fe]'>
            TESTING YOUR AI AGENT
          </span>
        </motion.div>

        <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
          <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
            Testing Your AI Project
          </span>
        </h2>

        <p className='text-base text-gray-600 dark:text-white/70 max-w-3xl mx-auto'>
          Building an AI agent? Use the Moonscape Portal to interact with
          your agent in a real-world environment.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className='max-w-6xl mx-auto'
      >
        <div className='relative rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 ring-1 ring-gray-200/50 dark:ring-gray-600'>
          <div className='absolute inset-0'>
            <div className='absolute inset-0 bg-gradient-to-br from-[#48df7b]/5 via-[#5599fe]/5 to-[#a679f0]/5 dark:from-[#48df7b]/10 dark:via-[#5599fe]/10 dark:to-[#a679f0]/10' />
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className='absolute inset-0 opacity-30'
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 80%, #48df7b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #5599fe 0%, transparent 50%), radial-gradient(circle at 40% 40%, #a679f0 0%, transparent 50%)',
                backgroundSize: '200% 200%',
              }}
            />
          </div>

          <div className='relative grid lg:grid-cols-12 gap-8 p-8 lg:p-12'>
            {/* Laptop - Takes up more space like homepage */}
            <div className='lg:col-span-7 transform scale-90 sm:scale-100 lg:scale-105 origin-left pr-4'>
              <LaptopMockup>
                <img
                  src='/use-cases/moonscape-portal.jpg'
                  alt='Moonscape Portal Interface'
                  className='w-full h-full object-cover object-left'
                />
              </LaptopMockup>
            </div>

            {/* Content - Smaller column like homepage */}
            <div className='lg:col-span-5 flex flex-col justify-center pl-4'>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className='text-2xl lg:text-3xl font-bold mb-2 text-gray-700 dark:text-white'>
                  For AI Agent Projects: Moonscape Portal
                </h3>
                <p className='text-base text-gray-600 dark:text-white/70 mb-3'>
                  {isHackathon 
                    ? 'If you\'re building an AI agent, Moonscape provides a live testing environment where judges and participants can interact with your creation.'
                    : 'Moonscape provides a live testing environment where you can interact with your AI agent creation in real-time.'
                  }
                </p>

                <div className='space-y-1 mb-3'>
                  <div className='flex items-start gap-2'>
                    <div className='w-9 h-9 rounded-lg bg-gradient-to-r from-[#48df7b] to-[#5599fe] flex items-center justify-center flex-shrink-0'>
                      <FaComments className='w-4 h-4 text-white' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-semibold text-gray-700 dark:text-white text-sm leading-tight'>
                        Chat Interface
                      </h4>
                      <p className='text-xs text-gray-600 dark:text-white/70 -mt-1.5'>
                        Test through natural conversations
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-2'>
                    <div className='w-9 h-9 rounded-lg bg-gradient-to-r from-[#5599fe] to-[#a679f0] flex items-center justify-center flex-shrink-0'>
                      <FaUserFriends className='w-4 h-4 text-white' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-semibold text-gray-700 dark:text-white text-sm leading-tight'>
                        Agent Discovery
                      </h4>
                      <p className='text-xs text-gray-600 dark:text-white/70 -mt-1.5'>
                        Browse and connect with other agents
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-2'>
                    <div className='w-9 h-9 rounded-lg bg-gradient-to-r from-[#a679f0] to-[#48df7b] flex items-center justify-center flex-shrink-0'>
                      <FaGlobe className='w-4 h-4 text-white' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-semibold text-gray-700 dark:text-white text-sm leading-tight'>
                        Live Demonstration
                      </h4>
                      <p className='text-xs text-gray-600 dark:text-white/70 -mt-1.5'>
                        Showcase your agent in real-time
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex gap-2'>
                  <a
                    href='https://moonscape.tech/openconvai/chat'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5599fe] to-[#a679f0] text-white font-medium text-sm rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap'
                  >
                    <FaExternalLinkAlt className='w-3 h-3' />
                    Launch Chat
                  </a>
                  <a
                    href='https://moonscape.tech/openconvai/agents'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all border-2 border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/40 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 bg-transparent whitespace-nowrap'
                  >
                    <FaUserFriends className='w-3 h-3' />
                    Browse Agents
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MoonscapeTestingSection;