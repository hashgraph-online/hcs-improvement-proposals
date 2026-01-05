import React from 'react';
import { BiNetworkChart } from 'react-icons/bi';
import { BsFillLightningFill } from 'react-icons/bs';

export const CircuitLines: React.FC = () => {
  return (
    <div className='absolute inset-0 pointer-events-none overflow-hidden opacity-20 dark:opacity-40 flex items-center justify-center'>
      <BiNetworkChart size={600} className='text-primary' />
    </div>
  );
};

export const DataNodes: React.FC = () => {
  return (
    <div className='absolute inset-0 pointer-events-none'>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className='absolute w-2 h-2 bg-hedera-purple/50 dark:bg-hedera-purple/70 rounded-full'
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export const DataFlowLines: React.FC = () => {
  return (
    <div className='absolute inset-0 pointer-events-none'>
      {Array.from({ length: 8 }).map((_, i) => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const color =
          i % 3 === 0 ? '#8259ef' : i % 3 === 1 ? '#2d84eb' : '#3ec878';

        return (
          <div
            key={i}
            className='absolute'
            style={{ top: `${top}%`, left: `${left}%` }}
          >
            <BsFillLightningFill size={16} style={{ color }} />
          </div>
        );
      })}
    </div>
  );
};
