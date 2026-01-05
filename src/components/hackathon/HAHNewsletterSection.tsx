import React from 'react';
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
        <div
          className='absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-[#a679f0]/20 to-[#5599fe]/20 rounded-full blur-3xl'
        />
        <div
          className='absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-[#5599fe]/20 to-[#48df7b]/20 rounded-full blur-3xl'
        />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div
          className='max-w-4xl mx-auto'
        >
          {/* Main card with gradient border */}
          <div className='relative group'>
            {/* Animated gradient border */}
            <div
              className='absolute -inset-1 bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] rounded-3xl opacity-75 group-hover:opacity-100 blur-xl'
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
                    <div
                      className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#a679f0] to-[#5599fe] text-white text-3xl flex-shrink-0'
                    >
                      <FaEnvelope />
                    </div>
                    
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
                      <div
                        key={index}
                        className='flex items-center gap-3'
                      >
                        <div className='text-[#5599fe] text-xl'>
                          {benefit.icon}
                        </div>
                        <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                          {benefit.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right visual */}
                <div className='lg:flex-1 relative flex flex-col items-center'>
                  <div
                    className='relative'
                  >
                    {/* Floating envelope illustration */}
                    <div className='relative w-40 h-40'>
                      <div
                        className='absolute inset-0 bg-gradient-to-br from-[#a679f0]/20 to-[#5599fe]/20 rounded-full blur-2xl'
                      />
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <FaEnvelope className='text-5xl text-[#5599fe]' />
                      </div>
                      
                      {/* Orbiting icons */}
                      <div
                        className='absolute top-0 right-0'
                      >
                        <FaBell className='text-2xl text-[#a679f0]' />
                      </div>
                      
                      <div
                        className='absolute bottom-0 left-0'
                      >
                        <FaGift className='text-2xl text-[#48df7b]' />
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HAHNewsletterSection;