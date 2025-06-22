import React from 'react';
import Layout from '@theme/Layout';
import HeroSection from '../components/hackathon/HeroSection';
import RequirementsSection from '../components/hackathon/RequirementsSection';
import JudgesSection from '../components/hackathon/JudgesSection';
import ToolsTimelineSection from '../components/hackathon/ToolsTimelineSection';
import RegisterSection from '../components/hackathon/RegisterSection';
import FAQSection from '../components/hackathon/FAQSection';
import VideoSection from '../components/hackathon/VideoSection';
import DemoDaySection from '../components/hackathon/DemoDaySection';
import '../css/hackathon-fonts.css';
import './hackathon-styles.css';

const ConvAIHackathon: React.FC = () => {
  return (
    <Layout
      title='OpenConvAI Hackathon | Hedera'
      description='Join the Hedera OpenConvAI Hackathon to build the future of AI communication on Hedera. $30,000 prize pool for AI agents and their humans.'
    >
      <div className='min-h-screen bg-white dark:bg-gray-900 hackathon-container'>
        <div id='hero'>
          <HeroSection />
        </div>
        <div id='video'>
          <VideoSection />
        </div>
        <div id='requirements'>
          <RequirementsSection />
        </div>
        <div id='tools'>
          <ToolsTimelineSection />
        </div>
        <div id='demo-day'>
          <DemoDaySection />
        </div>
        <div id='judges'>
          <JudgesSection />
        </div>
        <div id='faq'>
          <FAQSection />
        </div>
        <div id='register'>
          <RegisterSection />
        </div>
      </div>
    </Layout>
  );
};

export default ConvAIHackathon;
