import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegTimesCircle } from 'react-icons/fa';
import { FiMail, FiCheck } from 'react-icons/fi';

type NewsletterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const NewsletterModal: React.FC<NewsletterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setShowSuccessMessage(false);
      setCountdown(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Listen for messages from iframe (form submission)
  useEffect(() => {
    if (!isOpen) return;

    const handleMessage = (event: MessageEvent) => {
      // Listen for Sibforms success messages
      if (event.data && typeof event.data === 'string') {
        if (event.data.includes('success') || event.data.includes('thank') || event.data.includes('submitted')) {
          handleSuccess();
        }
      }
      // Also listen for object-based messages
      if (event.data && typeof event.data === 'object') {
        if (event.data.type === 'form_submitted' || event.data.status === 'success') {
          handleSuccess();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isOpen]);

  // Fallback: Auto-trigger success after reasonable time if user is still on modal
  useEffect(() => {
    if (!isOpen) return;

    const fallbackTimer = setTimeout(() => {
      // If modal is still open after 30 seconds, show the manual success button more prominently
      if (isOpen && !showSuccessMessage) {
        // Could add a hint here that they can click "I submitted the form" if they completed it
      }
    }, 30000);

    return () => clearTimeout(fallbackTimer);
  }, [isOpen, showSuccessMessage]);

  // Auto-close timer after showing success message
  useEffect(() => {
    if (showSuccessMessage && countdown > 0) {
      const timer = setTimeout(() => {
        if (countdown === 1) {
          onClose();
        } else {
          setCountdown(countdown - 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage, countdown, onClose]);

  // Function to trigger success state (can be called manually)
  const handleSuccess = () => {
    setShowSuccessMessage(true);
    setCountdown(3); // 3 second countdown
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 overflow-y-auto pt-10 sm:pt-20'
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
            className='relative w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 my-2 sm:my-4'
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className='flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#a679f0]/10 via-[#5599fe]/10 to-[#48df7b]/10'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-full bg-[#a679f0]/20 flex items-center justify-center'>
                  <FiMail className='text-2xl text-[#a679f0]' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
                    Join Our Newsletter
                  </h2>
                  <p className='text-gray-600 dark:text-gray-400 mt-1'>
                    Stay updated with the latest news, standards, and innovations in the Hedera ecosystem.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0'
                aria-label='Close modal'
              >
                <FaRegTimesCircle size={24} />
              </button>
            </div>

            <iframe
              src='https://abf8595d.sibforms.com/serve/MUIFAPkTSu_LF4xv1Skm7IXZKSZankgAHr4d_KC7h5yIchx0FB-dG1J9tNuIK2eeAVn2AIMogqljB9LV1UnRTKoc-8xGGgBzbul2oxJOqJg_aY1HDcV0f3IiMeMPT6zjaezAO5S7sbG6CD_j7sLEwbktzsOmtj1_laBmMsIETe9d1-soMdj37nr1JH1Cjyiw81jAO6pa9MnhYLCL'
              frameBorder='0'
              scrolling='auto'
              allowFullScreen
              className='w-full h-[600px] md:h-[700px]'
              style={{
                maxWidth: '100%',
                border: 'none',
              }}
            />

            <div className='p-6 bg-gradient-to-r from-[#a679f0]/5 via-[#5599fe]/5 to-[#48df7b]/5 dark:bg-gray-800 text-center border-t border-gray-200 dark:border-gray-700 mt-4'>
              {showSuccessMessage ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='text-center'
                >
                  <div className='flex items-center justify-center gap-2 text-green-600 mb-2'>
                    <FiCheck className='text-xl' />
                    <span className='font-medium'>Successfully subscribed!</span>
                  </div>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Closing in {countdown} second{countdown !== 1 ? 's' : ''}...
                  </p>
                </motion.div>
              ) : (
                <div className='space-y-3'>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
                    After submitting the form above, click the button below to continue:
                  </p>
                  <div className='flex gap-3 justify-center'>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSuccess}
                      className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2'
                    >
                      <FiCheck className='text-sm' />
                      I submitted the form
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className='px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors'
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;