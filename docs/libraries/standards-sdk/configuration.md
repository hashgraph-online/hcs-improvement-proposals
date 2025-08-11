---
sidebar_position: 8
---

# Configuration and Integration

The Standards SDK provides flexible configuration options to integrate with various Hedera infrastructure providers and customize behavior for your specific needs.

## Mirror Node Configuration

The SDK supports integration with custom mirror node providers beyond the default Hedera public mirror nodes. This enables enhanced performance, reliability, and access to specialized features.

### Default Configuration

By default, the SDK uses Hedera's public mirror nodes:

```typescript
import { HederaMirrorNode } from '@hashgraphonline/standards-sdk';

// Uses public Hedera mirror nodes
const mirrorNode = new HederaMirrorNode('mainnet', logger);
// Mainnet: https://mainnet-public.mirrornode.hedera.com
// Testnet: https://testnet.mirrornode.hedera.com
```

### Custom Mirror Node Providers

Configure the SDK to use third-party mirror node services:

```typescript
import { HederaMirrorNode, Logger } from '@hashgraphonline/standards-sdk';

const logger = new Logger({ module: 'MyApp', level: 'info' });

// Example: HGraph Provider
const hgraphMirrorNode = new HederaMirrorNode('mainnet', logger, {
  customUrl: 'https://mainnet.hedera.api.hgraph.dev/v1/<API-KEY>',
  apiKey: 'your-hgraph-api-key'
});

// Example: Custom Provider with Headers
const customMirrorNode = new HederaMirrorNode('mainnet', logger, {
  customUrl: 'https://custom-mirror.example.com/api',
  apiKey: 'your-api-key',
  headers: {
    'X-Provider-Id': 'my-application',
    'X-Request-Source': 'production'
  }
});
```

### Configuration Options

The `MirrorNodeConfig` interface supports:

```typescript
interface MirrorNodeConfig {
  /** Custom mirror node URL. Can include <API-KEY> placeholder for URL-based API keys */
  customUrl?: string;
  
  /** API key for authentication. Used in both Authorization header and URL replacement */
  apiKey?: string;
  
  /** Additional custom headers to include with requests */
  headers?: Record<string, string>;
}
```

### Dynamic Configuration Updates

Update mirror node configuration at runtime based on application needs:

```typescript
const mirrorNode = new HederaMirrorNode('mainnet', logger);

// Switch to high-performance provider during peak usage
function switchToHighPerformanceMode() {
  mirrorNode.configureMirrorNode({
    customUrl: 'https://premium-mirror.example.com/api',
    apiKey: process.env.PREMIUM_API_KEY,
    headers: {
      'X-Priority': 'high'
    }
  });
}

// Revert to standard configuration
function switchToStandardMode() {
  mirrorNode.configureMirrorNode({
    customUrl: undefined, // Reverts to default Hedera mirror nodes
    apiKey: undefined,
    headers: {}
  });
}
```

## Retry Configuration

Customize retry behavior for network requests to handle transient failures:

```typescript
// Configure retry settings
mirrorNode.configureRetry({
  maxRetries: 5,              // Maximum number of retry attempts
  initialDelayMs: 500,        // Initial delay between retries
  maxDelayMs: 30000,          // Maximum delay between retries
  backoffFactor: 2            // Exponential backoff multiplier
});
```

### Retry Strategy

The SDK implements intelligent retry logic:

- **Automatic Retries**: For network errors and 5xx server errors
- **No Retry**: For client errors (4xx) except rate limiting (429)
- **Exponential Backoff**: Delays increase exponentially with each retry
- **Maximum Delay Cap**: Prevents excessive wait times

## Integration with HCS Protocols

### HCS-1 Inscriptions with Custom Mirror Nodes

```typescript
import { inscribe } from '@hashgraphonline/standards-sdk';

// Configure custom mirror node for inscriptions
const customConfig = {
  network: 'mainnet',
  mirrorNodeConfig: {
    customUrl: 'https://fast-mirror.example.com',
    apiKey: process.env.MIRROR_API_KEY
  }
};

const result = await inscribe(
  {
    type: 'text',
    content: 'High-performance inscription',
    fileName: 'data.txt'
  },
  {
    ...customConfig,
    accountId: '0.0.123456',
    privateKey: 'your-private-key'
  }
);
```

### HCS-10 Agent Communication

```typescript
import { HCS10Client } from '@hashgraphonline/standards-sdk';

// Initialize with custom mirror node
const agentClient = new HCS10Client({
  network: 'mainnet',
  mirrorNode: new HederaMirrorNode('mainnet', logger, {
    customUrl: 'https://agent-optimized-mirror.com',
    apiKey: process.env.AGENT_MIRROR_KEY
  })
});
```

## Environment-Based Configuration

Implement environment-aware configuration:

```typescript
import { HederaMirrorNode, Logger } from '@hashgraphonline/standards-sdk';

function createMirrorNode(network: 'mainnet' | 'testnet'): HederaMirrorNode {
  const logger = new Logger({ 
    module: 'MirrorNode',
    level: process.env.LOG_LEVEL || 'info'
  });

  // Development environment
  if (process.env.NODE_ENV === 'development') {
    return new HederaMirrorNode(network, logger);
  }

  // Production environment with custom provider
  if (process.env.NODE_ENV === 'production') {
    return new HederaMirrorNode(network, logger, {
      customUrl: process.env.MIRROR_NODE_URL,
      apiKey: process.env.MIRROR_NODE_API_KEY,
      headers: {
        'X-Environment': 'production',
        'X-Application': process.env.APP_NAME || 'standards-sdk-app'
      }
    });
  }

  // Test environment with mocked responses
  if (process.env.NODE_ENV === 'test') {
    return new HederaMirrorNode(network, logger, {
      customUrl: 'http://localhost:3000/mock-mirror',
      headers: {
        'X-Test-Mode': 'true'
      }
    });
  }

  return new HederaMirrorNode(network, logger);
}
```

## Performance Optimization

### Connection Pooling

When using custom mirror nodes, implement connection pooling for better performance:

```typescript
import { HederaMirrorNode } from '@hashgraphonline/standards-sdk';

// Create a pool of mirror node instances
class MirrorNodePool {
  private pool: HederaMirrorNode[] = [];
  private currentIndex = 0;

  constructor(
    size: number,
    network: 'mainnet' | 'testnet',
    config: MirrorNodeConfig
  ) {
    for (let i = 0; i < size; i++) {
      this.pool.push(
        new HederaMirrorNode(network, logger, config)
      );
    }
  }

  getNext(): HederaMirrorNode {
    const node = this.pool[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.pool.length;
    return node;
  }
}

// Use the pool for load distribution
const mirrorPool = new MirrorNodePool(5, 'mainnet', {
  customUrl: 'https://load-balanced-mirror.com',
  apiKey: process.env.API_KEY
});

// Get next available mirror node instance
const mirrorNode = mirrorPool.getNext();
```

### Request Batching

Optimize multiple mirror node requests:

```typescript
// Batch multiple account queries
async function batchAccountQueries(accountIds: string[]) {
  const mirrorNode = new HederaMirrorNode('mainnet', logger, {
    customUrl: process.env.BATCH_OPTIMIZED_MIRROR_URL,
    apiKey: process.env.API_KEY
  });

  // Process in parallel with concurrency limit
  const batchSize = 10;
  const results = [];

  for (let i = 0; i < accountIds.length; i += batchSize) {
    const batch = accountIds.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(id => mirrorNode.requestAccount(id))
    );
    results.push(...batchResults);
  }

  return results;
}
```

## Security Considerations

### API Key Management

Best practices for managing API keys:

```typescript
// Never hardcode API keys
const UNSAFE = {
  apiKey: 'sk_live_abc123...' // ❌ Never do this
};

// Use environment variables
const SAFE = {
  apiKey: process.env.MIRROR_NODE_API_KEY // ✅ Load from environment
};

// Validate API key presence
if (!process.env.MIRROR_NODE_API_KEY) {
  throw new Error('MIRROR_NODE_API_KEY environment variable is required');
}
```

### Secure Headers

Add security headers when using custom providers:

```typescript
const mirrorNode = new HederaMirrorNode('mainnet', logger, {
  customUrl: process.env.MIRROR_NODE_URL,
  apiKey: process.env.API_KEY,
  headers: {
    'X-Request-ID': generateRequestId(),
    'X-Client-Version': packageJson.version,
    'User-Agent': `${packageJson.name}/${packageJson.version}`
  }
});
```

## Monitoring and Debugging

### Request Logging

Enable detailed logging for debugging:

```typescript
const logger = new Logger({
  module: 'MirrorNode',
  level: 'debug', // Enable debug logs
  callback: (level, message, meta) => {
    // Custom logging logic
    if (meta?.url) {
      console.log(`Mirror Node Request: ${meta.url}`);
    }
  }
});

const mirrorNode = new HederaMirrorNode('testnet', logger, {
  customUrl: process.env.DEBUG_MIRROR_URL
});
```

### Performance Metrics

Track mirror node performance:

```typescript
class MetricsMirrorNode extends HederaMirrorNode {
  private metrics = {
    requests: 0,
    errors: 0,
    totalLatency: 0
  };

  async requestAccount(accountId: string) {
    const start = Date.now();
    this.metrics.requests++;

    try {
      const result = await super.requestAccount(accountId);
      this.metrics.totalLatency += Date.now() - start;
      return result;
    } catch (error) {
      this.metrics.errors++;
      throw error;
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      averageLatency: this.metrics.totalLatency / this.metrics.requests,
      errorRate: this.metrics.errors / this.metrics.requests
    };
  }
}
```

## Next Steps

- Learn about [HCS-10 Agent Communication](./hcs-10) for agent-specific configurations
- Explore [Utilities and Services](./utils-services.md) for more helper functions
- View [Integration Examples](https://github.com/hashgraph-online/standards-sdk/tree/main/examples) on GitHub