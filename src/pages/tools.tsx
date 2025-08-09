import React from 'react';
import Layout from '@theme/Layout';
import ToolsSection from '../components/tools/ToolsSection';
import HAHCodeExamplesSection from '../components/hackathon/HAHCodeExamplesSection';
import '../css/hackathon-fonts.css';
import './hackathon-styles.css';

const ToolsPage: React.FC = () => {
  return (
    <Layout
      title='Developer Tools & SDKs | Hashgraph Online'
      description='Explore the complete suite of developer tools and SDKs for building on Hedera. From AI agent frameworks to blockchain integrations, find everything you need to build innovative solutions.'
    >
      <div className='min-h-screen bg-white dark:bg-gray-900'>
        <div id='tools'>
          <ToolsSection />
        </div>
        
        <div id='examples'>
          <HAHCodeExamplesSection />
        </div>
      </div>
    </Layout>
  );
};

export default ToolsPage;