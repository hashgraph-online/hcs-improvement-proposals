---
sidebar_position: 10
---

# Utilities and Services

The Standards SDK includes several utility classes and services that provide essential functionality across the SDK components.

## Mirror Node Service

The `HederaMirrorNode` class provides a streamlined interface for interacting with Hedera Mirror Nodes, offering methods to retrieve account information, topic messages, and pricing data.

### Initialization

```typescript
import { HederaMirrorNode } from '@hashgraphonline/standards-sdk';
import { Logger } from '@hashgraphonline/standards-sdk';

const logger = new Logger({ module: 'MyApp', level: 'info' });

// Basic initialization
const mirrorNode = new HederaMirrorNode('testnet', logger);

// With custom mirror node configuration
const customMirrorNode = new HederaMirrorNode('mainnet', logger, {
  customUrl: 'https://mainnet.hedera.api.hgraph.dev/v1/<API-KEY>',
  apiKey: 'your-api-key-here'
});
```

### Custom Mirror Node Providers

The SDK supports integration with custom mirror node providers through flexible configuration:

```typescript
// Using HGraph with API key in URL
const hgraphMirrorNode = new HederaMirrorNode('mainnet', logger, {
  customUrl: 'https://mainnet.hedera.api.hgraph.dev/v1/<API-KEY>',
  apiKey: 'your-hgraph-api-key'
});

// Using custom provider with headers
const customProviderMirrorNode = new HederaMirrorNode('mainnet', logger, {
  customUrl: 'https://custom-mirror-node.com',
  apiKey: 'your-api-key',
  headers: {
    'X-Custom-Header': 'value',
    'X-Another-Header': 'another-value'
  }
});
```

The configuration supports:
- **Custom URLs**: Override the default Hedera mirror node endpoints
- **API Keys**: Authentication via URL replacement or headers
- **Custom Headers**: Additional headers for custom provider requirements

### Account Information

Retrieve account information, including balances:

```typescript
// Get account details including balance
const accountInfo = await mirrorNode.requestAccount('0.0.123456');
console.log(
  'Account balance:',
  accountInfo.balance.balance / 100_000_000,
  'HBAR'
);

// Get account memo
const memo = await mirrorNode.getAccountMemo('0.0.123456');
console.log('Account memo:', memo);

// Get account public key
const publicKey = await mirrorNode.getPublicKey('0.0.123456');
console.log('Public key:', publicKey.toString());
```

### Topic Information

Retrieve topic information and messages:

```typescript
// Get topic info
const topicInfo = await mirrorNode.getTopicInfo('0.0.123456');
console.log('Topic memo:', topicInfo.memo);

// Get topic fees
const fees = await mirrorNode.getTopicFees('0.0.123456');
console.log('Topic fees:', fees);

// Get topic messages with filtering options
const messages = await mirrorNode.getTopicMessages('0.0.123456', {
  sequenceNumber: 'gt:100', // Messages after sequence number 100
  limit: 50,
  order: 'desc'
});
console.log('Topic messages:', messages);

// Get topic messages by filter with time range
const filteredMessages = await mirrorNode.getTopicMessagesByFilter('0.0.123456', {
  startTime: '1629400000.000000000',
  endTime: '1629500000.000000000',
  limit: 100,
  order: 'asc'
});
```

### HBAR Pricing

Get current HBAR price for calculating fees:

```typescript
// Get current HBAR price in USD
const hbarPrice = await mirrorNode.getHBARPrice(new Date());
console.log('Current HBAR price: $', hbarPrice);

// Calculate cost of HBAR needed for operations
const hbarNeeded = 5; // 5 HBAR
console.log('Cost in USD:', hbarNeeded * hbarPrice);
```

### Transaction Information

Retrieve transaction details and scheduled transactions:

```typescript
// Get transaction by ID or hash
const transaction = await mirrorNode.getTransaction('0.0.123@1234567890.123456789');
console.log('Transaction details:', transaction);

// Get transaction by timestamp
const transactions = await mirrorNode.getTransactionByTimestamp('1629400000.000000000');
console.log('Transactions at timestamp:', transactions);

// Get scheduled transaction info
const scheduleInfo = await mirrorNode.getScheduleInfo('0.0.123456');
console.log('Schedule info:', scheduleInfo);

// Check scheduled transaction status
const status = await mirrorNode.getScheduledTransactionStatus('0.0.123456');
console.log('Schedule executed:', status.executed);
console.log('Executed date:', status.executedDate);
console.log('Schedule deleted:', status.deleted);
```

### Token and NFT Operations

Manage tokens and NFTs:

```typescript
// Get token information
const tokenInfo = await mirrorNode.getTokenInfo('0.0.123456');
console.log('Token name:', tokenInfo?.name);
console.log('Token symbol:', tokenInfo?.symbol);

// Get account balance in HBAR
const hbarBalance = await mirrorNode.getAccountBalance('0.0.123456');
console.log('HBAR balance:', hbarBalance);

// Get account tokens
const tokens = await mirrorNode.getAccountTokens('0.0.123456', 100);
console.log('Account tokens:', tokens);

// Get account NFTs
const nfts = await mirrorNode.getAccountNfts('0.0.123456', '0.0.789012', 50);
console.log('Account NFTs:', nfts);

// Get specific NFT info
const nftInfo = await mirrorNode.getNftInfo('0.0.123456', 1);
console.log('NFT metadata:', nftInfo?.metadata);

// Get NFTs by token
const tokenNfts = await mirrorNode.getNftsByToken('0.0.123456', {
  accountId: '0.0.789012',
  limit: 100,
  order: 'desc'
});

// Validate NFT ownership
const ownedNft = await mirrorNode.validateNFTOwnership(
  '0.0.123456', // accountId
  '0.0.789012', // tokenId
  1 // serialNumber
);
console.log('NFT owned:', ownedNft !== null);
```

### Airdrop Operations

Manage token airdrops:

```typescript
// Get outstanding airdrops sent by an account
const sentAirdrops = await mirrorNode.getOutstandingTokenAirdrops('0.0.123456', {
  limit: 50,
  order: 'desc',
  tokenId: '0.0.789012'
});

// Get pending airdrops received by an account
const receivedAirdrops = await mirrorNode.getPendingTokenAirdrops('0.0.123456', {
  limit: 50,
  order: 'asc',
  senderId: '0.0.789012'
});
```

### Smart Contract Operations

Interact with smart contracts:

```typescript
// Read from a smart contract (eth_call equivalent)
const contractResult = await mirrorNode.readSmartContractQuery(
  '0.0.123456', // contract ID or EVM address
  '0x06fdde03', // function selector (e.g., name())
  '0.0.789012', // payer account ID
  {
    gas: 50000,
    value: 0
  }
);
console.log('Contract result:', contractResult?.result);

// Get contract information
const contract = await mirrorNode.getContract('0.0.123456');
console.log('Contract bytecode:', contract?.bytecode);

// Get contract results
const contractResults = await mirrorNode.getContractResults({
  from: '0x1234567890abcdef',
  limit: 10,
  order: 'desc'
});

// Get specific contract result
const result = await mirrorNode.getContractResult('0x1234567890abcdef');

// Get contract state
const state = await mirrorNode.getContractState('0.0.123456', {
  slot: '0x0',
  limit: 100
});

// Get contract logs
const logs = await mirrorNode.getContractLogs({
  topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  limit: 50
});

// Get contract actions
const actions = await mirrorNode.getContractActions('0x1234567890abcdef', {
  limit: 25
});

// Get opcode traces
const opcodes = await mirrorNode.getOpcodeTraces('0x1234567890abcdef', {
  stack: true,
  memory: true,
  storage: true
});
```

### Network and Block Information

Retrieve network and blockchain data:

```typescript
// Get blocks
const blocks = await mirrorNode.getBlocks({
  limit: 10,
  order: 'desc'
});

// Get specific block
const block = await mirrorNode.getBlock('12345'); // by number or hash
console.log('Block hash:', block?.hash);

// Get network information
const networkInfo = await mirrorNode.getNetworkInfo();
console.log('Network nodes:', networkInfo?.nodes);

// Get network fees
const fees = await mirrorNode.getNetworkFees();
console.log('Current fees:', fees?.fees);

// Get network supply
const supply = await mirrorNode.getNetworkSupply();
console.log('Total supply:', supply?.total_supply);

// Get network stake
const stake = await mirrorNode.getNetworkStake();
console.log('Total stake:', stake?.total_stake_rewarded);
```

## Logger

The `Logger` class provides structured and level-based logging capabilities to help debug applications:

### Basic Usage

```typescript
import { Logger } from '@hashgraphonline/standards-sdk';

// Create a logger instance
const logger = new Logger({
  module: 'MyComponent',
  level: 'debug', // trace, debug, info, warn, error, fatal
});

// Log at different levels
logger.debug('Detailed information for debugging');
logger.info('General information about application progress');
logger.warn('Warning situations that might cause issues');
logger.error('Error events that might still allow the application to continue');
```

### Structured Logging

The logger supports structured data in logs:

```typescript
// Log with contextual data
logger.info('User authentication successful', {
  userId: '12345',
  loginTime: new Date().toISOString(),
  ipAddress: '192.168.1.1',
});

// Error logging with details
try {
  // Operation that might fail
} catch (error) {
  logger.error('Failed to process transaction', {
    transactionId: 'tx-12345',
    error: error.message,
    stack: error.stack,
  });
}
```

### Singleton Pattern

The logger supports a singleton pattern for consistent logging across modules:

```typescript
// In module 1
const logger1 = Logger.getInstance({ module: 'Module1', level: 'info' });

// In module 2
const logger2 = Logger.getInstance({ module: 'Module2' });

// Same logger instance is used and can be configured once
```

## Progress Reporter

The `ProgressReporter` class provides a standardized way to report progress for long-running operations:

### Basic Usage

```typescript
import { ProgressReporter } from '@hashgraphonline/standards-sdk';

// Create a progress reporter
const reporter = new ProgressReporter({
  module: 'FileUpload',
  callback: (data) => {
    console.log(`${data.stage}: ${data.message} (${data.progressPercent}%)`);
    // Update UI with progress
    updateProgressBar(data.progressPercent);
  },
  logger: myLogger, // Optional
});

// Report progress stages
reporter.preparing('Preparing file upload', 0);
reporter.submitting('Uploading file to server', 25);
reporter.confirming('Verifying upload integrity', 75);
reporter.completed('File upload complete');

// Or report progress manually
reporter.report({
  stage: 'processing',
  message: 'Analyzing file contents',
  progressPercent: 50,
  details: { fileSize: '2.5MB', fileType: 'image/jpeg' },
});
```

### Sub-Progress Tracking

Track progress of sub-tasks with percentage scaling:

```typescript
// Create main progress reporter
const mainReporter = new ProgressReporter({
  module: 'Registration',
  callback: updateMainProgressUI,
});

// Create sub-reporter for a specific phase (20-50% of main progress)
const profileProgress = mainReporter.createSubProgress({
  minPercent: 20,
  maxPercent: 50,
  logPrefix: 'Profile',
});

// Sub-reporter percentages are automatically scaled
profileProgress.preparing('Uploading profile picture', 0); // Reports 20% on main
profileProgress.submitting('Processing profile', 50); // Reports 35% on main
profileProgress.completed('Profile completed'); // Reports 50% on main
```

### Error Handling

Report failures with the progress reporter:

```typescript
try {
  // Long-running operation
  reporter.preparing('Starting operation', 0);

  // Simulated error
  throw new Error('Network connection failed');
} catch (error) {
  // Report failure with details
  reporter.failed(`Operation failed: ${error.message}`, {
    error: error.message,
    timestamp: new Date().toISOString(),
  });
}
```

## API Reference

### Mirror Node Service

```typescript
interface MirrorNodeConfig {
  /** Custom mirror node URL. Can include <API-KEY> placeholder for URL-based API keys. */
  customUrl?: string;
  /** API key for authentication. Will be used in both Authorization header and URL replacement. */
  apiKey?: string;
  /** Additional custom headers to include with requests. */
  headers?: Record<string, string>;
}

interface RetryConfig {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffFactor?: number;
}

class HederaMirrorNode {
  constructor(
    network: 'mainnet' | 'testnet',
    logger?: Logger,
    config?: MirrorNodeConfig
  );

  // Configuration
  getBaseUrl(): string;
  configureMirrorNode(config: MirrorNodeConfig): void;
  configureRetry(config: RetryConfig): void;

  // Account Operations
  getPublicKey(accountId: string): Promise<PublicKey>;
  getAccountMemo(accountId: string): Promise<string | null>;
  requestAccount(accountId: string): Promise<AccountResponse>;
  getAccountBalance(accountId: string): Promise<number | null>;
  checkKeyListAccess(keyBytes: Buffer, userPublicKey: PublicKey): Promise<boolean>;

  // Topic Operations
  getTopicInfo(topicId: string): Promise<TopicResponse>;
  getTopicFees(topicId: string): Promise<CustomFees | null>;
  getTopicMessages(topicId: string, options?: {
    sequenceNumber?: string | number;
    limit?: number;
    order?: 'asc' | 'desc';
  }): Promise<HCSMessage[]>;
  getTopicMessagesByFilter(topicId: string, options?: {
    sequenceNumber?: string;
    startTime?: string;
    endTime?: string;
    limit?: number;
    order?: 'asc' | 'desc';
  }): Promise<HCSMessage[] | null>;

  // Transaction Operations
  getTransaction(transactionIdOrHash: string): Promise<HederaTransaction | null>;
  getTransactionByTimestamp(timestamp: string): Promise<HederaTransaction[]>;
  getScheduleInfo(scheduleId: string): Promise<ScheduleInfo | null>;
  getScheduledTransactionStatus(scheduleId: string): Promise<{
    executed: boolean;
    executedDate?: Date;
    deleted: boolean;
  }>;

  // Token Operations
  getTokenInfo(tokenId: string): Promise<TokenInfoResponse | null>;
  getAccountTokens(accountId: string, limit?: number): Promise<AccountTokenBalance[] | null>;
  getHBARPrice(date: Date): Promise<number | null>;

  // NFT Operations
  getAccountNfts(accountId: string, tokenId?: string, limit?: number): Promise<NftDetail[] | null>;
  validateNFTOwnership(accountId: string, tokenId: string, serialNumber: number): Promise<NftDetail | null>;
  getNftInfo(tokenId: string, serialNumber: number): Promise<NftInfo | null>;
  getNftsByToken(tokenId: string, options?: {
    accountId?: string;
    limit?: number;
    order?: 'asc' | 'desc';
    serialNumber?: string;
  }): Promise<NftInfo[] | null>;

  // Airdrop Operations
  getOutstandingTokenAirdrops(accountId: string, options?: {
    limit?: number;
    order?: 'asc' | 'desc';
    receiverId?: string;
    serialNumber?: string;
    tokenId?: string;
  }): Promise<TokenAirdrop[] | null>;
  getPendingTokenAirdrops(accountId: string, options?: {
    limit?: number;
    order?: 'asc' | 'desc';
    senderId?: string;
    serialNumber?: string;
    tokenId?: string;
  }): Promise<TokenAirdrop[] | null>;

  // Smart Contract Operations
  readSmartContractQuery(
    contractIdOrAddress: string,
    functionSelector: string,
    payerAccountId: string,
    options?: {
      estimate?: boolean;
      block?: string;
      value?: number;
      gas?: number;
      gasPrice?: number;
    }
  ): Promise<ContractCallQueryResponse | null>;
  getContract(contractIdOrAddress: string, timestamp?: string): Promise<ContractEntity | null>;
  getContracts(options?: {
    contractId?: string;
    limit?: number;
    order?: 'asc' | 'desc';
  }): Promise<ContractEntity[] | null>;
  getContractResults(options?: {
    from?: string;
    blockHash?: string;
    blockNumber?: string;
    internal?: boolean;
    limit?: number;
    order?: 'asc' | 'desc';
    timestamp?: string;
    transactionIndex?: number;
  }): Promise<ContractResult[] | null>;
  getContractResult(transactionIdOrHash: string, nonce?: number): Promise<ContractResult | null>;
  getContractResultsByContract(contractIdOrAddress: string, options?: {
    blockHash?: string;
    blockNumber?: string;
    from?: string;
    internal?: boolean;
    limit?: number;
    order?: 'asc' | 'desc';
    timestamp?: string;
    transactionIndex?: number;
  }): Promise<ContractResult[] | null>;
  getContractState(contractIdOrAddress: string, options?: {
    limit?: number;
    order?: 'asc' | 'desc';
    slot?: string;
    timestamp?: string;
  }): Promise<ContractState[] | null>;
  getContractActions(transactionIdOrHash: string, options?: {
    index?: string;
    limit?: number;
    order?: 'asc' | 'desc';
  }): Promise<ContractAction[] | null>;
  getContractLogs(options?: {
    index?: string;
    limit?: number;
    order?: 'asc' | 'desc';
    timestamp?: string;
    topic0?: string;
    topic1?: string;
    topic2?: string;
    topic3?: string;
    transactionHash?: string;
  }): Promise<ContractLog[] | null>;
  getContractLogsByContract(contractIdOrAddress: string, options?: {
    index?: string;
    limit?: number;
    order?: 'asc' | 'desc';
    timestamp?: string;
    topic0?: string;
    topic1?: string;
    topic2?: string;
    topic3?: string;
  }): Promise<ContractLog[] | null>;
  getOpcodeTraces(transactionIdOrHash: string, options?: {
    stack?: boolean;
    memory?: boolean;
    storage?: boolean;
  }): Promise<OpcodesResponse | null>;

  // Network Operations
  getBlocks(options?: {
    limit?: number;
    order?: 'asc' | 'desc';
    timestamp?: string;
    blockNumber?: string;
  }): Promise<Block[] | null>;
  getBlock(blockNumberOrHash: string): Promise<Block | null>;
  getNetworkInfo(): Promise<NetworkInfo | null>;
  getNetworkFees(timestamp?: string): Promise<NetworkFees | null>;
  getNetworkSupply(timestamp?: string): Promise<NetworkSupply | null>;
  getNetworkStake(timestamp?: string): Promise<NetworkStake | null>;
}
```

### Logger Class

```typescript
class Logger {
  constructor(options: LoggerOptions);

  static getInstance(options?: LoggerOptions): Logger;

  debug(message: string, meta?: any): void;
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, meta?: any): void;

  setLevel(level: LogLevel): void;
  getLevel(): LogLevel;
}
```

### Progress Reporter

```typescript
class ProgressReporter {
  constructor(options: ProgressReporterOptions);

  preparing(stage: string, progressPercent: number): void;
  submitting(stage: string, progressPercent: number): void;
  confirming(stage: string, progressPercent: number): void;
  completed(stage: string): void;
  failed(stage: string, error: Error): void;
  report(data: ProgressData): void;
  createSubProgress(options: SubProgressOptions): ProgressReporter;
}
```

## Integration Examples

### Custom Logging Integration

```typescript
import { Logger, LogLevel } from '@hashgraphonline/standards-sdk';

// Create a custom logging solution that integrates with an external service
function setupLogging() {
  const logService = {
    sendLog: (level, message, meta) => {
      // Format timestamp
      const timestamp = new Date().toISOString();

      // Format metadata
      const metaString = meta ? JSON.stringify(meta) : '';

      // Prepare log entry
      const logEntry = {
        timestamp,
        level: LogLevel[level],
        message,
        metadata: meta,
      };

      // In a real implementation, you might send this to a logging service
      console.log(
        `[${timestamp}] [${LogLevel[level]}] ${message} ${metaString}`
      );

      // Example: Send to external service
      // fetch('https://logging-service.example.com/log', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(logEntry),
      // }).catch(console.error);
    },
  };

  // Configure the global logger instance
  Logger.getInstance({
    module: 'AppName',
    level:
      process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
    callback: (level, message, meta) => {
      logService.sendLog(level, message, meta);
    },
  });

  console.log('Logging system initialized');
}
```

### NFT Collection Explorer

```typescript
import { HederaMirrorNode, Logger } from '@hashgraphonline/standards-sdk';

async function exploreNFTCollection(tokenId: string, accountId: string) {
  const logger = new Logger({ module: 'NFTExplorer' });
  const mirrorNode = new HederaMirrorNode('mainnet', logger);

  try {
    // Get token information
    const tokenInfo = await mirrorNode.getTokenInfo(tokenId);
    console.log(`Collection: ${tokenInfo?.name} (${tokenInfo?.symbol})`);
    console.log(`Total Supply: ${tokenInfo?.total_supply}`);

    // Get NFTs owned by account
    const ownedNfts = await mirrorNode.getAccountNfts(accountId, tokenId, 100);
    console.log(`Account owns ${ownedNfts?.length || 0} NFTs from this collection`);

    // Check specific NFT ownership
    for (const nft of ownedNfts || []) {
      const nftInfo = await mirrorNode.getNftInfo(tokenId, nft.serial_number);
      console.log(`NFT #${nft.serial_number}:`);
      console.log(`  Metadata: ${nft.token_uri}`);
      console.log(`  Created: ${nftInfo?.created_timestamp}`);
    }
  } catch (error) {
    logger.error('Failed to explore NFT collection', error);
  }
}
```

### Transaction Monitor

```typescript
import { HederaMirrorNode, Logger } from '@hashgraphonline/standards-sdk';

async function monitorAccountTransactions(accountId: string) {
  const logger = new Logger({ module: 'TransactionMonitor' });
  const mirrorNode = new HederaMirrorNode('mainnet', logger);

  // Monitor scheduled transactions
  const checkScheduledTransactions = async () => {
    try {
      // This would require additional API endpoints to list scheduled transactions
      // For now, check specific schedule IDs
      const scheduleId = '0.0.123456';
      const status = await mirrorNode.getScheduledTransactionStatus(scheduleId);
      
      if (!status.executed && !status.deleted) {
        logger.info(`Schedule ${scheduleId} is still pending`);
      } else if (status.executed) {
        logger.info(`Schedule ${scheduleId} executed at ${status.executedDate}`);
      }
    } catch (error) {
      logger.error('Failed to check scheduled transactions', error);
    }
  };

  // Run checks periodically
  setInterval(checkScheduledTransactions, 60000); // Every minute
}
```

### Smart Contract Analytics

```typescript
import { HederaMirrorNode, Logger } from '@hashgraphonline/standards-sdk';

async function analyzeContractActivity(contractAddress: string) {
  const logger = new Logger({ module: 'ContractAnalytics' });
  const mirrorNode = new HederaMirrorNode('mainnet', logger);

  try {
    // Get contract information
    const contract = await mirrorNode.getContract(contractAddress);
    console.log(`Contract: ${contract?.contract_id}`);
    console.log(`Created: ${contract?.created_timestamp}`);

    // Get recent contract results
    const results = await mirrorNode.getContractResultsByContract(contractAddress, {
      limit: 10,
      order: 'desc'
    });

    console.log(`\nRecent transactions:`);
    for (const result of results || []) {
      console.log(`  Hash: ${result.hash}`);
      console.log(`  From: ${result.from}`);
      console.log(`  Gas Used: ${result.gas_used}`);
      console.log(`  Status: ${result.status}`);
    }

    // Get contract logs for specific events
    const transferEventTopic = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
    const logs = await mirrorNode.getContractLogsByContract(contractAddress, {
      topic0: transferEventTopic,
      limit: 5
    });

    console.log(`\nRecent Transfer events: ${logs?.length || 0}`);
  } catch (error) {
    logger.error('Failed to analyze contract', error);
  }
}
```

### Airdrop Manager

```typescript
import { HederaMirrorNode, Logger } from '@hashgraphonline/standards-sdk';

async function manageAirdrops(accountId: string) {
  const logger = new Logger({ module: 'AirdropManager' });
  const mirrorNode = new HederaMirrorNode('mainnet', logger);

  try {
    // Check outstanding airdrops sent
    const sentAirdrops = await mirrorNode.getOutstandingTokenAirdrops(accountId, {
      limit: 50
    });
    
    console.log(`Outstanding airdrops sent: ${sentAirdrops?.length || 0}`);
    for (const airdrop of sentAirdrops || []) {
      console.log(`  Token: ${airdrop.token_id} to ${airdrop.receiver_id}`);
      console.log(`  Amount: ${airdrop.amount}`);
    }

    // Check pending airdrops to claim
    const pendingAirdrops = await mirrorNode.getPendingTokenAirdrops(accountId, {
      limit: 50
    });

    console.log(`\nPending airdrops to claim: ${pendingAirdrops?.length || 0}`);
    for (const airdrop of pendingAirdrops || []) {
      console.log(`  Token: ${airdrop.token_id} from ${airdrop.sender_id}`);
      console.log(`  Amount: ${airdrop.amount}`);
    }
  } catch (error) {
    logger.error('Failed to manage airdrops', error);
  }
}
```

## Best Practices

### Logging

1. **Use Appropriate Log Levels**: Use debug for detailed information, info for general operational messages, warn for potential issues, and error for problems requiring attention.

2. **Include Context**: Add relevant metadata to log messages to provide context:

   ```typescript
   logger.info('Processing transaction', {
     transactionId,
     accountId,
     timestamp: new Date().toISOString(),
   });
   ```

3. **Error Handling**: Always log errors with their full stack traces:
   ```typescript
   try {
     await someOperation();
   } catch (error) {
     logger.error('Operation failed', {
       error: error.message,
       stack: error.stack,
     });
   }
   ```

### Mirror Node Usage

1. **Custom Provider Configuration**: When using custom mirror node providers, configure retry and rate limiting appropriately:

   ```typescript
   // Configure custom mirror node with retry settings
   const mirrorNode = new HederaMirrorNode('mainnet', logger, {
     customUrl: 'https://custom-provider.com/api/v1',
     apiKey: process.env.MIRROR_NODE_API_KEY,
     headers: {
       'X-Provider-Id': 'my-app-id'
     }
   });
   
   // Configure retry behavior for the custom provider
   mirrorNode.configureRetry({
     maxRetries: 5,
     initialDelayMs: 500,
     maxDelayMs: 30000,
     backoffFactor: 2
   });
   ```

2. **Dynamic Configuration**: Update mirror node configuration at runtime:

   ```typescript
   // Start with default Hedera mirror node
   const mirrorNode = new HederaMirrorNode('mainnet', logger);
   
   // Switch to custom provider based on conditions
   if (highTrafficMode) {
     mirrorNode.configureMirrorNode({
       customUrl: 'https://high-performance-mirror.com/api',
       apiKey: process.env.HIGH_PERF_API_KEY
     });
   }
   ```

3. **Caching**: Implement caching for frequently accessed mirror node data:

   ```typescript
   const cache = new Map();
   const CACHE_TTL = 60000; // 1 minute

   async function getCachedTopicInfo(topicId) {
     const cacheKey = `topic:${topicId}`;
     const now = Date.now();

     if (cache.has(cacheKey)) {
       const { data, timestamp } = cache.get(cacheKey);
       if (now - timestamp < CACHE_TTL) {
         return data;
       }
     }

     const info = await mirrorNode.getTopicInfo(topicId);
     cache.set(cacheKey, { data: info, timestamp: now });
     return info;
   }
   ```

2. **Rate Limiting**: Implement rate limiting for mirror node requests:

   ```typescript
   const pendingRequests = new Set();
   const MAX_CONCURRENT = 5;
   const RATE_LIMIT_DELAY = 100; // ms

   async function rateLimitedRequest(fn) {
     while (pendingRequests.size >= MAX_CONCURRENT) {
       await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_DELAY));
     }

     const requestId = Date.now() + Math.random();
     pendingRequests.add(requestId);

     try {
       return await fn();
     } finally {
       pendingRequests.delete(requestId);
     }
   }

   // Usage
   const topicInfo = await rateLimitedRequest(() =>
     mirrorNode.getTopicInfo(topicId)
   );
   ```

3. **Error Handling**: The mirror node service includes built-in retry logic, but you can add additional handling:

   ```typescript
   // Configure retry behavior
   mirrorNode.configureRetry({
     maxRetries: 5,
     initialDelayMs: 1000,
     maxDelayMs: 30000,
     backoffFactor: 2
   });

   // Add custom error handling
   async function safeApiCall<T>(operation: () => Promise<T>): Promise<T | null> {
     try {
       return await operation();
     } catch (error) {
       logger.error('Mirror node API call failed', {
         error: error.message,
         stack: error.stack
       });
       
       // Handle specific error cases
       if (error.message.includes('429')) {
         logger.warn('Rate limit reached, implementing backoff');
         await new Promise(resolve => setTimeout(resolve, 5000));
         return await safeApiCall(operation);
       }
       
       return null;
     }
   }

   // Usage
   const messages = await safeApiCall(() => 
     mirrorNode.getTopicMessages(topicId)
   );
   ```

4. **Batch Operations**: Efficiently handle multiple requests:

   ```typescript
   async function batchGetTokenInfo(tokenIds: string[]) {
     const results = new Map<string, any>();
     const batchSize = 5;
     
     for (let i = 0; i < tokenIds.length; i += batchSize) {
       const batch = tokenIds.slice(i, i + batchSize);
       
       // Process batch in parallel
       const batchResults = await Promise.allSettled(
         batch.map(tokenId => mirrorNode.getTokenInfo(tokenId))
       );
       
       // Store results
       batch.forEach((tokenId, index) => {
         const result = batchResults[index];
         if (result.status === 'fulfilled') {
           results.set(tokenId, result.value);
         } else {
           logger.error(`Failed to get info for token ${tokenId}`, result.reason);
         }
       });
       
       // Rate limit between batches
       if (i + batchSize < tokenIds.length) {
         await new Promise(resolve => setTimeout(resolve, 100));
       }
     }
     
     return results;
   }
   ```
