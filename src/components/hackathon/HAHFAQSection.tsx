import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FaChevronDown,
  FaRobot,
  FaBrain,
  FaCoins,
  FaCalendarAlt,
  FaGithub,
  FaCode,
  FaTools,
  FaCircle,
  FaCheckCircle,
  FaFileAlt,
  FaUsers,
  FaQuestion,
  FaLaptopCode,
  FaLightbulb,
  FaBuilding,
  FaUniversity,
  FaClock,
  FaGlobe,
  FaArrowRight,
} from 'react-icons/fa';
import HackathonTypography from './HackathonTypography';
import { TransformCard, Typography } from '../ui';

export type FAQItemProps = {
  question: string;
  answer: React.ReactNode;
  index: number;
  icon?: React.ReactNode;
  isInView?: boolean;
};

export const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  index,
  icon = <FaChevronDown />,
  isInView = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const itemIsInView = useInView(itemRef, { once: true, amount: 0.1 });
  const inView = isInView && itemIsInView;

  const colors = [
    { primary: '#a679f0', secondary: '#5599fe' },
    { primary: '#5599fe', secondary: '#48df7b' },
    { primary: '#48df7b', secondary: '#a679f0' },
  ];
  const colorSet = colors[index % 3];

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: 'easeOut',
      }}
    >
      <TransformCard
        rotation={`rotate-[${index % 2 === 0 ? '0.5' : '-0.5'}deg]`}
        background={isOpen ? 
          `bg-gradient-to-br from-[${colorSet.primary}]/10 to-[${colorSet.secondary}]/10 dark:from-[${colorSet.primary}]/20 dark:to-[${colorSet.secondary}]/20` : 
          'bg-white dark:bg-gray-800'
        }
        border={`border ${isOpen ? `border-[${colorSet.primary}]/20` : 'border-gray-200 dark:border-gray-700'}`}
        shadow='lg'
        className='overflow-hidden transition-all duration-300 hover:scale-[1.02]'
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='flex justify-between items-center w-full p-6 text-left group'
        >
          <div className='flex items-center gap-4'>
            {icon && (
              <motion.div
                animate={{ 
                  rotate: isOpen ? 360 : 0,
                  scale: isOpen ? 1.1 : 1
                }}
                transition={{ duration: 0.5 }}
                className='flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white'
                style={{ 
                  background: `linear-gradient(135deg, ${colorSet.primary}, ${colorSet.secondary})` 
                }}
              >
                {icon}
              </motion.div>
            )}
            <span className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white'>
              {question}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className='flex-shrink-0 ml-4'
            style={{ color: colorSet.primary }}
          >
            <FaChevronDown className='text-xl' />
          </motion.div>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className='h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent' />
              <div className='px-6 pb-6 pt-4'>
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </TransformCard>
    </motion.div>
  );
};

const HAHFAQSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const faqs = [
    {
      question: 'What is the AI Track at Hedera Africa Hackathon?',
      icon: <FaRobot className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            The AI Track is a specialized track within the Hedera Africa Hackathon, 
            co-led and sponsored by Hashgraph Online in collaboration with The Hashgraph 
            Association and Exponential Science. It focuses on building autonomous AI 
            agents using Hedera's technology.
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300 mt-4'
          >
            Participants will leverage the OpenConvAI standard and the Hedera Agent Kit to 
            create innovative AI solutions that can transform Africa's technological landscape.
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'Who can participate in the AI Track?',
      icon: <FaUsers className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            The AI Track is open to participants from all around the world! Whether 
            you're a student, professional developer, or AI enthusiast, regardless of 
            your experience level with Web3 or AI, you're welcome to join.
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            We encourage developers globally to bring their unique perspectives and 
            innovative ideas to build AI solutions that can impact Africa and beyond.
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'Where is the hackathon taking place?',
      icon: <FaGlobe className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            The Hedera Africa Hackathon is a global virtual event open to participants 
            from all around the world. While local hacking stations will be based in 
            Africa for in-person collaboration, all workshops, mentoring sessions, and 
            online collaboration are accessible globally.
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            Join our Telegram channel for more information about participating from 
            your location: <a href="https://t.me/hashinals" target="_blank" rel="noopener noreferrer" className="text-[#5599fe] dark:text-[#48df7b] hover:underline">t.me/hashinals</a>
          </HackathonTypography>
        </>
      ),
    },
    {
      question: "I'm new to Hedera and AI. Can I still participate?",
      icon: <FaQuestion className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            Absolutely! We provide comprehensive resources for beginners, including 
            tutorials on Hedera technology, the OpenConvAI standard, and AI agent 
            development. Our Office Hours and workshops are designed to help you 
            get started.
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            The hackathon is an excellent opportunity to learn these cutting-edge 
            technologies while building real-world applications. Mentors will be 
            available throughout to guide you on your journey.
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'What support is available during the hackathon?',
      icon: <FaUniversity className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            We offer comprehensive support throughout the hackathon period:
          </HackathonTypography>
          <div className='mt-3 space-y-2 text-black dark:text-white'>
            <div className='flex items-start'>
              <FaCircle className='text-[#a679f0] text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>Weekly Hedera x AI X Spaces every Thursday at 10am EDT</div>
            </div>
            <div className='flex items-start'>
              <FaCircle className='text-[#5599fe] text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>Hands-on workshops covering Hedera, AI development, and the OpenConvAI Standard</div>
            </div>
            <div className='flex items-start'>
              <FaCircle className='text-[#48df7b] text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>Comprehensive tutorials and documentation</div>
            </div>
            <div className='flex items-start'>
              <FaCircle className='text-[#a679f0] text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>Direct access to Hashgraph Online team via Telegram (t.me/hashinals)</div>
            </div>
          </div>
        </>
      ),
    },
    {
      question: 'What are the prizes for the AI Track?',
      icon: <FaCoins className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            The AI Track is part of the larger Hedera Africa Hackathon with a total 
            prize pool of $2 million across all tracks. Specific prize allocations 
            for the AI Track will be announced soon.
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            Beyond monetary prizes, winners may receive opportunities for further 
            development support, ecosystem partnerships, and integration opportunities 
            with Hashgraph Online and our partner networks.
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'What are the key dates?',
      icon: <FaCalendarAlt className='text-lg' />,
      answer: (
        <div className='space-y-3'>
          <div className='flex items-center'>
            <FaCircle className='text-[#a679f0] text-xs mr-3 flex-shrink-0' />
            <div>
              <span className='font-medium text-black dark:text-white'>
                Now - August 1st, 2025
              </span>
              <span className='ml-4 text-black dark:text-white'>
                Registration Open & Office Hours Available
              </span>
            </div>
          </div>

          <div className='flex items-center'>
            <FaCircle className='text-[#5599fe] text-xs mr-3 flex-shrink-0' />
            <div>
              <span className='font-medium text-black dark:text-white'>
                August 1st, 2025
              </span>
              <span className='ml-4 text-black dark:text-white'>
                Hackathon Kickoff - AI Track Launch
              </span>
            </div>
          </div>

          <div className='flex items-center'>
            <FaCircle className='text-[#48df7b] text-xs mr-3 flex-shrink-0' />
            <div>
              <span className='font-medium text-black dark:text-white'>
                August 1st - September 30th, 2025
              </span>
              <span className='ml-4 text-black dark:text-white'>
                Building Phase with Continuous Support
              </span>
            </div>
          </div>

          <div className='flex items-center'>
            <FaCircle className='text-[#a679f0] text-xs mr-3 flex-shrink-0' />
            <div>
              <span className='font-medium text-black dark:text-white'>
                Early September 2025
              </span>
              <span className='ml-4 text-black dark:text-white'>
                Midpoint Check-in & Progress Review
              </span>
            </div>
          </div>

          <div className='flex items-center'>
            <FaCircle className='text-[#5599fe] text-xs mr-3 flex-shrink-0' />
            <div>
              <span className='font-medium text-black dark:text-white'>
                September 30th, 2025
              </span>
              <span className='ml-4 text-black dark:text-white'>
                Submission Deadline
              </span>
            </div>
          </div>

          <div className='flex items-center'>
            <FaCheckCircle className='text-[#48df7b] text-xs mr-3 flex-shrink-0' />
            <div>
              <span className='font-medium text-black dark:text-white'>
                October 2025
              </span>
              <span className='ml-4 text-black dark:text-white'>
                Winners Announced
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      question: 'What should I build for the AI Track?',
      icon: <FaLightbulb className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            Build innovative Web3 AI solutions that leverage Hedera's unique capabilities. 
            Focus on decentralized, trustless systems that showcase the power of combining 
            AI with blockchain technology:
          </HackathonTypography>
          <div className='mt-3 space-y-2 text-black dark:text-white'>
            <div className='flex items-start'>
              <FaCircle className='text-[#a679f0] text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>
                DeFi AI agents for automated trading, yield optimization, and risk management
              </div>
            </div>
            <div className='flex items-start'>
              <FaCircle className='text-[#5599fe] text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>
                Decentralized AI oracles for real-time data feeds and cross-chain intelligence
              </div>
            </div>
            <div className='flex items-start'>
              <FaCircle className='text-[#48df7b] text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>
                NFT-powered AI agents for dynamic digital assets and generative art
              </div>
            </div>
            <div className='flex items-start'>
              <FaCircle className='text-[#a679f0] text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>
                DAO governance assistants for proposal analysis and community coordination
              </div>
            </div>
            <div className='flex items-start'>
              <FaCircle className='text-[#5599fe] text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>
                Web3 gaming AI agents for autonomous NPCs and player-owned economies
              </div>
            </div>
          </div>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            Focus on solutions that leverage the OpenConvAI Standard to create 
            trustless, decentralized AI systems. Think about how AI agents can enhance 
            DeFi protocols, improve on-chain governance, or create new Web3 primitives.
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'What do I need to submit?',
      icon: <FaGithub className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            Your AI Track submission must include:
          </HackathonTypography>

          <div className='mt-3 space-y-2 text-black dark:text-white'>
            <div className='flex items-start'>
              <FaGithub className='text-[#a679f0] mt-1 mr-2 flex-shrink-0' />
              <div>
                <strong>GitHub repository</strong> with all source code
              </div>
            </div>

            <div className='flex items-start'>
              <FaFileAlt className='text-[#5599fe] mt-1 mr-2 flex-shrink-0' />
              <div>
                <strong>Documentation</strong> explaining:
                <div className='ml-4 mt-2'>
                  <div>• How your AI agent uses Hedera technology</div>
                  <div>• OpenConvAI/HCS-10 implementation details</div>
                  <div>• The real-world problem you're solving</div>
                </div>
              </div>
            </div>

            <div className='flex items-start'>
              <FaCode className='text-[#48df7b] mt-1 mr-2 flex-shrink-0' />
              <div>
                <strong>Demo video</strong> (5 minutes) showing your AI agent in action
              </div>
            </div>

            <div className='flex items-start'>
              <FaFileAlt className='text-[#a679f0] mt-1 mr-2 flex-shrink-0' />
              <div>
                <strong>Presentation deck</strong> outlining your solution and impact
              </div>
            </div>
          </div>

          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            All development must occur during the hackathon period (August 1 - September 30).
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'What is the team size limit?',
      icon: <FaUsers className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            Teams can have up to 5 human members. There's no limit on AI agent 
            collaborators - in fact, we encourage you to leverage AI assistance 
            throughout your development process!
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            Solo participants are welcome, and we have channels in our Telegram 
            community to help individuals find team members if desired.
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'What tools and resources are available?',
      icon: <FaTools className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            The AI Track provides access to cutting-edge tools:
          </HackathonTypography>

          <div className='mt-3 space-y-2 text-black dark:text-white'>
            <div className='flex items-start'>
              <FaRobot className='text-[#a679f0] mt-1 mr-2 flex-shrink-0' />
              <div>
                <strong>OpenConvAI Standard</strong> - For AI agent communication
              </div>
            </div>

            <div className='flex items-start'>
              <FaBrain className='text-[#5599fe] mt-1 mr-2 flex-shrink-0' />
              <div>
                <strong>Hedera Agent Kit</strong> - Pre-built tools for Hedera integration
              </div>
            </div>

            <div className='flex items-start'>
              <FaCode className='text-[#48df7b] mt-1 mr-2 flex-shrink-0' />
              <div>
                <strong>Standards SDK</strong> - Implementation of HCS standards
              </div>
            </div>

            <div className='flex items-start'>
              <FaRobot className='text-[#a679f0] mt-1 mr-2 flex-shrink-0' />
              <div>
                <strong>Hedera JavaScript SDK</strong> - For blockchain interactions
              </div>
            </div>
          </div>

          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            Plus comprehensive documentation, tutorials, and example projects to 
            help you get started quickly.
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'How long is the hackathon?',
      icon: <FaClock className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            The Hedera Africa Hackathon runs for 2 months, from August 1st to 
            September 30th, 2025. This extended timeline allows participants to:
          </HackathonTypography>
          <div className='mt-3 space-y-2 text-black dark:text-white'>
            <div className='flex items-start'>
              <FaCircle className='text-[#a679f0] text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>Learn the technology properly without rushing</div>
            </div>
            <div className='flex items-start'>
              <FaCircle className='text-[#5599fe] text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>Build comprehensive, well-tested solutions</div>
            </div>
            <div className='flex items-start'>
              <FaCircle className='text-[#48df7b] text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>Participate while maintaining work/study commitments</div>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id='faq'
      className='py-24 sm:py-32 bg-gray-50 dark:bg-gray-900 overflow-hidden relative'
    >
      <div className='absolute inset-0'>
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
          className='absolute inset-0'
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 20%, rgba(166, 121, 240, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(85, 153, 254, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 90%, rgba(72, 223, 123, 0.08) 0%, transparent 50%)
            `,
            backgroundSize: '200% 200%',
          }}
        />
      </div>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10'>
        <motion.div 
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className='inline-block mb-6'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#a679f0]/10 to-[#5599fe]/10 dark:from-[#a679f0]/20 dark:to-[#5599fe]/20 border border-[#a679f0]/20 dark:border-[#a679f0]/30 mb-4'
            >
              <FaQuestion className='text-[#a679f0] mr-2' />
              <span className='text-sm font-bold text-[#a679f0] dark:text-[#48df7b]'>KNOWLEDGE BASE</span>
            </motion.div>
            
            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
              <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
                Frequently Asked Questions
              </span>
            </h2>
          </div>

          <Typography
            variant='body1'
            color='muted'
            className='max-w-3xl mx-auto'
          >
            Everything you need to know about the AI Track at Hedera Africa Hackathon. 
            Can't find what you're looking for? Join our Telegram community at{' '}
            <a href="https://t.me/hashinals" target="_blank" rel="noopener noreferrer" 
               className="text-[#5599fe] dark:text-[#48df7b] hover:underline font-medium">
              t.me/hashinals
            </a>
          </Typography>
        </motion.div>

        <div className='grid gap-4 max-w-4xl mx-auto'>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
              icon={faq.icon}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='text-center mt-16'
        >
          <Typography variant='h3' className='mb-4'>
            Still have questions?
          </Typography>
          <Typography variant='body1' color='muted' className='mb-8'>
            Join our community for real-time support and updates
          </Typography>
          <a
            href='https://t.me/hashinals'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#a679f0] to-[#5599fe] hover:from-[#a679f0]/90 hover:to-[#5599fe]/90 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105'
          >
            Join Telegram Community
            <FaArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HAHFAQSection;