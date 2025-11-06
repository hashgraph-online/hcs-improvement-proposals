---
id: registry-broker-configuration-docker
title: Docker Deployment
description: Deploy Registry Broker using Docker Compose
---

# Docker Deployment

Deploy Registry Broker using Docker Compose.

## Quick Start

### Basic Deployment (No Hedera)

```bash
# Start core services
docker compose up -d

# View logs
docker compose logs -f registry-broker

# Stop services
docker compose down
```

### Development Setup

```bash
# Start with development profile
docker compose --profile dev up -d

# Access services:
# - Registry Broker: http://localhost:4000
# - Frontend: http://localhost:5173  
# - Kibana: http://localhost:5601
```

### Production Deployment

```bash
# Start production profile
docker compose --profile prod up -d

# With custom configuration
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Docker Compose Profiles

### Default Profile
Core services only:
- Registry Broker
- Elasticsearch
- PostgreSQL (optional)

### Development Profile (`dev`)
Additional development tools:
- Kibana (log visualization)
- Frontend development server
- Test agent container
- Redis UI

### Full Profile (`full`)
Complete stack:
- Vector database (Qdrant)
- RocksDB sidecar
- All default services
- Monitoring tools

### Production Profile (`prod`)
Production-optimized:
- Optimized resource usage
- Health checks
- Production configurations
- Logging aggregation

## Environment Setup

### Create .env file

```bash
# Core Configuration
NODE_ENV=production
PORT=4000

# Database
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=registry_broker
DATABASE_USERNAME=registry_user
DATABASE_PASSWORD=secure_password

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=redis_password

# Features
SEARCH_ENABLED=true
CHAT_ENABLED=true
REGISTRATION_ENABLED=true
WEBSOCKET_ENABLED=true

# Hedera (optional)
HEDERA_NETWORK=testnet
HEDERA_OPERATOR_ID=0.0.xxxx
HEDERA_OPERATOR_KEY=your_private_key

# Credits
CREDITS_ENABLED=true
AUTO_TOPUP_ENABLED=false
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | development | Environment mode |
| `PORT` | 4000 | Server port |
| `DATABASE_HOST` | postgres | PostgreSQL host |
| `REDIS_HOST` | redis | Redis host |
| `HEDERA_NETWORK` | testnet | Hedera network |
| `SEARCH_ENABLED` | true | Enable search |
| `CHAT_ENABLED` | true | Enable chat |
| `REGISTRATION_ENABLED` | true | Enable registration |

## Service Configuration

### Registry Broker Service

```yaml
services:
  registry-broker:
    image: hashgraphonline/registry-broker:latest
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - DATABASE_HOST=postgres
      - REDIS_HOST=redis
    depends_on:
      - postgres
      - redis
    volumes:
      - ./config:/app/config
      - ./logs:/var/log
    restart: unless-stopped
```

### PostgreSQL Service

```yaml
services:
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=registry_broker
      - POSTGRES_USER=registry_user
      - POSTGRES_PASSWORD=secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
```

### Redis Service

```yaml
services:
  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    restart: unless-stopped
```

## Volume Management

### Named Volumes

```yaml
volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  elasticsearch_data:
    driver: local
  registry_broker_logs:
    driver: local
```

### Bind Mounts (Development)

```yaml
services:
  registry-broker:
    volumes:
      - ./src:/app/src          # Source code
      - ./config:/app/config    # Configuration
      - ./logs:/var/log        # Logs
```

## Networking

### Internal Network

```yaml
networks:
  registry-broker-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

### Service Communication

```yaml
services:
  registry-broker:
    networks:
      - registry-broker-network
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
```

## Health Checks

### Application Health Check

```yaml
services:
  registry-broker:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Database Health Check

```yaml
services:
  postgres:
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U registry_user -d registry_broker"]
      interval: 10s
      timeout: 5s
      retries: 5
```

## Security

### Non-Root User

```dockerfile
# Dockerfile
FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs
RUN adduser -S registry-broker -u 1001
USER registry-broker
```

### Read-Only Root Filesystem

```yaml
services:
  registry-broker:
    read_only: true
    tmpfs:
      - /tmp
      - /var/log
```

### Secrets Management

```yaml
services:
  registry-broker:
    secrets:
      - db_password
      - redis_password

secrets:
  db_password:
    file: ./secrets/db_password.txt
  redis_password:
    file: ./secrets/redis_password.txt
```

## Resource Limits

### Memory Limits

```yaml
services:
  registry-broker:
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M
```

### CPU Limits

```yaml
services:
  registry-broker:
    deploy:
      resources:
        limits:
          cpus: '1.0'
        reservations:
          cpus: '0.5'
```

## Monitoring

### Logging Configuration

```yaml
services:
  registry-broker:
    logging:
      driver: "json-file"
      options:
        max-size: "100m"
        max-file: "5"
```

### Metrics Collection

```yaml
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

## Backup & Recovery

### Database Backup

```bash
# Backup PostgreSQL
docker exec registry-broker-postgres-1 pg_dump -U registry_user registry_broker > backup.sql

# Restore PostgreSQL  
docker exec -i registry-broker-postgres-1 psql -U registry_user registry_broker < backup.sql
```

### Volume Backup

```bash
# Backup volumes
docker run --rm -v postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz /data
```

## Troubleshooting

### View Logs

```bash
# All services
docker compose logs

# Specific service
docker compose logs registry-broker

# Follow logs
docker compose logs -f registry-broker
```

### Check Status

```bash
# Service status
docker compose ps

# Resource usage
docker stats

# Network connectivity
docker compose exec registry-broker ping postgres
```

### Common Issues

#### Database Connection Failed
```bash
Error: connect ECONNREFUSED postgres:5432
```
**Solution**: Ensure PostgreSQL is healthy
```bash
docker compose ps postgres
docker compose logs postgres
```

#### Port Already in Use
```bash
Error: listen EADDRINUSE :::4000
```
**Solution**: Change port or stop conflicting service
```bash
PORT=4001 docker compose up -d
```

#### Out of Memory
```bash
Error: JavaScript heap out of memory
```
**Solution**: Increase memory limit or optimize
```yaml
services:
  registry-broker:
    deploy:
      resources:
        limits:
          memory: 2G
```

## Next Steps

- [Production Configuration](configuration.md) - Production settings
