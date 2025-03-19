---
sidebar_position: 6
---

# Inscribe: File Inscription Utilities

The Inscribe module provides a comprehensive set of tools for inscribing various types of content onto the Hedera network. It enables permanent, on-chain storage of files, data, and metadata using the Hedera Consensus Service (HCS), making content accessible and verifiable through unique topic IDs.

## Key Concepts

The Inscribe module introduces several important concepts:

- **Inscription**: The process of permanently storing content on the Hedera network
- **Content Types**: Different formats of content that can be inscribed (text, files, URLs, buffers)
- **Inscription Options**: Configuration settings for controlling how content is inscribed
- **Topic IDs**: Unique identifiers for accessing inscribed content
- **Hashinals**: NFT-like digital artifacts with on-chain metadata

## Getting Started

### Installation

The Inscribe module is included in the Standards SDK:

```bash
npm install @hashgraphonline/standards-sdk
```

### Basic Usage

Import the inscribe function from the Standards SDK:

```typescript
import { inscribe } from '@hashgraphonline/standards-sdk';

// Configure Hedera client
const clientConfig = {
  accountId: '0.0.123456',
  privateKey: 'your-private-key',
  network: 'testnet',
};

// Configure inscription options
const options = {
  mode: 'file',
  waitForConfirmation: true,
  metadata: {
    name: 'My Document',
    description: 'An important document',
    creator: 'Jane Doe',
  },
  tags: ['document', 'important', 'example'],
};
```

## Inscription Types

The Inscribe module supports several different types of content inscriptions:

### Text Inscription

Inscribe text content directly:

```typescript
// Inscribe text content
const textResult = await inscribe(
  {
    type: 'text',
    content: 'Hello, Hedera! This is permanently stored on the hashgraph.',
    fileName: 'greeting.txt',
  },
  clientConfig,
  options
);

console.log('Text inscription successful!');
console.log('Topic ID:', textResult.inscription.topic_id);
console.log('Transaction ID:', textResult.result.transactionId);
```

### File Inscription

Inscribe a file from the local filesystem:

```typescript
// Inscribe a file from disk
const fileResult = await inscribe(
  {
    type: 'file',
    path: './path/to/document.pdf',
  },
  clientConfig,
  options
);

console.log('File inscription successful!');
console.log('Topic ID:', fileResult.inscription.topic_id);
```

### URL Inscription

Inscribe content from a URL:

```typescript
// Inscribe content from a URL
const urlResult = await inscribe(
  {
    type: 'url',
    url: 'https://example.com/image.jpg',
  },
  clientConfig,
  {
    ...options,
    maxFileSize: 10 * 1024 * 1024, // 10MB limit
  }
);

console.log('URL inscription successful!');
console.log('Topic ID:', urlResult.inscription.topic_id);
```

### Buffer Inscription

Inscribe content from a buffer (useful for programmatically generated content):

```typescript
// Create a buffer with content
const content = 'Binary content example';
const buffer = Buffer.from(content);

// Inscribe content from buffer
const bufferResult = await inscribe(
  {
    type: 'buffer',
    buffer: buffer,
    fileName: 'buffer-content.txt',
    mimeType: 'text/plain',
  },
  clientConfig,
  options
);

console.log('Buffer inscription successful!');
console.log('Topic ID:', bufferResult.inscription.topic_id);
```

## Inscription Options

The inscribe function supports a variety of options to control the inscription process:

```typescript
const advancedOptions = {
  // Inscription mode ('file', 'upload', 'hashinal', 'hashinal-collection')
  mode: 'file',

  // Network selection
  network: 'testnet',

  // Optional API key (if using API-based authentication)
  apiKey: 'your-api-key',

  // CDN base URL for retrieving inscriptions
  baseUrl: 'https://custom-cdn.example.com',

  // Retry settings
  maxRetries: 5,
  retryDelay: 3000,

  // Confirmation settings
  waitForConfirmation: true,
  waitMaxAttempts: 30,
  waitIntervalMs: 5000,

  // Logging options
  logging: {
    level: 'debug',
    timestamps: true,
  },

  // Metadata for the inscription
  metadata: {
    name: 'Sample Document',
    description: 'A sample document for demonstration',
    creator: 'Example User',
    custom: {
      department: 'Engineering',
      documentId: 'DOC-123',
    },
  },

  // Tags for categorization
  tags: ['sample', 'documentation', 'example'],

  // Chunking for large files
  chunkSize: 1024 * 256, // 256KB chunks
};
```

## Hashinal NFTs

Create Hashinal NFTs with fully on-chain metadata:

```typescript
// Create a Hashinal NFT
const hashinalResult = await inscribe(
  {
    type: 'url',
    url: 'https://example.com/artwork.png',
  },
  clientConfig,
  {
    mode: 'hashinal',
    metadata: {
      name: 'Digital Masterpiece',
      creator: '0.0.123456',
      description: 'A beautiful digital artwork stored permanently on Hedera',
      type: 'image/png',
      attributes: [
        { trait_type: 'Background', value: 'Blue' },
        { trait_type: 'Style', value: 'Abstract' },
        { trait_type: 'Color Scheme', value: 'Vibrant' },
      ],
      properties: {
        edition: 1,
        maxEdition: 10,
        created: new Date().toISOString(),
      },
    },
    waitForConfirmation: true,
  }
);

console.log('Hashinal created successfully!');
console.log('Topic ID:', hashinalResult.inscription.topic_id);
```

## Wallet Integration

Inscribe content using a connected wallet (browser environments):

```typescript
import { inscribeWithSigner } from '@hashgraphonline/standards-sdk';

// Assuming you have a connected wallet/signer available
async function inscribeWithWallet(signer, content) {
  const result = await inscribeWithSigner(
    {
      type: 'text',
      content: content,
      fileName: 'wallet-inscription.txt',
    },
    signer,
    {
      mode: 'file',
      waitForConfirmation: true,
      metadata: {
        name: 'Wallet-Created Inscription',
        description: 'Created using a connected wallet',
      },
    }
  );

  return result;
}

// In a browser application
document
  .getElementById('inscribe-button')
  .addEventListener('click', async () => {
    const content = document.getElementById('content-input').value;

    try {
      // Get signer from your wallet connection
      const signer = await yourWalletProvider.getSigner();

      // Inscribe the content
      const result = await inscribeWithWallet(signer, content);

      // Display the result
      document.getElementById(
        'result'
      ).textContent = `Inscription successful! Topic ID: ${result.inscription.topic_id}`;
    } catch (error) {
      console.error('Inscription failed:', error);
      document.getElementById(
        'result'
      ).textContent = `Inscription failed: ${error.message}`;
    }
  });
```

## Retrieving Inscriptions

Retrieve previously inscribed content:

```typescript
import { retrieveInscription } from '@hashgraphonline/standards-sdk';

// Retrieve an inscription by transaction ID
async function getInscription(transactionId) {
  const result = await retrieveInscription(transactionId, {
    network: 'mainnet',
    apiKey: 'your-api-key', // Optional
  });

  console.log('Retrieved inscription:');
  console.log('Topic ID:', result.topic_id);
  console.log('Sequence Number:', result.sequence_number);
  console.log('Content Type:', result.content_type);

  // For text content, the content will be available
  if (result.content) {
    console.log('Content:', result.content);
  }

  // For binary content, a URL will be available
  if (result.url) {
    console.log('Content URL:', result.url);
  }

  // Metadata if present
  if (result.metadata) {
    console.log('Metadata:', result.metadata);
  }

  return result;
}
```

## API Reference

### Inscription Functions

```typescript
function inscribe(
  input: InscriptionInput,
  clientConfig: HederaClientConfig,
  options: InscriptionOptions,
  existingSDK?: InscriptionSDK
): Promise<InscriptionResponse>;

function inscribeWithSigner(
  input: InscriptionInput,
  signer: DAppSigner,
  options: InscriptionOptions,
  existingSDK?: InscriptionSDK
): Promise<InscriptionResponse>;

function retrieveInscription(
  transactionId: string,
  options: InscriptionOptions & { accountId?: string; privateKey?: string }
): Promise<RetrievedInscriptionResult>;
```

### Input Types

```typescript
type InscriptionInput =
  | { type: 'url'; url: string }
  | { type: 'file'; path: string }
  | {
      type: 'buffer';
      buffer: ArrayBuffer | Buffer;
      fileName: string;
      mimeType?: string;
    };
```

### Configuration Types

```typescript
interface HederaClientConfig {
  accountId: string;
  privateKey: string;
  network?: 'mainnet' | 'testnet';
}

interface InscriptionOptions {
  network?: 'mainnet' | 'testnet';
  apiKey?: string;
  baseUrl?: string;
  maxRetries?: number;
  retryDelay?: number;
  waitForConfirmation?: boolean;
  waitMaxAttempts?: number;
  waitIntervalMs?: number;
  logging?: LoggerOptions;
  metadata?: Record<string, unknown>;
  tags?: string[];
  chunkSize?: number;
  mode?: 'file' | 'upload' | 'hashinal' | 'hashinal-collection';
  jsonFileURL?: string;
}

interface HashinalInscriptionOptions extends InscriptionOptions {
  metadata: {
    name: string;
    creator: string;
    description: string;
    image?: string;
    type: string;
    attributes?: Array<{
      trait_type: string;
      value: string | number;
    }>;
    properties?: Record<string, unknown>;
    tags?: string[];
    [key: string]: unknown;
  };
}
```

### Response Types

```typescript
type InscriptionResponse =
  | { confirmed: false; result: InscriptionResult; sdk: InscriptionSDK }
  | {
      confirmed: true;
      result: InscriptionResult;
      inscription: RetrievedInscriptionResult;
      sdk: InscriptionSDK;
    };

interface InscriptionResult {
  transactionId: string;
  jobId: string;
}

interface RetrievedInscriptionResult {
  topic_id: string;
  sequence_number: number;
  content_type: string;
  content?: string;
  url?: string;
  metadata?: Record<string, unknown>;
}
```

## Integration Examples

### File Upload UI

```typescript
import { inscribeWithSigner } from '@hashgraphonline/standards-sdk';

class InscriptionUploader {
  constructor(signer) {
    this.signer = signer;
    this.fileInput = document.getElementById('file-input');
    this.uploadButton = document.getElementById('upload-button');
    this.resultDiv = document.getElementById('result');

    this.uploadButton.addEventListener('click', this.handleUpload.bind(this));
  }

  async handleUpload() {
    if (!this.fileInput.files || this.fileInput.files.length === 0) {
      this.resultDiv.textContent = 'Please select a file to upload';
      return;
    }

    const file = this.fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        this.resultDiv.textContent = 'Inscribing file...';

        const result = await inscribeWithSigner(
          {
            type: 'buffer',
            buffer: e.target.result,
            fileName: file.name,
            mimeType: file.type,
          },
          this.signer,
          {
            mode: 'file',
            waitForConfirmation: true,
            metadata: {
              name: file.name,
              description: 'Uploaded through the web interface',
              fileSize: file.size,
              fileType: file.type,
            },
          }
        );

        this.resultDiv.textContent = `File inscribed successfully! Topic ID: ${result.inscription.topic_id}`;
      } catch (error) {
        this.resultDiv.textContent = `Error: ${error.message}`;
      }
    };

    reader.readAsArrayBuffer(file);
  }
}

// Usage
async function initializeUploader() {
  const signer = await yourWalletProvider.getSigner();
  new InscriptionUploader(signer);
}

window.addEventListener('DOMContentLoaded', initializeUploader);
```

### Content Management System Integration

```typescript
import { inscribe, retrieveInscription } from '@hashgraphonline/standards-sdk';
import fs from 'fs';
import path from 'path';

class HeideraContentManager {
  constructor(clientConfig) {
    this.clientConfig = clientConfig;
    this.contentRegistry = new Map();
  }

  async uploadContent(filePath, metadata = {}) {
    const fileName = path.basename(filePath);
    const fileSize = fs.statSync(filePath).size;
    const fileType = this.getFileType(fileName);

    const result = await inscribe(
      {
        type: 'file',
        path: filePath,
      },
      this.clientConfig,
      {
        mode: 'file',
        waitForConfirmation: true,
        metadata: {
          ...metadata,
          fileName,
          fileSize,
          uploadDate: new Date().toISOString(),
        },
        tags: [fileType, 'content', ...Object.keys(metadata)],
      }
    );

    const contentRecord = {
      topicId: result.inscription.topic_id,
      transactionId: result.result.transactionId,
      fileName,
      fileSize,
      fileType,
      metadata,
      inscribedAt: new Date(),
    };

    this.contentRegistry.set(result.inscription.topic_id, contentRecord);
    return contentRecord;
  }

  async getContent(topicId) {
    const localRecord = this.contentRegistry.get(topicId);

    if (localRecord) {
      const fullContent = await retrieveInscription(localRecord.transactionId, {
        network: this.clientConfig.network,
      });

      return {
        ...localRecord,
        content: fullContent,
      };
    }

    throw new Error(`Content with Topic ID ${topicId} not found in registry`);
  }

  getFileType(fileName) {
    const ext = path.extname(fileName).toLowerCase();
    const typeMap = {
      '.jpg': 'image',
      '.jpeg': 'image',
      '.png': 'image',
      '.gif': 'image',
      '.pdf': 'document',
      '.doc': 'document',
      '.docx': 'document',
      '.txt': 'document',
      '.mp3': 'audio',
      '.wav': 'audio',
      '.mp4': 'video',
      '.mov': 'video',
      '.json': 'data',
    };

    return typeMap[ext] || 'unknown';
  }
}
```

## Browser Compatibility

The Inscribe module is compatible with:

- Node.js (12.x and above)
- Browser environments with appropriate polyfills and wallet connectors
  - Chrome (80+)
  - Firefox (75+)
  - Safari (13.1+)
  - Edge (80+)
