---
sidebar_position: 3
---

# SDK Reference

### `init(projectId: string, metadata: SignClientTypes.Metadata, network?: LedgerId)`

Initializes the SDK with the given project ID, metadata, and optional network selection.

UMD Example:

```javascript
const projectId = 'your_project_id';
const metadata = {
  name: 'My Hashinals App',
  description: 'A Hashinals application using WalletConnect',
  url: 'https://myapp.com',
  icons: ['https://myapp.com/icon.png'],
};
await window.HashinalsWalletConnectSDK.init(projectId, metadata);
```

ESM Example:

```javascript
import { HashinalsWalletConnectSDK } from '@hashgraphonline/hashinal-wc';
import { LedgerId } from '@hashgraph/sdk';

const sdk = HashinalsWalletConnectSDK.getInstance();
await sdk.init(projectId, metadata, LedgerId.TESTNET);
```

### `connect()`

Opens the WalletConnect modal for users to connect their wallet.

UMD Example:

```javascript
const session = await window.HashinalsWalletConnectSDK.connect();
```

ESM Example:

```javascript
const session = await sdk.connect();
```

### `disconnect()`

Disconnects from all connected wallets.

UMD Example:

```javascript
await window.HashinalsWalletConnectSDK.disconnect();
```

ESM Example:

```javascript
await sdk.disconnect();
```

### `submitMessageToTopic(topicId: string, message: string, submitKey?: PrivateKey)`

Submits a message to a specified Hedera topic.

UMD Example:

```javascript
const topicId = '0.0.1234567';
const message = 'Hello, Hedera!';
const receipt = await window.HashinalsWalletConnectSDK.submitMessageToTopic(
  topicId,
  message
);
```

ESM Example:

```javascript
import { PrivateKey } from '@hashgraph/sdk';

const submitKey = PrivateKey.fromString(
  '302e020100300506032b657004220420f4361ec73dc43e568f1620a7b7ecb7330790b8a1c7620f1ce353aa1de4f0eaa6'
);
const receipt = await sdk.submitMessageToTopic(topicId, message, submitKey);
```

### `transferHbar(fromAccountId: string, toAccountId: string, amount: number)`

Transfers HBAR from one account to another.

UMD Example:

```javascript
const fromAccountId = '0.0.1234567';
const toAccountId = '0.0.7654321';
const amount = 10; // in HBAR
const receipt = await window.HashinalsWalletConnectSDK.transferHbar(
  fromAccountId,
  toAccountId,
  amount
);
```

ESM Example:

```javascript
const receipt = await sdk.transferHbar(fromAccountId, toAccountId, amount);
```

### `executeSmartContract(contractId: string, functionName: string, parameters: ContractFunctionParameters, gas: number = 100000)`

Executes a function on a smart contract.

UMD Example:

```javascript
const contractId = '0.0.1234567';
const functionName = 'myFunction';
const parameters =
  new window.HashgraphSDK.ContractFunctionParameters().addString('Hello');
const receipt = await window.HashinalsWalletConnectSDK.executeSmartContract(
  contractId,
  functionName,
  parameters
);
```

ESM Example:

```javascript
import { ContractFunctionParameters } from '@hashgraph/sdk';

const parameters = new ContractFunctionParameters().addString('Hello');
const receipt = await sdk.executeSmartContract(
  contractId,
  functionName,
  parameters,
  150000
);
```

### `getMessages(topicId: string, lastTimestamp?: number, disableTimestampFilter: boolean = false)`

Retrieves messages from a specific Hedera topic.

UMD Example:

```javascript
const topicId = '0.0.1234567';
const result = await window.HashinalsWalletConnectSDK.getMessages(topicId);
console.log(result.messages);
```

ESM Example:

```javascript
const result = await sdk.getMessages(topicId, 1625097600000, true);
console.log(result.messages);
```

### `transferToken(tokenId: string, fromAccountId: string, toAccountId: string, amount: number)`

Transfers tokens between accounts.

UMD Example:

```javascript
const tokenId = '0.0.1234567';
const fromAccountId = '0.0.7654321';
const toAccountId = '0.0.8765432';
const amount = 100;
const receipt = await window.HashinalsWalletConnectSDK.transferToken(
  tokenId,
  fromAccountId,
  toAccountId,
  amount
);
```

ESM Example:

```javascript
const receipt = await sdk.transferToken(
  tokenId,
  fromAccountId,
  toAccountId,
  amount
);
```

### `createAccount(initialBalance: number)`

Creates a new account on the Hedera Hashgraph.

UMD Example:

```javascript
const initialBalance = 50; // in HBAR
const receipt = await window.HashinalsWalletConnectSDK.createAccount(
  initialBalance
);
```

ESM Example:

```javascript
const receipt = await sdk.createAccount(initialBalance);
```

### `associateTokenToAccount(accountId: string, tokenId: string)`

Associates a token with an account.

UMD Example:

```javascript
const accountId = '0.0.1234567';
const tokenId = '0.0.7654321';
const receipt = await window.HashinalsWalletConnectSDK.associateTokenToAccount(
  accountId,
  tokenId
);
```

ESM Example:

```javascript
const receipt = await sdk.associateTokenToAccount(accountId, tokenId);
```

### `dissociateTokenFromAccount(accountId: string, tokenId: string)`

Removes a token association from an account.

UMD Example:

```javascript
const accountId = '0.0.1234567';
const tokenId = '0.0.7654321';
const receipt =
  await window.HashinalsWalletConnectSDK.dissociateTokenFromAccount(
    accountId,
    tokenId
  );
```

ESM Example:

```javascript
const receipt = await sdk.dissociateTokenFromAccount(accountId, tokenId);
```

### `updateAccount(accountId: string, maxAutomaticTokenAssociations: number)`

Updates an account's properties.

UMD Example:

```javascript
const accountId = '0.0.1234567';
const maxAutomaticTokenAssociations = 10;
const receipt = await window.HashinalsWalletConnectSDK.updateAccount(
  accountId,
  maxAutomaticTokenAssociations
);
```

ESM Example:

```javascript
const receipt = await sdk.updateAccount(
  accountId,
  maxAutomaticTokenAssociations
);
```

### `getAccountInfo()`

Fetches the account ID and network of the connected wallet.

UMD Example:

```javascript
const accountInfo = await window.HashinalsWalletConnectSDK.getAccountInfo();
console.log('Account ID:', accountInfo.accountId);
console.log('Network:', accountInfo.network);
```

ESM Example:

```javascript
const accountInfo = await sdk.getAccountInfo();
console.log('Account ID:', accountInfo.accountId);
console.log('Network:', accountInfo.network);
```

### `getAccountBalance()`

Retrieves the HBAR balance of the connected account.

UMD Example:

```javascript
const balance = await window.HashinalsWalletConnectSDK.getAccountBalance();
console.log('Account balance:', balance);
```

ESM Example:

```javascript
const balance = await sdk.getAccountBalance();
console.log('Account balance:', balance);
```

### `createTopic(memo?: string, adminKey?: string, submitKey?: string)`

Creates a new topic on the Hedera Hashgraph.

UMD Example:

```javascript
const memo = 'My new topic';
const adminKey =
  '302e020100300506032b657004220420f4361ec73dc43e568f1620a7b7ecb7330790b8a1c7620f1ce353aa1de4f0eaa6';
const submitKey =
  '302e020100300506032b6570042204203e7b42b1d113a323daf39a35a86824a570fc92192502f5e4b4d5830dac9af0f1';
const topicId = await window.HashinalsWalletConnectSDK.createTopic(
  memo,
  adminKey,
  submitKey
);
console.log('New topic created:', topicId);
```

ESM Example:

```javascript
import { PrivateKey } from '@hashgraph/sdk';

const memo = 'My new topic';
const adminKey = PrivateKey.fromString(
  '302e020100300506032b657004220420f4361ec73dc43e568f1620a7b7ecb7330790b8a1c7620f1ce353aa1de4f0eaa6'
);
const submitKey = PrivateKey.fromString(
  '302e020100300506032b6570042204203e7b42b1d113a323daf39a35a86824a570fc92192502f5e4b4d5830dac9af0f1'
);
const topicId = await sdk.createTopic(memo, adminKey, submitKey);
console.log('New topic created:', topicId);
```

### `createToken(name: string, symbol: string, initialSupply: number, decimals: number, treasuryAccountId: string, adminKey: string, supplyKey: string)`

Creates a new token on the Hedera Hashgraph.

UMD Example:

```javascript
const name = 'My Token';
const symbol = 'MTK';
const initialSupply = 1000000;
const decimals = 2;
const treasuryAccountId = '0.0.1234567';
const adminKey =
  '302e020100300506032b657004220420f4361ec73dc43e568f1620a7b7ecb7330790b8a1c7620f1ce353aa1de4f0eaa6';
const supplyKey =
  '302e020100300506032b6570042204203e7b42b1d113a323daf39a35a86824a570fc92192502f5e4b4d5830dac9af0f1';
const tokenId = await window.HashinalsWalletConnectSDK.createToken(
  name,
  symbol,
  initialSupply,
  decimals,
  treasuryAccountId,
  adminKey,
  supplyKey
);
console.log('New token created:', tokenId);
```

ESM Example:

```javascript
import { PrivateKey } from '@hashgraph/sdk';

const name = 'My Token';
const symbol = 'MTK';
const initialSupply = 1000000;
const decimals = 2;
const treasuryAccountId = '0.0.1234567';
const adminKey = PrivateKey.fromString(
  '302e020100300506032b657004220420f4361ec73dc43e568f1620a7b7ecb7330790b8a1c7620f1ce353aa1de4f0eaa6'
);
const supplyKey = PrivateKey.fromString(
  '302e020100300506032b6570042204203e7b42b1d113a323daf39a35a86824a570fc92192502f5e4b4d5830dac9af0f1'
);
const tokenId = await sdk.createToken(
  name,
  symbol,
  initialSupply,
  decimals,
  treasuryAccountId,
  adminKey,
  supplyKey
);
console.log('New token created:', tokenId);
```

### `mintNFT(tokenId: string, metadata: string, supplyKey: PrivateKey)`

Mints a new NFT for an existing token.

UMD Example:

```javascript
const tokenId = '0.0.1234567';
const metadata = 'ipfs://QmXxx...';
const supplyKey =
  '302e020100300506032b657004220420f4361ec73dc43e568f1620a7b7ecb7330790b8a1c7620f1ce353aa1de4f0eaa6';
const receipt = await window.HashinalsWalletConnectSDK.mintNFT(
  tokenId,
  metadata,
  supplyKey
);
console.log('NFT minted:', receipt);
```

ESM Example:

```javascript
import { PrivateKey } from '@hashgraph/sdk';

const tokenId = '0.0.1234567';
const metadata = 'ipfs://QmXxx...';
const supplyKey = PrivateKey.fromString(
  '302e020100300506032b657004220420f4361ec73dc43e568f1620a7b7ecb7330790b8a1c7620f1ce353aa1de4f0eaa6'
);
const receipt = await sdk.mintNFT(tokenId, metadata, supplyKey);
console.log('NFT minted:', receipt);
```

### `getAccountTokens(accountId: string)`

Retrieves all tokens associated with an account.

UMD Example:

```javascript
const accountId = '0.0.1234567';
const tokens = await window.HashinalsWalletConnectSDK.getAccountTokens(
  accountId
);
console.log('Account tokens:', tokens);
```

ESM Example:

```javascript
const accountId = '0.0.1234567';
const tokens = await sdk.getAccountTokens(accountId);
console.log('Account tokens:', tokens);
```

### `getTransaction(transactionId: string)`

Retrieves transaction details by transaction ID from the mirror node.

UMD Example:

```javascript
const transactionId = '0.0.123456@1234567890.000000000';
const transaction = await window.HashinalsWalletConnectSDK.getTransaction(
  transactionId
);
console.log(transaction);
```

ESM Example:

```javascript
const transaction = await sdk.getTransaction(transactionId);
```

### `getTransactionByTimestamp(timestamp: string)`

Retrieves transaction details by consensus timestamp from the mirror node.

UMD Example:

```javascript
const timestamp = '1234567890.000000000';
const transaction =
  await window.HashinalsWalletConnectSDK.getTransactionByTimestamp(timestamp);
console.log(transaction);
```

ESM Example:

```javascript
const transaction = await sdk.getTransactionByTimestamp(timestamp);
```

### `getAccountNFTs(accountId: string, tokenId?: string)`

Retrieves all NFTs owned by an account, with optional filtering by token ID.

UMD Example:

```javascript
const accountId = '0.0.123456';
const nfts = await window.HashinalsWalletConnectSDK.getAccountNFTs(accountId);
console.log(nfts);

// With token filter
const tokenId = '0.0.789012';
const filteredNfts = await window.HashinalsWalletConnectSDK.getAccountNFTs(
  accountId,
  tokenId
);
```

ESM Example:

```javascript
const nfts = await sdk.getAccountNFTs(accountId);
const filteredNfts = await sdk.getAccountNFTs(accountId, tokenId);
```

### `validateNFTOwnership(serialNumber: string, accountId: string, tokenId: string)`

Validates if an account owns a specific NFT by serial number and token ID.

UMD Example:

```javascript
const serialNumber = '1';
const accountId = '0.0.123456';
const tokenId = '0.0.789012';
const nft = await window.HashinalsWalletConnectSDK.validateNFTOwnership(
  serialNumber,
  accountId,
  tokenId
);
console.log(nft ? 'Account owns this NFT' : 'Account does not own this NFT');
```

ESM Example:

```javascript
const nft = await sdk.validateNFTOwnership(serialNumber, accountId, tokenId);
```

### `readSmartContract(data: string, fromAccount: AccountId, contractId: ContractId, estimate?: boolean, value?: number)`

Makes a read-only call to a smart contract on the mirror node.

UMD Example:

```javascript
const data = '0x...'; // Contract call data
const fromAccount = window.HashgraphSDK.AccountId.fromString('0.0.123456');
const contractId = window.HashgraphSDK.ContractId.fromString('0.0.789012');
const result = await window.HashinalsWalletConnectSDK.readSmartContract(
  data,
  fromAccount,
  contractId
);
console.log(result);
```

ESM Example:

```javascript
import { AccountId, ContractId } from '@hashgraph/sdk';

const fromAccount = AccountId.fromString('0.0.123456');
const contractId = ContractId.fromString('0.0.789012');
const result = await sdk.readSmartContract(data, fromAccount, contractId);
```
