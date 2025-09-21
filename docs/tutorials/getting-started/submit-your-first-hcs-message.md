---
title: Submit Your First HCS Message
description: Learn how to submit messages to the Hedera Consensus Service
sidebar_position: 2
---

# Submit Your First HCS Message

## Summary

Learn the fundamentals of the Hedera Consensus Service (HCS) by creating a topic, submitting messages, and subscribing to real-time updates. HCS provides decentralized ordering and timestamping for any application.

***

## Prerequisites

We recommend you complete the following before starting:

1. [Setup Your Environment](./setup-environment.md)
2. Get a [Hedera testnet account](https://portal.hedera.com)
3. Ensure you have HBAR in your account

***

## 1. Create a Topic

Use **`TopicCreateTransaction()`** to create a new topic. Topics are channels where messages are submitted and ordered by consensus.

```javascript
// CREATE A NEW TOPIC
const topicCreateTx = new TopicCreateTransaction()
  .setTopicMemo("My First HCS Topic")
  .freezeWith(client);

// SIGN WITH YOUR ACCOUNT KEY (if admin key is set)
const topicCreateSign = await topicCreateTx.sign(privateKey);

// SUBMIT THE TRANSACTION
const topicCreateSubmit = await topicCreateSign.execute(client);

// GET THE TRANSACTION RECEIPT
const topicCreateRx = await topicCreateSubmit.getReceipt(client);

// GET THE TOPIC ID
const topicId = topicCreateRx.topicId;

// LOG THE TOPIC ID TO THE CONSOLE
console.log(`✅ Created topic with ID: ${topicId}`);
```

***

## 2. Submit a Message to the Topic

Now that you have a topic, submit messages using **`TopicMessageSubmitTransaction()`**. Messages can be any data up to 1024 bytes.

```javascript
// SUBMIT MESSAGE TO TOPIC
const message = "Hello HCS!";

const submitTx = new TopicMessageSubmitTransaction()
  .setTopicId(topicId)
  .setMessage(message)
  .freezeWith(client);

// SUBMIT THE TRANSACTION
const submitTxSubmit = await submitTx.execute(client);

// GET THE RECEIPT OF THE TRANSACTION
const submitRx = await submitTxSubmit.getReceipt(client);

// LOG THE TRANSACTION STATUS
console.log(`Message submission: ${submitRx.status} ✅`);
console.log(`Transaction ID: ${submitTxSubmit.transactionId}`);
```

***

## 3. Subscribe to Topic Messages

Subscribe to receive messages from a topic in real-time using **`TopicMessageQuery()`**.

```javascript
// SUBSCRIBE TO TOPIC
new TopicMessageQuery()
  .setTopicId(topicId)
  .subscribe(client, null, (message) => {
    const messageString = Buffer.from(message.contents).toString();
    console.log(`Received: ${messageString}`);
    console.log(`  Sequence: ${message.sequenceNumber}`);
    console.log(`  Timestamp: ${message.consensusTimestamp}`);
  });

console.log("Listening for messages... (press Ctrl+C to exit)");
```

***

## 4. Complete Example

Put it all together in a complete working example:

```javascript
import { 
  Client, 
  TopicCreateTransaction,
  TopicMessageSubmitTransaction,
  TopicMessageQuery,
  PrivateKey
} from "@hashgraph/sdk";
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  // INITIALIZE CLIENT
  const accountId = process.env.HEDERA_ACCOUNT_ID;
  const privateKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY);
  
  const client = Client.forTestnet();
  client.setOperator(accountId, privateKey);

  try {
    // 1. CREATE TOPIC
    console.log("Creating topic...");
    const topicCreateTx = await new TopicCreateTransaction()
      .setTopicMemo("Tutorial Topic")
      .execute(client);

    const topicCreateRx = await topicCreateTx.getReceipt(client);
    const topicId = topicCreateRx.topicId;
    console.log(`✅ Topic created: ${topicId}\n`);

    // Wait for consensus
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 2. SUBMIT MESSAGES
    const messages = [
      "Hello HCS!",
      "This is my first message",
      JSON.stringify({ type: "data", value: 42 })
    ];

    console.log("Submitting messages...");
    for (const msg of messages) {
      const submitTx = await new TopicMessageSubmitTransaction()
        .setTopicId(topicId)
        .setMessage(msg)
        .execute(client);

      const submitRx = await submitTx.getReceipt(client);
      console.log(`✅ Sent: "${msg}"`);
    }

    // 3. SUBSCRIBE TO TOPIC
    console.log("\nSubscribing to topic...");
    new TopicMessageQuery()
      .setTopicId(topicId)
      .setStartTime(0) // Get all messages from beginning
      .subscribe(client, null, (message) => {
        const messageString = Buffer.from(message.contents).toString();
        console.log(`\n📨 Received Message`);
        console.log(`  Content: ${messageString}`);
        console.log(`  Sequence: ${message.sequenceNumber}`);
        console.log(`  Timestamp: ${message.consensusTimestamp}`);
      });

    // Keep running
    console.log("\nListening for messages (press Ctrl+C to exit)...");
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

main();
```

### Console Output Example:

```bash
Creating topic...
✅ Topic created: 0.0.4567890

Submitting messages...
✅ Sent: "Hello HCS!"
✅ Sent: "This is my first message"
✅ Sent: "{"type":"data","value":42}"

Subscribing to topic...

Listening for messages (press Ctrl+C to exit)...

📨 Received Message
  Content: Hello HCS!
  Sequence: 1
  Timestamp: 1234567890.123456789

📨 Received Message
  Content: This is my first message
  Sequence: 2
  Timestamp: 1234567890.234567890
```

***

## 4. Message Properties Explained

| Property | Description |
|----------|-------------|
| **Sequence Number** | Order of message in the topic (starts at 1) |
| **Consensus Timestamp** | Exact time when consensus was reached |
| **Running Hash** | Cryptographic proof of message history |
| **Contents** | Your message data (up to 1024 bytes) |

:::info
Messages larger than 1024 bytes need to be chunked. Use the HCS-1 standard for automatic chunking.
:::

***

## Common Use Cases

- **Audit Logs** - Immutable record of events with timestamps
- **Ordering Service** - Fair ordering for any distributed application
- **Data Integrity** - Proof of data existence at specific time
- **Message Bus** - Cross-application communication channel

***

## Code Check & Validation

Here's a complete script you can run to validate your setup:

```javascript
// check-hcs.js
import { Client, TopicCreateTransaction, TopicMessageSubmitTransaction, PrivateKey } from "@hashgraph/sdk";
import * as dotenv from 'dotenv';

dotenv.config();

async function checkHCS() {
  try {
    // Initialize client
    const client = Client.forTestnet();
    client.setOperator(
      process.env.HEDERA_ACCOUNT_ID,
      process.env.HEDERA_PRIVATE_KEY
    );

    console.log("🔍 Checking HCS functionality...\n");

    // Test 1: Create Topic
    console.log("Test 1: Creating topic...");
    const topicTx = await new TopicCreateTransaction()
      .setTopicMemo("Test Topic")
      .execute(client);
    const topicReceipt = await topicTx.getReceipt(client);
    console.log(`✅ Topic created: ${topicReceipt.topicId}`);

    // Test 2: Submit Message
    console.log("\nTest 2: Submitting message...");
    const messageTx = await new TopicMessageSubmitTransaction()
      .setTopicId(topicReceipt.topicId)
      .setMessage("Test message")
      .execute(client);
    const messageReceipt = await messageTx.getReceipt(client);
    console.log(`✅ Message submitted: ${messageReceipt.status}`);

    console.log("\n✅ All HCS checks passed!");
    console.log(`View on HashScan: https://hashscan.io/testnet/topic/${topicReceipt.topicId}`);
    
  } catch (error) {
    console.error("❌ HCS check failed:", (error as Error).message);
    process.exit(1);
  }
}

checkHCS();
```

Run with:
```bash
node check-hcs.js
```

***

## Next Steps

Now that you understand HCS basics, continue with:

➡ [Inscribe Your First File](../inscriptions/inscribe-your-first-file.md) - Store files using HCS

➡ [HCS-1 Standard](../../standards/hcs-1.md) - Large file storage specification

➡ [HCS-2 Standard](../../standards/hcs-2.md) - Create topic registries

***

## Troubleshooting

<details>
<summary><b>INVALID_TOPIC_ID</b></summary>

- Verify the topic exists on the network
- Check you're on the correct network (testnet/mainnet)
- Ensure topic ID format is correct (e.g., 0.0.123456)

</details>

<details>
<summary><b>MESSAGE_SIZE_TOO_LARGE</b></summary>

- Keep messages under 1024 bytes
- Use HCS-1 standard for larger data
- Consider chunking large messages

</details>

<details>
<summary><b>INSUFFICIENT_TX_FEE</b></summary>

- HCS operations cost ~$0.0001
- Ensure account has sufficient HBAR
- Check fee schedule on [Hedera docs](https://docs.hedera.com/guides/mainnet/fees)

</details>

***

## View Your Topic on HashScan

import { ViewOnHashScan, HashScanViewer } from '@site/src/components/MDXComponents';

After creating your topic, you can view it on HashScan. If you know your topic ID:

<HashScanViewer 
  topicId="0.0.YOUR_TOPIC_ID"
  network="testnet"
/>

Or use the quick link component:

<ViewOnHashScan topicId="0.0.YOUR_TOPIC_ID" network="testnet" />

## Additional Resources

import { DocsLink, ExternalLink } from '@site/src/components/MDXComponents';

<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
  <DocsLink href="https://docs.hedera.com/guides/docs/sdks/consensus">
    HCS Documentation
  </DocsLink>
  <ExternalLink href="https://hashscan.io/testnet">
    Topic Explorer
  </ExternalLink>
</div>

- [HCS Documentation](https://docs.hedera.com/guides/docs/sdks/consensus) - Official Hedera documentation
- [Topic Explorer](https://hashscan.io/testnet) - View topics on HashScan
- [HCS Standards](../../standards) - All HCS specifications



