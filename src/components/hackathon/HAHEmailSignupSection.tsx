import React from 'react';
import { motion } from 'motion/react';
import { FaEnvelope, FaBell, FaCalendarAlt } from 'react-icons/fa';
import { TransformCard } from '../ui';
import PrimaryButton from './PrimaryButton';

type HAHEmailSignupSectionProps = {
  onNewsletterClick: () => void;
};

const HAHEmailSignupSection: React.FC<HAHEmailSignupSectionProps> = ({
  onNewsletterClick,
}) => {
  return (
    <section className='py-16 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='max-w-4xl mx-auto'
        >
          <TransformCard
            rotation='rotate-[-0.5deg]'
            background='bg-white dark:bg-gray-900'
            border='border-2 border-gray-200 dark:border-gray-700'
            shadow='xl'
            className='p-8 lg:p-12'
          >
            <div className='text-center'>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5599fe] to-[#48df7b] text-white text-2xl mb-6'
              >
                <FaEnvelope />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className='text-2xl sm:text-3xl font-bold mb-4'
              >
                <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
                  Stay Updated on the AI Track
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto'
              >
                Get exclusive updates about workshops, office hours, resources, and
                important announcements for the Hedera Africa Hackathon AI Track.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-lg bg-[#a679f0]/10 dark:bg-[#a679f0]/20 flex items-center justify-center'>
                    <FaBell className='text-[#a679f0]' />
                  </div>
                  <div className='text-left'>
                    <div className='font-semibold text-gray-900 dark:text-white text-sm'>
                      Workshop Alerts
                    </div>
                    <div className='text-xs text-gray-500 dark:text-gray-400'>
                      Never miss a session
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-lg bg-[#5599fe]/10 dark:bg-[#5599fe]/20 flex items-center justify-center'>
                    <FaCalendarAlt className='text-[#5599fe]' />
                  </div>
                  <div className='text-left'>
                    <div className='font-semibold text-gray-900 dark:text-white text-sm'>
                      Important Dates
                    </div>
                    <div className='text-xs text-gray-500 dark:text-gray-400'>
                      Deadlines & milestones
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-lg bg-[#48df7b]/10 dark:bg-[#48df7b]/20 flex items-center justify-center'>
                    <FaEnvelope className='text-[#48df7b]' />
                  </div>
                  <div className='text-left'>
                    <div className='font-semibold text-gray-900 dark:text-white text-sm'>
                      Exclusive Resources
                    </div>
                    <div className='text-xs text-gray-500 dark:text-gray-400'>
                      Tools & documentation
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <PrimaryButton
                  onClick={onNewsletterClick}
                  size='lg'
                  className='bg-gradient-to-r from-[#a679f0] to-[#5599fe] hover:from-[#a679f0]/90 hover:to-[#5599fe]/90 text-white border-0'
                  icon={<FaEnvelope />}
                >
                  Join Email List
                </PrimaryButton>
              </motion.div>
            </div>
          </TransformCard>
        </motion.div>
      </div>
    </section>
  );
};

export default HAHEmailSignupSection;