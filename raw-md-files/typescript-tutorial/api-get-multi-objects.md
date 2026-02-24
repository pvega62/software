---
id: api-get-multi-objects
slug: api-get-multi-objects
sidebar_label: API Reference - multiGetObjects
sidebar_position: 5
description: API reference documentation for the SuiClient method `multiGetObjects`, which retrieves details for many objects in a single network request.
---
# API reference: `multiGetObjects`

Retrieves details for many objects in a single network request.

**Class:** `SuiClient`
**Method Type:** Read Operation, no gas

---

## Overview

Using `multiGetObjects` proves much more efficient than calling `getObject` in a loop. It reduces network latency by combining many queries into a single Remote Procedure Call (RPC).

## Signature

```typescript
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

The array order corresponds exactly to the order of the `ids` passed in the request.

```json
[
  {
    "data": { "objectId": "0xA...", "version": "1", ... }
  },
  {
    "error": { "code": "notExists", "object_id": "0xB..." }
  },
  {
    "data": { "objectId": "0xC...", "version": "5", ... }
  }
]
```

---

## Usage examples

### Scenario A: Bulk fetching metadata
Imagine you have a list of Non-Fungible Token (NFT) IDs and need to display their names.

```javascript
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

### Scenario B: Handling large lists by chunking
Since a limit of, for example, 50 items applies per request, use a chunking helper for large lists.

```javascript
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

### 1. Always handle partial failures
Unlike a standard database query that might stop the whole batch on error, `multiGetObjects` returns a result for *every* ID. Even if one object fails (e.g., it was deleted), the others in the batch still return successfully. You must check `data` vs `error` for **each item** in the returned array.

### 2. Order preservation
The SDK guarantees that the output array matches the index of the input array.
* `results[0]` corresponds to `ids[0]`.
* `results[1]` corresponds to `ids[1]`.

You can rely on this to map results back to your original data source.