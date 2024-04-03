# HCS-2 Standard: Advanced Topic Registries

### Status: Draft

### Table of Contents

- [HCS-2 Standard: Advanced Topic Registries](#hcs-2-standard-advanced-topic-registries)
    - [Status: Draft](#status-draft)
    - [Table of Contents](#table-of-contents)
  - [Authors](#authors)
  - [Abstract](#abstract)
  - [Motivation](#motivation)
  - [Specification](#specification)

## Primary Author
- Patches [https://twitter.com/TMCC_Patches]()

## Additional Authors
- Kantorcodes [https://twitter.com/kantorcodes]()

## Abstract

This standard introduces advanced methodologies for managing and interacting with Topic Registries within the HCS framework. It focuses on enabling dynamic metadata, versioning, and comprehensive file management through unique identifiers and protocols.

## Motivation

The advent of dynamic metadata and the need for detailed version histories and state management in decentralized environments have necessitated the development of more sophisticated Topic Registries. This standard aims to provide a robust framework for indexing, retrieving, and interpreting diverse data types, enhancing the utility and scalability of NFTs, and facilitating advanced web functionalities like full site recursion.

## Specification

### Registry Format and Usage

The registry should adopt a standardized format to ensure consistent access and interpretation. The following fields are introduced:

| Field     | Description                                                        | Example Value          |
|-----------|--------------------------------------------------------------------|------------------------|
| `p`       | Protocol used by the registry, typically `hcs-2` for this standard.| `hcs-2`                |
| `op`      | Operation being executed (register, delete, update).               | `register`             |
| `t_id`    | Topic ID where the registry information is stored.                 | `0.0.1234567`          |
| `uid`     | Sequence number for files or states within the registry.         | `42`            |
| `m`       | Optional metadata providing additional context.                    | `Update for Q2 release`|

`m` - memo is restricted to 500 charcters 

### Operations

- **Register**: Adds new entries or versions to the registry.
- **Delete**: Removes entries based on UID.
- **Update**: Modifies existing entries, by changing the referenced sequence number and updating the t_id and metadata pointers.


### Memo for Indexers and Browsers

A memo system is defined for indexers and browsers to understand the data's state and interpret it accordingly. The memo format follows:

`[protocol_standard]:[indexed]`

| Field     | Description                                                        | Example Value          |
|-----------|--------------------------------------------------------------------|------------------------|
| `protocol_standard`       | Protocol used by the registry, `hcs-2` for this standard.| `hcs-2`                |
| `indexed`     | enum value of if all messages need pulled down or only the last / newest message | `0`           |


| Indexed enum     | Description                                                       
|-----------|-------------------------------------------------------------------------------------------|
| `0`       | The topic id is indexed, and all messages should be read
| `1`     | The topic id is not indexed, and only the last message should be used to determine state / topic data


### Example Memo Format

`hcs-2:0`

### Indexed Registry Mechanics [enum: 0]
Uses:
Topic ids used for registiers where you need all records to get the data you need to execute logic. Typically good for most registeries. 

Examples:
1. User registry for profiles of a video game
2. A registry for posts on a social media site for a specific user

- Expectation for new records to be continually added.
- Indexers should gather all files and metadata listed in the registry.
- Processing state should start from the first message and proceed to the last sequential message number.


### Non-Indexed Registry Mechanics [enum: 1]
Uses:
Topic ids used for dynamic state of an entity. The latest message being used is the current state of the entity being defined

Examples:
1. A description for a product on a ecom site
2. A state of an NFT for a video game 

- Expectation for new records to be continually added.
- Indexers should gather `only the last message` and metadata in that message will determine the protocol and execution. 
- Processing state should start from the first message and proceed to the last sequential message number.


### Use Cases and Functionalities

- Dynamic metadata enables NFTs and other assets to reflect changes and updates over time.
- Full version history allows for a complete understanding of an item's evolution.
- Enhanced file and website management through recursive indexing and state awareness.

### Example URI Format

Registry links should follow a consistent format to ensure easy access and interpretation:

`hcs://2/{topic_id}`

This facilitates direct access to specific registry entries and simplifies integration with external systems and applications.


#### Register

Register new entries or versions to the registry using the following JSON structure:

```json
{
  "p": "hcs-2",
  "op": "register",
  "t_id": "TOPIC_ID_TO_REGISTER",
  "metadata": "OPTIONAL_METADATA (HIP-412 compliant)",
  "m": "OPTIONAL_MEMO",
}
```

example useage:
```json
{
  "p": "hcs-2",
  "op": "register",
  "t_id": "0.0.123456",
  "metadata": "hcs://1/0.0.456789",
  "m": "register t",
}
```

#### Delete

Remove entries based on UID or sequence number of the message on the topic id

```json
{
  "p": "hcs-2",
  "op": "delete",
  "uid": "SEQUENCE_NUMBER_OF_REGISTER_MESSAGE_TO_DELETE",
  "m": "OPTIONAL_MEMO"
}
```

example usage:
```json
{
  "p": "hcs-2",
  "op": "delete",
  "uid": "33",
  "m": "remove hashsite from users bookmark"
}
```

#### Update

Modify existing entries, completed by updating the uid or sequence number and updating that record with new metadata. Use the following JSON structure:

```json
{
  "p": "hcs-2",
  "op": "update",
  "uid": "SEQUENCE_NUMBER_OF_REGISTER_MESSAGE_TO_UPDATE",
  "t_id": "NEW_TOPIC_ID_TO_REGISTER",
  "metadata": "OPTIONAL_METADATA (HIP-412 compliant)",
  "m": "OPTIONAL_MEMO"
}
```

example usage:
```json
{
  "p": "hcs-2",
  "op": "update",
  "uid": "60",
  "t_id": "0.0.123456",
  "metadata": "hcs://1/0.0.456789",
  "m": "update sequence number 60 to a new topic id and metadata"
}
```

## Validation

Each field within the JSON structure for the `register`, `delete`, and `update` operations must meet specific criteria to be considered valid:

- **`p` (Protocol)**: Must be a string matching `hcs-2`. This validates that the entry adheres to the current standard.
- **`op` (Operation)**: Must be one of `register`, `delete`, or `update`. This indicates the action being performed.
- **`t_id` (Topic ID)**: Should match the Hedera account ID format, which is three groups of numbers separated by periods (e.g., `0.0.123456`).
- **`uid` (Unique Identifier)**: Must be a valid sequence number or unique identifier relevant to the operation.
- **`m` (Memo)**: An optional field providing additional context or information. Limited to 500 characters.

### Attributes Validation

Specific validation rules for each attribute ensure that users adhere to the format and standards expected within the HCS framework, enhancing interoperability and consistency.

### Conclusion

HCS-2 creates a method of connecting data and enabling dynamic state registries 
