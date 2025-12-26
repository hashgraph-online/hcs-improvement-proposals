import React, { useRef } from 'react';
import Layout from '@theme/Layout';
import { motion, useInView } from 'motion/react';
import {
  FaTwitter,
  FaTelegram,
  FaGithub,
  FaLink,
  FaBook,
  FaFileAlt,
  FaGlobe,
  FaCode,
  FaLaptopCode,
} from 'react-icons/fa';
import Typography from '../components/Typography';

type LinkItem = {
  title: string;
  url: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

const links: LinkItem[] = [
  {
    title: 'Hashgraph Online Website',
    url: 'https://hol.org',
    description: 'The main Hashgraph Online website and documentation hub',
    icon: <FaGlobe />,
    color: '#2563eb',
  },
  {
    title: 'Moonscape',
    url: 'https://moonscape.tech',
    description: 'Explore the future of web3 user experience',
    icon: <FaGlobe />,
    color: '#8259ef',
  },
  {
    title: 'Moonscape Labs Twitter',
    url: 'https://x.com/MoonscapeLabs',
    description: 'Follow Moonscape Labs building the new internet',
    icon: <FaTwitter />,
    color: '#1DA1F2',
  },
  {
    title: 'HashgraphOnline Twitter',
    url: 'https://x.com/HashgraphOnline',
    description: 'Stay updated with Hedera ecosystem news',
    icon: <FaTwitter />,
    color: '#1DA1F2',
  },
  {
    title: 'Telegram Community',
    url: 'https://t.me/hashinals',
    description: 'Join our vibrant community',
    icon: <FaTelegram />,
    color: '#0088cc',
  },
  {
    title: 'HCS Standards Documentation',
    url: 'https://hol.org/docs/category/standards',
    description: 'Learn about Hedera Consensus Service Standards',
    icon: <FaBook />,
    color: '#3ec878',
  },
  {
    title: 'GitHub Organization',
    url: 'https://github.com/hashgraph-online',
    description: 'Explore our open source contributions',
    icon: <FaGithub />,
    color: '#333333',
  },
  {
    title: 'Kiloscribe',
    url: 'https://kiloscribe.com',
    description: 'The easiest way to store and retrieve files on-graph',
    icon: <FaFileAlt />,
    color: '#ff6b6b',
  },
  {
    title: 'Standards SDK',
    url: 'https://github.com/hashgraph-online/standards-sdk',
    description: 'Software Development Kit for HCS Standards',
    icon: <FaCode />,
    color: '#6c5ce7',
  },
  {
    title: 'Standards Agent Kit',
    url: 'https://github.com/hashgraph-online/standards-agent-kit',
    description: 'AI Agent Kit for Hedera-powered applications',
    icon: <FaLaptopCode />,
    color: '#e17055',
  },
];

const LinkCard: React.FC<{ link: LinkItem; index: number }> = ({
  link,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

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
      className='group'
    >
      <motion.a
        href={link.url}
        target='_blank'
        rel='noopener noreferrer'
        className='block rounded-xl bg-white dark:bg-gray-800/50 overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm transition-all duration-300'
        whileHover={{ y: -4, x: 0 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className='p-6'>
          <div className='flex items-start gap-4'>
            <div
              className='shrink-0 w-12 h-12 flex items-center justify-center rounded-xl text-white text-xl transform -rotate-6'
              style={{
                background: `linear-gradient(135deg, ${link.color}, ${link.color}CC)`,
                boxShadow: `0 4px 10px ${link.color}33`,
              }}
            >
              {link.icon}
            </div>
            <div className='flex-1 min-w-0'>
              <Typography variant='h4' className='mb-2'>
                {link.title}
              </Typography>
              {link.description && (
                <Typography
                  variant='p'
                  color='secondary'
                  className='line-clamp-2'
                >
                  {link.description}
                </Typography>
              )}
            </div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
};

export default function LinksPage(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <Layout
      title='Hashgraph Online Links'
      description='A collection of useful links to Hashgraph Online resources, tools, and community channels.'
    >
      <div className='min-h-screen relative overflow-hidden'>
        <div className='absolute inset-0 z-0 overflow-hidden'>
          <div className='absolute -top-40 -right-40 w-80 h-80 bg-[#3ec878]/5 dark:bg-[#3ec878]/10 rounded-full blur-3xl'></div>
          <div className='absolute -bottom-20 -left-20 w-60 h-60 bg-[#8259ef]/5 dark:bg-[#8259ef]/10 rounded-full blur-3xl'></div>
        </div>

        <div className='container mx-auto px-6 py-20 relative z-10'>
          <div className='max-w-4xl mx-auto'>
            <motion.div
              ref={sectionRef}
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
                  <FaLink />
                </div>
              </div>

              <Typography
                variant='h1'
                className='text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878] font-styrene'
              >
                Hashgraph Online Links
              </Typography>
              <div className='h-1 w-40 bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878] mx-auto mb-6'></div>

              <Typography variant='p' className='max-w-2xl mx-auto'>
                Explore the Hashgraph Online ecosystem through these useful
                resources and community channels.
              </Typography>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {links.map((link, index) => (
                <LinkCard key={link.url} link={link} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className='mt-16 text-center'
            >
              <Typography variant='p' color='secondary'>
                © {new Date().getFullYear()} Hashgraph Online DAO LLC
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
