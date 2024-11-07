import React, { useRef } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from '@docusaurus/Link';

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
    name: 'LinkPages',
    description:
      'LinkPages enable you to create a decentralized link in bio page on-graph through the Hashgraph Online standards. It is developed and operated by KiloScribe',
    image: '/use-cases/link-page-use-case.jpeg',
    color: '#8fe6a4',
    link: 'https://kiloscribe.com',
    creator: 'KiloScribe',
    tagline: 'Building the future of decentralized personal pages on Hedera.',
  },
  {
    name: 'Bonzo Points',
    description:
      'Bonzo Finance operates a transparent points leaderboard for their Aave-based lending protocol on Hedera, built using the HCS-20 standard. Users can earn and track points through lending and borrowing activities, with all data being fully verifiable on-chain through the Hedera Consensus Service.',
    image: '/use-cases/bonzo.png',
    color: '#66A3FF',
    link: 'https://bonzo.finance',
    creator: 'Bonzo Finance',
    tagline: 'Revolutionizing DeFi incentives through transparent, on-chain rewards.',
  },
  {
    name: 'HashPack Wallet',
    description:
    'HashPack renders Hashinals inside the wallet, enabling users and creators to interact with this innovative standard, view files, and see inscription numbers.',
    image: '/use-cases/hashpack-u.png',
    color: '#4ECDC4',
    link: 'https://www.hashpack.app/',
    creator: 'HashPack',
    tagline: 'Bringing Hashinals to life with seamless wallet integration.',
  },
  {
    name: 'SentX',
    description:
      'SentX is the leading marketplace on Hedera, enabling users to buy, sell, and discover Hashinals.',
    image: '/use-cases/sentx.png',
    color: '#4B0082',
    link: 'https://sentx.io',
    creator: 'SentX',
    tagline: 'Powering the premier marketplace for Hedera digital collectibles.',
  },
  {
    name: 'Hashgate HCS-20 API',
    description:
      'Hashgate is an all-in-one payments solution on Hedera. They created an API to easily retrieve HCS-20 points, utilized by HashPack Wallet and Bonzo Finance.',
    image: '/use-cases/hashgate.jpg',
    color: '#4ECDC4',
    link: 'https://www.hashgate.io/',
    creator: 'Hashgate',
    tagline: 'Simplifying HCS-20 integration for developers across Hedera.',
  },
  {
    name: 'Hashinals.com',
    description:
      'Hashinals.com is a platform for viewing and search Hashinal Inscription Numbers, built by Turtlemoon.',
    image: '/use-cases/hashinals.png',
    color: '#00000',
    link: 'https://hashinals.com/',
    creator: 'Turtlemoon',
    tagline: 'Making Hashinal discovery and tracking accessible to everyone.',
  },
  {
    name: 'Tashi Place',
    description:
      'Tashi is the "Forever Game" protocol, building technology that enables strictly peer-to-peer multiplayer gaming. We\'re building an SDK to be used with hashinals to enable in-browser multiplayer games without ever having to host a server. Our proof of concept is a game called Tashi Place, which is a multiplayer pixel art game.',
    image: '/use-cases/tashi.png',
    color: '#6B66FF',
    link: 'https://tashi.gg',
    creator: 'Tashi',
    tagline: 'Pioneering serverless multiplayer gaming on Hedera.',
  },
  {
    name: "Sketchverse",
    description: "Sketchverse is Hedera's first experimentalon-graph metaverse built on Hedera, utilizing Hashinals. Sketchverse includes 300 plots of land, 3D assets and a growing community.",
    image: "/use-cases/sketchverse.jpeg",
    color: "#FFD700",
    link: "https://blankpaper-rust.vercel.app/",
    creator: "BlankPaper",
    tagline: "Empowering artists to showcase their digital creations on Hedera.",
  }
];

const UseCaseSection: React.FC<{ useCase: UseCase; index: number }> = ({
  useCase,
  index,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      id={`use-case-${index}`}
      className='min-h-screen flex items-center justify-center py-10 md:py-20 relative overflow-hidden'
      style={{
        background: `linear-gradient(45deg, ${useCase.color}, ${useCase.color}88)`,
      }}
    >
      <motion.div
        className='absolute inset-0 opacity-20'
        style={{
          backgroundImage: `url(${useCase.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
        }}
      />
      <div className='container mx-auto px-2 md:px-4 relative z-10'>
        <motion.div
          className='bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-2xl p-4 md:p-8 shadow-2xl'
          style={{ y, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute -top-6 right-8 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse"
                   style={{ backgroundColor: useCase.color }} />
              <span className="text-white/90 font-medium">
                Created by {useCase.creator}
              </span>
            </div>
          </motion.div>

          <h2 className='text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 text-white'>
            {useCase.name}
          </h2>
          <p className='text-base md:text-xl mb-4 md:mb-8 text-gray-200 leading-relaxed'>
            {useCase.description}
          </p>
          <div className='flex flex-wrap gap-4 md:gap-8 items-center'>
            <img
              src={useCase.image}
              alt={useCase.name}
              className='w-full md:w-2/5 h-60 md:h-80 object-contain rounded-lg shadow-lg'
            />
            <div className='w-full md:w-1/2 flex flex-col justify-center mt-4 md:mt-0'>
              <p className='text-base md:text-xl text-gray-300 mb-4 md:mb-8'>
                {useCase.tagline}
              </p>
              <Link
                to={useCase.link}
                className='inline-block bg-white text-black font-bold py-3 md:py-4 px-6 md:px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base'
              >
                Explore {useCase.name}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const UseCasesPage: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Use Cases | ${siteConfig.title}`}
      description="Discover groundbreaking applications of Hashgraph Online standards"
    >
      <main className="bg-black">
        <section className='flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white py-8 md:py-36 px-4 md:px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-2xl md:text-5xl lg:text-6xl font-extrabold mb-2 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400'>
              Hashgraph in Action
            </h1>
            <p className='text-sm md:text-xl lg:text-2xl mb-3 md:mb-8 text-gray-300'>
              Witness how companies are leveraging Hashgraph to shape the future
              of technology.
            </p>
            <Link
              to='#use-case-0'
              className='inline-block bg-white text-black font-bold py-2 md:py-3 px-4 md:px-6 rounded-full text-xs md:text-base hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg'
            >
              Explore Use Cases
            </Link>
          </div>
        </section>

        {useCases.map((useCase, index) => (
          <UseCaseSection key={index} useCase={useCase} index={index} />
        ))}
      </main>
    </Layout>
  );
};

export default UseCasesPage;
