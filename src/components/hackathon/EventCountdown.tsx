import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { TimeLeft } from './types';
import PrimaryButton from './PrimaryButton';

type EventCountdownProps = {
  timeLeft: TimeLeft | null;
  title?: string;
  streamUrl?: string;
  streamButtonText?: string;
};

const FloatingParticle: React.FC<{
  size: number;
  delay: number;
  duration: number;
  x: number;
  y: number;
}> = ({ size, delay, duration, x, y }) => (
  <motion.div
    className='absolute rounded-full bg-[#8259ef]/20 dark:bg-[#8259ef]/30'
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}%`,
      top: `${y}%`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.8, 0],
      scale: [0, 1, 0.8],
      y: [-10, 10],
    }}
    transition={{
      repeat: Infinity,
      duration,
      delay,
      ease: 'easeInOut',
    }}
  />
);

export const EventCountdown: React.FC<EventCountdownProps> = ({
  timeLeft,
  title = 'Event Starting In',
  streamUrl = 'https://x.com/i/broadcasts/1jMKgkoEpdXKL',
  streamButtonText = 'Watch Live Stream',
}) => {
  const particles = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className='w-full py-6 relative'>
      <div className='absolute inset-0 overflow-hidden'>
        {particles.map((i) => (
          <FloatingParticle
            key={i}
            size={Math.random() * 4 + 2}
            delay={Math.random() * 2}
            duration={3 + Math.random() * 3}
            x={Math.random() * 100}
            y={Math.random() * 100}
          />
        ))}
      </div>

      <AnimatePresence mode='wait'>
        {timeLeft ? (
          <motion.div
            key='countdown'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='flex flex-col items-center relative z-10'
          >
            <motion.h3
              className='text-[#2d84eb] text-2xl font-bold mb-8'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h3>

            <div className='flex justify-between items-center w-full max-w-lg'>
              <TimeUnit
                value={timeLeft.days}
                label='Days'
                color='#8259ef'
                delay={0.1}
              />

              <div className='w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent' />

              <TimeUnit
                value={timeLeft.hours}
                label='Hours'
                color='#2d84eb'
                delay={0.2}
              />

              <div className='w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent' />

              <TimeUnit
                value={timeLeft.minutes}
                label='Minutes'
                color='#2d84eb'
                delay={0.3}
              />

              <div className='w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent' />

              <TimeUnit
                value={timeLeft.seconds}
                label='Seconds'
                color='#3ec878'
                delay={0.4}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key='stream-button'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className='flex justify-center relative z-10'
          >
            <div className='relative'>
              <div className='absolute -inset-4 bg-gradient-radial from-[#8259ef]/20 to-transparent blur-xl opacity-70'></div>
              <PrimaryButton
                href={streamUrl}
                size='lg'
                icon={<FaPlay />}
                className='relative z-10'
              >
                {streamButtonText}
              </PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type TimeUnitProps = {
  value: number;
  label: string;
  color: string;
  delay: number;
};

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label, color, delay }) => {
  return (
    <motion.div
      className='flex flex-col items-center'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        className='text-6xl font-mono font-bold'
        style={{ color }}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 10,
          delay,
        }}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div className='mt-2 text-sm font-medium text-gray-600 dark:text-gray-400'>
        {label}
      </div>
    </motion.div>
  );
};
