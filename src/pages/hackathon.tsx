import React from 'react';
import Layout from '@theme/Layout';
import HeroSection from '../components/hackathon/HeroSection';
import RequirementsSection from '../components/hackathon/RequirementsSection';
import JudgesSection from '../components/hackathon/JudgesSection';
import ToolsTimelineSection from '../components/hackathon/ToolsTimelineSection';
import RegisterSection from '../components/hackathon/RegisterSection';
import FAQSection from '../components/hackathon/FAQSection';
import VideoSection from '../components/hackathon/VideoSection';
import '../css/hackathon-fonts.css';
import './hackathon-styles.css';

const ConvAIHackathon: React.FC = () => {
  return (
    <Layout
      title='OpenConvAI Hackathon | Hedera'
      description='Join the Hedera OpenConvAI Hackathon to build the future of AI communication on Hedera. $30,000 prize pool for AI agents and their humans.'
    >
      <div className='min-h-screen bg-white dark:bg-gray-900 font-styrene hackathon-container'>
        <HeroSection />
        <VideoSection />
        <RequirementsSection />
        <ToolsTimelineSection />
        <JudgesSection />
        <FAQSection />
        <RegisterSection />
      </div>
    </Layout>
  );
};

export default ConvAIHackathon;
