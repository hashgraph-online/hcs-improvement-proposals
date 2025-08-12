import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Typography from '../ui/Typography';
import Terminal from '../ui/Terminal';
import CLITerminal from '../ui/CLITerminal';
import { LaptopMockup } from '../ui';
import { FaDesktop, FaTerminal } from 'react-icons/fa';
import { FiMessageSquare, FiWifi, FiShield, FiSend, FiPaperclip } from 'react-icons/fi';

const DesktopShowcase: React.FC = () => {
  const [activeView, setActiveView] = useState<'desktop' | 'cli'>('desktop');

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
            <Typography variant='h2' className='text-2xl sm:text-3xl font-bold mb-4'>
              Two Ways to Build
            </Typography>
            <Typography variant='body' color='muted' className='text-lg max-w-3xl mx-auto mb-6'>
              Choose between our Electron desktop app with a full GUI or the CLI built with Ink for terminal enthusiasts.
            </Typography>
            
            <div className='inline-flex gap-2 p-1 bg-gray-200 dark:bg-gray-800 rounded-lg'>
              <button
                onClick={() => setActiveView('desktop')}
                className={`px-6 py-2 rounded-md transition-all flex items-center gap-2 ${
                  activeView === 'desktop' 
                    ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-md' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <FaDesktop />
                Desktop App
              </button>
              <button
                onClick={() => setActiveView('cli')}
                className={`px-6 py-2 rounded-md transition-all flex items-center gap-2 ${
                  activeView === 'cli' 
                    ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-md' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <FaTerminal />
                CLI Tool
              </button>
            </div>
          </motion.div>
          
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
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
                  <ul className='space-y-2'>
                    {activeView === 'desktop' ? (
                      <>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
                          <Typography variant='body' color='muted'>
                            Modern chat interface with transaction approval cards
                          </Typography>
                        </li>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
                          <Typography variant='body' color='muted'>
                            File attachments and multi-modal support
                          </Typography>
                        </li>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
                          <Typography variant='body' color='muted'>
                            HCS-10 profile integration with AI agent display
                          </Typography>
                        </li>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
                          <Typography variant='body' color='muted'>
                            Real-time connection status and network indicators
                          </Typography>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
                          <Typography variant='body' color='muted'>
                            Interactive setup wizard for first-time configuration
                          </Typography>
                        </li>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
                          <Typography variant='body' color='muted'>
                            Real-time chat with colored output and status badges
                          </Typography>
                        </li>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
                          <Typography variant='body' color='muted'>
                            MCP server configuration through terminal UI
                          </Typography>
                        </li>
                        <li className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
                          <Typography variant='body' color='muted'>
                            Keyboard shortcuts and vim-like navigation
                          </Typography>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div>
                  <Typography variant='h6' className='font-semibold mb-2'>
                    Installation
                  </Typography>
                  <Terminal title='install.sh' className='text-sm'>
                    {activeView === 'desktop' ? (
                      <>
                        <Terminal.Line comment='# Clone and build from source:' type='comment' />
                        <Terminal.Line command='git clone https://github.com/hashgraph-online/conversational-agent' />
                        <Terminal.Line command='cd conversational-agent/app' />
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
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className='relative'
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesktopShowcase;