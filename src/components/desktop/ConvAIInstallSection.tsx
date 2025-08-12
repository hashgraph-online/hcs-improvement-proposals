import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaTerminal,
  FaCopy,
  FaCheck,
  FaNodeJs,
  FaKey,
  FaRobot,
  FaCog,
  FaPlay,
} from 'react-icons/fa';
import { Highlight } from 'prism-react-renderer';

const customLightTheme = {
  plain: {
    color: '#1a202c',
    backgroundColor: '#f9fafb',
  },
  styles: [
    {
      types: ['comment'],
      style: { color: '#6b7280', fontStyle: 'italic' },
    },
    {
      types: ['string'],
      style: { color: '#059669' },
    },
    {
      types: ['keyword'],
      style: { color: '#7c3aed', fontWeight: 'bold' },
    },
    {
      types: ['function'],
      style: { color: '#2563eb' },
    },
    {
      types: ['variable'],
      style: { color: '#ea580c' },
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
      types: ['comment'],
      style: { color: '#a1a1aa', fontStyle: 'italic' },
    },
    {
      types: ['string'],
      style: { color: '#81c784' },
    },
    {
      types: ['keyword'],
      style: { color: '#ba68c8', fontWeight: 'bold' },
    },
    {
      types: ['function'],
      style: { color: '#4fc3f7' },
    },
    {
      types: ['variable'],
      style: { color: '#ffb74d' },
    },
  ],
};

const ConvAIInstallSection: React.FC = () => {
  const [copied, setCopied] = useState<Record<string, boolean>>({});
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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setCopied(prev => ({ ...prev, [id]: false })), 2000);
  };

  const installSteps = [
    {
      icon: <FaNodeJs />,
      title: 'Prerequisites',
      description: 'Ensure you have the required software installed',
      code: `# Check Node.js version (requires 20+)
node --version

# Check pnpm version (requires 8+)  
pnpm --version

# Install pnpm if needed
npm install -g pnpm`,
      language: 'bash',
    },
    {
      icon: <FaTerminal />,
      title: 'Clone & Install',
      description: 'Get the source code and install dependencies',
      code: `# Clone the repository
git clone https://github.com/hashgraph-online/conversational-agent
cd conversational-agent/app

# Install dependencies
pnpm install`,
      language: 'bash',
    },
    {
      icon: <FaKey />,
      title: 'Configuration',
      description: 'Set up your environment variables',
      code: `# Create .env file (optional - can configure in app)
HEDERA_ACCOUNT_ID=0.0.YOUR_ACCOUNT_ID
HEDERA_PRIVATE_KEY=YOUR_PRIVATE_KEY
OPENAI_API_KEY=sk-your-openai-api-key
HEDERA_NETWORK=testnet`,
      language: 'bash',
    },
    {
      icon: <FaPlay />,
      title: 'Run Development',
      description: 'Start the application in development mode',
      code: `# Start development server
pnpm dev

# The app will launch automatically`,
      language: 'bash',
    },
  ];

  const buildCommands = `# Build for current platform
pnpm build

# Build for specific platforms
pnpm dist:mac     # macOS (.dmg)
pnpm dist:win     # Windows (.exe)  
pnpm dist:linux   # Linux (.AppImage, .deb)

# Built packages will be in the dist/ directory`;

  const setupGuide = [
    {
      step: 1,
      title: 'Get Hedera Credentials',
      description: 'Create a Hedera testnet account and get your Account ID and Private Key',
      icon: <FaKey />,
    },
    {
      step: 2,
      title: 'Obtain OpenAI API Key',
      description: 'Sign up for OpenAI API access and create an API key starting with "sk-"',
      icon: <FaRobot />,
    },
    {
      step: 3,
      title: 'Configure Settings',
      description: 'Enter your credentials in the app settings or via environment variables',
      icon: <FaCog />,
    },
  ];

  return (
    <section className='py-24 sm:py-32 relative bg-white dark:bg-gray-900 overflow-hidden'>
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
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(85, 153, 254, 0.08) 80px, rgba(85, 153, 254, 0.08) 160px)`,
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
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
            <FaTerminal className='text-[#5599fe] mr-2' />
            <span className='text-sm font-bold text-[#5599fe] dark:text-[#48df7b]'>
              INSTALLATION GUIDE
            </span>
          </motion.div>

          <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
            <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
              Get Started in Minutes
            </span>
          </h2>

          <p className='text-base text-gray-600 dark:text-white/70 max-w-3xl mx-auto'>
            Follow these simple steps to set up the Conversational Agent desktop app 
            on your local machine and start chatting with AI on Hedera.
          </p>
        </motion.div>

        {/* Setup Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='mb-16'
        >
          <h3 className='text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white'>
            What You'll Need
          </h3>
          <div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
            {setupGuide.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'
              >
                <div className='flex items-start gap-4'>
                  <div className='w-8 h-8 rounded-lg bg-gradient-to-r from-[#5599fe] to-[#48df7b] flex items-center justify-center text-white text-sm font-bold flex-shrink-0'>
                    {item.step}
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <div className='text-[#5599fe] text-lg'>
                        {item.icon}
                      </div>
                      <h4 className='text-lg font-semibold text-gray-900 dark:text-white'>
                        {item.title}
                      </h4>
                    </div>
                    <p className='text-gray-600 dark:text-gray-300 text-sm'>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Installation Steps */}
        <div className='space-y-8 mb-16'>
          {installSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden'
            >
              <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
                <div className='flex items-center gap-4 mb-3'>
                  <div className='w-10 h-10 rounded-xl bg-gradient-to-r from-[#a679f0] to-[#5599fe] flex items-center justify-center text-white'>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                      Step {index + 1}: {step.title}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300'>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className='relative'>
                <div className='absolute top-3 right-3 z-10'>
                  <motion.button
                    onClick={() => copyToClipboard(step.code, `step-${index}`)}
                    className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copied[`step-${index}`] ? (
                      <>
                        <FaCheck className='text-green-400' />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <FaCopy />
                        <span>Copy</span>
                      </>
                    )}
                  </motion.button>
                </div>
                
                <div className='bg-gray-100 dark:bg-gray-900'>
                  <Highlight
                    theme={isDarkMode ? customDarkTheme : customLightTheme}
                    code={step.code}
                    language={step.language as any}
                  >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <pre
                        className={`${className} p-6 text-sm font-mono leading-relaxed overflow-x-auto`}
                        style={{ ...style, backgroundColor: 'transparent' }}
                      >
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Build Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700'
        >
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 h-10 rounded-xl bg-gradient-to-r from-[#48df7b] to-[#a679f0] flex items-center justify-center text-white'>
              <FaTerminal />
            </div>
            <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
              Building for Production
            </h3>
          </div>
          
          <p className='text-gray-600 dark:text-gray-300 mb-6'>
            Ready to create distributable packages? Use these commands to build 
            native installers for different platforms:
          </p>

          <div className='relative'>
            <div className='absolute top-3 right-3 z-10'>
              <motion.button
                onClick={() => copyToClipboard(buildCommands, 'build-commands')}
                className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied['build-commands'] ? (
                  <>
                    <FaCheck className='text-green-400' />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <FaCopy />
                    <span>Copy</span>
                  </>
                )}
              </motion.button>
            </div>
            
            <div className='bg-gray-900 rounded-xl'>
              <Highlight
                theme={customDarkTheme}
                code={buildCommands}
                language='bash'
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre
                    className={`${className} p-6 text-sm font-mono leading-relaxed overflow-x-auto text-gray-100`}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          </div>

          <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'>
              <div className='w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>
                🍎
              </div>
              <div>
                <div className='font-semibold text-sm text-gray-900 dark:text-white'>macOS</div>
                <div className='text-xs text-gray-500 dark:text-gray-400'>.dmg installer</div>
              </div>
            </div>
            <div className='flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'>
              <div className='w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>
                🪟
              </div>
              <div>
                <div className='font-semibold text-sm text-gray-900 dark:text-white'>Windows</div>
                <div className='text-xs text-gray-500 dark:text-gray-400'>.exe installer</div>
              </div>
            </div>
            <div className='flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'>
              <div className='w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>
                🐧
              </div>
              <div>
                <div className='font-semibold text-sm text-gray-900 dark:text-white'>Linux</div>
                <div className='text-xs text-gray-500 dark:text-gray-400'>.AppImage, .deb</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConvAIInstallSection;