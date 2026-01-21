import React, { useState, useEffect, useRef } from 'react';
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

const REACLE_FORM_ID = 'ac327b5768122432279ed0a9';

const NewsletterModal: React.FC<NewsletterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (isOpen && !scriptLoadedRef.current) {
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
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 overflow-y-auto pt-10 sm:pt-20'
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className='relative w-full max-w-4xl mx-auto bg-gradient-to-br from-[#8259ef]/90 to-[#2d84eb]/90 dark:from-[#8259ef] dark:to-[#2d84eb] rounded-xl overflow-hidden shadow-2xl border border-[#8259ef]/30 dark:border-[#8259ef]/40 my-2 sm:my-4'
      >
        <div className='flex justify-between items-center p-3 sm:p-4 md:p-5 border-b border-[#8259ef]/50 dark:border-[#8259ef]/60'>
          <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-white dark:text-white'>
            Subscribe to ConvAI Updates
          </h2>
          <button
            onClick={onClose}
            className='text-white/70 hover:text-white z-10 p-2 bg-black/20 dark:bg-black/30 hover:bg-black/30 dark:hover:bg-black/40 rounded-full transition-colors'
            aria-label='Close modal'
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className='px-3 sm:px-4 md:px-5 pt-3 text-white'>
          <p className='text-xs sm:text-sm text-[#e4d5ff] dark:text-[#f0e8ff] mb-3 sm:mb-4 max-w-2xl'>
            Stay informed about the latest developments in the ConvAI ecosystem.
            Receive updates on the standard, SDK releases, portal features, and
            upcoming events.
          </p>
        </div>

        <div className='px-4 py-6 min-h-[350px]'>
          <div id='form-root-publish' className='min-h-[300px]' />
        </div>

        <div className='p-3 bg-[#8259ef]/30 dark:bg-[#8259ef]/50 text-center'>
          <button
            onClick={onClose}
            className='px-6 py-2 bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/15 rounded-lg text-white transition-colors'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const RegisterSection: React.FC = () => {
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  return (
    <div className='py-6 sm:py-10 bg-white dark:bg-gray-900' id='register'>
      <NewsletterModal
        isOpen={showNewsletterModal}
        onClose={() => setShowNewsletterModal(false)}
      />
      <div className='container mx-auto px-4 sm:px-6'>
        <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8'>
          <div className='lg:w-1/2'>
            <div
            >
              <div className='inline-block px-3 py-1 mb-3 sm:mb-4 rounded-full bg-red-500/10 border border-red-500/20'>
                <span className='text-xs sm:text-sm text-red-500 font-medium'>
                  EVENT ENDED
                </span>
              </div>
              <h2
                className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 font-styrene'
                style={{
                  fontFamily: 'Styrene A',
                }}
              >
                The Hedera OpenConvAI & Agents{' '}
                <span className='text-[#8259ef]'>Hackathon</span> Has Ended
              </h2>
              <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 max-w-xl'>
                Thank you to all participants who built innovative AI solutions on Hedera.
                Stay tuned for our next hackathon and continue building the future of
                autonomous AI communication.
              </p>
            </div>

            <div
              className='space-y-3 sm:space-y-4'
            >
              <div className='bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-3 sm:p-4 rounded-xl border border-[#8259ef]/10 dark:border-[#8259ef]/20 shadow-md'>
                <div className='flex flex-col md:flex-row items-center gap-3 sm:gap-4'>
                  <div className='md:w-2/3'>
                    <div className='flex items-center'>
                      <div className='bg-[#3ec878]/10 dark:bg-[#3ec878]/20 p-2 rounded-full text-[#3ec878] mr-2 sm:mr-3'>
                        <FaCalendarAlt size={16} className='sm:text-lg' />
                      </div>
                      <h3 className='text-base sm:text-lg font-bold text-gray-900 dark:text-white'>
                        View Hackathon Winners
                      </h3>
                    </div>
                    <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 sm:mt-3'>
                      Check out the winning projects and see what the community
                      built during the hackathon.
                    </p>
                  </div>
                  <div className='md:w-1/3 flex justify-center md:justify-end mt-4 md:mt-0'>
                    <PrimaryButton
                      href='/blog/hedera-ai-hackathon-winners'
                      icon={<FaArrowRight className='text-xs sm:text-sm' />}
                      className='w-full md:w-auto text-xs sm:text-sm'
                      size='sm'
                    >
                      View Winners
                    </PrimaryButton>
                  </div>
                </div>
              </div>

              <div className='bg-gradient-to-br from-[#8259ef]/5 to-[#2d84eb]/5 dark:from-[#8259ef]/10 dark:to-[#2d84eb]/10 p-3 sm:p-4 rounded-xl border border-[#8259ef]/10 dark:border-[#8259ef]/20 shadow-md'>
                <div className='flex flex-col md:flex-row items-center gap-3 sm:gap-4'>
                  <div className='md:w-2/3'>
                    <div className='flex items-center'>
                      <div className='bg-[#8259ef]/10 dark:bg-[#8259ef]/20 p-2 rounded-full text-[#8259ef] mr-2 sm:mr-3'>
                        <FaRobot size={16} className='sm:text-lg' />
                      </div>
                      <h3 className='text-base sm:text-lg font-bold text-gray-900 dark:text-white'>
                        Stay Updated
                      </h3>
                    </div>
                    <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 sm:mt-3'>
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
            </div>
          </div>

          <div className='lg:w-1/2 mt-8 lg:mt-0'>
            <div
            >
              <h3
                className='text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center font-styrene'
                style={{
                  fontFamily: 'Styrene A',
                }}
              >
                <FaTrophy className='text-[#3ec878] mr-2' /> Prize Distribution (Hackathon Ended)
              </h3>
            </div>

            <div className='space-y-3 sm:space-y-4'>
              <div className='relative'>
                <div className='absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-[#8259ef]/40 to-[#2d84eb]/40 rounded-3xl blur-lg opacity-20'></div>
                <div
                  className='relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-3 sm:p-4 rounded-xl border border-[#8259ef]/10 dark:border-[#8259ef]/20 shadow-sm'
                >
                  <div className='flex justify-between items-center mb-2 sm:mb-3'>
                    <div>
                      <span className='text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400'>
                        Track 1
                      </span>
                      <h4 className='text-sm sm:text-base font-bold text-gray-900 dark:text-white'>
                        Best use of OpenConvAI
                      </h4>
                    </div>
                    <div className='bg-[#8259ef]/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-[#8259ef]'>
                      $10,000 Total
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <div className='w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-[#8259ef] to-[#2d84eb] text-white flex items-center justify-center font-bold text-xs mr-2'>
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
                        <div className='w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-[#8259ef]/80 to-[#2d84eb]/80 text-white flex items-center justify-center font-bold text-xs mr-2'>
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
                </div>
              </div>

              <div
                className='bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-3 sm:p-4 rounded-xl border border-[#8259ef]/10 dark:border-[#8259ef]/20 shadow-sm'
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
                      <div className='w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-[#3ec878] to-[#2d84eb] text-white flex items-center justify-center font-bold text-xs mr-2'>
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
                      <div className='w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-[#3ec878]/80 to-[#2d84eb]/80 text-white flex items-center justify-center font-bold text-xs mr-2'>
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
              </div>

              <div
                className='bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-3 sm:p-4 rounded-xl border border-[#8259ef]/10 dark:border-[#8259ef]/20 shadow-sm'
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
                      <div className='w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-[#2d84eb] to-[#8259ef] text-white flex items-center justify-center font-bold text-xs mr-2'>
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
                      <div className='w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-[#2d84eb]/80 to-[#8259ef]/80 text-white flex items-center justify-center font-bold text-xs mr-2'>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSection;
