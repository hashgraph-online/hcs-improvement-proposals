import React, { useRef } from 'react';
import { FAQItem } from '../hackathon/FAQSection';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import {
  FaInfoCircle,
  FaUserPlus,
  FaCode,
  FaClipboardCheck,
  FaBook,
  FaTrophy,
  FaCalendarAlt,
} from 'react-icons/fa';

const FAQSection: React.FC = () => {
  const [ref, isInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqs = [
    {
      question: 'What are the Hashgraph Online AI Agent Sprints?',
      answer:
        'AI Agent Sprints are time-boxed development challenges where participants build AI agents that interact with Hedera protocols. Each sprint focuses on a specific use case or integration with clearly defined requirements and success criteria.',
      icon: <FaInfoCircle />,
    },
    {
      question: 'How do I participate?',
      answer:
        "To participate, register for the current sprint challenge through the submission portal. You'll need to provide your GitHub repository and project details. Follow the specific technical requirements for each sprint.",
      icon: <FaUserPlus />,
    },
    {
      question: 'What are the technical requirements?',
      answer:
        'All sprints require using the HCS Standards SDK and Standards Agent Kit. Each sprint has additional specific requirements related to the challenge focus area. Check the current sprint details for exact specifications.',
      icon: <FaCode />,
    },
    {
      question: 'How are submissions evaluated?',
      answer:
        'Submissions are typically judged on Functionality (40%), User Experience (25%), Technical Implementation (25%), and Innovation (10%). Specific criteria may vary by sprint, so check the current challenge details.',
      icon: <FaClipboardCheck />,
    },
    {
      question: 'What resources are available?',
      answer:
        'We provide comprehensive documentation, APIs, sample code, and developer support through our Telegram community. Technical mentors are available for specific questions during scheduled office hours.',
      icon: <FaBook />,
    },
    {
      question: 'What rewards can I earn?',
      answer:
        'Rewards vary by sprint and partner. They typically include tokens, community recognition, and potential partnership opportunities. See the current sprint challenge for specific reward details.',
      icon: <FaTrophy />,
    },
    {
      question: 'What future sprints are planned?',
      answer:
        'We plan to run sprints covering diverse use cases including NFT management, governance, cross-chain operations, DeFi, and more. Follow our Telegram community for upcoming sprint announcements.',
      icon: <FaCalendarAlt />,
    },
  ];

  return (
    <section
      id='faq'
      ref={ref}
      className='py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden'
    >
      {/* Background decorations */}
      <div className='absolute inset-0 bg-gray-100 dark:bg-gray-800'>
        {/* Add your background decoration components here */}
      </div>

      <div className='container mx-auto px-4 sm:px-6 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className='text-center max-w-3xl mx-auto mb-16'
        >
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
            Frequently Asked Questions
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            Common questions about the Hashgraph Online AI Agent Sprints
          </p>
        </motion.div>

        <div className='max-w-3xl mx-auto'>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              icon={faq.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
