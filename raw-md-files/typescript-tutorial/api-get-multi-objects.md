---
id: api-get-multi-objects
slug: api-get-multi-objects
title: "API reference: multiGetObjects"
sidebar_label: "API reference: multiGetObjects"
sidebar_position: 5
description: Detailed API reference for the SuiClient multiGetObjects method in the Sui TypeScript SDK. Learn parameter schemas, response envelopes, partial failure handling, chunking strategies, and code examples for batch querying on-chain Move objects.
---
# API reference: `multiGetObjects`

Retrieves on-chain details and metadata for multiple Sui objects in a single batch request by their 32-byte hexadecimal Object IDs.

Use this method to combine multiple object queries into a single network call, reducing latency compared to querying objects individually. Because `multiGetObjects` is a read operation served directly from the fullnode's local state, it executes immediately without submitting a transaction or consuming gas.

- **Class:** `SuiClient`
- **Package:** `@mysten/sui/client`
- **Operation type:** read operation (no gas, no wallet signature)

---

## Overview

Calling `multiGetObjects` proves much more efficient than calling `getObject` in a loop. It reduces network latency by combining multiple object queries into a single Remote Procedure Call (RPC).

```text title="Sequential vs batch comparison"
Sequential getObject (N Round Trips):
App ── getObject(A) ──► Fullnode ──► App ── getObject(B) ──► Fullnode

Batch multiGetObjects (1 Round Trip):
App ──────────── multiGetObjects([A, B, C]) ────────────► Fullnode
App ◄─────────── [ResultA, ResultB, ResultC] ─────────── Fullnode
```

## Signature

```typescript title="Signature"
client.multiGetObjects(input: MultiGetObjectsParams): Promise<SuiObjectResponse[]>
```

## Parameters

The method accepts a configuration object with the following properties:

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `ids` | `string[]` | **Yes** | An array of 32-byte hexadecimal Object IDs. |
| `options` | `SuiObjectDataOptions` | No | Configuration flags to toggle specific data fields. Applies to **all** requested objects. |

:::note
Most public RPC nodes enforce a limit of typically 50 IDs per request. For larger batches, you must split your array into chunks.
:::

---

## Return value

Returns a `Promise` that resolves to an **array** of `SuiObjectResponse` objects.

The array order corresponds exactly to the order of the `ids` passed in the request:

```json title="Response"
[
  {
    "data": { "objectId": "0xA...", "version": "1" }
  },
  {
    "error": { "code": "notExists", "object_id": "0xB..." }
  },
  {
    "data": { "objectId": "0xC...", "version": "5" }
  }
]
```

---

## Usage examples

### Bulk fetch NFT metadata and display attributes
Query a list of Non-Fungible Token (NFT) IDs to display on-chain fields and image URLs:

```javascript title="bulkFetch.js"
const objectIds = ['0x123...', '0x456...', '0x789...'];

const results = await client.multiGetObjects({
    ids: objectIds,
    options: {
        showContent: true,
        showDisplay: true
    }
});

// Process the results
results.forEach((result) => {
    if (result.data) {
        console.log("Found Item:", result.data.display?.data?.name);
    } else {
        console.warn("Item failed to load:", result.error);
    }
});
```

### Chunk large ID lists for batching limits
Since a limit of 50 items applies per request on most public RPC nodes, use a chunking helper for large lists:

```javascript title="chunking.js"
import { chunk } from 'lodash'; // or your own helper

const allIds = [/* ... array of 200 IDs ... */];
const CHUNK_SIZE = 50;
const chunks = chunk(allIds, CHUNK_SIZE);

for (const batch of chunks) {
    const batchResults = await client.multiGetObjects({
        ids: batch,
        options: { showType: true }
    });
    // Process batchResults...
}
```

---

## Best practices

### Handle partial failures per item
Unlike a standard database query that might stop the whole batch on error, `multiGetObjects` returns a result for *every* ID. Even if one object fails (for example, if a transaction deleted it), the remaining items in the batch still return successfully. Always check `data` versus `error` for each item in the returned array.

### Rely on index-order preservation
The SDK preserves the index order of the input array:
- `results[0]` corresponds to `ids[0]`
- `results[1]` corresponds to `ids[1]`

You can rely on this ordering to map results directly back to your original data source.

---

## See also

- **[`getObject`](./api-get-object.md)**: retrieve details for an individual on-chain object.
- **[`getOwnedObjects`](./api-get-owned-objects.md)**: list all objects owned by a specific address.
- **[How to fetch object data](./tutorial-fetch-data.md)**: step-by-step tutorial implementing read operations in a Node.js script.
- **[The SuiClient architecture](./concept-suiguide.md)**: conceptual overview of `SuiClient` and read operations.