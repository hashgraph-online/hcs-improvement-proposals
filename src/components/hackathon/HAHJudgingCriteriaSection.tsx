import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCode,
  FaRobot,
  FaBrain,
  FaNetworkWired,
  FaMicrochip,
  FaChartLine,
  FaBullhorn,
  FaGavel,
  FaPercent,
  FaAward,
  FaGithub,
  FaVideo,
  FaFileAlt,
  FaCog,
  FaCheckCircle,
} from 'react-icons/fa';
import { TransformCard, Typography } from '../ui';
import PrimaryButton from './PrimaryButton';

interface Criterion {
  icon: React.ReactNode;
  title: string;
  description: string;
  percentage: number;
  color: 'purple' | 'blue' | 'green';
  details: string[];
}

const HAHJudgingCriteriaSection: React.FC = () => {
  const [activeCriterion, setActiveCriterion] = useState(0);

  const criteria: Criterion[] = [
    {
      icon: <FaBrain />,
      title: 'Execution & Automation',
      description: 'Quality of implementation, code structure, and automation capabilities',
      percentage: 35,
      color: 'green',
      details: [
        'Clean, maintainable code architecture',
        'Effective use of AI/ML techniques',
        'Automated processes and workflows',
        'Documentation and code quality',
      ],
    },
    {
      icon: <FaNetworkWired />,
      title: 'Hedera Integration',
      description: 'Effective use of Hedera technologies and services',
      percentage: 30,
      color: 'purple',
      details: [
        'HCS (Hedera Consensus Service) utilization',
        'Smart contract implementation',
        'Token service integration',
        'Network optimization',
      ],
    },
    {
      icon: <FaCode />,
      title: 'Innovation',
      description: 'Uniqueness and creativity of the solution',
      percentage: 10,
      color: 'blue',
      details: [
        'Novel approach to problem-solving',
        'Creative use of AI capabilities',
        'Unique value proposition',
        'Technical innovation',
      ],
    },
    {
      icon: <FaRobot />,
      title: 'Feasibility',
      description: 'Viability of the concept and implementation',
      percentage: 10,
      color: 'purple',
      details: [
        'Realistic implementation scope',
        'Scalability potential',
        'Resource efficiency',
        'Production readiness',
      ],
    },
    {
      icon: <FaMicrochip />,
      title: 'Market Validation',
      description: 'Market fit and adoption potential',
      percentage: 5,
      color: 'blue',
      details: [
        'Clear target audience',
        'Demonstrated market need',
        'Competitive advantage',
        'Growth potential',
      ],
    },
    {
      icon: <FaChartLine />,
      title: 'Ecosystem Impact',
      description: 'Impact on Hedera ecosystem growth',
      percentage: 5,
      color: 'green',
      details: [
        'Community benefit',
        'Ecosystem enhancement',
        'Network effect potential',
        'Developer adoption',
      ],
    },
    {
      icon: <FaBullhorn />,
      title: 'Presentation',
      description: 'Quality of pitch and communication',
      percentage: 5,
      color: 'purple',
      details: [
        'Clear problem statement',
        'Compelling demonstration',
        'Professional presentation',
        'Effective storytelling',
      ],
    },
  ];

  const requirements = [
    {
      icon: <FaGithub />,
      title: 'Source Code Repository',
      description: 'Provide public GitHub repository with complete source code and documentation',
      color: 'purple' as const,
    },
    {
      icon: <FaVideo />,
      title: 'Demo Video',
      description: 'Create a 5-minute video showcasing your AI solution in action',
      color: 'blue' as const,
    },
    {
      icon: <FaFileAlt />,
      title: 'Technical Documentation',
      description: 'Submit detailed architecture and integration documentation',
      color: 'green' as const,
    },
    {
      icon: <FaCog />,
      title: 'Live Deployment',
      description: 'Deploy on Hedera testnet/mainnet with verifiable transactions',
      color: 'purple' as const,
    },
  ];

  return (
    <>
      <section className='py-24 sm:py-32 relative bg-white dark:bg-gray-900 overflow-hidden'>
        <div className='absolute inset-0'>
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className='absolute inset-0 opacity-[0.02] dark:opacity-[0.05]'
            style={{
              backgroundImage: `radial-gradient(circle at 30% 20%, rgba(166, 121, 240, 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 70% 60%, rgba(85, 153, 254, 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 50% 90%, rgba(72, 223, 123, 0.08) 0%, transparent 50%)`,
              backgroundSize: '200% 200%',
            }}
          />
        </div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#48df7b]/10 to-[#a679f0]/10 dark:from-[#48df7b]/20 dark:to-[#a679f0]/20 border border-[#48df7b]/20 dark:border-[#48df7b]/30 mb-6'
            >
              <FaCheckCircle className='text-[#48df7b] mr-2' />
              <span className='text-sm font-bold text-[#48df7b] dark:text-[#a679f0]'>
                SUBMISSION REQUIREMENTS
              </span>
            </motion.div>

            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
              <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
                What You Need to Submit
              </span>
            </h2>

            <p className='text-base text-gray-600 dark:text-white/70 max-w-3xl mx-auto'>
              Ensure your AI solution meets all requirements to qualify for evaluation.
              Submit your project before the deadline on DoraHacks.
            </p>
          </motion.div>

          <div className='max-w-5xl mx-auto mb-16'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {requirements.map((req, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TransformCard
                    rotation={`rotate-[${index % 2 === 0 ? '-0.5' : '0.5'}deg]`}
                    background='bg-white dark:bg-gray-900'
                    border='border border-gray-200 dark:border-gray-700'
                    shadow='lg'
                    className='p-6 h-full hover:scale-[1.02] transition-transform'
                  >
                    <div className='flex items-start gap-4'>
                      <div
                        className='w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0'
                        style={{
                          background:
                            req.color === 'purple'
                              ? 'linear-gradient(135deg, #a679f0, #5599fe)'
                              : req.color === 'green'
                              ? 'linear-gradient(135deg, #48df7b, #54ae70)'
                              : 'linear-gradient(135deg, #5599fe, #48df7b)',
                        }}
                      >
                        {req.icon}
                      </div>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                          {req.title}
                        </h3>
                        <p className='text-sm text-gray-600 dark:text-white/70'>
                          {req.description}
                        </p>
                      </div>
                    </div>
                  </TransformCard>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='mt-8'
            >
              <TransformCard
                rotation='rotate-[-0.3deg]'
                background='bg-gradient-to-br from-[#a679f0]/10 to-[#5599fe]/10 dark:from-[#a679f0]/20 dark:to-[#5599fe]/20'
                border='border border-[#a679f0]/20'
                className='p-6'
              >
                <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                  <div className='text-center sm:text-left'>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
                      Ready to Submit?
                    </h3>
                    <p className='text-sm text-gray-600 dark:text-white/70'>
                      Submit your project before September 30th, 2025 at 11:59 PM EST
                    </p>
                  </div>
                  <PrimaryButton
                    href='https://dorahacks.io/hackathon/hederahackafrica/detail'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-gradient-to-r from-[#a679f0] to-[#5599fe] hover:from-[#a679f0]/90 hover:to-[#5599fe]/90 text-white border-0'
                  >
                    Submit on DoraHacks
                  </PrimaryButton>
                </div>
              </TransformCard>
            </motion.div>
          </div>
        </div>
      </section>

      <section className='py-24 sm:py-32 relative bg-gray-50 dark:bg-black overflow-hidden'>
      <div className='absolute inset-0'>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='absolute top-0 left-1/4 w-96 h-96 bg-[#a679f0]/10 rounded-full blur-3xl'
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className='absolute bottom-0 right-1/4 w-96 h-96 bg-[#5599fe]/10 rounded-full blur-3xl'
        />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#a679f0]/10 to-[#5599fe]/10 dark:from-[#a679f0]/20 dark:to-[#5599fe]/20 border border-[#a679f0]/20 dark:border-[#a679f0]/30 mb-6'
          >
            <FaGavel className='text-[#a679f0] mr-2' />
            <span className='text-sm font-bold text-[#a679f0] dark:text-[#48df7b]'>
              EVALUATION FRAMEWORK
            </span>
          </motion.div>

          <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
            <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
              Judging Criteria
            </span>
          </h2>

          <p className='text-base text-gray-600 dark:text-white/70 max-w-3xl mx-auto'>
            Your project will be evaluated by industry experts based on these
            weighted criteria. Focus on areas with higher percentages for maximum impact.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='max-w-6xl mx-auto'
        >
          <div className='bg-white dark:bg-gray-900 rounded-3xl shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 overflow-hidden'>
            <div className='bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <FaAward className='text-[#a679f0] text-xl' />
                  <span className='text-lg font-semibold text-gray-900 dark:text-white'>
                    Evaluation Criteria
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <FaPercent className='text-gray-500 dark:text-gray-400 text-sm' />
                  <span className='text-sm text-gray-600 dark:text-white/60'>
                    Total: 100%
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col lg:flex-row'>
              <div className='lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700'>
                <div className='p-2'>
                  {criteria.map((criterion, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setActiveCriterion(index)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 mb-2 ${
                        activeCriterion === index
                          ? 'bg-gray-100 dark:bg-white/10 shadow-md ring-1 ring-gray-200 dark:ring-white/20'
                          : 'hover:bg-gray-50 dark:hover:bg-white/5'
                      }`}
                      whileHover={{ x: 2 }}
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div
                            className='w-10 h-10 rounded-lg flex items-center justify-center text-white'
                            style={{
                              background:
                                criterion.color === 'purple'
                                  ? 'linear-gradient(135deg, #a679f0, #5599fe)'
                                  : criterion.color === 'green'
                                  ? 'linear-gradient(135deg, #48df7b, #54ae70)'
                                  : 'linear-gradient(135deg, #5599fe, #48df7b)',
                            }}
                          >
                            {criterion.icon}
                          </div>
                          <div>
                            <h3 className='text-sm font-semibold text-gray-900 dark:text-white'>
                              {criterion.title}
                            </h3>
                            <div className='flex items-center gap-2 mt-1'>
                              <div className='w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                                <div
                                  className='h-full bg-gradient-to-r from-[#a679f0] to-[#5599fe]'
                                  style={{ width: `${criterion.percentage}%` }}
                                />
                              </div>
                              <span className='text-xs font-medium text-gray-600 dark:text-white/60'>
                                {criterion.percentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className='flex-1 p-8'>
                <motion.div
                  key={activeCriterion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='mb-6'>
                    <div className='flex items-center gap-4 mb-4'>
                      <div
                        className='w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl'
                        style={{
                          background:
                            criteria[activeCriterion].color === 'purple'
                              ? 'linear-gradient(135deg, #a679f0, #5599fe)'
                              : criteria[activeCriterion].color === 'green'
                              ? 'linear-gradient(135deg, #48df7b, #54ae70)'
                              : 'linear-gradient(135deg, #5599fe, #48df7b)',
                        }}
                      >
                        {criteria[activeCriterion].icon}
                      </div>
                      <div>
                        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                          {criteria[activeCriterion].title}
                        </h2>
                        <div className='flex items-center gap-2 mt-1'>
                          <span className='text-3xl font-bold bg-gradient-to-r from-[#a679f0] to-[#5599fe] bg-clip-text text-transparent'>
                            {criteria[activeCriterion].percentage}%
                          </span>
                          <span className='text-sm text-gray-500 dark:text-white/50'>
                            of total score
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className='text-gray-600 dark:text-white/70 mb-6'>
                      {criteria[activeCriterion].description}
                    </p>

                    <div className='space-y-3'>
                      <h3 className='text-sm font-medium text-gray-500 dark:text-white/60 uppercase tracking-wide'>
                        Key Evaluation Points
                      </h3>
                      <div className='space-y-2'>
                        {criteria[activeCriterion].details.map((detail, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className='flex items-start gap-3'
                          >
                            <div className='w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#a679f0] to-[#5599fe] mt-2 flex-shrink-0' />
                            <span className='text-gray-700 dark:text-white/80'>
                              {detail}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <TransformCard
                    rotation='rotate-[-0.5deg]'
                    background='bg-gradient-to-br from-[#a679f0]/10 to-[#5599fe]/10 dark:from-[#a679f0]/20 dark:to-[#5599fe]/20'
                    border='border border-[#a679f0]/20'
                    className='p-4 mt-6'
                  >
                    <div className='flex items-center gap-2 text-sm'>
                      <div className='w-2 h-2 rounded-full bg-[#48df7b] animate-pulse' />
                      <span className='text-gray-600 dark:text-white/70'>
                        Pro tip: Focus on {criteria[activeCriterion].percentage >= 20 ? 'this high-value criterion' : 'combining this with other criteria'} for maximum impact
                      </span>
                    </div>
                  </TransformCard>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='mt-12 text-center'
        >
          <p className='text-sm text-gray-600 dark:text-white/60'>
            Judging will be conducted by industry experts from Hashgraph Online, The Hashgraph Association, and Exponential Science
          </p>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default HAHJudgingCriteriaSection;