---
title: Inscribe Your First File
description: Learn how to permanently store files on Hedera using HCS inscriptions
sidebar_position: 1
---

# Inscribe Your First File

Store any file permanently on the Hedera network using HCS inscriptions. This tutorial will teach you how to inscribe files using the HCS-1 standard.

## What are Inscriptions?

Inscriptions allow you to store data directly on the Hedera network using HCS topics. Unlike traditional storage methods:

- **Permanent**: Data lives forever on the network
- **Decentralized**: No single point of failure
- **Verifiable**: Cryptographic proof of existence
- **No external dependencies**: No IPFS, Arweave, or centralized servers

## Prerequisites

- [Environment setup](../getting-started/setup-environment.md) completed
- Standards SDK installed
- Hedera testnet account with HBAR

## How Inscriptions Work

The HCS-1 standard handles:
1. **Chunking**: Splits large files into 1KB chunks
2. **Ordering**: Maintains correct sequence
3. **Reassembly**: Reconstructs the original file
4. **Verification**: Ensures data integrity

## Step 1: Basic Text Inscription

Start with inscribing a simple text message:

```javascript
// inscribe-text.js
import { inscribe } from '@hashgraph-online/standards-sdk';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

async function inscribeText() {
  const clientConfig = {
    accountId: process.env.HEDERA_ACCOUNT_ID,
    privateKey: process.env.HEDERA_PRIVATE_KEY,
    network: 'testnet'
  };

  console.log("📝 Inscribing text message...");

  const result = await inscribe(
    {
      type: 'buffer',
      buffer: Buffer.from('Hello, Hedera! This is my first inscription.'),
      fileName: 'message.txt',
      mimeType: 'text/plain'
    },
    clientConfig,
    {
      waitForConfirmation: true,
      progressCallback: (data) => {
        console.log(`Progress: ${data.percentage}%`);
      }
    }
  );

  console.log("✅ Inscription successful!");
  console.log(`Topic ID: ${result.result.topicId}`);
  console.log(`Transaction ID: ${result.result.transactionId}`);
  
  // Save transaction ID for later retrieval
  fs.writeFileSync('inscription-tx-id.txt', result.result.transactionId);
  
  if (result.confirmed) {
    console.log("Content confirmed on network:");
    console.log(result.inscription.content);
  }
}

inscribeText();
```

## Step 2: Inscribe an Image

Inscribe images or any binary files:

```javascript
// inscribe-image.js
import { inscribe } from '@hashgraph-online/standards-sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function inscribeImage() {
  const clientConfig = {
    accountId: process.env.HEDERA_ACCOUNT_ID,
    privateKey: process.env.HEDERA_PRIVATE_KEY,
    network: 'testnet'
  };

  // Read image file
  const imagePath = './my-image.png';
  const imageBuffer = fs.readFileSync(imagePath);
  const fileName = path.basename(imagePath);

  console.log(`📸 Inscribing ${fileName} (${imageBuffer.length} bytes)...`);

  const result = await inscribe(
    {
      type: 'buffer',
      buffer: imageBuffer,
      fileName: fileName,
      mimeType: 'image/png'
    },
    clientConfig,
    {
      waitForConfirmation: true,
      progressCallback: (data) => {
        console.log(`Chunks uploaded: ${data.chunksUploaded}/${data.totalChunks}`);
      }
    }
  );

  console.log("✅ Image inscribed successfully!");
  console.log(`Topic ID: ${result.result.topicId}`);
  console.log(`Transaction ID: ${result.result.transactionId}`);
  console.log(`View at: hcs://1/${result.result.topicId}`);
  
  // Save the transaction ID for later retrieval
  fs.writeFileSync('inscription-tx-id.txt', result.result.transactionId);
  // Save the HRL for reference
  fs.writeFileSync('inscription-hrl.txt', `hcs://1/${result.result.topicId}`);
}

inscribeImage();
```

## Step 3: Inscribe from URL

Inscribe content directly from a URL:

```javascript
// inscribe-from-url.js
import { inscribe } from '@hashgraph-online/standards-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

async function inscribeFromUrl() {
  const clientConfig = {
    accountId: process.env.HEDERA_ACCOUNT_ID,
    privateKey: process.env.HEDERA_PRIVATE_KEY,
    network: 'testnet'
  };

  const imageUrl = 'https://example.com/sample-image.jpg';

  console.log(`🌐 Inscribing from URL: ${imageUrl}`);

  const result = await inscribe(
    {
      type: 'url',
      url: imageUrl
    },
    clientConfig,
    {
      waitForConfirmation: true,
      metadata: {
        name: 'Sample Image',
        description: 'Image inscribed from URL',
        source: imageUrl
      }
    }
  );

  console.log("✅ URL content inscribed!");
  console.log(`Topic ID: ${result.result.topicId}`);
  console.log(`HRL: hcs://1/${result.result.topicId}`);
}

inscribeFromUrl();
```

## Step 4: Retrieve Inscribed Content

Retrieve and verify inscribed content:

```javascript
// retrieve-inscription.js
import { retrieveInscription } from '@hashgraph-online/standards-sdk';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

async function retrieveContent() {
  // Use the transaction ID from the inscription result
  const transactionId = '0.0.123456@1234567890.123456789'; // Replace with your transaction ID
  
  console.log(`🔍 Retrieving inscription with transaction ID ${transactionId}...`);

  const inscription = await retrieveInscription(
    transactionId,
    {
      network: 'testnet',
      apiKey: process.env.API_KEY // Optional: for faster retrieval
    }
  );

  console.log("✅ Inscription retrieved!");
  console.log(`Topic ID: ${inscription.topic_id}`);
  console.log(`Content Type: ${inscription.content_type}`);
  console.log(`Sequence Number: ${inscription.sequence_number}`);

  // Save retrieved content
  if (inscription.content_type.startsWith('text/')) {
    // Text content
    console.log("Content:", inscription.content);
  } else if (inscription.url) {
    // Binary content available via URL
    console.log(`Content URL: ${inscription.url}`);
    // You can fetch the content from the URL if needed
  }
}

retrieveContent();
```

## Understanding HRLs

Hedera Resource Locators (HRLs) uniquely identify inscribed content:

```
hcs://1/0.0.123456
```

- `hcs://` - Protocol identifier
- `1` - HCS-1 standard version
- `0.0.123456` - Topic ID containing the inscription

## Inscription Metadata

Add metadata to your inscriptions:

```javascript
const result = await inscribe(
  {
    type: 'buffer',
    buffer: fileBuffer,
    fileName: 'document.pdf',
    mimeType: 'application/pdf'
  },
  clientConfig,
  {
    metadata: {
      name: 'Important Document',
      description: 'Q4 2024 Report',
      author: 'John Doe',
      tags: ['report', 'finance', '2024'],
      customField: 'any-value'
    }
  }
);
```

## Cost Estimation

Inscription costs depend on file size:

| File Size | Approximate Cost |
|-----------|-----------------|
| 1 KB      | ~$0.0001       |
| 100 KB    | ~$0.01         |
| 1 MB      | ~$0.10         |
| 10 MB     | ~$1.00         |

## Best Practices

### 1. File Size Optimization

```javascript
// Compress before inscribing
import zlib from 'zlib';

const compressed = zlib.gzipSync(originalBuffer);
const result = await inscribe({
  type: 'buffer',
  buffer: compressed,
  fileName: 'data.gz',
  mimeType: 'application/gzip'
}, clientConfig);
```

### 2. Progress Tracking

```javascript
await inscribe(data, clientConfig, {
  progressCallback: (progress) => {
    console.log(`Progress: ${progress.percentage}%`);
    console.log(`Chunks: ${progress.chunksUploaded}/${progress.totalChunks}`);
    console.log(`Bytes: ${progress.bytesUploaded}/${progress.totalBytes}`);
  }
});
```

### 3. Error Handling

```javascript
try {
  const result = await inscribe(data, clientConfig);
  console.log("Success:", result);
} catch (error) {
  if ((error as any).code === 'INSUFFICIENT_BALANCE') {
    console.error("Not enough HBAR for inscription");
  } else if ((error as any).code === 'FILE_TOO_LARGE') {
    console.error("File exceeds maximum size");
  } else {
    console.error("Inscription failed:", error);
  }
}
```

## Advanced: Batch Inscriptions

Inscribe multiple files efficiently:

```javascript
async function batchInscribe(files) {
  const results = [];
  
  for (const file of files) {
    console.log(`Inscribing ${file.name}...`);
    
    const result = await inscribe(
      {
        type: 'buffer',
        buffer: file.buffer,
        fileName: file.name,
        mimeType: file.mimeType
      },
      clientConfig,
      {
        waitForConfirmation: false // Don't wait for each one
      }
    );
    
    results.push(result);
  }
  
  // Wait for all confirmations
  const confirmed = await Promise.all(
    results.map(r => waitForConfirmation(r.transactionId))
  );
  
  return confirmed;
}
```

## Next Steps

- [Create NFT with Inscriptions](./create-nft-with-inscriptions.md) - Use inscriptions for NFT metadata
- [HCS-5 Hashinals](../../standards/hcs-5.md) - Learn about the inscription standard

## Troubleshooting

<details>
<summary><b>File too large error</b></summary>

- Maximum single topic message: 1024 bytes
- HCS-1 handles chunking automatically
- Very large files (>100MB) may timeout
- Solution: Compress files before inscribing or split into smaller parts

</details>

<details>
<summary><b>Inscription not found</b></summary>

- Wait 3-5 seconds after inscribing for consensus
- Verify correct topic ID format (e.g., `0.0.123456`)
- Check you're querying the correct network (testnet vs mainnet)
- Use the same network for inscribing and retrieving

</details>

<details>
<summary><b>Invalid MIME type</b></summary>

- Use standard MIME types only
- Common examples: 
  - Text: `text/plain`, `text/html`, `text/css`
  - Images: `image/png`, `image/jpeg`, `image/gif`
  - Documents: `application/json`, `application/pdf`
- Check the file extension matches the MIME type

</details>

<details>
<summary><b>Transaction timeout</b></summary>

- Large files may take longer to inscribe
- Network congestion can cause delays
- Solution: Use `waitForConfirmation: false` and poll for status
- Increase timeout in configuration if needed

</details>

<details>
<summary><b>Insufficient HBAR balance</b></summary>

- Each chunk costs approximately $0.0001
- Check your account balance before inscribing
- Formula: `cost ≈ (fileSize / 1024) * $0.0001`
- Add buffer for network fees

</details>

<details>
<summary><b>Progress callback not working</b></summary>

- Ensure you're passing the callback correctly
- The callback is only triggered during chunking
- Small files (less than 1KB) may complete too quickly to trigger
- Check console for any error messages

</details>

## Resources

- [HCS-1 Standard](../../standards/hcs-1.md)
- [Standards SDK Documentation](https://github.com/hashgraph-online/standards-sdk)
- [Inscription Explorer](https://hashscan.io/testnet)



