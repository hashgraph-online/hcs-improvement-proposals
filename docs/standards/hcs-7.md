# HCS-7 Standard: Smart Hashinals

### Status: Draft

### Table of Contents

- [HCS-7 Standard: Smart Hashinals](#hcs-7-standard-smart-hashinals)
    - [Status: Draft](#status-draft)
    - [Table of Contents](#table-of-contents)
  - [Authors](#authors)
  - [Abstract](#abstract)
  - [Motivation](#motivation)
  - [Specification](#specification)
    - [Creating an HCS-7 Topic ID](#creating-an-hcs-7-topic-id)
    - [Metadata](#metadata)
    - [Submitting Messages](#submitting-messages)
    - [Validation](#validation)
    - [Rendering](#rendering)
    - [Examples](#examples)
    - [Limitations](#limitations)
    - [Conclusion](#conclusion)

## Authors

- Kantorcodes [https://twitter.com/kantorcodes]()

## Abstract

This standard is a sub-standard of [HCS-6](./hcs-6.md) which introduces a way to inscribe and tokenize **Hashinals** whose `metadata` can be updated at a whim by utilizing an indexed Topic ID whose current sequence number is determined by calling a public smart contract method.

## Motivation

HCS-6 introduced a novel way of updating metadata of a Hashinal dynamically by registering new sequence numbers. Some use-cases require switching between metadata rapidly or based on programmatic conditions. For example:

- Time of day
- When experience points in-game drop increase to a certain point
- When price of an asset changes

## Specification

HCS-6 is largely built on top of [HCS-6](./hcs-6.md) which describes how Dynamic Hashinals work. Please read that document for further clarity.

**Smart Hashinals** follow the same steps for tokenization.

### Creating an HCS-7 Topic ID

The `memo` field for Smart Hashinals must follow this format to be valid.

``hcs-7:indexed:{ttl}`

The only variable element in the memo would be the `ttl` field. We suggest a longer `ttl` as this is the time in seconds that gateways and clients will store the previous version of your `metadata` in their cache. In the future, gateways and clients may decide to prioritize Topics with longer `metadata` by imposing fees, introducing rate limits, etc. The minimum `ttl` must be `3600` (1 hour) to be valid, and the suggested minimum would be `86400` (1 day)

### Metadata

Smart **Hashinals** follow all of the same rules described in [HCS-5](./hcs-5.md), with one main exception being that they will utilize the `HCS-7` hcsStandard instead of `HCS-1`. The resulting [HRL](../definitions.md) minted onto a serial number includes the protocol number `7`

The format of the `metadata` on a dynamic **Hashinal** is as follows:

`hcs://7/{topicId}`

`topicId` is a valid HCS-7 Registry Topic ID in which data for this NFT will be or is written to.

### Submitting Messages

Unlike HCS-6, HCS-7 messages are `indexed`, which means that the current metadata is not determined by the latest sequence number. This also affords some flexibility in ordering of messages, and the ability to update sequences if required in the future.

A valid HCS-7 Topic Id, should have registered HCS-1 topics to choose from, and an initial registered configuration message with a memo of "config".

Registering config follows this format:

```json
{
  "p": "hcs-7",
  "op": "register",
  "c": {
    "m": "run",
    "abi": {
      "constant": false,
      "inputs": [
        {
          "name": "accountId",
          "type": "address"
        }
      ],
      "name": "run",
      "outputs": [
        {
          "name": "result",
          "type": "uint256"
        }
      ],
      "outputs": []
    }
  },
  "m": "config"
}
```

The smart contract function must be public, and not mutate state(nonpayable) or the Smart Hashinal will not render. To reduce message size, `payable`, `stateMutability`, and `type` fields should be excluded. This is to ensure that execution is free.

These excluded fields are assumed to have the following defaults when calling the method:

```json
{ "payable": false, "stateMutability": "nonpayable", "type": "function" }
```

| Field               | Description                                                     |
| ------------------- | --------------------------------------------------------------- |
| `p`                 | Protocol identifier, here it is "hcs-7".                        |
| `op`                | Operation type, here it is "register".                          |
| `c`                 | Configuration object containing method details.                 |
| `c.m`               | Method name, here it is "run".                                  |
| `c.abi`             | ABI definition for the method.                                  |
| `c.abi.constant`    | Indicates if the method is constant.                            |
| `c.abi.inputs`      | Array of input parameters for the method.                       |
| `c.abi.inputs.name` | Name of the input parameter, here it is "accountId".            |
| `c.abi.inputs.type` | Type of the input parameter, here it is "address".              |
| `c.abi.name`        | Method name, here it is "run".                                  |
| `c.abi.outputs`     | Array of output parameters for the method (empty in this case). |
| `m`                 | Memo field for the message, here it is "config".                |

Registering valid HCS-1 Topics to choose from follows this format:

```json
{
  "p": "hcs-7",
  "op": "register",
  // the HCS-1 Topic ID
  "t_id": "0.0.12345",
  "m": "Version 1"
}
```

### Validation

Dynamic **Hashinals** are only valid when

- Their HCS-7 Topic ID is `indexed`
- Valid [HCS-1 Topic IDs](./hcs-1.md) are registered with a `t_id` field
- They specify a `ttl` that is at least `3600` (1 hour)
- It is created after `TBD` nanosecond timestamp

### Rendering

Unlike HCS-6, the latest Sequence Number does not determine which metadata to display. Instead, the output of calling the ABI described in the `configuration` message would return an Integer that maps to a sequence number to choose from.

### Examples
 TBD example smart contract implementations

### Limitations

Smart Hashinals must utilize smart contracts with a public, nonpayable method that other platforms can call to determine the current sequence number for execution. Calls that require payment will not be valid.

### Conclusion

TBD
