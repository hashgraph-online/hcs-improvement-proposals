import React from 'react';
import { FaTrophy, FaCoins, FaChartLine } from 'react-icons/fa';
import Typography from '../Typography';
import { Section } from '../hackathon/Section';

type Props = {};

const PrizeSection: React.FC<Props> = () => {
  return (
    <div className='py-16 bg-gray-100 dark:bg-gray-800'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <Section icon={<FaTrophy />} title='The Prize' />
          <Typography variant='body1'>
            Bonzo Finance is looking for the most innovative AI agent that
            leverages their protocol to create value for DeFi users on Hedera.
          </Typography>
        </div>

        <div className='bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto'>
          <div className='flex flex-col md:flex-row items-center justify-between'>
            <div className='mb-6 md:mb-0 md:mr-8'>
              <div className='bg-yellow-100 dark:bg-yellow-900 p-6 rounded-full inline-flex items-center justify-center mb-4'>
                <FaTrophy className='text-4xl text-yellow-500' />
              </div>
              <Typography variant='h4'>Grand Prize</Typography>
              <Typography
                className='text-green-600 dark:text-green-400'
                variant='h3'
              >
                <FaCoins className='mr-2' />
                15,000 $BONZO
              </Typography>
              <Typography variant='body1'>
                Awarded to the best AI agent submission
              </Typography>
            </div>

            <div className='bg-gray-200 dark:bg-gray-600 h-32 w-px hidden md:block'></div>

            <div className='text-center md:text-left'>
              <Typography variant='h4'>Additional Benefits</Typography>
              <ul className='space-y-3 md:text-left'>
                <li className='flex items-start'>
                  <FaChartLine className='text-blue-500 mt-1 mr-2 flex-shrink-0' />
                  <span className='text-gray-600 dark:text-gray-300'>
                    Invitation to Pitch at "Hedera x AI" Demo Day
                  </span>
                </li>
                <li className='flex items-start'>
                  <FaChartLine className='text-blue-500 mt-1 mr-2 flex-shrink-0' />
                  <span className='text-gray-600 dark:text-gray-300'>
                    Integration opportunity with Bonzo Finance
                  </span>
                </li>
                <li className='flex items-start'>
                  <FaChartLine className='text-blue-500 mt-1 mr-2 flex-shrink-0' />
                  <span className='text-gray-600 dark:text-gray-300'>
                    Featured promotion on Bonzo Finance channels
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizeSection;
