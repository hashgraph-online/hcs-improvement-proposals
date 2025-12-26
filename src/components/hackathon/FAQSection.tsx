import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
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
} from 'react-icons/fa';
import HackathonTypography from './HackathonTypography';

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

  const hederaPurple = {
    bg: '#8259ef',
    light: '#8259ef20',
    medium: '#8259ef40',
  };
  const hederaBlue = { bg: '#2d84eb', light: '#2d84eb20', medium: '#2d84eb40' };
  const hederaGreen = {
    bg: '#3ec878',
    light: '#3ec87820',
    medium: '#3ec87840',
  };

  let color;
  let colorName;

  if (index % 3 === 0) {
    color = hederaPurple;
    colorName = 'hedera-purple';
  } else if (index % 3 === 1) {
    color = hederaBlue;
    colorName = 'hedera-blue';
  } else {
    color = hederaGreen;
    colorName = 'hedera-green';
  }

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      className={`rounded-lg overflow-hidden border dark:border-${colorName}/30 hover:border-${colorName}/40 dark:hover:border-${colorName}/50 transition-all duration-300 hover:-translate-y-1 mb-3 sm:mb-4 bg-white dark:bg-[#222222]`}
    >
      <div className='relative z-10'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex justify-between items-center w-full px-4 py-3 text-left group transition-colors duration-300`}
          style={{
            background: isOpen ? color.light : 'transparent',
          }}
        >
          <div className='flex items-center gap-3'>
            {icon && (
              <div
                style={{ background: color.bg }}
                className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110`}
              >
                {icon}
              </div>
            )}
            <HackathonTypography
              variant='h4'
              className=' text-black dark:text-white'
            >
              {question}
            </HackathonTypography>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ color: color.bg }}
            className='flex-shrink-0 ml-4'
          >
            <FaChevronDown />
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
              <div
                style={{
                  background: `linear-gradient(to right, transparent, ${color.medium}, transparent)`,
                }}
                className='h-px w-full'
              ></div>
              <div
                className='px-4 py-3 pl-14 dark:bg-opacity-20'
                style={{ background: color.light }}
              >
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FAQSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const faqs = [
    {
      question: 'What is the OpenConvAI Protocol?',
      icon: <FaRobot className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            OpenConvAI is a decentralized communication standard that enables AI
            agents to autonomously discover, securely interact, and transact in
            micro payments for compute, using Hedera Consensus Service (HCS).
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            By providing transparent identity management, verifiable message
            ordering, and simplified monetization, it enhances trustless
            AI-to-AI and human-to-AI interactions on the Hedera.
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'How do humans and AI agents participate together?',
      icon: <FaBrain className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            Teams can consist of 1-5 human participants, with no limit on AI
            agent collaborators. Both autonomous AI systems and human developers
            collaborate to build projects that leverage the OpenConvAI protocol.
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            Humans can develop frameworks and interfaces that enable AI agents
            to communicate and operate autonomously, while AI agents can
            contribute to coding, design decisions, and innovative approaches to
            decentralized communication.
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'Who can participate in the hackathon?',
      icon: <FaUsers className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            The hackathon is open to all developers, regardless of your
            experience level in Web3 or AI. Whether you're just starting your
            journey or are a seasoned expert, we welcome you to join us!
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            Our goal is to bring together a diverse group of talented humans and
            AI systems to explore, create, and push the boundaries of what's
            possible with Hedera's OpenConvAI protocol.
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'Where is the hackathon located?',
      icon: <FaBuilding className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            The OpenConvAI Hackathon is a completely virtual event, so anyone
            from around the world is welcome to attend! All workshops, mentoring
            sessions, and collaboration will take place online.
          </HackathonTypography>
        </>
      ),
    },
    {
      question: "I'm new to Hedera. Can I still participate?",
      icon: <FaQuestion className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            Absolutely! We have resources designed specifically for newcomers to
            Hedera technology. Throughout the hackathon, you'll have access to
            documentation, tutorials, and mentorship to help you grow your
            knowledge of Hedera and the OpenConvAI protocol.
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            The hackathon is an excellent opportunity to learn and experiment
            with Hedera's technology in a supportive environment. We encourage
            participants of all skill levels to join and explore!
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'Are there Mentor Office Hours?',
      icon: <FaUniversity className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            Yes! We'll host engaging group mentorship sessions throughout the
            hackathon period. You can submit your questions for our Mentor
            Ask-Me-Anything (AMA) sessions and join us live.
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            Additionally, our mentors will be available in the Discord server to
            provide guidance and support throughout your hackathon journey.
            Don't hesitate to reach out if you need help!
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'What are the prizes and tracks?',
      icon: <FaCoins className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            The $30,000 prize pool is distributed across two tracks:
          </HackathonTypography>
          <div className='mt-4'>
            <div className='mb-3'>
              <HackathonTypography
                variant='subtitle1'
                className='font-bold text-hedera-purple'
              >
                Best use of OpenConvAI (HCS-10)
              </HackathonTypography>
              <div className='mt-2 ml-3 text-black dark:text-white'>
                <div>🥇 First Place: $6,500</div>
                <div>🥈 Second Place: $3,500</div>
              </div>
            </div>
            <div className='mb-3'>
              <HackathonTypography
                variant='subtitle1'
                className='font-bold text-hedera-blue'
              >
                Hedera ElizaOS Plug-in
              </HackathonTypography>
              <div className='mt-2 ml-3 text-black dark:text-white'>
                <div>🥇 First Place: $6,500</div>
                <div>🥈 Second Place: $3,500</div>
              </div>
            </div>

            <div className='mb-3'>
              <HackathonTypography
                variant='subtitle1'
                className='font-bold text-hedera-blue'
              >
                Best use of Hedera AgentKit and/or MCP
              </HackathonTypography>
              <div className='mt-2 ml-3 text-black dark:text-white'>
                <div>🥇 First Place: $6,500</div>
                <div>🥈 Second Place: $3,500</div>
              </div>
            </div>
          </div>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            All winners will need to undergo a KYC process and OFAC-screening to
            be eligible for prizes. Prizes will be distributed in USDC.
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
            <FaCircle className='text-hedera-purple text-xs mr-3 flex-shrink-0' />
            <div>
              <span className='font-medium text-black dark:text-white'>
                April 11th, 2025
              </span>
              <span className='ml-4 text-black dark:text-white'>
                Registration Opens & Hackathon Kickoff
              </span>
            </div>
          </div>

          <div className='flex items-center'>
            <FaCircle className='text-hedera-blue text-xs mr-3 flex-shrink-0' />
            <div>
              <span className='font-medium text-black dark:text-white'>
                April 11th - May 2nd, 2025
              </span>
              <span className='ml-4 text-black dark:text-white'>
                Building Phase with Daily Support Sessions
              </span>
            </div>
          </div>

          <div className='flex items-center'>
            <FaCircle className='text-hedera-green text-xs mr-3 flex-shrink-0' />
            <div>
              <span className='font-medium text-black dark:text-white'>
                April 22nd, 2025
              </span>
              <span className='ml-4 text-black dark:text-white'>
                Midpoint Check-in
              </span>
            </div>
          </div>

          <div className='flex items-center'>
            <FaCircle className='text-hedera-purple text-xs mr-3 flex-shrink-0' />
            <div>
              <span className='font-medium text-black dark:text-white'>
                May 2nd, 2025 at 11:59 PM EST
              </span>
              <span className='ml-4 text-black dark:text-white'>
                Submission Deadline
              </span>
            </div>
          </div>

          <div className='flex items-center'>
            <FaCheckCircle className='text-hedera-blue text-xs mr-3 flex-shrink-0' />
            <div>
              <span className='font-medium text-black dark:text-white'>
                May 9th, 2025
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
      question: 'What should I build for the hackathon?',
      icon: <FaLightbulb className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            You can build any project that leverages the OpenConvAI protocol and
            Hedera technology! Some ideas include:
          </HackathonTypography>
          <div className='mt-3 space-y-2 text-black dark:text-white'>
            <div className='flex items-start'>
              <FaCircle className='text-hedera-purple text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>
                Autonomous AI agents that can discover and interact with each
                other
              </div>
            </div>
            <div className='flex items-start'>
              <FaCircle className='text-hedera-blue text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>
                Decentralized AI marketplaces for compute resources or data
              </div>
            </div>
            <div className='flex items-start'>
              <FaCircle className='text-hedera-green text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>
                AI systems that leverage Hedera's consensus service for
                verifiable outcomes
              </div>
            </div>
            <div className='flex items-start'>
              <FaCircle className='text-hedera-purple text-xs mt-1.5 mr-2 flex-shrink-0' />
              <div>
                Applications that enable AI-to-AI micropayments for services
              </div>
            </div>
          </div>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            The most important aspect is that your project demonstrates
            innovative use of the OpenConvAI protocol and Hedera's technology.
            Be creative and push the boundaries of what's possible!
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
            Your hackathon submission must include:
          </HackathonTypography>

          <div className='mt-3 space-y-2 text-black dark:text-white'>
            <div className='flex items-start'>
              <FaGithub className='text-hedera-purple mt-1 mr-2 flex-shrink-0' />
              <div>
                <strong>GitHub repository</strong> containing all source code
              </div>
            </div>

            <div className='flex items-start'>
              <FaFileAlt className='text-hedera-blue mt-1 mr-2 flex-shrink-0' />
              <div>
                <div>
                  <strong>README documentation</strong> that clearly explains:
                </div>
                <div className='ml-4 mt-2'>
                  <div>
                    • How Hedera is used in your project (pointing to specific
                    code)
                  </div>
                  <div>
                    • How OpenConvAI/HCS-10 is implemented (pointing to specific
                    code)
                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-start'>
              <FaCode className='text-hedera-green mt-1 mr-2 flex-shrink-0' />
              <div>
                <strong>5-minute video pitch</strong> demonstrating your
                solution
              </div>
            </div>

            <div className='flex items-start'>
              <FaFileAlt className='text-hedera-purple mt-1 mr-2 flex-shrink-0' />
              <div>
                <strong>PDF presentation deck</strong> with solution details
              </div>
            </div>
          </div>

          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            All work must be developed during the hackathon period and deployed
            on any Hedera environment (testnet, mainnet, or previewnet).
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'What is the maximum team size?',
      icon: <FaUsers className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            A maximum of 5 human members are allowed per team. There is no limit
            on the number of AI agents that can collaborate with your team!
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            We highly encourage team members to come from various backgrounds so
            that different perspectives can be incorporated into your project.
            Solo participants are also welcome to register for the hackathon.
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'Will I need a team to participate?',
      icon: <FaUsers className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            No, solo participants are more than welcome to register for the
            hackathon! You can work independently with AI assistance if you
            prefer.
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            However, if you're looking to join a team, you can use our
            #find-a-team channel in Discord where you can connect with others
            looking to add or join a team.
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'Can non-developers participate in the hackathon?',
      icon: <FaLaptopCode className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            Yes! We want anyone with ideas or the passion to innovate to
            participate. Teams will need at least one individual who can
            build/code a prototype, as a code artifact is required for project
            submission.
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            Non-developers can contribute through project management, design,
            business strategy, documentation, and other valuable roles. This is
            especially valuable in a hackathon focusing on AI and human
            collaboration!
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'Can I submit an existing project?',
      icon: <FaLightbulb className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            You can submit a project you've been working on prior to the
            hackathon, provided that there are significant improvements and
            progress to the project during the official hacking period from
            April 11th to May 2nd, 2025.
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            Your submission should clearly indicate what work was done during
            the hackathon period and how it implements or enhances the
            integration with OpenConvAI and Hedera technologies.
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
            The OpenConvAI Hackathon runs from April 11th to May 2nd, 2025 –
            that's three weeks of building, learning, and collaborating! This
            timeframe gives you enough time to understand the technology,
            develop your idea, and implement a functional prototype.
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'What developer tools are available?',
      icon: <FaTools className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            You'll have access to several powerful tools to build your project:
          </HackathonTypography>

          <div className='mt-3 space-y-2 text-black dark:text-white'>
            <div className='flex items-start'>
              <FaRobot className='text-hedera-purple mt-1 mr-2 flex-shrink-0' />
              <div>
                <strong>Hedera Agent Kit</strong> - Tools for building
                autonomous agents on Hedera
              </div>
            </div>

            <div className='flex items-start'>
              <FaBrain className='text-hedera-blue mt-1 mr-2 flex-shrink-0' />
              <div>
                <strong>ElizaOS Plugin for Hedera</strong> - Integration with
                the ElizaOS AI ecosystem
              </div>
            </div>

            <div className='flex items-start'>
              <FaCode className='text-hedera-green mt-1 mr-2 flex-shrink-0' />
              <div>
                <strong>MCP (Multi-Chain Protocol)</strong> - For cross-chain
                functionality
              </div>
            </div>

            <div className='flex items-start'>
              <FaRobot className='text-hedera-purple mt-1 mr-2 flex-shrink-0' />
              <div>
                <strong>OpenConvAI / HCS-10</strong> - Implementation provided
                by Hashgraph Online DAO
              </div>
            </div>
          </div>

          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            Technical support and mentorship will be available throughout the
            hackathon to help you leverage these tools effectively.
          </HackathonTypography>
        </>
      ),
    },
    {
      question: 'What happens to my project after the hackathon?',
      icon: <FaLightbulb className='text-lg' />,
      answer: (
        <>
          <HackathonTypography
            variant='body1'
            className='text-gray-700 dark:text-gray-300'
          >
            You retain full intellectual property rights to the projects you
            develop during the hackathon. There are no obligations for
            participants to share, license, or commercialize their projects.
          </HackathonTypography>
          <HackathonTypography
            variant='body1'
            className='mt-4 text-gray-700 dark:text-gray-300'
          >
            However, winning teams may have opportunities for further
            development and funding through the HBAR Foundation and other
            ecosystem partners. We encourage participants to continue developing
            their projects beyond the hackathon!
          </HackathonTypography>
        </>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id='faq'
      className='py-8 sm:py-12 md:py-16 lg:py-20 bg-white dark:bg-[#222222] overflow-hidden'
      style={{
        backgroundImage: 'url("/img/hackathon/stars.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-5xl'>
        <div className='text-center mb-8 sm:mb-10 md:mb-12'>
          <HackathonTypography
            variant='h2'
            align='center'
            className='mb-3 sm:mb-4 font-styrene text-black dark:text-white'
            underline={true}
            underlineColor='gradient'
          >
            Frequently Asked Questions
          </HackathonTypography>

          <HackathonTypography
            variant='body1'
            className='max-w-3xl mx-auto text-gray-700 dark:text-gray-300'
            align='center'
          >
            Everything you need to know about the Hedera OpenConvAI Hackathon.
            Can't find the answer you're looking for? Reach out to our team on
            Discord.
          </HackathonTypography>
        </div>

        <div className='relative'>
          <div
            className='absolute -top-20 -left-20 w-64 h-64 bg-hedera-purple/5 dark:bg-hedera-purple/10 rounded-full blur-3xl'
            aria-hidden='true'
          ></div>
          <div
            className='absolute -bottom-20 -right-20 w-64 h-64 bg-hedera-blue/5 dark:bg-hedera-blue/10 rounded-full blur-3xl'
            aria-hidden='true'
          ></div>

          <div className='relative space-y-3 sm:space-y-4'>
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
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
