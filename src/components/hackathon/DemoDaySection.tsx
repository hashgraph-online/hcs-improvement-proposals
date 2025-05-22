import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaTrophy, FaVideo, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import HackathonTypography from './HackathonTypography';
import PrimaryButton from './PrimaryButton';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
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

      <div className='mt-5 mb-3'>
        <HackathonTypography variant='h4' className='text-xl'>
          {title}
        </HackathonTypography>
      </div>

      <HackathonTypography variant='body1' color='muted' className='font-light'>
        {description}
      </HackathonTypography>
    </motion.div>
  );
};

const DemoDaySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const features = [
    {
      icon: <FaTrophy />,
      title: 'Final Judging (15% of Score)',
      description:
        'Your Demo Day pitch accounts for 15% of your total score. Make it count with a compelling presentation of your project.',
    },
    {
      icon: <FaVideo />,
      title: 'Project Showcases',
      description:
        'Top teams will present their projects to the community and demonstrate their innovative solutions in live presentations.',
    },
    {
      icon: <FaCalendarAlt />,
      title: 'May 20th, 2025',
      description:
        'Mark your calendar for this exciting culmination of the Hedera OpenConvAI Hackathon journey.',
    },
    {
      icon: <FaUsers />,
      title: 'Visibility & Exposure',
      description:
        'Gain valuable exposure for your project with potential partners, investors, and the broader Hedera ecosystem.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className='py-16 sm:py-24 relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 overflow-hidden'
    >
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
                <FaVideo />
              </div>
            </div>

            <HackathonTypography
              variant='h1'
              className='bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878] mb-4'
              underline={true}
              underlineColor='gradient'
            >
              Demo Day
            </HackathonTypography>

            <HackathonTypography
              variant='body1'
              className='mt-6 max-w-3xl mx-auto text-gray-600 dark:text-gray-300'
              align='center'
            >
              Demo Day is a crucial part of the hackathon process. It's your
              opportunity to showcase your work and complete the final 15% of
              your project evaluation. Present your solution to judges, mentors,
              and the community while gaining valuable exposure for your
              project.
            </HackathonTypography>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mb-20'>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>

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
                  title='Hedera OpenConvAI Hackathon Demo Day'
                ></iframe>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className='mt-12 text-center'
          >
            <PrimaryButton href='/demo-day' size='lg'>
              Learn More About Demo Day
            </PrimaryButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoDaySection;
