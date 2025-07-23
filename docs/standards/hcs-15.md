---
description: The HCS-15 standard provides a dynamic ability for account holders to create multiple instances of their accounts that use the same private key.
sidebar_position: 15
---

# HCS-15 Standard: Creation of Petal (shadow) Accounts

### Status: Draft

### Version: 1.0

### Table of Contents

## Authors

- Patches [https://twitter.com/tmcc_patches](https://twitter.com/tmcc_patches)

### Abstract:

The HCS-15 standard provides a dynamic ability for account holders to create multiple instances of their accounts that use the same private key. This account dynamic enables multiple profiles, unique account ids, and asset holdings to be isolated in separate accounts on chain. The base account has the ability to orchestrate and execute transactions from each petal account as they are all utilizing the same private key.

### Motivation:

When utilizing HCS-11, the main memo of the account is restricted to one profile and one unique account id for that user or agent. Having the ability to have multiple profiles of HCS-11, tied to different unique identifiers, while also utilizing the same public/private key pair allows users and AI to dynamically create new identities and facilitate isolated escrows / commerce while maintaining the same signature.

## Specification

### Petal Account Creation

The initial account that a user creates is their base account. This base account is _highly recomended to be created with a ECDSA key + EVM Alias pair_. Creating the account this way will allow the base account to perform any complex EVM functionality that may require an accurate EVM Alias/private key pair (such as ECRECOVER).

Once the base account is created correctly, it can create it's first petal account.

Each Petal account contains the following attributes:

- (required) The same key as the base account
- (required) A HCS-11 profile memo (HCS-11 profile petal extension version) with valid inbound and outbound topic ids and base account reference defined
- (optional) A state topic for internal state consensus (defined in HCS-25)

Petals may optionally contain and reference topics of information like state hashes.
Reference HCS-25 if intereted in more topic functionality for petal creation.

### Account Memo Structure

The account memo follows a standardized format to indicate where the profile data is stored:

```
hcs-11:<protocol_reference>
```

Where:

- `hcs-11` is the protocol identifier
- `<protocol_reference>` can be either:
  - A [Hashgraph Resource Locator (HRL)](../definitions.md#hashgraph-resource-locator) for HCS protocols
  - Other URI formats for non-HCS protocols (IPFS, Arweave, HTTPS)

Examples of valid hcs-21 memo formats:

```
# HRL references (HCS protocols)
hcs-11:hcs://1/0.0.8768762
hcs-11:hcs://2/0.0.8768762
hcs-11:hcs://7/0.0.8768762

# Non-HCS protocol references
hcs-11:ipfs://QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX
hcs-11:ar://TQGxHPLpUcH7NG6rUYkzEnwD8_WqYQNPIoX5-0OoRXA
```

### HCS-15 Root Profile Schema

All profiles share these common fields:

| Field              | Type   | Required  | Description                                                                                        |
| ------------------ | ------ | --------- | -------------------------------------------------------------------------------------------------- |
| version            | string | Yes       | Standard version (e.g., "1.0")                                                                     |
| type               | number | Yes       | Profile type enum (0=personal [not officially supported yet], 1=ai_agent, 2=mcp_server)                |
| display_name       | string | Yes       | Display name for the profile                                                                       |
| **_base_account_** | string | **_Yes_** | **_Account Id of the base account for this petal's PK_**                                           |
| alias              | string | No        | Alternative identifier                                                                             |
| bio                | string | No        | Brief description or biography                                                                     |
| socials            | array  | No        | Array of social media links                                                                        |
| profileImage       | string | No        | Protocol reference - either HRL for HCS protocols (e.g., "hcs://1/0.0.12345") or other URI formats |
| properties         | object | No        | Additional unstructured profile properties                                                         |
| inboundTopicId     | string | No        | [HCS-10](/docs/standards/hcs-10) inbound communication topic                                       |
| outboundTopicId    | string | No        | [HCS-10](/docs/standards/hcs-10) action record topic                                               |

Below is a sample snippet of how this could be done with the JS SDK from hedera:

```ts
// 1. Generate the key‑pair that both new accounts will share
const sharedPrivKey = PrivateKey.generateECDSA(); // secp256k1
const sharedPubKey = sharedPrivKey.publicKey;
const evmAlias = sharedPubKey.toEvmAddress(); // 20‑byte, 0x‑prefixed

// 2. Create account #1 with the ECDSA key *and* EVM alias
const firstReceipt = await new AccountCreateTransaction()
  .setKey(sharedPubKey)
  .setAlias(evmAlias) // embeds the EVM address as the immutable alias
  .setInitialBalance(new Hbar(10)) // 10 ℏ so we can pay for next tx
  .execute(client)
  .then((tx) => tx.getReceipt(client));

// Not shown: Create and add HCS-11 profile

const firstAccountId = firstReceipt.accountId!.toString();
console.log(`🆗 First account: ${firstAccountId}`);

// 3. Create Petal Account by re‑using the same public key

const secondReceipt = await new AccountCreateTransaction()
  .setKey(sharedPubKey) // ★ same key as #1
  .setInitialBalance(new Hbar(1)) // tiny starting balance
  .setMaxAutomaticTokenAssociations(-1) // unlimited token airdrops
  .execute(client)
  .then((tx) => tx.getReceipt(client));

// Not shown: Create and add HCS-11 profile, referencing firstAccountId as base_account

const secondAccountId = secondReceipt.accountId!.toString();
console.log(`🆗 Second account (same PK): ${secondAccountId}`);
console.log(
  `🔑 Save this private key somewhere safe:\n${sharedPrivKey.toString()}`
);
```

## Security Concerns

- An alias set at creation cannot be changed later; if key‑rotation is a future requirement, create the account without a correct EVM alias

- Re‑using a key across multiple accounts provides diverse functionality but increases blast‑radius risk: compromise of one private key endangers every account that uses it: _plan your key‑management accordingly_.

- It is highly recommended to not rotate the keys of these accounts. If you must make update the keys, be sure to rotate the petal account keys first, then the base account.

## Conclusion

The HCS-15 standard provides a new method of managing on-chain assets in a decentralized manner. The requirement of HCS-10 with HCS-11 profiles for petal accounts opens a wide range of utility for these accounts to be used across many instances.

Petal accounts unlock on-chain profiles for various uses. Applications can now requet users create a new petal account and have full isolated control over their application profiles (social profile, video game characters, etc), isolated assets for each profile, and unique profile identifiers (account ids) while also giving the user the ease of only needing one key to operate and sign all the transactions with.
