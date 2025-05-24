import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTerminal, FiGitBranch, FiPlay, FiPause } from 'react-icons/fi';
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

  useEffect(() => {
    if (!isPlaying || !autoRotate) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [isPlaying, autoRotate, items.length, rotationInterval]);

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
            <div className='inline-flex items-center gap-2 text-xs font-mono text-brand-functions uppercase tracking-[0.3em] mb-6 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full backdrop-blur-sm'>
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

        <div className='max-w-7xl mx-auto'>
          <div className='bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
            <div className='bg-gray-100 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <div className='flex gap-1.5'>
                    <div className='w-3 h-3 rounded-full bg-red-400'></div>
                    <div className='w-3 h-3 rounded-full bg-yellow-400'></div>
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
                      className='p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors'
                    >
                      {isPlaying ? (
                        <FiPause className='w-4 h-4 text-gray-600 dark:text-gray-400' />
                      ) : (
                        <FiPlay className='w-4 h-4 text-gray-600 dark:text-gray-400' />
                      )}
                    </button>
                  )}
                  <div className='text-xs text-gray-500 dark:text-gray-400'>
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </div>
                </div>
              </div>
            </div>

            <div className='flex'>
              <div className='w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col'>
                <div className='px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0'>
                  <div className='flex items-center gap-2 text-sm font-mono text-gray-700 dark:text-gray-300'>
                    <FiGitBranch className='w-4 h-4' />
                    <span>directory</span>
                    <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse'></div>
                  </div>
                </div>

                <div
                  className='flex-1 px-2 py-3 space-y-1 overflow-y-auto overflow-x-visible'
                  style={{ maxHeight: '600px' }}
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
              </div>

              <div className='flex-1 p-8'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    onMouseEnter={() => setIsPlaying(false)}
                    onMouseLeave={() => autoRotate && setIsPlaying(true)}
                  >
                    <MainContent item={activeItem} index={activeIndex} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InteractiveShowcase;
