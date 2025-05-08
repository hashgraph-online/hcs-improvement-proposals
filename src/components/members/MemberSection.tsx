import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import SecondaryButton from '../SecondaryButton';
import PrimaryButton from '../PrimaryButton';
import Modal from '../Modal';
import SectionHeader from '../SectionHeader';

interface Member {
  name: string;
  description: string;
  logo: string;
  website: string;
  contribution?: string;
  useCase?: {
    description: string;
    image: string;
  };
}

const members: Member[] = [
  {
    name: 'Bonzo Finance',
    description:
      'Bonzo Finance is The Liquidity Layer of Hedera — an open source, non-custodial lending protocol based on Aave, designed to facilitate the lending and borrowing of digital assets.',
    logo: '/img/logos/bonzo.png',
    website: 'https://bonzo.finance',
  },
  {
    name: 'Builder Labs',
    description:
      'Buidler Labs is a venture studio focused on Web3 solutions, with an emphasis on Hedera',
    logo: '/img/logos/builder-labs.png',
    website: 'https://buidlerlabs.com',
  },
  {
    name: 'HashPack',
    description:
      'HashPack is the leading wallet on Hedera and is the gateway to services and assets across the entire Hedera ecosystem.',
    logo: '/img/logos/hashpack.png',
    website: 'https://hashpack.app',
    contribution:
      'HashPack actively supports and renders hashinal NFTs inside our wallet, enabling users and creators to take advantage of this innovative standard.',
  },
  {
    name: 'Hashgate',
    description:
      'HashGate is your reliable non-custodial payment gateway, combining speed, security, and simplicity. Experience decentralized payments like they should be.',
    logo: '/img/logos/hashgate.svg',
    website: 'https://hashgate.app',
  },
  {
    name: 'Hgraph',
    description:
      'Hgraph is a trusted software engineering firm and Hedera mirror node provider. For enterprise, startups, and developers.',
    logo: '/img/logos/hgraph.svg',
    website: 'https://hgraph.com',
    contribution:
      'Hgraph is proud to provide infrastructure for Hashgraph Online and continue developing methods to further enhance data accessibility of information stored using HCS standards.',
  },
  {
    name: 'LaunchBadge',
    description:
      'LaunchBadge is a software engineering company dedicated to fostering excellence at the cutting edge of technology. We believe that the future of software is in the hands of those who are passionate about innovation.',
    logo: '/img/logos/lb_logo.png',
    website: 'https://launchbadge.com',
  },
  {
    name: 'Neuron',
    description:
      'Neuron is creating a world where machines buy from machines, facilitating a new era of agentic abundance',
    logo: '/img/logos/neuron.avif',
    website: 'https://neuron.world',
  },
  {
    name: 'SentX',
    description:
      'SentX is the leading NFT Marketplace on Hedera to buy, sell, and discover digital collectibles.',
    logo: '/img/logos/sentx-white.webp',
    website: 'https://sentx.io',
  },
  {
    name: 'KiloScribe',
    description:
      'Effortless storage and retrieval of on-graph files - empowering developers, creators, and influencers to build on-graph.',
    logo: '/img/logos/kiloscribe-wordmark.png',
    website: 'https://kiloscribe.com',
  },
  {
    name: 'Turtlemoon',
    description:
      'Creating web 3 platforms, services, and applications using Hedera',
    logo: '/img/logos/TM_logo.webp',
    website: 'https://turtlemoon.io',
  },
];

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showReadMore, setShowReadMore] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (descriptionRef.current) {
        const isOverflowing =
          descriptionRef.current.scrollHeight >
          descriptionRef.current.clientHeight;
        setShowReadMore(isOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => window.removeEventListener('resize', checkOverflow);
  }, [member.description]);

  return (
    <motion.div
      className='bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='h-32 sm:h-40 relative overflow-hidden bg-gradient-to-br from-blue-50 via-slate-300r to-blue-400 dark:from-gray-800 dark:to-gray-700'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <img
            src={member.logo}
            alt={member.name}
            className='max-w-[80%] max-h-[80%] object-contain'
          />
        </div>
      </div>
      <div className='p-4'>
        <h3 className='text-xl font-bold mb-2 underline decoration-blue-400 decoration-2 inline-block relative mx-auto after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-indigo-400 after:transition-all after:duration-300 hover:after:w-full text-blue-600 dark:text-blue-400'>
          {member.name}
        </h3>
        <div className='relative mb-4'>
          <p
            ref={descriptionRef}
            className={`text-sm text-gray-600 dark:text-gray-300 ${
              isExpanded ? '' : 'line-clamp-3'
            }`}
          >
            {member.contribution || member.description}
          </p>
        </div>
        <div className='flex flex-col sm:flex-row gap-2'>
          {showReadMore && (
            <SecondaryButton
              className='w-full sm:w-auto'
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </SecondaryButton>
          )}
          {member.website && (
            <PrimaryButton className='w-full sm:w-auto' href={member.website}>
              Visit Website
            </PrimaryButton>
          )}
          {member.useCase && (
            <SecondaryButton
              className='w-full sm:w-auto'
              onClick={() => setShowModal(true)}
            >
              View Use Case
            </SecondaryButton>
          )}
        </div>
      </div>
      {showModal && member.useCase && (
        <Modal
          isOpen={showModal}
          handleClose={() => setShowModal(false)}
          modalTitle={`${member.name} Use Case`}
        >
          <div className='mb-6 rounded-lg overflow-hidden shadow-lg'>
            <img
              src={member.useCase.image}
              alt={`${member.name} use case`}
              className='w-full h-auto object-cover'
            />
          </div>
          <p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
            {member.useCase.description}
          </p>
          <PrimaryButton href={member.website} className='w-full'>
            Learn More About {member.name}
          </PrimaryButton>
        </Modal>
      )}
    </motion.div>
  );
};

export const MemberSection: React.FC = () => {
  return (
    <section className='py-8 md:py-16 bg-gradient-to-br from-blue-800 to-blue-600 dark:from-gray-800 dark:to-gray-900'>
      <div className='container mx-auto px-4'>
        <SectionHeader dark>Our Esteemed Members</SectionHeader>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          {members.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};
