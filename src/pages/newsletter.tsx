import React, { useState, useRef, useEffect } from 'react';
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
          <div 
            className='absolute top-1/4 -left-4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl'
          />
          
          <div 
            className='absolute bottom-1/4 -right-4 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl'
          />
          
          <div 
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-2xl'
          />

          {/* Additional smaller floating elements */}
          <div 
            className='absolute top-3/4 left-1/4 w-32 h-32 bg-gradient-to-r from-indigo-400/15 to-cyan-400/15 rounded-full blur-2xl'
          />
          
          <div 
            className='absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-teal-400/10 to-emerald-400/10 rounded-full blur-2xl'
          />

          {/* Subtle moving gradients */}
          <div 
            className='absolute inset-0 bg-gradient-to-br from-transparent via-blue-400/5 to-transparent'
          />
        </div>

        {/* Hero Section with Two Columns */}
        <section className='relative py-12 lg:py-16'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
                {/* Left Column - Information */}
                <div
                  className='space-y-6'
                >
                  <div className='flex items-center gap-4 mb-4'>
                    <div
                      className='inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-[#5599fe] to-[#48df7b] text-white text-xl lg:text-2xl flex-shrink-0 shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-105 transition-all duration-300'
                    >
                      <div
                      >
                        <FaEnvelope />
                      </div>
                    </div>

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
                          <div
                            key={index}
                            className='flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-w-[100px] flex-shrink-0 snap-center hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer'
                          >
                            <div 
                              className='w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 text-lg'
                            >
                              {benefit.icon}
                            </div>
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
                          </div>
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
                        <div
                          key={index}
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
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Community Stats */}
                  <div
                    className='grid grid-cols-3 gap-4 pt-4'
                  >
                    <div 
                      className='text-center'
                    >
                      <Typography
                        variant='h4'
                        gradient='blue'
                        className='mb-1'
                      >
                        <span
                        >
                          10+
                        </span>
                      </Typography>
                      <Typography
                        variant='caption'
                        color='muted'
                        className='text-xs'
                      >
                        Consortium Members
                      </Typography>
                    </div>
                    <div 
                      className='text-center'
                    >
                      <Typography
                        variant='h4'
                        gradient='purple'
                        className='mb-1'
                      >
                        <span
                        >
                          15+
                        </span>
                      </Typography>
                      <Typography
                        variant='caption'
                        color='muted'
                        className='text-xs'
                      >
                        HCS Standards
                      </Typography>
                    </div>
                    <div 
                      className='text-center'
                    >
                      <Typography
                        variant='h4'
                        gradient='green'
                        className='mb-1'
                      >
                        <span
                        >
                          1000+
                        </span>
                      </Typography>
                      <Typography
                        variant='caption'
                        color='muted'
                        className='text-xs'
                      >
                        Active Developers
                      </Typography>
                    </div>
                  </div>
                </div>

                {/* Right Column - Signup Form */}
                <div
                  className='lg:sticky lg:top-8'
                >
                  {/* Browser Window Container */}
                  <div 
                    className='rounded-xl overflow-hidden border shadow-2xl bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 relative'
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
                  </div>

                  <div className='mt-4 text-center'>
                    <Typography
                      variant='caption'
                      className='text-xs text-gray-500 dark:text-gray-300'
                    >
                      We respect your privacy. Unsubscribe at any time. 
                      No spam, just valuable updates.
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default NewsletterPage;