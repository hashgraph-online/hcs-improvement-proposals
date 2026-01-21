import React, { useEffect } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import MailerooEmbedForm from './MailerooEmbedForm';

type NewsletterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const NewsletterModal: React.FC<NewsletterModalProps> = ({
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
    <>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 overflow-y-auto pt-10 sm:pt-20'
          data-umami-event='newsletter-modal-backdrop-click'
          data-umami-event-category='engagement'
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <div
            className='relative w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 my-2 sm:my-4'
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
                    Stay updated with the latest news, standards, and
                    innovations in the Hedera ecosystem.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0'
                aria-label='Close modal'
                data-umami-event='newsletter-modal-close-x'
                data-umami-event-category='engagement'
              >
                <FaRegTimesCircle size={24} />
              </button>
            </div>

            <div className='p-6'>
              <MailerooEmbedForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterModal;
