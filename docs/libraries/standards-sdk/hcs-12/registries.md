---
sidebar_position: 4
---

# Registry System Implementation

The HCS-12 registry system provides decentralized discovery and management of actions, assemblies, and HashLinks. All registries are built on HCS topics for guaranteed consensus and immutability.

---

## What It Does

- **Manages three registry types**: Actions (Type 0), Assemblies (Type 2), HashLinks (Type 3)  
- **Provides decentralized discovery** through HCS topic synchronization
- **Implements caching strategies** for optimal performance
- **Supports search and filtering** with tag-based organization
- **Handles registry migrations** and version management

---

## Registry Architecture

Each registry type serves a specific purpose in the HashLinks ecosystem:

```typescript
enum RegistryType {
  ACTION = 0,        // WASM action modules
  ASSEMBLY = 2,      // Assembly compositions  
  HASHLINKS = 3,     // Global HashLinks directory
}

interface RegistryConfig {
  topicId: string;              // HCS topic ID
  type: RegistryType;           // Registry type
  cacheStrategy: CacheStrategy; // Caching approach
  syncInterval: number;         // Sync frequency (ms)
  maxCacheSize: number;         // Cache size limit
  auditEnabled: boolean;        // Enable audit logging
}
```

---

## Registry Types Deep-Dive

### ActionRegistry (Type 0)

Manages WASM action module registrations and lookups:

```typescript
import { ActionRegistry, HCS12Client, Logger } from '@hashgraphonline/standards-sdk';

// Initialize action registry
const client = new HCS12Client(config);
const actionRegistry = new ActionRegistry(
  '0.0.456789',  // Action registry topic ID
  client.hederaMirrorNode,
  client.hcs1Client,
  new Logger({ module: 'ActionRegistry' })
);

// Register a new action
const actionRegistration = {
  p: 'hcs-12',
  op: 'register',
  t_id: '0.0.123456',        // WASM module topic ID
  hash: 'abc123...',         // INFO method result hash
  wasm_hash: 'def456...',    // WASM binary hash
  js_t_id: '0.0.123457',     // Optional JS wrapper topic
  js_hash: '789abc...',      // Optional JS wrapper hash
  interface_version: '0.2.95', // wasm-bindgen version
  validation_rules: {
    swap: {
      type: 'object',
      properties: {
        amount: { type: 'number', minimum: 0 },
        tokenIn: { type: 'string', pattern: '^0\\.0\\.[0-9]+$' }
      }
    }
  }
};

await actionRegistry.register(actionRegistration);

// Query actions by hash
const action = await actionRegistry.getByHash('abc123...');
if (action) {
  console.log('Found action:', {
    topicId: action.t_id,
    wasmHash: action.wasm_hash,
    hasJsWrapper: !!action.js_t_id
  });
}

// Get all registered actions
const allActions = await actionRegistry.getAll();
console.log(`Total actions registered: ${allActions.length}`);

// Search actions by capabilities
const tokenActions = allActions.filter(action => 
  action.validation_rules && 
  Object.keys(action.validation_rules).some(rule => 
    rule.includes('token') || rule.includes('swap')
  )
);
```

### AssemblyRegistry (Type 2)

Manages assembly compositions with incremental operations:

```typescript
import { AssemblyRegistry } from '@hashgraphonline/standards-sdk';

// Initialize assembly registry
const assemblyRegistry = new AssemblyRegistry(
  '0.0.567890',  // Assembly registry topic ID
  client.hederaMirrorNode,
  client.hcs1Client,
  logger
);

// Process assembly registration
const assemblyRegistration = {
  p: 'hcs-12',
  op: 'register',
  name: 'defi-dashboard',
  version: '1.0.0',
  title: 'DeFi Trading Dashboard',
  description: 'Complete DeFi trading interface',
  tags: ['defi', 'trading', 'swap'],
  author: '0.0.123456',
  license: 'MIT'
};

await assemblyRegistry.register(assemblyRegistration);

// Process add-action operation
const addActionOp = {
  p: 'hcs-12',
  op: 'add-action',
  t_id: '0.0.action123',
  alias: 'swapEngine'
};

await assemblyRegistry.processOperation(addActionOp);

// Process add-block operation  
const addBlockOp = {
  p: 'hcs-12',
  op: 'add-block',
  block_t_id: '0.0.block456',
  actions: {
    executeSwap: '0.0.action123',
    getQuote: '0.0.action123'
  },
  attributes: {
    title: 'Token Swap Interface',
    theme: 'dark'
  }
};

await assemblyRegistry.processOperation(addBlockOp);

// Get complete assembly state
const assembly = await assemblyRegistry.getAssemblyState('defi-dashboard', '1.0.0');
if (assembly) {
  console.log('Assembly state:', {
    name: assembly.name,
    version: assembly.version,
    actionsCount: assembly.actions.length,
    blocksCount: assembly.blocks.length,
    created: assembly.created,
    updated: assembly.updated
  });
}

// Search assemblies by tags
const defiAssemblies = await assemblyRegistry.searchByTags(['defi']);
console.log(`Found ${defiAssemblies.length} DeFi assemblies`);
```

### HashLinksRegistry (Type 3)

Global directory for HashLink discovery and organization:

```typescript
import { HashLinksRegistry } from '@hashgraphonline/standards-sdk';

// Initialize HashLinks registry
const hashLinksRegistry = new HashLinksRegistry(
  '0.0.678901',  // HashLinks registry topic ID
  client.hederaMirrorNode,
  client.hcs1Client,
  logger
);

// Register a HashLink
const hashLinkRegistration = {
  p: 'hcs-12',
  op: 'register',
  name: 'token-swap-app',
  version: '2.1.0',
  title: 'Advanced Token Swap',
  description: 'Professional token swapping with advanced features',
  category: 'defi',
  tags: ['swap', 'defi', 'tokens', 'liquidity'],
  author: '0.0.123456',
  license: 'MIT',
  assembly_t_id: '0.0.assembly789',
  icon: 'exchange-alt',
  screenshots: ['0.0.screenshot1', '0.0.screenshot2'],
  featured: false,
  rating: 4.8,
  downloads: 1250,
  keywords: ['token', 'swap', 'trade', 'exchange']
};

await hashLinksRegistry.register(hashLinkRegistration);

// Search HashLinks by various criteria
const searchResults = await hashLinksRegistry.search({
  query: 'token swap',
  category: 'defi',
  tags: ['swap'],
  minRating: 4.0,
  limit: 10,
  sortBy: 'popularity'  // or 'rating', 'recent', 'name'
});

console.log('Search results:', searchResults.map(result => ({
  name: result.name,
  title: result.title,
  rating: result.rating,
  downloads: result.downloads
})));

// Get featured HashLinks
const featured = await hashLinksRegistry.getFeatured();
console.log(`Featured HashLinks: ${featured.length}`);

// Get HashLinks by category
const defiHashLinks = await hashLinksRegistry.getByCategory('defi');
console.log(`DeFi HashLinks: ${defiHashLinks.length}`);

// Get HashLinks by tags
const swapHashLinks = await hashLinksRegistry.searchByTags(['swap', 'exchange']);
console.log(`Swap-related HashLinks: ${swapHashLinks.length}`);

// Update HashLink rating (simulated)
await hashLinksRegistry.updateRating('token-swap-app', 4.9, 1300);
```

---

## Registry Initialization and Management

### Client-Side Registry Setup

Initialize all registries through the HCS12 client:

```typescript
import { HCS12Client, NetworkType, Logger } from '@hashgraphonline/standards-sdk';

const client = new HCS12Client({
  network: NetworkType.TESTNET,
  hcs12: {
    operatorId: process.env.HEDERA_OPERATOR_ID!,
    operatorPrivateKey: process.env.HEDERA_OPERATOR_KEY!,
    registryTopics: {
      action: '0.0.456789',
      assembly: '0.0.567890', 
      hashlinks: '0.0.678901'
    }
  },
  logger: new Logger({ module: 'HCS12Client' })
});

// Initialize all registries
await client.initializeRegistries({
  cacheStrategy: 'hybrid',      // memory + storage
  syncInterval: 30000,          // 30 seconds
  maxCacheSize: 100 * 1024 * 1024, // 100MB
  auditEnabled: true,
  preloadFeatured: true        // Preload featured HashLinks
});

// Verify registries are ready
const registryStatus = await client.getRegistryStatus();
console.log('Registry status:', {
  action: registryStatus.action.ready,
  assembly: registryStatus.assembly.ready,
  hashlinks: registryStatus.hashlinks.ready,
  totalEntries: registryStatus.totalEntries,
  lastSync: registryStatus.lastSync
});
```

### Manual Registry Synchronization

Control registry synchronization for optimal performance:

```typescript
// Sync specific registry
await client.syncRegistry('action', {
  fromSequence: 0,           // Start from beginning
  batchSize: 100,            // Process 100 messages per batch
  maxMessages: 1000,         // Limit total messages
  onProgress: (current, total, registry) => {
    const percent = Math.round((current / total) * 100);
    console.log(`Syncing ${registry}: ${percent}% (${current}/${total})`);
  },
  onError: (error, registry, sequence) => {
    console.error(`Sync error in ${registry} at sequence ${sequence}:`, error);
    return 'continue'; // or 'abort', 'retry'
  }
});

// Sync all registries in parallel
const syncPromises = ['action', 'assembly', 'hashlinks'].map(type => 
  client.syncRegistry(type as any, { 
    maxMessages: 500,
    batchSize: 50 
  })
);

try {
  await Promise.all(syncPromises);
  console.log('All registries synchronized');
} catch (error) {
  console.error('Registry sync failed:', error.message);
}

// Force refresh cached data
await client.refreshRegistryCache('hashlinks');
```

---

## Caching Strategies

### Memory-First Caching

Optimal for frequently accessed data:

```typescript
// Configure memory-first strategy
const cacheConfig = {
  strategy: 'memory-first',
  memoryLimit: 50 * 1024 * 1024,  // 50MB memory cache
  storageLimit: 200 * 1024 * 1024, // 200MB storage cache
  ttl: {
    action: 3600000,      // 1 hour
    assembly: 1800000,    // 30 minutes
    hashlinks: 7200000    // 2 hours
  },
  evictionPolicy: 'lru',  // Least Recently Used
  compressionEnabled: true
};

// Apply cache configuration
client.configureRegistryCache(cacheConfig);

// Cache statistics
const cacheStats = client.getRegistryCacheStats();
console.log('Cache statistics:', {
  memoryUsage: cacheStats.memoryUsage,
  storageUsage: cacheStats.storageUsage,
  hitRate: cacheStats.hitRate,
  missCount: cacheStats.missCount
});
```

### Hybrid Caching

Balance between memory and storage:

```typescript
// Hybrid strategy configuration
const hybridConfig = {
  strategy: 'hybrid',
  hotDataMemory: 20 * 1024 * 1024,   // 20MB for hot data
  coldDataStorage: 100 * 1024 * 1024, // 100MB for cold data
  hotThreshold: 10,                    // Access count to be "hot"
  coldThreshold: 1440,                 // Minutes before data becomes "cold"
  preloadPatterns: [
    'featured:*',                      // All featured HashLinks
    'category:defi',                   // All DeFi HashLinks
    'recent:7d'                        // Recent 7 days
  ]
};

client.configureRegistryCache(hybridConfig);
```

---

## Advanced Search and Filtering

### Complex Search Queries

Implement sophisticated search across registries:

```typescript
// Advanced HashLink search
const advancedSearch = await hashLinksRegistry.advancedSearch({
  // Text search
  query: 'swap OR exchange OR trade',
  queryFields: ['title', 'description', 'keywords'],
  
  // Filters
  filters: {
    category: ['defi', 'tools'],
    tags: ['swap', 'liquidity'],
    minRating: 4.0,
    minDownloads: 100,
    author: '0.0.123456',
    license: ['MIT', 'Apache-2.0'],
    hasScreenshots: true,
    recentlyUpdated: '30d'  // Updated within 30 days
  },
  
  // Sorting and pagination
  sortBy: 'relevance',     // or 'rating', 'downloads', 'recent', 'name'
  sortOrder: 'desc',
  offset: 0,
  limit: 20,
  
  // Faceted search
  facets: ['category', 'tags', 'author'],
  
  // Highlighting
  highlight: {
    fields: ['title', 'description'],
    preTag: '<mark>',
    postTag: '</mark>'
  }
});

console.log('Advanced search results:', {
  total: advancedSearch.total,
  results: advancedSearch.results,
  facets: advancedSearch.facets,
  took: advancedSearch.took
});

// Search assemblies with filters
const assemblySearch = await assemblyRegistry.search({
  hasActions: true,           // Must have actions
  hasBlocks: true,            // Must have blocks
  minActionsCount: 2,         // At least 2 actions
  maxBlocksCount: 10,         // At most 10 blocks
  tags: ['interactive'],      // Must have 'interactive' tag
  author: '0.0.123456',       // By specific author
  versionRange: '^1.0.0',     // Version compatibility
  updatedAfter: new Date('2024-01-01')
});
```

### Tag-Based Organization

Implement hierarchical tag systems:

```typescript
// Hierarchical tag search
const tagHierarchy = {
  'defi': ['swap', 'lending', 'staking', 'yield'],
  'gaming': ['nft', 'collectibles', 'marketplace'],
  'tools': ['analytics', 'monitoring', 'development'],
  'social': ['messaging', 'voting', 'governance']
};

// Search with tag expansion
const expandedSearch = await hashLinksRegistry.searchWithTagExpansion('defi', {
  includeSubtags: true,      // Include all defi subtags
  tagWeights: {              // Weight different tags
    'defi': 1.0,
    'swap': 1.2,             // Boost swap results
    'lending': 0.8
  }
});

// Tag-based recommendations
const recommendations = await hashLinksRegistry.getRecommendations({
  basedOnTags: ['defi', 'swap'],
  excludeAlreadyUsed: true,
  maxResults: 5,
  diversityFactor: 0.7       // Balance relevance vs diversity
});
```

---

## Registry Audit and Analytics

### Audit Trail

Track all registry operations for compliance:

```typescript
// Enable comprehensive auditing
const auditConfig = {
  enabled: true,
  logLevel: 'detailed',      // or 'basic', 'minimal'
  includeContent: false,     // Don't log full content for privacy
  retentionDays: 365,        // Keep audit logs for 1 year
  exportFormat: 'json',      // or 'csv', 'xml'
};

client.configureRegistryAudit(auditConfig);

// Query audit logs
const auditLogs = await client.getRegistryAuditLogs({
  registry: 'hashlinks',
  operation: ['register', 'update'],
  dateRange: {
    from: new Date('2024-01-01'),
    to: new Date('2024-12-31')
  },
  author: '0.0.123456',
  limit: 100
});

console.log('Audit trail:', auditLogs.map(log => ({
  timestamp: log.timestamp,
  operation: log.operation,
  registry: log.registry,
  itemId: log.itemId,
  author: log.author,
  success: log.success,
  changes: log.changes
})));

// Generate compliance report
const complianceReport = await client.generateComplianceReport({
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-12-31'),
  includeMetrics: true,
  format: 'pdf'
});
```

### Registry Analytics

Monitor registry usage and performance:

```typescript
// Get registry analytics
const analytics = await client.getRegistryAnalytics({
  timeRange: '30d',          // Last 30 days
  granularity: 'daily',      // Daily breakdown
  includeGrowth: true,       // Include growth rates
  includePopular: true       // Include popular items
});

console.log('Registry analytics:', {
  totalRegistrations: analytics.totalRegistrations,
  dailyGrowth: analytics.dailyGrowth,
  popularItems: analytics.popularItems,
  topCategories: analytics.topCategories,
  activeAuthors: analytics.activeAuthors,
  searchMetrics: analytics.searchMetrics
});

// Monitor registry health
const healthMetrics = await client.getRegistryHealth();
console.log('Registry health:', {
  uptime: healthMetrics.uptime,
  syncLatency: healthMetrics.syncLatency,
  cacheHitRate: healthMetrics.cacheHitRate,
  errorRate: healthMetrics.errorRate,
  throughput: healthMetrics.throughput
});
```

---

## Common Issues and Solutions

### 1. Registry Synchronization Lag

**Problem**: Registry data is out of sync with network
```
Warning: Registry last sync was 2 hours ago, data may be stale
```

**Solution**: Implement proper sync monitoring and retry logic
```typescript
// Monitor sync health
const syncMonitor = new RegistrySyncMonitor(client);
syncMonitor.on('sync_lag', async (registry, lagMinutes) => {
  if (lagMinutes > 60) {
    console.warn(`Registry ${registry} lag detected: ${lagMinutes} minutes`);
    
    // Force sync
    await client.syncRegistry(registry, { 
      priority: 'high',
      timeout: 30000 
    });
  }
});

// Auto-sync on network reconnect
client.on('network_connected', async () => {
  await client.syncAllRegistries({ 
    catchUp: true,
    maxLag: 3600000  // 1 hour max lag
  });
});
```

### 2. Cache Memory Issues

**Problem**: Registry cache consuming too much memory
```
Error: Registry cache exceeded memory limit (100MB)
```

**Solution**: Optimize cache configuration and eviction
```typescript
// Implement intelligent cache eviction
const cacheManager = new RegistryCacheManager({
  maxMemory: 50 * 1024 * 1024,  // 50MB limit
  evictionPolicy: 'lru-with-priority',
  priorities: {
    'featured': 'high',       // Keep featured items
    'recent': 'medium',       // Keep recent items
    'cold': 'low'            // Evict cold items first
  },
  compressionThreshold: 10 * 1024 // Compress items > 10KB
});

// Monitor memory usage
cacheManager.on('memory_pressure', (usage) => {
  console.log(`Memory pressure detected: ${usage}%`);
  // Trigger aggressive cleanup
  cacheManager.cleanup({ aggressive: true });
});
```

### 3. Search Performance Issues

**Problem**: Registry searches are too slow
```
Warning: Search query took 5.2s, consider optimization
```

**Solution**: Implement search optimization and indexing
```typescript
// Optimize search with proper indexing
const searchOptimizer = new RegistrySearchOptimizer({
  enableFullTextIndex: true,
  enableTagIndex: true,
  enableCategoryIndex: true,
  enableAuthorIndex: true,
  maxSearchTime: 1000,       // 1 second timeout
  useApproximateResults: true // Allow approximate for speed
});

// Implement search caching
const searchCache = new SearchCache({
  maxCacheSize: 1000,        // Cache 1000 searches
  ttl: 300000,              // 5 minute cache
  keyStrategy: 'hash'        // Hash search parameters
});

// Pre-warm popular searches
await searchCache.preWarm([
  { query: 'defi', category: 'finance' },
  { tags: ['swap'] },
  { featured: true }
]);
```

### 4. Registry Topic Message Ordering

**Problem**: Registry messages processed out of order
```
Error: Operation sequence mismatch, expected 156 but got 158
```

**Solution**: Implement proper message ordering and gap handling
```typescript
// Handle message ordering issues
class RegistryMessageProcessor {
  private messageBuffer = new Map<number, any>();
  private expectedSequence = 0;

  async processMessage(message: any, sequence: number) {
    if (sequence === this.expectedSequence) {
      // Process immediately
      await this.handleMessage(message);
      this.expectedSequence++;
      
      // Process any buffered messages
      while (this.messageBuffer.has(this.expectedSequence)) {
        const bufferedMessage = this.messageBuffer.get(this.expectedSequence);
        await this.handleMessage(bufferedMessage);
        this.messageBuffer.delete(this.expectedSequence);
        this.expectedSequence++;
      }
    } else if (sequence > this.expectedSequence) {
      // Buffer future message
      this.messageBuffer.set(sequence, message);
      
      // Check for gaps after timeout
      setTimeout(() => this.checkForGaps(), 5000);
    } else {
      // Ignore old message
      console.warn(`Ignoring old message: ${sequence} < ${this.expectedSequence}`);
    }
  }

  private async checkForGaps() {
    if (this.messageBuffer.size > 0) {
      console.warn('Message gaps detected, requesting missing messages');
      // Request missing messages from mirror node
    }
  }
}
```

### 5. Registry Migration Issues

**Problem**: Registry format changes breaking compatibility
```
Error: Unknown registry message format version 1.3
```

**Solution**: Implement proper version handling and migration
```typescript
// Registry version compatibility
class RegistryVersionHandler {
  private readonly supportedVersions = ['1.0', '1.1', '1.2', '1.3'];
  private readonly migrators = new Map();

  constructor() {
    this.migrators.set('1.0->1.1', this.migrateV10ToV11);
    this.migrators.set('1.1->1.2', this.migrateV11ToV12);
    this.migrators.set('1.2->1.3', this.migrateV12ToV13);
  }

  async processMessage(message: any) {
    const version = message.version || '1.0';
    
    if (!this.supportedVersions.includes(version)) {
      throw new Error(`Unsupported registry version: ${version}`);
    }

    // Migrate if necessary
    let processedMessage = message;
    let currentVersion = version;
    
    while (currentVersion !== '1.3') {
      const migrator = this.migrators.get(`${currentVersion}->1.3`);
      if (migrator) {
        processedMessage = migrator(processedMessage);
        break;
      }
      
      // Step-by-step migration
      const nextVersion = this.getNextVersion(currentVersion);
      const stepMigrator = this.migrators.get(`${currentVersion}->${nextVersion}`);
      if (stepMigrator) {
        processedMessage = stepMigrator(processedMessage);
        currentVersion = nextVersion;
      } else {
        break;
      }
    }

    return processedMessage;
  }
}
```

This comprehensive registry documentation provides developers with everything they need to effectively use and manage the HCS-12 registry system.