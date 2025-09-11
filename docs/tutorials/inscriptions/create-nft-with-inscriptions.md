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

## Step 1: Inscribe the NFT Image

First, inscribe your NFT artwork to HCS:

```javascript
// inscribe-nft-image.js
import { inscribe } from '@hashgraph-online/standards-sdk';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

async function inscribeNFTImage() {
  const clientConfig = {
    accountId: process.env.HEDERA_ACCOUNT_ID,
    privateKey: process.env.HEDERA_PRIVATE_KEY,
    network: 'testnet'
  };

  // Read your NFT image
  const imageBuffer = fs.readFileSync('./nft-artwork.png');
  
  console.log("🎨 Inscribing NFT artwork...");

  const imageInscription = await inscribe(
    {
      type: 'buffer',
      buffer: imageBuffer,
      fileName: 'nft-artwork.png',
      mimeType: 'image/png'
    },
    clientConfig,
    {
      waitForConfirmation: true,
      progressCallback: (data) => {
        console.log(`Progress: ${data.percentage}%`);
      }
    }
  );

  const imageHRL = `hcs://1/${imageInscription.result.topicId}`;
  console.log(`✅ Image inscribed: ${imageHRL}`);
  console.log(`Transaction ID: ${imageInscription.result.transactionId}`);
  
  // Save transaction ID for later retrieval
  fs.writeFileSync('image-tx-id.txt', imageInscription.result.transactionId);
  
  return { imageHRL, transactionId: imageInscription.result.transactionId };
}
```

## Step 2: Create NFT Metadata

Create metadata following HIP-412 standard with HCS references:

```javascript
// create-nft-metadata.js
async function createNFTMetadata(imageHRL) {
  const metadata = {
    name: "Hashinal #001",
    creator: "Artist Name",
    description: "First fully on-chain NFT using Hashinals",
    image: imageHRL,  // HCS reference to image
    type: "image/png",
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

  return metadata;
}
```

## Step 3: Inscribe the Metadata

```javascript
// inscribe-metadata.js
async function inscribeMetadata(metadata, clientConfig) {
  console.log("📋 Inscribing NFT metadata...");

  const metadataInscription = await inscribe(
    {
      type: 'buffer',
      buffer: Buffer.from(JSON.stringify(metadata, null, 2)),
      fileName: 'metadata.json',
      mimeType: 'application/json'
    },
    clientConfig,
    {
      waitForConfirmation: true
    }
  );

  const metadataHRL = `hcs://1/${metadataInscription.result.topicId}`;
  console.log(`✅ Metadata inscribed: ${metadataHRL}`);
  console.log(`Transaction ID: ${metadataInscription.result.transactionId}`);
  
  // Save transaction ID for later retrieval
  fs.writeFileSync('metadata-tx-id.txt', metadataInscription.result.transactionId);
  
  return { metadataHRL, transactionId: metadataInscription.result.transactionId };
}
```

## Step 4: Create the NFT Token

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

async function createHashinalNFT(metadataHRL) {
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
```

## Step 5: Complete Hashinal Creation Flow

Put it all together:

```javascript
// create-complete-hashinal.js
import { inscribe } from '@hashgraph-online/standards-sdk';
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
    // 1. Inscribe the image
    console.log("Step 1: Inscribing artwork...");
    const imageBuffer = fs.readFileSync('./nft-artwork.png');
    
    const imageResult = await inscribe(
      {
        type: 'buffer',
        buffer: imageBuffer,
        fileName: 'artwork.png',
        mimeType: 'image/png'
      },
      clientConfig,
      { waitForConfirmation: true }
    );
    
    const imageHRL = `hcs://1/${imageResult.result.topicId}`;
    const imageTransactionId = imageResult.result.transactionId;
    console.log(`Image HRL: ${imageHRL}`);
    console.log(`Image Transaction ID: ${imageTransactionId}`);

    // 2. Create metadata with image HRL
    console.log("\nStep 2: Creating metadata...");
    const metadata = {
      name: "Hashinal #001",
      creator: "Demo Artist",
      description: "Fully on-chain NFT demonstration",
      image: imageHRL,
      type: "image/png",
      attributes: [
        { trait_type: "Type", value: "Hashinal" },
        { trait_type: "Standard", value: "HCS-5" }
      ]
    };

    // 3. Inscribe metadata
    console.log("\nStep 3: Inscribing metadata...");
    const metadataResult = await inscribe(
      {
        type: 'buffer',
        buffer: Buffer.from(JSON.stringify(metadata, null, 2)),
        fileName: 'metadata.json',
        mimeType: 'application/json'
      },
      clientConfig,
      { waitForConfirmation: true }
    );
    
    const metadataHRL = `hcs://1/${metadataResult.result.topicId}`;
    const metadataTransactionId = metadataResult.result.transactionId;
    console.log(`Metadata HRL: ${metadataHRL}`);
    console.log(`Metadata Transaction ID: ${metadataTransactionId}`);

    // 4. Create NFT with metadata HRL
    console.log("\nStep 4: Creating NFT...");
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

## Viewing Your Hashinal

### Retrieve and Display

```javascript
// view-hashinal.js
import { retrieveInscription } from '@hashgraph-online/standards-sdk';
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

## Next Steps

- [Update Dynamic NFT](./update-dynamic-nft.md) - Create evolving NFTs
- [HCS-5 Standard](../../standards/hcs-5.md) - Deep dive into Hashinals
- [HCS-6 Standard](../../standards/hcs-6.md) - Dynamic NFTs

## Troubleshooting

<details>
<summary><b>Invalid metadata format</b></summary>

- Follow HIP-412 standard strictly
- Ensure image field uses HRL format (e.g., `hcs://1/0.0.123456`)
- Validate JSON structure before inscribing
- Required fields: `name`, `image`, `type`
- Check for trailing commas in JSON

</details>

<details>
<summary><b>Inscription not found</b></summary>

- Wait for consensus (3-5 seconds minimum)
- Verify correct topic ID format (`0.0.123456`)
- Check you're using the same network for inscribing and retrieving
- Ensure the inscription transaction was successful
- Try querying with a delay or retry mechanism

</details>

<details>
<summary><b>Minting failed</b></summary>

- Ensure supply key is set on the token
- Check HBAR balance for minting fees
- Verify token exists and is not deleted
- Confirm you have the correct supply key
- Check token max supply hasn't been reached

</details>

<details>
<summary><b>Image inscription too large</b></summary>

- Optimize images before inscribing (resize, compress)
- Recommended max size: 100KB for cost efficiency
- Use PNG or JPEG compression
- Consider using lower resolution for previews
- Large images can timeout during inscription

</details>

<details>
<summary><b>Metadata doesn't match image</b></summary>

- Ensure metadata `image` field points to correct HRL
- Verify the image inscription completed successfully
- Check the image topic ID matches the metadata reference
- Wait for both inscriptions to reach consensus

</details>

<details>
<summary><b>NFT not showing in wallets</b></summary>

- Ensure metadata follows HIP-412 standard exactly
- Some wallets cache metadata - wait 5-10 minutes
- Verify the NFT was minted to the correct account
- Check token association is complete
- Try refreshing or reimporting the wallet

</details>

## Resources

- [HCS-5 Hashinals Standard](../../standards/hcs-5.md)
- [HIP-412 Metadata Standard](https://hips.hedera.com/hip/hip-412)
- [Hashinal Explorer](https://hashinals.com)