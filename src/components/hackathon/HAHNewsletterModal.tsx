import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaRegTimesCircle } from 'react-icons/fa';
import PrimaryButton from './PrimaryButton';

type HAHNewsletterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HAHNewsletterModal: React.FC<HAHNewsletterModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
            className='relative w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 my-2 sm:my-4'
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className='flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#a679f0]/10 via-[#5599fe]/10 to-[#48df7b]/10'>
              <div>
                <h2 className='text-2xl font-bold bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
                  Stay Updated on the AI Track
                </h2>
                <p className='text-gray-600 dark:text-gray-400 mt-1'>
                  Get exclusive updates about the Hedera Africa Hackathon AI Track,
                  including workshops, resources, and important announcements.
                </p>
              </div>
              <button
                onClick={onClose}
                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                aria-label='Close modal'
              >
                <FaRegTimesCircle size={24} />
              </button>
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

            <div className='p-4 bg-gradient-to-r from-[#a679f0]/5 via-[#5599fe]/5 to-[#48df7b]/5 dark:bg-gray-800 text-center border-t border-gray-200 dark:border-gray-700'>
              <PrimaryButton onClick={onClose} className='bg-gray-600 hover:bg-gray-700'>Close</PrimaryButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HAHNewsletterModal;