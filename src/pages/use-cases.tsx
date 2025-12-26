import React, { useRef } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion, useInView } from 'motion/react';
import Link from '@docusaurus/Link';
import TransformCard from '../components/ui/TransformCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

interface UseCase {
  name: string;
  description: string;
  image: string;
  color: string;
  link: string;
  creator: string;
  tagline: string;
}

export const useCases: UseCase[] = [
  {
    name: 'Moonscape',
    description:
      'Moonscape is a portal implementing OpenConvAI. Find, Connect and talk with AI agents on Hedera.',
    image: '/use-cases/moonscape-portal.webp',
    color: '#e17000',
    link: 'https://moonscape.tech',
    creator: 'Moonscape',
    tagline: 'Decentralized AI Agents on Hedera',
  },
  {
    name: 'LinkPages',
    description:
      'LinkPages enable you to create a decentralized link in bio page on-graph through the Hashgraph Online standards. It is developed and operated by KiloScribe',
    image: '/use-cases/link-page-use-case.webp',
    color: '#8fe6a4',
    link: 'https://kiloscribe.com',
    creator: 'KiloScribe',
    tagline: 'Building the future of decentralized personal pages on Hedera.',
  },
  {
    name: 'Bonzo Points',
    description:
      'Bonzo Finance operates a transparent points leaderboard for their Aave-based lending protocol on Hedera, built using the HCS-20 standard. Users can earn and track points through lending and borrowing activities, with all data being fully verifiable on-chain through the Hedera Consensus Service.',
    image: '/use-cases/bonzo.webp',
    color: '#66A3FF',
    link: 'https://bonzo.finance',
    creator: 'Bonzo Finance',
    tagline:
      'Revolutionizing DeFi incentives through transparent, on-chain rewards.',
  },
  {
    name: 'HashPack Wallet',
    description:
      'HashPack renders Hashinals inside the wallet, enabling users and creators to interact with this innovative standard, view files, and see inscription numbers.',
    image: '/use-cases/hashpack-u.webp',
    color: '#4ECDC4',
    link: 'https://www.hashpack.app/',
    creator: 'HashPack',
    tagline: 'Bringing Hashinals to life with seamless wallet integration.',
  },
  {
    name: 'SentX',
    description:
      'SentX is the leading marketplace on Hedera, enabling users to buy, sell, and discover Hashinals.',
    image: '/use-cases/sentx.webp',
    color: '#4B0082',
    link: 'https://sentx.io',
    creator: 'SentX',
    tagline:
      'Powering the premier marketplace for Hedera digital collectibles.',
  },
  {
    name: 'Hashinals.com',
    description:
      'Hashinals.com is a platform for viewing and search Hashinal Inscription Numbers, built by Turtlemoon.',
    image: '/use-cases/hashinals.webp',
    color: '#00000',
    link: 'https://hashinals.com/',
    creator: 'Turtlemoon',
    tagline: 'Making Hashinal discovery and tracking accessible to everyone.',
  },
  {
    name: 'Tashi Place',
    description:
      'Tashi is the "Forever Game" protocol, building technology that enables strictly peer-to-peer multiplayer gaming. We\'re building an SDK to be used with hashinals to enable in-browser multiplayer games without ever having to host a server. Our proof of concept is a game called Tashi Place, which is a multiplayer pixel art game.',
    image: '/use-cases/tashi.webp',
    color: '#6B66FF',
    link: 'https://tashi.gg',
    creator: 'Tashi',
    tagline: 'Pioneering serverless multiplayer gaming on Hedera.',
  },
  {
    name: 'Sketchverse',
    description:
      "Sketchverse is Hedera's first experimentalon-graph metaverse built on Hedera, utilizing Hashinals. Sketchverse includes 300 plots of land, 3D assets and a growing community.",
    image: '/use-cases/sketchverse.webp',
    color: '#FFD700',
    link: 'https://blankpaper-rust.vercel.app/',
    creator: 'BlankPaper',
    tagline:
      'Empowering artists to showcase their digital creations on Hedera.',
  },
   {
    name: 'HGrimoire',
    description:
      "HGrimoire is wallet-like explorer, tool suite, and Hashinal Grims portal built on Hedera.",
    image: '/use-cases/hgrimoire.webp',
    color: '#181817ff',
    link: 'https://grimterminal.app/',
    creator: 'Hashinal Grims',
    tagline:
      'Seek, and the chapters shall unfold.',
  },
];

const UseCaseCard: React.FC<{ useCase: UseCase; index: number }> = ({
  useCase,
  index,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className='w-full'
    >
      <TransformCard className='p-6 md:p-8 h-full' shadow='xl'>
        <div className='flex flex-col lg:flex-row gap-6 items-start'>
          <div className='lg:w-1/3'>
            <img
              src={useCase.image}
              alt={useCase.name}
              className='w-full h-48 md:h-64 object-cover rounded-lg shadow-md'
            />
          </div>

          <div className='lg:w-2/3 flex flex-col justify-between h-full'>
            <div>
              <div className='flex items-center gap-3 mb-4'>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 rounded-full bg-brand-blue'></div>
                  <span className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                    Created by {useCase.creator}
                  </span>
                </div>
              </div>

              <h3 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4'>
                {useCase.name}
              </h3>

              <p className='text-gray-600 dark:text-gray-400 mb-4 leading-relaxed'>
                {useCase.description}
              </p>

              <p className='text-lg text-brand-blue font-medium mb-6'>
                {useCase.tagline}
              </p>
            </div>

            <div className='flex gap-3'>
              <PrimaryButton href={useCase.link}>
                Explore {useCase.name}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </TransformCard>
    </motion.div>
  );
};

const UseCasesPage: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Use Cases | ${siteConfig.title}`}
      description='Discover groundbreaking applications of Hashgraph Online standards'
    >
      {/* Hero Section */}
      <div className='py-20 md:py-32 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6'>
                Hashgraph in{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple'>
                  Action
                </span>
              </h1>
              <p className='text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto'>
                Witness how companies are leveraging Hashgraph Online standards
                to shape the future of decentralized technology.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Use Cases Grid */}
      <div id='use-cases' className='py-20 bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-4 md:px-6'>

          <div className='grid grid-cols-1 gap-8 max-w-6xl mx-auto'>
            {useCases.map((useCase, index) => (
              <UseCaseCard key={index} useCase={useCase} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='py-20 bg-gray-50 dark:bg-gray-800'>
        <div className='container mx-auto px-4 md:px-6 text-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='max-w-4xl mx-auto'
          >
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6'>
              Ready to Build Your Use Case?
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto'>
              Join the growing ecosystem of developers and companies building
              the future with Hashgraph Online standards.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <PrimaryButton href='/docs'>View Documentation</PrimaryButton>
              <SecondaryButton href='https://t.me/hashinals'>
                Join Community
              </SecondaryButton>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default UseCasesPage;
