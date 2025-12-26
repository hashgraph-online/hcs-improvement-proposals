import React from 'react';
import { motion } from 'motion/react';
import { FiAward } from 'react-icons/fi';
import { Typography, GradientText } from '../ui';

interface Sponsor {
  name: string;
  logo: string;
  logoDark?: string;
  url: string;
}

const sponsors: Sponsor[] = [
  {
    name: 'HashPack',
    logo: '/logo_icons/Hashpack.png',
    url: 'https://hashpack.app',
  },
  {
    name: 'Hgraph',
    logo: '/logo_icons/HGRAPH.png',
    logoDark: '/logo_icons/HGraph_Dark.png',
    url: 'https://hgraph.com',
  },
  {
    name: 'SentX',
    logo: '/logo_icons/SentX.png',
    logoDark: '/logo_icons/SentX_Dark.png',
    url: 'https://sentx.io',
  },
  {
    name: 'Turtlemoon',
    logo: '/logo_icons/Turtlemoon.png',
    url: 'https://turtlemoon.io',
  },
];

const HAHSponsorsSection: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    const checkDarkMode = () => {
      const isDark =
        document.documentElement.classList.contains('dark') ||
        document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className='relative py-20 lg:py-24 overflow-hidden bg-white dark:bg-gray-900'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'
          >
            <div className='inline-flex items-center gap-2 mb-6 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full'>
              <FiAward className='w-4 h-4 text-purple-600 dark:text-purple-400' />
              <Typography className='text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-[0.3em] m-0'>
                Event Sponsors
              </Typography>
            </div>

            <Typography
              variant='h2'
              className='text-4xl lg:text-5xl font-mono font-black text-gray-900 dark:text-white mb-6'
            >
              Powered by{' '}
              <GradientText gradient='purple' as='span'>
                DAO Members
              </GradientText>
            </Typography>

            <Typography
              color='muted'
              className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'
            >
              Our consortium members are proud sponsors of the AI Track at
              Hedera Africa Hackathon
            </Typography>
          </motion.div>

          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
            {sponsors.map((sponsor, index) => (
              <motion.a
                key={sponsor.name}
                href={sponsor.url}
                target='_blank'
                rel='noopener noreferrer'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='group relative bg-gray-50 dark:bg-gray-800 rounded-xl p-6 lg:p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-600/0 group-hover:from-purple-500/5 group-hover:to-purple-600/5 rounded-xl transition-all duration-300' />

                <div className='relative flex items-center justify-center h-20 lg:h-24'>
                  <img
                    src={
                      isDarkMode && sponsor.logoDark
                        ? sponsor.logoDark
                        : sponsor.logo
                    }
                    alt={sponsor.name}
                    className='max-h-full max-w-full object-contain filter group-hover:brightness-110 transition-all duration-300'
                  />
                </div>

                <Typography className='text-center mt-4 text-sm font-mono text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300'>
                  {sponsor.name}
                </Typography>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HAHSponsorsSection;
