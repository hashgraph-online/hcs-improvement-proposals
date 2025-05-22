# Usage with HCS-3 Recursion

Here's a minimal example showing how to use HCS-3 recursion to load the WalletConnect SDK and display a user's balance.

Before you begin, see the [installation guide](./installation.md) and [recursion guide](../recursion-sdk/usage.md) for details.

## Create index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Simple Hashinal Wallet</title>

    <!-- HCS-3 Configuration -->
    <script
      data-hcs-config
      data-hcs-cdn-url="https://kiloscribe.com/api/inscription-cdn/"
      data-hcs-network="mainnet"
      data-hcs-debug="true"
      data-hcs-retry-attempts="5"
      data-hcs-retry-backoff="500"
    ></script>

    <!-- Load WalletConnect SDK via HCS-3 -->
    <script
      data-src="hcs://1/0.0.7797532"
      data-script-id="wallet-connect"
      data-load-order="1"
    ></script>
  </head>
  <body>
    <div id="app">
      <button id="connectWallet">Connect Wallet</button>
      <button id="disconnectWallet" style="display: none;">Disconnect</button>
      <div id="accountInfo"></div>
    </div>

    <script>
      // Initialize after HCS loads
      window.HCSReady = async () => {
        const PROJECT_ID = 'YOUR_PROJECT_ID'; // Get from WalletConnect Dashboard
        const APP_METADATA = {
          name: 'Simple Wallet App',
          description: 'Basic wallet connection example',
          url: window.location.origin,
          icons: ['https://yourapp.com/icon.png'],
        };

        // Get SDK instance
        const sdk = window.HashinalsWalletConnectSDK;

        // UI update helper
        function updateUI(accountId, balance) {
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

        // checks for existing connection
        const accountResponse = await sdk.initAccount(PROJECT_ID, APP_METADATA);

        // If we have an account already, update the UI
        if (accountResponse && accountResponse.accountId) {
          updateUI(accountResponse.accountId, accountResponse.balance);
        }

        // Connect wallet handler
        document
          .getElementById('connectWallet')
          .addEventListener('click', async () => {
            try {
              const { accountId, balance } = await sdk.await connectWallet(
                PROJECT_ID,
                APP_METADATA
              );
              updateUI(accountId, balance);
            } catch (error) {
              console.error('Connection failed:', error);
              alert('Failed to connect wallet');
            }
          });

        // Disconnect wallet handler
        document
          .getElementById('disconnectWallet')
          .addEventListener('click', async () => {
            try {
              await sdk.disconnectWallet();
              updateUI(null);
            } catch (error) {
              console.error('Disconnect failed:', error);
            }
          });
      };
    </script>
  </body>
</html>
```

## Key Points

1. The WalletConnect SDK is loaded via HCS-3 recursion from topic `0.0.7797532`
2. The `HCSReady` callback ensures our code runs after the SDK is loaded
3. No build step or additional inscriptions needed - everything runs in the browser

## Common Issues

1. **Modal not displaying**

   - If you've enabled strict hosts in Wallet Connect, ensure your local host or other domains is in the list of allowed hosts.
   - Verify HCS-3 configuration is properly set
   - Check browser console for loading errors

2. **Connection Issues**
   - Verify PROJECT_ID is valid

Remember to replace `YOUR_PROJECT_ID` with your actual WalletConnect project ID!
