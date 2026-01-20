---
title: Hashinals Guide
sidebar_position: 7
description: Build inscribed HTML applications using HCS-3 standard
pagination_prev: libraries/hashinal-wc/usage-with-vite
pagination_next: libraries/hashinal-wc/topics
---

# Hashinals Guide

Build fully on-chain HTML applications (Hashinals) using HCS-3 recursion to load the WalletConnect SDK directly from Hedera.

## Overview

Hashinals are inscribed HTML applications that run entirely from data stored on Hedera using the HCS-3 standard. This guide shows how to create a simple wallet-connected Hashinal.

## Prerequisites

- Understanding of HCS-3 recursion
- WalletConnect project ID ([get one here](https://cloud.walletconnect.com/))
- Basic HTML/JavaScript knowledge

For more details, see the [installation guide](../installation) and [recursion guide](../../recursion-sdk/usage).

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
              const { accountId, balance } = await sdk.connectWallet(
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

## How It Works

### Key Points

1. **SDK Loading**: The WalletConnect SDK is loaded via HCS-3 recursion from topic `0.0.7797532`
2. **Initialization**: The `HCSReady` callback ensures our code runs after the SDK is loaded
3. **No Build Required**: Everything runs directly in the browser - no build step or npm needed
4. **Fully On-Chain**: Your entire application can be inscribed to Hedera

## Troubleshooting

### Modal Not Displaying

- **Strict Hosts**: If you've enabled strict hosts in WalletConnect, ensure your domain is in the allowed list
- **HCS-3 Config**: Verify the HCS-3 configuration attributes are properly set
- **Console Errors**: Check browser console for SDK loading errors

### Connection Issues

- **Project ID**: Verify your WalletConnect project ID is valid
- **Network**: Ensure you're using the correct network (mainnet/testnet)
- **Browser**: Some browsers may block popups - check your browser settings

## Next Steps

- Explore [API Methods](../methods) for more SDK capabilities
- Learn about [HCS Topics](../topics) for message handling
- Check out the [HCS-3 standard](../../../standards/hcs-3) for advanced recursion features

> **Important**: Remember to replace `YOUR_PROJECT_ID` with your actual WalletConnect project ID!
