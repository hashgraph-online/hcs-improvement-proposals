import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React, { lazy, Suspense } from 'react';

// Lazy load ALL heavy components for code splitting
// This removes motion/react from the initial bundle, improving LCP significantly
const HeroSectionLazy = lazy(() => import('../components/home/HeroSection'));
const UseCaseSection = lazy(() => import('../components/UseCaseSection'));
const AutonomousInfrastructureSectionLazy = lazy(() => import('../components/home/AutonomousInfrastructureSection'));
const WhatWeDoSectionLazy = lazy(() => import('../components/home/WhatWeDoSection'));
const MetricsSectionLazy = lazy(() => import('../components/home/MetricsSection'));
const StandardsSectionLazy = lazy(() => import('../components/home/StandardsSection'));

/**
 * Hero section skeleton for SSR/initial load while HeroSection lazy loads
 * Matches the layout of the real hero to prevent CLS
 */
const HeroSkeleton: React.FC = () => (
  <section 
    className="relative overflow-hidden bg-white dark:bg-gray-900"
    style={{ minHeight: '650px', maxHeight: '650px' }}
  >
    <div className="container mx-auto px-6 lg:px-16 xl:px-24 h-full py-12 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center h-full">
        <div className="space-y-8">
          <div className="space-y-6">
            {/* Title skeleton */}
            <div className="h-16 lg:h-20 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg animate-pulse" />
            {/* Subtitle skeleton */}
            <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
            {/* Buttons skeleton */}
            <div className="flex gap-4">
              <div className="h-12 w-40 bg-brand-blue/20 rounded-lg animate-pulse" />
              <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          {/* Right content skeleton */}
          <div className="h-[450px] bg-gray-100 dark:bg-gray-800 rounded-3xl animate-pulse" />
        </div>
      </div>
    </div>
  </section>
);

// Below-fold sections are lazy-loaded from separate files for code splitting:
// - HeroSection: ../components/home/HeroSection (includes motion library)
// - WhatWeDoSection: ../components/home/WhatWeDoSection
// - MetricsSection: ../components/home/MetricsSection
// - StandardsSection: ../components/home/StandardsSection

const Home: React.FC = () => {
  return (
    <Layout
      title={`Welcome to Hashgraph Online`}
      description='Hashgraph Online DAO is a consortium of companies and organizations building the future of the internet, on-chain, utilizing the Hedera Hashgraph and Consensus Service.'
    >
      <main>
        <Suspense fallback={<HeroSkeleton />}>
          <HeroSectionLazy />
        </Suspense>
        <Suspense fallback={<div className="py-20 bg-gray-900" />}>
          <AutonomousInfrastructureSectionLazy />
        </Suspense>
        <Suspense fallback={<div className="py-24 lg:py-32 bg-white dark:bg-gray-900" />}>
          <WhatWeDoSectionLazy />
        </Suspense>
        <Suspense fallback={<div className="py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-black dark:to-gray-900" />}>
          <MetricsSectionLazy />
        </Suspense>
        <Suspense fallback={<div className="py-20 text-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
          <UseCaseSection />
        </Suspense>
        <Suspense fallback={<div className="py-24 lg:py-32 bg-white dark:bg-gray-900" />}>
          <StandardsSectionLazy />
        </Suspense>
      </main>
    </Layout>
  );
};

export default Home;
