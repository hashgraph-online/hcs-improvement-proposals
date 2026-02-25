---
title: Create NFT with Inscriptions
description: Learn how to create NFTs with fully on-chain metadata using HCS-5 Hashinals
sidebar_position: 2
---

# Create NFT with Inscriptions

Create NFTs where both the image and metadata are stored entirely on Hedera using the HCS-5 Hashinals standard.

## What are Hashinals?

Hashinals are NFTs that store their complete data on-chain using HCS inscriptions, eliminating dependency on external storage like IPFS or Arweave.

### Benefits of Hashinals

- **True Ownership**: All data lives on Hedera forever
- **No External Dependencies**: No IPFS pins to maintain
- **Immutable**: Content cannot be changed or deleted
- **Verifiable**: Cryptographic proof of authenticity

## Prerequisites

- [Environment setup](../getting-started/setup-environment.md) completed
- [Basic inscription knowledge](./inscribe-your-first-file.md)
- Hedera testnet account with HBAR

## Step 1: Inscribe NFT with Image and Metadata

Using the `hashinal` mode, you can inscribe both the image and metadata in a single operation:

```javascript
// inscribe-nft.js
import { inscribe } from '@hashgraphonline/standards-sdk';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

async function inscribeNFT() {
  const clientConfig = {
    accountId: process.env.HEDERA_ACCOUNT_ID,
    privateKey: process.env.HEDERA_PRIVATE_KEY,
    network: 'testnet'
  };

  // Read your NFT image
  const imageBuffer = fs.readFileSync('./nft-artwork.png');
  
  // Define metadata that will be inscribed alongside the image
  const metadata = {
    name: "Hashinal #001",
    creator: "Artist Name",
    description: "First fully on-chain NFT using Hashinals",
    attributes: [
      {
        trait_type: "Background",
        value: "Blue"
      },
      {
        trait_type: "Rarity",
        value: "Legendary"
      },
      {
        trait_type: "Inscription Number",
        value: "1"
      }
    ],
    properties: {
      category: "art",
      collection: "Genesis Hashinals"
    }
  };
  
  console.log("🎨 Inscribing NFT artwork with metadata...");

  // Single inscription for both image AND metadata
  const nftInscription = await inscribe(
    {
      type: 'buffer',
      buffer: imageBuffer,
      fileName: 'nft-artwork.png',
      mimeType: 'image/png'
    },
    clientConfig,
    {
      mode: 'hashinal',  // This mode handles both image and metadata
      metadata: metadata, // Metadata is inscribed alongside the image
      waitForConfirmation: true,
      progressCallback: (data) => {
        console.log(`Progress: ${data.progressPercent}%`);
      }
    }
  );

  const imageHRL = `hcs://1/${nftInscription.inscription.topic_id}`;
  const metadataHRL = `hcs://1/${nftInscription.inscription.jsonTopicId}`;
  
  console.log(`✅ NFT inscribed successfully!`);
  console.log(`📍 Image Topic ID: ${nftInscription.inscription.topic_id}`);
  console.log(`📍 Metadata Topic ID: ${nftInscription.inscription.jsonTopicId}`);
  console.log(`Transaction ID: ${nftInscription.result.transactionId}`);
  
  // Save transaction IDs for later retrieval
  fs.writeFileSync('image-tx-id.txt', nftInscription.result.transactionId);
  fs.writeFileSync('metadata-tx-id.txt', nftInscription.inscription.jsonTopicId);
  
  return { 
    imageHRL, 
    metadataHRL,
    transactionId: nftInscription.result.transactionId 
  };
}

inscribeNFT();
```

## Step 2: Create the NFT Token

Create an NFT collection and mint with the inscribed metadata:

```javascript
// create-hashinal-nft.js
import {
  Client,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  TokenMintTransaction,
  PrivateKey
} from "@hashgraph/sdk";

async function createHashinalNFT() {
  // First inscribe the NFT
  const { metadataHRL } = await inscribeNFT();
  
  const client = Client.forTestnet();
  client.setOperator(
    process.env.HEDERA_ACCOUNT_ID,
    process.env.HEDERA_PRIVATE_KEY
  );

  const supplyKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY);

  // Create NFT collection
  console.log("🎨 Creating NFT collection...");
  
  const nftCreate = await new TokenCreateTransaction()
    .setTokenName("Hashinals Collection")
    .setTokenSymbol("HASH")
    .setTokenType(TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setMaxSupply(10000)
    .setSupplyType(TokenSupplyType.Finite)
    .setSupplyKey(supplyKey)
    .execute(client);

  const nftCreateReceipt = await nftCreate.getReceipt(client);
  const tokenId = nftCreateReceipt.tokenId;
  console.log(`✅ Collection created: ${tokenId}`);

  // Mint NFT with inscribed metadata
  console.log("🪙 Minting Hashinal NFT...");
  
  const mintTx = await new TokenMintTransaction()
    .setTokenId(tokenId)
    .setMetadata([Buffer.from(metadataHRL)]) // HRL as metadata
    .execute(client);

  const mintReceipt = await mintTx.getReceipt(client);
  const serialNumber = mintReceipt.serials[0];
  
  console.log(`✅ Hashinal minted!`);
  console.log(`   Token ID: ${tokenId}`);
  console.log(`   Serial #: ${serialNumber}`);
  console.log(`   Metadata: ${metadataHRL}`);
  
  return { tokenId, serialNumber, metadataHRL };
}

createHashinalNFT();
```

## Step 3: Complete Hashinal Creation Flow

Put it all together:

```javascript
// create-complete-hashinal.js
import { inscribe } from '@hashgraphonline/standards-sdk';
import {
  Client,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  TokenMintTransaction,
  PrivateKey
} from "@hashgraph/sdk";
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

async function createCompleteHashinal() {
  const clientConfig = {
    accountId: process.env.HEDERA_ACCOUNT_ID,
    privateKey: process.env.HEDERA_PRIVATE_KEY,
    network: 'testnet'
  };

  try {
    // 1. Inscribe NFT with image and metadata together
    console.log("Step 1: Inscribing NFT artwork with metadata...");
    const imageBuffer = fs.readFileSync('./nft-artwork.png');
    
    const metadata = {
      name: "Hashinal #001",
      creator: "Demo Artist",
      description: "Fully on-chain NFT demonstration",
      attributes: [
        { trait_type: "Type", value: "Hashinal" },
        { trait_type: "Standard", value: "HCS-5" }
      ]
    };
    
    const nftResult = await inscribe(
      {
        type: 'buffer',
        buffer: imageBuffer,
        fileName: 'artwork.png',
        mimeType: 'image/png'
      },
      clientConfig,
      { 
        mode: 'hashinal',
        metadata: metadata,
        waitForConfirmation: true 
      }
    );
    
    const imageHRL = `hcs://1/${nftResult.inscription.topic_id}`;
    const metadataHRL = `hcs://1/${nftResult.inscription.jsonTopicId}`;
    const imageTransactionId = nftResult.result.transactionId;
    const metadataTransactionId = nftResult.inscription.jsonTopicId;
    
    console.log(`Image HRL: ${imageHRL}`);
    console.log(`Metadata HRL: ${metadataHRL}`);
    console.log(`Transaction ID: ${imageTransactionId}`);

    // 2. Create NFT with metadata HRL
    console.log("\nStep 2: Creating NFT...");
    const client = Client.forTestnet();
    client.setOperator(
      process.env.HEDERA_ACCOUNT_ID,
      process.env.HEDERA_PRIVATE_KEY
    );

    const supplyKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY);

    // Create token
    const tokenTx = await new TokenCreateTransaction()
      .setTokenName("Demo Hashinals")
      .setTokenSymbol("DHASH")
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setInitialSupply(0)
      .setSupplyKey(supplyKey)
      .execute(client);

    const tokenReceipt = await tokenTx.getReceipt(client);
    const tokenId = tokenReceipt.tokenId;

    // Mint with metadata HRL
    const mintTx = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata([Buffer.from(metadataHRL)])
      .execute(client);

    const mintReceipt = await mintTx.getReceipt(client);
    
    console.log("\n🎉 Hashinal Created Successfully!");
    console.log("================================");
    console.log(`Token ID: ${tokenId}`);
    console.log(`Serial Number: ${mintReceipt.serials[0]}`);
    console.log(`Metadata HRL: ${metadataHRL}`);
    console.log(`Image HRL: ${imageHRL}`);
    console.log(`View on HashScan: https://hashscan.io/testnet/token/${tokenId}`);

    // Save result for reference
    const result = {
      tokenId: tokenId.toString(),
      serialNumber: mintReceipt.serials[0].toString(),
      metadataHRL,
      imageHRL,
      metadataTransactionId,
      imageTransactionId,
      timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync('hashinal-result.json', JSON.stringify(result, null, 2));
    console.log("\nResult saved to hashinal-result.json");

  } catch (error) {
    console.error("Error creating Hashinal:", error);
  }
}

createCompleteHashinal();
```

## Viewing Your Hashinal on HashScan

After creating your Hashinal NFT, you can verify that everything is stored on-chain using HashScan, Hedera's blockchain explorer.

### Step 1: View Your NFT Collection

Once your NFT is minted, navigate to your token on HashScan:

```
https://hashscan.io/testnet/token/{tokenId}
```

Replace `{tokenId}` with your actual token ID (e.g., `0.0.123456`).

On this page, you'll see:
- **Token Name & Symbol**: Your collection details
- **Token Type**: Should show as "NON_FUNGIBLE_UNIQUE"
- **Total Supply**: Number of NFTs minted
- **Created Timestamp**: When the collection was created

### Step 2: View Individual NFT Details

1. Click on the **"NFT Info"** tab on the token page
2. You'll see a list of all minted NFTs with their serial numbers
3. Click on a specific **serial number** to view that NFT's details

### Step 3: Find Your Inscribed Data

On the NFT detail page, look for the **metadata field**. You'll see something like:

```
hcs://1/0.0.999999
```

This is your Hashinal Reference Locator (HRL) that points to your inscribed data. The format breaks down as:
- `hcs://` - Protocol identifier
- `1` - HCS topic version
- `0.0.999999` - The topic ID where your data is inscribed

### Step 4: View the Actual Inscribed Files

To see your inscribed image and metadata on-chain:

1. Extract the topic ID from the HRL (e.g., `0.0.999999`)
2. Navigate to the topic page:
   ```
   https://hashscan.io/testnet/topic/{topicId}
   ```

3. On the topic page, you'll see **all the messages** containing your inscribed data:
   - **Image messages**: Your NFT artwork split into chunks
   - **Metadata message**: Your NFT's JSON metadata

4. Click on any message to view:
   - The raw data content
   - Transaction ID
   - Consensus timestamp
   - Proof of permanent storage on Hedera

### Step 5: Verify Everything is On-Chain

Use this checklist to confirm your Hashinal is fully on-chain:

| Component | Where to Find | What to Look For |
|-----------|--------------|-------------------|
| **NFT Token** | `hashscan.io/testnet/token/{tokenId}` | Token exists with correct name/symbol |
| **NFT Serial** | Token page → NFT Info tab | Your NFT's serial number |
| **Metadata HRL** | NFT detail page → Metadata field | `hcs://1/{topicId}` format |
| **Image Data** | `hashscan.io/testnet/topic/{topicId}` | Multiple messages with image chunks |
| **Metadata JSON** | Same topic page | Message with your NFT metadata |

### Understanding the Data Structure

When viewing your topic messages, you'll notice:

1. **Image inscription**: Usually multiple messages containing base64-encoded chunks of your image
2. **Metadata inscription**: A single message with JSON containing:
   - NFT name and description
   - Attributes and properties
   - Reference to the image HRL

### Quick Links Generator

Save these URLs for easy access (replace with your actual IDs):

```javascript
const tokenId = "0.0.123456";     // Your token ID
const topicId = "0.0.999999";     // Your topic ID from HRL
const serialNum = "1";             // Your NFT serial number

console.log("NFT Collection:", `https://hashscan.io/testnet/token/${tokenId}`);
console.log("NFT Details:", `https://hashscan.io/testnet/token/${tokenId}/${serialNum}`);
console.log("Inscribed Data:", `https://hashscan.io/testnet/topic/${topicId}`);
```

### Interactive HashScan Explorer

For a better experience, you can use our interactive components in your applications:

```jsx
import { HashScanViewer } from '@/components/HashScanViewer';
import { HashScanLink } from '@/components/HashScanLink';

// Display all relevant HashScan links for your Hashinal
<HashScanViewer 
  tokenId="0.0.123456"
  topicId="0.0.999999"
  serialNumber="1"
  network="testnet"
/>

// Or create individual links
<HashScanLink 
  type="token" 
  id="0.0.123456" 
  network="testnet"
  variant="primary"
/>
```

These components provide:
- One-click navigation to HashScan pages
- Copy-to-clipboard functionality for IDs
- Visual verification checklist
- Responsive design for all devices

## Programmatic Retrieval

### Retrieve and Display Your Hashinal

```javascript
// view-hashinal.js
import { retrieveInscription } from '@hashgraphonline/standards-sdk';
import * as fs from 'fs';

async function viewHashinal(metadataTransactionId, imageTransactionId) {
  // Retrieve metadata using transaction ID
  const metadataInscription = await retrieveInscription(
    metadataTransactionId, // Use transaction ID, not topic ID
    {
      network: 'testnet'
    }
  );
  
  const metadata = JSON.parse(metadataInscription.content);
  console.log("NFT Metadata:", metadata);
  
  // Retrieve image using transaction ID
  const imageInscription = await retrieveInscription(
    imageTransactionId, // Use transaction ID, not topic ID
    {
      network: 'testnet'
    }
  );
  
  // Save image locally
  fs.writeFileSync('retrieved-nft.png', imageInscription.buffer);
  console.log("Image saved as retrieved-nft.png");
}
```

## Best Practices

### 1. Optimize Image Size

```javascript
// Use image optimization before inscribing
import sharp from 'sharp';

async function optimizeImage(inputPath) {
  const optimized = await sharp(inputPath)
    .resize(500, 500) // Resize to 500x500
    .png({ quality: 80, compressionLevel: 9 })
    .toBuffer();
  
  return optimized;
}
```

### 2. Batch Mint Hashinals

```javascript
async function batchMintHashinals(metadataHRLs, tokenId) {
  const metadataBuffers = metadataHRLs.map(hrl => Buffer.from(hrl));
  
  const mintTx = await new TokenMintTransaction()
    .setTokenId(tokenId)
    .setMetadata(metadataBuffers) // Multiple NFTs at once
    .execute(client);
    
  return mintTx;
}
```

### 3. Validate Inscriptions

```javascript
async function validateHashinal(metadataTransactionId, imageTransactionId) {
  try {
    // Retrieve using transaction ID, not topic ID
    const inscription = await retrieveInscription(metadataTransactionId, {
      network: 'testnet'
    });
    
    const metadata = JSON.parse(inscription.content);
    
    // Validate required fields
    if (!metadata.name || !metadata.image) {
      throw new Error("Invalid metadata structure");
    }
    
    // Validate image inscription using transaction ID
    await retrieveInscription(imageTransactionId, {
      network: 'testnet'
    });
    
    console.log("✅ Hashinal validation passed");
    return true;
  } catch (error) {
    console.error("❌ Validation failed:", error);
    return false;
  }
}
```

## Cost Breakdown

| Operation | Approximate Cost |
|-----------|-----------------|
| Image inscription (100KB) | ~$0.01 |
| Metadata inscription (1KB) | ~$0.0001 |
| Token creation | ~$1.00 |
| NFT minting | ~$0.05 |
| **Total per NFT** | **~$1.06** |

## Advanced Features

### Dynamic Metadata Updates

While inscriptions are immutable, you can use HCS-6 for dynamic NFTs:

```javascript
// Reference updateable metadata
const metadata = {
  name: "Dynamic Hashinal",
  image: imageHRL,
  dynamic_data: "hcs://6/0.0.999999" // Points to updateable content
};
```

### Collection Registry

Register your collection using HCS-2:

```javascript
const registry = {
  collection: "My Hashinals",
  creator: "0.0.123456",
  standards: ["HCS-5"],
  total_supply: 10000,
  mint_date: new Date().toISOString()
};
```


