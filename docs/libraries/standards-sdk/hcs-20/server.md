---
title: Node — HCS‑20Client
description: Deploy and manage points on Hedera using the Node client. Includes deploy, mint, transfer, burn, and indexer usage.
sidebar_position: 2
---

## Installation

```bash
npm install @hashgraphonline/standards-sdk
```

## Basic Setup (Node.js)

```ts
import { HCS20Client } from '@hashgraphonline/standards-sdk';

const client = new HCS20Client({
  network: 'testnet',
  operatorId: '0.0.123456',
  operatorKey: process.env.HEDERA_PRIVATE_KEY!,
  logLevel: 'info',
});
```

## Operations

### 1) Deploy Points

```ts
const deployOptions = {
  name: 'MyRewardPoints',
  tick: 'MRP',
  maxSupply: '1000000',
  limitPerMint: '1000',
  metadata: 'https://my-reward-points.com/meta',
  usePrivateTopic: false,
  progressCallback: d => console.log(`${d.stage}: ${d.percentage}%`),
};

const pointsInfo = await client.deployPoints(deployOptions);
console.log('Points deployed:', pointsInfo);
```

### 2) Mint Points

```ts
const mintOptions = {
  tick: 'MRP',
  amount: '500',
  to: '0.0.98765',
  memo: 'Initial points for new user',
  progressCallback: d => console.log(`${d.stage}: ${d.percentage}%`),
};

const mintTx = await client.mintPoints(mintOptions);
console.log('Mint transaction:', mintTx);
```

### 3) Transfer Points

```ts
const transferOptions = {
  tick: 'MRP',
  amount: '100',
  from: '0.0.12345',
  to: '0.0.98765',
  progressCallback: d => console.log(`${d.stage}: ${d.percentage}%`),
};

const transferTx = await client.transferPoints(transferOptions);
console.log('Transfer transaction:', transferTx);
```

### 4) Burn Points

```ts
const burnOptions = {
  tick: 'MRP',
  amount: '50',
  from: '0.0.98765',
  progressCallback: d => console.log(`${d.stage}: ${d.percentage}%`),
};

const burnTx = await client.burnPoints(burnOptions);
console.log('Burn transaction:', burnTx);
```

## Indexer (Concept)

Use the points indexer to keep a local view of deployed points, balances, and history by processing topic messages.

```ts
// Pseudocode — wire to your persistence
// const indexer = new HCS20PointsIndexer({ mirror: 'testnet', topicId: pointsInfo.topicId });
// await indexer.start();
// indexer.on('balance', b => save(b));
```
