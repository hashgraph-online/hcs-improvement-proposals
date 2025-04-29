import React from 'react';
import { motion } from 'framer-motion';
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <Section
              icon={<FaPaperPlane />}
              title='Ready to Build the Future of DeFi AI?'
            />

            <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
              Register for the Bonzo Finance AI Agent Challenge and start
              building your AI agent on Hedera.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='bg-white dark:bg-gray-800 rounded-xl shadow-md border border-purple-100 dark:border-gray-700 p-6 md:p-8 overflow-hidden'
          >
            <div className='aspect-w-16 aspect-h-9'>
              <iframe
                src='https://tally.so/embed/wggvxD?alignLeft=1&hideTitle=1&transparentBackground=1'
                frameBorder='0'
                title='Bonzo Finance AI Agent Challenge Registration'
                className='w-full h-[700px] min-h-[500px]'
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
