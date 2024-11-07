---
sidebar_position: 1
---

# Installation

**Hashinal Wallet Connect** is an abstraction layer for Hedera Wallet Connect. It simplifies the process of connecting to a Hedera wallet and performing basic operations for inscribed HTML Hashinals utilizing HCS-3 and more traditional tooling built with NextJS, Nuxt, Vite, Webpack, etc.

If you're looking for more information on Hedera Wallet Connect, see the [Hedera Wallet Connect documentation](https://hwc-docs.hgraph.app/).

## Table of Contents

- [Installation](#installation)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation-1)
    - [Using npm](#using-npm)
    - [Using yarn](#using-yarn)

## Prerequisites

Before integrating Hashinals Wallet Connect:

- **Node.js**: Version 18.0 or above. Use NVM to manage Node.js versions. [Install NVM](https://github.com/nvm-sh/nvm#installing-and-updating) and then run the following commands:
  ```bash
  nvm install 18
  nvm use 18
  ```
- **Package Manager**: npm or yarn. After installing Node.js, npm is included by default. To install Yarn, run:
  ```bash
  npm install --global yarn
  ```
- **WalletConnect Cloud Project ID**: Required for establishing connections between your dApp and wallets.
  1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com)
  2. Sign in or create a new account
  3. Click "Create New Project"
  4. Name your project and click "Create"
  5. Copy the "Project ID" from the project dashboard

## Installation

Install the Hashinals Wallet Connect package using npm or yarn. Note, you will also need to install the Hedera SDK and other peer dependencies.

### Using npm

```bash
npm install @hashgraph-online/hashinal-wc @hashgraph/sdk @hashgraph/proto @hashgraph/hedera-wallet-connect @walletconnect/modal @walletconnect/qrcode-modal @walletconnect/utils  @walletconnect/modal-core
```

### Using yarn

```bash
yarn add @hashgraph-online/hashinal-wc @hashgraph/sdk @hashgraph/proto @hashgraph/hedera-wallet-connect @walletconnect/modal @walletconnect/qrcode-modal @walletconnect/utils  @walletconnect/modal-core
```
