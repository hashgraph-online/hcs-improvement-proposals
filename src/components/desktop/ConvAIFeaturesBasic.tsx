import React from 'react';

const ConvAIFeaturesBasic: React.FC = () => {
  return (
    <section className='py-24 bg-gray-50 dark:bg-gray-800'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] bg-clip-text text-transparent'>
              Your AI Assistant for Hedera
            </span>
          </h2>
          <p className='text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto'>
            A powerful desktop application that combines conversational AI with Hedera blockchain capabilities.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <div className='bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl'>
            <div className='w-12 h-12 bg-gradient-to-br from-[#a679f0] to-[#5599fe] rounded-xl flex items-center justify-center mb-4'>
              <span className='text-white text-xl'>💬</span>
            </div>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
              AI-Powered Chat
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>
              Chat naturally with AI assistants that understand blockchain operations and execute Hedera transactions.
            </p>
          </div>

          <div className='bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl'>
            <div className='w-12 h-12 bg-gradient-to-br from-[#5599fe] to-[#48df7b] rounded-xl flex items-center justify-center mb-4'>
              <span className='text-white text-xl'>🌐</span>
            </div>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
              Hedera Integration
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>
              Seamlessly interact with the Hedera network - send HBAR, manage tokens, create smart contracts.
            </p>
          </div>

          <div className='bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl'>
            <div className='w-12 h-12 bg-gradient-to-br from-[#48df7b] to-[#a679f0] rounded-xl flex items-center justify-center mb-4'>
              <span className='text-white text-xl'>🔌</span>
            </div>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
              MCP Extensions
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>
              Extend your assistant with Model Context Protocol servers for file access, databases, and more.
            </p>
          </div>

          <div className='bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl'>
            <div className='w-12 h-12 bg-gradient-to-br from-[#a679f0] to-[#5599fe] rounded-xl flex items-center justify-center mb-4'>
              <span className='text-white text-xl'>🤖</span>
            </div>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
              HCS-10 Profiles
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>
              Register as an AI agent on the Hedera network and connect with other decentralized agents.
            </p>
          </div>

          <div className='bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl'>
            <div className='w-12 h-12 bg-gradient-to-br from-[#5599fe] to-[#48df7b] rounded-xl flex items-center justify-center mb-4'>
              <span className='text-white text-xl'>🔒</span>
            </div>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
              Secure & Private
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>
              Your credentials stay local. Native OS keychain integration keeps your private keys safe.
            </p>
          </div>

          <div className='bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl'>
            <div className='w-12 h-12 bg-gradient-to-br from-[#48df7b] to-[#a679f0] rounded-xl flex items-center justify-center mb-4'>
              <span className='text-white text-xl'>⚙️</span>
            </div>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
              Customizable
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>
              Configure AI models, network settings, and install plugins to match your workflow.
            </p>
          </div>
        </div>

        <div className='text-center mt-12'>
          <a
            href='https://github.com/hashgraph-online/conversational-agent/releases'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center px-8 py-4 bg-[#a679f0] hover:bg-[#a679f0]/90 text-white rounded-xl font-semibold text-lg shadow-xl transition-colors duration-300'
          >
            <span className='mr-3'>📥</span>
            Download Desktop App
          </a>
        </div>
      </div>
    </section>
  );
};

export default ConvAIFeaturesBasic;