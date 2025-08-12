import React, { useState } from 'react';
import Layout from '@theme/Layout';
import DevHeroSection from '../components/desktop/DevHeroSection';
import TechnicalFeatures from '../components/desktop/TechnicalFeatures';
import DeveloperTools from '../components/desktop/DeveloperTools';
import DesktopShowcase from '../components/desktop/DesktopShowcase';
import HAHNewsletterSection from '../components/hackathon/HAHNewsletterSection';
import HAHNewsletterModal from '../components/hackathon/HAHNewsletterModal';
import '../css/custom.css';

const DesktopAppPage: React.FC = () => {
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  return (
    <Layout
      title='HOL Desktop - AI Agent for Hedera'
      description='Desktop app for interacting with AI agents on Hedera. Chat interface with MCP server support, transaction approvals, and hashgraph operations. Built with the Conversational Agent SDK.'
    >
      <HAHNewsletterModal
        isOpen={showNewsletterModal}
        onClose={() => setShowNewsletterModal(false)}
      />
      <div className='min-h-screen bg-white dark:bg-gray-900'>
        <DevHeroSection />
        <DesktopShowcase />
        <DeveloperTools />
        <TechnicalFeatures />
        <HAHNewsletterSection onNewsletterClick={() => setShowNewsletterModal(true)} />
      </div>
    </Layout>
  );
};

export default DesktopAppPage;