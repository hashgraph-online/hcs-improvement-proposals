# Usage with Vite

Let's build a simple web application that connects to a Hedera wallet. We'll use Vite for quick setup and modern browser support.

Before you begin, see the [installation guide](./installation.md) for details.

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

## Common Issues and Solutions

1. **Build Errors**
   - Check that all dependencies are installed
   - Verify Vite configuration is correct
   - Make sure all imports are properly resolved

2. **Runtime Errors**
   - Check browser console for detailed error messages
   - Verify PROJECT_ID is valid
   - Ensure wallet supports WalletConnect v2

