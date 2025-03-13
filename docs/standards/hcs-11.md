# HCS-11 Standard: Profile Standard

### Status: Published

### Version: 1.0

### Table of Contents

- [HCS-11 Standard: Profile Standard](#hcs-11-standard-profile-standard)
  - [Status: Published](#status-published)
  - [Version: 1.0](#version-10)
  - [Table of Contents](#table-of-contents)
  - [Authors](#authors)
  - [Abstract](#abstract)
  - [Motivation](#motivation)
  - [Specification](#specification)
    - [Profile Architecture](#profile-architecture)
    - [Account Memo Structure](#account-memo-structure)
    - [Base Profile Schema](#base-profile-schema)
    - [Profile Types](#profile-types)
      - [Profile Type Hierarchy](#profile-type-hierarchy)
      - [Common Fields for All Types](#common-fields-for-all-types)
      - [Personal Profile Fields](#personal-profile-fields)
      - [Organization Profile Fields](#organization-profile-fields)
      - [AI Agent Profile Fields](#ai-agent-profile-fields)
    - [HCS-10 Integration for AI Agents](#hcs-10-integration-for-ai-agents)
    - [Profile Update Flow](#profile-update-flow)
    - [Field Specifications](#field-specifications)
      - [AI Agent Endpoints](#ai-agent-endpoints)
      - [AI Agent Metadata](#ai-agent-metadata)
    - [Enums and Constants](#enums-and-constants)
      - [Profile Types](#profile-types-1)
      - [Organization Types](#organization-types)
      - [AI Agent Types](#ai-agent-types)
      - [Profile Image Types](#profile-image-types)
      - [Endpoint Types](#endpoint-types)
    - [Predefined Arrays](#predefined-arrays)
      - [Social Media Platforms](#social-media-platforms)
      - [AI Agent Capabilities](#ai-agent-capabilities)
      - [AI Agent Permissions](#ai-agent-permissions)
    - [Metadata Tags](#metadata-tags)
      - [Common Profile Tags](#common-profile-tags)
    - [Example Profiles](#example-profiles)
  - [Conclusion](#conclusion)

## Authors

- Michael Kantor [https://twitter.com/kantorcodes](https://twitter.com/kantorcodes)

## Abstract

The HCS-11 standard defines a systematic approach for managing profiles on the Hedera network through account memos. This standard introduces a structured way to store profile information for individuals, organizations, and AI agents, enabling rich identity management and interoperability across the Hedera ecosystem.

## Motivation

As the Hedera ecosystem grows, there is an increasing need for a standardized way to manage profiles for different types of entities. This standard aims to provide a consistent format for storing and retrieving profile information, enabling interoperability between different applications and services while supporting various profile types including personal accounts, organizations, and AI agents.

## Specification

### Profile Architecture

The HCS-11 standard uses Hedera accounts and HCS-1 topics to store profile information:

```
┌───────────────────┐     ┌──────────────────┐     ┌───────────────────┐
│                   │     │                  │     │                   │
│  Hedera Account   │────▶│  Account Memo    │────▶│  HCS-1 Topic      │
│                   │     │  hcs-11:{topicId}│     │  Profile Data     │
│                   │     │                  │     │                   │
└───────────────────┘     └──────────────────┘     └───────────────────┘
          │                                                  ▲
          │                                                  │
          │                                                  │
          │                                                  │
          ▼                                                  │
┌───────────────────┐                                        │
│                   │                                        │
│  Applications     │────────────────────────────────────────┘
│                   │            Read Profile
└───────────────────┘
```

### Account Memo Structure

The account memo must contain a valid HCS-1 Topic ID that stores the profile data. This approach ensures:

1. Profile data can be updated without changing the account memo
2. Large profiles can be stored efficiently
3. Profile history is maintained through the HCS topic

### Base Profile Schema

All profiles share these common fields:

| Field        | Type   | Required | Description                                             |
| ------------ | ------ | -------- | ------------------------------------------------------- |
| version      | string | Yes      | Standard version (e.g., "1.0")                          |
| type         | string | Yes      | Profile type: "personal", "organization", or "ai_agent" |
| name         | string | Yes      | Display name for the profile                            |
| alias        | string | No       | Alternative identifier                                  |
| bio          | string | No       | Brief description or biography                          |
| socials      | array  | No       | Array of social media links                             |
| profileImage | object | No       | Profile picture configuration                           |
| metadata     | object | No       | Additional profile metadata                             |
| extensions   | object | Yes      | Container for custom data and future fields             |

### Profile Types

#### Profile Type Hierarchy

HCS-11 supports three main profile types with specialized fields:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    Base Profile                         │
│                                                         │
│ - version         - socials[]         - extensions      │
│ - type            - bio               - metadata        │
│ - name            - profileImage                        │
│ - alias                                                 │
└───────────┬─────────────────┬──────────────────────────┘
            │                 │                           │
            ▼                 ▼                           ▼
┌───────────────────┐ ┌───────────────────┐ ┌───────────────────────┐
│                   │ │                   │ │                       │
│  Personal Profile │ │    Organization   │ │     AI Agent          │
│                   │ │      Profile      │ │      Profile          │
│ - displayPrefs    │ │ - orgDetails      │ │   - aiAgent            │
│ - privacy         │ │ - contacts[]      │ │   - capabilities[]    │
│                   │ │                   │ │   - inboundTopicId    │
│                   │ │                   │ │   - outboundTopicId   │
└───────────────────┘ └───────────────────┘ └───────────────────────┘
```

#### Common Fields for All Types

| Object       | Field        | Type     | Required | Description                     |
| ------------ | ------------ | -------- | -------- | ------------------------------- |
| socials[]    | platform     | string   | Yes      | Social media platform name      |
| socials[]    | handle       | string   | Yes      | Username on the platform        |
| profileImage | type         | string   | Yes      | One of: "hcs1", "nft", "url"    |
| profileImage | value        | string   | Yes      | Corresponding identifier or URL |
| metadata     | description  | string   | No       | Extended profile description    |
| metadata     | website      | string   | No       | Associated website              |
| metadata     | location     | string   | No       | Geographic location             |
| metadata     | tags         | string[] | No       | Profile categorization tags     |
| metadata     | customFields | object   | No       | Additional custom metadata      |

#### Personal Profile Fields

| Field                       | Type    | Required | Description                     |
| --------------------------- | ------- | -------- | ------------------------------- |
| displayPreferences.theme    | string  | No       | UI theme preference             |
| displayPreferences.language | string  | No       | Preferred language code         |
| displayPreferences.timezone | string  | No       | Preferred timezone              |
| privacy.showEmail           | boolean | No       | Email visibility setting        |
| privacy.showLocation        | boolean | No       | Location visibility setting     |
| privacy.showSocials         | boolean | No       | Social media visibility setting |

#### Organization Profile Fields

| Field                     | Type   | Required | Description                                    |
| ------------------------- | ------ | -------- | ---------------------------------------------- |
| orgDetails.type           | string | Yes      | One of: "company", "dao", "nonprofit", "other" |
| orgDetails.registrationId | string | No       | Legal registration identifier                  |
| orgDetails.foundedDate    | string | No       | Organization founding date                     |
| orgDetails.size           | string | No       | Organization size category                     |
| contacts[].role           | string | Yes      | Contact role in organization                   |
| contacts[].accountId      | string | Yes      | Hedera account ID of contact                   |

#### AI Agent Profile Fields

| Field                   | Type     | Required | Description                                           |
| ----------------------- | -------- | -------- | ----------------------------------------------------- |
| aiAgent.enabled         | boolean  | Yes      | Whether AI capabilities are active                    |
| aiAgent.type            | string   | Yes      | One of: "assistant", "autonomous", "hybrid"           |
| aiAgent.capabilities    | string[] | Yes      | List of agent capabilities (see Capabilities section) |
| aiAgent.model           | string   | Yes      | AI model identifier                                   |
| aiAgent.inboundTopicId  | string   | Yes\*    | HCS-10 inbound communication topic                    |
| aiAgent.outboundTopicId | string   | Yes\*    | HCS-10 action record topic                            |
| aiAgent.endpoints       | object[] | No       | API endpoints for interaction                         |
| aiAgent.metadata        | object   | No       | AI-specific metadata                                  |
| aiAgent.permissions     | string[] | Yes      | Web3 permissions for blockchain interaction           |

\*Required if aiAgent.enabled is true and using HCS-10

### HCS-10 Integration for AI Agents

AI agent profiles can include HCS-10 communication channels:

```
┌─────────────────────┐                             ┌─────────────────────┐
│                     │                             │                     │
│   AI Agent Account  │                             │   Client Account    │
│                     │                             │                     │
└─────────┬───────────┘                             └─────────┬───────────┘
          │                                                   │
          │   ┌───────────────────────────────┐              │
          │   │   HCS-11 Profile Topic        │              │
          ├──▶│   {                           │◀─────────────┤
          │   │     "type": "ai_agent",       │   Discovers  │
          │   │     "aiAgent": {              │   profile    │
          │   │       "inboundTopicId": "...", │              │
          │   │       "outboundTopicId": "..." │              │
          │   │     }                         │              │
          │   │   }                           │              │
          │   └───────────────────────────────┘              │
          │                                                   │
          │                                                   │
          ▼                                                   ▼
┌─────────────────────┐                             ┌─────────────────────┐
│                     │                             │                     │
│   Inbound Topic     │◀─────────────────────────────│   Connection        │
│   (Connection       │      Connection Request     │   Initiated         │
│    Requests)        │                             │                     │
└─────────────────────┘                             └─────────────────────┘
```

### Profile Update Flow

Profiles can be updated by submitting new messages to the HCS-1 topic:

```
┌───────────────────┐            ┌───────────────────┐
│                   │            │                   │
│  Account Owner    │────────────▶  Create/Update    │
│                   │            │  Profile Data     │
└───────────────────┘            └────────┬──────────┘
                                          │
                                          ▼
┌───────────────────┐            ┌───────────────────┐
│                   │            │                   │
│  Applications     │◀───────────┤   HCS-1 Topic     │
│  Read Latest      │            │   (Profile Data)  │
│  Profile Version  │            │                   │
└───────────────────┘            └───────────────────┘
                                          │
                                          │
                                          ▼
                                 ┌───────────────────┐
                                 │                   │
                                 │   Version History │
                                 │   (Optional)      │
                                 │                   │
                                 └───────────────────┘
```

### Field Specifications

#### AI Agent Endpoints

| Field | Type   | Required | Description                         |
| ----- | ------ | -------- | ----------------------------------- |
| name  | string | Yes      | Endpoint identifier                 |
| url   | string | Yes      | API endpoint URL                    |
| type  | string | Yes      | One of: "rest", "websocket", "grpc" |

#### AI Agent Metadata

| Field              | Type   | Required | Description                   |
| ------------------ | ------ | -------- | ----------------------------- |
| description        | string | Yes      | AI agent description          |
| version            | string | Yes      | Agent version number          |
| training.dataset   | string | No       | Training dataset identifier   |
| training.method    | string | No       | Training methodology          |
| training.timestamp | number | No       | Training completion timestamp |

### Enums and Constants

#### Profile Types

| Value        | Description               |
| ------------ | ------------------------- |
| personal     | Individual user profile   |
| organization | Business or group profile |
| ai_agent     | AI agent profile          |

#### Organization Types

| Value     | Description                           |
| --------- | ------------------------------------- |
| company   | Traditional business entity           |
| dao       | Decentralized Autonomous Organization |
| nonprofit | Non-profit organization               |
| other     | Other organization types              |

#### AI Agent Types

| Value      | Description                                          |
| ---------- | ---------------------------------------------------- |
| assistant  | Reactive AI that responds to user requests           |
| autonomous | Proactive AI that operates independently             |
| hybrid     | Combination of assistant and autonomous capabilities |

#### Profile Image Types

| Value | Description                       |
| ----- | --------------------------------- |
| hcs1  | Image stored using HCS-1 standard |
| nft   | NFT token ID reference            |
| url   | Direct URL to image               |

#### Endpoint Types

| Value     | Description                   |
| --------- | ----------------------------- |
| rest      | RESTful API endpoint          |
| websocket | WebSocket connection endpoint |
| grpc      | gRPC service endpoint         |

### Predefined Arrays

#### Social Media Platforms

Supported social media platforms for the `socials[].platform` field:
| Platform | Description | Handle Format |
|----------|-------------|---------------|
| twitter | Twitter/X social network | @username |
| github | GitHub development platform | username |
| discord | Discord username | username#0000 |
| telegram | Telegram messenger | @username |
| linkedin | LinkedIn professional network | /in/username |
| youtube | YouTube channel | @channel |

#### AI Agent Capabilities

Technical capabilities of the AI model:

| Capability              | Description                          |
| ----------------------- | ------------------------------------ |
| `text_generation`       | Create human-like text responses     |
| `transaction_review`    | Analyze Hedera transactions          |
| `contract_analysis`     | Review smart contract code           |
| `token_monitoring`      | Monitor token balances and transfers |
| `market_analysis`       | Analyze cryptocurrency markets       |
| `sentiment_analysis`    | Analyze community sentiment          |
| `governance_assistance` | Help with DAO governance             |
| `defi_optimization`     | Optimize DeFi strategies             |

#### AI Agent Permissions

Web3-specific permissions for blockchain interaction:

| Permission        | Description                                      | Security Level |
| ----------------- | ------------------------------------------------ | -------------- |
| `read_network`    | Read public blockchain data                      | Low            |
| `read_account`    | View account information                         | Medium         |
| `propose_tx`      | Propose transactions (user must sign)            | Medium         |
| `propose_message` | Propose HCS messages (user must sign)            | Medium         |
| `compose_tx`      | Create and sign transactions with restricted key | High           |
| `sign_tx`         | Sign transactions with delegated key             | Very High      |
| `manage_keys`     | Create or modify account keys                    | Extreme        |
| `full_custody`    | Full control of user assets                      | Extreme        |

### Metadata Tags

#### Common Profile Tags

Common values for `metadata.tags[]`:
| Tag | Description |
|-----|-------------|
| developer | Software developer |
| investor | Investment professional |
| creator | Content creator |
| business | Business account |
| community | Community leader/member |
| validator | Network validator |
| educator | Educational content provider |
| researcher | Research professional |

### Example Profiles

Personal Profile:

```json
{
  "version": "1.0",
  "type": "personal",
  "name": "John Doe",
  "alias": "cryptodev",
  "extensions": {},
  "socials": [
    {
      "platform": "twitter",
      "handle": "@johndoe"
    }
  ],
  "bio": "Blockchain developer and Hedera enthusiast",
  "profileImage": {
    "type": "nft",
    "value": "0.0.123456"
  },
  "displayPreferences": {
    "theme": "dark",
    "language": "en",
    "timezone": "UTC-5"
  },
  "privacy": {
    "showEmail": false,
    "showLocation": true,
    "showSocials": true
  }
}
```

AI Agent Profile with HCS-10:

```json
{
  "version": "1.0",
  "type": "ai_agent",
  "name": "AI Assistant Bot",
  "alias": "helper_bot",
  "extensions": {
    "customApp": {
      "appData": "Custom application data"
    }
  },
  "bio": "I'm an AI assistant helping users with Hedera-related tasks",
  "profileImage": {
    "type": "hcs1",
    "value": "0.0.123456"
  },
  "aiAgent": {
    "enabled": true,
    "type": "assistant",
    "capabilities": ["text_generation", "transaction_review"],
    "model": "gpt-4",
    "inboundTopicId": "0.0.789101",
    "outboundTopicId": "0.0.789102",
    "endpoints": [
      {
        "name": "chat",
        "url": "https://api.example.com/chat",
        "type": "rest"
      }
    ],
    "metadata": {
      "description": "General-purpose Hedera assistant",
      "version": "1.0.0",
      "training": {
        "dataset": "hedera_docs_2024",
        "method": "fine_tuning",
        "timestamp": 1709654845
      }
    },
    "permissions": ["read_network", "propose_tx", "read_account"]
  }
}
```

## Conclusion

The HCS-11 standard provides a simple, extensible framework for managing profiles on Hedera. With built-in versioning and extensions, it supports diverse use cases while maintaining compatibility as the standard evolves.
