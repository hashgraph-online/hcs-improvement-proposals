import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { FaEnvelope, FaBell, FaCalendarAlt, FaNewspaper, FaUsers, FaCode } from 'react-icons/fa';
import Layout from '@theme/Layout';
import { TransformCard } from '../components/ui';
import Typography from '../components/ui/Typography';

type NewsletterPageProps = {};

const NewsletterPage: React.FC<NewsletterPageProps> = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const benefits = [
    {
      icon: <FaNewspaper className='text-[#a679f0]' />,
      title: 'Latest Updates',
      description: 'Get the newest developments in HCS standards and blockchain innovation',
      delay: 0,
    },
    {
      icon: <FaBell className='text-[#5599fe]' />,
      title: 'Event Notifications',
      description: 'Never miss workshops, hackathons, or community events',
      delay: 0.1,
    },
    {
      icon: <FaCalendarAlt className='text-[#48df7b]' />,
      title: 'Important Dates',
      description: 'Stay informed about deadlines, milestones, and release schedules',
      delay: 0.2,
    },
    {
      icon: <FaUsers className='text-[#ff6b6b]' />,
      title: 'Community Insights',
      description: 'Hear from developers, contributors, and industry leaders',
      delay: 0.3,
    },
    {
      icon: <FaCode className='text-[#4ecdc4]' />,
      title: 'Developer Resources',
      description: 'Access exclusive tools, documentation, and code examples',
      delay: 0.4,
    },
    {
      icon: <FaEnvelope className='text-[#45b7d1]' />,
      title: 'Curated Content',
      description: 'Carefully selected updates without spam or noise',
      delay: 0.5,
    },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      
      // Use setTimeout to let snap scrolling finish before calculating
      setTimeout(() => {
        const finalScrollLeft = container.scrollLeft;
        const containerLeft = container.getBoundingClientRect().left;
        const containerCenter = containerLeft + container.clientWidth / 2;
        
        // Find which card is closest to the center of the viewport
        const cards = container.children;
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        for (let i = 0; i < Math.min(cards.length, benefits.length); i++) {
          const card = cards[i] as HTMLElement;
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(cardCenter - containerCenter);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
          }
        }
        
        console.log('Closest card to center:', closestIndex, 'Final Scroll Left:', finalScrollLeft);
        setCurrentCard(closestIndex);
      }, 100);
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = 100 + 8; // card width + gap
      
      // Simple: scroll to the card position
      const targetScrollLeft = index * cardWidth;
      
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Layout
      title='Newsletter Signup | Hashgraph Online'
      description='Subscribe to get the latest updates, workshops, and exclusive resources from Hashgraph Online and the HCS improvement proposals community.'
    >
      <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20'>
        {/* Animated background elements */}
        <div className='fixed inset-0 overflow-hidden pointer-events-none'>
          {/* Floating orbs */}
          <motion.div 
            className='absolute top-1/4 -left-4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl'
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className='absolute bottom-1/4 -right-4 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl'
            animate={{
              x: [0, -150, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          <motion.div 
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-2xl'
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Additional smaller floating elements */}
          <motion.div 
            className='absolute top-3/4 left-1/4 w-32 h-32 bg-gradient-to-r from-indigo-400/15 to-cyan-400/15 rounded-full blur-2xl'
            animate={{
              x: [0, 200, 0],
              y: [0, -200, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          <motion.div 
            className='absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-teal-400/10 to-emerald-400/10 rounded-full blur-2xl'
            animate={{
              x: [0, -100, 0],
              y: [0, 150, 0],
              rotate: [0, -180, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.5
            }}
          />

          {/* Subtle moving gradients */}
          <motion.div 
            className='absolute inset-0 bg-gradient-to-br from-transparent via-blue-400/5 to-transparent'
            animate={{
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Hero Section with Two Columns */}
        <section className='relative py-12 lg:py-16'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
                {/* Left Column - Information */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className='space-y-6'
                >
                  <div className='flex items-center gap-4 mb-4'>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className='inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-[#5599fe] to-[#48df7b] text-white text-xl lg:text-2xl flex-shrink-0 shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-105 transition-all duration-300'
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <FaEnvelope />
                      </motion.div>
                    </motion.div>

                    <Typography
                      variant='h2'
                      gradient='brand'
                      className='text-[2.75rem] lg:text-5xl xl:text-6xl leading-[1.1]'
                    >
                      Stay Connected
                    </Typography>
                  </div>


                  {/* Compact Benefits Grid */}
                  <div>
                    {/* Mobile: Horizontal scroll */}
                    <div className='lg:hidden'>
                      <div 
                        ref={scrollRef}
                        className='flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide'
                        onScroll={handleScroll}
                        style={{
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none',
                          WebkitScrollbar: { display: 'none' }
                        }}
                      >
                        {benefits.map((benefit, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ duration: 0.6, delay: 0.3 + benefit.delay }}
                            className='flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-w-[100px] flex-shrink-0 snap-center hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer'
                          >
                            <motion.div 
                              className='w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 text-lg'
                              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              {benefit.icon}
                            </motion.div>
                            <div>
                              <Typography
                                variant='h6'
                                className='text-sm font-semibold mb-1 text-gray-800 dark:text-white'
                              >
                                {benefit.title}
                              </Typography>
                              <Typography
                                variant='body'
                                color='muted'
                                className='text-xs'
                              >
                                {benefit.description}
                              </Typography>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Interactive scroll indicator dots - only show original 6 benefits */}
                      <div className='flex justify-center gap-2 mt-2'>
                        {benefits.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => scrollToCard(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 border-0 ${
                              currentCard === index 
                                ? 'bg-blue-400/60 dark:bg-blue-300/50 shadow-md shadow-blue-400/40' 
                                : 'bg-gray-300/70 dark:bg-gray-500/40 shadow-sm shadow-gray-400/40 dark:shadow-gray-600/20'
                            }`}
                            style={{ outline: 'none' }}
                            aria-label={`Go to ${benefits[index].title}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Desktop: Grid layout */}
                    <div className='hidden lg:grid lg:grid-cols-2 lg:gap-4'>
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          transition={{ duration: 0.6, delay: 0.3 + benefit.delay }}
                          className='flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer'
                        >
                          <div className='w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center flex-shrink-0'>
                            {benefit.icon}
                          </div>
                          <div className='flex-1'>
                            <Typography
                              variant='h6'
                              className='text-sm font-semibold mb-1 text-gray-800 dark:text-white'
                            >
                              {benefit.title}
                            </Typography>
                            <Typography
                              variant='body'
                              color='muted'
                              className='text-xs'
                            >
                              {benefit.description}
                            </Typography>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Community Stats */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className='grid grid-cols-3 gap-4 pt-4'
                  >
                    <motion.div 
                      className='text-center'
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Typography
                        variant='h4'
                        gradient='blue'
                        className='mb-1'
                      >
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.9 }}
                        >
                          10+
                        </motion.span>
                      </Typography>
                      <Typography
                        variant='caption'
                        color='muted'
                        className='text-xs'
                      >
                        Consortium Members
                      </Typography>
                    </motion.div>
                    <motion.div 
                      className='text-center'
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Typography
                        variant='h4'
                        gradient='purple'
                        className='mb-1'
                      >
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 1.0 }}
                        >
                          15+
                        </motion.span>
                      </Typography>
                      <Typography
                        variant='caption'
                        color='muted'
                        className='text-xs'
                      >
                        HCS Standards
                      </Typography>
                    </motion.div>
                    <motion.div 
                      className='text-center'
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Typography
                        variant='h4'
                        gradient='green'
                        className='mb-1'
                      >
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 1.1 }}
                        >
                          1000+
                        </motion.span>
                      </Typography>
                      <Typography
                        variant='caption'
                        color='muted'
                        className='text-xs'
                      >
                        Active Developers
                      </Typography>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Right Column - Signup Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className='lg:sticky lg:top-8'
                >
                  {/* Browser Window Container */}
                  <motion.div 
                    className='rounded-xl overflow-hidden border shadow-2xl bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 relative'
                    whileHover={{ boxShadow: "0 0 40px rgba(85, 153, 254, 0.3)" }}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {/* Browser Header */}
                    <div className='px-4 py-3 flex items-center space-x-2 bg-gray-200 dark:bg-gray-800'>
                      <div className='flex space-x-2'>
                        <div className='w-3 h-3 bg-brand-purple rounded-full'></div>
                        <div className='w-3 h-3 bg-brand-blue rounded-full'></div>
                        <div className='w-3 h-3 bg-brand-green rounded-full'></div>
                      </div>
                      <span className='text-sm font-mono text-gray-600 dark:text-gray-400 ml-4'>newsletter-signup.hcs</span>
                    </div>

                    {/* Browser Content */}
                    <div className='bg-white dark:bg-gray-900'>
                      {/* SibForms Newsletter Signup */}
                      <iframe
                        width='540'
                        height='700'
                        src='https://abf8595d.sibforms.com/serve/MUIFAPkTSu_LF4xv1Skm7IXZKSZankgAHr4d_KC7h5yIchx0FB-dG1J9tNuIK2eeAVn2AIMogqljB9LV1UnRTKoc-8xGGgBzbul2oxJOqJg_aY1HDcV0f3IiMeMPT6zjaezAO5S7sbG6CD_j7sLEwbktzsOmtj1_laBmMsIETe9d1-soMdj37nr1JH1Cjyiw81jAO6pa9MnhYLCL'
                        frameBorder='0'
                        scrolling='no'
                        allowFullScreen
                        className='w-full h-[700px]'
                        style={{
                          display: 'block',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          maxWidth: '100%',
                          border: 'none',
                        }}
                        title='Newsletter Signup Form'
                      />
                    </div>
                  </motion.div>

                  <div className='mt-4 text-center'>
                    <Typography
                      variant='caption'
                      className='text-xs text-gray-500 dark:text-gray-300'
                    >
                      We respect your privacy. Unsubscribe at any time. 
                      No spam, just valuable updates.
                    </Typography>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default NewsletterPage;