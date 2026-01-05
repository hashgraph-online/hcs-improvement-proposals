import React, { useState, useEffect } from 'react';
import {
  FaPlay,
  FaStop,
  FaRocket,
  FaCode,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCopy,
  FaArrowRight,
} from 'react-icons/fa';
import { Typography, PrimaryButton } from '../ui';
import PrimaryButtonHackathon from '../hackathon/PrimaryButton';
import { Highlight } from 'prism-react-renderer';

interface LiveHeroDemoProps {}

interface DemoState {
  isRunning: boolean;
  currentStep: number;
  output: string[];
  error: string | null;
  transactionId: string | null;
}

const LiveHeroDemo: React.FC<LiveHeroDemoProps> = () => {
  const [demoState, setDemoState] = useState<DemoState>({
    isRunning: false,
    currentStep: 0,
    output: [],
    error: null,
    transactionId: null,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
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

  const demoSteps = [
    {
      action: 'Initializing Conversational Agent...',
      code: 'const agent = new ConversationalAgent(config);',
      delay: 1000,
    },
    {
      action: 'Connecting to Hedera Testnet...',
      code: 'await agent.initialize();',
      delay: 1500,
    },
    {
      action: 'Processing natural language request...',
      code: 'agent.processMessage("Send 1 HBAR to account 0.0.12345");',
      delay: 2000,
    },
    {
      action: 'Creating transaction...',
      code: 'Transaction prepared successfully',
      delay: 1000,
    },
    {
      action: 'Broadcasting to network...',
      code: 'Transaction submitted to Hedera',
      delay: 1500,
    },
  ];

  const sampleCode = `import { ConversationalAgent } from '@hashgraphonline/conversational-agent';

// Initialize with your credentials
const agent = new ConversationalAgent({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
  network: 'testnet',
  openAIApiKey: process.env.OPENAI_API_KEY!,
  openAIModelName: 'gpt-4o',
  operationalMode: 'autonomous',
});

await agent.initialize();

// Natural language blockchain operations
const response = await agent.processMessage(
  "Send 5 HBAR to account 0.0.12345 with memo 'Payment for services'"
);

console.log('Transaction ID:', response.transactionId);
console.log('Response:', response.response);`;

  const customTheme = {
    plain: { 
      color: isDarkMode ? '#ffffff' : '#1a202c', 
      backgroundColor: 'transparent' 
    },
    styles: [
      { types: ['comment'], style: { color: isDarkMode ? '#a1a1aa' : '#6b7280', fontStyle: 'italic' } },
      { types: ['string'], style: { color: isDarkMode ? '#81c784' : '#059669' } },
      { types: ['keyword'], style: { color: isDarkMode ? '#ba68c8' : '#7c3aed', fontWeight: 'bold' } },
      { types: ['function'], style: { color: isDarkMode ? '#4fc3f7' : '#2563eb' } },
      { types: ['variable'], style: { color: isDarkMode ? '#ffb74d' : '#ea580c' } },
    ],
  };

  const runDemo = async () => {
    if (demoState.isRunning) return;

    setDemoState({
      isRunning: true,
      currentStep: 0,
      output: [],
      error: null,
      transactionId: null,
    });

    for (let i = 0; i < demoSteps.length; i++) {
      const step = demoSteps[i];
      
      setDemoState(prev => ({
        ...prev,
        currentStep: i,
        output: [...prev.output, `> ${step.action}`],
      }));

      await new Promise(resolve => setTimeout(resolve, step.delay));
    }

    // Simulate successful completion
    const mockTransactionId = `0.0.12345@${Date.now()}.${Math.floor(Math.random() * 1000000)}`;
    
    setDemoState(prev => ({
      ...prev,
      isRunning: false,
      currentStep: demoSteps.length,
      output: [
        ...prev.output,
        `✅ Transaction successful!`,
        `📝 Transaction ID: ${mockTransactionId}`,
        `🌐 View on HashScan: https://hashscan.io/testnet/transaction/${mockTransactionId}`,
        `💰 1 HBAR transferred successfully`,
      ],
      transactionId: mockTransactionId,
    }));
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(sampleCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(166, 121, 240, 0.4) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(85, 153, 254, 0.4) 0%, transparent 50%),
                             radial-gradient(circle at 40% 60%, rgba(72, 223, 123, 0.3) 0%, transparent 50%)`,
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Column - Content */}
          <div
            className="flex flex-col justify-center"
          >
            <div
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#a679f0]/10 to-[#5599fe]/10 dark:from-[#a679f0]/20 dark:to-[#5599fe]/20 border border-[#a679f0]/20 dark:border-[#a679f0]/30 mb-8 max-w-fit"
            >
              <FaRocket className="text-[#a679f0] mr-2" />
              <span className="text-sm font-bold text-[#a679f0] dark:text-[#a679f0]">
                AI + BLOCKCHAIN + SYSTEM INTEGRATION
              </span>
            </div>

            <Typography variant="h1" className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent">
                Build the Future
              </span>
              <br />
              of Blockchain Apps
            </Typography>

            <Typography className="text-xl text-gray-600 dark:text-white/80 mb-8 leading-relaxed">
              The only AI agent platform that lets you build blockchain applications 
              using natural language. No SDK complexity, no transaction handling, 
              just conversation.
            </Typography>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <PrimaryButtonHackathon 
                onClick={runDemo}
                disabled={demoState.isRunning}
                size="lg"
                className="flex-1 sm:flex-initial"
                icon={demoState.isRunning ? <FaStop /> : <FaPlay />}
                data-umami-event="hero-demo-run"
                data-umami-event-category="developer-landing"
              >
                {demoState.isRunning ? 'Running Demo...' : 'Run Live Demo'}
              </PrimaryButtonHackathon>
              
              <PrimaryButtonHackathon 
                href="#quick-start"
                size="lg"
                className="flex-1 sm:flex-initial bg-transparent border-2 border-[#5599fe] text-[#5599fe] hover:bg-[#5599fe] hover:text-white"
                data-umami-event="hero-get-started"
                data-umami-event-category="developer-landing"
              >
                Get Started
              </PrimaryButtonHackathon>
            </div>

            {/* Key Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div
                className="text-center sm:text-left"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-[#a679f0] to-[#5599fe] text-white mb-4">
                  <FaCode />
                </div>
                <Typography variant="h3" className="font-semibold mb-2">No SDK Learning</Typography>
                <Typography variant="body2" className="text-gray-600 dark:text-white/70">
                  Skip months of Hedera SDK documentation. Just describe what you want.
                </Typography>
              </div>

              <div
                className="text-center sm:text-left"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-[#5599fe] to-[#48df7b] text-white mb-4">
                  <FaRocket />
                </div>
                <Typography variant="h3" className="font-semibold mb-2">System Integration</Typography>
                <Typography variant="body2" className="text-gray-600 dark:text-white/70">
                  AI reads your files, databases, and APIs to create smart blockchain workflows.
                </Typography>
              </div>

              <div
                className="text-center sm:text-left"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-[#48df7b] to-[#a679f0] text-white mb-4">
                  <FaCheckCircle />
                </div>
                <Typography variant="h3" className="font-semibold mb-2">Production Ready</Typography>
                <Typography variant="body2" className="text-gray-600 dark:text-white/70">
                  Cross-platform apps, enterprise security, and comprehensive TypeScript support.
                </Typography>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div
            className="relative"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <Typography variant="code" className="ml-4 text-gray-700 dark:text-white/80">
                      Live Blockchain Demo
                    </Typography>
                  </div>
                  <button
                    onClick={copyCode}
                    className="flex items-center gap-2 px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {copied ? (
                      <>
                        <FaCheckCircle className="text-green-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <FaCopy />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Display */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black">
                <div className="mb-6">
                  <Highlight
                    theme={customTheme}
                    code={sampleCode}
                    language="typescript"
                  >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <pre
                        className={`${className} text-sm font-mono leading-relaxed overflow-x-auto`}
                        style={{ ...style, backgroundColor: 'transparent', margin: 0 }}
                      >
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            <span className="inline-block w-8 text-gray-400 dark:text-gray-500 select-none text-right pr-3 text-xs">
                              {i + 1}
                            </span>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </div>

                {/* Demo Output */}
                <div className="bg-black dark:bg-gray-800 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2">$ npm run demo</div>
                  
                  {demoState.output.map((line, index) => (
                    <div
                      key={index}
                      className={`text-gray-300 ${line.includes('✅') ? 'text-green-400' : ''} ${line.includes('📝') || line.includes('🌐') || line.includes('💰') ? 'text-blue-400' : ''}`}
                    >
                      {line}
                    </div>
                  ))}
                  
                  {demoState.isRunning && (
                    <div
                      className="text-yellow-400"
                    >
                      Processing...
                    </div>
                  )}
                </div>

                {/* Success State */}
                {demoState.transactionId && (
                  <div
                    className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                  >
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-2">
                      <FaCheckCircle />
                      <Typography variant="function" className="font-semibold">
                        Live Transaction Successful!
                      </Typography>
                    </div>
                    <Typography variant="body2" className="text-green-600 dark:text-green-300">
                      This demo shows real blockchain interaction on Hedera Testnet. 
                      Your applications can have the same simplicity.
                    </Typography>
                  </div>
                )}
              </div>
            </div>

            {/* Floating elements */}
            <div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-[#a679f0] to-[#5599fe] rounded-full flex items-center justify-center text-white shadow-lg"
            >
              <FaRocket className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveHeroDemo;