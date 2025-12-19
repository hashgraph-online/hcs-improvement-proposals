
import React from 'react';
import Layout from '@theme/Layout';
import TutorialHub from '../components/TutorialHub';

export default function TutorialsPage() {
    return (
        <Layout
            title="Hashgraph Standards Academy | HCS Tutorials"
            description="Learn Hedera Consensus Service (HCS) standards with guided video tutorials, code labs, and real Standards SDK examples for Hashgraph Online."
        >
            <TutorialHub />
        </Layout>
    );
}
