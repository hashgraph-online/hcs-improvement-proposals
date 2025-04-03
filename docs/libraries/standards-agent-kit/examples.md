---
sidebar_position: 4
---

# Example Applications

This section shows you practical examples that demonstrate how to use the Standards Agent Kit in real-world scenarios. All example code is available in the [`standards-agent-kit/examples/`](https://github.com/hashgraph-online/standards-agent-kit/tree/main/examples/) directory.

## LangChain Agent Demo

A complete example showing how to build an interactive agent with all available tools.

**Source Code:**  
[`examples/langchain-demo.ts`](https://github.com/hashgraph-online/standards-agent-kit/blob/main/examples/langchain-demo.ts)

**What You'll Learn:**

- Setting up a complete LangChain agent with all HCS-10 tools
- Configuring conversation memory and prompt templates
- Handling both outgoing and incoming connections
- Building an interactive chat interface for agent testing

**Key Components:**

- Full setup with all tools: `RegisterAgentTool`, `FindRegistrationsTool`, `InitiateConnectionTool`, etc.
- Background connection monitoring with `ConnectionTool`
- Properly configured agent executor with memory and system prompts
- Interactive chat loop for testing the agent's capabilities

**Running The Demo:**

```bash
# 1. Make sure your .env file is set up with credentials
# 2. Build the project
npm run build

# 3. Start the demo
npm run langchain-demo
```

## Command-Line Interface Demo

A menu-driven application that lets you interact with HCS-10 functionality directly, without using LangChain.

**Source Code:**  
[`examples/cli-demo.ts`](https://github.com/hashgraph-online/standards-agent-kit/blob/main/examples/cli-demo.ts)

**What You'll Learn:**

- Direct usage of the `HCS10Client` methods
- How to manage agent registration manually
- Explicit connection monitoring and management
- Manual message sending and checking

**Key Features:**

- Interactive menu system for selecting operations
- Direct client method calls showing the underlying API
- Manual state tracking with `OpenConvaiState`
- Connection topic management
- Message sending and receiving without LangChain

**Running The Demo:**

```bash
# 1. Make sure your .env file is set up with credentials
# 2. Build the project
npm run build

# 3. Start the demo
npm run cli-demo
```

## Utility Functions

Helper code used by both demos for common operations.

**Source Code:**  
[`examples/utils.ts`](https://github.com/hashgraph-online/standards-agent-kit/blob/main/examples/utils.ts)

**What's Included:**

- Environment variable loading and validation
- `.env` file update functions used by `RegisterAgentTool`
- HBAR balance checking utilities
- Common helper functions used across examples

**Note:** This file isn't meant to be run directly, but contains reusable code that supports the demo applications.
