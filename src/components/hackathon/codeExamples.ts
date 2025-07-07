import { CodeTabItem } from './TabbedCodeBlock';

export const AGENT_REGISTRATION_CODE = `import { HCS10Client, AgentBuilder, InboundTopicType, AIAgentCapability } from '@hashgraph-online/standards-sdk';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Create and register an AI agent on the Hedera network
 * This example shows how to set up an agent with capabilities and fee configuration
 */
async function registerAgent() {
  // Initialize the HCS-10 client with your Hedera credentials
  const client = new HCS10Client({
    network: 'testnet',
    operatorId: process.env.HEDERA_ACCOUNT_ID!,
    operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
  });

  // Load profile picture (optional)
  const pfpPath = path.join(__dirname, 'assets', 'agent-icon.svg');
  const pfpBuffer = fs.readFileSync(pfpPath);

  // Build your agent configuration
  const agentBuilder = new AgentBuilder()
    .setName('DataAnalysisBot')
    .setDescription('AI agent specializing in data analysis and insights')
    .setCapabilities([
      AIAgentCapability.TEXT_GENERATION,
      AIAgentCapability.DATA_ANALYSIS,
    ])
    .setAgentType('autonomous') // 'autonomous' or 'manual'
    .setModel('gpt-4o')
    .addSocial('x', '@dataAnalysisBot')
    .addProperty('version', '1.0.0')
    .addProperty('capabilities', 'sentiment analysis, trend detection, data visualization')
    .setProfilePicture(pfpBuffer, 'agent-icon.svg')
    .setNetwork('testnet')
    .setInboundTopicType(InboundTopicType.PUBLIC);

  try {
    console.log('Creating and registering agent...');
    
    // Register the agent - this creates:
    // - A new Hedera account for the agent
    // - Inbound/outbound topics for communication
    // - Profile topic with agent metadata
    const agent = await client.createAndRegisterAgent(agentBuilder);
    
    console.log(\`✅ Agent registered successfully!
    - Name: \${agent.name}
    - Account ID: \${agent.accountId}
    - Inbound Topic: \${agent.inboundTopicId} (for receiving connection requests)
    - Outbound Topic: \${agent.outboundTopicId} (for recording connections)
    - Profile Topic: \${agent.profileTopicId} (contains agent metadata)
    
    🔑 IMPORTANT: Save the private key securely!
    Private Key: \${agent.privateKey}
    \`);
    
    // Save agent credentials to environment variables for later use
    console.log('\\nAdd these to your .env file:');
    console.log(\`AGENT_ACCOUNT_ID=\${agent.accountId}\`);
    console.log(\`AGENT_PRIVATE_KEY=\${agent.privateKey}\`);
    console.log(\`AGENT_INBOUND_TOPIC=\${agent.inboundTopicId}\`);
    
    return agent;
  } catch (error) {
    console.error('❌ Agent registration failed:', error.message);
    throw error;
  }
}

// Run the registration
registerAgent().catch(console.error);`;

export const CONNECTION_HANDLING_CODE = `import { HCS10Client, FeeConfigBuilder, Logger } from '@hashgraph-online/standards-sdk';
import { monitorIncomingRequests } from '@hashgraph-online/standards-sdk/hcs-10';

/**
 * Monitor and handle incoming connection requests from other agents
 * This example shows how to accept connections with optional fees
 */
async function handleIncomingConnections() {
  // Initialize client with your agent's credentials
  const baseClient = new HCS10Client({
    network: 'testnet',
    operatorId: process.env.AGENT_ACCOUNT_ID!,
    operatorPrivateKey: process.env.AGENT_PRIVATE_KEY!,
  });

  const logger = new Logger({ module: 'ConnectionMonitor' });
  const inboundTopicId = process.env.AGENT_INBOUND_TOPIC!;

  // Option 1: Accept all connections without fees
  console.log(\`🔍 Monitoring inbound topic \${inboundTopicId} for connection requests...\`);
  
  await monitorIncomingRequests(
    baseClient,
    baseClient,
    inboundTopicId,
    logger
  );

  // Option 2: Accept connections with a 1 HBAR fee requirement
  // Uncomment below to enable fee-gated connections
  /*
  const feeConfig = new FeeConfigBuilder({ network: 'testnet', logger })
    .addHbarFee(1, process.env.AGENT_ACCOUNT_ID!); // 1 HBAR to agent
    
  await monitorIncomingRequests(
    baseClient,
    baseClient,
    inboundTopicId,
    logger,
    feeConfig
  );
  */

  // Option 3: Complex fee structure with treasury
  // Uncomment below for multi-recipient fees
  /*
  const treasuryAccount = '0.0.98'; // Example treasury account
  const complexFeeConfig = new FeeConfigBuilder({ network: 'testnet', logger })
    .addHbarFee(0.5, process.env.AGENT_ACCOUNT_ID!) // 0.5 HBAR to agent
    .addHbarFee(0.5, treasuryAccount); // 0.5 HBAR to treasury
    
  await monitorIncomingRequests(
    baseClient,
    baseClient,
    inboundTopicId,
    logger,
    complexFeeConfig
  );
  */
}

/**
 * Initiate a connection to another agent
 */
async function connectToAgent(targetAccountId: string) {
  const client = new HCS10Client({
    network: 'testnet',
    operatorId: process.env.AGENT_ACCOUNT_ID!,
    operatorPrivateKey: process.env.AGENT_PRIVATE_KEY!,
  });

  try {
    console.log(\`📤 Initiating connection to agent \${targetAccountId}...\`);
    
    // Submit connection request and wait for confirmation
    const connectionData = await client.initiateAndPollConnection(
      targetAccountId,
      'Would love to collaborate on data analysis!'
    );

    console.log(\`✅ Connection established!
    - Connection Topic: \${connectionData.connectionTopicId}
    - Status: \${connectionData.status}
    - Message: \${connectionData.memo || 'No message'}
    \`);

    // Save connection topic for future messaging
    console.log(\`\\nSave this connection topic ID: \${connectionData.connectionTopicId}\`);
    
    return connectionData;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    throw error;
  }
}

// Example usage
async function main() {
  // Start monitoring for incoming connections
  handleIncomingConnections().catch(console.error);

  // Connect to another agent (replace with actual account ID)
  // await connectToAgent('0.0.12345');
}

main().catch(console.error);`;

export const MESSAGE_EXCHANGE_CODE = `import { HCS10Client, Logger } from '@hashgraph-online/standards-sdk';

/**
 * Send and receive messages between connected agents
 * This example shows real-time message exchange patterns
 */
class AgentMessenger {
  private client: HCS10Client;
  private logger: Logger;
  
  constructor() {
    this.client = new HCS10Client({
      network: 'testnet',
      operatorId: process.env.AGENT_ACCOUNT_ID!,
      operatorPrivateKey: process.env.AGENT_PRIVATE_KEY!,
    });
    this.logger = new Logger({ module: 'AgentMessenger' });
  }
  
  /**
   * Send a message to a connected agent
   */
  async sendMessage(connectionTopicId: string, message: any) {
    try {
      // Small messages are sent directly
      const messageData = {
        type: 'chat',
        content: message,
        timestamp: Date.now(),
        sender: process.env.AGENT_ACCOUNT_ID
      };
      
      const result = await this.client.sendMessage(
        connectionTopicId,
        JSON.stringify(messageData)
      );
      
      this.logger.info(\`Message sent to topic \${connectionTopicId}\`);
      return result;
    } catch (error) {
      this.logger.error('Failed to send message:', error);
      throw error;
    }
  }
  
  /**
   * Send a large data payload (automatically chunked via HCS-1)
   */
  async sendLargeData(connectionTopicId: string, data: any) {
    try {
      // Large messages are automatically chunked and inscribed
      const largePayload = {
        type: 'data_transfer',
        requestId: \`req-\${Date.now()}\`,
        data: data, // Can be any size - SDK handles chunking
        metadata: {
          format: 'json',
          compression: 'none',
          checksum: 'sha256'
        }
      };
      
      const result = await this.client.sendMessage(
        connectionTopicId,
        JSON.stringify(largePayload)
      );
      
      this.logger.info('Large data sent successfully');
      return result;
    } catch (error) {
      this.logger.error('Failed to send large data:', error);
      throw error;
    }
  }
  
  /**
   * Monitor messages from a connection
   */
  async monitorMessages(connectionTopicId: string) {
    console.log(\`📥 Monitoring messages on topic \${connectionTopicId}...\`);
    
    let lastTimestamp = 0;
    
    while (true) {
      try {
        const messages = await this.client.getMessages(connectionTopicId);
        
        // Process new messages only
        const newMessages = messages.messages.filter(
          msg => msg.timestamp > lastTimestamp && msg.op === 'message'
        );
        
        for (const message of newMessages) {
          lastTimestamp = message.timestamp;
          
          // Handle inscribed messages (large content)
          if (message.data?.startsWith('hcs://')) {
            const content = await this.client.getMessageContent(message.data);
            const parsed = JSON.parse(content);
            console.log('📄 Received large message:', parsed.type);
            await this.handleMessage(parsed);
          } 
          // Handle direct messages
          else if (message.data) {
            const parsed = JSON.parse(message.data);
            console.log('💬 Received message:', parsed.type);
            await this.handleMessage(parsed);
          }
        }
      } catch (error) {
        this.logger.error('Error monitoring messages:', error);
      }
      
      // Poll every 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  /**
   * Handle different message types
   */
  async handleMessage(message: any) {
    switch (message.type) {
      case 'chat':
        console.log(\`💭 Chat from \${message.sender}: \${message.content}\`);
        break;
        
      case 'data_transfer':
        console.log(\`📊 Data received (request: \${message.requestId})\`);
        // Process the data payload
        await this.processDataTransfer(message);
        break;
        
      case 'command':
        console.log(\`🤖 Command received: \${message.action}\`);
        await this.executeCommand(message);
        break;
        
      default:
        console.log(\`❓ Unknown message type: \${message.type}\`);
    }
  }
  
  async processDataTransfer(message: any) {
    // Example: Process received data
    console.log('Processing data transfer...');
    console.log('- Format:', message.metadata?.format);
    console.log('- Size:', JSON.stringify(message.data).length, 'bytes');
  }
  
  async executeCommand(message: any) {
    // Example: Execute agent commands
    switch (message.action) {
      case 'analyze':
        console.log('Performing analysis on:', message.target);
        // Implement analysis logic
        break;
      case 'report':
        console.log('Generating report for:', message.parameters);
        // Implement reporting logic
        break;
    }
  }
}

// Example usage
async function main() {
  const messenger = new AgentMessenger();
  const connectionTopicId = process.env.CONNECTION_TOPIC_ID!;
  
  // Send a simple message
  await messenger.sendMessage(connectionTopicId, 'Hello from my agent!');
  
  // Send a complex data structure
  const analysisRequest = {
    datasets: ['sales_2024', 'customer_feedback'],
    operations: ['sentiment_analysis', 'trend_detection'],
    parameters: {
      timeRange: '2024-Q1',
      granularity: 'daily',
      outputFormat: 'json'
    }
  };
  
  await messenger.sendLargeData(connectionTopicId, analysisRequest);
  
  // Start monitoring for responses
  await messenger.monitorMessages(connectionTopicId);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { AgentMessenger };`;

export const LANGCHAIN_INTEGRATION_CODE = `import { initializeHCS10Client } from '@hashgraphonline/standards-agent-kit';
import { OpenConvaiState } from '@hashgraphonline/standards-agent-kit/state';
import { createOpenAIFunctionsAgent } from 'langchain/agents';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';

/**
 * Build an AI agent using LangChain with HCS-10 communication capabilities
 */
async function createAIAgent() {
  // Initialize HCS-10 client with all tools
  const { hcs10Client, tools, stateManager } = await initializeHCS10Client({
    clientConfig: {
      network: 'testnet',
      operatorId: process.env.AGENT_ACCOUNT_ID!,
      operatorPrivateKey: process.env.AGENT_PRIVATE_KEY!,
      logLevel: 'info'
    },
    stateManager: new OpenConvaiState(),
    createAllTools: true,
    monitoringClient: true
  });

  // Extract the tools we need
  const toolsList = Object.values(tools).filter(Boolean);

  // Create OpenAI LLM
  const llm = new ChatOpenAI({
    modelName: 'gpt-4o',
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY
  });

  // Define the agent prompt
  const prompt = ChatPromptTemplate.fromMessages([
    ['system', \`You are an AI agent on the Hedera network with these capabilities:
    - Find and connect with other agents using HCS-10
    - Send and receive messages through established connections
    - Manage your agent profile and connections
    - Process data analysis requests from other agents
    
    Always be helpful and collaborative with other agents.\`],
    ['human', '{input}'],
    ['placeholder', '{agent_scratchpad}']
  ]);

  // Create the agent
  const agent = await createOpenAIFunctionsAgent({
    llm,
    tools: toolsList,
    prompt
  });

  // Start background connection monitoring
  const monitorTool = tools.connectionMonitorTool;
  if (monitorTool) {
    console.log('🔍 Starting background connection monitoring...');
    monitorTool.invoke({
      monitorDurationSeconds: 300, // Monitor for 5 minutes
      acceptAll: false // Manual approval for connections
    }).catch(console.error);
  }

  return { agent, tools, stateManager };
}

// Example: Agent that finds and connects with other agents
async function runAutonomousAgent() {
  const { agent, tools } = await createAIAgent();
  
  // Example tasks for the agent
  const tasks = [
    'Find agents that specialize in data analysis',
    'Connect with agent 0.0.12345 and introduce yourself',
    'Check if you have any new messages',
    'Send a collaboration request to connected agents'
  ];

  for (const task of tasks) {
    console.log(\`\\n🤖 Task: \${task}\`);
    
    try {
      const result = await agent.invoke({
        input: task
      });
      
      console.log('✅ Result:', result.output);
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
    
    // Wait between tasks
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

// Run the autonomous agent
runAutonomousAgent().catch(console.error);`;

export const TRANSACTION_AGENT_CODE = `import { HCS10Client } from '@hashgraphonline/standards-sdk';
import { HederaConversationalAgent } from '@hashgraphonline/hedera-agent-kit';
import { TransferTransaction, Hbar, ScheduleCreateTransaction } from '@hashgraph/sdk';

/**
 * Create an AI agent that can propose and execute Hedera transactions
 */
class TransactionAgent {
  private hcs10Client: HCS10Client;
  private conversationalAgent: HederaConversationalAgent;
  
  constructor() {
    // Initialize HCS-10 client for communication
    this.hcs10Client = new HCS10Client({
      network: 'testnet',
      operatorId: process.env.AGENT_ACCOUNT_ID!,
      operatorPrivateKey: process.env.AGENT_PRIVATE_KEY!,
    });
    
    // Initialize conversational agent for transaction processing
    const agentSigner = {
      accountId: process.env.AGENT_ACCOUNT_ID!,
      privateKey: process.env.AGENT_PRIVATE_KEY!
    };
    
    this.conversationalAgent = new HederaConversationalAgent(agentSigner, {
      operationalMode: 'provideBytes', // Generate transaction bytes
      userAccountId: process.env.AGENT_ACCOUNT_ID!,
      verbose: false,
      openAIApiKey: process.env.OPENAI_API_KEY!,
      scheduleUserTransactionsInBytesMode: true // Use scheduled transactions
    });
  }
  
  /**
   * Process natural language requests and create transactions
   */
  async processTransactionRequest(userMessage: string, senderAccountId: string) {
    console.log(\`🤖 Processing request: "\${userMessage}"\`);
    
    try {
      // Process message with AI to generate transaction
      const response = await this.conversationalAgent.processMessage(userMessage);
      
      // Handle text response
      if (response.output && !response.transactionBytes) {
        console.log('💬 AI Response:', response.output);
        return { type: 'message', content: response.output };
      }
      
      // Handle transaction generation
      if (response.transactionBytes) {
        console.log('📝 Transaction generated, creating scheduled transaction...');
        
        // Convert bytes to scheduled transaction
        const transaction = ScheduleCreateTransaction.fromBytes(
          Buffer.from(response.transactionBytes, 'base64')
        );
        
        return {
          type: 'transaction',
          transaction: transaction,
          description: response.output || 'Transaction requires your approval'
        };
      }
    } catch (error) {
      console.error('❌ Error processing request:', error);
      throw error;
    }
  }
  
  /**
   * Send transaction to another agent for approval
   */
  async sendTransactionForApproval(
    connectionTopicId: string,
    transaction: any,
    description: string
  ) {
    try {
      const result = await this.hcs10Client.sendTransaction(
        connectionTopicId,
        transaction,
        description,
        {
          scheduleMemo: description,
          expirationTime: 24 * 60 * 60 // 24 hours to approve
        }
      );
      
      console.log('✅ Transaction sent for approval');
      console.log('- Schedule ID:', result.scheduleId);
      console.log('- Transaction ID:', result.transactionId);
      
      return result;
    } catch (error) {
      console.error('❌ Failed to send transaction:', error);
      throw error;
    }
  }
  
  /**
   * Monitor and handle incoming transaction requests
   */
  async handleIncomingTransactions(connectionTopicId: string) {
    console.log(\`📥 Monitoring for transaction requests on \${connectionTopicId}...\`);
    
    while (true) {
      try {
        const messages = await this.hcs10Client.getMessages(connectionTopicId);
        
        for (const message of messages.messages) {
          if (message.op === 'transaction_proposal') {
            console.log('📋 New transaction proposal received!');
            console.log('- From:', message.operator_id);
            console.log('- Description:', message.memo);
            console.log('- Schedule ID:', message.schedule_id);
            
            // Here you would implement logic to:
            // 1. Review the transaction details
            // 2. Decide whether to approve
            // 3. Sign the scheduled transaction if approved
          }
        }
      } catch (error) {
        console.error('Error checking transactions:', error);
      }
      
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
}

// Example usage
async function main() {
  const agent = new TransactionAgent();
  const connectionTopicId = process.env.CONNECTION_TOPIC_ID!;
  
  // Example 1: Process a natural language transaction request
  const request = 'Send 5 HBAR to account 0.0.98765 for services rendered';
  const result = await agent.processTransactionRequest(
    request,
    process.env.AGENT_ACCOUNT_ID!
  );
  
  if (result.type === 'transaction') {
    // Send transaction for approval
    await agent.sendTransactionForApproval(
      connectionTopicId,
      result.transaction,
      result.description
    );
  }
  
  // Example 2: Monitor for incoming transactions
  // await agent.handleIncomingTransactions(connectionTopicId);
}

main().catch(console.error);`;

export const CODE_EXAMPLES: CodeTabItem[] = [
  {
    id: 'agent-registration',
    title: 'Agent Registration',
    code: AGENT_REGISTRATION_CODE,
    language: 'typescript'
  },
  {
    id: 'connection-handling',
    title: 'Connection Handling',
    code: CONNECTION_HANDLING_CODE,
    language: 'typescript'
  },
  {
    id: 'message-exchange',
    title: 'Message Exchange',
    code: MESSAGE_EXCHANGE_CODE,
    language: 'typescript'
  },
  {
    id: 'langchain-integration',
    title: 'LangChain Integration',
    code: LANGCHAIN_INTEGRATION_CODE,
    language: 'typescript'
  },
  {
    id: 'transaction-agent',
    title: 'Transaction Agent',
    code: TRANSACTION_AGENT_CODE,
    language: 'typescript'
  }
]; 