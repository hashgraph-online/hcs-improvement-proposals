import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaRobot,
  FaStar,
  FaNetworkWired,
  FaBrain,
  FaTimes,
  FaYoutube,
  FaGlobe,
  FaRss,
  FaProjectDiagram,
} from 'react-icons/fa';
import { judges, mentors, Judge, JudgeSocial } from '../../lib/judges';
import HackathonTypography from './HackathonTypography';

interface SocialIconProps {
  type: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ type }) => {
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
      return <FaRss />;
    case 'website':
      return <FaGlobe />;
    case 'projects':
      return <FaProjectDiagram />;
    default:
      return null;
  }
};

interface PersonProps {
  person: Judge;
  index: number;
  onClick: () => void;
  isSelected: boolean;
}

const Person: React.FC<PersonProps> = ({
  person,
  index,
  onClick,
  isSelected,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  const isHashgraphLogo = person.image.includes('/logo.png');

  return (
    <motion.div
      ref={cardRef}
      className={`relative cursor-pointer transition-all duration-500 ${
        isSelected ? 'scale-105 z-10' : ''
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.43, 0.13, 0.23, 0.96],
              },
            }
          : {}
      }
      whileHover={{
        y: -10,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      onClick={onClick}
    >
      <div className='group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black shadow-xl'>
        <div className='absolute inset-0 bg-gradient-to-tr from-hedera-purple/20 via-transparent to-hedera-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out z-0'></div>

        {isHashgraphLogo && (
          <div className='absolute inset-0 bg-gradient-to-br from-hedera-blue to-hedera-purple z-0'></div>
        )}

        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

          <motion.div
            className='absolute bottom-0 left-0 right-0 p-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out'
            initial={false}
          >
            <div className='flex gap-3 justify-center'>
              {person.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={(e) => e.stopPropagation()}
                  className='text-white hover:text-hedera-green transition-colors text-lg'
                  aria-label={`${social.type} profile`}
                >
                  <SocialIcon type={social.type} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <img
          src={person.image}
          alt={person.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            isHashgraphLogo ? 'p-6 z-10 relative' : ''
          }`}
        />

        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50'></div>

        {person.isAI && (
          <div className='absolute top-3 right-3 z-10'>
            <div className='relative'>
              <div className='absolute -inset-1 bg-hedera-purple rounded-full opacity-40 blur animate-pulse'></div>
              <div className='relative bg-gradient-to-r from-hedera-blue to-hedera-purple rounded-full w-8 h-8 flex items-center justify-center'>
                <FaRobot className='text-white' />
              </div>
            </div>
          </div>
        )}
      </div>

      <motion.div
        className='mt-4 text-center px-2'
        initial={{ opacity: 0 }}
        animate={
          isInView
            ? { opacity: 1, transition: { delay: 0.3 + index * 0.1 } }
            : {}
        }
      >
        <HackathonTypography
          variant='subtitle1'
          className='font-styrene text-black dark:text-white'
        >
          {person.name}
        </HackathonTypography>
        <HackathonTypography
          variant='body2'
          className='text-hedera-charcoal dark:text-hedera-smoke'
        >
          {person.role}
        </HackathonTypography>
        <HackathonTypography variant='caption' color='green'>
          {person.company}
        </HackathonTypography>
      </motion.div>
    </motion.div>
  );
};

interface SelectedPersonProps {
  person: Judge | null;
  onClose: () => void;
}

const SelectedPerson: React.FC<SelectedPersonProps> = ({ person, onClose }) => {
  if (!person) return null;

  const modalRef = useRef<HTMLDivElement>(null);
  const isHashgraphLogo = person.image.includes('/logo.png');

  return (
    <AnimatePresence>
      <motion.div
        className='fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          className='relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl'
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='absolute top-0 left-0 right-0 h-48 bg-gradient-to-r from-hedera-blue/10 to-hedera-purple/10 opacity-50'></div>

          <button
            onClick={onClose}
            className='absolute top-4 right-4 p-2 text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors'
          >
            <FaTimes size={24} />
          </button>

          <div className='flex flex-col md:flex-row'>
            <div className='md:w-2/5'>
              <div className='h-80 md:h-full relative overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10'></div>

                {isHashgraphLogo ? (
                  <div className='absolute inset-0 bg-gradient-to-br from-hedera-blue to-hedera-purple flex items-center justify-center p-10'>
                    <img
                      src={person.image}
                      alt={person.name}
                      className='w-full'
                    />
                  </div>
                ) : (
                  <img
                    src={person.image}
                    alt={person.name}
                    className='w-full h-full object-cover'
                  />
                )}

                <div className='absolute bottom-0 left-0 right-0 p-6 z-20'>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <HackathonTypography
                      variant='h2'
                      className='font-styrene text-white mb-1'
                    >
                      {person.name}
                    </HackathonTypography>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className='flex flex-col'
                  >
                    <HackathonTypography
                      variant='body1'
                      className='text-white/90'
                    >
                      {person.role}
                    </HackathonTypography>
                    <HackathonTypography variant='caption' color='green'>
                      {person.company}
                    </HackathonTypography>
                  </motion.div>

                  <motion.div
                    className='flex gap-4 mt-4'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {person.socials.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-white/80 hover:text-white transition-colors text-lg'
                        aria-label={`${social.type} profile`}
                      >
                        <SocialIcon type={social.type} />
                      </a>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>

            <div className='md:w-3/5 p-6 md:p-10 md:pl-12'>
              <div className='h-full flex flex-col'>
                <motion.div
                  className='mb-6'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <HackathonTypography
                    variant='h3'
                    className='font-styrene text-black dark:text-white mb-4'
                  >
                    Bio
                  </HackathonTypography>
                  <HackathonTypography
                    variant='body1'
                    className='text-hedera-charcoal dark:text-hedera-smoke leading-relaxed'
                  >
                    {person.bio}
                  </HackathonTypography>
                </motion.div>

                {person.expertise && (
                  <motion.div
                    className='mt-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <HackathonTypography
                      variant='subtitle1'
                      color='purple'
                      className='font-styrene mb-4 flex items-center'
                    >
                      <FaNetworkWired className='mr-2' /> <span>Expertise</span>
                    </HackathonTypography>

                    <div className='flex flex-wrap gap-2'>
                      {person.expertise.map((skill, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                          className={`px-4 py-2 text-sm rounded-full ${
                            index % 3 === 0
                              ? 'bg-hedera-blue/10 text-hedera-blue dark:bg-hedera-blue/20 dark:text-blue-300'
                              : index % 3 === 1
                              ? 'bg-hedera-green/10 text-hedera-green dark:bg-hedera-green/20 dark:text-green-300'
                              : 'bg-hedera-purple/10 text-hedera-purple dark:bg-hedera-purple/20 dark:text-purple-300'
                          }`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {person.isAI && (
                  <motion.div
                    className='mt-6 p-4 border border-blue-300/20 dark:border-blue-500/20 rounded-xl bg-gradient-to-r from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className='flex items-center gap-3'>
                      <div className='relative'>
                        <div className='absolute -inset-1 rounded-full bg-blue-500/20 blur-sm animate-pulse'></div>
                        <div className='relative w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center'>
                          <FaBrain className='text-white' />
                        </div>
                      </div>
                      <div>
                        <HackathonTypography variant='subtitle2' color='blue'>
                          AI Assistant
                        </HackathonTypography>
                        <HackathonTypography
                          variant='caption'
                          className='text-hedera-charcoal/80 dark:text-blue-300/80'
                        >
                          Provides specialized technical evaluation and insights
                        </HackathonTypography>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const GlowingButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  color: string;
}> = ({ active, onClick, children, color }) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-8 py-3 rounded-full text-base font-medium transition-all duration-300 ${
        active
          ? `text-white ${
              color === 'purple' ? 'bg-hedera-purple' : 'bg-hedera-green'
            }`
          : 'bg-white/5 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:bg-white/10'
      }`}
    >
      {active && (
        <motion.div
          layoutId='activeTabIndicator'
          className={`absolute inset-0 rounded-full ${
            color === 'purple' ? 'bg-hedera-purple' : 'bg-hedera-green'
          }`}
          initial={false}
          transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
        />
      )}
      <span className='relative z-10'>{children}</span>

      {active && (
        <motion.div
          className='absolute -inset-px rounded-full opacity-50 blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            background: `linear-gradient(to right, ${
              color === 'purple' ? '#8A5CF5' : '#10B981'
            }, transparent)`,
          }}
        />
      )}
    </button>
  );
};

const StaggerGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'
      initial='hidden'
      animate='visible'
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  );
};

const JudgesSection: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<Judge | null>(null);
  const [activeTab, setActiveTab] = useState<'judges' | 'mentors'>('judges');
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className='min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black relative overflow-hidden py-24'
      ref={sectionRef}
    >
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-hedera-purple/5 to-transparent dark:from-hedera-purple/10 dark:to-transparent pointer-events-none'></div>
        <div className='absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-hedera-blue/5 to-transparent dark:from-hedera-blue/10 dark:to-transparent pointer-events-none'></div>
      </div>

      <div className='absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.05)_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:20px_20px] opacity-40 dark:opacity-30 pointer-events-none'></div>

      <div className='absolute -top-64 -left-64 w-[500px] h-[500px] rounded-full bg-hedera-purple/20 dark:bg-hedera-purple/10 blur-3xl opacity-20 dark:opacity-30 animate-blob'></div>
      <div className='absolute -bottom-64 -right-64 w-[500px] h-[500px] rounded-full bg-hedera-blue/20 dark:bg-hedera-blue/10 blur-3xl opacity-20 dark:opacity-30 animate-blob animation-delay-4000'></div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='max-w-4xl mx-auto text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className='inline-block bg-gradient-to-r from-hedera-blue/10 to-hedera-purple/10 dark:from-hedera-blue/20 dark:to-hedera-purple/20 px-4 py-1.5 rounded-full text-sm font-medium text-hedera-green border border-hedera-green/20 mb-6'>
              Expert Advisors
            </span>

            <HackathonTypography
              variant='h1'
              className='text-center bg-gradient-to-r from-[#000000] to-hedera-charcoal dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6'
            >
              Meet Our <span className='text-hedera-green'>Experts</span>
            </HackathonTypography>

            <HackathonTypography
              variant='body1'
              className='text-hedera-charcoal/80 dark:text-hedera-smoke/80 max-w-3xl mx-auto leading-relaxed'
            >
              Our panel of judges and mentors brings together industry experts
              to evaluate your projects and provide valuable guidance throughout
              the hackathon. Connect with leaders in the Hedera ecosystem to
              help you succeed.
            </HackathonTypography>
          </motion.div>

          <motion.div
            className='flex flex-wrap justify-center mt-16 mb-12 gap-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <GlowingButton
              active={activeTab === 'judges'}
              onClick={() => setActiveTab('judges')}
              color='purple'
            >
              Judges
            </GlowingButton>

            <GlowingButton
              active={activeTab === 'mentors'}
              onClick={() => setActiveTab('mentors')}
              color='green'
            >
              Mentors
            </GlowingButton>
          </motion.div>
        </div>

        <AnimatePresence mode='wait'>
          {activeTab === 'judges' ? (
            <motion.div
              key='judges'
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12'>
                {judges.map((judge, index) => (
                  <Person
                    key={index}
                    person={judge}
                    index={index}
                    onClick={() => setSelectedPerson(judge)}
                    isSelected={selectedPerson?.name === judge.name}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key='mentors'
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12'>
                {mentors.map((mentor, index) => (
                  <Person
                    key={index}
                    person={mentor}
                    index={index}
                    onClick={() => setSelectedPerson(mentor)}
                    isSelected={selectedPerson?.name === mentor.name}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedPerson && (
          <SelectedPerson
            person={selectedPerson}
            onClose={() => setSelectedPerson(null)}
          />
        )}
      </div>
    </div>
  );
};

export default JudgesSection;
