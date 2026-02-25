---
title: Setup Your Environment
description: Set up your development environment to work with HCS standards
sidebar_position: 1
---


# Setup Your Environment

## Summary

This tutorial walks you through setting up your development environment to work with HCS standards, including installing the Standards SDK and creating a Hedera testnet account with 1000 HBAR.

***

## Prerequisites

Before you begin, ensure you have the following installed:

1. [Node.js](https://nodejs.org/) (v20 or higher recommended)
2. Package manager (npm, pnpm, or yarn)
3. Git (optional, for cloning examples)

***

## 1. Install the Standards SDK

The Standards SDK provides all the tools you need to work with HCS standards.

```bash
# Using npm
npm install @hashgraphonline/standards-sdk

# Using pnpm
pnpm add @hashgraphonline/standards-sdk

# Using yarn
yarn add @hashgraphonline/standards-sdk
```

***

## 2. Create a Hedera Testnet Account

You'll need a Hedera testnet account to interact with the network.

### Option A: Using Hedera Portal (Recommended)

1. Visit [Hedera Portal](https://portal.hedera.com)
2. Sign up for a free account
3. Click **CREATE ACCOUNT** to generate a testnet account
4. Your account will receive **1000 HBAR** automatically
5. Save your account ID and private key securely

### Option B: Using HashPack Wallet

1. Install [HashPack](https://www.hashpack.app) browser extension
2. Create a new wallet
3. Switch to Testnet network
4. Create a testnet account through the wallet
5. Fund your account from the testnet faucet

***

## 3. Configure Environment Variables

Create a `.env` file in your project root:

```bash
# Hedera Account Credentials
HEDERA_ACCOUNT_ID=0.0.YOUR_ACCOUNT_ID
HEDERA_PRIVATE_KEY=YOUR_PRIVATE_KEY
HEDERA_NETWORK=testnet

# Optional: Hashgraph Explorer API Key (for enhanced features)
API_KEY=YOUR_API_KEY
```

::::warning Security Note
Never commit your `.env` file to version control. Add it to your `.gitignore` file.
::::

***

## 4. Test Your Setup

Create a simple test file to verify your configuration:

```javascript
// test-setup.js
import { Client, AccountBalanceQuery } from "@hashgraph/sdk";
import * as dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  // Create client
  const client = Client.forTestnet();
  client.setOperator(
    process.env.HEDERA_ACCOUNT_ID,
    process.env.HEDERA_PRIVATE_KEY
  );

  try {
    // Query account balance
    const balance = await new AccountBalanceQuery()
      .setAccountId(process.env.HEDERA_ACCOUNT_ID)
      .execute(client);

    console.log("✅ Connection successful!");
    console.log(`Account Balance: ${balance.hbars.toString()}`);
  } catch (error) {
    console.error("❌ Connection failed:", error);
  }
}

testConnection();
```

Run the test:
```bash
node test-setup.js
```

***

## 5. Explore the SDK

The Standards SDK provides implementations for various HCS standards:

```javascript
import { 
  inscribe,           // HCS-1 & HCS-5: Inscriptions
  HCS2Client,         // HCS-2: Topic Registries
  HCS10Client,        // HCS-10: OpenConvAI Agents
  HCS20Client         // HCS-20: Auditable Points
} from '@hashgraphonline/standards-sdk';
```

***

## Next Steps

Now that your environment is set up, continue with:

➡ [Submit Your First HCS Message](./submit-your-first-hcs-message.md) - Learn the basics of HCS

➡ [Inscribe Your First File](../inscriptions/inscribe-your-first-file.md) - Create permanent on-chain storage

***

## Troubleshooting

<details>
<summary><b>Invalid account ID or private key</b></summary>

- Ensure your credentials are correctly formatted
- Account ID format: `0.0.12345`
- Private key should be a hex string or DER-encoded
- Check for extra spaces or quotes in your `.env` file

</details>

<details>
<summary><b>Insufficient balance</b></summary>

- Testnet accounts start with 1000 HBAR
- Some operations require small fees (< 1 HBAR)
- Request more testnet HBAR from the [faucet](https://portal.hedera.com)

</details>

<details>
<summary><b>Network timeout</b></summary>

- Check your internet connection
- Verify you're using the correct network (testnet/mainnet)
- Try again in a few seconds
- Consider using a different RPC endpoint

</details>

***

## Additional Resources

- [HCS Standards Documentation](../../../standards)
- [Standards SDK GitHub](https://github.com/hashgraph-online/standards-sdk)
- [Community Discord](https://discord.gg/hashgraph)
- [Hedera Documentation](https://docs.hedera.com)

