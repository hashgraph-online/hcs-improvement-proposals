import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCode,
  FaRobot,
  FaTerminal,
  FaPlay,
  FaCopy,
  FaCheck,
  FaArrowRight,
  FaGithub,
} from 'react-icons/fa';
import { TransformCard, SidebarNavButton } from '../ui';
import PrimaryButton from './PrimaryButton';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  icon: React.ReactNode;
  color: 'purple' | 'blue' | 'green';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
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

const HAHCodeExamplesSection: React.FC = () => {
  const [activeExample, setActiveExample] = useState(0);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const examples: CodeExample[] = [
    {
      id: 'agent-registration',
      title: 'Agent Registration',
      description:
        'Register your AI agent on the Hedera network using AgentBuilder',
      language: 'typescript',
      difficulty: 'Beginner',
      color: 'purple',
      icon: <FaRobot />,
      code: `import { HCS10Client, AgentBuilder, Logger } from '@hashgraphonline/standards-sdk';

/**
 * Register an AI agent on Hedera using the HCS-10 standard
 * This creates a new Hedera account, topics, and registers the agent
 */
const logger = new Logger({
  module: 'MyAIAgent',
  level: 'debug',
  prettyPrint: true,
});

// Initialize the base client
const baseClient = new HCS10Client({
  network: 'testnet',
  operatorId: process.env.HEDERA_ACCOUNT_ID!,
  operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
});

// Create and register your AI agent
const agent = await new AgentBuilder()
  .setName('DataAnalysisBot')
  .setDescription('AI Assistant specializing in data analysis and insights')
  .setTags(['ai-agent', 'data-analysis', 'hedera-africa-hackathon'])
  .setRegistryUrl(process.env.REGISTRY_URL)
  .build(baseClient);

logger.info('🤖 Agent registered successfully!');
logger.info(\`Account ID: \${agent.accountId}\`);
logger.info(\`Inbound Topic: \${agent.inboundTopicId}\`);
logger.info(\`Outbound Topic: \${agent.outboundTopicId}\`);

// IMPORTANT: Save these credentials securely!
// agent.client.operatorPrivateKey contains the private key`,
    },
    {
      id: 'connection-handling',
      title: 'Connection Management',
      description: 'Handle connection requests with optional fee configuration',
      language: 'typescript',
      difficulty: 'Intermediate',
      color: 'blue',
      icon: <FaTerminal />,
      code: `import { 
  monitorIncomingRequests, 
  FeeConfigBuilder,
  Logger 
} from '@hashgraphonline/standards-sdk';

/**
 * Set up connection monitoring with different fee configurations
 */

// Option 1: No fees - accept all connections
monitorIncomingRequests(
  baseClient,
  agent.client, 
  agent.inboundTopicId,
  logger
);

// Option 2: Simple HBAR fee
monitorIncomingRequests(
  baseClient,
  agent.client, 
  agent.inboundTopicId,
  logger,
  new FeeConfigBuilder({ network: 'testnet', logger })
    .addHbarFee(1, agent.accountId) // 1 HBAR to agent
    .build()
);

// Option 3: Complex fee structure
const feeConfig = new FeeConfigBuilder({ network: 'testnet', logger })
  .addHbarFee(0.5, agent.accountId) // 0.5 HBAR to agent
  .addHbarFee(0.5, '0.0.800') // 0.5 HBAR to platform
  .addTokenFee(100, '0.0.123456', agent.accountId) // 100 tokens
  .build();

monitorIncomingRequests(
  baseClient,
  agent.client, 
  agent.inboundTopicId,
  logger,
  feeConfig
);

// Initiating connections to other agents
const targetOperatorId = '0.0.4567890@0.0.3456789';
const connection = await agent.client.initiateConnection(
  targetOperatorId,
  'Hello! I\'d like to connect to discuss AI collaborations.'
);

logger.info(\`Connected on topic: \${connection.connectionTopicId}\`);`,
    },
    {
      id: 'message-exchange',
      title: 'Message Exchange',
      description:
        'Send and receive messages between agents with automatic chunking',
      language: 'typescript',
      difficulty: 'Intermediate',
      color: 'green',
      icon: <FaCode />,
      code: `import { monitorMessages } from '@hashgraphonline/standards-sdk';

/**
 * Send messages and monitor for incoming messages
 */

// Send a simple text message
await agent.client.sendMessage(
  connectionTopicId,
  'Hey! Let\'s collaborate on analyzing this dataset.'
);

// Send structured data (automatically chunked if > 1KB)
const analysisRequest = {
  type: 'data_analysis_request',
  dataset: 'african_tech_startups_2025',
  metrics: ['growth_rate', 'funding_rounds', 'employee_count'],
  timeframe: { start: '2024-01', end: '2025-01' },
  format: 'json'
};

await agent.client.sendMessage(
  connectionTopicId,
  JSON.stringify(analysisRequest),
  'Data analysis request' // Optional description
);

// Monitor for incoming messages
monitorMessages(connectionTopicId, agent.client, async (message) => {
  logger.info('📨 New message received:');
  logger.info(\`From: \${message.operator_id}\`);
  logger.info(\`Content: \${message.data}\`);
  
  // Parse and handle different message types
  try {
    const parsed = JSON.parse(message.data);
    
    switch (parsed.type) {
      case 'data_analysis_response':
        logger.info('📊 Analysis complete:', parsed.results);
        break;
        
      case 'collaboration_request':
        logger.info('🤝 New collaboration opportunity:', parsed.details);
        break;
        
      default:
        logger.info('💬 Chat message:', message.data);
    }
  } catch {
    // Plain text message
    logger.info('💬 Chat message:', message.data);
  }
});`,
    },
    {
      id: 'langchain-integration',
      title: 'LangChain Integration',
      description: 'Build autonomous AI agents with LangChain and HCS-10 tools',
      language: 'typescript',
      difficulty: 'Advanced',
      color: 'purple',
      icon: <FaRobot />,
      code: `import { initializeHCS10Client } from '@hashgraphonline/standards-agent-kit';
import { createOpenAIFunctionsAgent } from 'langchain/agents';
import { ChatOpenAI } from '@langchain/openai';
import { AgentExecutor } from 'langchain/agents';
import { OpenConvaiState } from '@hashgraphonline/standards-agent-kit';

/**
 * Create an autonomous AI agent using LangChain and HCS-10 tools
 */

// Initialize HCS-10 with all available tools
const { client, tools, stateManager } = await initializeHCS10Client({
  clientConfig: {
    network: 'testnet',
    operatorId: process.env.HEDERA_ACCOUNT_ID!,
    operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
    logLevel: 'info',
  },
  stateManager: new OpenConvaiState(),
  createAllTools: true,
  monitoringClient: true,
});

// Available tools include:
// - findRegistrationsTool: Search for agents by tags/name
// - initiateConnectionTool: Connect to other agents
// - sendMessageToConnectionTool: Send messages
// - checkMessagesTool: Check for new messages
// - connectionMonitorTool: Monitor for connection requests

const toolsList = Object.values(tools).filter(Boolean);

// Create the LangChain agent
const llm = new ChatOpenAI({
  model: 'gpt-4',
  temperature: 0.7,
});

const agent = await createOpenAIFunctionsAgent({
  llm,
  tools: toolsList,
  prompt: \`You are DataBot, an AI agent specializing in data analysis.
  You can find and connect with other agents on Hedera to collaborate.
  Use your tools to establish connections and exchange insights.
  Always be professional and focus on providing value.\`,
});

const agentExecutor = new AgentExecutor({
  agent,
  tools: toolsList,
  verbose: true,
});

// Example: Autonomous collaboration
const result = await agentExecutor.invoke({
  input: 'Find AI agents tagged with "data-analysis" and start a conversation about African tech ecosystem trends.',
});

logger.info('Agent result:', result.output);`,
    },
    {
      id: 'transaction-agent',
      title: 'Transaction Agent',
      description:
        'Build an AI agent that can process natural language transaction requests',
      language: 'typescript',
      difficulty: 'Advanced',
      color: 'green',
      icon: <FaRobot />,
      code: `import { ConversationalAgent } from '@hashgraphonline/conversational-agent';
import { ScheduleCreateTransaction } from '@hashgraph/sdk';

/**
 * Create a transaction-processing AI agent
 */

// Process incoming message from user
const handleTransactionRequest = async (
  message: string,
  userAccountId: string,
  connectionTopicId: string
) => {
  // Create conversational agent for this user
  const hederaAgent = new ConversationalAgent({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    privateKey: process.env.HEDERA_PRIVATE_KEY!,
    network: 'testnet',
    openAIApiKey: process.env.OPENAI_API_KEY!,
    operationalMode: 'returnBytes',
    userAccountId,
    verbose: false
  });
  
  await hederaAgent.initialize();
  
  logger.info('🤖 Processing:', message);
  
  // Process natural language request
  const response = await hederaAgent.processMessage(message);
  
  // Handle response based on type
  if (response.response && !response.transactionBytes) {
    // Informational response
    await agent.client.sendMessage(
      connectionTopicId,
      response.response
    );
  }
  
  if (response.transactionBytes) {
    // Create scheduled transaction for user approval
    const transaction = ScheduleCreateTransaction.fromBytes(
      Buffer.from(response.transactionBytes, 'base64')
    );
    
    await agent.client.sendTransaction(
      connectionTopicId,
      transaction,
      '✅ Transaction ready for your approval',
      { schedulePayerAccountId: userAccountId }
    );
    
    logger.info('📤 Transaction sent for approval');
  }
};

// Example usage:
// "I want to send 10 HBAR to 0.0.12345"
// "Create a new token called AfricaCoin with 1M supply"
// "Schedule a recurring payment of 5 HBAR every week"`,
    },
    {
      id: 'hgraph-data-access',
      title: 'Hgraph Data Access',
      description:
        'Query Hedera network data using Hgraph SDK with GraphQL for building data-driven AI agents',
      language: 'typescript',
      difficulty: 'Intermediate',
      color: 'blue',
      icon: <FaCode />,
      code: `import HgraphSDK from '@hgraph.io/sdk';
import { Logger } from '@hashgraphonline/standards-sdk';

/**
 * Use Hgraph SDK to access Hedera network data for your AI agent
 * Perfect for agents that need to analyze on-chain activity
 */

const logger = new Logger({ module: 'DataAgent', level: 'info' });

// Initialize Hgraph client
const hgraph = new HgraphSDK({
  headers: {
    'x-api-key': process.env.HGRAPH_API_KEY!,
  },
});

// Query account data with token balances
const getAccountAnalysis = async (accountId: string) => {
  const { data } = await hgraph.query({
    query: \`
      query AccountAnalysis($accountId: String!) {
        account(where: { account_id: { _eq: $accountId }}) {
          account_id
          alias
          balance
          created_timestamp
          max_automatic_token_associations
          ethereum_nonce
          
          # Token holdings
          account_balance {
            token_id
            balance
            token {
              name
              symbol
              decimals
              total_supply
            }
          }
          
          # Recent activity
          crypto_transfer(
            limit: 10
            order_by: { consensus_timestamp: desc }
          ) {
            consensus_timestamp
            amount
            entity_id
            transfers
          }
        }
      }
    \`,
    variables: { accountId }
  });

  return data.account[0];
};

// Monitor token transfers in real-time
const monitorTokenActivity = (tokenId: string) => {
  const subscription = hgraph.subscribe({
    query: \`
      subscription TokenActivity($tokenId: String!) {
        token_transfer_stream(
          where: { token_id: { _eq: $tokenId }}
          order_by: { consensus_timestamp: desc }
          limit: 100
        ) {
          from_account_id
          to_account_id
          amount
          consensus_timestamp
          transaction {
            charged_tx_fee
            max_fee
            memo
            result
          }
        }
      }
    \`,
    variables: { tokenId }
  }, {
    next: ({ data }) => {
      const transfers = data.token_transfer_stream;
      
      // Analyze transfer patterns for AI insights
      transfers.forEach(transfer => {
        logger.info(\`Transfer detected: \${transfer.amount} tokens\`);
        logger.info(\`From: \${transfer.from_account_id} To: \${transfer.to_account_id}\`);
        
        // Your AI agent can process this data
        // e.g., detect whale movements, analyze trading patterns
      });
    },
    error: (err) => logger.error('Subscription error:', err),
    complete: () => logger.info('Subscription completed')
  });
  
  return subscription;
};

// Query NFT ownership for AI-powered recommendations
const getNFTPortfolio = async (accountId: string) => {
  const { data } = await hgraph.query({
    query: \`
      query NFTPortfolio($accountId: String!) {
        nft(
          where: { account_id: { _eq: $accountId }}
          order_by: { token_id: asc, serial_number: asc }
        ) {
          token_id
          serial_number
          metadata
          spender
          token {
            name
            symbol
            total_supply
            metadata
            custom_fee {
              amount
              collector_account_id
            }
          }
        }
      }
    \`,
    variables: { accountId }
  });
  
  return data.nft;
};

// Example: AI agent analyzing account behavior
export async function analyzeAccountForAI(accountId: string) {
  logger.info(\`🔍 Analyzing account \${accountId}...\`);
  
  const accountData = await getAccountAnalysis(accountId);
  const nftPortfolio = await getNFTPortfolio(accountId);
  
  // Build AI-ready profile
  const profile = {
    accountId,
    hbarBalance: accountData.balance,
    tokenCount: accountData.account_balance?.length || 0,
    nftCount: nftPortfolio.length,
    accountAge: new Date().getTime() - new Date(accountData.created_timestamp).getTime(),
    tokens: accountData.account_balance?.map(tb => ({
      id: tb.token_id,
      name: tb.token.name,
      balance: tb.balance,
      value: calculateTokenValue(tb) // Your valuation logic
    })) || [],
    recentActivity: accountData.crypto_transfer
  };
  
  logger.info('✅ Analysis complete:', profile);
  return profile;
}`,
    },
  ];

  const copyToClipboard = async (code: string, exampleId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedStates((prev) => ({ ...prev, [exampleId]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [exampleId]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <section className='pt-8 pb-24 sm:pt-12 sm:pb-32 relative bg-white dark:bg-gray-900 overflow-hidden'>
      <div className='absolute inset-0'>
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className='absolute inset-0 opacity-[0.02] dark:opacity-[0.05]'
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(166, 121, 240, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 70%, rgba(85, 153, 254, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 40% 90%, rgba(72, 223, 123, 0.08) 0%, transparent 50%)`,
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
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
            className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#5599fe]/10 to-[#48df7b]/10 dark:from-[#5599fe]/20 dark:to-[#48df7b]/20 border border-[#5599fe]/20 dark:border-[#5599fe]/30 mb-6'
          >
            <FaCode className='text-[#5599fe] mr-2' />
            <span className='text-sm font-bold text-[#5599fe] dark:text-[#48df7b]'>
              QUICK START GUIDE
            </span>
          </motion.div>

          <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
            <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
              Code Examples
            </span>
          </h2>

          <p className='text-base text-gray-600 dark:text-white/70 max-w-3xl mx-auto'>
            Get started quickly with these practical examples. From basic setup
            to advanced AI agent integrations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='max-w-7xl mx-auto'
        >
          <div className='bg-white dark:bg-gray-900 rounded-3xl shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 overflow-hidden'>
            <div className='bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
              <div className='flex items-center gap-3'>
                <FaTerminal className='text-[#5599fe] text-xl' />
                <span className='text-lg font-semibold text-gray-900 dark:text-white'>
                  AI Agent Development Examples
                </span>
              </div>
            </div>

            <div className='flex flex-col lg:flex-row'>
              <div className='lg:w-1/3 lg:flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700'>
                <div className='p-2'>
                  {examples.map((example, index) => (
                    <SidebarNavButton
                      key={example.id}
                      isActive={activeExample === index}
                      onClick={() => setActiveExample(index)}
                      className='p-4 mb-2'
                    >
                      <div className='flex items-start gap-3'>
                        <div
                          className='w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0'
                          style={{
                            background:
                              example.color === 'purple'
                                ? 'linear-gradient(135deg, #a679f0, #5599fe)'
                                : example.color === 'green'
                                ? 'linear-gradient(135deg, #48df7b, #54ae70)'
                                : 'linear-gradient(135deg, #5599fe, #48df7b)',
                          }}
                        >
                          {example.icon}
                        </div>
                        <div className='flex-1'>
                          <div className='flex items-start gap-2'>
                            <h3
                              className={`text-sm font-semibold transition-colors ${
                                activeExample === index
                                  ? 'text-gray-900 dark:text-white'
                                  : 'text-gray-700 dark:text-white/80'
                              }`}
                            >
                              {example.title}
                            </h3>
                            <span
                              className={`text-xs px-2 rounded-full font-medium ${
                                example.difficulty === 'Beginner'
                                  ? 'bg-green-100 text-green-700 dark:bg-green-400/20 dark:text-green-400'
                                  : example.difficulty === 'Intermediate'
                                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-400/20 dark:text-yellow-400'
                                  : 'bg-red-100 text-red-700 dark:bg-red-400/20 dark:text-red-400'
                              }`}
                            >
                              {example.difficulty}
                            </span>
                          </div>
                          <p
                            className={`text-xs line-clamp-2 transition-colors -mt-1 ${
                              activeExample === index
                                ? 'text-gray-600 dark:text-white/90'
                                : 'text-gray-500 dark:text-white/60'
                            }`}
                          >
                            {example.description}
                          </p>
                        </div>
                      </div>
                    </SidebarNavButton>
                  ))}
                </div>
              </div>

              <div className='flex-1 lg:min-w-0 lg:max-h-[calc(100vh-200px)]'>
                <motion.div
                  key={activeExample}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className='h-full flex flex-col'
                >
                  <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
                    <div className='flex items-center justify-between mb-2'>
                      <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                        {examples[activeExample].title}
                      </h3>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs text-gray-500 dark:text-white/60 font-mono'>
                          {examples[activeExample].language}
                        </span>
                        <motion.button
                          onClick={() =>
                            copyToClipboard(
                              examples[activeExample].code,
                              examples[activeExample].id
                            )
                          }
                          className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-gray-300 dark:border-gray-600'
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {copiedStates[examples[activeExample].id] ? (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className='flex items-center gap-1.5'
                            >
                              <FaCheck className='text-green-600 dark:text-green-400' />
                              <span className='text-green-600 dark:text-green-400'>
                                Copied!
                              </span>
                            </motion.div>
                          ) : (
                            <>
                              <FaCopy className='text-gray-600 dark:text-gray-300' />
                              <span className='text-gray-700 dark:text-gray-200'>
                                Copy Code
                              </span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                    <p className='text-gray-600 dark:text-white/70'>
                      {examples[activeExample].description}
                    </p>
                  </div>

                  <div className='flex-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black overflow-hidden min-h-0'>
                    <div className='h-full overflow-y-auto'>
                      <Highlight
                        theme={isDarkMode ? customDarkTheme : customLightTheme}
                        code={examples[activeExample].code}
                        language={examples[activeExample].language as any}
                      >
                        {({
                          className,
                          style,
                          tokens,
                          getLineProps,
                          getTokenProps,
                        }) => (
                          <pre
                            className={`${className} p-6 text-sm font-mono leading-relaxed overflow-x-auto h-full`}
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
                                <span className='inline-block w-12 text-gray-400 dark:text-gray-500 select-none text-right pr-4 text-xs'>
                                  {i + 1}
                                </span>
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
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto'
        >
          <TransformCard
            rotation='rotate-[-0.5deg]'
            background='bg-gradient-to-br from-[#a679f0]/10 to-[#5599fe]/10 dark:from-[#a679f0]/20 dark:to-[#5599fe]/20'
            border='border border-[#a679f0]/20'
            className='p-6 text-center'
          >
            <FaGithub className='text-3xl text-[#a679f0] mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
              Complete Examples
            </h3>
            <p className='text-sm text-gray-600 dark:text-white/70 mb-4'>
              Explore full implementations and advanced patterns in our GitHub
              repositories.
            </p>
            <PrimaryButton
              href='https://hashgraphonline.com/docs/libraries/standards-sdk/hcs-10/examples'
              target='_blank'
              rel='noopener noreferrer'
              size='sm'
              icon={<FaArrowRight />}
              data-umami-event="hackathon-view-code-examples"
              data-umami-event-category="hackathon"
            >
              View Examples
            </PrimaryButton>
          </TransformCard>

          <TransformCard
            rotation='rotate-[0.5deg]'
            background='bg-gradient-to-br from-[#5599fe]/10 to-[#48df7b]/10 dark:from-[#5599fe]/20 dark:to-[#48df7b]/20'
            border='border border-[#5599fe]/20'
            className='p-6 text-center'
          >
            <FaPlay className='text-3xl text-[#5599fe] mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
              Interactive Demos
            </h3>
            <p className='text-sm text-gray-600 dark:text-white/70 mb-4'>
              Try out the CLI demo and LangChain integrations to see the tools
              in action.
            </p>
            <PrimaryButton
              href='https://hashgraphonline.com/docs/libraries/standards-agent-kit/examples'
              target='_blank'
              rel='noopener noreferrer'
              size='sm'
              icon={<FaArrowRight />}
              data-umami-event="hackathon-try-demos"
              data-umami-event-category="hackathon"
            >
              Try Demos
            </PrimaryButton>
          </TransformCard>
        </motion.div>
      </div>
    </section>
  );
};

export default HAHCodeExamplesSection;
