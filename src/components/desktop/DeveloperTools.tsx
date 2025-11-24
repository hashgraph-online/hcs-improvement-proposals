import React from 'react';
import { motion } from 'framer-motion';
import { FaDesktop, FaTerminal, FaNpm, FaPlug, FaCode, FaRobot } from 'react-icons/fa';
import InteractiveToolsSection, { Tool } from '../ui/InteractiveToolsSection';

type DeveloperToolsProps = {};

const DeveloperTools: React.FC<DeveloperToolsProps> = () => {
  const tools: Tool[] = [
    {
      icon: <FaDesktop />,
      title: 'HOL Desktop',
      description: 'Full-featured Electron app with chat interface, transaction approvals, and MCP server management. Cross-platform support for Windows, macOS, and Linux.',
      link: 'https://github.com/hashgraph-online/desktop',
      installCommand: 'git clone https://github.com/hashgraph-online/desktop',
      color: 'purple',
      quickStart: `# Clone and run locally
git clone https://github.com/hashgraph-online/desktop
cd desktop
pnpm install
pnpm dev

# For production build
pnpm build`,
      docsLink: 'https://github.com/hashgraph-online/desktop#readme'
    },
    {
      icon: <FaTerminal />,
      title: 'CLI Tool',
      description: 'Terminal interface built with Ink (React for CLIs). Same AI capabilities as HOL Desktop with keyboard navigation and terminal-native UI.',
      link: 'https://github.com/hashgraph-online/conversational-agent/tree/main/cli',
      installCommand: 'npx @hashgraphonline/conversational-agent',
      color: 'blue',
      quickStart: `# Run the CLI directly
npx @hashgraphonline/conversational-agent

# Set your environment variables
export HEDERA_ACCOUNT_ID="0.0.YOUR_ID"
export HEDERA_PRIVATE_KEY="YOUR_PRIVATE_KEY"
export OPENAI_API_KEY="YOUR_API_KEY"

# Start chatting with the agent
npx @hashgraphonline/conversational-agent`,
      docsLink: 'https://github.com/hashgraph-online/conversational-agent/tree/main/cli#readme'
    },
    {
      icon: <FaNpm />,
      title: 'Conversational Agent SDK',
      description: 'Core SDK for building AI agents on Hedera. Powers both HOL Desktop and the CLI with full access to Hedera network capabilities.',
      link: 'https://www.npmjs.com/package/@hashgraphonline/conversational-agent',
      installCommand: 'npm install @hashgraphonline/conversational-agent',
      color: 'green',
      quickStart: `import { ConversationalAgent } from '@hashgraphonline/conversational-agent';

const agent = new ConversationalAgent({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
  network: 'testnet',
  openAIApiKey: process.env.OPENAI_API_KEY!,
  openAIModelName: 'gpt-4o',
  verbose: true
});

// Initialize the agent
await agent.initialize();

// Process natural language commands
const response = await agent.processMessage(
  'Send 1 HBAR to 0.0.800 and create a topic for updates'
);`,
      docsLink: '/docs/libraries/conversational-agent/'
    },
    {
      icon: <FaPlug />,
      title: 'MCP Servers',
      description: 'Model Context Protocol servers enable AI agents to interact with external systems, access files, and use tools.',
      link: 'https://github.com/hashgraph-online/desktop#mcp-support',
      color: 'purple',
      quickStart: `// Configure MCP servers in your app
const mcpConfig = {
  mcpServers: {
    filesystem: {
      command: 'npx',
      args: ['@modelcontextprotocol/server-filesystem', '/path/to/files']
    },
    github: {
      command: 'npx',
      args: ['@modelcontextprotocol/server-github'],
      env: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN
      }
    }
  }
};

// MCP servers are automatically managed by HOL Desktop`,
      docsLink: 'https://modelcontextprotocol.io/docs'
    },
    {
      icon: <FaCode />,
      title: 'Langchain Tools',
      description: 'Extend agent capabilities with custom Langchain tools for domain-specific operations and integrations.',
      link: 'https://github.com/hashgraph-online/desktop#langchain-tools',
      color: 'blue',
      quickStart: `import { Tool } from '@langchain/core/tools';
import { z } from 'zod';

class CustomTool extends Tool {
  name = 'custom-hedera-tool';
  description = 'Custom tool for specific Hedera operations';
  
  schema = z.object({
    action: z.string(),
    params: z.any()
  });
  
  async _call(input: z.infer<typeof this.schema>) {
    // Your custom logic here
    return \`Executed \${input.action} with params\`;
  }
}

// Add to agent
agent.addTool(new CustomTool());`,
      docsLink: 'https://js.langchain.com/docs/modules/tools/'
    },
    {
      icon: <FaRobot />,
      title: 'HCS Standards',
      description: 'Implement HCS-10 agents, HCS-11 profiles, and HCS-2 registries for decentralized AI on Hedera.',
      link: 'https://hol.org/docs/standards/',
      color: 'green',
      quickStart: `// HCS-10: Agent Communication
const agent = await hcs10Client.createAndRegisterAgent(
  new AgentBuilder()
    .setName('MyAgent')
    .setCapabilities([AIAgentCapability.TEXT_GENERATION])
    .setAgentType('autonomous')
);

// HCS-11: User Profiles
const profile = await hcs11Client.createProfile({
  name: 'User Name',
  bio: 'AI researcher',
  avatar: 'ipfs://...',
  socialLinks: { twitter: '@handle' }
});

// HCS-2: Registry
const registry = await hcs2Client.getRegistry('0.0.REGISTRY_ID');`,
      docsLink: '/docs/standards/'
    }
  ];

  return (
    <section className='py-20'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <InteractiveToolsSection
              tools={tools}
              title='Developer Tools & Resources'
              subtitle='Everything you need to build with AI agents on Hedera'
              browserTitle='hol-desktop-tools.dev'
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperTools;
