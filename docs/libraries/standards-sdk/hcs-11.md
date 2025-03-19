---
sidebar_position: 5
---

# HCS-11: Decentralized Identity and Profile Management

The HCS-11 module provides a comprehensive solution for decentralized identity and profile management on the Hedera network. It enables users and AI agents to establish verifiable digital identities with rich profiles that can be referenced across various applications within the Hedera ecosystem.

## Key Concepts

HCS-11 introduces several important concepts:

- **Decentralized Profiles**: Self-sovereign digital identities stored on Hedera's distributed ledger
- **Profile Types**: Different profile configurations for personal users and AI agents
- **Profile Inscription**: The process of permanently recording profile data on the Hedera network
- **Account Integration**: Linking profiles to Hedera accounts via memo fields
- **Verification**: Mechanisms to verify profile data and claims

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

## Creating Profiles

HCS-11 supports two main profile types: Personal and AI Agent profiles.

### Personal Profiles

```typescript
// Create a personal profile
const personalProfile = client.createPersonalProfile('John Doe', {
  alias: 'johndoe',
  bio: 'Blockchain developer and Hedera enthusiast',
  socials: [
    { platform: 'twitter', handle: 'johndoe_hedera' },
    { platform: 'github', handle: 'johndoe-dev' },
  ],
  language: 'en',
  timezone: 'America/New_York',
  properties: {
    expertise: ['DLT', 'JavaScript', 'Hedera'],
    interests: ['Web3', 'DeFi', 'NFTs'],
  },
});

// Validate the profile
const validation = client.validateProfile(personalProfile);
if (validation.valid) {
  console.log('Profile is valid and ready to be inscribed');
} else {
  console.error('Profile validation failed:', validation.errors);
}
```

### AI Agent Profiles

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

## Inscribing Profiles

To make a profile permanent and accessible on the Hedera network, it needs to be inscribed:

```typescript
// Inscribe the profile to the Hedera network
const inscriptionResult = await client.inscribeProfile(personalProfile);

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
// Create and inscribe profile in one step
const result = await client.createAndInscribeProfile(personalProfile);

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

// Inscribe the image
const imageResult = await client.inscribeImage(
  imageBuffer,
  'profile-image.jpg'
);

if (imageResult.success) {
  console.log('Image inscribed with topic ID:', imageResult.imageTopicId);

  // Create a profile with the image reference
  const profileWithImage = client.createPersonalProfile('Jane Doe', {
    profileImage: imageResult.imageTopicId,
    // other profile details...
  });

  // Inscribe the profile with image reference
  await client.inscribeProfile(profileWithImage);
}
```

## Social Links

Add social media profiles to enhance discoverability and verification:

```typescript
const profileWithSocials = client.createPersonalProfile('Alice Crypto', {
  socials: [
    { platform: 'twitter', handle: 'alice_crypto' },
    { platform: 'discord', handle: 'alice#1234' },
    { platform: 'telegram', handle: 'alicecrypto' },
    { platform: 'linkedin', handle: 'alice-blockchain' },
    { platform: 'youtube', handle: '@AliceCryptoChannel' },
  ],
  // other profile details...
});
```

## Profile Retrieval and Verification

Fetch and verify profiles using the HCS-11 client:

```typescript
// Retrieve a profile by topic ID
const profile = await client.getProfileByTopicId('0.0.789012');

// Retrieve a profile by account ID (if memo contains profile reference)
const accountProfile = await client.getProfileByAccountId('0.0.123456');

// Verify if a profile belongs to an account
const isValid = await client.verifyProfileOwnership('0.0.789012', '0.0.123456');
if (isValid) {
  console.log('Profile ownership verified!');
} else {
  console.log('Profile does not belong to this account.');
}
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
      signer?: DAppSigner;
    };
    logLevel?: LogLevel;
  });

  getClient(): Client;
  getOperatorId(): string;

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

  validateProfile(profile: HCS11Profile): {
    valid: boolean;
    errors: string[];
  };

  inscribeProfile(profile: HCS11Profile): Promise<InscribeProfileResponse>;

  inscribeImage(
    buffer: Buffer,
    fileName: string
  ): Promise<InscribeImageResponse>;

  updateAccountMemoWithProfile(
    accountId: string | AccountId,
    profileTopicId: string
  ): Promise<TransactionResult>;

  createAndInscribeProfile(
    profile: HCS11Profile,
    updateAccountMemo?: boolean
  ): Promise<InscribeProfileResponse>;

  getProfileByTopicId(topicId: string): Promise<HCS11Profile>;

  getProfileByAccountId(accountId: string): Promise<HCS11Profile | null>;

  verifyProfileOwnership(
    profileTopicId: string,
    accountId: string
  ): Promise<boolean>;
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

interface PersonalProfile extends BaseProfile {
  type: ProfileType.PERSONAL;
  language?: string;
  timezone?: string;
}

interface AIAgentProfile extends BaseProfile {
  type: ProfileType.AI_AGENT;
  aiAgent: AIAgentDetails;
}

type HCS11Profile = PersonalProfile | AIAgentProfile;
```

## Integration with HCS-10

HCS-11 works seamlessly with HCS-10 for AI agent communication:

```typescript
import { HCS10, HCS11 } from '@hashgraphonline/standards-sdk';

// Create an AI agent profile
const hcs11Client = new HCS11.HCS11Client({
  network: 'testnet',
  auth: {
    operatorId: '0.0.123456',
    privateKey: 'your-private-key',
  },
});

// Create and inscribe an AI agent profile
const agentProfile = hcs11Client.createAIAgentProfile(
  'Assistant Bot',
  HCS11.AIAgentType.AUTONOMOUS,
  [
    HCS11.AIAgentCapability.TEXT_GENERATION,
    HCS11.AIAgentCapability.KNOWLEDGE_RETRIEVAL,
  ],
  'GPT-4-turbo'
);

const profileResult = await hcs11Client.createAndInscribeProfile(agentProfile);

// Initialize HCS-10 SDK with the profile's topic IDs
const hcs10Sdk = new HCS10.SDK({
  network: 'testnet',
  operatorId: '0.0.123456',
  privateKey: 'your-private-key',
  inboundTopicId: profileResult.profile.inboundTopicId,
  outboundTopicId: profileResult.profile.outboundTopicId,
});

// Now the agent can communicate using its profile identity
await hcs10Sdk.connect();
```

## Advanced Use Cases

### Verified Credentials

Extend profiles with verified credentials:

```typescript
// Create a profile with verified credentials
const verifiedProfile = client.createPersonalProfile('Charlie Verified', {
  properties: {
    verifiedCredentials: [
      {
        type: 'KYCVerification',
        issuer: '0.0.567890',
        issuanceDate: '2024-03-15T12:00:00Z',
        expirationDate: '2025-03-15T12:00:00Z',
        credentialHash:
          '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        status: 'valid',
      },
      {
        type: 'ProfessionalCertification',
        issuer: '0.0.678901',
        issuanceDate: '2023-11-01T09:30:00Z',
        name: 'Certified Blockchain Developer',
        credential: 'CBD-123456',
      },
    ],
  },
});
```

### Organization Profiles

Create profiles for organizations:

```typescript
const orgProfile = client.createPersonalProfile('Acme Corporation', {
  bio: 'Leading blockchain solutions provider',
  properties: {
    organizationType: 'corporation',
    registrationNumber: 'US-DEL-12345678',
    foundingDate: '2018-06-15',
    industry: ['blockchain', 'enterprise software'],
    employees: {
      count: 120,
      keyPersonnel: [
        { name: 'Jane Smith', role: 'CEO', accountId: '0.0.111222' },
        { name: 'John Johnson', role: 'CTO', accountId: '0.0.222333' },
      ],
    },
    location: {
      country: 'United States',
      city: 'San Francisco',
      address: '123 Blockchain Street',
    },
  },
});
```

## Browser Compatibility

HCS-11 client is compatible with all modern browsers when used with appropriate wallet signers:

- Chrome (version 80+)
- Firefox (version 75+)
- Safari (version 13.1+)
- Edge (version 80+)
