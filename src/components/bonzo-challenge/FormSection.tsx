import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { Section } from '../hackathon/Section';

const FormSection: React.FC = () => {
  return (
    <section
      id='register'
      className='py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden isolation'
    >
      <div className='absolute inset-0 z-[-1] overflow-hidden'>
        <div
          className='absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full opacity-30 dark:opacity-20 blur-3xl'
          style={{
            background:
              'radial-gradient(circle at center, rgba(130, 89, 239, 0.4), rgba(130, 89, 239, 0) 70%)',
          }}
        ></div>
        <div
          className='absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full opacity-30 dark:opacity-20 blur-3xl'
          style={{
            background:
              'radial-gradient(circle at center, rgba(62, 200, 120, 0.4), rgba(62, 200, 120, 0) 70%)',
          }}
        ></div>

        <div
          className='absolute inset-0 opacity-[0.02] dark:opacity-[0.03]'
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(130, 89, 239, 0.3) 1px, transparent 1px),
              linear-gradient(rgba(45, 132, 235, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        ></div>
      </div>

      <div className='container mx-auto px-4 sm:px-6 relative z-10'>
        <div className='max-w-4xl mx-auto'>
          <div
            className='text-center mb-12'
          >
            <Section
              icon={<FaPaperPlane />}
              title='Challenge Completed!'
            />

            <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6'>
              The Bonzo Finance AI Agent Challenge has ended. Thank you to all participants
              who built innovative AI agents on Hedera.
            </p>
          </div>

          <div
            className='bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-12 text-center'
          >
            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
              Challenge Period Ended
            </h3>
            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              Stay tuned for future challenges and opportunities to build on Hedera!
            </p>
            <a
              href='https://bonzo.finance'
              className='inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors'
            >
              Visit Bonzo Finance →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
