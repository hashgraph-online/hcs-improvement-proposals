import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import HackathonTypography from './HackathonTypography';

const VideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className='py-16 sm:py-20 relative bg-white dark:bg-gray-950 overflow-hidden'
      id='featured-video'
    >
      <div className='absolute inset-0 z-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-hedera-purple/5 dark:bg-hedera-purple/10 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-20 -left-20 w-60 h-60 bg-hedera-blue/5 dark:bg-hedera-blue/10 rounded-full blur-3xl'></div>
      </div>

      <div className='container mx-auto px-4 sm:px-6 relative z-10'>
        <div className='max-w-5xl mx-auto'>
          <motion.div
            className='text-center mb-12'
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <HackathonTypography
              variant='h2'
              className='mb-4 font-styrene text-black dark:text-white'
              underline={true}
              underlineColor='gradient'
            >
              Hackathon Overview
            </HackathonTypography>

            <HackathonTypography
              variant='body1'
              className='mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-300'
              align='center'
            >
              Prefer a video? Turn up your volume and hit play.
            </HackathonTypography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className='rounded-2xl overflow-hidden relative bg-gradient-to-r p-[2px] from-hedera-purple via-hedera-blue to-hedera-green shadow-xl'
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
                  src='https://www.canva.com/design/DAGiYoKKzBo/rjZ8jv1Wt6RhxVYIP2VtQg/watch?embed'
                  allowFullScreen={true}
                  allow='fullscreen'
                  title='Hedera OpenConvAI Hackathon Overview'
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
