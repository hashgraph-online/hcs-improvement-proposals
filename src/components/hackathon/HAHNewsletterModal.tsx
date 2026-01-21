import React, { useEffect, useRef } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import PrimaryButton from './PrimaryButton';

type HAHNewsletterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const REACLE_FORM_ID = 'ac327b5768122432279ed0a9';

const HAHNewsletterModal: React.FC<HAHNewsletterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      if (!scriptLoadedRef.current) {
        (window as unknown as Record<string, string>).reacleFormId = REACLE_FORM_ID;

        const existingScript = document.querySelector('script[src="https://reacle.com/static/form.js"]');
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = 'https://reacle.com/static/form.js';
          script.defer = true;
          document.body.appendChild(script);
        }
        scriptLoadedRef.current = true;
      }
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
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <div
            className='relative w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 my-2 sm:my-4'
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

            <div className='p-6 min-h-[400px]'>
              <div id='form-root-publish' className='min-h-[350px]' />
            </div>

            <div className='p-4 bg-gradient-to-r from-[#a679f0]/5 via-[#5599fe]/5 to-[#48df7b]/5 dark:bg-gray-800 text-center border-t border-gray-200 dark:border-gray-700'>
              <PrimaryButton onClick={onClose} className='bg-gray-600 hover:bg-gray-700'>Close</PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HAHNewsletterModal;
