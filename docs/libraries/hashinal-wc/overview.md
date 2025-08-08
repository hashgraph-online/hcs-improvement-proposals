---
title: Overview
sidebar_position: 1
description: Powerful abstraction layer for Hedera Wallet Connect
pagination_prev: null
pagination_next: libraries/hashinal-wc/installation
---

# Hashinal Wallet Connect SDK

## Introduction

Hashinal Wallet Connect SDK is a powerful abstraction layer for Hedera Wallet Connect that simplifies wallet integration for Hedera applications. Whether you're building inscribed HTML Hashinals using HCS-3 or modern JavaScript applications, this SDK provides a unified interface for all Hedera operations.

### Key Benefits

- 🚀 **Simple Integration**: One SDK for both inscribed HTML files (UMD) and modern frameworks (ESM)
- 🔐 **Secure Wallet Connection**: Built on WalletConnect v2 protocol for secure communication
- 📦 **Comprehensive Features**: Full suite of Hedera operations from transfers to smart contracts
- 🎯 **Developer Friendly**: Consistent API with clear examples for every method
- 🔄 **Auto-versioning**: Inscribed versions automatically updated via HCS topics

## Architecture

The SDK architecture provides two deployment models to suit different application needs:

```mermaid
graph TB
    subgraph "Application Layer"
        HTML[Inscribed HTML<br/>Hashinals]
        React[React/Next.js<br/>Applications]
        Vue[Vue/Nuxt<br/>Applications]
        Other[Other JS<br/>Frameworks]
    end

    subgraph "Abstraction Layer"
        UMD[UMD Build<br/>window.HashinalsWalletConnectSDK]
        ESM[ESM Build<br/>@hashgraphonline/hashinal-wc]
    end

    subgraph "SDK Layer"
        HWC[Hedera Wallet Connect<br/>@hashgraph/hedera-wallet-connect]
    end

    subgraph "Protocol Layer"
        WC[WalletConnect v2<br/>Protocol]
        HCS[Hedera Consensus<br/>Service]
    end

    subgraph "Wallet Layer"
        HashPack[HashPack]
        Blade[Blade Wallet]
        Kabila[Kabila]
        OtherWallets[Other Wallets]
    end

    HTML --> UMD
    React --> ESM
    Vue --> ESM
    Other --> ESM

    UMD --> HWC
    ESM --> HWC
    UMD --> HCS

    HWC --> WC
    WC --> HashPack
    WC --> Blade
    WC --> Kabila
    WC --> OtherWallets

    classDef app fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef abstraction fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef sdk fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    classDef protocol fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef wallet fill:#fce4ec,stroke:#880e4f,stroke-width:2px

    class HTML,React,Vue,Other app
    class UMD,ESM abstraction
    class HWC sdk
    class WC,HCS protocol
    class HashPack,Blade,Kabila,OtherWallets wallet
```

## Quick Start

The SDK provides two integration paths depending on your application type. Both use the same underlying functionality with consistent APIs.

### For Inscribed HTML (Hashinals)

Use the UMD build for inscribed HTML applications on Hedera:

```html
<!-- Include the SDK via HCS -->
<script data-src="hcs://1/0.0.8084872" data-script-id="wallet-connect"></script>

<script>
// Initialize and connect
async function connectWallet() {
  const projectId = 'YOUR_PROJECT_ID';
  const metadata = {
    name: 'My Hashinal',
    description: 'Inscribed application on Hedera',
    url: window.location.href,
    icons: ['https://example.com/icon.png']
  };
  
  await window.HashinalsWalletConnectSDK.init(projectId, metadata);
  const session = await window.HashinalsWalletConnectSDK.connect();
  console.log('Connected:', session);
}
</script>
```

### For Modern JavaScript Applications

Use the ESM package for React, Next.js, Vue, or any modern framework:

```typescript
import { HashinalsWalletConnectSDK } from '@hashgraphonline/hashinal-wc';
import { LedgerId } from '@hashgraph/sdk';

const sdk = HashinalsWalletConnectSDK.getInstance();

// Initialize with network selection
await sdk.init(
  'YOUR_PROJECT_ID',
  {
    name: 'My dApp',
    description: 'Modern Hedera application',
    url: 'https://myapp.com',
    icons: ['https://myapp.com/icon.png']
  },
  LedgerId.MAINNET
);

// Connect wallet
const session = await sdk.connect();
```

## Core Features

### Wallet Operations

| Feature | Description | Use Case |
|---------|-------------|----------|
| **Connect/Disconnect** | Establish and manage wallet connections | User authentication |
| **Account Info** | Retrieve account details and balances | Display user data |
| **HBAR Transfers** | Send HBAR between accounts | Payments, tips |
| **Token Operations** | Transfer, associate, dissociate tokens | DeFi, gaming |

### Topic & Messaging

| Feature | Description | Use Case |
|---------|-------------|----------|
| **Create Topics** | Create new HCS topics with optional keys | Decentralized messaging |
| **Submit Messages** | Write messages to HCS topics | Data storage, communication |
| **Retrieve Messages** | Read messages from topics | Data retrieval, verification |

### NFT & Token Management

| Feature | Description | Use Case |
|---------|-------------|----------|
| **Create Tokens** | Deploy new fungible or non-fungible tokens | Token launches |
| **Mint NFTs** | Mint NFTs with metadata | Digital collectibles |
| **NFT Validation** | Verify NFT ownership | Access control, gating |
| **Token Queries** | Get account tokens and NFTs | Portfolio display |

### Smart Contract Integration

| Feature | Description | Use Case |
|---------|-------------|----------|
| **Execute Contracts** | Call smart contract functions | DeFi protocols |
| **Read Contracts** | Query contract state without gas | Data fetching |
| **Contract Parameters** | Build complex function parameters | Advanced interactions |

## Supported Wallets

The SDK supports all WalletConnect-compatible Hedera wallets:

- **HashPack** - Most popular Hedera wallet
- **Blade Wallet** - Gaming-focused wallet
- **Kabila** - Mobile-first wallet
- **Other WalletConnect v2 compatible wallets**

## Network Support

The SDK supports all Hedera networks:

| Network | LedgerId | Use Case |
|---------|----------|----------|
| **Mainnet** | `LedgerId.MAINNET` | Production applications |
| **Testnet** | `LedgerId.TESTNET` | Development and testing |
| **Previewnet** | `LedgerId.PREVIEWNET` | Preview features |

## Next Steps

- [Installation Guide](./installation) - Set up the SDK for your project
- [API Methods](./methods) - Complete method documentation
- [React Integration](./usage-with-react) - Build React apps with wallet connectivity
- [Next.js Integration](./usage-with-nextjs) - Server-side rendering with wallets
- [Vite Integration](./usage-with-vite) - Fast development with Vite
- [Hashinals Guide](./usage-with-recursion) - Build inscribed HTML applications
- [HCS Topics](./topics) - Work with Hedera Consensus Service