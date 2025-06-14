import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MemberSection } from '../components/members/MemberSection';
import React from 'react';

const FloatingLogos: React.FC = () => {
  const logos = [
    { src: '/logo_icons/Bonzo_Dark.png', alt: 'Bonzo' },
    { src: '/logo_icons/Buidler Labs.png', alt: 'Buidler Labs' },
    { src: '/logo_icons/HGraph_Dark.png', alt: 'HGRAPH' },
    { src: '/logo_icons/Hashgate.png', alt: 'Hashgate' },
    { src: '/logo_icons/Hashpack.png', alt: 'Hashpack' },
    { src: '/logo_icons/Kiloscribe.png', alt: 'Kiloscribe' },
    { src: '/logo_icons/Launchbadge.png', alt: 'Launchbadge' },
    { src: '/logo_icons/Neuron_Dark.png', alt: 'Neuron' },
    { src: '/logo_icons/SentX_Dark.png', alt: 'SentX' },
    { src: '/logo_icons/Turtlemoon.png', alt: 'Turtlemoon' },
  ];

  // Create positions with more spacing to prevent overlap with larger logos
  const positions = [
    { left: '10%', top: '15%' },   // Top left
    { left: '75%', top: '10%' },   // Top right
    { left: '15%', top: '70%' },   // Bottom left
    { left: '70%', top: '75%' },   // Bottom right
    { left: '5%', top: '45%' },    // Mid left
    { left: '85%', top: '40%' },   // Mid right
    { left: '45%', top: '5%' },    // Top center
    { left: '40%', top: '80%' },   // Bottom center
    { left: '30%', top: '40%' },   // Upper mid left
    { left: '60%', top: '55%' },   // Upper mid right
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {logos.map((logo, index) => {
        // Make Kiloscribe, Launchbadge, Hashpack, and Turtlemoon more visible
        const needsHigherVisibility = logo.alt === 'Kiloscribe' || logo.alt === 'Launchbadge' || logo.alt === 'Hashpack' || logo.alt === 'Turtlemoon';
        const opacity = needsHigherVisibility ? 'opacity-[0.15] hover:opacity-[0.25]' : 'opacity-[0.08] hover:opacity-[0.15]';
        const brightness = needsHigherVisibility ? 'brightness(1.0) contrast(1.0)' : 'brightness(0.8) contrast(0.9)';
        
        return (
          <div
            key={logo.alt}
            className={`absolute ${opacity} transition-opacity duration-500`}
            style={{
              left: positions[index].left,
              top: positions[index].top,
              animation: `float-logo-${index % 3} ${12 + index}s ease-in-out infinite`,
            }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="w-16 md:w-20 lg:w-24 h-auto"
              style={{
                filter: brightness,
                mixBlendMode: 'screen',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const UseCasesPage: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Members | ${siteConfig.title}`}
      description='Learn about the companies and organizations that are building Hashgraph Online'
    >
      <main className='bg-black'>
        <section className='relative flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white py-8 md:py-36 px-4 md:px-6'>
          <FloatingLogos />
          <div className='max-w-4xl mx-auto text-center relative z-10'>
            <h1 className='text-2xl md:text-5xl lg:text-6xl font-extrabold mb-2 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 leading-normal pb-2'>
              Hashgraph Online Members
            </h1>
            <p className='text-sm md:text-xl lg:text-2xl text-gray-300'>
              Learn about the companies and organizations that are building
              Hashgraph Online
            </p>
          </div>
        </section>

        <div id='members'>
          <MemberSection />
        </div>
      </main>
    </Layout>
  );
};

export default UseCasesPage;
