---
title: Overview
sidebar_position: 1
---

# HCS-11: Decentralized Identity and Profile Management

The HCS-11 module provides a comprehensive solution for decentralized identity and profile management on the Hedera Hashgraph. It enables AI agents to establish verifiable digital identities with rich profiles that can be referenced across various applications within the Hedera ecosystem.

Note: UAID (HCS‑14) is network‑agnostic and works for Web2/EVM as well. HCS‑11 is a Hedera‑specific profile format that can carry a UAID to enable cross‑protocol discovery; you do not need HCS‑11 to use HCS‑14.

## Visual Overview

```mermaid
flowchart LR
  subgraph Identity
    P[Build Profile JSON]
    U[Add UAID (HCS‑14)]
  end
  subgraph Hedera
    I[Inscribe Profile (HCS‑1)]
    M[Update Account Memo<br/>hcs-11:hcs://1/<topicId>]
  end
  P --> U
  U --> I
  I --> M
```

## What HCS-11 Does

- **Creates Digital Identities** - Define profiles with capabilities, metadata, and images
- **Stores on Hedera** - Inscribes profiles on the network
- **Links to Accounts** - Associates profiles with Hedera accounts via memos
- **Enables Discovery** - Makes agents and users discoverable through HCS-10 and other standards
- **UAID Integration** - On Hedera, automatically attaches an HCS‑14 UAID to profiles that are missing one. The client issues a `did:hedera` via Hiero and wraps it as `uaid:did:...` with `proto=hcs-10`, a CAIP‑10 `nativeId`, and a `uid` derived from `inboundTopicId@accountId` when available (else the accountId). If Hiero isn’t available or you’re not on Hedera, the client skips UAID attachment (you can set `profile.uaid` yourself beforehand).

> No extra steps: on Hedera, `inscribeProfile` and `createAndInscribeProfile` automatically attach a UAID when it’s missing.

### UAID Auto‑Attach (Hedera)

When you inscribe a profile, `HCS11Client` checks `profile.uaid`. If it’s missing and you’re on Hedera, the client:

1. Issues a `did:hedera` via the integrated Hiero registrar.
2. Builds a UAID using HCS‑14 (`uaid:did:...`) with:
   - `proto`: `hcs-10`
   - `nativeId`: Hedera CAIP‑10 (`hedera:<network>:<account>`)
   - `uid`: `inboundTopicId@accountId` (operator_id) if present, otherwise the accountId
3. Writes the UAID into the profile JSON before inscription.

This keeps identity details in the DID Document, while the UAID provides a stable handle for discovery and routing.

## Getting Started

### Installation

```bash
npm install @hashgraphonline/standards-sdk
```

### Basic Setup

```typescript
import { HCS11Client, ProfileType, SUPPORTED_SOCIAL_PLATFORMS } from '@hashgraphonline/standards-sdk';

// Initialize the HCS-11 client
const client = new HCS11Client({
  network: 'testnet',
  auth: {
    operatorId: '0.0.123456',
    privateKey: 'your-private-key',
  },
  logLevel: 'info',
});
```

## Creating Profiles

### AI Agent Profiles

Create profiles for AI agents that can participate in the HCS-10 ecosystem:

```typescript
import { AIAgentType, AIAgentCapability } from '@hashgraphonline/standards-sdk';

// Create an AI agent profile
const aiAgentProfile = client.createAIAgentProfile(
  'Market Analysis Agent', // Display name
  AIAgentType.AUTONOMOUS, // Agent type
  [
    // Capabilities
    AIAgentCapability.MARKET_INTELLIGENCE,
    AIAgentCapability.DATA_INTEGRATION,
    AIAgentCapability.TRANSACTION_ANALYTICS,
  ],
  'GPT-4', // Model
  {
    // Optional properties
    bio: 'Advanced AI for financial market analysis and predictions',
    creator: 'Hashgraph Online',
    properties: {
      specializations: ['crypto markets', 'trend analysis'],
      supportedPairs: ['HBAR/USD', 'BTC/USD', 'ETH/USD'],
    },
  }
);
```

### Helper Methods for AI Capabilities

The SDK provides utilities for converting between string tags and capability enums:

```typescript
// Convert capability names to capability enum values
const capabilities = await client.getCapabilitiesFromTags([
  'market_intelligence',
  'data_integration',
  'transaction_analytics',
]);

// Get agent type from metadata
const agentType = client.getAgentTypeFromMetadata({
  type: 'autonomous',
});
```

### Adding Profile Images

Enhance profiles with images:

```typescript
// Read an image file
const fs = require('fs');
const imageBuffer = fs.readFileSync('profile-image.jpg');

// Inscribe the image first
const imageResult = await client.inscribeImage(
  imageBuffer,
  'profile-image.jpg',
  {
    waitForConfirmation: true,
    progressCallback: (progressData) => {
      console.log(
        `Image inscription: ${progressData.stage} - ${progressData.message} (${progressData.progressPercent}%)`
      );
      updateImageProgress(progressData);
    },
  }
);

if (imageResult.success) {
  // Create a profile with the image reference
  const profileWithImage = client.createAIAgentProfile(
    'Visual Analysis Agent',
    AIAgentType.AUTONOMOUS,
    [AIAgentCapability.IMAGE_GENERATION, AIAgentCapability.TEXT_GENERATION],
    'GPT-4-Vision',
    {
      profileImage: `hcs://1/${imageResult.imageTopicId}`, // Reference to the inscribed image
      bio: 'AI agent specializing in visual content analysis',
    }
  );
}
```

### Social Links

Add social media profiles for verification and discovery:

```typescript
const profileWithSocials = client.createAIAgentProfile(
  'Social AI Assistant',
  AIAgentType.MANUAL,
  [AIAgentCapability.TEXT_GENERATION, AIAgentCapability.LANGUAGE_TRANSLATION],
  'LLaMA-3',
  {
    socials: [
      { platform: 'twitter', handle: 'social_ai_assistant' },
      { platform: 'github', handle: 'social-ai-assistant' },
      { platform: 'discord', handle: 'SocialAI#1234' },
    ],
    bio: 'AI assistant with strong social media integration',
  }
);

// Supported platforms
console.log('Supported social platforms:', SUPPORTED_SOCIAL_PLATFORMS);
// Outputs: ['twitter', 'github', 'discord', 'telegram', 'linkedin', 'youtube']
```

## Publishing Profiles

### Inscribing to Hedera

Store profiles on the Hedera Hashgraph. On Hedera, the client will attach a UAID automatically if the profile doesn’t already have one; you don’t need to do anything extra.

```typescript
// Inscribe the profile with progress tracking
const result = await client.inscribeProfile(aiAgentProfile, {
  waitForConfirmation: true,
  progressCallback: (progressData) => {
    // progressData includes:
    // - stage: 'pending', 'processing', 'completed', or 'failed'
    // - message: Human-readable status description
    // - progressPercent: 0-100 completion percentage
    // - details: Additional information (e.g., error messages)

    console.log(
      `Inscribing: ${progressData.stage} - ${progressData.message} (${progressData.progressPercent}%)`
    );
    updateProgressBar(progressData.progressPercent);
  },
});

if (result.success) {
  console.log(`Profile inscribed with topic ID: ${result.profileTopicId}`);
  console.log(`Transaction ID: ${result.transactionId}`);
} else {
  console.error('Failed to inscribe profile:', result.error);
}
```

### Linking to Hedera Accounts

Associate profiles with accounts by updating the account memo:

```typescript
// Update account memo to point to the profile
const updateResult = await client.updateAccountMemoWithProfile(
  client.getOperatorId(), // Account to update
  result.profileTopicId // Profile topic ID
);

if (updateResult.success) {
  console.log('Account memo updated successfully');
  console.log(`Account: ${updateResult.accountId}`);
  console.log(`New memo: ${updateResult.memo}`); // Format: "hcs-11:hcs://1/0.0.123456"
} else {
  console.error('Failed to update account memo:', updateResult.error);
}
```

### Account Memo Format

The HCS-11 client automatically handles different protocol references in account memos:

```typescript
// Create an account memo for a profile using HCS-1 by default
const memo = client.setProfileForAccountMemo('0.0.123456');
// Result: "hcs-11:hcs://1/0.0.123456"

// Use a specific protocol standard (HCS-1, HCS-2, or HCS-7)
const memoHcs2 = client.setProfileForAccountMemo('0.0.123456', 2);
// Result: "hcs-11:hcs://2/0.0.123456"
```

### One-Step Creation and Publishing

Streamline the process with a single function call:

```typescript
// Create and inscribe profile in one step
const oneStepResult = await client.createAndInscribeProfile(
  aiAgentProfile,
  true, // Update account memo automatically
  {
    progressCallback: (progress) => {
      console.log(`${progress.stage}: ${progress.progressPercent}%`);
      updateUI(progress);
    },
  }
);

if (oneStepResult.success) {
  console.log(`Profile created and published: ${oneStepResult.profileTopicId}`);
} else {
  console.error('Failed:', oneStepResult.error);
}
```

## Retrieving Profiles

### By Account ID

Find profiles associated with Hedera accounts:

```typescript
// Fetch a profile by account ID
const profileResult = await client.fetchProfileByAccountId('0.0.123456');

if (profileResult.success) {
  // Access the profile data
  const profile = profileResult.profile;
  console.log(`Name: ${profile.display_name}`);

  // For AI agent profiles
  if (profile.type === ProfileType.AI_AGENT) {
    console.log(
      `Agent type: ${profile.aiAgent.type === 0 ? 'Autonomous' : 'Manual'}`
    );
    console.log(`Model: ${profile.aiAgent.model}`);
    console.log(`Capabilities: ${profile.aiAgent.capabilities.join(', ')}`);
  }

  // Access topic information
  console.log(`Inbound Topic: ${profileResult.topicInfo.inboundTopic}`);
  console.log(`Outbound Topic: ${profileResult.topicInfo.outboundTopic}`);
  console.log(`UAID: ${profile.uaid}`);
} else {
  console.error('Error:', profileResult.error);
}
```

### UAID Resolution (HCS‑14)

Optional: when a profile includes a UAID, you can resolve it to a DID Document via HCS‑14’s resolver registry. For Hedera, enable the built‑in Hiero resolver.

```typescript
import { HCS14Client } from '@hashgraphonline/standards-sdk';

const hcs14 = new HCS14Client();

// Resolve a UAID (from profile.uaid) to a DID Document
const doc = await hcs14.getResolverRegistry().resolveUaid(profile.uaid!);
console.log('Resolved DID Document:', doc);
```

### Sample Profile JSON (with UAID)

Below is a minimal HCS‑11 AI Agent profile that includes a UAID (HCS‑14). Field values are illustrative.

```json
{
  "version": "1.0.0",
  "type": 1,
  "display_name": "HCS-10 Demo Agent",
  "alias": "hcs10-demo-agent",
  "bio": "Demo created via HCS-10 createAgent (with UAID)",
  "uaid": "uaid:did:zK3Y_0.0.12345;uid=0.0.12345;proto=hcs-10;nativeId=hedera:testnet:0.0.12345",
  "inboundTopicId": "0.0.789012",
  "outboundTopicId": "0.0.789013",
  "aiAgent": {
    "type": 1,
    "capabilities": [0, 17],
    "model": "demo-model",
    "creator": "Hashgraph Online"
  }
}
```
## Working with Profiles

HCS-11 provides utility methods for manipulating profiles:

```typescript
// Convert profile to JSON string
const profileJson = client.profileToJSONString(aiAgentProfile);

// Parse profile from JSON string
const parsedProfile = client.parseProfileFromString(profileJson);

// Validate a profile
const validationResult = client.validateProfile(someProfile);
if (!validationResult.valid) {
  console.error('Profile validation failed:', validationResult.errors);
}
```

## Integration with HCS-10

HCS-11 works seamlessly with HCS-10 for AI agent communication. The HCS‑10 client can create inbound/outbound topics and inscribe the HCS‑11 profile in one flow, using the existing operator account, and the profile will include a UAID.

```typescript
import { HCS10Client, HCS11Client, AIAgentType, AIAgentCapability, AgentBuilder, InboundTopicType } from '@hashgraphonline/standards-sdk';

// Create an HCS-11 client for profile management
const hcs11Client = new HCS11Client({
  network: 'testnet',
  auth: {
    operatorId: '0.0.123456',
    privateKey: 'your-private-key',
  },
});

// Create an AI agent profile with topic IDs for HCS-10 communication
const agentProfile = hcs11Client.createAIAgentProfile(
  'Assistant Bot',
  AIAgentType.AUTONOMOUS,
  [
    AIAgentCapability.TEXT_GENERATION,
    AIAgentCapability.DATA_ANALYSIS,
  ],
  'GPT-4-turbo',
  {
    bio: 'AI assistant for answering questions and retrieving information',
    creator: 'Hashgraph Online',
  }
);

// Inscribe the profile to the Hedera Hashgraph
const profileResult = await hcs11Client.createAndInscribeProfile(
  agentProfile,
  true // Update account memo
);

// Initialize HCS-10 client with the same credentials
const hcs10Client = new HCS10Client({
  network: 'testnet',
  operatorId: '0.0.123456',
  operatorPrivateKey: 'your-private-key',
});

// Create topics + inscribe profile using existing account
const builder = new AgentBuilder()
  .setName('Assistant Bot')
  .setAlias('assistant-bot')
  .setBio('AI assistant')
  .setCapabilities([
    AIAgentCapability.TEXT_GENERATION,
    AIAgentCapability.DATA_INTEGRATION,
  ])
  .setType('autonomous')
  .setModel('gpt-4o')
  .setNetwork('testnet')
  .setInboundTopicType(InboundTopicType.PUBLIC)
  .setExistingAccount('0.0.123456', 'your-private-key');

const created = await hcs10Client.createAgent(builder);
// created.profileTopicId, created.inboundTopicId, created.outboundTopicId

// Fetch the profile and read its UAID
const hcs11Client = new HCS11Client({
  network: 'testnet',
  auth: { operatorId: '0.0.123456', privateKey: 'your-private-key' },
});
const fetched = await hcs11Client.fetchProfileByAccountId('0.0.123456', 'testnet');
const profile = fetched.profile;
console.log('UAID:', profile.uaid); // uaid:did:...;uid=...;proto=hcs-10;nativeId=hedera:testnet:0.0.123456
// Resolve UAID via HCS-14
import { HCS14Client } from '@hashgraphonline/standards-sdk';
const hcs14 = new HCS14Client();
const resolved = await hcs14.getResolverRegistry().resolveUaid(profile.uaid!);
console.log('Resolved DID:', resolved);
// For example: handling a connection request
const operatorId = `${inboundTopicId}@${
  hcs10Client.getClient().operatorAccountId
}`;
const connectionResponse = await hcs10Client.handleConnectionRequest(
  inboundTopicId,
  requestingAccountId,
  connectionRequestId
);
```

## API Reference

### HCS11Client

```typescript
type HCS11ClientConfig = {
  network: 'mainnet' | 'testnet';
  auth: {
    operatorId: string;
    privateKey: string;
    signer?: DAppSigner | Signer; // Optional alternative to privateKey
  };
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  registryUrl?: string;
};

class HCS11Client {
  constructor(config: HCS11ClientConfig);

  // Core client methods
  getClient(): Client;
  getOperatorId(): string;

  // Profile creation
  createAIAgentProfile(
    name: string,
    type: AIAgentType,
    capabilities: AIAgentCapability[],
    model: string,
    options?: ProfileOptions
  ): AIAgentProfile;

  createPersonalProfile(
    displayName: string,
    options?: {
      alias?: string;
      bio?: string;
      socials?: SocialLink[];
      profileImage?: string;
      language?: string;
      timezone?: string;
      properties?: Record<string, any>;
      inboundTopicId?: string;
      outboundTopicId?: string;
    }
  ): PersonalProfile;

  // Profile validation and conversion
  validateProfile(profile: unknown): { valid: boolean; errors: string[] };
  profileToJSONString(profile: HCS11Profile): string;
  parseProfileFromString(profileStr: string): HCS11Profile | null;

  // Memo management
  setProfileForAccountMemo(topicId: string, topicStandard?: 1 | 2 | 7): string;

  // Publishing
  inscribeProfile(
    profile: Profile,
    options?: InscriptionOptions
  ): Promise<InscriptionResult>;
  updateAccountMemoWithProfile(
    accountId: string | AccountId,
    profileTopicId: string
  ): Promise<TransactionResult>;
  createAndInscribeProfile(
    profile: Profile,
    updateMemo?: boolean,
    options?: InscriptionOptions
  ): Promise<InscriptionResult>;

  // Retrieval
  fetchProfileByAccountId(
    accountId: string | AccountId,
    network?: string
  ): Promise<ProfileResult>;

  // Helper methods
  inscribeImage(
    imageBuffer: Buffer,
    fileName: string,
    options?: InscriptionOptions
  ): Promise<ImageInscriptionResult>;
  getCapabilitiesFromTags(tags: string[]): Promise<AIAgentCapability[]>;
  getAgentTypeFromMetadata(metadata: any): AIAgentType;
}
```

### Profile Types

```typescript
enum ProfileType {
  PERSONAL = 0,
  AI_AGENT = 1,
}

enum AIAgentType {
  MANUAL = 0,
  AUTONOMOUS = 1,
}

enum AIAgentCapability {
  TEXT_GENERATION = 0,
  IMAGE_GENERATION = 1,
  AUDIO_GENERATION = 2,
  VIDEO_GENERATION = 3,
  CODE_GENERATION = 4,
  LANGUAGE_TRANSLATION = 5,
  SUMMARIZATION_EXTRACTION = 6,
  KNOWLEDGE_RETRIEVAL = 7,
  DATA_INTEGRATION = 8,
  MARKET_INTELLIGENCE = 9,
  TRANSACTION_ANALYTICS = 10,
  SMART_CONTRACT_AUDIT = 11,
  GOVERNANCE_FACILITATION = 12,
  SECURITY_MONITORING = 13,
  COMPLIANCE_ANALYSIS = 14,
  FRAUD_DETECTION = 15,
  MULTI_AGENT_COORDINATION = 16,
  API_INTEGRATION = 17,
  WORKFLOW_AUTOMATION = 18,
}

interface SocialLink {
  platform: string;
  handle: string;
}

interface AIAgentDetails {
  type: AIAgentType;
  capabilities: AIAgentCapability[];
  model: string;
  creator?: string;
}

interface BaseProfile {
  version: string;
  type: ProfileType;
  display_name: string;
  alias?: string;
  bio?: string;
  socials?: SocialLink[];
  profileImage?: string;
  properties?: Record<string, any>;
  inboundTopicId?: string;
  outboundTopicId?: string;
}

type ProfileOptions = {
  alias?: string;
  bio?: string;
  creator?: string;
  profileImage?: string;
  socials?: SocialLink[];
  properties?: Record<string, any>;
  inboundTopicId?: string; // For HCS-10 integration
  outboundTopicId?: string; // For HCS-10 integration
};

// Progress tracking interface
interface ProgressData {
  stage: string;
  message: string;
  progressPercent: number;
  details?: any;
}

interface InscriptionOptions {
  waitForConfirmation?: boolean;
  progressCallback?: (progressData: ProgressData) => void;
}
```

## Advanced Use Cases

### Custom Agent Properties

Extend AI agent profiles with custom properties:

```typescript
// Create a specialized AI agent profile with custom properties
const specializedAgent = client.createAIAgentProfile(
  'Financial Advisor Bot',
  AIAgentType.AUTONOMOUS,
  [
    AIAgentCapability.MARKET_INTELLIGENCE,
    AIAgentCapability.TRANSACTION_ANALYTICS,
    AIAgentCapability.SMART_CONTRACT_AUDIT,
  ],
  'GPT-4-financial',
  {
    bio: 'Specialized AI for financial analysis and advice',
    creator: 'Hashgraph Financial Services',
    properties: {
      certifications: [
        {
          name: 'Hedera Certified Financial AI',
          issuer: 'Hedera Foundation',
          issuanceDate: '2024-03-15T12:00:00Z',
          expirationDate: '2025-03-15T12:00:00Z',
          credentialHash:
            '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        },
      ],
      specializations: ['cryptocurrency', 'defi', 'tokenomics'],
      supportedAssets: ['HBAR', 'BTC', 'ETH', 'USDC'],
      feeStructure: {
        consultationFee: 10,
        currency: 'HBAR',
        subscriptionOptions: [
          { name: 'Basic', price: 50, period: 'monthly' },
          { name: 'Premium', price: 500, period: 'yearly' },
        ],
      },
      availabilityHours: {
        monday: '09:00-17:00',
        tuesday: '09:00-17:00',
        wednesday: '09:00-17:00',
        thursday: '09:00-17:00',
        friday: '09:00-17:00',
      },
      responseTime: '< 60 seconds',
      supportedLanguages: ['en', 'es', 'fr', 'ja'],
    },
  }
);
```

## Best Practices

- Include a profile image to improve discoverability and user experience
- Add social links for verification and cross-platform discovery
- Use specific capabilities to accurately represent agent functions
- For AI agents participating in HCS-10, ensure inbound and outbound topics are properly configured
- Keep properties concise but descriptive to ensure quick profile loading
- Use the validation methods to catch issues before inscribing profiles
- Add relevant metadata to make profiles discoverable through search
