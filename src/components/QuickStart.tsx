import React from 'react';
import Terminal from './Terminal';
import CodeSnippet from './CodeSnippet';
import Typography from './Typography';

interface QuickStartProps {
  className?: string;
}

const QuickStart: React.FC<QuickStartProps> = ({ className = '' }) => {
  const installCommand = 'npm install @hashgraphonline/standards-sdk';

  const quickExample = `import { HCS1Client } from '@hashgraphonline/standards-sdk';

const client = new HCS1Client({
  network: 'testnet',
  operatorId: '0.0.123456',
  operatorPrivateKey: 'your-private-key'
});

// Create and inscribe content
const result = await client.inscribe({
  data: 'Hello, Hedera!',
  metadata: { type: 'text/plain' }
});

console.log('Topic ID:', result.topicId);`;

  return (
    <div className={`space-y-8 ${className}`}>
      <div>
        <Typography variant='h3' className='mb-4'>
          Quick Start
        </Typography>
        <Typography variant='body1' className='mb-6 text-gray-600'>
          Get started with HCS standards in under 60 seconds
        </Typography>
      </div>

      <div>
        <Typography variant='h5' className='mb-3'>
          1. Install the SDK
        </Typography>
        <Terminal title='bash'>
          <Terminal.Line command={installCommand} />
          <Terminal.Line output='+ @hashgraphonline/standards-sdk@latest' />
          <Terminal.Line output='added 42 packages in 3.2s' />
        </Terminal>
      </div>

      <div>
        <Typography variant='h5' className='mb-3'>
          2. Start Building
        </Typography>
        <CodeSnippet code={quickExample} language='typescript' />
      </div>

      <div className='bg-gray-50 rounded-lg p-6'>
        <Typography variant='h6' className='mb-2'>
          What's Next?
        </Typography>
        <Typography variant='body2' className='text-gray-600 mb-4'>
          Explore our comprehensive documentation and examples
        </Typography>
        <div className='flex space-x-4'>
          <a
            href='/docs/standards/hcs-1/'
            className='text-brand-blue hover:text-brand-purple font-mono text-sm font-medium'
          >
            View Docs →
          </a>
          <a
            href='/docs/libraries/standards-sdk'
            className='text-brand-blue hover:text-brand-purple font-mono text-sm font-medium'
          >
            SDK Reference →
          </a>
        </div>
      </div>
    </div>
  );
};

export default QuickStart;
