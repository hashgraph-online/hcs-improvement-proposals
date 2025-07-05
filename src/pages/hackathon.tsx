import React from 'react';
import Layout from '@theme/Layout';
import HAHHeroSection from '../components/hackathon/HAHHeroSection';
import RequirementsSection from '../components/hackathon/RequirementsSection';
import JudgesSection from '../components/hackathon/JudgesSection';
import HAHToolsTimelineSection from '../components/hackathon/HAHToolsTimelineSection';
import HAHRegisterSection from '../components/hackathon/HAHRegisterSection';
import HAHFAQSection from '../components/hackathon/HAHFAQSection';
import HAHJudgingCriteriaSection from '../components/hackathon/HAHJudgingCriteriaSection';
import '../css/hackathon-fonts.css';
import './hackathon-styles.css';

const HAHPage: React.FC = () => {
  return (
    <Layout
      title='AI Track - Hedera Africa Hackathon | Hashgraph Online'
      description='Join the AI Track at Hedera Africa Hackathon. Build innovative AI solutions on Hedera in collaboration with The Hashgraph Association and Exponential Science.'
    >
      <div className='min-h-screen bg-white dark:bg-gray-900 hackathon-container'>
        <div id='hero'>
          <HAHHeroSection />
        </div>
        <div id='requirements'>
          <HAHJudgingCriteriaSection />
        </div>
        <div id='tools'>
          <HAHToolsTimelineSection />
        </div>
        <div id='judges'>
          <JudgesSection event='africa-hackathon' showTBA={true} />
        </div>
        <div id='faq'>
          <HAHFAQSection />
        </div>
        <div id='register'>
          <HAHRegisterSection />
        </div>
      </div>
    </Layout>
  );
};

export default HAHPage;