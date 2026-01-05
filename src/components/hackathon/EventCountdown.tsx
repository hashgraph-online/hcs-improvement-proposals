import React from 'react';
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
  <div
    className='absolute rounded-full bg-[#8259ef]/20 dark:bg-[#8259ef]/30'
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}%`,
      top: `${y}%`,
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
    <div className='w-full py-4 relative'>
      <div className='absolute inset-0 overflow-hidden'>
        {particles.map((i) => (
          <FloatingParticle
            key={i}
            size={Math.random() * 3 + 1}
            delay={Math.random() * 2}
            duration={3 + Math.random() * 3}
            x={Math.random() * 100}
            y={Math.random() * 100}
          />
        ))}
      </div>

      <>
        {timeLeft ? (
          <div
            key='countdown'
            className='flex flex-col items-center relative z-10'
          >
            <h3
              className='text-[#2d84eb] text-xl font-bold mb-6'
            >
              {title}
            </h3>

            <div className='flex justify-between items-center w-full max-w-md'>
              <TimeUnit
                value={timeLeft.days}
                label='Days'
                color='#8259ef'
                delay={0.1}
              />

              <div className='w-px h-8 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent' />

              <TimeUnit
                value={timeLeft.hours}
                label='Hours'
                color='#2d84eb'
                delay={0.2}
              />

              <div className='w-px h-8 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent' />

              <TimeUnit
                value={timeLeft.minutes}
                label='Minutes'
                color='#2d84eb'
                delay={0.3}
              />

              <div className='w-px h-8 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent' />

              <TimeUnit
                value={timeLeft.seconds}
                label='Seconds'
                color='#3ec878'
                delay={0.4}
              />
            </div>
          </div>
        ) : (
          <div
            key='stream-button'
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
          </div>
        )}
      </>
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
    <div
      className='flex flex-col items-center'
    >
      <div
        className='text-4xl font-mono font-bold'
        style={{ color }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className='mt-1 text-xs font-medium text-gray-600 dark:text-gray-400'>
        {label}
      </div>
    </div>
  );
};
