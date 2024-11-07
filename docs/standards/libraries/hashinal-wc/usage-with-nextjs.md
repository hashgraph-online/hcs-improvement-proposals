---
sidebar_position: 10
---

# Usage with Next.js

Before you begin, see the [installation guide](./installation.md) for details.

## Setup

### Step 1: Create Next.js Project

```bash
# Create a new Next.js project
npx create-next-app@latest my-hedera-app
cd my-hedera-app
```

### Step 2: Configure Next.js

Create or update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer"),
        };
        return config;
    },
}

module.exports = nextConfig
```

### Step 3: Create WalletProvider

Create `providers/WalletProvider.tsx`:

```typescript
'use client';

import { HashinalsWalletConnectSDK } from '@hashgraph/hedera-wallet-connect';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface WalletContextType {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    accountId: string | null;
    balance: number | null;
    isConnecting: boolean;
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

    return (
        <WalletContext.Provider
            value={{
                connect,
                disconnect,
                accountId,
                balance,
                isConnecting
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => useContext(WalletContext);
```

### Step 4: Update Root Layout

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

### Step 5: Create Wallet Component

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

### Step 6: Use in Page

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

Remember to replace `your_project_id_here` with your actual WalletConnect project ID from the [WalletConnect Dashboard](https://cloud.walletconnect.com/)!