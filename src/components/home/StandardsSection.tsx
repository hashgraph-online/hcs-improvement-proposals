import React, { useState, lazy, Suspense } from 'react';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import InteractiveShowcase from '../InteractiveShowcase';
import { AnimatedBackground, Typography } from '../ui';

const HashgraphConsensusLazy = lazy(() =>
  import('../HashgraphConsensus').then((m) => ({ default: m.HashgraphConsensus }))
);

interface StandardItem {
  id: string;
  name: string;
  description: string;
  specification: string;
  status: string;
  adoptions: string[];
  codeExample: string;
}

interface StandardMainContentProps {
  item: StandardItem;
  index: number;
}

interface StandardSidebarItemProps {
  item: StandardItem;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const StandardMainContent: React.FC<StandardMainContentProps> = ({
  item: standard,
}) => {
  const getOrgColor = (orgName: string): string => {
    const colors: Record<string, string> = {
      KiloScribe: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
      TurtleMoon: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
      HashPack: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
      SentX: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
      'Hashinals.com': 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
      Moonscape: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
      OpenConvAI: 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300',
      'Bonzo Finance': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    };
    return colors[orgName] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <span className='text-3xl font-mono font-black text-brand-blue'>
          {standard.id}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-mono ${
            standard.status === 'PUBLISHED'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
          }`}
        >
          {standard.status}
        </span>
      </div>

      <Typography
        variant='h3'
        className='text-xl font-mono font-bold text-gray-900 dark:text-white'
      >
        {standard.name}
      </Typography>

      <Typography
        color='muted'
        className='text-gray-600 dark:text-gray-300 leading-relaxed'
      >
        {standard.description}
      </Typography>

      {standard.adoptions.length > 0 && (
        <div>
          <Typography className='text-xs font-mono text-gray-500 dark:text-gray-400 mb-2'>
            // ADOPTED_BY
          </Typography>
          <div className='flex flex-wrap gap-2'>
            {standard.adoptions.map((org, i) => (
              <span
                key={i}
                className={`px-2 py-1 rounded text-xs font-medium ${getOrgColor(org)}`}
              >
                {org}
              </span>
            ))}
          </div>
        </div>
      )}

      <a
        href={standard.specification}
        className='inline-flex items-center gap-2 text-brand-blue hover:text-brand-purple transition-colors text-sm font-mono'
      >
        View Specification →
      </a>
    </div>
  );
};

const StandardSidebarItem: React.FC<StandardSidebarItemProps> = ({
  item: standard,
  index,
  isActive,
  onClick,
}) => {
  const getOrgColor = (orgName: string): string => {
    const colors: Record<string, string> = {
      KiloScribe: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
      TurtleMoon: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
      HashPack: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
      SentX: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
      'Hashinals.com': 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
      Moonscape: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
      OpenConvAI: 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300',
      'Bonzo Finance': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    };
    return colors[orgName] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 border-l-4 border-brand-blue'
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border-l-4 border-transparent'
      }`}
    >
      <div className='flex items-center justify-between mb-2'>
        <span
          className={`text-sm font-mono font-bold ${
            isActive ? 'text-brand-blue' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          {standard.id}
        </span>
        <span
          className={`w-2 h-2 rounded-full ${
            standard.status === 'PUBLISHED' ? 'bg-green-500' : 'bg-yellow-500'
          }`}
        />
      </div>
      <Typography
        className={`text-sm font-medium ${
          isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
        }`}
      >
        {standard.name}
      </Typography>
      {standard.adoptions.length > 0 && (
        <div className='flex flex-wrap gap-1 mt-2'>
          {standard.adoptions.slice(0, 2).map((org, i) => (
            <span
              key={i}
              className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${getOrgColor(org)}`}
            >
              {org}
            </span>
          ))}
          {standard.adoptions.length > 2 && (
            <span className='px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'>
              +{standard.adoptions.length - 2}
            </span>
          )}
        </div>
      )}
    </button>
  );
};

const StandardsSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const allStandards: StandardItem[] = [
    {
      id: 'HCS-1',
      name: 'File Storage & Retrieval',
      description: 'On-chain file storage and content-addressed retrieval system',
      specification: '/docs/standards/hcs-1/',
      status: 'PUBLISHED',
      adoptions: ['KiloScribe', 'TurtleMoon'],
      codeExample: 'inscribe(fileBuffer, metadata)',
    },
    {
      id: 'HCS-2',
      name: 'Discovery Registries',
      description: 'Topic registries for service and agent discovery',
      specification: '/docs/standards/hcs-2',
      status: 'PUBLISHED',
      adoptions: [],
      codeExample: 'registerService(topicId, metadata)',
    },
    {
      id: 'HCS-3',
      name: 'Resource Linking & Recursion',
      description: 'Enables recursive referencing of inscriptions within Hedera',
      specification: '/docs/standards/hcs-3',
      status: 'PUBLISHED',
      adoptions: ['KiloScribe', 'HashPack'],
      codeExample: 'reference("hcs://0.0.123456/file.json")',
    },
    {
      id: 'HCS-4',
      name: 'HCS Standardization Process',
      description: 'Defines the lifecycle, roles, criteria, and repository workflow for HCS standards.',
      specification: '/docs/standards/hcs-4',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'submitProposal(title, description)',
    },
    {
      id: 'HCS-5',
      name: 'Dynamic NFTs (Hashinals)',
      description: 'Tokenized HCS-1 files with evolving metadata',
      specification: '/docs/standards/hcs-5',
      status: 'PUBLISHED',
      adoptions: ['KiloScribe', 'TurtleMoon', 'SentX', 'HashPack', 'Hashinals.com'],
      codeExample: 'createHashinal(fileId, tokenConfig)',
    },
    {
      id: 'HCS-6',
      name: 'Dynamic Hashinals',
      description: 'Framework for creating dynamic Hashinals with updatable on-chain metadata',
      specification: '/docs/standards/hcs-6',
      status: 'PUBLISHED',
      adoptions: ['KiloScribe'],
      codeExample: 'register(hcs1TopicId)',
    },
    {
      id: 'HCS-7',
      name: 'Smart Hashinals',
      description: 'Dynamic NFTs with metadata driven by smart contract state and WASM processing',
      specification: '/docs/standards/hcs-7',
      status: 'DRAFT',
      adoptions: ['KiloScribe'],
      codeExample: 'registerConfig(type, config)',
    },
    {
      id: 'HCS-8',
      name: 'Governance & Voting',
      description: 'Transparent voting systems with tamper-proof results',
      specification: '/docs/standards/hcs-8',
      status: 'PUBLISHED',
      adoptions: ['HashPack'],
      codeExample: 'createPoll(question, options, duration)',
    },
    {
      id: 'HCS-9',
      name: 'Modular Governance Framework',
      description: 'Flexible governance system with pluggable voting modules',
      specification: '/docs/standards/hcs-9',
      status: 'PUBLISHED',
      adoptions: [],
      codeExample: 'createGovernance(modules, rules)',
    },
    {
      id: 'HCS-10',
      name: 'AI Agent Communication',
      description: 'Secure communication protocol for autonomous agents',
      specification: '/docs/standards/hcs-10',
      status: 'DRAFT',
      adoptions: ['Moonscape'],
      codeExample: 'sendMessage(agentId, payload)',
    },
    {
      id: 'HCS-11',
      name: 'Identity Profiles',
      description: 'Standardized profile management for humans and agents',
      specification: '/docs/standards/hcs-11',
      status: 'DRAFT',
      adoptions: ['OpenConvAI'],
      codeExample: 'createProfile(identity, metadata)',
    },
    {
      id: 'HCS-12',
      name: 'HashLinks - Actions & Blocks',
      description: 'Framework for building interactive experiences using WebAssembly and Gutenberg blocks.',
      specification: '/docs/standards/hcs-12',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'assemble(actionId, blockId)',
    },
    {
      id: 'HCS-13',
      name: 'Schema Validation',
      description: 'Data validation and schema enforcement for structured content',
      specification: '/docs/standards/hcs-13',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'validate(data, schema)',
    },
    {
      id: 'HCS-14',
      name: 'Universal Agent ID',
      description: 'Systematic approach for generating globally unique identifiers for AI agents.',
      specification: '/docs/standards/hcs-14',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'resolveAgent(did)',
    },
    {
      id: 'HCS-15',
      name: 'Petals - Profile Accounts',
      description: 'Enables multiple account instances using the same private key for isolated identities.',
      specification: '/docs/standards/hcs-15/',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'createPetal(baseKey, profile)',
    },
    {
      id: 'HCS-16',
      name: 'Floras - AppNet Accounts',
      description: 'Multi-signature coordination accounts for decentralized AppNets.',
      specification: '/docs/standards/hcs-16/',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'createFlora(members, threshold)',
    },
    {
      id: 'HCS-17',
      name: 'State Hash Calculation',
      description: 'Methodology for calculating cryptographic state hashes of accounts and formations.',
      specification: '/docs/standards/hcs-17/',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'calculateStateHash(accountState)',
    },
    {
      id: 'HCS-18',
      name: 'Flora Discovery Protocol',
      description: 'Discovery and formation protocol for Floras to find compatible partners.',
      specification: '/docs/standards/hcs-18',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'announceAvailability(capabilities)',
    },
    {
      id: 'HCS-19',
      name: 'AI Agent Privacy Compliance',
      description: 'ISO/IEC TS 27560-aligned framework for AI privacy compliance.',
      specification: '/docs/standards/hcs-19',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'recordConsent(userId, policyId)',
    },
    {
      id: 'HCS-20',
      name: 'Auditable Points',
      description: 'Transparent point systems with full auditability',
      specification: '/docs/standards/hcs-20/',
      status: 'PUBLISHED',
      adoptions: ['Bonzo Finance'],
      codeExample: 'mintPoints(account, amount, reason)',
    },
    {
      id: 'HCS-21',
      name: 'Adapter Registry',
      description: 'Adapter registry that links HCS-1 manifests, package fingerprints, and appnet context so participants stay in sync.',
      specification: '/docs/standards/hcs-21',
      status: 'DRAFT',
      adoptions: [],
      codeExample: 'declareAdapter(adapterId, manifestPointer)',
    },
  ];

  return (
    <section className='relative py-24 lg:py-32 bg-white dark:bg-gray-900 overflow-hidden'>
      <AnimatedBackground
        variant='blobs'
        colors={['brand-blue', 'brand-purple', 'brand-green']}
        intensity='low'
        opacity={0.1}
      />

      <div className='absolute inset-0 opacity-5 dark:opacity-10'>
        <Suspense fallback={null}>
          <HashgraphConsensusLazy animated={true} />
        </Suspense>
      </div>

      <div className='container mx-auto px-6 lg:px-12 relative z-10'>
        <div className='text-center mb-16'>
          <div className='text-xs font-mono text-gray-600 dark:text-gray-400 uppercase tracking-[0.3em] mb-4'>
            <span className='text-gray-800 dark:text-gray-400'>//</span> OPEN PROTOCOLS
          </div>
          <Typography
            variant='h2'
            className='text-4xl lg:text-5xl font-mono font-black text-gray-900 dark:text-white mb-4'
          >
            HCS{' '}
            <Typography
              variant='h2'
              gradient='brand'
              as='span'
              className='text-4xl lg:text-5xl font-mono font-black inline-block'
            >
              Standards_
            </Typography>
          </Typography>
          <Typography
            color='muted'
            className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'
          >
            Production-ready protocols for the autonomous internet
          </Typography>
        </div>

        <InteractiveShowcase
          items={allStandards}
          title=''
          MainContent={StandardMainContent}
          SidebarItem={StandardSidebarItem}
          terminalTitle='standards-browser.sh'
          rotationInterval={8000}
          className='p-0 bg-transparent'
        />

        <div className='mt-20 text-center max-w-4xl mx-auto'>
          <div className='bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-10 border border-gray-200 dark:border-gray-700'>
            <Typography
              variant='h3'
              className='text-3xl font-mono font-black text-gray-900 dark:text-white mb-4'
            >
              Start{' '}
              <Typography
                variant='h3'
                gradient='brand'
                as='span'
                className='text-3xl font-mono font-black inline-block'
              >
                Building_
              </Typography>
            </Typography>
            <Typography
              color='muted'
              className='text-base text-gray-600 dark:text-gray-300 mb-6'
            >
              Join 10 consortium members building with 15+ production standards
            </Typography>

            <div className='relative mb-6'>
              <div
                className='bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-300 dark:border-gray-600 cursor-pointer hover:border-brand-blue dark:hover:border-brand-blue transition-colors duration-200'
                onClick={() => {
                  navigator.clipboard.writeText(
                    'npm install @hashgraphonline/standards-sdk'
                  );
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                <div className='text-sm font-mono text-gray-700 dark:text-gray-300'>
                  <span className='text-green-600 dark:text-brand-green'>$</span> npm install @hashgraphonline/standards-sdk
                </div>
              </div>
              <>
                {copied && (
                  <div
                    className='absolute top-1/2 right-4 -translate-y-1/2 bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium shadow-lg'
                  >
                    Copied!
                  </div>
                )}
              </>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <PrimaryButton href='/docs/libraries/standards-sdk'>
                View Documentation →
              </PrimaryButton>
              <SecondaryButton href='https://github.com/hashgraph-online/standards-sdk'>
                GitHub ↗
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StandardsSection;
