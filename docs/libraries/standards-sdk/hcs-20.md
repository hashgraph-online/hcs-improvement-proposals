---
sidebar_position: 6
---

# HCS-20: Auditable Points Standard

The HCS-20 module provides a standard for creating and managing auditable points (like loyalty points or in-game currencies) on the Hedera Consensus Service. It includes clients for both server-side (Node.js) and client-side (browser) environments, along with an indexer for tracking the state of points.

## What HCS-20 Does

- **Defines a Standard** - A clear message schema for deploying, minting, transferring, and burning points.
- **Provides SDK Clients** - `HCS20Client` for Node.js and `BrowserHCS20Client` for browsers to interact with the HCS-20 standard.
- **Includes an Indexer** - `HCS20PointsIndexer` to process topic messages and maintain the state of points.
- **Supports Public and Private Topics** - Deploy points on a public topic or on your own private, permissioned topic.

## Getting Started

### Installation

```bash
npm install @hashgraphonline/standards-sdk
```

### Basic Setup (Node.js)

For server-side applications, use `HCS20Client`.

```typescript
import { HCS20Client } from '@hashgraphonline/standards-sdk/dist/hcs-20';

// Initialize the HCS-20 client
const client = new HCS20Client({
  network: 'testnet',
  operatorId: 'your-operator-id',
  operatorKey: 'your-operator-private-key',
  logLevel: 'info',
});
```

### Basic Setup (Browser)

For client-side applications, use `BrowserHCS20Client` with a wallet connection.

```typescript
import { BrowserHCS20Client } from '@hashgraphonline/standards-sdk/dist/hcs-20';
import { HashinalsWalletConnectSDK } from '@hashgraphonline/hashinal-wc';

// Initialize Hashinals WalletConnect
const hwc = new HashinalsWalletConnectSDK();
await hwc.init(/** wallet connect options */);
await hwc.connect(/** connection options */);

// Initialize the HCS-20 browser client
const browserClient = new BrowserHCS20Client({
  network: 'testnet',
  hwc: hwc,
  logLevel: 'info',
});
```

## Deploying Points

Create a new type of points on the network.

```typescript
const deployOptions = {
  name: 'MyRewardPoints',
  tick: 'MRP',
  maxSupply: '1000000',
  limitPerMint: '1000',
  metadata: 'https://my-reward-points.com/meta',
  usePrivateTopic: false, // Set to true to create a new private topic
  progressCallback: (data) => {
    console.log(`${data.stage}: ${data.percentage}%`);
  }
};

const pointsInfo = await client.deployPoints(deployOptions);
console.log('Points deployed:', pointsInfo);
```

## Point Operations

### Minting Points

Create new points and assign them to an account.

```typescript
const mintOptions = {
  tick: 'MRP',
  amount: '500',
  to: '0.0.98765', // Recipient account ID
  memo: 'Initial points for new user',
  progressCallback: (data) => {
    console.log(`${data.stage}: ${data.percentage}%`);
  }
};

const mintTransaction = await client.mintPoints(mintOptions);
console.log('Mint transaction:', mintTransaction);
```

### Transferring Points

Move points from one account to another.

```typescript
const transferOptions = {
  tick: 'MRP',
  amount: '100',
  from: '0.0.12345', // Sender account ID
  to: '0.0.98765',   // Recipient account ID
  progressCallback: (data) => {
    console.log(`${data.stage}: ${data.percentage}%`);
  }
};

const transferTransaction = await client.transferPoints(transferOptions);
console.log('Transfer transaction:', transferTransaction);
```

### Burning Points

Permanently remove points from circulation.

```typescript
const burnOptions = {
  tick: 'MRP',
  amount: '50',
  from: '0.0.98765', // Account to burn from
  progressCallback: (data) => {
    console.log(`${data.stage}: ${data.percentage}%`);
  }
};

const burnTransaction = await client.burnPoints(burnOptions);
console.log('Burn transaction:', burnTransaction);
```

## Using the Points Indexer

The `HCS20PointsIndexer` listens to HCS topics and builds a local state of all points, balances, and transactions.

```typescript
import { HCS20PointsIndexer } from '@hashgraphonline/standards-sdk/dist/hcs-20';

const indexer = new HCS20PointsIndexer('testnet');

// Start indexing in the background
indexer.startIndexing({
  // Optional: add private topics to watch
  // privateTopics: ['0.0.112233']
});

// To fetch the state at any time:
const currentState = indexer.getState();
console.log('All deployed points:', currentState.deployedPoints);
console.log('All balances:', currentState.balances);

// Get info for a specific point
const mrpInfo = indexer.getPointsInfo('MRP');
console.log('MRP Info:', mrpInfo);

// Get a specific balance
const balance = indexer.getBalance('MRP', '0.0.98765');
console.log('Balance for 0.0.98765:', balance);

// Stop indexing
// indexer.stopIndexing();
```

## API Reference

### HCS20Client / BrowserHCS20Client

#### `deployPoints(options: DeployPointsOptions): Promise<PointsInfo>`
Deploys a new set of points.

#### `mintPoints(options: MintPointsOptions): Promise<PointsTransaction>`
Mints new points.

#### `transferPoints(options: TransferPointsOptions): Promise<PointsTransaction>`
Transfers points between accounts.

#### `burnPoints(options: BurnPointsOptions): Promise<PointsTransaction>`
Burns points.

#### `registerTopic(options: RegisterTopicOptions): Promise<void>`
Registers a topic in the HCS-20 registry.

### HCS20PointsIndexer

#### `startIndexing(options?)`
Starts the indexing process.

#### `stopIndexing()`
Stops the indexing process.

#### `getState(): PointsState`
Returns a snapshot of the current points state.

#### `getPointsInfo(tick: string): PointsInfo | undefined`
Gets information about a specific point type.

#### `getBalance(tick: string, accountId: string): string`
Gets the balance of a specific point for an account.

### Types

```typescript
interface PointsInfo {
  name: string;
  tick: string;
  maxSupply: string;
  limitPerMint?: string;
  metadata?: string;
  topicId: string;
  deployerAccountId: string;
  currentSupply: string;
  deploymentTimestamp: string;
  isPrivate: boolean;
}

interface PointsTransaction {
  id: string;
  operation: 'deploy' | 'mint' | 'transfer' | 'burn' | 'register';
  tick: string;
  amount?: string;
  from?: string;
  to?: string;
  timestamp: string;
  sequenceNumber: number;
  topicId: string;
  transactionId: string;
  memo?: string;
}

interface PointsState {
  deployedPoints: Map<string, PointsInfo>;
  balances: Map<string, Map<string, PointsBalance>>;
  transactions: PointsTransaction[];
  lastProcessedSequence: number;
  lastProcessedTimestamp: string;
}
```

