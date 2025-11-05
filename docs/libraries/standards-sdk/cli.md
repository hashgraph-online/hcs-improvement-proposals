---
sidebar_position: 2
---

# Standards SDK CLI

Interactive terminal interface powered by [Ink](https://github.com/vadimdemedes/ink) and [Pastel](https://github.com/vadimdemedes/pastel) for exploring HCS standards. Provides keyboard-driven navigation, environment validation, and agent tooling.

## Features

- **Interactive Dashboard** - Keyboard-driven interface with category browsing, difficulty badges, and environment validation
- **40+ Demos** - Organized by standard (HCS-2, HCS-5, HCS-10, etc.), difficulty level, and category
- **Configuration** - Merges credentials from CLI config, `.env` files, and environment variables
- **Agent Utilities** - Cloudflare tunnel management for registry broker demos
- **Dry Run Mode** - Preview demo execution and validate environment
- **Scripted Mode** - Non-interactive API for CI/CD pipelines
- **Learning-Focused** - Difficulty ratings, estimated duration, learning objectives, and prerequisites

## Quick Start

Launch the interactive dashboard from the repository root:

```bash
pnpm run cli
```

Installs dependencies and displays the main menu:

```
╔═══════════════════════════════════════════════════════════╗
║           Hashgraph Online Standards SDK CLI               ║
╚═══════════════════════════════════════════════════════════╝

Config file: ~/.config/standards-sdk-cli/config.json
Current network: testnet
Default account: 0.0.•••••1234
Available demos: 42

Select an action:
  ❯ Run a demo
    View configuration summary
    Agent utilities
    Exit

Use arrow keys and Enter. Press Ctrl+C to exit at any time.
```

### First Run Walkthrough

1. **Choose "Run a demo"** → Browse demos by category:
   - 🟢 Getting Started (3 demos)
   - 📚 HCS-2 Standard (4 demos)
   - 📚 HCS-5 Standard (2 demos)
   - 🤖 Registry Broker & Agents (8 demos)

2. **Select a category** → See demos sorted by difficulty:
   - 🟢 Beginner: HCS-2 Create Registry (1-2 min)
   - 🟡 Intermediate: HCS-10 Create Registry (3-4 min)
   - 🔴 Advanced: Registry Broker Conversational Demo (10-15 min)

3. **Pick a demo** → View detailed preview:
   ```
   🟢 HCS-2 Create Registry

   Difficulty: Beginner • 1-2 minutes

   Create a simple topic-based registry on Hedera.

   You'll learn:
     • Understand what a registry is on Hedera
     • Create your first HCS topic
     • Submit your first transaction to Hedera testnet

   Environment: All configured ✓

   Press ENTER to start
   ```

4. **Run the demo** → Interactive prompts guide execution

## Interactive Dashboard

### Main Menu

- **Run a demo** - Browse and execute demos with guided walkthroughs
- **View configuration summary** - Inspect network, credentials, registry endpoints (redacted)
- **Agent utilities** - Check/install Cloudflare binary, run tunnel dry-runs
- **Exit** - Close the CLI

### Demo Categories

Demos organized by:

- **Getting Started** (🟢) - First-time users:
  - HCS-2 Create Registry
  - HCS-5 Mint Hashinal
  - HCS-6 Create Registry

- **HCS Standards** (📚) - Organized by standard number:
  - HCS-2 (Topic Registries)
  - HCS-5/HCS-6 (Hashinals)
  - HCS-7 (Smart Hashinals)
  - HCS-10 (Agent Communication)
  - HCS-11 (Profile Metadata)
  - HCS-12 (HashLinks)
  - HCS-14 (Universal Agent IDs)
  - HCS-15/16/17/18 (Petal/Flora Accounts)
  - HCS-20 (Auditable Points)

- **Registry Broker & Agents** (🤖) - Advanced integration demos:
  - Agent Registration
  - ERC-8004 Integration
  - Conversational API
  - History Exploration

### Demo Detail View

Each demo displays:

- **Difficulty Badge** - 🟢 Beginner / 🟡 Intermediate / 🔴 Advanced
- **Estimated Duration** - Time commitment upfront
- **Description** - What the demo does
- **Learning Objectives** - What you'll understand afterward
- **Prerequisites** - Required prior demos (if any)
- **Environment Check** - Missing variables highlighted in red
- **Command Preview** - Exact script that will execute

### Keyboard Navigation

- **Arrow Keys** - Navigate menus
- **Enter** - Select highlighted item
- **Escape** - Go back one level
- **Ctrl+C** - Exit immediately
- **D** (in demo detail) - Toggle dry-run mode

## Scripted Usage

All features are available via command-line arguments for automation and CI/CD.

### List All Demos

```bash
# Human-readable table
pnpm run cli -- demo list

# JSON output for parsing
pnpm run cli -- demo list --json
```

Example output:
```
┌─────────────────────────────────────────┬────────────┬──────────────┐
│ Demo ID                                 │ Category   │ Difficulty   │
├─────────────────────────────────────────┼────────────┼──────────────┤
│ hcs-2:create                            │ getting-st │ beginner     │
│ hcs-5                                   │ getting-st │ beginner     │
│ hcs-10:create-registry                  │ hcs-10     │ intermediate │
│ registry-broker                         │ registry-b │ advanced     │
└─────────────────────────────────────────┴────────────┴──────────────┘
```

### Inspect Demo Metadata

```bash
pnpm run cli -- demo info hcs-2:create
pnpm run cli -- demo info registry-broker
```

Returns:
- Full description
- Required environment variables
- Learning objectives
- Prerequisites
- Estimated duration
- Example output format

### Run a Demo

```bash
# Execute a specific demo
pnpm run cli -- demo run hcs-2:create

# Dry run (validate environment only)
pnpm run cli -- demo run hcs-2:create --dry-run

# Dry run with environment printout
pnpm run cli -- demo run registry-broker --dry-run --print-env

# Forward additional flags to the demo script
pnpm run cli -- demo run registry-broker -- --profile=mcp

# Suppress progress UI (for logging)
pnpm run cli -- demo run hcs-10:create-registry --no-progress
```

### Direct Script Execution

Bypass the wrapper when iterating locally:

```bash
pnpm --dir cli/standards-cli start -- demo run hcs-5
```

## Configuration System

The CLI merges configuration from three sources (highest priority first):

1. **CLI config file** - `~/.config/standards-sdk-cli/config.json` (macOS/Linux follow XDG)
2. **Repository .env files** - `.env.local` then `.env` from SDK root
3. **Process environment** - Shell variables like `HEDERA_ACCOUNT_ID`

### Persist Defaults

Store credentials and preferences to avoid re-entering:

```bash
pnpm run cli -- config \
  --network testnet \
  --account-id 0.0.123456 \
  --private-key 302e020100300506032b657004220420... \
  --registry-base-url https://registry.hashgraphonline.com/api/v1 \
  --prefer-cloudflared true
```

### Configuration Options

#### Hedera Network Settings

```bash
--network <mainnet|testnet|previewnet>  # Active network (default: testnet)
--account-id <0.0.xxxxx>                # Default account ID
--private-key <hex-key>                 # Default private key (DER-encoded hex)
```

Network-specific credentials (override defaults per network):

```bash
--mainnet-account-id <0.0.xxxxx>
--mainnet-private-key <hex-key>
--testnet-account-id <0.0.xxxxx>
--testnet-private-key <hex-key>
--previewnet-account-id <0.0.xxxxx>
--previewnet-private-key <hex-key>
```

#### Registry Broker Settings

```bash
--registry-base-url <url>               # Broker API endpoint
--registry-api-key <key>                # Optional auth key
--autoTopUp <true|false>                # Auto-fund registry operations
--historyAutoTopUp <true|false>         # Auto-fund history queries
--profile-mode <ai|mcp>                 # Agent profile type
```

#### Agent Settings

```bash
--prefer-cloudflared <true|false>       # Use cloudflared for tunnels
--fallback-to-local-tunnel <true|false> # Fall back if cloudflared unavailable
--default-port <number>                 # Agent server port (default: 8787)
```

#### OpenRouter Settings

```bash
--openrouter-api-key <key>              # API key for OpenRouter models
--openrouter-model-id <model>           # Model ID (default: anthropic/claude-3.5-sonnet)
```

#### Custom Environment Variables

Inject arbitrary variables for specific demos:

```bash
--env KEY=VALUE                         # Repeatable flag
--env FOO=bar --env BAZ=qux
```

### Reset to Defaults

```bash
pnpm run cli -- config --reset
```

### View Current Config

```bash
pnpm run cli -- config
```

Example output (credentials redacted):
```json
{
  "schemaVersion": 1,
  "hedera": {
    "network": "testnet",
    "defaultAccountId": "0.0.123456",
    "defaultPrivateKey": "302e…7890"
  },
  "registryBroker": {
    "baseUrl": "https://registry.hashgraphonline.com/api/v1",
    "useLedger": true,
    "autoTopUp": true,
    "profileMode": "ai"
  },
  "agent": {
    "preferCloudflared": true,
    "defaultPort": 8787
  }
}
```

## Environment Variable Resolution

The CLI intelligently resolves credentials with network-specific prefixes and fallbacks.

### Supported Variable Patterns

For account ID:
```bash
TESTNET_HEDERA_ACCOUNT_ID       # Network-specific (highest priority)
MAINNET_HEDERA_ACCOUNT_ID
PREVIEWNET_HEDERA_ACCOUNT_ID
HEDERA_ACCOUNT_ID               # Generic fallback
HEDERA_OPERATOR_ID              # Operator alias
ACCOUNT_ID                      # Legacy fallback
```

For private key:
```bash
TESTNET_HEDERA_PRIVATE_KEY      # Network-specific
MAINNET_HEDERA_PRIVATE_KEY
PREVIEWNET_HEDERA_PRIVATE_KEY
HEDERA_PRIVATE_KEY              # Generic fallback
HEDERA_OPERATOR_KEY             # Operator alias
PRIVATE_KEY                     # Legacy fallback
```

### Network Selection

The CLI sets `HEDERA_NETWORK` and exports network-specific credentials:

```bash
HEDERA_NETWORK=testnet
TESTNET_HEDERA_ACCOUNT_ID=0.0.123456
TESTNET_HEDERA_PRIVATE_KEY=302e...
```

Even when running on testnet, mainnet/previewnet credentials are populated if configured (for multi-network demos).

### Registry Broker Variables

```bash
REGISTRY_BROKER_BASE_URL                    # API endpoint
REGISTRY_BROKER_API_KEY                     # Auth token
REGISTRY_BROKER_DEMO_USE_LEDGER             # 1 or 0
REGISTRY_BROKER_DEMO_AUTO_TOP_UP            # 1 or 0
REGISTRY_BROKER_HISTORY_AUTO_TOP_UP         # 1 or 0
REGISTRY_BROKER_DEMO_PROFILE                # ai or mcp
REGISTRY_BROKER_DEMO_HEADERS_TIMEOUT_MS     # Timeout in ms
REGISTRY_BROKER_DEMO_BODY_TIMEOUT_MS        # Timeout in ms
```

### Additional Variables

```bash
OPENROUTER_API_KEY              # For OpenRouter chat demos
OPENROUTER_MODEL_ID             # Model selection
CLOUDFLARED_BIN                 # Path to cloudflared binary
STANDARDS_SDK_ROOT              # SDK repository root
```

## Agent Utilities

Registry broker demos often require public HTTPS endpoints. The CLI bundles Cloudflare tunnel management.

### Check for Cloudflared Binary

```bash
pnpm run cli -- agent check
```

Output:
```
Checking for cloudflared binary...
✓ Found: /usr/local/bin/cloudflared
Binary path: /usr/local/bin/cloudflared
```

If not found:
```
✗ No cloudflared binary detected
Run with --install to download the bundled version
```

### Install Bundled Binary

```bash
pnpm run cli -- agent check --install
```

Downloads and installs cloudflared from the `cloudflared` npm package. The path is stored in `CLOUDFLARED_BIN` for subsequent demo runs.

### Test Tunnel (Dry Run)

```bash
pnpm run cli -- agent tunnel --dry-run --port 8787
```

Validates tunnel setup without starting a live connection.

### Start Live Tunnel

```bash
pnpm run cli -- agent tunnel --port 8787
```

Opens a trycloudflare.com tunnel to `localhost:8787`. Press Ctrl+C to close.

Example output:
```
Starting tunnel to localhost:8787...
┌──────────────────────────────────────────────────────────┐
│ Tunnel URL: https://abc-123-xyz.trycloudflare.com       │
└──────────────────────────────────────────────────────────┘
Tunnel active. Press Ctrl+C to stop.
```

Registry broker ERC-8004 and Agentverse demos use this automatically when `--prefer-cloudflared` is enabled.

## Demo System Deep Dive

### Demo Metadata

Every demo can define:

```typescript
{
  id: "hcs-2:create",
  label: "🟢 HCS-2 Create Registry",
  category: "getting-started",
  difficulty: "beginner",
  estimatedDuration: "1-2 minutes",
  description: "Create a simple topic-based registry on Hedera.",

  learningObjectives: [
    "Understand what a registry is on Hedera",
    "Create your first HCS topic",
    "Submit your first transaction to Hedera testnet"
  ],

  prerequisites: [],

  requiredEnv: [
    "HEDERA_ACCOUNT_ID",
    "HEDERA_PRIVATE_KEY"
  ],

  exampleOutput: `
✅ Registry created successfully!
Topic ID: 0.0.123456
Registry Type: HCS-2 (Simple Topic Registry)
View on HashScan: https://hashscan.io/testnet/topic/0.0.123456
  `
}
```

### Demo Discovery

Demos are auto-discovered from:

1. **package.json scripts** - Any script starting with `demo:` or `demo`
2. **Filesystem scan** - TypeScript files in `demo/**/*.ts` (excluding utils, browser, assets)

The CLI parses script commands to extract file paths and matches them against metadata hints for rich labels.

### Demo Runners

Three execution modes:

```typescript
// Via npm/pnpm script
{kind: 'package-script', script: 'demo:hcs-2:create'}

// Direct TypeScript execution
{kind: 'typescript', entry: 'demo/hcs-2/create.ts'}

// Shell command
{kind: 'shell', command: 'echo "Demo complete"'}
```

Most demos use `package-script` for consistency with repository conventions.

### Difficulty Levels

- **🟢 Beginner** - No prior HCS knowledge required, under 5 minutes, minimal config
- **🟡 Intermediate** - Requires basic Hedera understanding, 5-10 minutes, moderate setup
- **🔴 Advanced** - Multi-step workflows, 10+ minutes, extensive configuration

Demos are sorted by difficulty within each category, with beginner demos always appearing first.

## Advanced Patterns

### Chaining Demos with Prerequisites

Some demos require prior execution. The CLI shows prerequisites in the detail view:

```bash
pnpm run cli -- demo info registry-broker
```

```
🔴 Registry Broker Conversational Demo

Prerequisites: hcs-10:create-registry, registry-broker:register-agent

Run the prerequisites first:
  pnpm run cli -- demo run hcs-10:create-registry
  pnpm run cli -- demo run registry-broker:register-agent
```

The interactive dashboard highlights missing prerequisites in yellow.

### Registry Broker demo playbook

The CLI bundles the full suite of registry-broker demos from `standards-sdk/demo/registry-broker`. Run them end-to-end with ledger authentication, Cloudflare tunneling, and ERC-8004 publishing:

```bash
# 1. Inspect configuration requirements
pnpm run cli -- demo info registry-broker:register-agent-erc8004

# 2. Dry run to view missing env vars (does not execute remote calls)
pnpm run cli -- demo run registry-broker:register-agent-erc8004 --dry-run --print-env

# 3. Execute against mainnet (auto top-up enabled by default)
pnpm run cli -- demo run registry-broker:register-agent-erc8004 \
  --env HEDERA_NETWORK=mainnet \
  --env MAINNET_HEDERA_ACCOUNT_ID=0.0.123456 \
  --env MAINNET_HEDERA_PRIVATE_KEY=302e... \
  --env REGISTRY_BROKER_DEMO_TUNNEL=cloudflare
```

The CLI automatically:

- Performs ledger authentication (`createLedgerChallenge` / `verifyLedgerChallenge`).
- Spins up a local agent (Cloudflare tunnel by default, fallback to localtunnel).
- Registers the agent, polls the asynchronous progress endpoint, and logs ERC-8004 agent IDs.
- Cleans up the local agent process on exit (even when the script crashes).

Other useful flags:

# Force local tunnel (useful when corporate networks block Cloudflare)
pnpm run cli -- demo run registry-broker:register-agent-erc8004 \
  --env REGISTRY_BROKER_DEMO_TUNNEL=localtunnel

# Disable auto top-up and rely on a pre-funded account
pnpm run cli -- demo run registry-broker:register-agent-erc8004 \
  --env REGISTRY_BROKER_DEMO_AUTO_TOP_UP=0

# Run the basic registration flow without ERC-8004 updates
pnpm run cli -- demo run registry-broker:register-agent \
  --env REGISTRY_BROKER_DEMO_ENABLE_ERC8004=0 \
  --env REGISTRY_BROKER_DEMO_SKIP_UPDATE=1
```

Tip: copy `.env.example` to `.env` and populate `TESTNET_HEDERA_ACCOUNT_ID`, `TESTNET_HEDERA_PRIVATE_KEY`, `MAINNET_HEDERA_ACCOUNT_ID`, and `MAINNET_HEDERA_PRIVATE_KEY`. The CLI reads these automatically for both testnet and mainnet demos.

### Multi-Network Testing

Configure credentials for all networks, then switch with `--network`:

```bash
# Setup
pnpm run cli -- config \
  --testnet-account-id 0.0.111111 \
  --testnet-private-key 302e... \
  --mainnet-account-id 0.0.999999 \
  --mainnet-private-key 302e...

# Run on testnet
pnpm run cli -- config --network testnet
pnpm run cli -- demo run hcs-2:create

# Switch to mainnet
pnpm run cli -- config --network mainnet
pnpm run cli -- demo run hcs-2:create
```

### CI/CD Integration

Non-interactive mode auto-activates when stdin is not a TTY:

```yaml
# GitHub Actions example
- name: Run HCS-2 demo
  run: pnpm run cli -- demo run hcs-2:create --no-progress
  env:
    HEDERA_ACCOUNT_ID: ${{ secrets.HEDERA_ACCOUNT_ID }}
    HEDERA_PRIVATE_KEY: ${{ secrets.HEDERA_PRIVATE_KEY }}
```

The `--no-progress` flag suppresses Ink UI rendering for clean log output.

## Troubleshooting

### Demo Fails with "Missing Environment Variables"

**Cause**: Required credentials not configured.

**Fix**: Run in dry-run mode to see what's missing:

```bash
pnpm run cli -- demo run <demo-id> --dry-run --print-env
```

Then configure the missing variables:

```bash
pnpm run cli -- config --account-id <...> --private-key <...>
```

Or add to `.env`:
```bash
HEDERA_ACCOUNT_ID=0.0.123456
HEDERA_PRIVATE_KEY=302e...
```

### "CLI dependencies missing" Error

**Cause**: CLI workspace dependencies not installed.

**Fix**:

```bash
pnpm --dir cli/standards-cli install
```

Or use the repository-level helper:

```bash
pnpm run cli:install
```

### Interactive Mode Not Available

**Cause**: Terminal doesn't support raw mode (e.g., CI environment, non-TTY).

**Behavior**: CLI automatically falls back to non-interactive mode with helpful command suggestions:

```
Interactive mode requires running in a TTY-enabled terminal.
Run pnpm run cli -- demo list to view demos
or pnpm run cli -- demo run <demo-id> to execute directly.
```

**Fix**: Use scripted commands as shown above.

### Cloudflared Binary Not Found

**Cause**: Cloudflared not installed and auto-install failed.

**Fix**:

```bash
pnpm run cli -- agent check --install
```

If installation fails, manually install cloudflared:

```bash
# macOS
brew install cloudflare/cloudflare/cloudflared

# Linux
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared

# Set path
export CLOUDFLARED_BIN=/usr/local/bin/cloudflared
```

### Demo Hangs or Times Out

**Cause**: Network issues, invalid credentials, or API endpoint unavailable.

**Debug**:

1. Verify credentials:
   ```bash
   pnpm run cli -- config
   ```

2. Test network connectivity:
   ```bash
   curl https://mainnet-public.mirrornode.hedera.com/api/v1/network/nodes
   ```

3. Check registry broker health (if applicable):
   ```bash
   curl https://registry.hashgraphonline.com/api/v1/health
   ```

4. Run demo with verbose logging:
   ```bash
   DEBUG=* pnpm run cli -- demo run <demo-id>
   ```

### TypeScript Build Errors

**Cause**: Source code changes not compiled.

**Fix**:

```bash
pnpm run cli:build
```

This runs TypeScript compilation for the CLI workspace.

### Permission Denied on Config File

**Cause**: Config directory permissions issue.

**Fix**:

```bash
chmod 755 ~/.config/standards-sdk-cli
chmod 644 ~/.config/standards-sdk-cli/config.json
```

### Demo Output Garbled

**Cause**: Terminal doesn't support ANSI escape codes or Unicode.

**Fix**: Use `--no-color` and `--no-progress`:

```bash
NO_COLOR=1 pnpm run cli -- demo run <demo-id> --no-progress
```

## Development & Extension

### Project Structure

```
cli/standards-cli/
├── src/
│   ├── cli.ts                    # Entry point & Pastel CLI setup
│   ├── commands/
│   │   ├── index.tsx             # Interactive dashboard
│   │   ├── demo/
│   │   │   ├── list.tsx          # List demos
│   │   │   ├── info.tsx          # Show demo details
│   │   │   └── run.tsx           # Execute demos
│   │   ├── config/
│   │   │   └── index.tsx         # Configuration management
│   │   └── agent/
│   │       ├── check.tsx         # Cloudflared detection
│   │       └── tunnel.tsx        # Tunnel management
│   └── lib/
│       ├── config.ts             # Config loading/saving
│       ├── demos.ts              # Demo discovery
│       ├── environment.ts        # Env var resolution
│       ├── runner.ts             # Demo execution
│       ├── cloudflared.ts        # Tunnel utilities
│       └── logo.tsx              # Branding
├── package.json                  # CLI dependencies
└── tsconfig.json                 # TypeScript config
```

### Adding New Demos

1. Create demo script in `demo/` directory
2. Add npm script to root `package.json`:
   ```json
   "demo:my-feature": "tsx demo/my-feature.ts"
   ```

3. Add metadata hint in `cli/standards-cli/src/lib/demos.ts`:
   ```typescript
   'my-feature': {
     label: '🟢 My Awesome Feature',
     category: 'getting-started',
     difficulty: 'beginner',
     estimatedDuration: '2-3 minutes',
     description: 'Learn how to use my awesome feature',
     requiredEnv: ['HEDERA_ACCOUNT_ID', 'HEDERA_PRIVATE_KEY'],
     learningObjectives: [
       'Understand feature concepts',
       'Execute feature workflow',
       'Verify results on-chain'
     ],
   }
   ```

4. Test in CLI:
   ```bash
   pnpm run cli -- demo list
   pnpm run cli -- demo info my-feature
   pnpm run cli -- demo run my-feature --dry-run
   ```

### Development Mode

```bash
pnpm --dir cli/standards-cli dev
```

Watches source files and restarts on changes.

### Debugging

Set `DEBUG=*` for verbose logging:

```bash
DEBUG=* pnpm --dir cli/standards-cli start -- demo run <demo-id>
```

Or use Node.js inspector:

```bash
node --inspect-brk ./cli/standards-cli/node_modules/.bin/tsx \
  cli/standards-cli/src/cli.ts demo run <demo-id>
```

### Testing

Run the build check before committing:

```bash
pnpm run cli:build
```

Validates TypeScript compilation and exports.

## Related Documentation

- [Standards SDK Overview](/docs/libraries/standards-sdk/overview)
- [HCS-2 Topic Registries](/docs/libraries/standards-sdk/hcs-2/overview)
- [HCS-10 Agent Communication](/docs/libraries/standards-sdk/hcs-10/overview)
- [Registry Broker Client](/docs/libraries/standards-sdk/registry-broker-client)
- [Configuration Guide](/docs/libraries/standards-sdk/configuration)

## Support

- **GitHub Issues**: [hashgraph-online/standards-sdk](https://github.com/hashgraph-online/standards-sdk/issues)
- **Community**: [Telegram](https://t.me/hashinals)
- **Documentation**: [hashgraphonline.com](https://hashgraphonline.com)
