import React from 'react';
import { motion } from 'motion/react';
import { FaEnvelope, FaBell, FaCalendarCheck, FaGift, FaRocket, FaStar } from 'react-icons/fa';
import PrimaryButton from './PrimaryButton';

type HAHNewsletterSectionProps = {
  onNewsletterClick: () => void;
};

const HAHNewsletterSection: React.FC<HAHNewsletterSectionProps> = ({ onNewsletterClick }) => {
  const benefits = [
    { icon: <FaBell />, text: 'Workshop alerts' },
    { icon: <FaCalendarCheck />, text: 'Key deadlines' },
    { icon: <FaGift />, text: 'Exclusive resources' },
    { icon: <FaRocket />, text: 'Early announcements' },
  ];

  return (
    <section className='py-12 sm:py-16 relative bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-black dark:to-gray-900 overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0'>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-[#a679f0]/20 to-[#5599fe]/20 rounded-full blur-3xl'
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
          className='absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-[#5599fe]/20 to-[#48df7b]/20 rounded-full blur-3xl'
        />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='max-w-4xl mx-auto'
        >
          {/* Main card with gradient border */}
          <div className='relative group'>
            {/* Animated gradient border */}
            <motion.div
              className='absolute -inset-1 bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] rounded-3xl opacity-75 group-hover:opacity-100 blur-xl'
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            />
            
            {/* Card content */}
            <div className='relative bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl'>
              <div className='flex flex-col lg:flex-row items-center gap-8'>
                {/* Left content */}
                <div className='flex-1 text-center lg:text-left'>
                  <div className='flex items-center gap-4 justify-center lg:justify-start mb-4'>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', duration: 0.6 }}
                      className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#a679f0] to-[#5599fe] text-white text-3xl flex-shrink-0'
                    >
                      <FaEnvelope />
                    </motion.div>
                    
                    <h2 className='text-3xl sm:text-4xl font-bold'>
                      <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent whitespace-nowrap'>
                        Don't Miss Out!
                      </span>
                    </h2>
                  </div>
                  
                  <p className='text-lg text-gray-600 dark:text-gray-400 mb-4'>
                    Be the first to know about workshops, deadlines, and get exclusive resources to boost your hackathon success.
                  </p>
                  
                  {/* Benefits grid */}
                  <div className='grid grid-cols-2 gap-3 mb-6'>
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className='flex items-center gap-3'
                      >
                        <div className='text-[#5599fe] text-xl'>
                          {benefit.icon}
                        </div>
                        <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                          {benefit.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Right visual */}
                <div className='lg:flex-1 relative flex flex-col items-center'>
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className='relative'
                  >
                    {/* Floating envelope illustration */}
                    <div className='relative w-40 h-40'>
                      <motion.div
                        className='absolute inset-0 bg-gradient-to-br from-[#a679f0]/20 to-[#5599fe]/20 rounded-full blur-2xl'
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.3, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <FaEnvelope className='text-5xl text-[#5599fe]' />
                      </div>
                      
                      {/* Orbiting icons */}
                      <motion.div
                        className='absolute top-0 right-0'
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <FaBell className='text-2xl text-[#a679f0]' />
                      </motion.div>
                      
                      <motion.div
                        className='absolute bottom-0 left-0'
                        animate={{
                          rotate: -360,
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <FaGift className='text-2xl text-[#48df7b]' />
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='mt-6'
                  >
                    <PrimaryButton
                      onClick={onNewsletterClick}
                      size='lg'
                      className='bg-gradient-to-r from-[#a679f0] to-[#5599fe] hover:from-[#a679f0]/90 hover:to-[#5599fe]/90 text-white border-0 shadow-lg'
                      icon={<FaStar />}
                      data-umami-event="hackathon-newsletter-open"
                      data-umami-event-category="hackathon"
                    >
                      Join Email List
                    </PrimaryButton>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HAHNewsletterSection;