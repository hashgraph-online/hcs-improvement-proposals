import React, { useRef } from 'react';
import { FAQItem } from '../hackathon/FAQSection';
import {
  FaInfoCircle,
  FaUserPlus,
  FaCode,
  FaClipboardCheck,
  FaBook,
  FaTrophy,
  FaCalendarAlt,
  FaQuestionCircle,
} from 'react-icons/fa';
import { Section } from '../hackathon/Section';

const FAQSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = true;


  const faqs = [
    {
      question: 'What is the Bonzo Finance AI Agent Challenge?',
      answer:
        "The Bonzo Finance AI Agent Challenge is a development sprint where participants build AI agents that interact with Bonzo Finance on Hedera. We're looking for innovative solutions that enhance user experience with DeFi protocols through conversational AI.",
      icon: <FaInfoCircle />,
    },
    {
      question: 'How do I participate?',
      answer:
        'To participate, register your project through the form in the register section.',
      icon: <FaUserPlus />,
    },
    {
      question: 'What are the technical requirements?',
      answer:
        'Your AI agent must integrate with Hedera services and Bonzo Finance protocols. It should be able to handle user queries at some level. Your solution should include both the AI agent component and the necessary Hedera integrations.',
      icon: <FaCode />,
    },
    {
      question: 'How will submissions be evaluated?',
      answer:
        'Submissions will be judged based on: Functionality (40%) - how well your agent performs its intended tasks; User Experience (25%) - clarity and intuitiveness of interactions; Technical Implementation (25%) - code quality and architecture; Innovation (10%) - creativity and unique approach.',
      icon: <FaClipboardCheck />,
    },
    {
      question: 'What resources are available to help me build?',
      answer:
        "We provide documentation, APIs, and sample code to help you get started. You'll have access to Hedera technical documentation, Bonzo Finance documentation, and developer support through our Discord channel. Mentors will be available during scheduled office hours.",
      icon: <FaBook />,
    },
    {
      question: 'What are the rewards?',
      answer: 'One winner will receive 15,000 $BONZO tokens.',
      icon: <FaTrophy />,
    },
    {
      question: 'Will there be more challenges after this one?',
      answer:
        'Yes, we plan to run more AI agent development challenges focusing on different use cases.',
      icon: <FaCalendarAlt />,
    },
  ];

  return (
    <section
      id='faq'
      ref={ref}
      className='py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden'
    >
      <div className='absolute inset-0 bg-gray-100 dark:bg-gray-800'></div>

      <div className='container mx-auto px-4 sm:px-6 relative z-10'>
        <div
          className='text-center max-w-3xl mx-auto mb-16'
        >
          <Section
            icon={<FaQuestionCircle />}
            title='Frequently Asked Questions'
          />
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            Get answers to common questions about the Bonzo Finance AI Agent
            Challenge
          </p>
        </div>

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
