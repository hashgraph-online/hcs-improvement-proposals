---
description: HCS-3 is a protocol standard that enables developers to reference and load on-graph resources directly from the Hedera network.
sidebar_position: 1
---
# What is HCS-3?

HCS-3 is a protocol standard that enables developers to reference and load on-graph resources directly from the Hedera network. Think of it as a decentralized CDN where all your application resources live on the Hashgraph, with the unique ability to reuse resources across multiple applications.

Learn more about HCS-3 in the [HCS-3 Standard](../../hcs-3.md).

## Why Use HCS-3?

### 1. True Decentralization
Instead of relying on traditional CDNs or centralized servers, your application's resources are stored directly on the Hashgraph, through the Consensus Service:
```html
<!-- Traditional CDN -->
<script src="https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js"></script>

<!-- HCS-3 Decentralized Loading -->
<script data-src="hcs://1/0.0.6614307" data-script-id="threejs"></script>
```

### 2. Cost Efficiency
Inscribe once, use everywhere:
- Traditional: Each dApp inscribes ThreeJS (~500KB) = 500KB × number of dApps
- HCS-3: One inscription shared across all dApps = 500KB total

### 3. Version Control
Each resource has a unique topic ID, making version management straightforward and immutable.

### 4. Built-in CDN Support
While resources live on-graph, HCS-3 supports CDN integration for faster loading while maintaining decentralization benefits.

## Shared Resource Pool

Common libraries already inscribed and available for use:
- ThreeJS: `0.0.6614307`
- AnimeJS: `0.0.6627067`
- NES.css: `0.0.6633438`

## Hashgraph Package Manager (HPM)

We're working on creating Hashgraph Package Manager (HPM) to make it easier to discover, install, and publish HCS-3 resources. Keep your eyes peeled for updates!

## Conclusion

HCS-3 represents a paradigm shift in web3 development by combining true decentralization with cost efficiency. By enabling once-and-done inscriptions that can be reused across the entire ecosystem, it dramatically reduces costs while ensuring resource permanence and integrity. This approach not only makes development more cost-effective but also creates a more sustainable and efficient hashgraph ecosystem.

For detailed implementation examples and usage guidelines, please refer to our [Usage Guide](usage.md).