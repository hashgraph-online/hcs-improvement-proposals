---
title: Vite Integration
sidebar_position: 6
description: Fast development with Vite and Hedera wallet connectivity
pagination_prev: libraries/hashinal-wc/usage-with-nextjs
pagination_next: libraries/hashinal-wc/usage-with-recursion
---

# Vite Integration

Build blazing-fast web applications with Hedera wallet connectivity using Vite's modern development experience.

## Overview

This guide shows how to integrate Hashinal Wallet Connect SDK with Vite for a lightweight, fast development setup with hot module replacement and optimized builds.

## Prerequisites

- Node.js 20+ installed
- Basic knowledge of JavaScript/HTML
- WalletConnect project ID ([get one here](https://cloud.walletconnect.com/))

Before you begin, see the [installation guide](../installation) for package details.

## Step 1: Project Setup

First, create a new Vite project and install dependencies:

```bash
# Create a new project with Vite
npm create vite@latest my-hedera-app -- --template vanilla
cd my-hedera-app

# Install dependencies
npm install --save-dev vite @vitejs/plugin-react
```

## Step 2: Configure Vite

Create or update `vite.config.js`:

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
});
```

## Step 3: Create HTML Structure

Update `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Hedera App</title>
  </head>
  <body>
    <div id="app">
      <button id="connectWallet">Connect Wallet</button>
      <button id="disconnectWallet" style="display: none;">Disconnect</button>
      <div id="accountInfo"></div>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

## Step 4: Create Main Application Code

Create `src/main.js`:

```javascript
import { HashinalsWalletConnectSDK } from '@hashgraph/hedera-wallet-connect';

// Your WalletConnect project configuration
const PROJECT_ID = 'YOUR_WALLETCONNECT_PROJECT_ID'; // Get from WalletConnect Dashboard
const APP_METADATA = {
  name: 'My First Hedera App',
  description: 'Learning to use Hashinal WalletConnect SDK',
  url: window.location.origin,
  icons: ['https://myapp.com/icon.png'],
};

class HederaApp {
  constructor() {
    this.sdk = HashinalsWalletConnectSDK.getInstance();
    this.init();
  }

  async init() {
    try {
      // Add event listeners
      document
        .getElementById('connectWallet')
        .addEventListener('click', () => this.connect());
      document
        .getElementById('disconnectWallet')
        .addEventListener('click', () => this.disconnect());

      // Check for existing connection
      const existingAccount = await this.sdk.initAccount(
        PROJECT_ID,
        APP_METADATA
      );
      if (existingAccount) {
        this.updateUI(existingAccount.accountId, existingAccount.balance);
      }
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  }

  async connect() {
    try {
      const { accountId, balance } = await this.sdk.connectWallet(
        PROJECT_ID,
        APP_METADATA
      );
      this.updateUI(accountId, balance);
    } catch (error) {
      console.error('Connection failed:', error);
      alert('Failed to connect wallet');
    }
  }

  async disconnect() {
    try {
      await this.sdk.disconnectWallet();
      this.updateUI(null);
    } catch (error) {
      console.error('Disconnect failed:', error);
    }
  }

  updateUI(accountId, balance) {
    const connectBtn = document.getElementById('connectWallet');
    const disconnectBtn = document.getElementById('disconnectWallet');
    const accountInfo = document.getElementById('accountInfo');

    if (accountId) {
      connectBtn.style.display = 'none';
      disconnectBtn.style.display = 'block';
      accountInfo.innerHTML = `
                Connected Account: ${accountId}<br>
                Balance: ${balance} HBAR
            `;
    } else {
      connectBtn.style.display = 'block';
      disconnectBtn.style.display = 'none';
      accountInfo.innerHTML = '';
    }
  }
}

// Start the application
new HederaApp();
```

## Step 5: Run the Application

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Step 6: Build for Production

When ready to deploy:

```bash
npm run build
```

This will create optimized files in the `dist` directory.

## Troubleshooting

### Build Errors
- Check that all dependencies are installed: `npm list`
- Verify Vite configuration matches the example above
- Ensure all imports are properly resolved

### Runtime Errors
- Check browser console for detailed error messages
- Verify your WalletConnect PROJECT_ID is valid
- Ensure the wallet you're using supports WalletConnect v2

### Connection Issues
- Clear browser cache and localStorage
- Try a different wallet (HashPack, Blade, etc.)
- Check network connectivity

## Best Practices

1. **Environment Variables**: Always use `.env` files for sensitive data
2. **Error Handling**: Implement proper error boundaries and user feedback
3. **Loading States**: Show loading indicators during wallet operations
4. **Network Detection**: Check and display the current Hedera network
5. **Session Persistence**: The SDK automatically handles session persistence

## Next Steps

- Explore [API Methods](../methods) for advanced SDK features
- Learn about [HCS Topics](../topics) for message handling
- Check out [React Integration](../usage-with-react) for component-based apps
