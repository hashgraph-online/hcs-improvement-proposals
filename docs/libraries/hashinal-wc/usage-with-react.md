# Using Hashinals Wallet Connect with React

This guide demonstrates how to integrate the Hashinals Wallet Connect SDK with a React application.

## Setup

First, install the required dependencies:

```bash
npm install @hashgraphonline/hashinal-wc @walletconnect/types buffer
```

## Implementation

### 1. Create the Wallet Provider

Create a new file called `WalletProvider.tsx`:

```typescript
import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { HashinalsWalletConnectSDK, PrivateKey } from '@hashgraphonline/hashinal-wc';
import { SessionTypes, SignClientTypes } from '@walletconnect/types';
import { Buffer } from 'buffer';

// Define the HCS-2 message interface
interface HCS2Message {
  p: 'hcs-2';
  op: 'register' | 'delete' | 'update' | 'migrate';
  t_id?: string;
  uid?: string;
  metadata?: string;
  m?: string;
}

// Define the context type
interface WalletContextType {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  accountId: string | null;
  balance: string | null;
  isConnecting: boolean;
  submitHCS2Message: (message: HCS2Message, topicId: string, submitKey?: string) => Promise<any>;
  transferHBAR: (recipientId: string, amount: number) => Promise<any>;
}

const WalletContext = createContext<WalletContextType>({} as WalletContextType);

// App metadata for WalletConnect
const APP_METADATA: SignClientTypes.Metadata = {
  name: 'Your App Name',
  description: 'Your app description',
  url: 'https://yourapp.com',
  icons: ['https://yourapp.com/icon.png']
};

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [sdk, setSdk] = useState<HashinalsWalletConnectSDK | null>(null);

  useEffect(() => {
    // Initialize SDK
    const initSDK = async () => {
      try {
        const sdkInstance = HashinalsWalletConnectSDK.getInstance();
        
        // Initialize with your project ID
        await sdkInstance.init(
          process.env.REACT_APP_WALLETCONNECT_PROJECT_ID!,
          APP_METADATA
        );
        
        setSdk(sdkInstance);

        // Check for existing connection
        const savedAccount = await sdkInstance.initAccount(
          process.env.REACT_APP_WALLETCONNECT_PROJECT_ID!,
          APP_METADATA
        );

        if (savedAccount) {
          setAccountId(savedAccount.accountId);
          setBalance(savedAccount.balance);
        }
      } catch (error) {
        console.error('Failed to initialize SDK:', error);
      }
    };

    initSDK();
  }, []);

  const connect = useCallback(async () => {
    if (!sdk) return;
    
    try {
      setIsConnecting(true);
      const { accountId: newAccountId, balance: newBalance } = await sdk.connectWallet(
        process.env.REACT_APP_WALLETCONNECT_PROJECT_ID!,
        APP_METADATA
      );
      
      setAccountId(newAccountId);
      setBalance(newBalance);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, [sdk]);

  const disconnect = useCallback(async () => {
    if (!sdk) return;
    
    try {
      await sdk.disconnectWallet();
      setAccountId(null);
      setBalance(null);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      throw error;
    }
  }, [sdk]);

  const submitHCS2Message = useCallback(async (
    message: HCS2Message,
    topicId: string, 
    submitKey?: string
  ) => {
    if (!sdk) throw new Error('SDK not initialized');
    
    try {
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
  }, [sdk]);

  const transferHBAR = useCallback(async (recipientId: string, amount: number) => {
    if (!sdk || !accountId) throw new Error('SDK not initialized or wallet not connected');
    
    try {
      const receipt = await sdk.transferHbar(accountId, recipientId, amount);
      console.log('HBAR transfer successful:', receipt);
      return receipt;
    } catch (error) {
      console.error('HBAR transfer failed:', error);
      throw error;
    }
  }, [sdk, accountId]);

  return (
    <WalletContext.Provider
      value={{
        connect,
        disconnect,
        accountId,
        balance,
        isConnecting,
        submitHCS2Message,
        transferHBAR
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
```

### 2. Wrap Your App with the Provider

In your `App.tsx` or main component:

```typescript
import { WalletProvider } from './WalletProvider';

function App() {
  return (
    <WalletProvider>
      {/* Your app components */}
    </WalletProvider>
  );
}
```

### 3. Usage Examples

#### Connect/Disconnect Wallet Button

```typescript
import { useWallet } from './WalletProvider';

export function WalletButton() {
  const { connect, disconnect, accountId, isConnecting } = useWallet();

  if (isConnecting) {
    return <button disabled>Connecting...</button>;
  }

  if (accountId) {
    return (
      <button onClick={disconnect}>
        Disconnect {accountId}
      </button>
    );
  }

  return (
    <button onClick={connect}>
      Connect Wallet
    </button>
  );
}
```

#### Send HBAR Transaction

```typescript
import { useWallet } from './WalletProvider';

export function SendHbarButton() {
  const { transferHBAR, accountId } = useWallet();

  const handleSend = async () => {
    try {
      const receipt = await transferHBAR("0.0.123456", 1); // Send 1 HBAR
      console.log('Transfer successful:', receipt);
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  return (
    <button onClick={handleSend} disabled={!accountId}>
      Send 1 HBAR
    </button>
  );
}
```

#### Submit HCS-2 Message

```typescript
import { useWallet } from './WalletProvider';

export function RegisterTopicButton() {
  const { submitHCS2Message } = useWallet();

  const handleRegister = async () => {
    try {
      const topicId = "0.0.12345"; // Your HCS topic ID
      
      const registerMessage = {
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
    <button onClick={handleRegister}>
      Register Topic
    </button>
  );
}
```

## Environment Setup

Create a `.env` file in your project root:

```plaintext
REACT_APP_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

Make sure to replace `your_project_id_here` with your actual WalletConnect project ID from the [WalletConnect Dashboard](https://cloud.walletconnect.com/).

## Notes

1. The SDK uses singleton pattern, so you only need to initialize it once.
2. Make sure to handle errors appropriately in your components.
3. The provider maintains wallet connection state and provides methods for interacting with the Hedera network.
4. All HCS-2 messages must follow the standard format and include required fields.
5. The memo field in HCS-2 messages is limited to 500 characters.
