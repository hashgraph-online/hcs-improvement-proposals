---
slug: creating-reactive-service-agents
title: "Building Always-On AI Agents: From Passive Chatbots to Autonomous Services"
description: "Learn how to build persistent, reactive AI agents that monitor events and take autonomous action. This tutorial covers architectural patterns for always-on agents using the Registry Broker's polling and session management capabilities."
authors: [hashgraphonline]
tags: [websockets, automation, registry-broker, sdk, ai-agents, typescript, architecture]
image: https://hol.org/img/logo.png
keywords: [reactive agents, always-on AI, event-driven agents, autonomous agents, service agents, agent architecture]
---

Most agent tutorials build simple chatbots: send message, get response. This works for demos, but production infrastructure needs to run autonomously.

**Service Agents** are long-running processes that monitor data and take action without human input. They don't wait for prompts; they wait for events.

In this guide, we'll architect a production-ready service agent using the Registry Broker's session management and polling capabilities.

<!--truncate-->

## Understanding Agent Lifecycle Models

Before building, let's understand the fundamental difference between agent architectures:

### Request-Response Agents
- Wake up when called
- Process one request
- Return a response
- Effectively "die" until the next request

This is how most web APIs work—stateless, ephemeral, horizontal-scalable but fundamentally passive.

### Service Agents (Always-On)
- Boot once and run indefinitely
- Maintain persistent state
- Monitor for events continuously
- React autonomously to triggers

Service agents act more like database servers or message brokers than web handlers. They require different architectural thinking.

## The Core Pattern: Event Loop with Polling

The Registry Broker doesn't provide push notifications for new messages (WebSocket subscriptions are for real-time chat, not general event streaming). Instead, service agents use a **polling pattern** to check for new activity.

Here's the foundational structure:

```typescript
import { 
  RegistryBrokerClient,
  type ChatHistoryEntry 
} from '@hashgraphonline/standards-sdk';

interface SessionState {
  lastChecked: number;
  messageCount: number;
}

class ServiceAgent {
  private client: RegistryBrokerClient;
  private myUaid: string;
  private activeSessions: Map<string, SessionState> = new Map();
  private running: boolean = false;

  constructor(uaid: string, brokerUrl: string) {
    this.myUaid = uaid;
    this.client = new RegistryBrokerClient({ baseUrl: brokerUrl });
  }

  async start(): Promise<void> {
    console.log(`Service agent starting: ${this.myUaid}`);
    console.log(`Online at ${new Date().toISOString()}`);
    
    this.running = true;
    
    while (this.running) {
      try {
        await this.pollActiveSessions();
      } catch (error) {
        console.error('Polling error:', error);
        // Continue running despite errors
      }
      
      // Wait before next poll cycle
      await this.delay(2000);
    }
  }

  stop(): void {
    console.log('Service agent shutting down...');
    this.running = false;
  }

  private async pollActiveSessions(): Promise<void> {
    for (const [sessionId, state] of this.activeSessions) {
      const history = await this.client.chat.getHistory(sessionId);
      const allMessages = history.history ?? [];
      
      // Find messages newer than our last check
      const newMessages = allMessages.filter(
        entry => new Date(entry.timestamp).getTime() > state.lastChecked
      );
      
      // Process only user messages (we sent the agent ones)
      const userMessages = newMessages.filter(m => m.role === 'user');
      
      for (const message of userMessages) {
        await this.handleMessage(sessionId, message);
      }
      
      // Update state
      state.lastChecked = Date.now();
      state.messageCount = allMessages.length;
    }
  }

  async handleMessage(
    sessionId: string, 
    message: ChatHistoryEntry
  ): Promise<void> {
    // Override this in subclasses for custom behavior
    console.log(`New message in ${sessionId}: ${message.content}`);
  }

  registerSession(sessionId: string): void {
    if (!this.activeSessions.has(sessionId)) {
      this.activeSessions.set(sessionId, {
        lastChecked: Date.now(),
        messageCount: 0,
      });
      console.log(`Tracking session: ${sessionId}`);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

This base class provides the event loop infrastructure. Subclass it to add domain-specific behavior.

## Example: The Sentinel Agent

Let's build a "Sentinel" agent that monitors for critical alerts and triggers external systems:

```typescript
class SentinelAgent extends ServiceAgent {
  private alertThreshold: number;
  
  constructor(
    uaid: string, 
    brokerUrl: string, 
    alertThreshold: number = 5
  ) {
    super(uaid, brokerUrl);
    this.alertThreshold = alertThreshold;
  }

  async handleMessage(
    sessionId: string,
    message: ChatHistoryEntry
  ): Promise<void> {
    const content = message.content.toUpperCase();
    
    console.log(`[SENTINEL] Analyzing: ${content.substring(0, 50)}...`);

    // Pattern matching for critical signals
    if (this.isCriticalSignal(content)) {
      console.warn('>>> CRITICAL SIGNAL DETECTED');
      await this.triggerEmergencyProtocol(sessionId, content);
    } else if (this.isRoutineCheck(content)) {
      await this.acknowledgeRoutine(sessionId);
    }
  }

  private isCriticalSignal(content: string): boolean {
    const criticalPatterns = [
      'CRITICAL_FAILURE',
      'SECURITY_BREACH',
      'PRICE_DUMP',
      'SYSTEM_DOWN',
      'UNAUTHORIZED_ACCESS',
    ];
    return criticalPatterns.some(pattern => content.includes(pattern));
  }

  private isRoutineCheck(content: string): boolean {
    return content.includes('STATUS') || content.includes('HEALTH_CHECK');
  }

  private async triggerEmergencyProtocol(
    sessionId: string,
    content: string
  ): Promise<void> {
    // 1. Log the incident
    console.log(`Emergency triggered at ${new Date().toISOString()}`);
    console.log(`Content: ${content}`);

    // 2. Call external alerting system
    await this.notifyPagerDuty(content);
    
    // 3. Send acknowledgment through the broker
    await this.client.chat.sendMessage({
      sessionId: sessionId,
      message: 'ACK. Emergency protocols initiated. On-call team summoned.',
    });
  }

  private async acknowledgeRoutine(sessionId: string): Promise<void> {
    const status = {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      activeSessions: this.activeSessions.size,
    };
    
    await this.client.chat.sendMessage({
      sessionId,
      message: `Status report: ${JSON.stringify(status)}`,
    });
  }

  private async notifyPagerDuty(content: string): Promise<void> {
    // In production, integrate with your actual alerting system
    console.log(`[PAGERDUTY] Sending alert: ${content.substring(0, 100)}`);
    
    // Example: fetch('https://events.pagerduty.com/v2/enqueue', { ... })
  }
}
```

## Running the Service Agent

Deploy the agent as a long-running process:

```typescript
import 'dotenv/config';

async function main() {
  const agent = new SentinelAgent(
    process.env.AGENT_UAID!,
    process.env.REGISTRY_BROKER_BASE_URL ?? 'https://hol.org/registry/api/v1',
  );

  // Register sessions to monitor
  // In practice, these come from your session management layer
  const sessionsToMonitor = process.env.MONITOR_SESSIONS?.split(',') ?? [];
  for (const sessionId of sessionsToMonitor) {
    agent.registerSession(sessionId.trim());
  }

  // Handle shutdown gracefully
  process.on('SIGTERM', () => agent.stop());
  process.on('SIGINT', () => agent.stop());

  // Start the event loop
  await agent.start();
}

main().catch(console.error);
```

## Production Deployment Considerations

### Containerization

Service agents should run in containers for reliability:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
CMD ["node", "dist/sentinel.js"]
```

### Scaling

Because the Registry Broker maintains session state, you can run multiple agent instances:

1. **Session sharding**: Different instances monitor different session ranges
2. **Leader election**: Use Redis or etcd to elect a primary instance
3. **Stateless processing**: Each poll is independent, enabling horizontal scaling

### Monitoring

Add observability to your agent:

```typescript
// Emit metrics
setInterval(() => {
  console.log(JSON.stringify({
    type: 'agent_metrics',
    activeSessions: activeSessions.size,
    uptimeSeconds: process.uptime(),
    memoryMB: process.memoryUsage().heapUsed / 1024 / 1024,
    timestamp: new Date().toISOString(),
  }));
}, 60000);
```

### Error Recovery

Service agents must handle failures gracefully:

```typescript
async pollWithRetry(sessionId: string, retries: number = 3): Promise<void> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await this.pollSession(sessionId);
    } catch (error) {
      console.warn(`Poll attempt ${attempt + 1} failed:`, error);
      await this.delay(1000 * (attempt + 1)); // Exponential backoff
    }
  }
  console.error(`Session ${sessionId} unreachable after ${retries} attempts`);
}
```

## Use Cases for Service Agents

### DeFi Liquidation Bot
- Monitors price feeds from oracles
- Detects undercollateralized positions
- Executes liquidation transactions automatically

### Customer Support Triage
- Listens to incoming support conversations
- Classifies urgency using an LLM
- Routes to appropriate human agents
- Handles simple queries autonomously

### Security Monitor
- Analyzes logs from other agents
- Detects anomalous patterns
- Triggers lockdown procedures
- Generates incident reports

### Workflow Orchestrator
- Monitors for task completion signals
- Triggers next steps in pipelines
- Handles retries and failures
- Maintains workflow state

## From Chatbot to Infrastructure

Passive chatbots answer questions when asked. Service agents are infrastructure—they run continuously, monitor actively, and act autonomously. Moving from request-response to event-loop processing enables a new class of AI applications.

The Registry Broker handles the session management and message routing. Your agent provides the intelligence. Together, they create autonomous systems.
