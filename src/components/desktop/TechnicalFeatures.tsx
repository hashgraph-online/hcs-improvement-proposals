import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaRobot, FaPlug, FaCubes } from 'react-icons/fa';
import InteractiveToolsSection, { Tool } from '../ui/InteractiveToolsSection';
import { Terminal, AnimatedBackground, TransformCard, Typography } from '../ui';

const TechnicalFeatures: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const architectureComponents: Tool[] = [
    {
      icon: <FaCode />,
      title: 'LangChain Architecture',
      description: 'Built on LangChain with OpenAI function calling, ContentAware AgentExecutor, and smart memory management for context-aware conversations.',
      link: 'https://github.com/hashgraph-online/conversational-agent/tree/main/src',
      color: 'purple',
      quickStart: `const agent = new ConversationalAgent({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
  network: 'testnet',
  openAIApiKey: process.env.OPENAI_API_KEY!,
  openAIModelName: 'gpt-4o',
  verbose: true
});

// Smart memory with entity tracking
const response = await agent.processMessage(
  'Send 1 HBAR to alice.eth'
);

// Features:
// - OpenAI function calling
// - ContentAware AgentExecutor  
// - Smart memory management
// - Entity resolution system`,
      docsLink: '/docs/libraries/conversational-agent#architecture'
    },
    {
      icon: <FaCubes />,
      title: 'Plugin Ecosystem',
      description: 'Modular plugin architecture with HCS standards implementation and hedera-agent-kit integration for comprehensive Hedera operations.',
      link: 'https://github.com/hashgraph-online/conversational-agent/tree/main/src/plugins',
      color: 'blue',
      quickStart: `// HCS-10: Agent Registration
const agent = await hcs10Plugin.registerAgent({
  name: 'MyAgent',
  capabilities: [AIAgentCapability.TEXT_GENERATION],
  model: 'gpt-4o'
});

// HCS-2: Registry Integration
await hcs2Plugin.registerService(topicId, metadata);

// Inscription: Create Hashinals
await inscribePlugin.inscribe(content, {
  inscription_type: 'application/json'
});

// Features:
// - HCS-10 agent network
// - HCS-2 registries
// - Content inscription
// - hedera-agent-kit v2`,
      docsLink: '/docs/libraries/conversational-agent#plugins'
    },
    {
      icon: <FaPlug />,
      title: 'MCP Integration',
      description: 'Native Model Context Protocol support for connecting to filesystems, GitHub, databases, and custom servers with background connection management.',
      link: 'https://github.com/hashgraph-online/conversational-agent/tree/main/src/mcp',
      color: 'green',
      quickStart: `// Configure MCP servers
const mcpConfig = {
  mcpServers: {
    filesystem: {
      command: 'npx',
      args: ['@modelcontextprotocol/server-filesystem']
    },
    github: {
      command: 'npx',
      args: ['@modelcontextprotocol/server-github'],
      env: { GITHUB_TOKEN: process.env.GITHUB_TOKEN }
    }
  }
};

// Tools automatically available to agent
const files = await agent.listFiles('/path');

// Features:
// - Filesystem access
// - GitHub integration
// - Database connections
// - Custom MCP servers`,
      docsLink: 'https://modelcontextprotocol.io/docs'
    },
    {
      icon: <FaRobot />,
      title: 'Operational Modes',
      description: 'Two operational modes: autonomous for direct execution and returnBytes for external signing, plus entity memory for context persistence.',
      link: 'https://github.com/hashgraph-online/conversational-agent#operational-modes',
      color: 'purple',
      quickStart: `// Autonomous mode (direct execution)
agent.operationalMode = 'autonomous';
await agent.processMessage('Transfer 10 HBAR');

// ReturnBytes mode (for external signing)
agent.operationalMode = 'returnBytes';
const txBytes = await agent.processMessage('Transfer 10 HBAR');
// Sign and submit externally

// Entity memory persists across sessions
await agent.processMessage('Send 5 HBAR to Bob');
// Later: "Send 2 more to Bob" - remembers Bob's account

// Features:
// - Autonomous execution
// - External signing mode
// - Entity memory
// - Context persistence`,
      docsLink: '/docs/libraries/conversational-agent#modes'
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install @hashgraphonline/conversational-agent');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className='relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-black dark:to-purple-950/30 overflow-hidden'>
      <AnimatedBackground
        variant='blobs'
        colors={['brand-purple', 'brand-blue', 'brand-green']}
        intensity='low'
        opacity={0.1}
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <div className='mb-4'>
            <Typography
              variant='h2'
              className='text-4xl lg:text-5xl font-mono font-black text-gray-900 dark:text-white leading-tight tracking-tight'
            >
              Technical{' '}
              <Typography
                variant='h2'
                gradient='brand'
                as='span'
                className='text-4xl lg:text-5xl font-mono font-black leading-tight tracking-tight inline-block'
              >
                Architecture_
              </Typography>
            </Typography>
            <Typography
              color='muted'
              className='text-lg mt-4 max-w-2xl mx-auto'
            >
              Production-ready AI agent infrastructure built on LangChain, Hedera, and MCP
            </Typography>
          </div>
        </motion.div>

        <InteractiveToolsSection
          tools={architectureComponents}
          title=''
          subtitle=''
          browserTitle='architecture-explorer.sh'
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='mt-20'
        >
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            <TransformCard
              rotation='rotate-[1deg]'
              background='bg-gradient-to-br from-purple-900 to-purple-800 dark:from-purple-800 dark:to-purple-700'
              border='border border-purple-700/50'
              shadow='xl'
              rounded='3xl'
              className='p-8 h-64 flex flex-col justify-between'
            >
              <div className='text-xs font-mono text-purple-300'>
                // LANGCHAIN_POWERED
              </div>
              <div>
                <Typography
                  variant='h3'
                  className='text-xl font-mono font-black text-white mb-3'
                >
                  AI-First Design
                </Typography>
                <Typography className='text-sm text-purple-200'>
                  Built on LangChain with OpenAI/Anthropic models and smart memory management
                </Typography>
              </div>
            </TransformCard>

            <TransformCard
              rotation='rotate-[-0.5deg]'
              background='bg-gradient-to-br from-blue-900 to-blue-800 dark:from-blue-800 dark:to-blue-700'
              border='border border-blue-700/50'
              shadow='xl'
              rounded='3xl'
              className='p-8 h-64 flex flex-col justify-between lg:mt-8'
            >
              <div className='text-xs font-mono text-blue-300'>
                // HEDERA_NATIVE
              </div>
              <div>
                <Typography
                  variant='h3'
                  className='text-xl font-mono font-black text-white mb-3'
                >
                  Hashgraph Ready
                </Typography>
                <Typography className='text-sm text-blue-200'>
                  Full Hedera integration with HCS standards and hedera-agent-kit v2
                </Typography>
              </div>
            </TransformCard>

            <TransformCard
              rotation='rotate-[0.5deg]'
              background='bg-gradient-to-br from-green-900 to-green-800 dark:from-green-800 dark:to-green-700'
              border='border border-green-700/50'
              shadow='xl'
              rounded='3xl'
              className='p-8 h-64 flex flex-col justify-between'
            >
              <div className='text-xs font-mono text-green-300'>
                // MCP_ENABLED
              </div>
              <div>
                <Typography
                  variant='h3'
                  className='text-xl font-mono font-black text-white mb-3'
                >
                  Extensible
                </Typography>
                <Typography className='text-sm text-green-200'>
                  Model Context Protocol for external systems and custom tool integration
                </Typography>
              </div>
            </TransformCard>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='mt-16 text-center'
        >
          <div className='relative group max-w-3xl mx-auto'>
            <div className='absolute -inset-2 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000'></div>
            <div className='relative bg-white/95 dark:bg-gray-800/95 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm'>
              <Terminal title='quick-start.sh' className='text-left'>
                <Terminal.Line
                  command='npm install @hashgraphonline/conversational-agent'
                  clickable
                  onClick={handleCopy}
                />
                <Terminal.Line output='✓ Installing conversational agent SDK...' type='output' />
                <Terminal.Line output='✓ Setting up LangChain architecture...' type='output' />
                <Terminal.Line output='✓ Configuring Hedera plugins...' type='output' />
                <Terminal.Line output='✓ Initializing MCP servers...' type='output' />
                <Terminal.Line output='' type='output' />
                <Terminal.Line output='// Ready to build AI agents on Hedera' type='comment' />
              </Terminal>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className='absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium shadow-lg'
                >
                  Copied!
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalFeatures;