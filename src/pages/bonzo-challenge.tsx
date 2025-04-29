import React from 'react';
import Layout from '@theme/Layout';
import HeroSection from '../components/bonzo-challenge/HeroSection';
import RequirementsSection from '../components/bonzo-challenge/RequirementsSection';
import PrizeSection from '../components/bonzo-challenge/PrizeSection';
import IdeasSection from '../components/bonzo-challenge/IdeasSection';
import TimelineSection from '../components/bonzo-challenge/TimelineSection';
import FAQSection from '../components/bonzo-challenge/FAQSection';
import '../css/hackathon-fonts.css';
import './hackathon-styles.css';
import FormSection from '../components/bonzo-challenge/FormSection';

const BonzoAgentChallenge: React.FC = () => {
  return (
    <Layout
      title='Bonzo Finance AI Agent Challenge | Hedera'
      description='Join the Bonzo Finance AI Agent Challenge to build the future of DeFi on Hedera. 15,000 $BONZO tokens prize for the best AI agent utilizing the Bonzo Protocol.'
    >
      <div className='min-h-screen bg-white dark:bg-gray-900 hackathon-container'>
        <div id='hero'>
          <HeroSection />
        </div>
        <div id='prize'>
          <PrizeSection />
        </div>
        <div id='requirements'>
          <RequirementsSection />
        </div>
        <div id='ideas'>
          <IdeasSection />
        </div>
        <div id='timeline'>
          <TimelineSection />
        </div>
        <div id='register'>
          <FormSection />
        </div>
        <div id='faq'>
          <FAQSection />
        </div>
      </div>
    </Layout>
  );
};

export default BonzoAgentChallenge;
