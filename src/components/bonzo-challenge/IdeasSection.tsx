import React from 'react';
import { motion } from 'framer-motion';
import {
  FaChartLine,
  FaShieldAlt,
  FaExchangeAlt,
  FaBriefcase,
  FaLightbulb,
  FaCalculator,
} from 'react-icons/fa';
import Typography from '../Typography';
import PrimaryButton from '../PrimaryButton';
import { Section } from '../hackathon/Section';

type IdeaCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  index: number;
};

const IdeaCard: React.FC<IdeaCardProps> = ({
  icon,
  title,
  description,
  details,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className='group relative'
    >
      <div className='relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-purple-100 dark:border-gray-700 h-full flex flex-col'>
        <div className='absolute -inset-1 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-green-500/5 dark:from-purple-500/10 dark:via-blue-500/10 dark:to-green-500/10 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

        <div className='p-6 flex flex-col relative h-full z-10'>
          <div className='flex items-center mb-4'>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-md'>
              {icon}
            </div>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white ml-4'>
              {title}
            </h3>
          </div>

          <p className='text-gray-600 dark:text-gray-300 mb-4'>{description}</p>

          <div className='flex-grow'>
            <ul className='space-y-2'>
              {details.map((detail, i) => (
                <li key={i} className='flex items-start'>
                  <div className='flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 dark:from-purple-500/30 dark:to-blue-500/30 flex items-center justify-center mt-1 mr-3'>
                    <div className='h-2 w-2 rounded-full bg-purple-500'></div>
                  </div>
                  <span className='text-gray-600 dark:text-gray-300 text-sm'>
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const IdeasSection: React.FC = () => {
  const ideas = [
    {
      icon: <FaShieldAlt className='text-xl' />,
      title: 'Liquidation Monitor Agent',
      description:
        'Proactively monitor and protect user positions from liquidation risk',
      details: [
        'Monitors user positions for liquidation risk',
        'Sends alerts and recommendations when positions are at risk',
        'Can automatically take preventive actions if authorized',
        'Provides suggestions for rebalancing collateral',
      ],
    },
    {
      icon: <FaBriefcase className='text-xl' />,
      title: 'Portfolio Optimizer Agent',
      description:
        'Optimize asset allocation for maximum yield while managing risk',
      details: [
        "Analyzes user's portfolio and market conditions",
        'Recommends optimal asset allocation based on risk preference',
        'Provides entry and exit strategies for various positions',
        'Forecasts potential returns using machine learning models',
      ],
    },
    {
      icon: <FaChartLine className='text-xl' />,
      title: 'Market Analysis Agent',
      description:
        'In-depth market analysis and intelligence for informed decision-making',
      details: [
        'Monitors market trends and volatility',
        'Identifies potential opportunities and risks',
        'Provides regular market intelligence reports',
        'Analyzes on-chain data for market sentiment',
      ],
    },
    {
      icon: <FaExchangeAlt className='text-xl' />,
      title: 'Cross-Chain Arbitrage Agent',
      description:
        'Identify and capitalize on price discrepancies across different chains',
      details: [
        'Identifies price discrepancies across different chains',
        'Calculates profitability including gas and transaction fees',
        'Can execute arbitrage trades automatically when profitable',
        'Monitors liquidity pools for arbitrage opportunities',
      ],
    },
    {
      icon: <FaCalculator className='text-xl' />,
      title: 'Yield Strategy Agent',
      description: 'Find and implement the most profitable yield strategies',
      details: [
        'Identifies highest yield opportunities across protocols',
        'Compares risk-adjusted returns',
        'Recommends optimal yield farming strategies',
        'Automates the rebalancing of yield-generating positions',
      ],
    },
    {
      icon: <FaLightbulb className='text-xl' />,
      title: 'Risk Assessment Agent',
      description: 'Comprehensive risk analysis to protect investments',
      details: [
        'Evaluates protocol risks and exposure',
        'Monitors smart contract vulnerabilities and exploits',
        'Provides risk scores for different lending pools',
        'Creates diversification strategies to mitigate risk',
      ],
    },
  ];

  return (
    <section
      id='ideas'
      className='py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden isolation'
    >
      <div className='absolute inset-0 z-[-1] overflow-hidden'>
        <div
          className='absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full opacity-30 dark:opacity-20 blur-3xl'
          style={{
            background:
              'radial-gradient(circle at center, rgba(130, 89, 239, 0.4), rgba(130, 89, 239, 0) 70%)',
          }}
        ></div>
        <div
          className='absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full opacity-30 dark:opacity-20 blur-3xl'
          style={{
            background:
              'radial-gradient(circle at center, rgba(62, 200, 120, 0.4), rgba(62, 200, 120, 0) 70%)',
          }}
        ></div>

        <div
          className='absolute inset-0 opacity-[0.02] dark:opacity-[0.03]'
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(130, 89, 239, 0.3) 1px, transparent 1px),
              linear-gradient(rgba(45, 132, 235, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        ></div>
      </div>

      <div className='container mx-auto px-4 sm:px-6 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='max-w-4xl mx-auto text-center mb-16'
        >
          <Section icon={<FaLightbulb />} title='AI Agent Ideas' />

          <Typography variant='body1'>
            Get inspired by these innovative AI agent concepts for the Bonzo
            Finance ecosystem. Use these as starting points or create your own
            groundbreaking solution!
          </Typography>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {ideas.map((idea, index) => (
            <IdeaCard
              key={index}
              icon={idea.icon}
              title={idea.title}
              description={idea.description}
              details={idea.details}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='mt-16 max-w-3xl mx-auto bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl overflow-hidden border border-purple-100 dark:border-purple-800/20 p-8 text-center'
        >
          <div className='flex flex-col items-center'>
            <FaLightbulb className='text-2xl text-blue-600 dark:text-blue-400 mb-4' />
            <Typography variant='h4'>Have a Better Idea?</Typography>
            <Typography variant='body1'>
              These are just examples! We encourage innovative and original
              ideas that push the boundaries of what's possible with AI and
              DeFi.
            </Typography>
            <PrimaryButton size='large' href='#register'>
              Submit Your Idea
            </PrimaryButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IdeasSection;
