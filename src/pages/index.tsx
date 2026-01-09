import Layout from '@theme/Layout';
import React, { lazy, Suspense, useState, useEffect } from 'react';

import StaticHero from '../components/home/StaticHero';

const HeroSectionLazy = lazy(() => import('../components/home/HeroSection'));
const UseCaseSection = lazy(() => import('../components/UseCaseSection'));
const AutonomousInfrastructureSectionLazy = lazy(() => import('../components/home/AutonomousInfrastructureSection'));
const WhatWeDoSectionLazy = lazy(() => import('../components/home/WhatWeDoSection'));
const MetricsSectionLazy = lazy(() => import('../components/home/MetricsSection'));
const StandardsSectionLazy = lazy(() => import('../components/home/StandardsSection'));

const Home: React.FC = () => {
  const [showFullHero, setShowFullHero] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const loadFullHero = () => setShowFullHero(true);
    
    const timeout = setTimeout(loadFullHero, 3000);
    
    const events = ['mousedown', 'touchstart', 'scroll', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, loadFullHero, { once: true, passive: true });
    });

    return () => {
      clearTimeout(timeout);
      events.forEach(event => {
        document.removeEventListener(event, loadFullHero);
      });
    };
  }, []);

  return (
    <Layout
      title={`Welcome to Hashgraph Online`}
      description='Hashgraph Online DAO is a consortium of companies and organizations building the future of the internet, on-chain, utilizing the Hedera Hashgraph and Consensus Service.'
    >
      <main>
        {!showFullHero && <StaticHero />}
        
        {showFullHero && isClient && (
          <Suspense fallback={<StaticHero />}>
            <HeroSectionLazy />
          </Suspense>
        )}

        <Suspense fallback={<div className="py-20 bg-gray-900" style={{ minHeight: '400px' }} />}>
          <AutonomousInfrastructureSectionLazy />
        </Suspense>
        <Suspense fallback={<div className="py-24 lg:py-32 bg-white dark:bg-gray-900" style={{ minHeight: '400px' }} />}>
          <WhatWeDoSectionLazy />
        </Suspense>
        <Suspense fallback={<div className="py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-black dark:to-gray-900" style={{ minHeight: '400px' }} />}>
          <MetricsSectionLazy />
        </Suspense>
        <Suspense fallback={<div className="py-20 text-center" style={{ minHeight: '300px' }}><div className="animate-pulse text-gray-400">Loading...</div></div>}>
          <UseCaseSection />
        </Suspense>
        <Suspense fallback={<div className="py-24 lg:py-32 bg-white dark:bg-gray-900" style={{ minHeight: '400px' }} />}>
          <StandardsSectionLazy />
        </Suspense>
      </main>
    </Layout>
  );
};

export default Home;
