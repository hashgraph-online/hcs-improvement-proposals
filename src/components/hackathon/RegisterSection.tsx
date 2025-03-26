import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaTrophy,
  FaArrowRight,
  FaRobot,
  FaCalendarAlt,
  FaTimes,
} from 'react-icons/fa';
import PrimaryButton from './PrimaryButton';

type NewsletterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const NewsletterModal: React.FC<NewsletterModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className='fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 overflow-y-auto pt-10 sm:pt-20'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        className='relative w-full max-w-4xl mx-auto bg-gradient-to-br from-[#8259ef]/90 to-[#2d84eb]/90 dark:from-[#8259ef] dark:to-[#2d84eb] rounded-xl overflow-hidden shadow-2xl border border-[#8259ef]/30 dark:border-[#8259ef]/40 my-2 sm:my-4'
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className='flex justify-between items-center p-4 sm:p-6 md:p-8 border-b border-[#8259ef]/50 dark:border-[#8259ef]/60'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-white dark:text-white'>
            Subscribe to ConvAI Updates
          </h2>
          <button
            onClick={onClose}
            className='text-white/70 hover:text-white z-10 p-2 bg-black/20 dark:bg-black/30 hover:bg-black/30 dark:hover:bg-black/40 rounded-full transition-colors'
            aria-label='Close modal'
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className='px-4 sm:px-6 md:px-8 pt-4 text-white'>
          <p className='text-sm sm:text-base text-[#e4d5ff] dark:text-[#f0e8ff] mb-4 sm:mb-6 max-w-2xl'>
            Stay informed about the latest developments in the ConvAI ecosystem.
            Receive updates on the standard, SDK releases, portal features, and
            upcoming events.
          </p>
        </div>

        <iframe
          src='https://abf8595d.sibforms.com/serve/MUIFAFOh0_qO6OntUHoDlZoTAwNDz7dIC7zTMveLKftES2Ku1z5WNKcJuiMLBTATRQD3WBVXkID6XDI72mQHAe3_TfTbT0_gvKjGw6cujid9M64jKctPYIkt3uYEJXbItqwTmIJjHSEWPoxKteE3S8U9MG-KMVsIss96koZT9CbICG5kL0jBqtSAa9VsSVYT4du9d-S0jKrK069h'
          frameBorder='0'
          scrolling='auto'
          allowFullScreen
          className='w-full h-[500px] md:h-[600px]'
          style={{
            maxWidth: '100%',
            border: 'none',
          }}
        />

        <div className='p-4 bg-[#8259ef]/30 dark:bg-[#8259ef]/50 text-center'>
          <button
            onClick={onClose}
            className='px-6 py-2 bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/15 rounded-lg text-white transition-colors'
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const RegisterSection: React.FC = () => {
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  return (
    <div className='py-12 sm:py-20 bg-white dark:bg-gray-900' id='register'>
      <NewsletterModal
        isOpen={showNewsletterModal}
        onClose={() => setShowNewsletterModal(false)}
      />
      <div className='container mx-auto px-4 sm:px-6'>
        <div className='flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16'>
          <div className='lg:w-1/2'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className='inline-block px-3 py-1 mb-3 sm:mb-4 rounded-full bg-[#3ec878]/10 border border-[#3ec878]/20'>
                <span className='text-xs sm:text-sm text-[#3ec878] font-medium'>
                  April 11th - May 2nd, 2024
                </span>
              </div>
              <h2
                className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 font-styrene'
                style={{
                  fontFamily: 'Styrene A',
                }}
              >
                Register for the{' '}
                <span className='text-[#8259ef]'>Challenge</span>
              </h2>
              <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-xl'>
                Join our hackathon and build innovative AI solutions on Hedera.
                Take part in this opportunity to showcase your skills and win
                from our $30,000 prize pool.
              </p>
            </motion.div>

            <motion.div
              className='space-y-4 sm:space-y-6'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className='bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6 rounded-xl border border-[#8259ef]/10 dark:border-[#8259ef]/20 shadow-md'>
                <div className='flex flex-col md:flex-row items-center gap-4 sm:gap-6'>
                  <div className='md:w-2/3'>
                    <div className='flex items-center'>
                      <div className='bg-[#3ec878]/10 dark:bg-[#3ec878]/20 p-2 sm:p-3 rounded-full text-[#3ec878] mr-3 sm:mr-4'>
                        <FaCalendarAlt size={20} className='sm:text-2xl' />
                      </div>
                      <h3 className='text-lg sm:text-xl font-bold text-gray-900 dark:text-white'>
                        Register on DoraHacks
                      </h3>
                    </div>
                    <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-3 sm:mt-4'>
                      Official registration happens on the DoraHacks platform,
                      where you'll also submit your project for judging.
                    </p>
                  </div>
                  <div className='md:w-1/3 flex justify-center md:justify-end mt-4 md:mt-0'>
                    <PrimaryButton
                      href='https://dorahacks.io/org/hedera'
                      icon={<FaArrowRight className='text-xs sm:text-sm' />}
                      className='w-full md:w-auto text-xs sm:text-sm'
                      size='sm'
                    >
                      Register Now
                    </PrimaryButton>
                  </div>
                </div>
              </div>

              <div className='bg-gradient-to-br from-[#8259ef]/5 to-[#2d84eb]/5 dark:from-[#8259ef]/10 dark:to-[#2d84eb]/10 p-4 sm:p-6 rounded-xl border border-[#8259ef]/10 dark:border-[#8259ef]/20 shadow-md'>
                <div className='flex flex-col md:flex-row items-center gap-4 sm:gap-6'>
                  <div className='md:w-2/3'>
                    <div className='flex items-center'>
                      <div className='bg-[#8259ef]/10 dark:bg-[#8259ef]/20 p-2 sm:p-3 rounded-full text-[#8259ef] mr-3 sm:mr-4'>
                        <FaRobot size={20} className='sm:text-2xl' />
                      </div>
                      <h3 className='text-lg sm:text-xl font-bold text-gray-900 dark:text-white'>
                        Stay Updated
                      </h3>
                    </div>
                    <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-3 sm:mt-4'>
                      Sign up to receive the latest news and updates about the
                      ConvAI standard, SDK releases, and portal features as they
                      become available.
                    </p>
                  </div>
                  <div className='md:w-1/3 flex justify-center md:justify-end mt-4 md:mt-0'>
                    <PrimaryButton
                      onClick={() => setShowNewsletterModal(true)}
                      icon={<FaArrowRight className='text-xs sm:text-sm' />}
                      className='w-full md:w-auto bg-gradient-to-r from-[#8259ef] to-[#2d84eb] text-xs sm:text-sm'
                      size='sm'
                    >
                      Subscribe
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className='lg:w-1/2 mt-8 lg:mt-0'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3
                className='text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center font-styrene'
                style={{
                  fontFamily: 'Styrene A',
                }}
              >
                <FaTrophy className='text-[#3ec878] mr-2' /> Prize Distribution
              </h3>
            </motion.div>

            <div className='space-y-4 sm:space-y-6'>
              <div className='relative'>
                <div className='absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-[#8259ef]/40 to-[#2d84eb]/40 rounded-3xl blur-lg opacity-20'></div>
                <motion.div
                  className='relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6 rounded-xl border border-[#8259ef]/10 dark:border-[#8259ef]/20 shadow-sm'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className='flex justify-between items-center mb-3 sm:mb-4'>
                    <div>
                      <span className='text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400'>
                        Track 1
                      </span>
                      <h4 className='text-base sm:text-lg font-bold text-gray-900 dark:text-white'>
                        Best use of OpenConvAI
                      </h4>
                    </div>
                    <div className='bg-[#8259ef]/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-[#8259ef]'>
                      $10,000 Total
                    </div>
                  </div>

                  <div className='space-y-2 sm:space-y-3'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#8259ef] to-[#2d84eb] text-white flex items-center justify-center font-bold text-xs mr-2 sm:mr-3'>
                          1st
                        </div>
                        <span className='text-sm sm:text-base text-gray-700 dark:text-gray-300'>
                          First Prize
                        </span>
                      </div>
                      <span className='font-bold text-sm sm:text-base text-gray-900 dark:text-white'>
                        $6,500
                      </span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#8259ef]/80 to-[#2d84eb]/80 text-white flex items-center justify-center font-bold text-xs mr-2 sm:mr-3'>
                          2nd
                        </div>
                        <span className='text-sm sm:text-base text-gray-700 dark:text-gray-300'>
                          Second Prize
                        </span>
                      </div>
                      <span className='font-bold text-sm sm:text-base text-gray-900 dark:text-white'>
                        $3,500
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className='bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6 rounded-xl border border-[#8259ef]/10 dark:border-[#8259ef]/20 shadow-sm'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className='flex justify-between items-center mb-3 sm:mb-4'>
                  <div>
                    <span className='text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400'>
                      Track 2
                    </span>
                    <h4 className='text-base sm:text-lg font-bold text-gray-900 dark:text-white'>
                      Best use of Hedera ElizaOS Plugin
                    </h4>
                  </div>
                  <div className='bg-[#3ec878]/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-[#3ec878]'>
                    $10,000 Total
                  </div>
                </div>

                <div className='space-y-2 sm:space-y-3'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#3ec878] to-[#2d84eb] text-white flex items-center justify-center font-bold text-xs mr-2 sm:mr-3'>
                        1st
                      </div>
                      <span className='text-sm sm:text-base text-gray-700 dark:text-gray-300'>
                        First Prize
                      </span>
                    </div>
                    <span className='font-bold text-sm sm:text-base text-gray-900 dark:text-white'>
                      $6,500
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#3ec878]/80 to-[#2d84eb]/80 text-white flex items-center justify-center font-bold text-xs mr-2 sm:mr-3'>
                        2nd
                      </div>
                      <span className='text-sm sm:text-base text-gray-700 dark:text-gray-300'>
                        Second Prize
                      </span>
                    </div>
                    <span className='font-bold text-sm sm:text-base text-gray-900 dark:text-white'>
                      $3,500
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className='bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6 rounded-xl border border-[#8259ef]/10 dark:border-[#8259ef]/20 shadow-sm'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className='flex justify-between items-center mb-3 sm:mb-4'>
                  <div>
                    <span className='text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400'>
                      Track 3
                    </span>
                    <h4 className='text-base sm:text-lg font-bold text-gray-900 dark:text-white'>
                      Best use of Hedera Agent Kit or MCP
                    </h4>
                  </div>
                  <div className='bg-[#2d84eb]/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-[#2d84eb]'>
                    $10,000 Total
                  </div>
                </div>

                <div className='space-y-2 sm:space-y-3'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#2d84eb] to-[#8259ef] text-white flex items-center justify-center font-bold text-xs mr-2 sm:mr-3'>
                        1st
                      </div>
                      <span className='text-sm sm:text-base text-gray-700 dark:text-gray-300'>
                        First Prize
                      </span>
                    </div>
                    <span className='font-bold text-sm sm:text-base text-gray-900 dark:text-white'>
                      $6,500
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#2d84eb]/80 to-[#8259ef]/80 text-white flex items-center justify-center font-bold text-xs mr-2 sm:mr-3'>
                        2nd
                      </div>
                      <span className='text-sm sm:text-base text-gray-700 dark:text-gray-300'>
                        Second Prize
                      </span>
                    </div>
                    <span className='font-bold text-sm sm:text-base text-gray-900 dark:text-white'>
                      $3,500
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSection;
