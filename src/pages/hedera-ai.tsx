import React, { useRef } from 'react';
import Layout from '@theme/Layout';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  FaMicrophone,
  FaCalendarAlt,
  FaTrophy,
  FaUsers,
  FaChartLine,
  FaClock,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaLink,
  FaBlog,
  FaYoutube,
  FaProjectDiagram,
  FaVideo,
  FaLaptop,
  FaCog,
  FaClock as FaClockAlt,
  FaQuestion,
  FaChevronDown,
} from 'react-icons/fa';
import HackathonTypography from '../components/hackathon/HackathonTypography';
import PrimaryButton from '../components/hackathon/PrimaryButton';
import { judges, mentors, Judge, JudgeSocial } from '../lib/judges';
import { FAQItem } from '../components/hackathon/FAQSection';
import '../css/hackathon-fonts.css';
import './hackathon-styles.css';

type ScheduleItemProps = {
  time: string;
  title: string;
  description: string;
  index: number;
};

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  time,
  title,
  description,
  index,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className='relative pl-10 pb-10 border-l-2 border-gray-200 dark:border-gray-700 last:border-l-0 last:pb-0'
    >
      <div className='absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-br from-[#8259ef] to-[#3ec878]' />

      <div className='mb-1 text-sm font-medium text-[#2d84eb]'>{time}</div>
      <HackathonTypography variant='h4' className='mb-2'>
        {title}
      </HackathonTypography>
      <HackathonTypography variant='body1' color='muted'>
        {description}
      </HackathonTypography>
    </motion.div>
  );
};

type JudgingCriteriaProps = {
  title: string;
  description: string;
  percentage: number;
  icon: React.ReactNode;
  index: number;
};

const JudgingCriteria: React.FC<JudgingCriteriaProps> = ({
  title,
  description,
  percentage,
  icon,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className='relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm h-full'
    >
      <div className='absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-[#8259ef] to-[#3ec878] flex items-center justify-center transform -rotate-6'>
        <div className='text-white text-xl'>{icon}</div>
      </div>

      <div className='mt-5 mb-3 flex justify-between items-center'>
        <HackathonTypography variant='h4' className='text-xl'>
          {title}
        </HackathonTypography>
        <div className='text-2xl font-black text-[#8259ef]'>{percentage}%</div>
      </div>

      <HackathonTypography variant='body1' color='muted' className='font-light'>
        {description}
      </HackathonTypography>
    </motion.div>
  );
};

type JudgeCardProps = {
  judge: Judge;
  index: number;
};

const JudgeCard: React.FC<JudgeCardProps> = ({ judge, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'twitter':
        return <FaTwitter />;
      case 'linkedin':
        return <FaLinkedin />;
      case 'github':
        return <FaGithub />;
      case 'youtube':
        return <FaYoutube />;
      case 'blog':
        return <FaBlog />;
      case 'website':
        return <FaLink />;
      case 'projects':
        return <FaProjectDiagram />;
      default:
        return <FaLink />;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className='relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-md group'
    >
      <div className='absolute inset-0 bg-gradient-to-br from-[#8259ef]/80 via-[#2d84eb]/80 to-[#3ec878]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'></div>

      <div className='aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-700'>
        <img
          src={judge.image}
          alt={judge.name}
          className='w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300'
        />
      </div>

      <div className='p-5 relative'>
        <HackathonTypography variant='h4' className='text-lg'>
          {judge.name}
        </HackathonTypography>

        <div className='text-sm text-gray-600 dark:text-gray-300 font-medium mb-1'>
          {judge.role}
        </div>

        <div className='text-sm text-[#3ec878] font-medium mb-3'>
          {judge.company}
        </div>

        <div className='flex space-x-2 mt-3'>
          {judge.socials.slice(0, 3).map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-500 hover:text-[#8259ef] transition-colors'
              aria-label={`${judge.name}'s ${social.type}`}
            >
              {getSocialIcon(social.type)}
            </a>
          ))}
        </div>
      </div>

      <div className='absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-br from-[#8259ef]/90 via-[#2d84eb]/90 to-[#3ec878]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20'>
        <div className='text-white text-center'>
          <p className='text-sm leading-relaxed'>{judge.bio}</p>
          {judge.expertise && (
            <div className='mt-3 flex flex-wrap gap-1 justify-center'>
              {judge.expertise.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className='text-xs px-2 py-1 bg-white/20 rounded-full'
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const DemoDay: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Filter judges and mentors who have demoDay: true
  const demoDayJudges = judges.filter((judge) => judge.demoDay);
  const demoDayMentors = mentors.filter((mentor) => mentor.demoDay);
  const allDemoDayPanelists = [...demoDayJudges, ...demoDayMentors];

  const scheduleItems = [
    {
      time: 'May 20th, 10:00 - 10:15 AM',
      title: 'Day 1: Welcome & Introduction',
      description:
        'Opening remarks from the Hedera team and introduction to the judging panel.',
    },
    {
      time: 'May 20th, 10:15 - 12:45 PM',
      title: 'Day 1: Team Presentations (Teams 1-5)',
      description:
        'Each team has a 3-minute pitch followed by up to 15 minutes of Q&A from the judges. Teams should be ready when called to ensure a smooth flow between presentations.',
    },
    {
      time: 'May 20th, 12:45 - 12:55 PM',
      title: 'Day 1: Closing & Networking',
      description:
        'Wrap-up of day one and opportunity to connect with judges, other participants, and the broader community.',
    },
    {
      time: 'May 21st, 10:00 - 10:15 AM',
      title: 'Day 2: Welcome & Introduction',
      description: 'Brief welcome to day two of the Hedera x AI event.',
    },
    {
      time: 'May 21st, 10:15 - 12:45 PM',
      title: 'Day 2: Team Presentations (Teams 6-10)',
      description:
        'Each team has a 3-minute pitch followed by up to 15 minutes of Q&A from the judges. Teams should be ready when called to ensure a smooth flow between presentations.',
    },
    {
      time: 'May 21st, 12:45 - 12:55 PM',
      title: 'Day 2: Closing Remarks & Networking',
      description:
        'Final thoughts from the Hedera team and opportunity to connect with judges, other participants, and the broader community. Winners will be announced in a separate announcement after final scoring.',
    },
  ];

  // Split schedule into Day 1 and Day 2
  const day1Schedule = scheduleItems.filter((item) =>
    item.time.includes('May 20th')
  );
  const day2Schedule = scheduleItems.filter((item) =>
    item.time.includes('May 21st')
  );

  const judgingCriteria = [
    {
      icon: <FaMicrophone />,
      title: 'Presentation Quality',
      description:
        'Clear, engaging presentation that effectively demonstrates your solution. Includes demo, implementation details, and future vision.',
      percentage: 30,
    },
    {
      icon: <FaChartLine />,
      title: 'Technical Achievement',
      description:
        'Level of technical complexity and innovation displayed in the project. Effective use of Hedera services and standards.',
      percentage: 25,
    },
    {
      icon: <FaUsers />,
      title: 'User Experience',
      description:
        'Intuitive, accessible user interface and overall experience. Shows thoughtful design and consideration for end users.',
      percentage: 25,
    },
    {
      icon: <FaClock />,
      title: 'Future Potential',
      description:
        'Viability as an ongoing project with real-world applications. Business model and growth strategy.',
      percentage: 20,
    },
  ];

  return (
    <Layout
      title='Hedera x AI | Hedera OpenConvAI Hackathon'
      description='Join us for the Hedera x AI event of the Hedera OpenConvAI Hackathon where finalists will pitch their projects to our judges for a chance to win from our $30,000 prize pool.'
    >
      <div className='min-h-screen bg-white dark:bg-gray-900 font-styrene hackathon-container'>
        {/* Hero Section */}
        <section className='pt-20 pb-16 sm:pt-24 sm:pb-20 relative overflow-hidden'>
          <div className='absolute inset-0 z-0 overflow-hidden'>
            <div className='absolute -top-40 -right-40 w-80 h-80 bg-[#3ec878]/5 dark:bg-[#3ec878]/10 rounded-full blur-3xl'></div>
            <div className='absolute -bottom-20 -left-20 w-60 h-60 bg-[#8259ef]/5 dark:bg-[#8259ef]/10 rounded-full blur-3xl'></div>
            <div
              className='absolute inset-0 opacity-[0.03] dark:opacity-[0.05]'
              style={{
                backgroundImage: `radial-gradient(rgba(130, 89, 239, 0.8) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            ></div>
          </div>

          <div className='container mx-auto px-6 relative z-10'>
            <div className='max-w-4xl mx-auto text-center'>
              <HackathonTypography
                variant='h1'
                className='bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878] mb-1'
                underline={true}
                underlineColor='gradient'
              >
                Hedera x AI
              </HackathonTypography>

              <div className='w-full flex justify-center mb-6'>
                <div className='px-4 py-1.5 bg-gradient-to-r from-[#8259ef]/10 to-[#3ec878]/10 dark:from-[#8259ef]/20 dark:to-[#3ec878]/20 rounded-full'>
                  <span className='text-[#8259ef] font-medium text-sm sm:text-base'>
                    May 20th-21st, 10AM EST
                  </span>
                </div>
              </div>

              <HackathonTypography
                variant='body1'
                className='mt-3 max-w-2xl mx-auto text-gray-600 dark:text-gray-300'
                align='center'
              >
                The final culmination of the Hedera OpenConvAI Hackathon where
                shortlisted teams will present their innovative projects to our
                panel of judges in a YC-style pitch competition for a chance to
                win from our $30,000 prize pool.
              </HackathonTypography>

              <div className='mt-6 mb-8 flex justify-center'>
                <div className='inline-flex items-center gap-3 px-4 py-2 bg-white/70 dark:bg-gray-800/70 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-sm'>
                  <span className='text-gray-700 dark:text-gray-300 text-sm'>
                    Streamed and hosted by:
                  </span>
                  <img
                    src='/img/hackathon/genfinity-logo.webp'
                    alt='Genfinity Logo'
                    className='h-7 w-auto'
                  />
                </div>
              </div>

              <div className='mt-8 flex justify-center gap-4'>
                <PrimaryButton href='#schedule' size='lg'>
                  Event Details
                </PrimaryButton>
                <PrimaryButton
                  href='/hackathon'
                  size='lg'
                  className='bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800'
                >
                  Back to Hackathon
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>

        <section className='relative bg-white dark:bg-gray-950 overflow-hidden'>
          <div className='absolute inset-0 z-0 overflow-hidden'>
            <div className='absolute -top-40 -right-40 w-80 h-80 bg-[#3ec878]/5 dark:bg-[#3ec878]/10 rounded-full blur-3xl'></div>
            <div className='absolute -bottom-20 -left-20 w-60 h-60 bg-[#8259ef]/5 dark:bg-[#8259ef]/10 rounded-full blur-3xl'></div>
          </div>

          <div className='container mx-auto px-6 relative z-10'>
            <div className='max-w-5xl mx-auto'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className='rounded-2xl overflow-hidden relative bg-gradient-to-r p-[2px] from-[#8259ef] via-[#2d84eb] to-[#3ec878] shadow-xl'
              >
                <div className='bg-white dark:bg-gray-900 rounded-[calc(1rem-2px)]'>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 0,
                      paddingTop: '56.25%',
                      overflow: 'hidden',
                    }}
                  >
                    <iframe
                      loading='lazy'
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        border: 'none',
                        padding: 0,
                        margin: 0,
                        borderRadius: 'calc(1rem - 2px)',
                      }}
                      src='https://www.canva.com/design/DAGkWXqzZIs/ttlkHd18GdpAl-AX_I1-5Q/watch?embed'
                      allowFullScreen={true}
                      allow='fullscreen'
                      title='Hedera OpenConvAI Hackathon Hedera x AI'
                    ></iframe>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section
          id='schedule'
          ref={sectionRef}
          className='py-16 sm:py-24 relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden'
        >
          <div className='absolute inset-0 z-0 overflow-hidden'>
            <div className='absolute top-0 right-0 w-60 h-60 bg-[#3ec878]/5 dark:bg-[#3ec878]/10 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-40 h-40 bg-[#8259ef]/5 dark:bg-[#8259ef]/10 rounded-full blur-3xl'></div>
          </div>

          <div className='container mx-auto px-6 relative z-10'>
            <div className='max-w-4xl mx-auto'>
              <motion.div
                className='text-center mb-16'
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <div className='relative w-24 h-24 mx-auto mb-6'>
                  <div className='absolute inset-0 rounded-2xl bg-[#8259ef]/10 transform rotate-45'></div>
                  <div className='absolute inset-[6px] rounded-xl bg-[#2d84eb]/10 transform rotate-45'></div>
                  <div className='absolute inset-[12px] rounded-lg bg-[#3ec878]/10 transform rotate-45'></div>
                  <div className='absolute inset-0 flex items-center justify-center text-4xl text-[#8259ef]'>
                    <FaCalendarAlt />
                  </div>
                </div>

                <HackathonTypography
                  variant='h2'
                  className='bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878] mb-4'
                  underline={true}
                  underlineColor='gradient'
                >
                  Event Schedule
                </HackathonTypography>

                <HackathonTypography
                  variant='body1'
                  className='mt-6 max-w-3xl mx-auto text-gray-600 dark:text-gray-300'
                  align='center'
                >
                  Our Hedera x AI event follows a structured format designed to
                  give each team the spotlight they deserve while maintaining an
                  efficient judging process.
                </HackathonTypography>
              </motion.div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className='bg-white dark:bg-gray-900 overflow-hidden rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700'
                >
                  <div className='bg-gradient-to-r from-[#8259ef]/10 to-[#8259ef]/5 dark:from-[#8259ef]/20 dark:to-[#8259ef]/10 px-6 py-4 border-b border-gray-100 dark:border-gray-700'>
                    <HackathonTypography
                      variant='h3'
                      className='text-[#8259ef] text-center'
                    >
                      Day 1 · May 20th
                    </HackathonTypography>
                  </div>
                  <div className='p-6'>
                    {day1Schedule.map((item, index) => (
                      <ScheduleItem
                        key={index}
                        time={item.time.replace('May 20th, ', '')}
                        title={item.title.replace('Day 1: ', '')}
                        description={item.description}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className='bg-white dark:bg-gray-900 overflow-hidden rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700'
                >
                  <div className='bg-gradient-to-r from-[#3ec878]/10 to-[#3ec878]/5 dark:from-[#3ec878]/20 dark:to-[#3ec878]/10 px-6 py-4 border-b border-gray-100 dark:border-gray-700'>
                    <HackathonTypography
                      variant='h3'
                      className='text-[#3ec878] text-center'
                    >
                      Day 2 · May 21st
                    </HackathonTypography>
                  </div>
                  <div className='p-6'>
                    {day2Schedule.map((item, index) => (
                      <ScheduleItem
                        key={index}
                        time={item.time.replace('May 21st, ', '')}
                        title={item.title.replace('Day 2: ', '')}
                        description={item.description}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Judges Section */}
        <section
          id='judges'
          className='py-16 sm:py-24 relative overflow-hidden'
        >
          <div className='absolute inset-0 z-0 overflow-hidden'>
            <div className='absolute -top-40 -right-40 w-80 h-80 bg-[#3ec878]/5 dark:bg-[#3ec878]/10 rounded-full blur-3xl'></div>
            <div className='absolute -bottom-20 -left-20 w-60 h-60 bg-[#8259ef]/5 dark:bg-[#8259ef]/10 rounded-full blur-3xl'></div>
          </div>

          <div className='container mx-auto px-6 relative z-10'>
            <div className='max-w-7xl mx-auto'>
              <motion.div
                className='text-center mb-16'
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <div className='relative w-24 h-24 mx-auto mb-6'>
                  <div className='absolute inset-0 rounded-2xl bg-[#8259ef]/10 transform rotate-45'></div>
                  <div className='absolute inset-[6px] rounded-xl bg-[#2d84eb]/10 transform rotate-45'></div>
                  <div className='absolute inset-[12px] rounded-lg bg-[#3ec878]/10 transform rotate-45'></div>
                  <div className='absolute inset-0 flex items-center justify-center text-4xl text-[#8259ef]'>
                    <FaUsers />
                  </div>
                </div>

                <HackathonTypography
                  variant='h2'
                  className='bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878] mb-4'
                  underline={true}
                  underlineColor='gradient'
                >
                  Meet the Judges
                </HackathonTypography>

                <HackathonTypography
                  variant='body1'
                  className='mt-6 max-w-3xl mx-auto text-gray-600 dark:text-gray-300'
                  align='center'
                >
                  Our esteemed panel of industry experts will evaluate your
                  presentations and select the winners. Each judge brings unique
                  expertise and perspective to the evaluation process.
                </HackathonTypography>
              </motion.div>

              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10'>
                {allDemoDayPanelists.map((judge, index) => (
                  <JudgeCard key={index} judge={judge} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Judging Criteria Section */}
        <section
          id='judging'
          className='py-16 sm:py-24 relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden'
        >
          <div className='absolute inset-0 z-0 overflow-hidden'>
            <div className='absolute -top-40 -right-40 w-80 h-80 bg-[#3ec878]/5 dark:bg-[#3ec878]/10 rounded-full blur-3xl'></div>
            <div className='absolute -bottom-20 -left-20 w-60 h-60 bg-[#8259ef]/5 dark:bg-[#8259ef]/10 rounded-full blur-3xl'></div>
          </div>

          <div className='container mx-auto px-6 relative z-10'>
            <div className='max-w-7xl mx-auto'>
              <motion.div
                className='text-center mb-16'
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <div className='relative w-24 h-24 mx-auto mb-6'>
                  <div className='absolute inset-0 rounded-2xl bg-[#8259ef]/10 transform rotate-45'></div>
                  <div className='absolute inset-[6px] rounded-xl bg-[#2d84eb]/10 transform rotate-45'></div>
                  <div className='absolute inset-[12px] rounded-lg bg-[#3ec878]/10 transform rotate-45'></div>
                  <div className='absolute inset-0 flex items-center justify-center text-4xl text-[#8259ef]'>
                    <FaTrophy />
                  </div>
                </div>

                <HackathonTypography
                  variant='h2'
                  className='bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878] mb-4'
                  underline={true}
                  underlineColor='gradient'
                >
                  Judging Criteria
                </HackathonTypography>

                <HackathonTypography
                  variant='body1'
                  className='mt-6 max-w-3xl mx-auto text-gray-600 dark:text-gray-300'
                  align='center'
                >
                  Our judges will evaluate each presentation based on the
                  following criteria, which together make up your final Hedera x
                  AI score.
                </HackathonTypography>
              </motion.div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mb-20'>
                {judgingCriteria.map((criteria, index) => (
                  <JudgingCriteria
                    key={index}
                    icon={criteria.icon}
                    title={criteria.title}
                    description={criteria.description}
                    percentage={criteria.percentage}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Presentation Tips Section */}
        <section id='tips' className='py-16 sm:py-24 relative overflow-hidden'>
          <div className='absolute inset-0 z-0 overflow-hidden'>
            <div className='absolute top-0 right-0 w-60 h-60 bg-[#3ec878]/5 dark:bg-[#3ec878]/10 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-40 h-40 bg-[#8259ef]/5 dark:bg-[#8259ef]/10 rounded-full blur-3xl'></div>
          </div>

          <div className='container mx-auto px-6 relative z-10'>
            <div className='max-w-4xl mx-auto'>
              <motion.div
                className='text-center mb-16'
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <HackathonTypography
                  variant='h2'
                  className='bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878] mb-4'
                  underline={true}
                  underlineColor='gradient'
                >
                  Presentation Tips & Requirements
                </HackathonTypography>

                <HackathonTypography
                  variant='body1'
                  className='mt-6 max-w-3xl mx-auto text-gray-600 dark:text-gray-300'
                  align='center'
                >
                  Maximize your impact during the 3-minute pitch window with
                  these essential tips and technical requirements.
                </HackathonTypography>
              </motion.div>

              <div className='grid grid-cols-1 gap-8 mb-12'>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className='bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border-l-4 border-[#8259ef]'
                >
                  <HackathonTypography
                    variant='h3'
                    className='mb-4 flex items-center gap-2'
                  >
                    <span className='text-[#8259ef]'>
                      <FaVideo className='inline-block mr-2' />
                    </span>
                    Streaming Information
                  </HackathonTypography>

                  <div className='space-y-4'>
                    <HackathonTypography variant='body1' color='muted'>
                      <span className='font-semibold text-gray-900 dark:text-white'>
                        Host:
                      </span>{' '}
                      The Hedera x AI event will be streamed and hosted by
                      <span className='text-[#8259ef] font-medium'>
                        {' '}
                        Genfinity{' '}
                      </span>
                      on Streamyard.
                    </HackathonTypography>

                    <HackathonTypography variant='body1' color='muted'>
                      <span className='font-semibold text-gray-900 dark:text-white'>
                        Team Representation:
                      </span>{' '}
                      Due to streaming platform limitations, only{' '}
                      <span className='text-[#8259ef] font-medium'>
                        one team member
                      </span>{' '}
                      can present during the pitch. Choose your presenter
                      wisely!
                    </HackathonTypography>

                    <HackathonTypography variant='body1' color='muted'>
                      <span className='font-semibold text-gray-900 dark:text-white'>
                        Platform:
                      </span>{' '}
                      We'll be using{' '}
                      <span className='text-[#3ec878] font-medium'>
                        Streamyard
                      </span>{' '}
                      for the presentations. All participants should:
                    </HackathonTypography>

                    <ul className='pl-6 space-y-2'>
                      <li className='list-disc'>
                        <HackathonTypography variant='body1' color='muted'>
                          Familiarize yourself with Streamyard before the event
                        </HackathonTypography>
                      </li>
                      <li className='list-disc'>
                        <HackathonTypography variant='body1' color='muted'>
                          Test your camera, microphone, and screen sharing at
                          least 24 hours before the event
                        </HackathonTypography>
                      </li>
                      <li className='list-disc'>
                        <HackathonTypography variant='body1' color='muted'>
                          Have a backup device ready in case of technical issues
                        </HackathonTypography>
                      </li>
                      <li className='list-disc'>
                        <HackathonTypography variant='body1' color='muted'>
                          Join the stream 15 minutes before your scheduled
                          presentation time
                        </HackathonTypography>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              <div className='bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <HackathonTypography
                      variant='h4'
                      className='mb-4 flex items-center'
                    >
                      <div className='w-8 h-8 rounded-full bg-gradient-to-r from-[#8259ef] to-[#2d84eb] flex items-center justify-center text-white mr-3'>
                        1
                      </div>
                      Preparation
                    </HackathonTypography>
                    <ul className='space-y-3'>
                      <li className='flex items-start'>
                        <div className='flex-shrink-0 w-5 h-5 rounded-full bg-[#8259ef] flex items-center justify-center text-white text-xs mr-3 mt-1'>
                          <span className='text-xs'>✓</span>
                        </div>
                        <HackathonTypography variant='body1' color='muted'>
                          Practice your pitch thoroughly—aim for at least 5 full
                          rehearsals
                        </HackathonTypography>
                      </li>
                      <li className='flex items-start'>
                        <div className='flex-shrink-0 w-5 h-5 rounded-full bg-[#8259ef] flex items-center justify-center text-white text-xs mr-3 mt-1'>
                          <span className='text-xs'>✓</span>
                        </div>
                        <HackathonTypography variant='body1' color='muted'>
                          Create slides with 90% visuals, 10% text—let your
                          voice tell the story
                        </HackathonTypography>
                      </li>
                      <li className='flex items-start'>
                        <div className='flex-shrink-0 w-5 h-5 rounded-full bg-[#8259ef] flex items-center justify-center text-white text-xs mr-3 mt-1'>
                          <span className='text-xs'>✓</span>
                        </div>
                        <HackathonTypography variant='body1' color='muted'>
                          Record a practice run and time yourself—stay within
                          2:45 to allow buffer
                        </HackathonTypography>
                      </li>
                      <li className='flex items-start'>
                        <div className='flex-shrink-0 w-5 h-5 rounded-full bg-[#8259ef] flex items-center justify-center text-white text-xs mr-3 mt-1'>
                          <span className='text-xs'>✓</span>
                        </div>
                        <HackathonTypography variant='body1' color='muted'>
                          Prepare concise answers to anticipated questions from
                          judges
                        </HackathonTypography>
                      </li>
                    </ul>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <HackathonTypography
                      variant='h4'
                      className='mb-4 flex items-center'
                    >
                      <div className='w-8 h-8 rounded-full bg-gradient-to-r from-[#2d84eb] to-[#3ec878] flex items-center justify-center text-white mr-3'>
                        2
                      </div>
                      Content Structure
                    </HackathonTypography>
                    <ul className='space-y-3'>
                      <li className='flex items-start'>
                        <div className='flex-shrink-0 w-5 h-5 rounded-full bg-[#3ec878] flex items-center justify-center text-white text-xs mr-3 mt-1'>
                          <span className='text-xs'>1</span>
                        </div>
                        <HackathonTypography variant='body1' color='muted'>
                          <span className='font-medium'>
                            Problem & Hook (30 sec):
                          </span>{' '}
                          Start with a compelling problem statement and why it
                          matters
                        </HackathonTypography>
                      </li>
                      <li className='flex items-start'>
                        <div className='flex-shrink-0 w-5 h-5 rounded-full bg-[#3ec878] flex items-center justify-center text-white text-xs mr-3 mt-1'>
                          <span className='text-xs'>2</span>
                        </div>
                        <HackathonTypography variant='body1' color='muted'>
                          <span className='font-medium'>
                            Solution Demo (1-2 min):
                          </span>{' '}
                          Show don't tell—focus on a live demonstration of key
                          features
                        </HackathonTypography>
                      </li>
                      <li className='flex items-start'>
                        <div className='flex-shrink-0 w-5 h-5 rounded-full bg-[#3ec878] flex items-center justify-center text-white text-xs mr-3 mt-1'>
                          <span className='text-xs'>3</span>
                        </div>
                        <HackathonTypography variant='body1' color='muted'>
                          <span className='font-medium'>
                            Technical Implementation (30 sec):
                          </span>{' '}
                          Highlight how you're using Hedera's services and
                          standards
                        </HackathonTypography>
                      </li>
                      <li className='flex items-start'>
                        <div className='flex-shrink-0 w-5 h-5 rounded-full bg-[#3ec878] flex items-center justify-center text-white text-xs mr-3 mt-1'>
                          <span className='text-xs'>4</span>
                        </div>
                        <HackathonTypography variant='body1' color='muted'>
                          <span className='font-medium'>
                            Vision & Impact (15-30 sec):
                          </span>{' '}
                          Conclude with future plans and potential market impact
                        </HackathonTypography>
                      </li>
                    </ul>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className='mt-10 p-4 bg-gradient-to-r from-[#8259ef]/10 to-[#3ec878]/10 dark:from-[#8259ef]/20 dark:to-[#3ec878]/20 rounded-xl'
                >
                  <HackathonTypography
                    variant='body1'
                    color='muted'
                    className='italic'
                  >
                    <span className='font-semibold text-[#8259ef]'>
                      Pro Tip:
                    </span>{' '}
                    Your Q&A session (5-7 minutes) is just as important as your
                    pitch. This is where judges dig deeper into your project's
                    potential and technical merits. Be prepared to explain your
                    technical choices and business strategy in detail.
                  </HackathonTypography>
                </motion.div>
              </div>

              <div className='mt-12 text-center'>
                <PrimaryButton href='#judges' size='lg'>
                  Meet Our Judges
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>

        <section
          id='continued-development'
          className='py-16 sm:py-24 relative overflow-hidden'
        >
          <div className='absolute inset-0 z-0 overflow-hidden'>
            <div className='absolute top-0 right-0 w-60 h-60 bg-[#3ec878]/5 dark:bg-[#3ec878]/10 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-40 h-40 bg-[#8259ef]/5 dark:bg-[#8259ef]/10 rounded-full blur-3xl'></div>
          </div>

          <div className='container mx-auto px-6 relative z-10'>
            <div className='max-w-4xl mx-auto'>
              <motion.div
                className='text-center mb-16'
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <div className='relative w-24 h-24 mx-auto mb-6'>
                  <div className='absolute inset-0 rounded-2xl bg-[#8259ef]/10 transform rotate-45'></div>
                  <div className='absolute inset-[6px] rounded-xl bg-[#2d84eb]/10 transform rotate-45'></div>
                  <div className='absolute inset-[12px] rounded-lg bg-[#3ec878]/10 transform rotate-45'></div>
                  <div className='absolute inset-0 flex items-center justify-center text-4xl text-[#3ec878]'>
                    <FaChartLine />
                  </div>
                </div>

                <HackathonTypography
                  variant='h2'
                  className='bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878] mb-4'
                  underline={true}
                  underlineColor='gradient'
                >
                  Continued Development
                </HackathonTypography>

                <HackathonTypography
                  variant='body1'
                  className='mt-6 max-w-3xl mx-auto text-gray-600 dark:text-gray-300'
                  align='center'
                >
                  Take advantage of additional development time to refine your
                  project before Hedera x AI.
                </HackathonTypography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg'
              >
                <div className='flex flex-col md:flex-row gap-8 items-center'>
                  <div className='flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-[#8259ef]/20 to-[#3ec878]/20 flex items-center justify-center'>
                    <div className='text-5xl text-[#3ec878]'>
                      <FaChartLine />
                    </div>
                  </div>
                  <div className='flex-grow'>
                    <HackathonTypography variant='h3' className='mb-4'>
                      Polish Your Project After Submission
                    </HackathonTypography>
                    <HackathonTypography variant='body1' color='muted'>
                      Good news! Even after the official hackathon submission
                      deadline, you'll have flexibility to continue refining and
                      improving your project before Hedera x AI. Use this time
                      to polish your UI, fix bugs, enhance features, and prepare
                      an impressive presentation. Just ensure your core concept
                      remains consistent with your hackathon submission.
                    </HackathonTypography>
                    <div className='mt-4 space-y-2'>
                      <div className='flex items-start gap-2'>
                        <div className='w-5 h-5 rounded-full bg-[#3ec878] flex items-center justify-center text-white mt-1'>
                          ✓
                        </div>
                        <HackathonTypography variant='body1' color='muted'>
                          <span className='font-medium'>Refine UI/UX</span> -
                          Ensure your application is visually appealing and
                          intuitive
                        </HackathonTypography>
                      </div>
                      <div className='flex items-start gap-2'>
                        <div className='w-5 h-5 rounded-full bg-[#3ec878] flex items-center justify-center text-white mt-1'>
                          ✓
                        </div>
                        <HackathonTypography variant='body1' color='muted'>
                          <span className='font-medium'>Fix Bugs</span> -
                          Resolve any issues identified after submission
                        </HackathonTypography>
                      </div>
                      <div className='flex items-start gap-2'>
                        <div className='w-5 h-5 rounded-full bg-[#3ec878] flex items-center justify-center text-white mt-1'>
                          ✓
                        </div>
                        <HackathonTypography variant='body1' color='muted'>
                          <span className='font-medium'>Perfect Your Demo</span>{' '}
                          - Practice and fine-tune your live demonstration
                        </HackathonTypography>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id='faq'
          className='py-16 sm:py-24 relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden'
        >
          <div className='absolute inset-0 z-0 overflow-hidden'>
            <div className='absolute top-0 right-0 w-60 h-60 bg-[#3ec878]/5 dark:bg-[#3ec878]/10 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-40 h-40 bg-[#8259ef]/5 dark:bg-[#8259ef]/10 rounded-full blur-3xl'></div>
          </div>

          <div className='container mx-auto px-6 relative z-10'>
            <div className='max-w-4xl mx-auto'>
              <motion.div
                className='text-center mb-16'
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <div className='relative w-24 h-24 mx-auto mb-6'>
                  <div className='absolute inset-0 rounded-2xl bg-[#8259ef]/10 transform rotate-45'></div>
                  <div className='absolute inset-[6px] rounded-xl bg-[#2d84eb]/10 transform rotate-45'></div>
                  <div className='absolute inset-[12px] rounded-lg bg-[#3ec878]/10 transform rotate-45'></div>
                  <div className='absolute inset-0 flex items-center justify-center text-4xl text-[#8259ef]'>
                    <FaQuestion />
                  </div>
                </div>

                <HackathonTypography
                  variant='h2'
                  className='bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878] mb-4'
                  underline={true}
                  underlineColor='gradient'
                >
                  Frequently Asked Questions
                </HackathonTypography>

                <HackathonTypography
                  variant='body1'
                  className='mt-6 max-w-3xl mx-auto text-gray-600 dark:text-gray-300'
                  align='center'
                >
                  Get answers to common questions about the Hedera x AI event
                  and presentation process.
                </HackathonTypography>
              </motion.div>

              <div className='space-y-4'>
                <FAQItem
                  question='What happens if I have technical issues during my presentation?'
                  answer={
                    <HackathonTypography variant='body1' color='muted'>
                      We recommend testing your setup at least 24 hours before
                      the event. If you encounter technical issues during your
                      presentation, our technical team will assist you. We've
                      allocated buffer time between presentations to handle any
                      unexpected issues. In worst-case scenarios, we may
                      reschedule your presentation for later in the event.
                    </HackathonTypography>
                  }
                  index={0}
                  icon={<FaCog />}
                />

                <FAQItem
                  question='How will presentations be scheduled?'
                  answer={
                    <HackathonTypography variant='body1' color='muted'>
                      Teams will be scheduled across two days (May 20-21) with
                      specific time slots assigned in advance. You'll receive
                      your slot at least 48 hours before the event. Each team
                      has a 3-minute presentation window followed by up to 15
                      minutes of Q&A with judges. Please join the Streamyard
                      broadcast 15 minutes before your scheduled time.
                    </HackathonTypography>
                  }
                  index={1}
                  icon={<FaCalendarAlt />}
                />

                <FAQItem
                  question='Can I use slides or demos during my pitch?'
                  answer={
                    <HackathonTypography variant='body1' color='muted'>
                      Yes, and we strongly encourage it! You can share your
                      screen to present slides, demonstrate your project live,
                      or show pre-recorded demos. We recommend practicing your
                      screen sharing in Streamyard before the event. Visuals
                      significantly improve your presentation's impact, but
                      ensure they're clear and readable.
                    </HackathonTypography>
                  }
                  index={2}
                  icon={<FaLaptop />}
                />

                <FAQItem
                  question='How should I prepare for the Q&A session?'
                  answer={
                    <HackathonTypography variant='body1' color='muted'>
                      The Q&A is critical—it's where judges evaluate your
                      understanding of the problem and solution. Prepare for
                      questions about your technical implementation, business
                      model, user acquisition strategy, and how you're utilizing
                      Hedera. Have specific team members ready to answer
                      questions in their area of expertise. Keep answers concise
                      but thorough.
                    </HackathonTypography>
                  }
                  index={3}
                  icon={<FaMicrophone />}
                />

                <FAQItem
                  question='Will the event be recorded?'
                  answer={
                    <HackathonTypography variant='body1' color='muted'>
                      Yes, the entire Hedera x AI event will be recorded and
                      made available after the event. The recording will be
                      shared with participants and published on Hedera's
                      channels. This is a great opportunity for additional
                      exposure for your project. If you have specific concerns
                      about being recorded, please contact the event organizers.
                    </HackathonTypography>
                  }
                  index={4}
                  icon={<FaVideo />}
                />

                <FAQItem
                  question='Can multiple team members join the presentation?'
                  answer={
                    <HackathonTypography variant='body1' color='muted'>
                      Due to streaming platform limitations, only one team
                      member can present during the pitch. Your designated
                      presenter should be prepared to speak about all aspects of
                      the project, or clearly indicate when another team member
                      should address specific questions.
                    </HackathonTypography>
                  }
                  index={5}
                  icon={<FaUsers />}
                />

                <FAQItem
                  question='What happens after Hedera x AI?'
                  answer={
                    <HackathonTypography variant='body1' color='muted'>
                      After the Hedera x AI event, judges will deliberate and
                      winners will be announced in a separate announcement. All
                      projects, regardless of winning status, will be featured
                      in Hedera's showcase and may receive opportunities for
                      continued development support, investment conversations,
                      or integration with Hedera ecosystem partners. The Hedera
                      x AI event is a critical milestone in your project's
                      journey with Hedera!
                    </HackathonTypography>
                  }
                  index={6}
                  icon={<FaClockAlt />}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DemoDay;
