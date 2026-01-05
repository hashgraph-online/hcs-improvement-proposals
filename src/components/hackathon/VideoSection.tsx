import React, { useRef } from 'react';
import HackathonTypography from './HackathonTypography';

const VideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = true;

  return (
    <section
      ref={sectionRef}
      className='py-8 sm:py-12 relative bg-white dark:bg-gray-950 overflow-hidden'
      id='featured-video'
    >
      <div className='absolute inset-0 z-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-hedera-purple/5 dark:bg-hedera-purple/10 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-20 -left-20 w-60 h-60 bg-hedera-blue/5 dark:bg-hedera-blue/10 rounded-full blur-3xl'></div>
      </div>

      <div className='container mx-auto px-3 sm:px-4 relative z-10'>
        <div className='max-w-5xl mx-auto'>
          <div
            className='text-center mb-8'
          >
            <HackathonTypography
              variant='h2'
              className='mb-3 font-styrene text-black dark:text-white'
              underline={true}
              underlineColor='gradient'
            >
              Hackathon Overview
            </HackathonTypography>

            <HackathonTypography
              variant='body1'
              className='mt-3 max-w-3xl mx-auto text-gray-600 dark:text-gray-300'
              align='center'
            >
              Prefer a video? Turn up your volume and hit play.
            </HackathonTypography>
          </div>

          <div
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
