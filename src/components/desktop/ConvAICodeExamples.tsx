import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCode,
  FaRobot,
  FaTerminal,
  FaCopy,
  FaCheck,
  FaArrowRight,
  FaGithub,
} from 'react-icons/fa';
import { TransformCard, SidebarNavButton } from '../ui';
import PrimaryButton from '../hackathon/PrimaryButton';
import { Highlight } from 'prism-react-renderer';

const customLightTheme = {
  plain: { color: '#1a202c', backgroundColor: '#f9fafb' },
  styles: [
    { types: ['comment'], style: { color: '#6b7280', fontStyle: 'italic' } },
    { types: ['string'], style: { color: '#059669' } },
    { types: ['keyword'], style: { color: '#7c3aed', fontWeight: 'bold' } },
    { types: ['function'], style: { color: '#2563eb' } },
    { types: ['variable'], style: { color: '#ea580c' } },
  ],
};

const customDarkTheme = {
  plain: { color: '#ffffff', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment'], style: { color: '#a1a1aa', fontStyle: 'italic' } },
    { types: ['string'], style: { color: '#81c784' } },
    { types: ['keyword'], style: { color: '#ba68c8', fontWeight: 'bold' } },
    { types: ['function'], style: { color: '#4fc3f7' } },
    { types: ['variable'], style: { color: '#ffb74d' } },
  ],
};

const ConvAICodeExamples: React.FC = () => {
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

    return () => observer.disconnect();
  }, []);

  const examples = [
    {
      id: 'basic-usage',
      title: 'Basic Usage',
      description: 'Initialize and use the conversational agent with natural language',
      language: 'typescript',
      difficulty: 'Beginner',
      color: 'purple',
      icon: <FaRobot />,
      code: `import { ConversationalAgent } from '@hashgraphonline/conversational-agent';

// Initialize the conversational agent
const agent = new ConversationalAgent({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
  network: 'testnet',
  openAIApiKey: process.env.OPENAI_API_KEY!,
  openAIModelName: 'gpt-4o',
  verbose: true,
});

await agent.initialize();

// Process natural language requests
const response = await agent.processMessage(
  'Send 5 HBAR to account 0.0.12345'
);

console.log('Response:', response.response);
console.log('Transaction bytes:', response.transactionBytes);`,
    },
    {
      id: 'hcs10-registration',
      title: 'HCS-10 Agent Registration',
      description: 'Register as an AI agent on the Hedera network using HCS-10 standard',
      language: 'typescript',
      difficulty: 'Intermediate',
      color: 'blue',
      icon: <FaTerminal />,
      code: `import { ConversationalAgent } from '@hashgraphonline/conversational-agent';

const agent = new ConversationalAgent({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
  network: 'testnet',
  openAIApiKey: process.env.OPENAI_API_KEY!,
  openAIModelName: 'gpt-4o',
});

await agent.initialize();

// Register as an AI agent
const registrationResponse = await agent.processMessage(
  \`Register me as an AI agent with the name "DataAnalysisBot" 
   and description "AI assistant for data analysis and insights" 
   with tags "data-analysis,ai-agent,hedera"\`
);

console.log('Registration response:', registrationResponse.response);

// The agent is now discoverable on the Hedera network!`,
    },
    {
      id: 'mcp-integration',
      title: 'MCP Server Integration',
      description: 'Extend agent capabilities with custom MCP servers',
      language: 'typescript',
      difficulty: 'Advanced',
      color: 'green',
      icon: <FaCode />,
      code: `import { ConversationalAgent } from '@hashgraphonline/conversational-agent';

// Initialize with custom MCP servers
const agent = new ConversationalAgent({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
  network: 'testnet',
  openAIApiKey: process.env.OPENAI_API_KEY!,
  openAIModelName: 'gpt-4o',
  // Add custom MCP server plugins
  additionalPlugins: [
    // Filesystem access
    {
      name: 'filesystem',
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-filesystem', '/path/to/data'],
    },
    // GitHub integration
    {
      name: 'github',
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-github'],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: process.env.GITHUB_TOKEN!,
      },
    },
  ],
});

await agent.initialize();

// Now the agent can access files and GitHub
const response = await agent.processMessage(
  'Read the README.md file and create a GitHub issue summarizing the project'
);

console.log('MCP-enhanced response:', response.response);`,
    },
    {
      id: 'transaction-handling',
      title: 'Transaction Processing',
      description: 'Handle different operational modes for transaction approval',
      language: 'typescript',
      difficulty: 'Intermediate',
      color: 'purple',
      icon: <FaRobot />,
      code: `import { ConversationalAgent } from '@hashgraphonline/conversational-agent';

// Create agent in 'returnBytes' mode for manual approval
const agent = new ConversationalAgent({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
  network: 'testnet',
  openAIApiKey: process.env.OPENAI_API_KEY!,
  openAIModelName: 'gpt-4o',
  operationalMode: 'returnBytes', // Don't auto-execute transactions
});

await agent.initialize();

// Process a transaction request
const response = await agent.processMessage(
  'Create a new token called "MyToken" with symbol "MTK" and supply of 1000000'
);

if (response.transactionBytes) {
  console.log('Transaction prepared but not executed');
  console.log('Transaction bytes:', response.transactionBytes);
  
  // You can now:
  // 1. Show transaction details to user
  // 2. Get approval
  // 3. Execute the transaction
  
  // Switch to autonomous mode to execute
  agent.setOperationalMode('autonomous');
  const executeResponse = await agent.processMessage(
    'Execute the prepared transaction'
  );
  
  console.log('Transaction executed:', executeResponse.response);
} else {
  console.log('Response:', response.response);
}`,
    },
    {
      id: 'desktop-app-integration',
      title: 'Desktop App Integration',
      description: 'Integration example showing how the desktop app uses the agent',
      language: 'typescript',
      difficulty: 'Advanced',
      color: 'blue',
      icon: <FaTerminal />,
      code: `// Example from the desktop app's chat page
import { ConversationalAgent } from '@hashgraphonline/conversational-agent';
import { useConfigStore } from '../stores/configStore';

const ChatPage: React.FC = () => {
  const { config } = useConfigStore();
  const [agent, setAgent] = useState<ConversationalAgent | null>(null);

  useEffect(() => {
    const initializeAgent = async () => {
      if (!config) return;

      const conversationalAgent = new ConversationalAgent({
        accountId: config.hedera?.accountId!,
        privateKey: config.hedera?.privateKey!,
        network: config.hedera?.network as 'testnet' | 'mainnet',
        openAIApiKey: config.openai?.apiKey!,
        openAIModelName: config.openai?.model || 'gpt-4o',
        operationalMode: config.operationalMode || 'autonomous',
        verbose: config.verbose || false,
      });

      await conversationalAgent.initialize();
      setAgent(conversationalAgent);
    };

    initializeAgent();
  }, [config]);

  const handleSendMessage = async (message: string) => {
    if (!agent) return;

    try {
      const response = await agent.processMessage(message);
      
      // Handle response in the UI
      if (response.transactionBytes && config.operationalMode === 'returnBytes') {
        // Show transaction approval dialog
        showTransactionApproval(response.transactionBytes, response.response);
      } else {
        // Display response in chat
        addMessageToChat('assistant', response.response);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      addMessageToChat('error', 'Failed to process message');
    }
  };

  return (
    <div className="chat-interface">
      {/* Chat UI components */}
    </div>
  );
};`,
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
    <section className='py-24 sm:py-32 relative bg-gray-50 dark:bg-gray-800 overflow-hidden'>
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
            className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#a679f0]/10 to-[#5599fe]/10 dark:from-[#a679f0]/20 dark:to-[#5599fe]/20 border border-[#a679f0]/20 dark:border-[#a679f0]/30 mb-6'
          >
            <FaCode className='text-[#a679f0] mr-2' />
            <span className='text-sm font-bold text-[#a679f0] dark:text-[#a679f0]'>
              CODE EXAMPLES
            </span>
          </motion.div>

          <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
            <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
              Integration Examples
            </span>
          </h2>

          <p className='text-base text-gray-600 dark:text-white/70 max-w-3xl mx-auto'>
            Learn how to integrate the Conversational Agent into your applications 
            with these practical code examples.
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
                  Conversational Agent Examples
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
              Full Source Code
            </h3>
            <p className='text-sm text-gray-600 dark:text-white/70 mb-4'>
              Explore the complete desktop application source code and 
              conversational agent implementation.
            </p>
            <PrimaryButton
              href='https://github.com/hashgraph-online/conversational-agent'
              target='_blank'
              rel='noopener noreferrer'
              size='sm'
              icon={<FaArrowRight />}
              data-umami-event='conversational-agent-source'
              data-umami-event-category='conversational-agent'
            >
              View Repository
            </PrimaryButton>
          </TransformCard>

          <TransformCard
            rotation='rotate-[0.5deg]'
            background='bg-gradient-to-br from-[#5599fe]/10 to-[#48df7b]/10 dark:from-[#5599fe]/20 dark:to-[#48df7b]/20'
            border='border border-[#5599fe]/20'
            className='p-6 text-center'
          >
            <FaRobot className='text-3xl text-[#5599fe] mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
              Documentation
            </h3>
            <p className='text-sm text-gray-600 dark:text-white/70 mb-4'>
              Read the complete documentation for the conversational agent 
              library and desktop application.
            </p>
            <PrimaryButton
              href='https://hashgraphonline.com/docs/libraries/conversational-agent/'
              target='_blank'
              rel='noopener noreferrer'
              size='sm'
              icon={<FaArrowRight />}
              data-umami-event='conversational-agent-docs'
              data-umami-event-category='conversational-agent'
            >
              Read Docs
            </PrimaryButton>
          </TransformCard>
        </motion.div>
      </div>
    </section>
  );
};

export default ConvAICodeExamples;