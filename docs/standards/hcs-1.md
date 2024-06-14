---
description: The HCS-1 standard provides a systematic approach to encode, chunk, upload, retrieve, and reassemble file data for applications using Hedera Consensus Service (HCS). This process is agnostic of the implementation details, focusing on the JSON structure and the use of a Topic ID for efficient data management.
---

# HCS-1 Standard: File Data Management with Hedera Consensus Service

### Status: Published

### Table of Contents
- [HCS-1 Standard: File Data Management with Hedera Consensus Service](#hcs-1-standard-file-data-management-with-hedera-consensus-service)
    - [Status: Published](#status-published)
    - [Table of Contents](#table-of-contents)
  - [Authors](#authors)
  - [Abstract](#abstract)
  - [Motivation](#motivation)
  - [HCS Topic Validation](#hcs-topic-validation)
    - [Memo Structure](#memo-structure)
  - [Encoding and Chunking](#encoding-and-chunking)
    - [Uploading to HCS](#uploading-to-hcs)
  - [Retrieving and Reassembling](#retrieving-and-reassembling)
  - [Conclusion](#conclusion)

## Authors
- Kantorcodes [https://twitter.com/kantorcodes]()

### Additional Authors
- Patches [https://twitter.com/tmcc_patches]()

### Abstract
The HCS-1 standard offers a structured method to encode, chunk, upload, retrieve, and reassemble file data using Hedera Consensus Service (HCS). This standard focuses on the JSON structure and Topic ID for effective data management, regardless of implementation details.

### Motivation
Storing data on-chain is vital for verification, immutability, and scaling web3 applications. This specification supports use cases like Hashinals, decentralized applications, and enhanced peer-to-peer communication without relying on cloud infrastructure.

### HCS Topic Validation
HCS-1 topics must:

1. **Include a SHA-256 Hash**: The memo should contain the file's SHA-256 hash, compression algorithm, and encoding. This ensures data validity by comparing the file hash to the memo.
2. **Submit Key**: Topics must have a Submit Key. Topics without this key are invalid and ignored.
3. **No Admin Key**: Topics with an Admin Key are invalid and ignored, ensuring data cannot be deleted, reducing protocol risk.

### Memo Structure
The memo format is:

```
[hash]:[algo]:[encoding]
```

- **[hash]**: SHA-256 hash of the file before compression.
- **[algo]**: Compression algorithm (e.g., zstd).
- **[encoding]**: Encoding method (e.g., base64).

Example:

```
532eaabd9574880dbf76b9b8cc00832c20a6ec113d682299550d7a6e0f345e25:zstd:base64
```

Only `zstd` and `base64` are currently supported.

### Encoding and Chunking
Steps to format file data for HCS:

1. **Compression**: Compress the file using `zstd` (e.g., using MongoDB library in NodeJS).
    ```javascript
    const compressedFile = await compress(file, 10);
    ```
2. **Base64 Encoding**: Convert the compressed data (buffer) to a base64 string.
3. **Chunking**: Split the base64 string into chunks ≤ 1024 bytes, encapsulated in JSON objects with:
   - `o`: Order index.
   - `c`: Chunk content.

Example chunk format:
```json
{
  "o": 0,
  "c": "base64-encoded-chunk"
}
```

### Uploading to HCS
Upload each chunk as an HCS message to a Hedera Consensus Service topic. The order of upload doesn't matter due to the `o` property in the JSON schema, allowing parallel uploads.

### Retrieving and Reassembling
Steps to display the data:

1. **Fetch Messages**: Retrieve all chunk messages from the Topic ID and sort by `o`.
2. **Concatenate and Decompress**: Combine the chunks and decompress using a `zstd` decoding library.
3. **Verify Hash**: Ensure the Topic ID memo matches the SHA-256 hash of the decompressed data.
4. **Decode**: Convert the uncompressed base64 string back into binary data.

### Conclusion
The HCS-1 standard provides a reliable protocol for managing file data within Hedera Consensus Service. It leverages JSON for data structuring and a registry for efficient topic management, ensuring data integrity and facilitating scalable application development on Hedera.