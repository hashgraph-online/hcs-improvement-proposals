---
title: Next.js Integration
sidebar_position: 5
description: Build server-side rendered applications with wallet connectivity
pagination_prev: libraries/hashinal-wc/usage-with-react
pagination_next: libraries/hashinal-wc/usage-with-vite
---

# Next.js Integration

Learn how to integrate Hashinal Wallet Connect SDK with your Next.js application for server-side rendering and modern React features.

## Prerequisites

- Node.js 20+ installed
- Basic knowledge of Next.js and React
- WalletConnect project ID ([get one here](https://cloud.walletconnect.com/))

Before you begin, see the [installation guide](./installation.md) for package details.

## Setup

### Step 1: Create Next.js Project

```bash
# Create a new Next.js project
npx create-next-app@latest my-hedera-app
cd my-hedera-app
```

### Step 2: Create WalletProvider

Create `providers/WalletProvider.tsx`:

```typescript
'use client';

import { HashinalsWalletConnectSDK } from '@hashgraphonline/hashinal-wc';
import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { PrivateKey } from '@hashgraph/hedera-wallet-connect';

interface WalletContextType {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    accountId: string | null;
    balance: number | null;
    isConnecting: boolean;
    submitHCS2Message: (message: HCS2Message, topicId: string, submitKey?: string) => Promise<any>;
}

interface HCS2Message {
  p: 'hcs-2';
  op: 'register' | 'delete' | 'update' | 'migrate';
  t_id?: string;
  uid?: string;
  metadata?: string;
  m?: string;
}

const WalletContext = createContext<WalletContextType>({} as WalletContextType);

const PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;
const APP_METADATA = {
    name: 'My Hedera App',
    description: 'Next.js app using Hashinal WalletConnect',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    icons: ['https://your-app-icon.com/icon.png']
};

export function WalletProvider({ children }: { children: ReactNode }) {
    const [sdk, setSdk] = useState<HashinalsWalletConnectSDK | null>(null);
    const [accountId, setAccountId] = useState<string | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        const initSDK = async () => {
            const instance = HashinalsWalletConnectSDK.getInstance();
            setSdk(instance);

            try {
                const existingAccount = await instance.initAccount(
                    PROJECT_ID,
                    APP_METADATA
                );
                if (existingAccount) {
                    setAccountId(existingAccount.accountId);
                    setBalance(existingAccount.balance);
                }
            } catch (error) {
                console.error('Failed to init wallet:', error);
            }
        };

        initSDK();
    }, []);

    const connect = async () => {
        if (!sdk) return;
        setIsConnecting(true);
        try {
            const { accountId, balance } = await sdk.connectWallet(
                PROJECT_ID,
                APP_METADATA
            );
            setAccountId(accountId);
            setBalance(balance);
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            throw error;
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnect = async () => {
        if (!sdk) return;
        try {
            await sdk.disconnectWallet();
            setAccountId(null);
            setBalance(null);
        } catch (error) {
            console.error('Failed to disconnect wallet:', error);
            throw error;
        }
    };

    const submitHCS2Message = useCallback(async (
        message: HCS2Message,
        topicId: string, 
        submitKey?: string
    ) => {
        try {
            const sdk = HashinalsWalletConnectSDK.getInstance();
            
            // Validate message format
            if (message.m && message.m.length > 500) {
                throw new Error("Memo must not exceed 500 characters");
            }
            
            if (!message.p || message.p !== 'hcs-2') {
                throw new Error("Invalid protocol. Must be 'hcs-2'");
            }
            
            // Convert message to string
            const messageString = JSON.stringify(message);
            
            // If a submit key is provided, convert it to a PrivateKey object
            const privateKey = submitKey ? PrivateKey.fromString(submitKey) : undefined;
            
            const receipt = await sdk.submitMessageToTopic(topicId, messageString, privateKey);
            
            console.log("HCS-2 message submitted successfully!");
            console.log("Transaction ID:", receipt.transactionId.toString());
            
            return receipt;
        } catch (error) {
            console.error("Error submitting HCS-2 message:", error);
            throw error;
        }
    }, []);

    return (
        <WalletContext.Provider
            value={{
                connect,
                disconnect,
                accountId,
                balance,
                isConnecting,
                submitHCS2Message,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => useContext(WalletContext);
```

### Step 3: Update Root Layout

Update `app/layout.tsx`:

```typescript
import { WalletProvider } from '@/providers/WalletProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  )
}
```

### Step 4: Create Wallet Component

Create `components/WalletButton.tsx`:

```typescript
'use client';

import { useWallet } from '@/providers/WalletProvider';

export function WalletButton() {
    const { connect, disconnect, accountId, balance, isConnecting } = useWallet();

    if (isConnecting) {
        return <button disabled>Connecting...</button>;
    }

    if (accountId) {
        return (
            <div>
                <div>Account: {accountId}</div>
                <div>Balance: {balance} HBAR</div>
                <button onClick={disconnect}>Disconnect</button>
            </div>
        );
    }

    return <button onClick={connect}>Connect Wallet</button>;
}
```

### Step 5: Use in Page

Update `app/page.tsx`:

```typescript
import { WalletButton } from '@/components/WalletButton';

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <h1>My Hedera App</h1>
      <WalletButton />
    </main>
  );
}
```

## Environment Setup

Create `.env.local`:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

## Usage Examples

### Send Transaction

```typescript
import { useWallet } from '@/providers/WalletProvider';

export function SendButton() {
    const { sdk, accountId } = useWallet();

    const sendTransaction = async () => {
        if (!sdk || !accountId) return;
        
        try {
            const result = await sdk.transferHBAR({
                recipientId: "0.0.123456",
                amount: 1, // 1 HBAR
            });
            console.log('Transaction success:', result);
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    };

    return (
        <button onClick={sendTransaction} disabled={!accountId}>
            Send 1 HBAR
        </button>
    );
}
```

### Register Topic Example

Here's an example of how to use the `submitHCS2Message` function to register a new topic:

```typescript
// RegisterTopicComponent.tsx
import { useWallet } from './WalletProvider';

export function RegisterTopicComponent() {
  const { submitHCS2Message } = useWallet();

  const handleRegisterTopic = async () => {
    try {
      const topicId = "0.0.12345"; // Your HCS topic ID
      
      // Example of registering a new topic
      const registerMessage: HCS2Message = {
        p: "hcs-2",
        op: "register",
        t_id: "0.0.456789",
        metadata: "hcs://1/0.0.456789",
        m: "register new topic"
      };

      const receipt = await submitHCS2Message(registerMessage, topicId);
      console.log("Topic registered successfully:", receipt);
    } catch (error) {
      console.error("Failed to register topic:", error);
    }
  };

  return (
    <button onClick={handleRegisterTopic}>
      Register Topic
    </button>
  );
}
```

### Update Topic Example

Here's an example of updating an existing topic:

```typescript
// UpdateTopicComponent.tsx
import { useWallet } from './WalletProvider';

export function UpdateTopicComponent() {
  const { submitHCS2Message } = useWallet();

  const handleUpdateTopic = async () => {
    try {
      const topicId = "0.0.12345"; // Your HCS topic ID
      
      // Example of updating an existing topic
      const updateMessage: HCS2Message = {
        p: "hcs-2",
        op: "update",
        uid: "60", // sequence number of the message to update
        t_id: "0.0.123456",
        metadata: "hcs://1/0.0.456789",
        m: "update sequence number 60 to a new topic id and metadata"
      };

      const receipt = await submitHCS2Message(updateMessage, topicId);
      console.log("Topic updated successfully:", receipt);
    } catch (error) {
      console.error("Failed to update topic:", error);
    }
  };

  return (
    <button onClick={handleUpdateTopic}>
      Update Topic
    </button>
  );
}
```

## Best Practices

1. **Client-Side Only**: WalletConnect operations must run on the client side
2. **Use 'use client' Directive**: Mark components that use the SDK with 'use client'
3. **Environment Variables**: Use `NEXT_PUBLIC_` prefix for client-side env vars
4. **Error Boundaries**: Implement error boundaries for wallet operations
5. **Loading States**: Show skeleton loaders during wallet interactions
6. **Session Persistence**: The SDK handles session persistence automatically
7. **TypeScript**: Use TypeScript for better type safety and IntelliSense

## Production Considerations

### Performance
- Lazy load wallet components to reduce initial bundle size
- Use dynamic imports for wallet-related features

### Security
- Never expose private keys or sensitive data
- Validate all user inputs before blockchain operations
- Use environment variables for configuration

### User Experience
- Provide clear feedback for all wallet operations
- Handle network switching gracefully
- Show transaction status and confirmations

## Next Steps

- Explore [API Methods](./methods) for complete SDK reference
- Learn about [HCS Topics](./topics) for messaging features
- Check out [React Integration](./usage-with-react) for pure React apps
- Review the [Hashinals Guide](./usage-with-recursion) for inscribed applications

> **Important**: Remember to replace `your_project_id_here` with your actual WalletConnect project ID from the [WalletConnect Dashboard](https://cloud.walletconnect.com/)!