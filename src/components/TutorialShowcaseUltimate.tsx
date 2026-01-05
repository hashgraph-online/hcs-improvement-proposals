import React, { useState } from 'react';
import {
  AnimatedBackground,
  Terminal,
  Typography,
} from './ui';
import TutorialPrimaryButton from './tutorials/TutorialPrimaryButton';
import TutorialSecondaryButton from './tutorials/TutorialSecondaryButton';
import { HashgraphConsensus } from './HashgraphConsensus';
import InteractiveShowcase from './InteractiveShowcase';
import {
  TutorialMainContent,
  TutorialSidebarItem,
  CategorySection,
  carouselTutorials,
  tutorialCategories
} from './tutorials';

// Main component
const TutorialShowcaseUltimate: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  const totalTutorials = tutorialCategories.reduce(
    (acc, cat) => acc + cat.tutorials.filter(t => t.href !== '#').length, 
    0
  );
  
  const totalPlanned = tutorialCategories.reduce(
    (acc, cat) => acc + cat.tutorials.length, 
    0
  );

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install @hashgraphonline/standards-sdk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      {/* Hero Section */}
      <section className='relative py-12 sm:py-16 md:py-20 overflow-hidden'>
        <AnimatedBackground
          variant='blobs'
          colors={['brand-blue', 'brand-purple', 'brand-green']}
          intensity='medium'
          opacity={0.1}
        />
        
        <div className='absolute inset-0 opacity-5 dark:opacity-10'>
          <HashgraphConsensus animated={true} />
        </div>
        
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div
            className='text-center'
          >
            <Typography
              variant='h1'
              className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-mono font-black mb-4 sm:mb-6'
            >
              Learn{' '}
              <Typography
                variant='h1'
                gradient='brand'
                as='span'
                className='inline-block'
              >
                HCS Standards_
              </Typography>
            </Typography>
            <Typography
              color='muted'
              className='text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-6 sm:mb-8 px-4'
            >
              Practical tutorials to build real applications with{' '}
              <Typography color='blue' as='span' className='font-semibold'>
                Hedera Consensus Service
              </Typography>
            </Typography>
          </div>
          
          <div
            className='max-w-2xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0'
          >
            <Terminal title='quick-start.sh'>
              <Terminal.Line
                command='npm install @hashgraphonline/standards-sdk'
                clickable
                onClick={handleCopy}
              />
              <>
                {copied && (
                  <div
                    className='font-mono text-xs sm:text-sm pl-4 text-green-500'
                  >
                    ✓ Copied to clipboard!
                  </div>
                )}
              </>
            </Terminal>
          </div>
          
          <div
            className='text-center px-4'
          >
            <div className='inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-8 px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl lg:rounded-full'>
              <div className='flex items-center gap-2'>
                <span className='text-xl sm:text-2xl lg:text-3xl font-bold text-brand-blue'>{totalTutorials}</span>
                <Typography color='muted' className='text-xs sm:text-sm lg:text-base font-semibold'>
                  tutorials available
                </Typography>
              </div>
              <div className='hidden sm:block w-px h-8 bg-gray-300 dark:bg-gray-600' />
              <div className='flex items-center gap-2'>
                <span className='text-xl sm:text-2xl lg:text-3xl font-bold text-brand-purple'>{totalPlanned - totalTutorials}</span>
                <Typography color='muted' className='text-xs sm:text-sm lg:text-base font-semibold'>
                  coming soon
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Interactive Carousel Section */}
      <section className='relative py-12 sm:py-16 bg-gray-50 dark:bg-gray-950 overflow-hidden'>
        <AnimatedBackground
          variant='lines'
          colors={['brand-blue', 'brand-purple', 'brand-green']}
          intensity='low'
          opacity={0.05}
        />

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center mb-8 sm:mb-12'>
            <Typography
              variant='h2'
              className='text-2xl sm:text-3xl lg:text-4xl font-mono font-black mb-3 sm:mb-4'
            >
              Featured{' '}
              <Typography variant='h2' gradient='brand' as='span'>
                Tutorials_
              </Typography>
            </Typography>
            <Typography color='muted' className='text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4'>
              Browse our interactive tutorial showcase with detailed examples and learning outcomes
            </Typography>
          </div>
          
          <InteractiveShowcase
            items={carouselTutorials}
            title=''
            MainContent={TutorialMainContent}
            SidebarItem={TutorialSidebarItem}
            terminalTitle='tutorial-browser.sh'
            rotationInterval={8000}
            className='p-0 bg-transparent'
          />
        </div>
      </section>

      {/* Category Grid Section */}
      <section className='relative py-12 sm:py-16 bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-8 sm:mb-12'>
            <Typography
              variant='h2'
              className='text-2xl sm:text-3xl lg:text-4xl font-mono font-black mb-3 sm:mb-4'
            >
              Browse by{' '}
              <Typography variant='h2' gradient='brand' as='span'>
                Category_
              </Typography>
            </Typography>
            <Typography color='muted' className='text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4'>
              Explore all tutorials organized by topic and difficulty level
            </Typography>
          </div>
          
          <div className='divide-y divide-gray-200 dark:divide-gray-700'>
            {tutorialCategories.map((category, index) => (
              <CategorySection key={index} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden'>
        <AnimatedBackground
          variant='blobs'
          colors={['brand-blue', 'brand-purple', 'brand-green']}
          intensity='low'
          opacity={0.1}
        />
        
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center'>
            <div className='relative group max-w-2xl mx-auto px-4'>
              <div className='absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl sm:rounded-3xl blur-xl opacity-30 sm:opacity-50 group-hover:opacity-60 sm:group-hover:opacity-80 transition duration-1000 animate-pulse'></div>
              <div className='relative bg-white dark:bg-gray-800 border-2 sm:border-4 border-blue-500/30 shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-sm transform hover:scale-102 sm:hover:scale-105 transition-all duration-500'>
                <div className='space-y-4 sm:space-y-6'>
                  <h3 className='text-2xl sm:text-3xl lg:text-4xl font-mono font-black'>
                    <span style={{
                      background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #10b981)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      Start Your Journey
                    </span>
                  </h3>
                  
                  <p className='text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-200 font-medium px-2 sm:px-4'>
                    Join thousands of developers building on{' '}
                    <span className='font-bold text-blue-600 dark:text-blue-400'>
                      Hedera
                    </span>{' '}
                    with our comprehensive tutorials
                  </p>

                  <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center'>
                    <TutorialPrimaryButton 
                      href='/docs/tutorials/getting-started/setup-environment'
                      size='medium'
                    >
                      Start First Tutorial →
                    </TutorialPrimaryButton>
                    <TutorialSecondaryButton 
                      href='https://github.com/hashgraph-online/standards-sdk'
                      size='medium'
                    >
                      View on GitHub ↗
                    </TutorialSecondaryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorialShowcaseUltimate;