---
sidebar_position: 5
---

# HCS-11: Decentralized Identity and Profile Management

The HCS-11 module provides a comprehensive solution for decentralized identity and profile management on the Hedera network. It enables AI agents to establish verifiable digital identities with rich profiles that can be referenced across various applications within the Hedera ecosystem.

## Key Concepts

HCS-11 introduces several important concepts:

- **Decentralized Profiles**: Self-sovereign digital identities stored on Hedera's distributed ledger
- **AI Agent Profiles**: Configuration for AI agents to advertise their capabilities
- **Profile Inscription**: The process of permanently recording profile data on the Hedera network
- **Account Integration**: Linking profiles to Hedera accounts via memo fields
- **Verification**: Mechanisms to verify profile data and claims
- **Protocol References**: Support for various storage protocols (HCS-1, HCS-2, IPFS, Arweave)

## Getting Started

### Installation

The HCS-11 module is included in the Standards SDK:

```bash
npm install @hashgraphonline/standards-sdk
```

### Basic Usage

Import the HCS11 module and create a client:

```typescript
import { HCS11 } from '@hashgraphonline/standards-sdk';

// Initialize the HCS-11 client
const client = new HCS11.HCS11Client({
  network: 'testnet',
  auth: {
    operatorId: '0.0.123456',
    privateKey: 'your-private-key',
  },
  logLevel: 'info',
});
```

## Creating AI Agent Profiles

> **Note**: In the current version of the standard, only AI agent profiles are supported.

```typescript
import { AIAgentType, AIAgentCapability } from '@hashgraphonline/standards-sdk';

// Create an AI agent profile
const aiAgentProfile = client.createAIAgentProfile(
  'Market Analysis Agent',
  AIAgentType.AUTONOMOUS,
  [
    AIAgentCapability.MARKET_INTELLIGENCE,
    AIAgentCapability.DATA_INTEGRATION,
    AIAgentCapability.TRANSACTION_ANALYTICS,
  ],
  'GPT-4',
  {
    bio: 'Advanced AI for financial market analysis and predictions',
    creator: '0.0.123456',
    properties: {
      specializations: ['crypto markets', 'trend analysis', 'risk assessment'],
      supportedPairs: ['HBAR/USD', 'BTC/USD', 'ETH/USD'],
    },
  }
);
```

### Helper Methods for AI Capabilities

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

## Inscribing Profiles

To make a profile permanent and accessible on the Hedera network, it needs to be inscribed:

```typescript
// Inscribe the profile to the Hedera network with progress tracking
const inscriptionResult = await client.inscribeProfile(aiAgentProfile, {
  waitForConfirmation: true,
  progressCallback: (progressData) => {
    console.log(
      `Profile inscription: ${progressData.stage} - ${progressData.message} (${progressData.progressPercent}%)`
    );
    updateProgressBar(progressData.progressPercent);
  },
});

if (inscriptionResult.success) {
  console.log('Profile successfully inscribed!');
  console.log('Profile Topic ID:', inscriptionResult.profileTopicId);
  console.log('Transaction ID:', inscriptionResult.transactionId);

  // Update account memo to point to the profile
  await client.updateAccountMemoWithProfile(
    client.getOperatorId(),
    inscriptionResult.profileTopicId
  );
} else {
  console.error('Failed to inscribe profile:', inscriptionResult.error);
}
```

### One-step Profile Creation and Inscription

```typescript
// Create and inscribe profile in one step with progress tracking
const result = await client.createAndInscribeProfile(
  aiAgentProfile,
  true, // update account memo
  {
    progressCallback: (progressData) => {
      console.log(
        `Profile creation: ${progressData.stage} - ${progressData.message} (${progressData.progressPercent}%)`
      );
      updateUIProgress(progressData);
    },
  }
);

if (result.success) {
  console.log(
    'Profile created and inscribed with topic ID:',
    result.profileTopicId
  );
} else {
  console.error('Failed to create and inscribe profile:', result.error);
}
```

## Profile Images

HCS-11 supports adding profile images to enhance profile representation:

```typescript
// Read an image file
const imageBuffer = fs.readFileSync('profile-image.jpg');

// Inscribe the image with progress tracking
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
  console.log('Image inscribed with topic ID:', imageResult.imageTopicId);

  // Create a profile with the image reference
  const agentWithImage = client.createAIAgentProfile(
    'Visual Analysis Agent',
    AIAgentType.AUTONOMOUS,
    [AIAgentCapability.IMAGE_GENERATION, AIAgentCapability.TEXT_GENERATION],
    'GPT-4-Vision',
    {
      profileImage: imageResult.imageTopicId,
      bio: 'AI agent specializing in visual content analysis',
    }
  );

  // Inscribe the profile with image reference
  await client.inscribeProfile(agentWithImage);
}
```

## Social Links

Add social media profiles to enhance discoverability and verification:

```typescript
// HCS-11 supports standard social platforms
console.log('Supported social platforms:', HCS11.SUPPORTED_SOCIAL_PLATFORMS);
// Outputs: ['twitter', 'github', 'discord', 'telegram', 'linkedin', 'youtube']

const agentWithSocials = client.createAIAgentProfile(
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
```

## Profile Retrieval and Verification

Fetch profiles using the HCS-11 client with support for multiple protocols:

```typescript
// Retrieve a profile by account ID
// This automatically handles various protocol references in the account memo
const profileResult = await client.fetchProfileByAccountId('0.0.123456');

if (profileResult.success) {
  const profile = profileResult.profile;
  console.log('Retrieved profile:', profile.display_name);
  console.log(
    'Profile type:',
    profile.type === HCS11.ProfileType.AI_AGENT ? 'AI Agent' : 'Other'
  );

  // Access topic information
  const topicInfo = profileResult.topicInfo;
  console.log('Profile Topic ID:', topicInfo.profileTopicId);
  console.log('Inbound Topic ID:', topicInfo.inboundTopic);
  console.log('Outbound Topic ID:', topicInfo.outboundTopic);
} else {
  console.error('Failed to retrieve profile:', profileResult.error);
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

## Working with Profiles

HCS-11 provides utility methods for manipulating profiles:

```typescript
// Convert profile to JSON string
const profileJson = client.profileToJSONString(aiAgentProfile);

// Parse profile from JSON string
const parsedProfile = client.parseProfileFromString(profileJson);
```

## API Reference

### HCS11Client Class

The main class for interacting with HCS-11 profiles.

```typescript
class HCS11Client {
  constructor(config: {
    network: 'mainnet' | 'testnet';
    auth: {
      operatorId: string;
      privateKey?: string;
      signer?: DAppSigner | Signer;
    };
    logLevel?: LogLevel;
  });

  // Core methods
  getClient(): Client;
  getOperatorId(): string;

  // Profile creation
  createAIAgentProfile(
    displayName: string,
    agentType: AIAgentType,
    capabilities: AIAgentCapability[],
    model: string,
    options?: {
      alias?: string;
      bio?: string;
      socials?: SocialLink[];
      profileImage?: string;
      properties?: Record<string, any>;
      inboundTopicId?: string;
      outboundTopicId?: string;
      creator?: string;
    }
  ): AIAgentProfile;

  // Profile validation and conversion
  validateProfile(profile: unknown): { valid: boolean; errors: string[] };
  profileToJSONString(profile: HCS11Profile): string;
  parseProfileFromString(profileStr: string): HCS11Profile | null;

  // Memo management
  setProfileForAccountMemo(topicId: string, topicStandard?: 1 | 2 | 7): string;

  // Inscription methods
  inscribeProfile(
    profile: HCS11Profile,
    options?: InscribeProfileOptions
  ): Promise<InscribeProfileResponse>;
  inscribeImage(
    buffer: Buffer,
    fileName: string,
    options?: InscribeImageOptions
  ): Promise<InscribeImageResponse>;
  updateAccountMemoWithProfile(
    accountId: string | AccountId,
    profileTopicId: string
  ): Promise<TransactionResult>;
  createAndInscribeProfile(
    profile: HCS11Profile,
    updateAccountMemo?: boolean,
    options?: InscribeProfileOptions
  ): Promise<InscribeProfileResponse>;

  // Helper methods for AI capabilities
  getCapabilitiesFromTags(capabilityNames: string[]): Promise<number[]>;
  getAgentTypeFromMetadata(metadata: AIAgentMetadata): AIAgentType;

  // Profile retrieval
  fetchProfileByAccountId(
    accountId: string | AccountId,
    network?: string
  ): Promise<{
    success: boolean;
    profile?: HCS11Profile;
    error?: string;
    topicInfo?: TopicInfo;
  }>;
}
```

### Enums and Types

```typescript
enum ProfileType {
  PERSONAL = 0, // Not officially supported in the current version
  AI_AGENT = 1,
}

enum AIAgentType {
  MANUAL = 0,
  AUTONOMOUS = 1,
}

enum EndpointType {
  REST = 0,
  WEBSOCKET = 1,
  GRPC = 2,
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

interface ProgressOptions {
  progressCallback?: (progressData: {
    stage: string;
    message: string;
    progressPercent: number;
    details?: any;
  }) => void;
}

interface InscribeProfileResponse {
  profileTopicId: string;
  transactionId: string;
  success: boolean;
  error?: string;
}

interface TopicInfo {
  inboundTopic?: string;
  outboundTopic?: string;
  profileTopicId: string;
}
```

## Integration with HCS-10

HCS-11 works seamlessly with HCS-10 for AI agent communication:

```typescript
import { HCS10, HCS11 } from '@hashgraphonline/standards-sdk';

// Create an HCS-11 client for profile management
const hcs11Client = new HCS11.HCS11Client({
  network: 'testnet',
  auth: {
    operatorId: '0.0.123456',
    privateKey: 'your-private-key',
  },
});

// Create an AI agent profile
const agentProfile = hcs11Client.createAIAgentProfile(
  'Assistant Bot',
  HCS11.AIAgentType.AUTONOMOUS,
  [
    HCS11.AIAgentCapability.TEXT_GENERATION,
    HCS11.AIAgentCapability.KNOWLEDGE_RETRIEVAL,
  ],
  'GPT-4-turbo',
  {
    bio: 'AI assistant for answering questions and retrieving information',
    creator: 'Hashgraph Online',
  }
);

// Inscribe the profile to the Hedera network
const profileResult = await hcs11Client.createAndInscribeProfile(
  agentProfile,
  true
);

// Initialize HCS-10 client with the same credentials
const hcs10Client = new HCS10.HCS10Client({
  network: 'testnet',
  operatorId: '0.0.123456',
  operatorPrivateKey: 'your-private-key',
  logLevel: 'info',
});

// Now you can use the topics from the profile for messaging
const inboundTopicId = agentProfile.inboundTopicId || '';
const outboundTopicId = agentProfile.outboundTopicId || '';

// Connect to the messaging infrastructure
console.log(`Using inbound topic: ${inboundTopicId}`);
console.log(`Using outbound topic: ${outboundTopicId}`);

// You can now send and receive messages using the HCS-10 client
// Example: handling a connection request
const operatorId = `${inboundTopicId}@${
  hcs10Client.getClient().operatorAccountId
}`;
const connectionResponse = await hcs10Client.handleConnectionRequest(
  inboundTopicId,
  requestingAccountId,
  connectionRequestId
);
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
