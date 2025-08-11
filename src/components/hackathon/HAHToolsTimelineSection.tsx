import React, { useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import {
  FaCode,
  FaRobot,
  FaPlug,
  FaArrowRight,
  FaCalendarAlt,
  FaLaptopCode,
  FaVideo,
  FaFlag,
  FaHeadset,
  FaGithub,
  FaBookOpen,
  FaUserFriends,
  FaPaperPlane,
  FaExternalLinkAlt,
  FaGlobe,
  FaComments,
} from 'react-icons/fa';
import { FiTerminal, FiGitBranch } from 'react-icons/fi';
import PrimaryButton from './PrimaryButton';
import HackathonTypography from './HackathonTypography';
import ToolCard from '../ui/ToolCard';
import { TimelineItem } from './TimelineItem';
import {
  TransformCard,
  Typography,
  SidebarNavButton,
  LaptopMockup,
} from '../ui';
import MoonscapeTestingSection from '../ui/MoonscapeTestingSection';
import { Highlight } from 'prism-react-renderer';

interface Tool {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  installCommand?: string;
  visitCommand?: string;
  image?: string;
  isNew?: boolean;
  color: 'purple' | 'blue' | 'green';
  quickStart?: string;
  docsLink?: string;
}

const customLightTheme = {
  plain: {
    color: '#1a202c',
    backgroundColor: '#f9fafb',
  },
  styles: [
    {
      types: ['comment', 'block-comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#6b7280', fontStyle: 'italic' },
    },
    {
      types: ['punctuation'],
      style: { color: '#6b7280' },
    },
    {
      types: ['tag', 'attr-name', 'namespace', 'deleted'],
      style: { color: '#dc2626' },
    },
    {
      types: ['function-name'],
      style: { color: '#2563eb' },
    },
    {
      types: ['boolean', 'number', 'function'],
      style: { color: '#7c3aed' },
    },
    {
      types: ['property', 'class-name', 'constant', 'symbol'],
      style: { color: '#ea580c' },
    },
    {
      types: ['selector', 'important', 'atrule', 'keyword', 'builtin'],
      style: { color: '#0891b2' },
    },
    {
      types: ['string', 'char', 'attr-value', 'regex', 'variable'],
      style: { color: '#059669' },
    },
    {
      types: ['operator', 'entity', 'url'],
      style: { color: '#7c3aed' },
    },
    {
      types: ['at-rule', 'keyword'],
      style: { color: '#7c3aed', fontWeight: 'bold' },
    },
  ],
};

const customDarkTheme = {
  plain: {
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  styles: [
    {
      types: ['comment', 'block-comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#a1a1aa', fontStyle: 'italic' },
    },
    {
      types: ['punctuation'],
      style: { color: '#fafafa' },
    },
    {
      types: ['tag', 'attr-name', 'namespace', 'deleted'],
      style: { color: '#ff6b6b' },
    },
    {
      types: ['function-name'],
      style: { color: '#4fc3f7' },
    },
    {
      types: ['boolean', 'number', 'function'],
      style: { color: '#ba68c8' },
    },
    {
      types: ['property', 'class-name', 'constant', 'symbol'],
      style: { color: '#ffb74d' },
    },
    {
      types: ['selector', 'important', 'atrule', 'keyword', 'builtin'],
      style: { color: '#4dd0e1' },
    },
    {
      types: ['string', 'char', 'attr-value', 'regex', 'variable'],
      style: { color: '#81c784' },
    },
    {
      types: ['operator', 'entity', 'url'],
      style: { color: '#ce93d8' },
    },
    {
      types: ['at-rule', 'keyword'],
      style: { color: '#ba68c8', fontWeight: 'bold' },
    },
  ],
};

const HAHToolsTimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  React.useEffect(() => {
    const checkDarkMode = () => {
      const isDark =
        document.documentElement.classList.contains('dark') ||
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkDarkMode);
    };
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tools: Tool[] = [
    {
      icon: <FaGithub />,
      title: 'Standards SDK',
      description:
        'Access the full suite of HCS Improvement Proposals and reference implementations including the OpenConvAI SDK for Agent <> Agent communication.',
      link: 'https://hashgraphonline.com/docs/libraries/standards-sdk/',
      installCommand: 'npm install @hashgraphonline/standards-sdk',
      isNew: false,
      color: 'green',
      quickStart: `import { HCS10Client, AgentBuilder, AIAgentCapability, InboundTopicType } from '@hashgraphonline/standards-sdk';

const hcs10Client = new HCS10Client({
  network: 'testnet',
  operatorId: process.env.HEDERA_ACCOUNT_ID!,
  operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
});

const agentBuilder = new AgentBuilder()
  .setName('DataAnalysisBot')
  .setDescription('AI agent for data analysis and insights')
  .setCapabilities([AIAgentCapability.TEXT_GENERATION, AIAgentCapability.DATA_ANALYSIS])
  .setAgentType('autonomous')
  .setModel('gpt-4o')
  .setInboundTopicType(InboundTopicType.PUBLIC);

const agent = await hcs10Client.createAndRegisterAgent(agentBuilder);`,
      docsLink: '/docs/libraries/standards-sdk/',
    },
    {
      icon: <FaRobot />,
      title: 'Hedera Agent Kit',
      description:
        'AI-powered toolkit for building intelligent agents that interact with Hedera blockchain. Complete rewrite focused on developer experience with LangChain integration.',
      link: 'https://github.com/hedera-dev/hedera-agent-kit',
      installCommand:
        'npm install hedera-agent-kit @langchain/openai @hashgraph/sdk',
      isNew: true,
      color: 'purple',
      quickStart: `import { HederaLangchainToolkit } from 'hedera-agent-kit';
import { 
  coreHTSPlugin, 
  coreAccountPlugin, 
  coreConsensusPlugin, 
  coreQueriesPlugin 
} from 'hedera-agent-kit';
import { Client } from '@hashgraph/sdk';
import { ChatOpenAI } from '@langchain/openai';
import { createToolCallingAgent } from 'langchain/agents';
import { ChatPromptTemplate } from '@langchain/core/prompts';

// Initialize Hedera client
const client = Client.forTestnet();
client.setOperator(
  process.env.HEDERA_ACCOUNT_ID!,
  process.env.HEDERA_PRIVATE_KEY!
);

// Create the toolkit with AI agent capabilities
const hederaToolkit = new HederaLangchainToolkit({
  client,
  configuration: {
    plugins: [coreHTSPlugin, coreAccountPlugin, coreConsensusPlugin, coreQueriesPlugin]
  }
});

// Get available tools for the agent
const tools = hederaToolkit.getTools();

// Create AI agent with Hedera tools
const agent = createToolCallingAgent({
  llm: new ChatOpenAI({
    model: 'gpt-4',
    temperature: 0.1,
  }),
  tools,
  prompt: ChatPromptTemplate.fromMessages([
    ['system', 'You are a Hedera blockchain assistant. Help users interact with Hedera through natural language.'],
    ['human', '{input}'],
    ['placeholder', '{agent_scratchpad}']
  ])
});

// Execute agent with natural language commands
const result = await agent.invoke({
  input: 'Send 5 HBAR to account 0.0.12345 and create a topic for updates'
});

console.log('Agent result:', result.output);`,
      docsLink: 'https://github.com/hedera-dev/hedera-agent-kit',
    },
    {
      icon: <FaCode />,
      title: 'Hedera JavaScript SDK',
      description:
        'Official JavaScript SDK for interacting with Hedera and building Hedera-powered applications.',
      link: 'https://github.com/hiero-ledger/hiero-sdk-js',
      installCommand: 'npm install @hashgraph/sdk',
      color: 'blue',
      quickStart: `import { Client, TopicCreateTransaction, TopicMessageSubmitTransaction } from '@hashgraph/sdk';

const client = Client.forTestnet();
client.setOperator(
  process.env.HEDERA_ACCOUNT_ID!,
  process.env.HEDERA_PRIVATE_KEY!
);

// Create a topic for agent communication
const topicTx = await new TopicCreateTransaction()
  .setTopicMemo('AI Agent Communication Topic')
  .execute(client);

const topicId = (await topicTx.getReceipt(client)).topicId;

// Submit a message to the topic
const messageTx = await new TopicMessageSubmitTransaction()
  .setTopicId(topicId!)
  .setMessage('Hello from AI Agent!')
  .execute(client);`,
      docsLink: 'https://docs.hedera.com/hedera/sdks-and-apis/sdks',
    },
    {
      icon: <FaPlug />,
      title: 'Conversational Agent',
      description:
        'Conversational AI agent implementing Hashgraph Consensus Standards (HCS) for agent communication, registry management, and content inscription on Hedera. Built on hedera-agent-kit for comprehensive Hedera network access.',
      link: 'https://github.com/hashgraph-online/conversational-agent',
      installCommand: 'npm install @hashgraphonline/conversational-agent',
      isNew: true,
      color: 'green',
      quickStart: `import { ConversationalAgent } from '@hashgraphonline/conversational-agent';

// Initialize the conversational agent
const agent = new ConversationalAgent({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
  network: 'testnet',
  openAIApiKey: process.env.OPENAI_API_KEY!,
  openAIModelName: 'gpt-4o',
  verbose: true,
  // Optional: Add custom plugins
  additionalPlugins: [myCustomPlugin],
  // Optional: Use custom state manager
  stateManager: myCustomStateManager,
  // Optional: Configure operational mode
  operationalMode: 'autonomous', // or 'returnBytes'
});

// Initialize (automatically detects key type)
await agent.initialize();

// Process a message
const response = await agent.processMessage(
  'Register me as an AI agent with the name TestBot'
);

// Natural language commands for Hedera operations
await agent.processMessage(
  'I want to send 1 HBAR to 0.0.800'
);

// Access built-in plugins if needed
const hcs10Plugin = agent.hcs10Plugin;
const hcs2Plugin = agent.hcs2Plugin;
const inscribePlugin = agent.inscribePlugin;`,
      docsLink: '/docs/libraries/conversational-agent/',
    },
    {
      icon: <FaComments />,
      title: 'Moonscape Portal',
      description:
        'Decentralized portal for discovering, testing, and interacting with AI agents on Hedera using the OpenConvAI standard.',
      link: 'https://moonscape.tech',
      visitCommand: 'Open moonscape.tech in your browser',
      image: '/use-cases/moonscape-portal.jpg',
      color: 'blue',
      quickStart: `1. Visit moonscape.tech
2. Connect your Hedera wallet
3. Browse available AI agents
4. Start conversations with agents
5. Create your own agent profile`,
    },
    {
      icon: <FaCode />,
      title: 'Hgraph SDK',
      description:
        'Web3 data infrastructure SDK for Hedera with GraphQL API, real-time subscriptions, and token helpers.',
      link: 'https://docs.hgraph.com/category/hgraph-sdk',
      installCommand: 'npm install --save-exact @hgraph.io/sdk@latest',
      color: 'blue',
      quickStart: `import HgraphSDK from '@hgraph.io/sdk';

// Initialize with API key
const client = new HgraphSDK({
  headers: {
    'x-api-key': process.env.HGRAPH_API_KEY!,
  },
});

// Query account information
const { data } = await client.query({
  query: \`
    query GetAccount($accountId: String!) {
      account(where: { account_id: { _eq: $accountId }}) {
        account_id
        alias
        balance
        created_timestamp
        memo
      }
    }
  \`,
  variables: { accountId: '0.0.12345' }
});

// Subscribe to real-time token transfers
const subscription = client.subscribe({
  query: \`
    subscription TokenTransfers($tokenId: String!) {
      token_transfer_stream(
        where: { token_id: { _eq: $tokenId }}
        limit: 10
      ) {
        from_account_id
        to_account_id
        amount
        consensus_timestamp
      }
    }
  \`,
  variables: { tokenId: '0.0.1234567' }
}, {
  next: ({ data }) => console.log('Transfer:', data),
  error: (err) => console.error('Error:', err),
  complete: () => console.log('Subscription complete')
});`,
      docsLink: 'https://docs.hgraph.com/category/hgraph-sdk',
    },
    {
      icon: <FaRobot />,
      title: 'Memejob SDK',
      description:
        'TypeScript SDK for launching and trading Hedera tokens through the memejob protocol - perfect for AI agents managing meme tokens.',
      link: 'https://github.com/buidler-labs/memejob-sdk-js',
      installCommand: 'npm install @buidler-labs/memejob-sdk-js',
      isNew: true,
      color: 'green',
      quickStart: `import { AccountId, ContractId, PrivateKey } from "@hashgraph/sdk";
import {
  CONTRACT_DEPLOYMENTS,
  createAdapter,
  getChain,
  MJClient,
  NativeAdapter,
} from "@buidlerlabs/memejob-sdk-js";

// Initialize the Memejob client
const contractId = ContractId.fromString(
  CONTRACT_DEPLOYMENTS.mainnet.contractId
);

const client = new MJClient(
  createAdapter(NativeAdapter, {
    operator: {
      accountId: AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!),
      privateKey: PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY!),
    },
  }),
  {
    chain: getChain("mainnet"),
    contractId,
  }
);

// Create a meme token
const tokenInfo = {
  name: "AI Agent Token",
  symbol: "AIAGENT",
  memo: "ipfs://QmYourTokenMetadataCID",
};

const token = await client.createToken(tokenInfo, {
  amount: 100000000000n,
  distributeRewards: true,
  referrer: "0x000...000",
});

console.log('Token created:', token);

// Buy tokens from the bonding curve
const buyResult = await token.buy({
  amount: 100000000000000n, // Amount in smallest unit
  referrer: "0x000...000"
});

console.log('Buy result:', buyResult.status);
console.log('Tokens bought:', buyResult.amount);

// Sell tokens back to the curve
const sellResult = await token.sell({
  amount: 50000000000000n, // Amount to sell
  instant: true,
});

console.log('Sell result:', sellResult.status);
console.log('Tokens sold:', sellResult.amount);`,
      docsLink: 'https://github.com/buidler-labs/memejob-sdk-js',
    },
    {
      icon: <FaRobot />,
      title: 'Standards AgentKit',
      description:
        'A langchain-based toolkit which implements HCS standards. Can be used directly or through the Conversational Agent.',
      link: '/docs/libraries/standards-agent-kit/',
      installCommand: 'npm install @hashgraphonline/standards-agent-kit',
      isNew: false,
      color: 'purple',
      quickStart: `import { initializeStandardsAgentKit } from '@hashgraphonline/standards-agent-kit';

const { hederaKit, hcs10Builder, tools, stateManager } = await initializeStandardsAgentKit({
  clientConfig: {
    operatorId: process.env.HEDERA_ACCOUNT_ID!,
    operatorKey: process.env.HEDERA_PRIVATE_KEY!,
    network: 'testnet'
  },
  createAllTools: true
});

// Register an agent
const result = await tools.registerAgentTool.invoke({
  name: 'My AI Agent',
  description: 'An autonomous AI agent for data analysis',
  capabilities: [0] // TEXT_GENERATION
});`,
      docsLink: '/docs/libraries/standards-agent-kit/',
    },
  ];

  const timeline = [
    {
      icon: <FaBookOpen />,
      date: 'Now - August 1st, 2025',
      title: 'Registration Open',
      description:
        'Register early for the hackathon to get access to exclusive workshops and resources.',
      isHighlighted: true,
    },
    {
      icon: <FaHeadset />,
      date: 'Now - September 30th, 2025',
      title: 'Weekly X Spaces & Workshops',
      description:
        'Join us every Thursday at 10am EDT for Hedera x AI X Spaces, plus hands-on workshops and tutorials.',
      isHighlighted: true,
    },
    {
      icon: <FaFlag />,
      date: 'August 1st, 2025',
      title: 'Hackathon Kickoff',
      description:
        'Official opening of the AI Track with introduction to the challenges, tools, and resources.',
    },
    {
      icon: <FaLaptopCode />,
      date: 'August 1st - September 30th, 2025',
      title: 'Building Phase',
      description:
        'Two months to build innovative AI agents on Hedera with support from technical mentors.',
    },
    {
      icon: <FaUserFriends />,
      date: 'Early September 2025',
      title: 'Midpoint Check-in',
      description:
        'Optional progress review with mentors to receive feedback and guidance for the final stretch.',
    },
    {
      icon: <FaVideo />,
      date: 'September 30th, 2025',
      title: 'Submission Deadline',
      description:
        'Final projects must be submitted, including code, documentation, and video demo.',
    },
    {
      icon: <FaCalendarAlt />,
      date: 'November 2025',
      title: 'Winners Announced',
      description:
        'Top projects will be announced and winners will receive their prizes.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className='py-24 sm:py-32 relative bg-white dark:bg-black overflow-hidden'
      id='tools-timeline'
    >
      <div className='absolute inset-0'>
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: 'linear',
          }}
          className='absolute -top-1/2 -right-1/2 w-full h-full'
        >
          <div className='w-full h-full bg-gradient-conic from-[#a679f0]/20 via-transparent to-[#5599fe]/20 blur-3xl' />
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='absolute bottom-0 left-0 w-96 h-96 bg-[#48df7b]/20 rounded-full blur-3xl'
        />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='mb-24'>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#48df7b]/10 to-[#a679f0]/10 dark:from-[#48df7b]/20 dark:to-[#a679f0]/20 border border-[#48df7b]/20 dark:border-[#48df7b]/30 mb-6'
            >
              <FaCode className='text-[#48df7b] mr-2' />
              <span className='text-sm font-bold text-[#48df7b] dark:text-[#a679f0]'>
                DEVELOPER RESOURCES
              </span>
            </motion.div>

            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
              <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
                Essential Tools for AI Development
              </span>
            </h2>

            <p className='text-base text-gray-600 dark:text-white/70 max-w-3xl mx-auto'>
              Everything you need to build autonomous AI solutions on Hedera.
              From SDKs to integration plugins, we've got you covered.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='max-w-5xl mx-auto mb-16'
          >
            <div className='bg-white dark:bg-gray-900 rounded-xl lg:rounded-3xl shadow-2xl ring-1 ring-gray-200/50 dark:ring-gray-600 overflow-hidden backdrop-blur-xl'>
              <div className='bg-gray-100 dark:bg-gray-800 px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200/30 dark:border-gray-700'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2 lg:gap-4 min-w-0'>
                    <div className='flex gap-1 lg:gap-1.5 flex-shrink-0'>
                      <div className='w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-brand-purple'></div>
                      <div className='w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-brand-blue'></div>
                      <div className='w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-green-400'></div>
                    </div>
                    <div className='text-xs lg:text-sm font-mono text-gray-600 dark:text-white/60 truncate'>
                      ai-developer-tools.dev
                    </div>
                  </div>
                  <div className='flex items-center gap-3 flex-shrink-0'>
                    <div className='px-2 py-1 rounded text-xs font-mono bg-[#48df7b]/20 dark:bg-[#48df7b]/20 text-[#2a7e4a] dark:text-[#48df7b] font-semibold whitespace-nowrap'>
                      {tools.length} tools available
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-col lg:flex-row min-h-[480px] overflow-hidden'>
                <div className='w-full lg:w-80 lg:min-w-[20rem] lg:max-w-[20rem] lg:flex-shrink-0 bg-white dark:bg-gray-900 border-b lg:border-b-0 lg:border-r border-gray-200/30 dark:border-gray-700'>
                  <div className='px-4 py-3 border-b border-gray-200/30 dark:border-gray-700'>
                    <div className='flex items-center gap-2 text-sm font-mono text-gray-600 dark:text-white/60'>
                      <FiGitBranch className='w-4 h-4 flex-shrink-0 text-white/60' />
                      <span className='truncate'>tool directory</span>
                      <div className='w-2 h-2 rounded-full animate-pulse bg-[#48df7b] flex-shrink-0'></div>
                    </div>
                  </div>

                  <div className='p-2 space-y-1 bg-white dark:bg-gray-900 overflow-y-auto max-h-96 lg:max-h-none lg:h-full'>
                    {tools.map((tool, index) => (
                      <SidebarNavButton
                        key={index}
                        isActive={activeToolIndex === index}
                        onClick={() => setActiveToolIndex(index)}
                        className='p-3'
                      >
                        <div className='flex items-start gap-3 min-w-0'>
                          <div
                            className='w-8 h-8 rounded-lg flex items-center justify-center text-sm text-white flex-shrink-0'
                            style={{
                              background:
                                tool.color === 'purple'
                                  ? 'linear-gradient(135deg, #a679f0, #5599fe)'
                                  : tool.color === 'green'
                                  ? 'linear-gradient(135deg, #48df7b, #54ae70)'
                                  : 'linear-gradient(135deg, #5599fe, #48df7b)',
                            }}
                          >
                            {tool.icon}
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-start gap-2'>
                              <h3
                                className={`text-sm font-semibold transition-colors truncate ${
                                  activeToolIndex === index
                                    ? 'text-gray-900 dark:text-white'
                                    : 'text-gray-700 dark:text-white/80'
                                }`}
                              >
                                {tool.title}
                              </h3>
                              {tool.isNew && (
                                <span className='text-xs px-1.5 rounded-full bg-[#48df7b]/20 text-[#48df7b] font-bold flex-shrink-0'>
                                  NEW
                                </span>
                              )}
                            </div>
                            <p
                              className={`text-xs line-clamp-2 transition-colors -mt-1 ${
                                activeToolIndex === index
                                  ? 'text-gray-600 dark:text-white/90'
                                  : 'text-gray-500 dark:text-white/60'
                              }`}
                            >
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      </SidebarNavButton>
                    ))}
                  </div>
                </div>

                <div className='flex-1 min-w-0 max-w-full p-4 lg:p-6 xl:p-8 bg-white dark:bg-gray-900 overflow-auto'>
                  <motion.div
                    key={activeToolIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className='mb-6'>
                      <div className='flex items-center gap-2 mb-2'>
                        {tools[activeToolIndex].isNew && (
                          <span className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#48df7b]/10 text-[#48df7b] border border-[#48df7b]/20'>
                            NEW
                          </span>
                        )}
                      </div>
                      <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>
                        {tools[activeToolIndex].title}
                      </h2>
                      <p className='text-base text-gray-600 dark:text-white/70 leading-relaxed'>
                        {tools[activeToolIndex].description}
                      </p>
                    </div>

                    {tools[activeToolIndex].image && (
                      <div className='mb-6'>
                        <img
                          src={tools[activeToolIndex].image}
                          alt={tools[activeToolIndex].title}
                          className='w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg'
                        />
                      </div>
                    )}

                    {tools[activeToolIndex].installCommand && (
                      <div className='mb-8'>
                        <h3 className='text-sm font-medium text-gray-500 dark:text-white/60 mb-3'>
                          QUICK INSTALL
                        </h3>
                        <div className='relative group'>
                          <div className='absolute inset-0 bg-gradient-to-r from-[#a679f0]/20 via-[#5599fe]/20 to-[#48df7b]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                          <div
                            onClick={() =>
                              copyToClipboard(
                                tools[activeToolIndex].installCommand!
                              )
                            }
                            className='relative overflow-hidden bg-gray-100 dark:bg-black rounded-xl border border-gray-200/50 dark:border-white/20 hover:border-gray-300/50 dark:hover:border-white/30 transition-all cursor-pointer backdrop-blur-sm'
                          >
                            <div className='flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-black border-b border-gray-200/50 dark:border-white/20'>
                              <div className='flex items-start gap-2'>
                                <div className='flex gap-1.5'>
                                  <div className='w-3 h-3 rounded-full bg-brand-purple' />
                                  <div className='w-3 h-3 rounded-full bg-brand-blue' />
                                  <div className='w-3 h-3 rounded-full bg-green-400' />
                                </div>
                                <FiTerminal className='w-3 h-3 text-white/60' />
                              </div>
                              <div className='flex items-start gap-2'>
                                {copied ? (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className='flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/20 text-green-500'
                                  >
                                    <svg
                                      className='w-3 h-3'
                                      fill='currentColor'
                                      viewBox='0 0 20 20'
                                    >
                                      <path
                                        fillRule='evenodd'
                                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                        clipRule='evenodd'
                                      />
                                    </svg>
                                    <span className='text-xs font-medium'>
                                      Copied!
                                    </span>
                                  </motion.div>
                                ) : (
                                  <div className='flex items-center gap-1.5 px-2 py-0.5 rounded text-gray-500 hover:text-gray-400 hover:bg-gray-800/50 transition-all'>
                                    <svg
                                      className='w-3 h-3'
                                      fill='none'
                                      stroke='currentColor'
                                      viewBox='0 0 24 24'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                                      />
                                    </svg>
                                    <span className='text-xs font-medium'>
                                      Copy
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className='p-4 bg-gray-50 dark:bg-black'>
                              <div className='flex items-center gap-3 font-mono text-sm'>
                                <span className='text-green-600 dark:text-green-400'>
                                  $
                                </span>
                                <code className='text-gray-900 dark:text-white/80'>
                                  {tools[activeToolIndex].installCommand}
                                </code>
                                <motion.span
                                  animate={{ opacity: [1, 0] }}
                                  transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                  }}
                                  className='inline-block w-2 h-4 bg-gray-600 dark:bg-white/70'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {tools[activeToolIndex].visitCommand && (
                      <div className='mb-8'>
                        <h3 className='text-sm font-medium text-gray-500 dark:text-white/60 mb-3'>
                          HOW TO ACCESS
                        </h3>
                        <div className='bg-gray-100 dark:bg-black rounded-xl border border-gray-200/50 dark:border-white/20 p-4 backdrop-blur-sm'>
                          <div className='flex items-center gap-3'>
                            <FaGlobe className='w-5 h-5 text-[#5599fe]' />
                            <span className='text-base text-gray-900 dark:text-white'>
                              {tools[activeToolIndex].visitCommand}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {tools[activeToolIndex].quickStart && (
                      <div className='mb-8'>
                        <h3 className='text-sm font-medium text-gray-500 dark:text-white/60 mb-3'>
                          QUICK START
                        </h3>
                        <div className='bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black overflow-hidden rounded-xl border border-gray-200/50 dark:border-white/20'>
                          <Highlight
                            theme={
                              isDarkMode ? customDarkTheme : customLightTheme
                            }
                            code={tools[activeToolIndex].quickStart!}
                            language='typescript'
                          >
                            {({
                              className,
                              style,
                              tokens,
                              getLineProps,
                              getTokenProps,
                            }) => (
                              <pre
                                className={`${className} p-4 text-sm font-mono leading-relaxed overflow-x-auto`}
                                style={{
                                  ...style,
                                  backgroundColor: 'transparent',
                                  margin: 0,
                                }}
                              >
                                {tokens.map((line, i) => (
                                  <div
                                    key={i}
                                    {...getLineProps({ line })}
                                    className='hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200'
                                  >
                                    {line.map((token, key) => (
                                      <span
                                        key={key}
                                        {...getTokenProps({ token })}
                                      />
                                    ))}
                                  </div>
                                ))}
                              </pre>
                            )}
                          </Highlight>
                        </div>
                      </div>
                    )}

                    <div className='flex flex-col sm:flex-row gap-4 flex-wrap'>
                      {tools[activeToolIndex].link !== '#' ? (
                        <PrimaryButton
                          href={tools[activeToolIndex].link}
                          target='_blank'
                          rel='noopener noreferrer'
                          icon={<FaExternalLinkAlt />}
                        >
                          Explore {tools[activeToolIndex].title}
                        </PrimaryButton>
                      ) : (
                        <button
                          disabled
                          className='px-6 py-3 bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-white/40 rounded-xl font-medium cursor-not-allowed'
                        >
                          Coming Soon
                        </button>
                      )}

                      {tools[activeToolIndex].docsLink &&
                        tools[activeToolIndex].docsLink !==
                          tools[activeToolIndex].link && (
                          <PrimaryButton
                            href={tools[activeToolIndex].docsLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            icon={<FaBookOpen />}
                          >
                            Documentation
                          </PrimaryButton>
                        )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className='mt-8 text-center'>
            <a
              href='https://github.com/hashgraph-online'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 text-sm text-gray-600 dark:text-white/60 hover:text-[#5599fe] dark:hover:text-[#48df7b] transition-colors'
            >
              <span>More developer resources</span>
              <FaArrowRight className='w-3 h-3' />
            </a>
          </div>
        </div>

        <MoonscapeTestingSection variant="hackathon" />

        <div className='mt-12 md:mt-16'>
          <motion.div
            className='text-center mb-8'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#5599fe]/10 to-[#48df7b]/10 dark:from-[#5599fe]/20 dark:to-[#48df7b]/20 border border-[#5599fe]/20 dark:border-[#5599fe]/30 mb-6'
            >
              <FaCalendarAlt className='text-[#5599fe] mr-2' />
              <span className='text-sm font-bold text-[#5599fe] dark:text-[#48df7b]'>
                EVENT SCHEDULE
              </span>
            </motion.div>

            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
              <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
                Hackathon Timeline
              </span>
            </h2>

            <p className='text-base text-gray-600 dark:text-white/70 max-w-3xl mx-auto'>
              Mark your calendar with these important dates for the AI Track at
              Hedera Africa Hackathon.
            </p>
          </motion.div>

          <div className='relative max-w-4xl mx-auto'>
            <motion.div
              className='absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full'
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                background:
                  'linear-gradient(180deg, #a679f0 0%, #5599fe 50%, #48df7b 100%)',
                transformOrigin: 'top',
              }}
            />

            {/* Start dot */}
            <motion.div
              className='absolute w-2 h-2 rounded-full'
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{
                backgroundColor: '#a679f0',
                top: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />

            {/* End dot */}
            <motion.div
              className='absolute w-2 h-2 rounded-full'
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.8 }}
              style={{
                backgroundColor: '#48df7b',
                bottom: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />

            {/* Responsive dots for desktop */}
            <motion.div
              className='hidden md:block absolute w-2 h-2 rounded-full'
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{
                backgroundColor: '#a679f0',
                top: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />

            <motion.div
              className='hidden md:block absolute w-2 h-2 rounded-full'
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.8 }}
              style={{
                backgroundColor: '#48df7b',
                bottom: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />

            <div className='space-y-4 md:-space-y-8'>
              {timeline.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                  style={{ zIndex: timeline.length - index }}
                >
                  <div
                    className='absolute left-8 md:left-1/2 transform md:-translate-x-1/2 pointer-events-none'
                    style={{ zIndex: 100 }}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-4 ring-2 ring-white ${
                        event.isHighlighted
                          ? 'bg-white border-[#a679f0]'
                          : 'bg-white border-[#5599fe]'
                      }`}
                      style={{
                        boxShadow: event.isHighlighted
                          ? '0 4px 12px rgba(0, 0, 0, 0.15), 0 0 20px rgba(166, 121, 240, 0.5)'
                          : '0 4px 12px rgba(0, 0, 0, 0.15), 0 0 20px rgba(85, 153, 254, 0.5)',
                      }}
                    />
                  </div>

                  <div
                    className={`ml-16 md:ml-0 ${
                      index % 2 === 0
                        ? 'md:mr-auto md:pr-12'
                        : 'md:ml-auto md:pl-12'
                    } md:w-[52%]`}
                  >
                    <TransformCard
                      rotation={`rotate-[${
                        index % 2 === 0 ? '-0.5' : '0.5'
                      }deg]`}
                      background={
                        event.isHighlighted
                          ? 'bg-gradient-to-br from-[#a679f0]/10 to-[#5599fe]/10 dark:from-[#a679f0]/20 dark:to-[#5599fe]/20'
                          : 'bg-white dark:bg-black'
                      }
                      border={`border ${
                        event.isHighlighted
                          ? 'border-[#a679f0]/20'
                          : 'border-gray-200 dark:border-white/20'
                      }`}
                      shadow='lg'
                      className='p-4 md:p-5 hover:scale-[1.02] transition-all duration-300'
                    >
                      <div className='flex items-start gap-4'>
                        <div
                          className='w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0'
                          style={{
                            background: event.isHighlighted
                              ? 'linear-gradient(135deg, #a679f0, #5599fe)'
                              : 'linear-gradient(135deg, #5599fe, #48df7b)',
                          }}
                        >
                          {event.icon}
                        </div>
                        <div className='flex-grow'>
                          <div className='text-xs font-bold text-[#a679f0] uppercase tracking-wide mb-1'>
                            {event.date}
                          </div>
                          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                            {event.title}
                          </h3>
                          <p className='text-sm text-gray-600 dark:text-white/70'>
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </TransformCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HAHToolsTimelineSection;
