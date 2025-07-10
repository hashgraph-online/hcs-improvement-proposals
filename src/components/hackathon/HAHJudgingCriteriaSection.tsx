import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FaLightbulb,
  FaCheck,
  FaUsers,
  FaEnvelope,
} from 'react-icons/fa';
import { TransformCard, Typography } from '../ui';
import PrimaryButton from './PrimaryButton';

type HAHJudgingCriteriaSectionProps = {
  onNewsletterClick?: () => void;
};

interface Criterion {
  icon: React.ReactNode;
  title: string;
  description: string;
  percentage: number;
  color: 'purple' | 'blue' | 'green';
  details: string[];
}

const HAHJudgingCriteriaSection: React.FC<HAHJudgingCriteriaSectionProps> = ({ onNewsletterClick }) => {
  const [activeCriterion, setActiveCriterion] = useState(0);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const criteria: Criterion[] = [
    {
      icon: <FaCog />,
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
      icon: <FaLightbulb />,
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
      icon: <FaCheck />,
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
      icon: <FaUsers />,
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
      icon: <FaFileAlt />,
      title: 'Technical Documentation',
      description: 'Submit detailed architecture and integration documentation',
      color: 'blue' as const,
    },
    {
      icon: <FaCog />,
      title: 'Live Deployment',
      description: 'Deploy on Hedera testnet/mainnet with verifiable transactions',
      color: 'green' as const,
    },
  ];

  return (
    <>
      <section className='pb-12 sm:pb-16 relative bg-white dark:bg-gray-900 overflow-hidden'>
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
            className='text-center mb-16 pt-8'
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
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
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
              className='mt-8 space-y-6'
            >
              <TransformCard
                rotation='rotate-[-0.3deg]'
                background='bg-gradient-to-br from-[#a679f0]/10 to-[#5599fe]/10 dark:from-[#a679f0]/20 dark:to-[#5599fe]/20'
                border='border border-[#a679f0]/20'
                className='p-6'
              >
                <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                  <div className='text-center sm:text-left'>
                    <h3 className='text-lg font-semibold text-gray-700 dark:text-white mb-1'>
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

      <section className='pt-8 sm:pt-12 pb-24 sm:pb-32 relative bg-gray-50 dark:bg-black overflow-hidden'>
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
              </div>
            </div>

            <div className='max-w-5xl mx-auto px-4 md:px-6'>
              <div className='mb-12'>
                <h3 className='text-center text-xs md:text-sm font-medium text-gray-500 dark:text-white/60 uppercase tracking-wide mb-6 md:mb-8 mt-8'>
                  {isMobile ? 'Tap any criteria to explore details' : 'Click on any segment to explore criteria details'}
                </h3>
                
                {/* Desktop: Interactive bar */}
                <div className='hidden md:block relative mb-6'>
                  <div className='relative h-32 w-full'>
                    {criteria.map((criterion, index) => {
                      let startPercentage = 0;
                      for (let i = 0; i < index; i++) {
                        startPercentage += criteria[i].percentage;
                      }
                      const isActive = activeCriterion === index;
                      const isHovered = hoveredSegment === index;
                      
                      return (
                        <motion.button
                          key={index}
                          className={`absolute top-0 bottom-0 cursor-pointer focus:outline-none border-0 p-0 m-0 ${
                            index === 0 ? 'rounded-l-xl' : ''
                          } ${
                            index === criteria.length - 1 ? 'rounded-r-xl' : ''
                          }`}
                          style={{
                            left: `${startPercentage}%`,
                            width: `${criterion.percentage}%`,
                            background:
                              criterion.color === 'purple'
                                ? 'linear-gradient(180deg, #a679f0, #5599fe)'
                                : criterion.color === 'green'
                                ? 'linear-gradient(180deg, #48df7b, #54ae70)'
                                : 'linear-gradient(180deg, #5599fe, #48df7b)',
                          }}
                          onClick={() => setActiveCriterion(index)}
                          onMouseEnter={() => setHoveredSegment(index)}
                          onMouseLeave={() => setHoveredSegment(null)}
                          animate={{ 
                            scaleY: 1,
                            y: '0px',
                            zIndex: isActive ? 20 : isHovered ? 10 : 1,
                            boxShadow: isActive ? '0 0 20px rgba(0,0,0,0.2)' : '0 0 0 rgba(0,0,0,0)',
                          }}
                          transition={{ 
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                          }}
                        >
                          {(isActive || isHovered) && (
                            <motion.div
                              animate={{
                                opacity: [0.3, 0.6, 0.3],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                              className='absolute inset-0 bg-white/20 pointer-events-none'
                            />
                          )}
                          
                          <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
                            <div className='text-white text-center flex flex-col items-center gap-2'>
                              <motion.div
                                animate={{
                                  scale: isActive ? 1.2 : 1,
                                  opacity: isActive ? 1 : 0.8,
                                }}
                                transition={{ type: 'spring' }}
                                className='text-3xl'
                              >
                                {criterion.icon}
                              </motion.div>
                              
                              <div className='font-bold drop-shadow-lg text-base'>
                                {criterion.percentage}%
                              </div>
                              
                              {isActive && criterion.percentage > 5 && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className='text-xs text-center font-medium px-1'
                                >
                                  {criterion.title}
                                </motion.div>
                              )}
                            </div>
                          </div>
                          
                          {isActive && (
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              className='absolute bottom-0 left-0 right-0 h-2 bg-white/60 pointer-events-none'
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile: Grid of cards */}
                <div className='md:hidden grid grid-cols-2 gap-3 mb-6'>
                  {criteria.map((criterion, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setActiveCriterion(index)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        activeCriterion === index 
                          ? 'border-white/40 shadow-lg' 
                          : 'border-white/20 hover:border-white/30'
                      }`}
                      style={{
                        background:
                          criterion.color === 'purple'
                            ? 'linear-gradient(135deg, #a679f0, #5599fe)'
                            : criterion.color === 'green'
                            ? 'linear-gradient(135deg, #48df7b, #54ae70)'
                            : 'linear-gradient(135deg, #5599fe, #48df7b)',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className='text-white text-center'>
                        <div className='flex items-center justify-center gap-2 mb-2'>
                          <div className='text-2xl'>
                            {criterion.icon}
                          </div>
                          <div className='font-bold text-lg'>
                            {criterion.percentage}%
                          </div>
                        </div>
                        <div className='text-xs font-medium leading-tight'>
                          {criterion.title}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
                
              </div>
              
              {/* Active criterion details */}
              <motion.div
                key={activeCriterion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='mt-8 md:mt-16 mb-12'
              >
                <TransformCard
                  rotation='rotate-[-0.5deg]'
                  background='bg-white dark:bg-gray-900'
                  border='border-2 border-gray-200 dark:border-gray-700'
                  shadow='2xl'
                  className='p-4 md:p-8'
                >
                  <div className='flex flex-col md:flex-row items-start gap-4 md:gap-6'>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.1 }}
                      className='w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-white text-2xl md:text-3xl flex-shrink-0 mx-auto md:mx-0'
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
                    </motion.div>
                    
                    <div className='flex-1 text-center md:text-left'>
                      <div className='flex flex-col md:flex-row md:items-baseline justify-between mb-4'>
                        <h3 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-0'>
                          {criteria[activeCriterion].title}
                        </h3>
                        <div className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a679f0] to-[#5599fe] bg-clip-text text-transparent'>
                          {criteria[activeCriterion].percentage}%
                        </div>
                      </div>
                      
                      <p className='text-gray-600 dark:text-white/70 mb-6 text-sm md:text-base'>
                        {criteria[activeCriterion].description}
                      </p>
                      
                      <div className='space-y-3'>
                        <h4 className='text-xs md:text-sm font-medium text-gray-500 dark:text-white/60 uppercase tracking-wide'>
                          Key Evaluation Points
                        </h4>
                        <div className='grid grid-cols-1 gap-3'>
                          {criteria[activeCriterion].details.map((detail, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className='flex items-start gap-3'
                            >
                              <div className='w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#a679f0] to-[#5599fe] mt-2 flex-shrink-0' />
                              <span className='text-xs md:text-sm text-gray-700 dark:text-white/80'>
                                {detail}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TransformCard>
              </motion.div>
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