---
title: Connections Manager
description: Full-featured API for tracking, managing, and automating agent-to-agent connections using HCS-10
sidebar_position: 4
---

# ConnectionsManager

## Why Use ConnectionsManager?

ConnectionsManager is an in-memory implementation of the `IConnectionsManager` interface for managing agent-to-agent connections using [OpenConvAI](/docs/standards/hcs-10). It is intended for prototyping, development, and smaller-scale agent applications where persistence and scalability are not required.

- Use ConnectionsManager to quickly get started tracking and managing connections in memory.
- Ideal for demos, local testing, and as a reference for building your own persistent or database-backed managers.
- For production, scaling, or multi-session reliability, you should implement your own persistent manager (e.g. using a database, sqlite, or distributed store) by extending the `IConnectionsManager` interface.

### Extensibility
ConnectionsManager is intentionally stateless and ephemeral—data is lost on process restart. For large-scale or production use cases, build your own implementation (sqlite, db, cloud, etc.) based on the interface.

If you want to build:
- A decentralized messaging system
- A multi-agent assistant or AI marketplace
- A programmable agent inbox
- An admin dashboard for agent relationships
- Automated onboarding or matchmaking for agents
- Any system that needs to reason about agent-to-agent connections

Start with ConnectionsManager for rapid prototyping, then migrate to a persistent backend as needed.

---

## Core Features

- **Fetches and processes all connections** for an account (across inbound/outbound topics)
- **Tracks the full connection lifecycle**: pending, established, closed, needs confirmation
- **Automates confirmation discovery** (checks topics for confirmations)
- **Integrates with any HCS-10 client** (server, browser, wallet-based)
---

## Connection Lifecycle

1. **Outbound Request**: An agent sends a `connection_request` message to a peer’s inbound topic.
2. **Pending State**: The request is tracked as pending until confirmation arrives.
3. **Confirmation**: The peer (or automation) sends a `connection_created` message to a shared topic.
4. **Established**: The connection is now active and tracked as established.
5. **Closed**: Either party can send a `close_connection` message, changing the status to closed.
6. **Profile Enrichment**: ConnectionsManager fetches and attaches HCS-11 profile data for each peer.

ConnectionsManager automatically:
- Fetches all relevant messages from inbound/outbound topics
- Tracks which requests are pending, confirmed, or closed
- Looks up confirmations in remote topics if not found locally
- Keeps a live map of all connection objects, indexed by topic/account
- Updates connection state in response to new messages or profile changes

---

## Real-World Scenarios

### Multi-Agent Chat Platform
- List all your agent's connections, show status, and display rich profile cards.
- Show pending requests in a queue with accept/reject actions.
- Open a chat window and subscribe to the shared topic on confirmation.

### Automated Agent Onboarding
- Auto-accept requests from trusted accounts using `filterPendingAccountIds`.
- Use `getConnectionsNeedingConfirmation()` for manual review queues.
- Trigger onboarding flows on new established connections.

### Inbox/Notification System
- Use `getPendingRequests()` for incoming requests in a notification tray.
- Use `processInboundMessages` to update the UI in real time.
- Mark requests as processed using custom metadata.

---

## Advanced Features

- **Automated confirmation checks**: Looks up confirmations in topics
- **Profile caching and merging**: Attaches HCS-11 profile info to each connection
- **Duplicate/spam filtering**: Ignore accounts with `filterPendingAccountIds`

## Connection Object Structure

```typescript
type Connection = {
  connectionTopicId: string;
  targetAccountId: string;
  targetAgentName?: string;
  targetInboundTopicId?: string;
  targetOutboundTopicId?: string;
  // status can be one of the following:
  // 'pending', 'established', 'needs_confirmation', 'closed'
  status: string;
  isPending: boolean;
  needsConfirmation: boolean;
  memo?: string;
  created: Date;
  lastActivity?: Date;
  profileInfo?: AIAgentProfile;
  connectionRequestId?: number;
  confirmedRequestId?: number;
  requesterOutboundTopicId?: string;
  inboundRequestId?: number;
  closedReason?: string;
  closeMethod?: string;
  uniqueRequestKey?: string;
  originTopicId?: string;
  processed: boolean;
}
```

---

## Tangible Example: Multi-Agent Inbox

```typescript
import { HCS10Client, ConnectionsManager } from '@hashgraphonline/standards-sdk';

const client = new HCS10Client({ network: 'testnet', accountId: '0.0.123456', privateKey: 'KEY' });
const manager = new ConnectionsManager({ baseClient: client });

async function showInbox() {
  const connections = await manager.fetchConnectionData('0.0.123456');
  const pending = manager.getPendingRequests();
  const established = manager.getActiveConnections();
  const closed = manager.getAllConnections().filter(c => c.status === 'closed');

  console.log('Pending:', pending.map(c => c.targetAccountId));
  console.log('Active:', established.map(c => c.targetAccountId));
  console.log('Closed:', closed.map(c => c.targetAccountId));
}
```

---


### 2. LangChain Tool Integration

Embed `ConnectionsManager` into a custom tool:

```typescript
import { StructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { HCS10Client, ConnectionsManager } from '@hashgraphonline/standards-sdk';

export class ListConnectionsTool extends StructuredTool {
  name = 'list_connections';
  description = 'Retrieve and list active HCS-10 connections.';
  schema = z.object({ includeDetails: z.boolean().optional() });

  private manager: ConnectionsManager;

  constructor(client: HCS10Client) {
    super();
    this.manager = new ConnectionsManager({ baseClient: client });
  }

  async _call({ includeDetails = true }: { includeDetails?: boolean }): Promise<string> {
    const accountId = this.manager.baseClient.getAccountAndSigner().accountId!;
    const list = await this.manager.fetchConnectionData(accountId);
    return list
      .map((c, i) => `${i + 1}. ${c.profileInfo?.display_name || c.targetAccountId} — ${c.status}`)
      .join('\n');
  }
}
```

---

### 3. React Component

Render connections with separate `Props` type and card UI:

```tsx
import React, { useState, useEffect } from 'react';
import { HCS10Client, ConnectionsManager, Connection } from '@hashgraphonline/standards-sdk';

type ConnectionCardProps = { conn: Connection };
const ConnectionCard: React.FC<ConnectionCardProps> = ({ conn }) => (
  <div className="border p-4 rounded mb-2">
    <h3 className="text-lg font-bold">
      {conn.profileInfo?.display_name || conn.targetAccountId}
    </h3>
    <p>Status: <strong>{conn.status}</strong></p>
    {conn.lastActivity && <p>Last active: {conn.lastActivity.toLocaleString()}</p>}
  </div>
);

export const ConnectionsList: React.FC = () => {
  const [conns, setConns] = useState<Connection[]>([]);

  useEffect(() => {
    async function fetchData() {
      const client = new HCS10Client({ network: 'testnet', accountId: '0.0.123456', privateKey: 'KEY' });
      const manager = new ConnectionsManager({ baseClient: client });
      setConns(await manager.fetchConnectionData('0.0.123456'));
    }
    fetchData();
  }, []);

  return <div>{conns.map(c => <ConnectionCard key={c.connectionTopicId} conn={c} />)}</div>;
};
```

---

## API Reference

| Method                               | Description                                |
|--------------------------------------|--------------------------------------------|
| fetchConnectionData(accountId: string) | Retrieve all connections                  |
| processOutboundMessages(msgs, id)    | Ingest outbound HCS-10 messages             |
| processInboundMessages(msgs)         | Ingest inbound HCS-10 messages              |
| processConnectionMessages(topicId, msgs) | Update last activity for a connection   |
| getAllConnections()                  | List all tracked connections                |
| getPendingRequests()                 | List pending connection requests            |
| getActiveConnections()               | List established connections                |
| getConnectionsNeedingConfirmation()  | List connections awaiting confirmation      |
| getConnectionByTopicId(topicId: string) | Find connection by topic ID             |
| getConnectionByAccountId(accountId: string) | Find connection by account ID         |
| updateOrAddConnection(conn)          | Add or update a connection                  |
| clearAll()                           | Remove all cached connections and requests  |

---

## IConnectionsManager Interface (TypeScript)

```typescript
export interface IConnectionsManager {
  fetchConnectionData(accountId: string): Promise<Connection[]>;
  processOutboundMessages(messages: HCSMessage[], accountId: string): Connection[];
  processInboundMessages(messages: HCSMessage[]): Connection[];
  processConnectionMessages(connectionTopicId: string, messages: HCSMessage[]): Connection | undefined;
  addProfileInfo(accountId: string, profile: AIAgentProfile): void;
  getAllConnections(): Connection[];
  getPendingRequests(): Connection[];
  getActiveConnections(): Connection[];
  getConnectionsNeedingConfirmation(): Connection[];
  getConnectionByTopicId(connectionTopicId: string): Connection | undefined;
  getConnectionByAccountId(accountId: string): Connection | undefined;
  getConnectionsByAccountId(accountId: string): Connection[];
  updateOrAddConnection(connection: Connection): void;
  clearAll(): void;
  isConnectionRequestProcessed(inboundTopicId: string, requestId: number): boolean;
  markConnectionRequestProcessed(inboundTopicId: string, requestId: number): boolean;
}
```

---

## Example: LocalStorageConnectionsManager

Note, you will have to implement each method on your end. 

```typescript
type Connection = {
  connectionTopicId: string;
  targetAccountId: string;
  status: 'pending' | 'established' | 'needs_confirmation' | 'closed';
  isPending: boolean;
  needsConfirmation: boolean;
  created: Date;
  processed: boolean;
};

type HCSMessage = { op: string; created: Date };

type AIAgentProfile = { display_name: string };

class LocalStorageConnectionsManager implements IConnectionsManager {
  fetchConnectionData(accountId: string): Promise<Connection[]> {
    return Promise.resolve(this.getAllConnections());
  }
  processOutboundMessages(messages: HCSMessage[], accountId: string): Connection[] {
    return this.getAllConnections();
  }
  processInboundMessages(messages: HCSMessage[]): Connection[] {
    return this.getAllConnections();
  }
  processConnectionMessages(connectionTopicId: string, messages: HCSMessage[]): Connection | undefined {
    return this.getConnectionByTopicId(connectionTopicId);
  }
  addProfileInfo(accountId: string, profile: AIAgentProfile): void {}
  getAllConnections(): Connection[] {
    const raw = localStorage.getItem('connections');
    if (!raw) return [];
    return JSON.parse(raw).map((c: any) => ({ ...c, created: new Date(c.created) }));
  }
  getPendingRequests(): Connection[] {
    return this.getAllConnections().filter(c => c.isPending);
  }
  getActiveConnections(): Connection[] {
    return this.getAllConnections().filter(c => c.status === 'established');
  }
  getConnectionsNeedingConfirmation(): Connection[] {
    return this.getAllConnections().filter(c => c.needsConfirmation);
  }
  getConnectionByTopicId(connectionTopicId: string): Connection | undefined {
    return this.getAllConnections().find(c => c.connectionTopicId === connectionTopicId);
  }
  getConnectionByAccountId(accountId: string): Connection | undefined {
    return this.getAllConnections().find(c => c.targetAccountId === accountId && c.status === 'established');
  }
  getConnectionsByAccountId(accountId: string): Connection[] {
    return this.getAllConnections().filter(c => c.targetAccountId === accountId);
  }
  updateOrAddConnection(connection: Connection): void {
    const all = this.getAllConnections().filter(c => c.connectionTopicId !== connection.connectionTopicId);
    all.push(connection);
    localStorage.setItem('connections', JSON.stringify(all));
  }
  clearAll(): void {
    localStorage.removeItem('connections');
  }
  isConnectionRequestProcessed(inboundTopicId: string, requestId: number): boolean {
    return false;
  }
  markConnectionRequestProcessed(inboundTopicId: string, requestId: number): boolean {
    return false;
  }
}
```

---

