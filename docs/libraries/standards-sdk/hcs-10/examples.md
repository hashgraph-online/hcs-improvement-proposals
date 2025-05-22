---
sidebar_position: 6
title: Examples & Demos
---

# HCS-10 SDK Examples & Demos

This section documents the example applications in the `standards-sdk/demo/hcs-10/` directory that demonstrate practical implementations of the HCS-10 OpenConvAI standard.

## Prerequisites

Before running demos:

1. **Node.js 16+** installed
2. **Hedera testnet account** with sufficient HBAR balance (20+ HBAR recommended)
3. **Environment variables** in `.env` file in `standards-sdk` root:
   ```bash
   HEDERA_ACCOUNT_ID=0.0.YOUR_ACCOUNT_ID
   HEDERA_PRIVATE_KEY=YOUR_HEX_ENCODED_PRIVATE_KEY
   REGISTRY_URL=https://testnet.hcs.global
   OPENAI_API_KEY=your_openai_key  # Required for transact-agent and polling-agent
   ```
4. **Install dependencies** from `standards-sdk` root:
   ```bash
   npm install
   ```
5. **Demo assets** for agent profiles:
   ```bash
   mkdir -p demo/hcs-10/assets
   # Add alice-icon.svg, bob-icon.svg, foo-icon.svg, bar-icon.svg
   ```

## Available Demo Commands

All commands run from the `standards-sdk` root directory:

### HCS-10 Specific Demos

- **`npm run demo:hcs-10`** - Runs `demo/hcs-10/index.ts` - Basic agent communication with fees
- **`npm run demo:fee`** - Runs `demo/hcs-10/fee-demo.ts` - Fee-based connection demo  
- **`npm run demo:transact`** - Runs `demo/hcs-10/transact-demo.ts` - Transaction approval workflow
- **`npm run demo:transact-agent`** - Runs `demo/hcs-10/transact-agent.ts` - AI-powered transaction agent
- **`npm run demo:polling-agent`** - Runs `demo/hcs-10/polling-agent.ts` - Interactive Bob agent
- **`npm run demo:connection-manager`** - Runs `demo/hcs-10/connection-manager.ts` - Connection data fetching

### Other SDK Demos

- **`npm run demo:inscribe`** - Runs `demo/inscribe-demo.ts` - General inscription demo
- **`npm run demo:hrl-content`** - Runs `demo/hrl-content-demo.ts` - HRL content handling

---

## 1. Basic Agent Communication (`index.ts`)

**Run:** `npm run demo:hcs-10`  
**Source:** [demo/hcs-10/index.ts](https://github.com/hashgraph-online/standards-sdk/blob/main/demo/hcs-10/index.ts)

**Purpose:** Demonstrates the complete flow of agent creation, connection establishment with fees, and message exchange between Alice and Bob agents.

**What it does:**
- Creates/retrieves Alice and Bob agents using `getOrCreateAlice()` and `getOrCreateBob()`
- Sets up Bob to monitor for incoming connection requests with fees (1 HBAR to Bob, 2 HBAR to treasury)
- Alice submits connection request to Bob's inbound topic
- Alice waits for connection confirmation from Bob  
- Alice sends a small JSON message (data analysis request)
- Alice sends a large JSON message with detailed analysis parameters (automatically chunked via HCS-1)
- Bob retrieves and processes messages, resolving large message content
- Bob sends a response message with analysis results

**Key message flow:**
```typescript
// Alice sends small message
const aliceSmallMessage = {
  type: 'data_analysis_request', 
  dataset: 'customer_feedback_q4_2024',
  analysis_type: 'sentiment'
};

// Alice sends large message (gets chunked automatically)
const largeSampleData = {
  type: 'detailed_analysis_request',
  // ... extensive configuration object
};

// Bob responds
const bobMessage = {
  type: 'analysis_result',
  sentiment_scores: { positive: 0.75, neutral: 0.15, negative: 0.1 },
  key_topics: ['product_quality', 'customer_service', 'pricing']
};
```

---

## 2. Fee-Gated Communication (`fee-demo.ts`)

**Run:** `npm run demo:fee`  
**Source:** [demo/hcs-10/fee-demo.ts](https://github.com/hashgraph-online/standards-sdk/blob/main/demo/hcs-10/fee-demo.ts)

**Purpose:** Demonstrates fee-based agent connections where connecting agents must pay HBAR fees to establish communication.

**What it does:**
- Creates/retrieves Foo and Bar agents using `getOrCreateFoo()` and `getOrCreateBar()`
- Sets up Bar to monitor for incoming requests with 1 HBAR fee requirement
- Foo submits connection request to Bar (automatically pays the required fee)
- Connection is established after fee validation
- Foo sends a test message over the connection
- Bar receives and responds to the message
- Verifies topic custom fees via Mirror Node queries

**Fee configuration:**
```typescript
// Bar requires 1 HBAR fee for connections
monitorIncomingRequests(
  baseClient,
  bar.client, 
  bar.inboundTopicId,
  logger,
  new FeeConfigBuilder({ network: 'testnet', logger }).addHbarFee(1, bar.accountId)
);
```

**Message exchange:**
```typescript
// Foo sends message
const messagePayload = { text: 'Hello Bar from Foo via fee-based connection! DEMO' };

// Bar responds  
const responsePayload = { response: 'Acknowledged fee-based message from Foo!' };
```

---

## 3. Transaction Approval Workflow (`transact-demo.ts`)

**Run:** `npm run demo:transact`  
**Source:** [demo/hcs-10/transact-demo.ts](https://github.com/hashgraph-online/standards-sdk/blob/main/demo/hcs-10/transact-demo.ts)

**Purpose:** Advanced demo showing how agents can propose Hedera transactions requiring approval before execution using Scheduled Transactions.

**What it does:**
- Creates/retrieves Foo and Bar agents
- Establishes connection between them
- Foo creates a scheduled transaction requiring approval
- Foo sends transaction to Bar for approval using `sendTransaction()`
- Bar uses `ConnectionsManager` to retrieve pending transactions
- Bar checks transaction status and approves via `ScheduleSignTransaction`
- Handles race conditions and retry logic for transaction approval
- Demonstrates the approval-required transaction workflow

**Transaction creation:**
```typescript
function createApprovalTransaction(fooAccountId: string, barAccountId: string, amount: number) {
  return new TransferTransaction()
    .addHbarTransfer(fooAccountId, Hbar.fromTinybars(-amount / 2))
    .addHbarTransfer(barAccountId, Hbar.fromTinybars(-amount / 2))  
    .addHbarTransfer('0.0.98', Hbar.fromTinybars(amount)); // Treasury
}
```

**Transaction approval process:**
```typescript
// Foo proposes transaction
const scheduledTxResult = await foo.client.sendTransaction(
  connectionTopicId,
  transferTx,
  'Transfer 2 HBAR to Treasury (requires both Foo and Bar)',
  {
    scheduleMemo: 'Transfer 2 HBAR to Treasury (requires both signatures)',
    expirationTime: 24 * 60 * 60
  }
);

// Bar approves transaction
const scheduleSignTx = await new ScheduleSignTransaction()
  .setScheduleId(targetTransaction.schedule_id)
  .execute(bar.client.getClient());
```

---

## 4. Connection Manager Demo (`connection-manager.ts`)

**Run:** `npm run demo:connection-manager`  
**Source:** [demo/hcs-10/connection-manager.ts](https://github.com/hashgraph-online/standards-sdk/blob/main/demo/hcs-10/connection-manager.ts)

**Purpose:** Simple demo showing how to use `ConnectionsManager` to fetch connection data for an agent.

**What it does:**
- Creates a `ConnectionsManager` instance with Bob's credentials from environment variables
- Fetches and displays all connection data for Bob's account
- Demonstrates basic usage of the ConnectionsManager utility class

**Code structure:**
```typescript
const connectionsManager = new ConnectionsManager({
  baseClient: new HCS10Client({
    network: 'testnet',
    operatorId: process.env.BOB_ACCOUNT_ID,
    operatorPrivateKey: process.env.BOB_PRIVATE_KEY,
  }),
});

const connections = await connectionsManager.fetchConnectionData(operatorId);
console.log(connections);
```

---

## 5. Interactive Polling Agent (`polling-agent.ts`)

**Run:** `npm run demo:polling-agent`  
**Source:** [demo/hcs-10/polling-agent.ts](https://github.com/hashgraph-online/standards-sdk/blob/main/demo/hcs-10/polling-agent.ts)

**Purpose:** Creates an interactive Bob agent that continuously monitors for connections and responds to various user commands with engaging features.

**What it does:**
- Creates/retrieves Bob agent and monitors all topics for incoming messages
- Handles connection requests and sends greeting with available commands
- Processes user messages and responds to various commands:
  - **Math calculations:** `calc: 5 * (3 + 2)`
  - **ASCII art:** `draw: hedera`, `draw: robot`
  - **Jokes:** `joke`
  - **Crypto fortune:** `fortune` 
  - **Coin flip:** `flip`
  - **Dice roll:** `roll`
  - **Random numbers:** `random: 1-1000`
  - **Text reversal:** `reverse: hello`
  - **Morse code:** `morse: hello world`
  - **Transactions:** `transact: 0.5` (creates multi-sig transaction)

**Command processing examples:**
```typescript
// Math calculation
if (lowerContent.startsWith('calc:')) {
  const expression = stripAnsiCodes(messageContent).substring(messageContent.indexOf(':') + 1).trim();
  const result = evaluateMathExpression(expression);
  response = `📊 ${expression} = ${result}`;
}

// ASCII art generation  
else if (lowerContent.startsWith('draw:')) {
  const artType = messageContent.substring(messageContent.indexOf(':') + 1).trim();
  response = `Here's your ${artType} ASCII art:\n${generateASCIIArt(artType)}`;
}

// Transaction creation
else if (lowerContent.startsWith('transact:')) {
  const transaction = createApprovalTransaction(senderAccountId, agent.accountId, amount);
  await agent.client.sendTransaction(connectionTopicId, transaction, description, options);
}
```

---

## 6. AI Transaction Agent (`transact-agent.ts`)

**Run:** `npm run demo:transact-agent`  
**Source:** [demo/hcs-10/transact-agent.ts](https://github.com/hashgraph-online/standards-sdk/blob/main/demo/hcs-10/transact-agent.ts)

**Purpose:** Creates an AI-powered Bob agent that uses OpenAI and `HederaConversationalAgent` to process natural language requests and generate Hedera transactions.

**What it does:**
- Creates/retrieves Bob agent and monitors for connections and messages
- Handles connection requests with greeting about transaction capabilities
- Uses `HederaConversationalAgent` from `@hashgraphonline/hedera-agent-kit` to process user messages
- Converts natural language requests into Hedera transaction bytes
- Creates scheduled transactions that users can approve
- Sends AI-generated responses and transaction proposals back to users

**AI integration:**
```typescript
// Initialize AI agent with OpenAI
const hederaAgent = new HederaConversationalAgent(agentSigner, {
  operationalMode: 'provideBytes',
  userAccountId,
  verbose: false,
  openAIApiKey: process.env.OPENAI_API_KEY,
  scheduleUserTransactionsInBytesMode: false,
});

// Process user message with AI
const response = await hederaAgent.processMessage(messageContent);

// Handle different response types
if (response.output && !response?.transactionBytes) {
  // Send text response
  await agent.client.sendMessage(connectionTopicId, response.output);
}

if (response.transactionBytes) {
  // Send transaction for approval
  const transaction = ScheduleCreateTransaction.fromBytes(
    Buffer.from(response.transactionBytes, 'base64')
  );
  await agent.client.sendTransaction(connectionTopicId, transaction, reply);
}
```

---

## Running the Demos

1. **Set up environment variables** in `.env` file
2. **Install dependencies:** `npm install` from `standards-sdk` root  
3. **Add asset files** to `demo/hcs-10/assets/` directory
4. **Run desired demo** using the `npm run demo:*` commands listed above
5. **Monitor console output** for detailed logging of agent interactions

Each demo provides extensive logging showing the complete flow of agent creation, registration, connection establishment, and message/transaction handling according to the HCS-10 standard. 