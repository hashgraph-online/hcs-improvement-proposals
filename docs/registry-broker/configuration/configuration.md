---
id: registry-broker-configuration-configuration
title: Configuration Guide
description: Quick reference for configuring the Registry Broker
---

# Configuration Guide

Quick reference for configuring the Registry Broker.

## Quick Start

Run with defaults (no configuration required):

```bash
npm start
```

## Environment Variables

### Server
```bash
PORT=4000                    # Server port
HOST=0.0.0.0                # Server host
NODE_ENV=production         # Environment
```

### Database
```bash
DATABASE_HOST=localhost     # PostgreSQL host
DATABASE_PORT=5432          # PostgreSQL port
DATABASE_NAME=registry_broker
DATABASE_USERNAME=registry_user
DATABASE_PASSWORD=secure_password
```

### Redis
```bash
REDIS_HOST=localhost        # Redis host
REDIS_PORT=6379             # Redis port
REDIS_PASSWORD=password     # Redis password
```

### Features
```bash
SEARCH_ENABLED=true         # Enable search
CHAT_ENABLED=true           # Enable chat
REGISTRATION_ENABLED=true   # Enable registration
WEBSOCKET_ENABLED=true      # Enable WebSocket
```

### Adapters
```bash
A2A_ADAPTER_ENABLED=true    # A2A protocol
ERC8004_ADAPTER_ENABLED=true # ERC-8004 protocol
MCP_ADAPTER_ENABLED=true    # MCP protocol
OPENROUTER_ADAPTER_ENABLED=true # OpenRouter
```

### Hedera
```bash
HEDERA_NETWORK=testnet      # hedera network
HEDERA_OPERATOR_ID=0.0.xxxx # Hedera account
HEDERA_OPERATOR_KEY=key     # Hedera private key
```

### Credits
```bash
CREDITS_ENABLED=true        # Enable credits
AUTO_TOPUP_ENABLED=false    # Auto top-up credits
CREDIT_THRESHOLD=100        # Low credit warning
```

## Configuration File

Create `registry-broker.config.json`:

```json
{
  "mode": "distributed",
  "server": {
    "port": 4000,
    "host": "0.0.0.0"
  },
  "database": {
    "host": "localhost",
    "port": 5432,
    "database": "registry_broker",
    "username": "registry_user",
    "password": "secure_password"
  },
  "features": {
    "search": true,
    "chat": true,
    "registration": true,
    "metrics": true
  }
}
```

## Operation Modes

### Standalone (Default)
- No database required
- Single process
- Perfect for development

### Distributed
- PostgreSQL required
- Redis required
- Multi-instance support
- Production ready

### Kubernetes
- Microservices architecture
- Auto-scaling
- High availability

## Common Configurations

### Development
```bash
NODE_ENV=development
LOG_LEVEL=debug
SEARCH_ENABLED=true
CHAT_ENABLED=true
```

### Production
```bash
NODE_ENV=production
DATABASE_HOST=postgres.prod
REDIS_HOST=redis.prod
SSL_ENABLED=true
```

## Next Steps

- [Docker Deployment](docker.md) - Container setup
