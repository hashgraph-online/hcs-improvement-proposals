import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import {
  StatusBadge,
  TransformCard,
  AnimatedBackground,
  Terminal,
  Typography,
} from '../components/ui';
import { 
  FiAward, 
  FiTwitter, 
  FiMic, 
  FiClock, 
  FiUsers, 
  FiGift,
  FiZap,
  FiStar,
  FiCalendar,
  FiDollarSign,
  FiWifi,
  FiVolume2,
  FiBookOpen,
  FiCheck,
  FiTarget,
  FiUserPlus,
  FiRepeat,
} from 'react-icons/fi';

/**
 * Countdown timer hook for tracking time until next giveaway
 */
const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

/**
 * Hero section with animated elements and countdown
 */
const HeroSection: React.FC = () => {
  // Get next Thursday at 2 PM EST
  const getNextThursday = () => {
    const now = new Date();
    const nextThursday = new Date();
    const daysUntilThursday = (4 - now.getDay() + 7) % 7 || 7; // 4 = Thursday
    nextThursday.setDate(now.getDate() + daysUntilThursday);
    nextThursday.setHours(14, 0, 0, 0); // 2 PM EST
    return nextThursday;
  };

  const countdown = useCountdown(getNextThursday());
  const [pulseColors, setPulseColors] = useState(['brand-blue', 'brand-purple', 'brand-green']);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseColors(prev => [prev[1], prev[2], prev[0]]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='relative min-h-screen bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-950/50 overflow-hidden'>
      <AnimatedBackground
        variant='blobs'
        colors={pulseColors}
        intensity='high'
        opacity={0.2}
      />

      {/* Floating prize icons */}
      <div className='absolute inset-0 pointer-events-none'>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute text-brand-purple/20 dark:text-brand-purple/30'
            style={{
              left: `${10 + i * 10}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          >
            {i % 4 === 0 && <FiAward size={24} />}
            {i % 4 === 1 && <FiGift size={24} />}
            {i % 4 === 2 && <FiStar size={24} />}
            {i % 4 === 3 && <FiZap size={24} />}
          </motion.div>
        ))}
      </div>

      <div className='relative z-10 container mx-auto px-6 lg:px-8 min-h-screen'>
        <div className='grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20'>
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className='space-y-6'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <StatusBadge variant='success' animated className='mb-4'>
                  <FiZap className='inline mr-1' size={14} />
                  WEEKLY GIVEAWAY
                </StatusBadge>
              </motion.div>

              <Typography
                variant='h1'
                className='text-4xl lg:text-5xl xl:text-6xl font-mono font-black leading-tight tracking-tight'
              >
                <span className='text-gray-900 dark:text-white'>Hedera x AI </span>
                <Typography
                  variant='h1'
                  gradient='brand'
                  as='span'
                  className='inline-block'
                  noDefaultSize
                >
                  Pitch Competition_
                </Typography>
              </Typography>

              <Typography
                color='muted'
                className='text-lg lg:text-xl leading-relaxed max-w-2xl'
              >
                Join our weekly X Spaces every{' '}
                <Typography
                  color='blue'
                  as='span'
                  className='font-semibold text-brand-blue'
                >
                  Thursday at 2 PM EST
                </Typography>{' '}
                for pitch competitions, community discussions, and weekly giveaways!
                <br />
                <Typography color='purple' className='text-brand-purple font-bold'>
                  🏆 Weekly prizes • Live pitch competition • Community voting
                </Typography>
              </Typography>

              <div className='flex flex-col sm:flex-row gap-4'>
                <PrimaryButton 
                  href='https://twitter.com/i/spaces/1YqKDqVNEEVsV'
                  className='flex items-center gap-2'
                >
                  <FiTwitter />
                  Join Next Space →
                </PrimaryButton>
                <SecondaryButton 
                  href='#rules'
                  className='flex items-center gap-2'
                >
                  <FiBookOpen />
                  Competition Rules
                </SecondaryButton>
              </div>
            </div>
          </motion.div>

          {/* Countdown and Next Event Card */}
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TransformCard
              rotation='rotate-[2deg]'
              background='bg-gradient-to-br from-brand-blue/10 via-brand-purple/10 to-brand-green/10 dark:from-brand-blue/20 dark:via-brand-purple/20 dark:to-brand-green/20'
              border='border-2 border-brand-blue/30'
              shadow='xl'
              rounded='3xl'
              className='p-8 backdrop-blur-sm relative overflow-hidden'
            >
              {/* Animated background effect */}
              <div className='absolute inset-0 bg-gradient-to-r from-brand-blue/5 via-brand-purple/5 to-brand-green/5 animate-shimmer'></div>
              
              <div className='relative z-10 space-y-6'>
                <div className='flex items-center gap-3 mb-4'>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <FiClock className='text-brand-purple' size={24} />
                  </motion.div>
                  <Typography variant='h3' className='text-xl font-black text-gray-900 dark:text-white'>
                    Next Competition
                  </Typography>
                </div>

                <div className='grid grid-cols-4 gap-4'>
                  {[
                    { label: 'Days', value: countdown.days },
                    { label: 'Hours', value: countdown.hours },
                    { label: 'Min', value: countdown.minutes },
                    { label: 'Sec', value: countdown.seconds },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className='text-center'
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    >
                      <div className='bg-white/80 dark:bg-gray-800/80 rounded-xl p-3 border border-brand-blue/20'>
                        <div className='text-2xl font-mono font-black text-brand-blue'>
                          {item.value.toString().padStart(2, '0')}
                        </div>
                        <div className='text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide'>
                          {item.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className='space-y-3 pt-4 border-t border-brand-blue/20'>
                  <div className='flex items-center gap-2 text-sm'>
                    <FiCalendar className='text-brand-green' />
                    <span className='text-gray-700 dark:text-gray-300'>Every Thursday, 2 PM EST</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm'>
                    <FiDollarSign className='text-brand-purple' />
                    <span className='text-gray-700 dark:text-gray-300'>Weekly prizes up to $500</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm'>
                    <FiUsers className='text-brand-blue' />
                    <span className='text-gray-700 dark:text-gray-300'>Community + Expert Judges</span>
                  </div>
                </div>
              </div>
            </TransformCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/**
 * How to participate section with step-by-step guide
 */
const HowToParticipateSection: React.FC = () => {
  const steps = [
    {
      icon: <FiUserPlus className='text-brand-blue' size={24} />,
      title: 'Follow @HashgraphOnline',
      description: 'Follow @HashgraphOnline on X (Twitter) to stay updated on all giveaways and announcements',
      action: 'Click follow on X',
    },
    {
      icon: <FiRepeat className='text-brand-purple' size={24} />,
      title: 'Retweet Announcement',
      description: 'Retweet the announcement post for the space and giveaway to help spread the word',
      action: 'Share with community',
    },
    {
      icon: <FiMic className='text-brand-green' size={24} />,
      title: 'Join & Pitch',
      description: 'Join the X Space every Thursday at 2 PM EST, request to speak when the pitch competition opens, and deliver your 30-second AI + Hedera pitch',
      action: 'Join, speak, pitch!',
    },
    {
      icon: <FiAward className='text-brand-blue' size={24} />,
      title: 'Community Votes',
      description: 'Listeners vote for their favorite pitches, winners announced before next Thursday\'s space',
      action: 'Win prizes!',
    },
  ];

  return (
    <section className='relative py-20 lg:py-32 bg-white dark:bg-gray-900 overflow-hidden'>
      <AnimatedBackground
        variant='lines'
        colors={['brand-blue', 'brand-purple', 'brand-green']}
        opacity={0.1}
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-16'>
          <Typography
            variant='h2'
            className='text-4xl lg:text-5xl font-mono font-black text-gray-900 dark:text-white mb-4'
          >
            How to{' '}
            <Typography
              variant='h2'
              gradient='brand'
              as='span'
              className='inline-block'
              noDefaultSize
            >
              Participate_
            </Typography>
          </Typography>
          <Typography
            color='muted'
            className='text-lg max-w-2xl mx-auto'
          >
            Four simple steps to join our weekly pitch competition and win amazing prizes
          </Typography>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TransformCard
                rotation={`rotate-[${index % 2 === 0 ? '' : '-'}${0.5 + index * 0.3}deg]`}
                background='bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900'
                border='border border-gray-200 dark:border-gray-700'
                shadow='lg'
                rounded='2xl'
                className='p-6 h-full hover:scale-105 transition-all duration-500 group'
              >
                <div className='space-y-4'>
                  <div className='flex items-center gap-3'>
                    <motion.div
                      className='p-3 rounded-xl bg-gradient-to-r from-brand-blue/10 to-brand-purple/10'
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {step.icon}
                    </motion.div>
                    <div className='text-2xl font-mono font-black text-brand-purple'>
                      0{index + 1}
                    </div>
                  </div>

                  <Typography
                    variant='h4'
                    className='text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-blue transition-colors'
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    color='muted'
                    className='text-sm leading-relaxed'
                  >
                    {step.description}
                  </Typography>

                  <div className='pt-2 border-t border-gray-200 dark:border-gray-700'>
                    <Typography
                      color='purple'
                      className='text-sm font-semibold'
                    >
                      → {step.action}
                    </Typography>
                  </div>
                </div>
              </TransformCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Rules and tips section with important guidelines
 */
const RulesAndTipsSection: React.FC = () => {
  const rules = [
    {
      icon: <FiClock className='text-brand-blue' />,
      title: '30-Second Time Limit',
      description: 'Keep your pitch concise and impactful. Practice beforehand!',
      type: 'rule' as const,
    },
    {
      icon: <FiWifi className='text-brand-green' />,
      title: 'Stable Internet Connection',
      description: 'Ensure you have reliable wifi and audio quality',
      type: 'rule' as const,
    },
    {
      icon: <FiBookOpen className='text-brand-purple' />,
      title: 'Read Competition Rules',
      description: 'Familiarize yourself with all guidelines before participating',
      type: 'rule' as const,
    },
    {
      icon: <FiVolume2 className='text-brand-blue' />,
      title: 'Clear Audio Quality',
      description: 'Use headphones or a good microphone for best results',
      type: 'rule' as const,
    },
    {
      icon: <FiTarget className='text-brand-green' />,
      title: 'Focus on Hedera + AI',
      description: 'Your pitch should clearly connect Hedera technology with AI',
      type: 'tip' as const,
    },
    {
      icon: <FiStar className='text-brand-purple' />,
      title: 'Mention Our Sponsors',
      description: 'Acknowledge our amazing sponsors and partners in your pitch',
      type: 'tip' as const,
    },
  ];

  const rulesItems = rules.filter(item => item.type === 'rule');
  const tipsItems = rules.filter(item => item.type === 'tip');

  return (
    <section id='rules' className='relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden'>
      <AnimatedBackground
        variant='blobs'
        colors={['brand-blue', 'brand-green', 'brand-purple']}
        intensity='low'
        opacity={0.1}
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-16'>
          <Typography
            variant='h2'
            className='text-4xl lg:text-5xl font-mono font-black text-gray-900 dark:text-white mb-4'
          >
            Rules &{' '}
            <Typography
              variant='h2'
              gradient='brand'
              as='span'
              className='inline-block'
              noDefaultSize
            >
              Tips_
            </Typography>
          </Typography>
          <Typography
            color='muted'
            className='text-lg max-w-2xl mx-auto'
          >
            Essential guidelines and pro tips to help you succeed in our pitch competition
          </Typography>
        </div>

        <div className='grid lg:grid-cols-2 gap-16'>
          {/* Rules Section */}
          <div>
            <div className='flex items-center gap-3 mb-8'>
              <FiCheck className='text-brand-blue' size={24} />
              <Typography
                variant='h3'
                className='text-2xl font-bold text-gray-900 dark:text-white'
              >
                Competition Rules
              </Typography>
            </div>
            
            <div className='space-y-4'>
              {rulesItems.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='flex items-start gap-4 p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-brand-blue/50 transition-colors'
                >
                  <div className='p-2 rounded-lg bg-gradient-to-r from-brand-blue/10 to-brand-purple/10'>
                    {rule.icon}
                  </div>
                  <div>
                    <Typography
                      variant='h5'
                      className='font-bold text-gray-900 dark:text-white mb-1'
                    >
                      {rule.title}
                    </Typography>
                    <Typography
                      color='muted'
                      className='text-sm'
                    >
                      {rule.description}
                    </Typography>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div>
            <div className='flex items-center gap-3 mb-8'>
              <FiZap className='text-brand-green' size={24} />
              <Typography
                variant='h3'
                className='text-2xl font-bold text-gray-900 dark:text-white'
              >
                Pro Tips
              </Typography>
            </div>
            
            <div className='space-y-4'>
              {tipsItems.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='flex items-start gap-4 p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-brand-green/50 transition-colors'
                >
                  <div className='p-2 rounded-lg bg-gradient-to-r from-brand-green/10 to-brand-purple/10'>
                    {tip.icon}
                  </div>
                  <div>
                    <Typography
                      variant='h5'
                      className='font-bold text-gray-900 dark:text-white mb-1'
                    >
                      {tip.title}
                    </Typography>
                    <Typography
                      color='muted'
                      className='text-sm'
                    >
                      {tip.description}
                    </Typography>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal with example pitch */}
        <div className='mt-16'>
          <div className='text-center mb-8'>
            <Typography
              variant='h3'
              className='text-2xl font-bold text-gray-900 dark:text-white mb-2'
            >
              Example Winning Pitch
            </Typography>
            <Typography
              color='muted'
              className='text-sm'
            >
              Here's what a great 30-second pitch looks like
            </Typography>
          </div>
          
          <Terminal title='winning-pitch.sh' className='max-w-4xl mx-auto'>
            <Terminal.Line output='#!/bin/bash' type='comment' />
            <Terminal.Line output='# 30-second pitch example' type='comment' />
            <Terminal.Line output='' type='output' />
            <Terminal.Line command='./deliver-pitch --time=30s --topic="hedera-ai"' />
            <Terminal.Line
              output={`🎤 "Hi everyone! I'm building AgentSwarm - an AI agent marketplace`}
              type='output'
            />
            <Terminal.Line
              output='    built entirely on Hedera Consensus Service using HCS-10 standards.'
              type='output'
            />
            <Terminal.Line
              output='    Agents can discover, communicate, and transact autonomously'
              type='output'
            />
            <Terminal.Line
              output='    while maintaining full transparency and auditability.'
              type='output'
            />
            <Terminal.Line
              output='    Special thanks to our sponsors HashPack and Bonzo Finance'
              type='output'
            />
            <Terminal.Line
              output={`    for making this innovation possible. Thank you!"`}
              type='output'
            />
            <Terminal.Line output='' type='output' />
            <Terminal.Line
              output='✅ RESULT: Clear value prop + Hedera integration + Sponsor mention'
              type='output'
            />
            <Terminal.Line
              output='🏆 STATUS: Winner of $500 weekly prize!'
              type='output'
            />
          </Terminal>
        </div>
      </div>
    </section>
  );
};

/**
 * Call to action section with links to participate
 */
const CallToActionSection: React.FC = () => {
  return (
    <section className='relative py-20 lg:py-32 bg-gradient-to-br from-brand-blue/10 via-brand-purple/10 to-brand-green/10 dark:from-brand-blue/20 dark:via-brand-purple/20 dark:to-brand-green/20 overflow-hidden'>
      <AnimatedBackground
        variant='blobs'
        colors={['brand-blue', 'brand-purple', 'brand-green']}
        intensity='high'
        opacity={0.15}
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center'>
          <div className='relative group max-w-4xl mx-auto'>
            <div className='absolute -inset-4 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse'></div>
            
            <div className='relative bg-white/95 dark:bg-gray-900/95 border border-brand-blue/30 shadow-2xl rounded-3xl p-12 backdrop-blur-sm'>
              <motion.div
                className='space-y-8'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className='flex justify-center mb-6'>
                  <motion.div
                    animate={{ 
                      rotateY: [0, 360],
                      scale: [1, 1.1, 1] 
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <FiAward className='text-brand-purple' size={64} />
                  </motion.div>
                </div>

                <Typography
                  variant='h2'
                  className='text-4xl lg:text-5xl font-mono font-black mb-6'
                >
                  <span className='text-gray-900 dark:text-white'>Ready to</span>
                  <br />
                  <Typography
                    variant='h2'
                    gradient='brand'
                    as='span'
                    className='inline-block'
                    noDefaultSize
                  >
                    Win Big?_
                  </Typography>
                </Typography>

                <Typography
                  color='muted'
                  className='text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed'
                >
                  Join hundreds of innovators every Thursday for our weekly Hedera x AI pitch competition.
                  <br />
                  <Typography color='purple' as='span' className='font-bold text-brand-purple'>
                    Follow @HashgraphOnline • Retweet announcements • Weekly prizes
                  </Typography>
                </Typography>

                <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
                  <PrimaryButton
                    href='https://twitter.com/HashgraphOnline'
                    className='text-lg py-4 px-8 font-black flex items-center gap-2 shadow-2xl hover:scale-110 transform transition-all duration-300'
                  >
                    <FiUserPlus />
                    Follow @HashgraphOnline →
                  </PrimaryButton>
                  
                  <SecondaryButton
                    href='https://twitter.com/i/spaces/1YqKDqVNEEVsV'
                    className='text-lg py-4 px-8 font-bold border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/10 flex items-center gap-2 transform hover:scale-105 transition-all duration-300'
                  >
                    <FiTwitter />
                    Join Weekly Spaces
                  </SecondaryButton>
                </div>

                <div className='pt-8 border-t border-gray-200 dark:border-gray-700'>
                  <Typography
                    color='muted'
                    className='text-sm'
                  >
                    <strong>Next Competition:</strong> Every Thursday at 2 PM EST • 
                    <Typography color='green' as='span' className='ml-1 font-semibold text-brand-green'>
                      Open to all skill levels
                    </Typography>
                  </Typography>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Main Giveaway page component
 */
const GiveawayPage: React.FC = () => {
  return (
    <Layout
      title='Weekly Hedera x AI Giveaway | Pitch Competition'
      description='Join our weekly X Spaces every Thursday at 2 PM EST for Hedera x AI pitch competitions, community discussions, and amazing giveaways. Win up to $500 weekly!'
    >
      <main>
        <HeroSection />
        <HowToParticipateSection />
        <RulesAndTipsSection />
        <CallToActionSection />
      </main>
    </Layout>
  );
};

export default GiveawayPage;