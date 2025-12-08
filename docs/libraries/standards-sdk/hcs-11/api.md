---
title: HCS‑11 API Reference
description: Vanilla reference for HCS‑11 profile builders and client methods.
sidebar_position: 5
---

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-11
- client.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-11/client.ts
- agent-builder.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-11/agent-builder.ts
- person-builder.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-11/person-builder.ts
- mcp-server-builder.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-11/mcp-server-builder.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-11/types.ts

## Import Paths

```ts
import {
  HCS11Client,
  AgentBuilder,
  PersonBuilder,
  MCPServerBuilder,
  type HCS11ClientConfig,
  type HCS11Profile,
  type PersonalProfile,
  type AIAgentProfile,
  type MCPServerProfile,
  ProfileType,
  AIAgentType,
  AIAgentCapability,
} from '@hashgraphonline/standards-sdk/hcs-11';
```

## Types (selected)

```ts
enum ProfileType { PERSONAL=0, AI_AGENT=1, MCP_SERVER=2, FLORA=3 }
enum AIAgentType { MANUAL=0, AUTONOMOUS=1 }
enum AIAgentCapability { /* bit flags */ TEXT_GENERATION=1 /* … */ }

interface HCS11ClientConfig {
  network: 'mainnet' | 'testnet';
  auth: { operatorId: string; privateKey?: string; signer?: any };
  logLevel?: 'debug'|'info'|'warn'|'error';
  keyType?: 'ed25519'|'ecdsa';
  silent?: boolean;
}
```

## Builders

```ts
new AgentBuilder();
new PersonBuilder();
new MCPServerBuilder();
```

## Client (HCS11Client)

```ts
constructor(config: HCS11ClientConfig)

getClient(): import('@hashgraph/sdk').Client
getOperatorId(): string
initializeOperator(): Promise<void>

// Create profiles (in‑memory)
createPersonalProfile(displayName: string, options?): PersonalProfile
createAIAgentProfile(displayName: string, type: AIAgentType, caps: AIAgentCapability[], model: string, options?): AIAgentProfile
createMCPServerProfile(displayName: string, server: MCPServerDetails, options?): MCPServerProfile

// Validation/format helpers
validateProfile(profile: unknown): { valid: boolean; errors: string[] }
profileToJSONString(profile: HCS11Profile): string
parseProfileFromString(profileStr: string): HCS11Profile | null
setProfileForAccountMemo(topicId: string, topicStandard?: 1|2|7): string // hcs-11:hcs://<std>/<topicId>

// Inscription flows
inscribeImage(buffer: Buffer, fileName: string, options?): Promise<{ success: boolean; topicId?: string; transactionId?: string; totalCostHbar?: string; error?: string }>
inscribeProfile(profile: HCS11Profile, options?): Promise<{ success: boolean; profileTopicId?: string; transactionId?: string; totalCostHbar?: string; error?: string }>
createAndInscribeProfile(builder: AgentBuilder|PersonBuilder|MCPServerBuilder, updateAccountMemo?: boolean): Promise<{ success: boolean; profileTopicId?: string; transactionId?: string; totalCostHbar?: string; error?: string }>
updateAccountMemoWithProfile(accountId: string, profileTopicId: string): Promise<{ success: boolean; error?: string }>

// Discovery helpers
getCapabilitiesFromTags(tags: string[]): Promise<number[]>
getAgentTypeFromMetadata(meta: AgentMetadata): AIAgentType
fetchProfileByAccountId(accountId: string, network?: string): Promise<{ success: boolean; profile?: HCS11Profile; error?: string; topicInfo?: any }>
```

Notes
- Works with both private key operator and wallet signer; auto‑detects key curve or queries Mirror Node.
- Progress callbacks for inscription are supported via options.

Source
- https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-11/client.ts

## Example

```ts
const client = new HCS11Client({ network: 'testnet', auth: { operatorId, privateKey } });
const profile = client.createAIAgentProfile('Bot', AIAgentType.AUTONOMOUS, [AIAgentCapability.TEXT_GENERATION], 'gpt-4');
const res = await client.inscribeProfile(profile, { waitForConfirmation: true });
```
