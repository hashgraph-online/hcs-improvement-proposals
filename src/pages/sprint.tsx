import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';
import HeroSection from '../components/ai-agent-sprints/HeroSection';
import SprintsSection from '../components/ai-agent-sprints/SprintsSection';
import AboutSection from '../components/ai-agent-sprints/AboutSection';
import BenefitsSection from '../components/ai-agent-sprints/BenefitsSection';
import FAQSection from '../components/ai-agent-sprints/FAQSection';

export default function AIAgentSprints(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title='AI Agent Sprints | Hashgraph Online Sprint Series'
      description='Join the Hashgraph Online Sprint Series and build AI agents on Hedera through time-boxed challenges. Earn crypto rewards and help accelerate the AI Agents ecosystem on Hedera.'
    >
      <Head>
        <meta
          property='og:title'
          content='AI Agent Sprints | Hashgraph Online Sprint Series'
        />
        <meta
          property='og:description'
          content='Join the Hashgraph Online Sprint Series and build AI agents on Hedera through time-boxed challenges. Earn crypto rewards and help accelerate the AI Agents ecosystem on Hedera.'
        />
        <meta
          property='og:image'
          content={`${siteConfig.url}/img/hashgraph-banner.png`}
        />
        <meta property='og:type' content='website' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='AI Agent Sprints | Hashgraph Online Sprint Series'
        />
        <meta
          name='twitter:description'
          content='Join the Hashgraph Online Sprint Series and build AI agents on Hedera through time-boxed challenges. Earn crypto rewards and help accelerate the AI Agents ecosystem on Hedera.'
        />
        <meta
          name='twitter:image'
          content={`${siteConfig.url}/img/hashgraph-banner.png`}
        />
      </Head>

      <main className='overflow-hidden'>
        <HeroSection />
        <AboutSection />
        <SprintsSection />
        <BenefitsSection />
        <FAQSection />
      </main>
    </Layout>
  );
}
