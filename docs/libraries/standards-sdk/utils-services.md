---
sidebar_position: 7
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
const mirrorNode = new HederaMirrorNode('testnet', logger);
```

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

// Get topic messages
const messages = await mirrorNode.getTopicMessages('0.0.123456');
console.log('Topic messages:', messages);
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

  getHBARPrice(date: Date): Promise<number>;
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
