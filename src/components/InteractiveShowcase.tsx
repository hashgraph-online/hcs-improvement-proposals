import React, { useState, useEffect, useRef } from 'react';
import { FiTerminal, FiGitBranch, FiPlay, FiPause, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { AnimatedBackground } from './ui';

export interface ShowcaseItem {
  id: string;
  name: string;
  [key: string]: any;
}

interface ShowcaseMainContentProps<T extends ShowcaseItem> {
  item: T;
  index: number;
}

interface ShowcaseSidebarItemProps<T extends ShowcaseItem> {
  item: T;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

interface InteractiveShowcaseProps<T extends ShowcaseItem> {
  items: T[];
  title: string;
  subtitle?: string;
  sectionId?: string;
  MainContent: React.ComponentType<ShowcaseMainContentProps<T>>;
  SidebarItem: React.ComponentType<ShowcaseSidebarItemProps<T>>;
  autoRotate?: boolean;
  rotationInterval?: number;
  className?: string;
  terminalTitle?: string;
  backgroundVariant?: 'lines' | 'blobs';
}

export function InteractiveShowcase<T extends ShowcaseItem>({
  items,
  title,
  subtitle,
  sectionId,
  MainContent,
  SidebarItem,
  autoRotate = true,
  rotationInterval = 10000,
  className = '',
  terminalTitle = 'showcase-directory',
  backgroundVariant = 'lines',
}: InteractiveShowcaseProps<T>) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoRotate);
  const [scrollPosition, setScrollPosition] = useState<'top' | 'middle' | 'bottom'>('top');
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying || !autoRotate) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [isPlaying, autoRotate, items.length, rotationInterval]);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      
      if (scrollPercentage === 0) {
        setScrollPosition('top');
      } else if (scrollPercentage >= 0.95) {
        setScrollPosition('bottom');
      } else {
        setScrollPosition('middle');
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial position
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const activeItem = items[activeIndex];

  return (
    <section
      id={sectionId}
      className={`relative overflow-hidden ${
        className.includes('bg-transparent')
          ? className
          : `py-20 lg:py-32 bg-gray-50 dark:bg-gray-950 ${className}`
      }`}
    >
      {!className.includes('bg-transparent') && (
        <AnimatedBackground
          variant={backgroundVariant}
          colors={['brand-functions', 'brand-variables']}
          intensity='low'
          opacity={0.03}
        />
      )}

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {title && (
          <div className='text-center mb-12'>
            <div className='inline-flex items-center gap-2 text-xs font-mono text-gray-700 dark:text-gray-300 uppercase tracking-[0.3em] mb-6 bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-200 dark:border-gray-700'>
              <FiTerminal className='w-4 h-4' />
              {title}
            </div>

            {subtitle && (
              <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className='max-w-7xl mx-auto mb-16'>
          {/* Mobile: Accordion layout */}
          <div className='lg:hidden'>
            <div className='bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
              <div className='bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='flex gap-1'>
                      <div className='w-2.5 h-2.5 rounded-full bg-brand-purple'></div>
                      <div className='w-2.5 h-2.5 rounded-full bg-brand-blue'></div>
                      <div className='w-2.5 h-2.5 rounded-full bg-green-400'></div>
                    </div>
                    <div className='text-xs font-mono text-gray-700 dark:text-gray-300'>
                      {terminalTitle}
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    {autoRotate && (
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className='p-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-all duration-200'
                        aria-label={isPlaying ? 'Pause auto-rotation' : 'Start auto-rotation'}
                      >
                        {isPlaying ? (
                          <FiPause className='w-3 h-3 text-gray-700 dark:text-gray-300' />
                        ) : (
                          <FiPlay className='w-3 h-3 text-gray-700 dark:text-gray-300' />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className='p-2 space-y-2'>
                {items.map((item, index) => (
                  <div key={item.id} className='bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden'>
                    <div className='relative'>
                      <div 
                        onClick={() => setExpandedMobile(expandedMobile === index ? null : index)}
                        className='cursor-pointer'
                      >
                        <SidebarItem
                          item={item}
                          index={index}
                          isActive={expandedMobile === index}
                          onClick={() => setExpandedMobile(expandedMobile === index ? null : index)}
                        />
                      </div>
                      <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
                        <div
                        >
                          <FiChevronDown className='w-5 h-5 text-gray-500' />
                        </div>
                      </div>
                    </div>
                    <>
                      {expandedMobile === index && (
                        <div
                          className='overflow-hidden'
                        >
                          <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
                            <MainContent item={item} index={index} />
                          </div>
                        </div>
                      )}
                    </>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Original layout */}
          <div className='hidden lg:block bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden lg:sticky lg:top-20' style={{ maxHeight: 'calc(100vh - 6rem)' }}>
            <div className='bg-gray-100 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <div className='flex gap-1.5'>
                    <div className='w-3 h-3 rounded-full bg-brand-purple'></div>
                    <div className='w-3 h-3 rounded-full bg-brand-blue'></div>
                    <div className='w-3 h-3 rounded-full bg-green-400'></div>
                  </div>
                  <div className='text-sm font-mono text-gray-700 dark:text-gray-300'>
                    {terminalTitle}
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  {autoRotate && (
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className='p-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-all duration-200'
                      aria-label={isPlaying ? 'Pause auto-rotation' : 'Start auto-rotation'}
                    >
                      {isPlaying ? (
                        <FiPause className='w-3.5 h-3.5 text-gray-700 dark:text-gray-300' />
                      ) : (
                        <FiPlay className='w-3.5 h-3.5 text-gray-700 dark:text-gray-300' />
                      )}
                    </button>
                  )}
                  <div className='text-xs text-gray-600 dark:text-gray-400'>
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </div>
                </div>
              </div>
            </div>

            <div className='flex relative' style={{ height: 'calc(100vh - 12rem)', maxHeight: '640px' }}>
              <div className='w-80 xl:w-96 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full'>
                <div className='px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0'>
                  <div className='flex items-center gap-2 text-sm font-mono text-gray-700 dark:text-gray-300'>
                    <FiGitBranch className='w-4 h-4' />
                    <span>directory</span>
                    <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse'></div>
                  </div>
                </div>

                <div
                  ref={scrollRef}
                  className='flex-1 px-2 py-3 space-y-1 overflow-y-auto overflow-x-visible scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent'
                >
                  {items.map((item, index) => (
                    <SidebarItem
                      key={item.id}
                      item={item}
                      index={index}
                      isActive={activeIndex === index}
                      onClick={() => setActiveIndex(index)}
                    />
                  ))}
                </div>
                
                {/* Scroll indicator */}
                {scrollPosition !== 'middle' && (
                  <div className={`absolute ${scrollPosition === 'bottom' ? 'top-14' : 'bottom-2'} left-1/2 transform -translate-x-1/2 pointer-events-none z-10`}>
                    <div
                      className='text-gray-400 dark:text-gray-600'
                    >
                      {scrollPosition === 'bottom' ? (
                        <FiChevronUp className='w-5 h-5' />
                      ) : (
                        <FiChevronDown className='w-5 h-5' />
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className='flex-1 p-8 overflow-y-auto'>
                <>
                  <div
                    key={activeIndex}
                    onMouseEnter={() => setIsPlaying(false)}
                    onMouseLeave={() => autoRotate && setIsPlaying(true)}
                  >
                    <MainContent item={activeItem} index={activeIndex} />
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InteractiveShowcase;
