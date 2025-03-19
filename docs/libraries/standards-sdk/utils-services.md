---
sidebar_position: 7
---

# Utilities and Services

The Standards SDK includes a collection of utility functions and service integrations that provide essential tools for working with the Hedera network. These components simplify common tasks and offer consistent interfaces for interacting with Hedera's services.

## Utilities

The Utilities module includes helper functions and tools for various SDK tasks.

### Logger

The Logger provides a consistent logging interface throughout the SDK with configurable log levels.

```typescript
import { Logger, LogLevel } from '@hashgraphonline/standards-sdk';

// Create a logger instance
const logger = Logger.getInstance({
  module: 'MyApp',
  level: LogLevel.DEBUG,
  timestamps: true,
});

// Use the logger
logger.debug('Detailed information useful for debugging');
logger.info('General information about application operation');
logger.warn('Warning conditions that should be addressed');
logger.error('Error conditions that may prevent proper operation');
```

#### Configuration

```typescript
interface LoggerOptions {
  module?: string; // Module name prefix for log messages
  level?: LogLevel; // Log level (DEBUG, INFO, WARN, ERROR)
  timestamps?: boolean; // Whether to include timestamps in log messages
  callback?: LogCallback; // Optional callback for custom log handling
}

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

type LogCallback = (level: LogLevel, message: string, meta?: any) => void;
```

#### Singleton Pattern

The Logger uses a singleton pattern to ensure consistent logging across your application:

```typescript
// Both loggers reference the same instance
const logger1 = Logger.getInstance({ module: 'MyApp' });
const logger2 = Logger.getInstance({ module: 'MyApp' });

// To create isolated logger instances
const customLogger = new Logger({
  module: 'CustomLogger',
  level: LogLevel.INFO,
});
```

### Topic Fee Utilities

Functions for working with topic fees and exempt keys:

```typescript
import { accountIdsToExemptKeys } from '@hashgraphonline/standards-sdk';

// Convert account IDs to public keys for fee exemption
async function setupFeeExemptions(accountIds) {
  const network = 'testnet';
  const logger = Logger.getInstance({ module: 'FeeSetup' });

  const exemptKeys = await accountIdsToExemptKeys(accountIds, network, logger);

  console.log(`Generated ${exemptKeys.length} exempt keys`);
  return exemptKeys;
}

// Usage in topic creation
const createTopicWithExemptions = async (client, adminKey, accountIds) => {
  const exemptKeys = await setupFeeExemptions(accountIds);

  const transaction = new TopicCreateTransaction()
    .setAdminKey(adminKey)
    .setTopicMemo('Topic with fee exemptions')
    .setFeeExemptSubmitterList(exemptKeys);

  return transaction.execute(client);
};
```

## Services

The Services module provides integrations with Hedera network services, primarily focusing on Mirror Node interaction.

### Hedera Mirror Node

The Mirror Node service enables interaction with Hedera's mirror nodes for retrieving network data:

```typescript
import { HederaMirrorNode } from '@hashgraphonline/standards-sdk';

// Initialize the mirror node client
const mirrorNode = new HederaMirrorNode('mainnet');

// Retrieve an account's public key
async function getAccountKey(accountId) {
  try {
    const publicKey = await mirrorNode.getPublicKey(accountId);
    console.log('Account public key:', publicKey.toString());
    return publicKey;
  } catch (error) {
    console.error('Failed to retrieve public key:', error);
    throw error;
  }
}

// Get account memo
async function getAccountMemo(accountId) {
  const memo = await mirrorNode.getAccountMemo(accountId);
  if (memo) {
    console.log('Account memo:', memo);
    return memo;
  } else {
    console.log('Account has no memo set');
    return null;
  }
}
```

#### Topic Information

Retrieve information about HCS topics:

```typescript
// Get topic information
async function getTopicDetails(topicId) {
  try {
    const topicInfo = await mirrorNode.getTopicInfo(topicId);

    console.log('Topic Info:');
    console.log('- Admin key:', topicInfo.admin_key?._type);
    console.log('- Auto renew account:', topicInfo.auto_renew_account);
    console.log('- Created:', topicInfo.created_timestamp);
    console.log('- Memo:', topicInfo.memo);

    return topicInfo;
  } catch (error) {
    console.error(`Failed to get info for topic ${topicId}:`, error);
    throw error;
  }
}

// Get topic fees
async function getTopicFees(topicId) {
  const fees = await mirrorNode.getTopicFees(topicId);

  if (fees) {
    console.log('Topic fees:');
    if (fees.fixed_fees.length > 0) {
      fees.fixed_fees.forEach((fee, index) => {
        console.log(`Fee ${index + 1}:`);
        console.log(`- Amount: ${fee.amount}`);
        console.log(`- Collector: ${fee.collector_account_id}`);
      });
    } else {
      console.log('No fixed fees set');
    }
  } else {
    console.log('No fee information available');
  }

  return fees;
}
```

#### Topic Messages

Retrieve and process messages from a topic:

```typescript
// Get all messages from a topic
async function getTopicMessages(topicId) {
  try {
    const messages = await mirrorNode.getTopicMessages(topicId);

    console.log(`Retrieved ${messages.length} messages from topic ${topicId}`);

    // Process messages
    messages.forEach((message, index) => {
      console.log(`Message ${index + 1}:`);
      console.log(`- Sequence: ${message.sequence_number}`);
      console.log(`- Timestamp: ${message.consensus_timestamp}`);
      console.log(`- Payer: ${message.payer_account_id}`);

      try {
        // Try to parse as JSON
        const content = JSON.parse(message.message);
        console.log('- Content (JSON):', content);
      } catch {
        // If not JSON, treat as plain text
        console.log('- Content (Text):', message.message);
      }
    });

    return messages;
  } catch (error) {
    console.error(`Failed to retrieve messages for topic ${topicId}:`, error);
    throw error;
  }
}
```

#### Access Control Checking

Verify if a public key has access to a key list:

```typescript
// Check if a user has access to a key list
async function checkUserAccess(keyListBytes, userPublicKey) {
  try {
    const hasAccess = await mirrorNode.checkKeyListAccess(
      Buffer.from(keyListBytes),
      userPublicKey
    );

    if (hasAccess) {
      console.log('User has access to the key list');
    } else {
      console.log('User does not have access to the key list');
    }

    return hasAccess;
  } catch (error) {
    console.error('Error checking key list access:', error);
    throw error;
  }
}
```

## API Reference

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

### Topic Fee Utilities

```typescript
function accountIdsToExemptKeys(
  accountIds: string[],
  network: string,
  logger?: Logger
): Promise<PublicKey[]>;
```

### Mirror Node Service

```typescript
class HederaMirrorNode {
  constructor(network: 'mainnet' | 'testnet', logger?: Logger);

  getBaseUrl(): string;

  getPublicKey(accountId: string): Promise<PublicKey>;

  getAccountMemo(accountId: string): Promise<string | null>;

  getTopicInfo(topicId: string): Promise<TopicResponse>;

  getTopicFees(topicId: string): Promise<CustomFees | null>;

  getTopicMessages(topicId: string): Promise<HCSMessage[]>;

  requestAccount(accountId: string): Promise<AccountResponse>;

  checkKeyListAccess(
    keyBytes: Buffer,
    userPublicKey: PublicKey
  ): Promise<boolean>;
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

### Topic Analytics

```typescript
import { HederaMirrorNode } from '@hashgraphonline/standards-sdk';

class TopicAnalytics {
  constructor(network = 'mainnet') {
    this.mirrorNode = new HederaMirrorNode(network);
  }

  async analyzeTopicActivity(topicId) {
    try {
      const messages = await this.mirrorNode.getTopicMessages(topicId);
      const topicInfo = await this.mirrorNode.getTopicInfo(topicId);

      // Basic analytics
      const messageCount = messages.length;
      const uniqueSenders = new Set(messages.map((m) => m.payer_account_id))
        .size;

      // Message frequency
      const timestamps = messages.map((m) => new Date(m.consensus_timestamp));
      const oldestMessage =
        timestamps.length > 0
          ? new Date(Math.min(...timestamps.map((t) => t.getTime())))
          : null;
      const newestMessage =
        timestamps.length > 0
          ? new Date(Math.max(...timestamps.map((t) => t.getTime())))
          : null;

      let avgMessagesPerDay = 0;
      if (oldestMessage && newestMessage) {
        const daysDiff =
          (newestMessage.getTime() - oldestMessage.getTime()) /
          (1000 * 60 * 60 * 24);
        avgMessagesPerDay = messageCount / (daysDiff || 1);
      }

      // Message size analytics
      const messageSizes = messages.map((m) => m.message.length);
      const avgMessageSize =
        messageSizes.reduce((sum, size) => sum + size, 0) /
        (messageSizes.length || 1);
      const maxMessageSize =
        messageSizes.length > 0 ? Math.max(...messageSizes) : 0;

      // Return analytics
      return {
        topicId,
        topicCreated: topicInfo.created_timestamp,
        topicMemo: topicInfo.memo,
        messageCount,
        uniqueSenders,
        oldestMessage,
        newestMessage,
        avgMessagesPerDay: avgMessagesPerDay.toFixed(2),
        avgMessageSize: avgMessageSize.toFixed(2),
        maxMessageSize,
      };
    } catch (error) {
      console.error(`Failed to analyze topic ${topicId}:`, error);
      throw error;
    }
  }

  async getTopContributors(topicId, limit = 5) {
    try {
      const messages = await this.mirrorNode.getTopicMessages(topicId);

      // Count messages by sender
      const senderCounts = {};
      messages.forEach((message) => {
        const sender = message.payer_account_id;
        senderCounts[sender] = (senderCounts[sender] || 0) + 1;
      });

      // Sort senders by message count
      const sortedSenders = Object.entries(senderCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([accountId, count]) => ({ accountId, count }));

      return sortedSenders;
    } catch (error) {
      console.error(
        `Failed to get top contributors for topic ${topicId}:`,
        error
      );
      throw error;
    }
  }
}

// Usage
async function displayTopicInsights(topicId) {
  const analytics = new TopicAnalytics();

  try {
    const insights = await analytics.analyzeTopicActivity(topicId);
    const contributors = await analytics.getTopContributors(topicId);

    console.log('Topic Insights:', insights);
    console.log('Top Contributors:', contributors);
  } catch (error) {
    console.error('Analysis failed:', error);
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

1. **Caching**: Implement caching for frequently accessed mirror node data:

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

3. **Error Handling**: Implement retries for transient mirror node errors:

   ```typescript
   async function withRetry(fn, maxRetries = 3, delay = 1000) {
     let lastError;

     for (let attempt = 0; attempt < maxRetries; attempt++) {
       try {
         return await fn();
       } catch (error) {
         lastError = error;

         // Only retry on 5xx errors or network issues
         if (error.status && error.status < 500 && error.status !== 429) {
           throw error;
         }

         if (attempt < maxRetries - 1) {
           await new Promise((resolve) =>
             setTimeout(resolve, delay * Math.pow(2, attempt))
           );
         }
       }
     }

     throw lastError;
   }

   // Usage
   const messages = await withRetry(() => mirrorNode.getTopicMessages(topicId));
   ```
