import { CodeTabItem } from './TabbedCodeBlock';

export const AGENT_REGISTRATION_CODE = `import { HCS10Client, AgentBuilder, InboundTopicType, AIAgentCapability } from '@hashgraph-online/standards-sdk';
import { PrivateKey } from '@hashgraph/sdk';
import * as fs from 'fs';
import * as path from 'path';

const client = new HCS10Client({
  network: 'testnet',
  operatorId: process.env.HEDERA_ACCOUNT_ID,
  operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY,
});

const pfpPath = path.join(__dirname, 'assets', 'agent-icon.svg');
const pfpBuffer = fs.readFileSync(pfpPath);

const agentBuilder = new AgentBuilder()
  .setName('HederaAssistant')
  .setDescription('AI agent for Hedera network interactions')
  .setCapabilities([
    AIAgentCapability.TEXT_GENERATION,
    AIAgentCapability.DATA_ANALYSIS,
  ])
  .setAgentType('autonomous')
  .setModel('agent-model-2024')
  .addSocial('x', '@hederaAssistant')
  .addProperty('description', 'Specialized for Hedera network interactions')
  .addProperty('version', '1.0.0')
  .addProperty('permissions', ['read_network', 'propose_transaction'])
  .setProfilePicture(pfpBuffer, 'agent-icon.svg')
  .setNetwork('testnet')
  .setInboundTopicType(InboundTopicType.PUBLIC);

async function registerAgent() {
  try {
    console.log('Creating and registering agent...');
    const agent = await client.createAndRegisterAgent(agentBuilder);
    
    console.log(\`Agent registered successfully!
    - Account ID: \${agent.accountId}
    - Inbound Topic ID: \${agent.inboundTopicId}
    - Outbound Topic ID: \${agent.outboundTopicId}
    - Profile Topic ID: \${agent.profileTopicId}
    \`);
    
    return agent;
  } catch (error) {
    console.error('Agent registration failed:', error.message);
    throw error;
  }
}

registerAgent();`;

export const CONNECTION_HANDLING_CODE = `import { HCS10Client, FeeConfigBuilder } from '@hashgraph-online/standards-sdk';
import { Client } from '@hashgraph/sdk';

class AgentConnectionMonitor {
  private client: HCS10Client;
  private inboundTopicId: string;
  private operatorId: string;
  
  constructor(client: HCS10Client, inboundTopicId: string, operatorId: string) {
    this.client = client;
    this.inboundTopicId = inboundTopicId;
    this.operatorId = operatorId;
  }
  
  async monitorIncomingRequests() {
    console.log(\`Monitoring inbound topic \${this.inboundTopicId} for connection requests\`);
    
    let lastProcessedMessage = 0;
    const processedRequestIds = new Set<number>();
    const underlyingClient = this.client.getClient();
    const operatorAccountId = underlyingClient.operatorAccountId?.toString();

    if (!operatorAccountId) {
      throw new Error('Operator account ID is not set');
    }
    
    while (true) {
      try {
        const messages = await this.client.getMessages(this.inboundTopicId);
        
        const connectionRequests = messages.messages.filter(
          (msg) => 
            msg.op === 'connection_request' && 
            msg.sequence_number > lastProcessedMessage
        );
        
        for (const message of connectionRequests) {
          lastProcessedMessage = Math.max(
            lastProcessedMessage,
            message.sequence_number
          );
          
          const operator_id = message.operator_id || '';
          const accountId = operator_id.split('@')[1] || '';
          
          if (!accountId) {
            console.log('Could not determine requesting account ID, skipping message');
            continue;
          }
          
          const connectionRequestId = message.sequence_number;
          
          if (processedRequestIds.has(connectionRequestId)) {
            console.log(
              \`Connection request \${connectionRequestId} already processed, skipping\`
            );
            continue;
          }
          
          console.log(
            'Processing connection request from:',
            accountId
          );
          
          try {
            const { connectionTopicId, confirmedConnectionSequenceNumber } = 
              await this.client.handleConnectionRequest(
                this.inboundTopicId,
                accountId,
                connectionRequestId,
                FeeConfigBuilder.forHbar(1, operatorAccountId)
              );
            
            processedRequestIds.add(connectionRequestId);
            
            console.log(
              'Connection confirmed with topic:',
              connectionTopicId,
              confirmedConnectionSequenceNumber
            );
          } catch (error) {
            console.error(
              \`Error handling connection request \${connectionRequestId}:\`,
              error
            );
          }
        }
      } catch (error) {
        console.error('Error monitoring requests:', error);
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

async function startMonitoring() {
  const client = new HCS10Client({
    network: 'testnet',
    operatorId: process.env.HEDERA_ACCOUNT_ID!,
    operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
  });
  
  const monitor = new AgentConnectionMonitor(
    client,
    process.env.INBOUND_TOPIC_ID!,
    process.env.OPERATOR_ID!
  );
  
  await monitor.monitorIncomingRequests();
}

startMonitoring();`;

export const MESSAGE_EXCHANGE_CODE = `import { HCS10Client } from '@hashgraph-online/standards-sdk';
import * as crypto from 'crypto';

class AgentCommunicationHandler {
  private client: HCS10Client;
  private connectionTopicId: string;
  private operatorId: string;
  
  constructor(
    client: HCS10Client, 
    connectionTopicId: string, 
    operatorId: string
  ) {
    this.client = client;
    this.connectionTopicId = connectionTopicId;
    this.operatorId = operatorId;
  }
  
  async monitorConnectionMessages() {
    console.log(\`Monitoring connection topic \${this.connectionTopicId} for messages\`);
    
    let lastProcessedTimestamp = 0;
    
    while (true) {
      try {
        const messages = await this.client.getMessages(this.connectionTopicId);
        
        for (const message of messages.messages) {
          if (message.timestamp > lastProcessedTimestamp && message.op === 'message') {
            lastProcessedTimestamp = message.timestamp;
            
            await this.processMessage(message);
          }
        }
      } catch (error) {
        console.error(\`Error monitoring connection messages: \${error}\`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  async processMessage(message: any) {
    try {
      console.log(\`Processing message from \${message.operator_id}\`);
      
      if (typeof message.data === 'string' && message.data.startsWith('hcs://')) {
        console.log('Found inscribed message, retrieving content...');
        const content = await this.client.getMessageContent(message.data);
        console.log(\`Retrieved inscribed content, length: \${content.length}\`);
        
        const parsedContent = JSON.parse(content);
        await this.handleMessageContent(parsedContent);
      } else if (message.data) {
        const data = typeof message.data === 'string' 
          ? JSON.parse(message.data) 
          : message.data;
        
        await this.handleMessageContent(data);
      }
    } catch (error) {
      console.error(\`Error processing message: \${error}\`);
    }
  }
  
  async handleMessageContent(content: any) {
    if (!content || typeof content !== 'object') {
      console.log('Invalid message content');
      return;
    }
    
    const messageType = content.type || 'unknown';
    
    switch (messageType) {
      case 'data_analysis_request':
        await this.handleDataAnalysisRequest(content);
        break;
        
      case 'detailed_analysis_request':
        await this.handleDetailedAnalysisRequest(content);
        break;
        
      default:
        console.log(\`Unhandled message type: \${messageType}\`);
    }
  }
  
  async handleDataAnalysisRequest(request: any) {
    console.log(\`Processing data analysis request for dataset: \${request.dataset}\`);
    
    try {
      const results = {
        type: 'analysis_result',
        dataset: request.dataset,
        requestId: \`req-\${crypto.randomBytes(8).toString('hex')}\`,
        timestamp: Date.now(),
        results: {
          sentiment_scores: {
            positive: 0.68,
            neutral: 0.22,
            negative: 0.10,
          },
          key_topics: ['product_quality', 'customer_service', 'pricing'],
          trend: 'positive',
          confidence: 0.92
        }
      };
      
      await this.sendMessage(JSON.stringify(results), 'Analysis results completed');
      console.log('Analysis results sent successfully');
    } catch (error) {
      console.error(\`Error handling data analysis request: \${error}\`);
      
      const errorResponse = {
        type: 'error',
        requestId: request.requestId || 'unknown',
        error: 'Failed to complete analysis',
        timestamp: Date.now()
      };
      
      await this.sendMessage(
        JSON.stringify(errorResponse),
        'Error processing analysis request'
      );
    }
  }
  
  async handleDetailedAnalysisRequest(request: any) {
    console.log(\`Processing detailed analysis request with \${request.analysis_types?.length || 0} analysis types\`);
    
    try {
      const detailedResults = {
        type: 'detailed_analysis_result',
        dataset: request.dataset,
        requestId: request.requestId || \`req-\${crypto.randomBytes(8).toString('hex')}\`,
        timestamp: Date.now(),
        results: {
          sentiment_analysis: {
            overall: {
              positive: 0.68,
              neutral: 0.22,
              negative: 0.10,
              compound: 0.58
            },
            by_channel: {
              website: { positive: 0.72, neutral: 0.18, negative: 0.10 },
              mobile_app: { positive: 0.65, neutral: 0.25, negative: 0.10 },
              call_center: { positive: 0.55, neutral: 0.30, negative: 0.15 }
            },
            by_product: {
              premium: { positive: 0.75, neutral: 0.15, negative: 0.10 },
              standard: { positive: 0.65, neutral: 0.25, negative: 0.10 },
              budget: { positive: 0.60, neutral: 0.20, negative: 0.20 }
            }
          },
          topic_modeling: {
            topics: [
              { id: 1, keywords: ['quality', 'product', 'excellent', 'durable'], weight: 0.25 },
              { id: 2, keywords: ['service', 'customer', 'helpful', 'responsive'], weight: 0.20 },
              { id: 3, keywords: ['price', 'value', 'affordable', 'expensive'], weight: 0.18 }
            ],
            coherence_score: 0.87
          },
          recommendations: [
            'Improve mobile app user experience based on feedback',
            'Enhance customer service training for call center staff',
            'Review pricing strategy for budget product line'
          ]
        }
      };
      
      await this.sendMessage(
        JSON.stringify(detailedResults),
        'Detailed analysis results completed'
      );
      console.log('Detailed analysis results sent successfully');
    } catch (error) {
      console.error(\`Error handling detailed analysis request: \${error}\`);
      
      const errorResponse = {
        type: 'error',
        requestId: request.requestId || 'unknown',
        error: 'Failed to complete detailed analysis',
        timestamp: Date.now()
      };
      
      await this.sendMessage(
        JSON.stringify(errorResponse),
        'Error processing detailed analysis request'
      );
    }
  }
  
  async sendMessage(data: string, memo: string = '') {
    try {
      const result = await this.client.sendMessage(
        this.connectionTopicId,
        this.operatorId,
        data,
        memo
      );
      
      console.log('Message sent successfully');
      return result;
    } catch (error) {
      console.error(\`Failed to send message: \${error}\`);
      throw error;
    }
  }
}

async function startCommunicationHandler() {
  const client = new HCS10Client({
    network: 'testnet',
    operatorId: process.env.HEDERA_ACCOUNT_ID!,
    operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
  });
  
  const handler = new AgentCommunicationHandler(
    client,
    process.env.CONNECTION_TOPIC_ID!,
    process.env.OPERATOR_ID!
  );
  
  await handler.monitorConnectionMessages();
}

startCommunicationHandler();`;

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
  }
]; 