import React, { useState } from 'react';
import { motion } from 'motion/react';
import Typography from '../ui/Typography';
import Terminal from '../ui/Terminal';
import CLITerminal from '../ui/CLITerminal';
import { LaptopMockup } from '../ui';
import { FaDesktop, FaTerminal } from 'react-icons/fa';
import { FiMessageSquare, FiWifi, FiShield, FiSend, FiPaperclip, FiCopy, FiCheck } from 'react-icons/fi';

const DesktopShowcase: React.FC = () => {
  const [activeView, setActiveView] = useState<'desktop' | 'cli'>('desktop');
  const [copied, setCopied] = useState(false);

  return (
    <section className='py-20 bg-gray-50 dark:bg-gray-900/50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='text-center mb-12'
          >
            <Typography variant='h2' className='text-3xl sm:text-4xl font-bold mb-4'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#7eb9ff] to-[#5599fe]'>
                Two Ways to Build
              </span>
            </Typography>
            <Typography variant='body' color='muted' className='text-lg max-w-3xl mx-auto mb-6'>
              Choose between our Electron desktop app with a full GUI or the CLI built with Ink for terminal enthusiasts.
            </Typography>
            
            <div className='inline-flex gap-1 p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl'>
              <button
                onClick={() => setActiveView('desktop')}
                className={`px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 font-bold border-0 outline-none ${
                  activeView === 'desktop' 
                    ? 'bg-gradient-to-r from-[#c89fff] to-[#a679f0] text-white shadow-lg' 
                    : 'text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                }`}
              >
                <FaDesktop className={activeView === 'desktop' ? 'text-white' : ''} />
                Desktop App
              </button>
              <button
                onClick={() => setActiveView('cli')}
                className={`px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 font-bold border-0 outline-none ${
                  activeView === 'cli' 
                    ? 'bg-gradient-to-r from-[#7eb9ff] to-[#5599fe] text-white shadow-lg' 
                    : 'text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                }`}
              >
                <FaTerminal className={activeView === 'cli' ? 'text-white' : ''} />
                CLI Tool
              </button>
            </div>
          </motion.div>
          
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className='relative order-2 lg:order-1'
            >
              {activeView === 'desktop' ? (
                // Desktop App with Laptop Frame
                <LaptopMockup>
                  <img 
                    src='/hol-desktop-chat.png' 
                    alt='Conversational Agent Desktop Chat'
                    className='w-full h-full object-cover object-top'
                  />
                </LaptopMockup>
              ) : (
                // CLI Mockup - Clean Ink CLI interface
                <CLITerminal>
                  <div className='text-blue-400'>[INFO] Connected to Hedera testnet</div>
                  <div className='text-blue-400'>[INFO] MCP servers enabled: filesystem</div>
                  
                  <div className='mt-3'>
                    <span className='text-green-400'>→</span> Hello! I'm your Conversational Agent. How can I help you?
                  </div>
                  
                  <div className='mt-3'>
                    <span className='text-gray-500'>$</span> <span className='text-white'>Can you inscribe the hashgraph online logo?</span>
                  </div>
                  
                  <div className='mt-2'>
                    <span className='text-green-400'>→</span> Here's the cost quote for inscribing the logo:
                  </div>
                  
                  <div className='ml-6 text-gray-400'>
                    • File: Hashgraph-Online.png (53.06 KB)<br/>
                    • Total cost: 3.27908186 HBAR<br/>
                    • Quote valid until: August 11, 2025
                  </div>
                  
                  <div className='mt-2'>
                    Would you like to proceed with this inscription?
                  </div>
                  
                  <div className='mt-4 pt-3 border-t border-gray-800'>
                    <span className='text-gray-500'>$ Type your message...</span>
                  </div>
                  
                  <div className='mt-3 text-xs text-gray-500'>
                    Ctrl+C to exit • ESC to return to menu • L to toggle logs
                  </div>
                </CLITerminal>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='order-1 lg:order-2'
            >
              <div className='space-y-6'>
                <div>
                  <Typography variant='h5' className='font-semibold mb-2'>
                    {activeView === 'desktop' ? 'HOL Desktop' : 'CLI Tool'}
                  </Typography>
                  <Typography variant='body' color='muted'>
                    {activeView === 'desktop' 
                      ? 'Electron desktop app with modern React UI. Chat with AI agents, approve transactions, connect MCP servers for file access and external tools.'
                      : 'Terminal-based chat interface built with Ink (React for CLIs). Same AI agent capabilities in a lightweight terminal UI with keyboard navigation.'}
                  </Typography>
                </div>
                
                <div>
                  <Typography variant='h6' className='font-semibold mb-2'>
                    Key Features
                  </Typography>
                  <ul className='space-y-0.5'>
                    {activeView === 'desktop' ? (
                      <>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0'></div>
                          <span className='text-gray-600 dark:text-gray-400 text-sm'>
                            Modern chat interface with transaction approval cards
                          </span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0'></div>
                          <span className='text-gray-600 dark:text-gray-400 text-sm'>
                            File attachments and multi-modal support
                          </span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0'></div>
                          <span className='text-gray-600 dark:text-gray-400 text-sm'>
                            HCS-10 profile integration with AI agent display
                          </span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0'></div>
                          <span className='text-gray-600 dark:text-gray-400 text-sm'>
                            Real-time connection status and network indicators
                          </span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0'></div>
                          <span className='text-gray-600 dark:text-gray-400 text-sm'>
                            Interactive setup wizard for first-time configuration
                          </span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0'></div>
                          <span className='text-gray-600 dark:text-gray-400 text-sm'>
                            Real-time chat with colored output and status badges
                          </span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0'></div>
                          <span className='text-gray-600 dark:text-gray-400 text-sm'>
                            MCP server configuration through terminal UI
                          </span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0'></div>
                          <span className='text-gray-600 dark:text-gray-400 text-sm'>
                            Keyboard shortcuts and vim-like navigation
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div>
                  <Typography variant='h6' className='font-semibold mb-2'>
                    Installation
                  </Typography>
                  <div className='relative group'>
                    <Terminal title='install.sh' className='text-sm'>
                      {activeView === 'desktop' ? (
                        <>
                          <Terminal.Line comment='# Clone and build from source:' type='comment' />
                          <Terminal.Line command='git clone https://github.com/hashgraph-online/desktop' />
                          <Terminal.Line command='cd desktop' />
                          <Terminal.Line command='pnpm install' />
                          <Terminal.Line output='' type='output' />
                          <Terminal.Line comment='# For development' type='comment' />
                          <Terminal.Line command='pnpm dev' />
                          <Terminal.Line output='' type='output' />
                          <Terminal.Line comment='# For production build' type='comment' />
                          <Terminal.Line command='pnpm build' />
                        </>
                      ) : (
                        <>
                          <Terminal.Line comment='# Clone and run the CLI:' type='comment' />
                          <Terminal.Line command='git clone https://github.com/hashgraph-online/conversational-agent' />
                          <Terminal.Line command='cd conversational-agent' />
                          <Terminal.Line command='pnpm install' />
                          <Terminal.Line command='pnpm build' />
                          <Terminal.Line command='pnpm cli' />
                        </>
                      )}
                    </Terminal>
                    <button
                      onClick={() => {
                        const commands = activeView === 'desktop' 
                          ? `# Clone and build from source:
git clone https://github.com/hashgraph-online/desktop
cd desktop
pnpm install

# For development
pnpm dev

# For production build
pnpm build`
                          : `# Clone and run the CLI:
git clone https://github.com/hashgraph-online/conversational-agent
cd conversational-agent
pnpm install
pnpm build
pnpm cli`;
                        navigator.clipboard.writeText(commands);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className='absolute top-2 right-2 p-1.5 bg-black/20 hover:bg-black/30 rounded transition-all duration-200 border-0 outline-none'
                      title='Copy commands'
                    >
                      {copied ? (
                        <FiCheck className='w-3.5 h-3.5 text-green-400' />
                      ) : (
                        <FiCopy className='w-3.5 h-3.5 text-white' />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesktopShowcase;