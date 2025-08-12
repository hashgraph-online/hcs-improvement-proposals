import React, { useState } from 'react';
import Layout from '@theme/Layout';
import ConvAIHeroSectionNew from '../components/conversational-agent/ConvAIHeroSectionNew';
import ConvAIFeaturesBasic from '../components/conversational-agent/ConvAIFeaturesBasic';
import ConvAIInstallSection from '../components/conversational-agent/ConvAIInstallSection';
import ConvAICodeExamples from '../components/conversational-agent/ConvAICodeExamples';
import ConvAIDownloadsSection from '../components/conversational-agent/ConvAIDownloadsSection';
import '../css/custom.css';

const ConversationalAgentPage: React.FC = () => {
  return (
    <Layout
      title='AI Assistant for Hedera | HashgraphOnline Desktop App'
      description='Your personal AI assistant for the Hedera network. Chat naturally to manage HBAR, create tokens, deploy smart contracts, and connect with decentralized AI agents. Available on macOS, Windows, and Linux.'
    >
      <div className='min-h-screen bg-white dark:bg-gray-900 conversational-agent-container'>
        <div id='hero'>
          <ConvAIHeroSectionNew />
        </div>
        <div id='features'>
          <ConvAIFeaturesBasic />
        </div>
        <div id='installation'>
          <ConvAIInstallSection />
        </div>
        <div id='examples'>
          <ConvAICodeExamples />
        </div>
        <div id='downloads'>
          <ConvAIDownloadsSection />
        </div>
      </div>
    </Layout>
  );
};

export default ConversationalAgentPage;