import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import CountUp from 'react-countup';
import Modal from '../components/Modal';
import SectionHeader from '../components/SectionHeader';
import { FaHandshake, FaCoins } from 'react-icons/fa';
import { FaGlobe, FaDollarSign, FaCode } from 'react-icons/fa';
import { FaNetworkWired } from 'react-icons/fa';
import {
  FaFile,
  FaCube,
  FaExchangeAlt,
  FaVoteYea,
  FaRocket,
  FaMagic,
} from 'react-icons/fa';
import Link from '@docusaurus/Link';
import UseCaseSection from '../components/UseCaseSection';
import { Input } from '../components/ui/input';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { MemberSection } from '../components/members/MemberSection';

interface Tool {
  title: string;
  description: string;
  link: string;
  highlight?: string | null;
  image: string;
  relatedStandard: string;
}

const tooling: Tool[] = [
  {
    title: 'KiloScribe Inscription Tools',
    description:
      'A web interface to easily inscribe valid HCS-1 Files and Hashinals on Hedera.',
    link: 'https://kiloscribe.com/inscribe',
    highlight: null,
    image: '/img/showcase/kiloscribe-graphic.png',
    relatedStandard: 'HCS-1',
  },
  {
    title: 'Turtlemoon Inscription Tools',
    description:
      'A downloadable client to easily inscribe valid HCS-1 Files and Hashinals on Hedera.',
    link: 'https://patches-1.gitbook.io/hcs-20-auditable-points/download',
    highlight: 'https://twitter.com/TurtleMoonCC/status/1766658087367131627',
    image: '/img/showcase/turtlemoon.jpeg',
    relatedStandard: 'HCS-1',
  },
  {
    title: 'Hashinals Inscription Portal',
    description: 'A web interface to easily find inscription numbers.',
    link: 'https://www.hashinals.com',
    highlight: 'https://twitter.com/TurtleMoonCC/status/1766901983204483241',
    image: '/img/showcase/hashinals-showcase.png',
    relatedStandard: 'HCS-5',
  },
  {
    title: 'Tierbot Analytics',
    description:
      'Advanced analytics for HCS20. Explore balances, transactions, holder number amounts, and more.',
    link: 'https://tier.bot/advanced-analytics/hedera/hcs20?tab=overview',
    highlight: 'https://twitter.com/Kantorcodes/status/1743629782485536776',
    image: '/img/showcase/hcs-20-analytics.png',
    relatedStandard: 'HCS-20',
  },
  {
    title: 'TrustEnterprise API',
    description:
      'An API for HCS20 inscriptions, offering a robust way to interact with HCS20 on Hedera.',
    link: 'https://github.com/trustenterprises/core-api/pull/50',
    highlight: 'https://twitter.com/flyinggazelle/status/1743679926207697291',
    image: '/img/showcase/trust-enterprises.jpeg',
    relatedStandard: 'HCS-20',
  },
];

// Create a new component for the Three.js scene
const ThreeJsScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const loadThreeJs = async () => {
      const THREE = await import('three');
      if (!mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
      mountRef.current.appendChild(renderer.domElement);

      const geometry = new THREE.BufferGeometry();
      const particles = 5000;
      const positions = new Float32Array(particles * 3);
      for (let i = 0; i < particles * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
      }
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
      const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
      const pointCloud = new THREE.Points(geometry, material);
      scene.add(pointCloud);

      camera.position.z = 50;

      const animate = () => {
        requestAnimationFrame(animate);
        pointCloud.rotation.y += 0.0005;
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    };

    loadThreeJs();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return <div className='absolute inset-0 opacity-30' ref={mountRef}></div>;
};

const NewsletterOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4'>
      <div className='relative w-full max-w-3xl mx-auto bg-white rounded-lg overflow-hidden'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-10'
          aria-label='Close newsletter signup'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
        <iframe
          src='https://abf8595d.sibforms.com/serve/MUIFAFOh0_qO6OntUHoDlZoTAwNDz7dIC7zTMveLKftES2Ku1z5WNKcJuiMLBTATRQD3WBVXkID6XDI72mQHAe3_TfTbT0_gvKjGw6cujid9M64jKctPYIkt3uYEJXbItqwTmIJjHSEWPoxKteE3S8U9MG-KMVsIss96koZT9CbICG5kL0jBqtSAa9VsSVYT4du9d-S0jKrK069h'
          frameBorder='0'
          scrolling='auto'
          allowFullScreen
          className='w-full h-full py-8 overflow-auto'
          style={{
            width: '100%',
            height: '80vh',
            border: 'none',
          }}
        />
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);

  return (
    <section className='relative py-20 md:py-32 bg-gradient-to-br from-blue-900 to-blue-600 text-white overflow-hidden'>
      <BrowserOnly>{() => <ThreeJsScene />}</BrowserOnly>
      <div className='container mx-auto px-4 relative z-10'>
        <div className='text-center max-w-3xl mx-auto'>
          <h1 className='text-5xl md:text-7xl font-extrabold mb-6'>
            Building a Fully On-Chain Internet
          </h1>
          <p className='text-xl md:text-2xl mb-10'>
            Join us in creating a decentralized, censorship-resistant internet
            ecosystem powered by Hedera.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <SecondaryButton
              onClick={() => setShowNewsletter(true)}
              className='text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100'
            >
              Join Waitlist
            </SecondaryButton>
            <PrimaryButton href='/docs/standards' className='text-lg px-8 py-4'>
              Explore Standards
            </PrimaryButton>
          </div>
        </div>
      </div>
      {showNewsletter && (
        <NewsletterOverlay onClose={() => setShowNewsletter(false)} />
      )}
    </section>
  );
};

const VisionSection: React.FC = () => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  return (
    <section
      ref={sectionRef}
      className='relative py-20 bg-gradient-to-br from-blue-900 to-purple-900 text-white overflow-hidden'
    >
      <div className='absolute inset-0 bg-grid-pattern opacity-10'></div>
      <div className='container mx-auto px-4 relative z-10'>
        <motion.h2
          className='text-6xl md:text-7xl font-bold mb-8 text-center text-white'
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          Vision
        </motion.h2>
        <motion.p
          className='text-xl text-center max-w-3xl mx-auto mb-16 text-gray-300 leading-relaxed'
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 0.2 },
            },
          }}
        >
          Hashgraph Online is dedicated to building a fully on-chain internet
          leveraging Hedera and the Hedera Consensus Service. Our goal is to
          create a new standard for digital interactions, enhancing security,
          transparency, and efficiency across the network.
        </motion.p>
        <motion.div
          className='grid grid-cols-1 md:grid-cols-3 gap-12'
          initial='hidden'
          animate={controls}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <ObjectiveCard
            icon={<FaNetworkWired className='text-5xl text-blue-400' />}
            title='HCS Standards'
            description='Develop and promote standards for a fully on-chain internet utilizing the Hedera Consensus Service.'
          />
          <ObjectiveCard
            icon={<FaHandshake className='text-5xl text-green-400' />}
            title='Ecosystem Support'
            description='Provide logistical support to companies and developers implementing HCS standards.'
          />
          <ObjectiveCard
            icon={<FaCode className='text-5xl text-purple-400' />}
            title='Open Source Development'
            description='Create open source tools and applications to enable broader access to on-chain internet capabilities.'
          />
        </motion.div>
      </div>
    </section>
  );
};

const ObjectiveCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <motion.div
      className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-xl shadow-lg'
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
    >
      <div className='mb-6'>{icon}</div>
      <h3 className='text-2xl font-bold mb-4 text-blue-300'>{title}</h3>
      <p className='text-gray-300'>{description}</p>
    </motion.div>
  );
};

interface StandardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  relatedTools: Tool[];
}

const StandardCard: React.FC<StandardCardProps> = ({
  icon,
  title,
  description,
  link,
  relatedTools,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div
      className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className='flex items-center mb-4'>
        {icon}
        <h3 className='text-2xl font-bold ml-4 text-blue-300'>{title}</h3>
      </div>
      <p className='text-gray-300 text-lg mb-6'>{description}</p>
      <div className='flex space-x-4'>
        <Link
          to={link}
          className='inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 hover:text-white'
        >
          Learn More
        </Link>
        {relatedTools.length > 0 && (
          <SecondaryButton
            onClick={() => setShowModal(true)}
            className='inline-block bg-green-500 hover:bg-green-600 text-white font-bold'
          >
            View Tools
          </SecondaryButton>
        )}
      </div>
      <Modal
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        modalTitle={`${title} Related Tools`}
      >
        <div className='grid grid-cols-1 gap-4'>
          {relatedTools.map((tool, index) => (
            <div key={index} className='border p-4 rounded'>
              {tool.image && (
                <img
                  src={tool.image}
                  alt={tool.title}
                  className='w-full h-48 object-cover mb-4 rounded'
                />
              )}
              <h3 className='text-xl font-semibold mb-2'>{tool.title}</h3>
              <p className='text-gray-600 mb-2'>{tool.description}</p>
              <a
                href={tool.link}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline'
              >
                Visit Tool
              </a>
            </div>
          ))}
        </div>
      </Modal>
    </motion.div>
  );
};

const StandardsSection: React.FC = () => {
  return (
    <section className='py-20 bg-gradient-to-br from-blue-900 to-purple-900 text-white overflow-hidden'>
      <div className='container mx-auto px-4'>
        <motion.h2
          className='text-5xl md:text-6xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          HCS Standards
        </motion.h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <StandardCard
            icon={<FaFile className='text-4xl text-blue-400' />}
            title='HCS-1'
            description='An open standard for file data management on Hedera, enabling efficient storage and retrieval of files.'
            link='/docs/standards/hcs-1'
            relatedTools={tooling.filter(
              (tool) => tool.relatedStandard === 'HCS-1'
            )}
          />
          <StandardCard
            icon={<FaCube className='text-4xl text-green-400' />}
            title='HCS-2'
            description='Create NFTs and web apps with dynamic content that evolves over time, enhancing user engagement.'
            link='/docs/standards/hcs-2'
            relatedTools={tooling.filter(
              (tool) => tool.relatedStandard === 'HCS-2'
            )}
          />
          <StandardCard
            icon={<FaExchangeAlt className='text-4xl text-yellow-400' />}
            title='HCS-3'
            description='Build a decentralized web on Hedera, enabling seamless resource linking and complex data structures.'
            link='/docs/standards/hcs-3'
            relatedTools={tooling.filter(
              (tool) => tool.relatedStandard === 'HCS-3'
            )}
          />
          <StandardCard
            icon={<FaRocket className='text-4xl text-purple-400' />}
            title='HCS-5'
            description='Tokenized HCS-1 Files, that can be transferred, sold, auctioned and more.'
            link='/docs/standards/hcs-5'
            relatedTools={tooling.filter(
              (tool) => tool.relatedStandard === 'HCS-5'
            )}
          />
          <StandardCard
            icon={<FaMagic className='text-4xl text-pink-400' />}
            title='HCS-6'
            description='Develop NFTs that change over time, perfect for evolving digital art or game items that level up.'
            link='/docs/standards/hcs-6'
            relatedTools={tooling.filter(
              (tool) => tool.relatedStandard === 'HCS-6'
            )}
          />
          <StandardCard
            icon={<FaVoteYea className='text-4xl text-red-400' />}
            title='HCS-8'
            description='Implement secure, transparent community voting systems for fair, tamper-proof elections.'
            link='/docs/standards/hcs-8'
            relatedTools={tooling.filter(
              (tool) => tool.relatedStandard === 'HCS-8'
            )}
          />
          <StandardCard
            icon={<FaCoins className='text-4xl text-blue-400' />}
            title='HCS-20'
            description='A standard for creating and managing auditable points on the Hedera network using the Hedera Consensus Service. It enables transparent, auditable, and versatile control systems for points.'
            link='/docs/standards/hcs-20'
            relatedTools={tooling.filter(
              (tool) => tool.relatedStandard === 'HCS-20'
            )}
          />
        </div>
      </div>
    </section>
  );
};

const MetricsSection: React.FC = () => {
  const [cdnRequests, setCdnRequests] = useState(0);
  const [inscribedFiles, setInscribedFiles] = useState(0);
  const [transactions, setTransactions] = useState(0);

  useEffect(() => {
    setCdnRequests(300000);
    setInscribedFiles(105000);
    setTransactions(23000000);
  }, []);

  return (
    <section className='py-20 bg-white dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        <SectionHeader>Our Impact in Numbers</SectionHeader>
        <p className='text-sm md:text-base text-center max-w-2xl mx-auto mb-6 md:mb-10 text-gray-600 dark:text-gray-300'>
          Through adoption of our standards, Hashgraph Online has achieved some
          impressive numbers.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-8 shadow-lg'>
            <div className='text-4xl md:text-5xl font-bold mb-2 text-blue-600 dark:text-blue-400'>
              <CountUp end={transactions} duration={2.5} separator=',' />+
            </div>
            <p className='text-xl text-gray-600 dark:text-gray-300 mb-4'>
              Transactions
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Our standards contribute to many transactions on Hedera, from
              HCS-20 mints & HCS-1 file creation to HTS Mints & more,
              demonstrating the widespread adoption.
            </p>
          </div>
          <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-8 shadow-lg'>
            <div className='text-4xl md:text-5xl font-bold mb-2 text-blue-600 dark:text-blue-400'>
              <CountUp end={cdnRequests} duration={2.5} separator=',' />+
            </div>
            <p className='text-xl text-gray-600 dark:text-gray-300 mb-4'>
              CDN Requests / Day
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              All data inscribed with Hashgraph Standards is currently served by
              our CDN to simplify and streamline the experience. The more people
              use our service, the more requests we serve
            </p>
          </div>
          <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-8 shadow-lg'>
            <div className='text-4xl md:text-5xl font-bold mb-2 text-blue-600 dark:text-blue-400'>
              <CountUp end={inscribedFiles} duration={2.5} separator=',' />+
            </div>
            <p className='text-xl text-gray-600 dark:text-gray-300 mb-4'>
              Inscribed Files
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Join hundreds of users who have had great success inscribing fully
              on chain files with our standards
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <Layout
      title={`Welcome to Hashgraph Online`}
      description='Hashgraph Online DAO is a consortium of companies and organizations building the future of the internet, on-chain, utilizing the Hedera Hashgraph and Consensus Service.'
    >
      <main>
        <HeroSection />
        <VisionSection />
        <MemberSection />
        <MetricsSection />
        <UseCaseSection />
        <StandardsSection />
      </main>
    </Layout>
  );
};

export default Home;
