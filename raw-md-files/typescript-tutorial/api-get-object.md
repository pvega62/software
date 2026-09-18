---
id: api-get-object
slug: api-get-object
title: "API reference: getObject"
sidebar_label: "API reference: getObject"
sidebar_position: 4
description: Detailed API reference for the SuiClient getObject method in the Sui TypeScript SDK. Learn parameter schemas, SuiObjectDataOptions flags, response envelopes, error handling, and code examples for querying on-chain Move objects.
---
# API reference: `getObject`

Retrieves on-chain details and metadata for an individual Sui object by its 32-byte hexadecimal Object ID.

Use this method to query Move package definitions, inspect struct fields, and verify object ownership. You can also check whether a transaction modified or deleted an object. Because `getObject` is a read operation served directly from the fullnode's local state, it executes immediately without submitting a transaction or consuming gas.

- **Class:** `SuiClient`
- **Package:** `@mysten/sui/client`
- **Operation type:** read operation (no gas, no wallet signature)

---

## Signature

```typescript title="Signature"
client.getObject(input: GetObjectParams): Promise<SuiObjectResponse>
```

## Parameters

The method accepts a single configuration object containing the following properties:

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | **Yes** | The 32-byte hexadecimal Object ID, for example, `0x123...`. |
| `options` | `SuiObjectDataOptions` | No | Configuration flags to toggle specific data fields in the response. Defaults to `false` for all fields. |

### `SuiObjectDataOptions`

By default, `getObject` returns only the object's reference, specifically its ID, version, and digest. To retrieve actual data, you must explicitly set these flags to `true`.

| Option | Description |
| :--- | :--- |
| `showType` | Returns the Move type, for example, `0x2::coin::Coin<0x2::sui::SUI>`. |
| `showContent` | Returns the parsed Move data fields, representing the object's internal state. |
| `showOwner` | Returns the address or object that owns this item. |
| `showDisplay` | Returns Display standard metadata (names, descriptions, image URLs) for UI rendering. |
| `showStorageRebate` | Returns the storage rebate associated with the object. |
| `showBcs` | Returns raw Binary Canonical Serialization (BCS) bytes for client-side decoding. |
| `showPreviousTransaction` | Returns the digest of the last transaction that modified this object. |

---

## Return value

Returns a `Promise` that resolves to a `SuiObjectResponse`. This response is a standard envelope that encapsulates both success and error states:

```text title="SuiObjectResponse envelope"
┌─────────────────────────────────────────────────────────────┐
│                     SuiObjectResponse                       │
├──────────────────────────────┬──────────────────────────────┤
│   Success: `response.data`   │    Error: `response.error`   │
│   - objectId, version        │    - code: "notExists"       │
│   - type, digest             │    - code: "deleted"         │
│   - content, owner, display  │    - object_id               │
└──────────────────────────────┴──────────────────────────────┘
```

### Success response (`data`)
When the object exists and remains accessible, the `data` property holds `SuiObjectData`.

```json title="Response: success"
{
  "data": {
    "objectId": "0x...",
    "version": "10",
    "digest": "...",
    "type": "0x2::coin::Coin<0x2::sui::SUI>", // Present if showType: true
    "content": {                              // Present if showContent: true
       "dataType": "moveObject",
       "fields": { "balance": "1000000000" }
    },
    "owner": {                                // Present if showOwner: true
       "AddressOwner": "0xabc..." 
    }
  }
}
```

### Error response (`error`)
If a transaction deleted the object, wrapped it in another object, or the ID does not exist, the `error` property returns error details.

```json title="Response: error"
{
  "error": {
    "code": "notExists",
    "object_id": "0x..."
  }
}
```

---

## Usage examples

### Check whether an object exists
This is the most lightweight query. It requests no data fields, only the digest and version number.

```javascript title="checkExists.js"
const response = await client.getObject({
    id: '0x123...'
});

if (response.error) {
    console.log("Object does not exist.");
} else {
    console.log("Object exists at version:", response.data.version);
}
```

### Fetch NFT metadata and display fields
This request asks for `content` to read on-chain fields and `display` to retrieve UI rendering assets.

```javascript title="fetchNFT.js"
const nft = await client.getObject({
    id: '0x123...',
    options: {
        showContent: true,
        showDisplay: true
    }
});

if (nft.data) {
    const name = nft.data.content?.fields?.name;
    const imageUrl = nft.data.display?.data?.image_url;
    console.log(`NFT Name: ${name}, Image: ${imageUrl}`);
} else {
    console.warn("Item failed to load:", nft.error);
}
```

### Verify object ownership
Use this to check whether a specific account address owns an item.

```javascript title="verifyOwnership.js"
const item = await client.getObject({
    id: '0x123...',
    options: { showOwner: true }
});

const owner = item.data?.owner;

if (owner && owner.AddressOwner === '0xMyAddress...') {
    console.log("You own this item.");
}
```

---

## Common errors

| Error code | Cause | Resolution |
| :--- | :--- | :--- |
| `notExists` | The Object ID is valid hex, but the network cannot locate the object. | Verify the ID or confirm a previous transaction did not delete the object. |
| `deleted` | A transaction deleted, burned, or pruned the object from the active state. | You cannot retrieve historical data for deleted objects through `getObject`. |
| `invalid_param` | The Object ID provided isn't a valid 32-byte hex string. | Ensure the ID starts with `0x` and is the correct length. |

---

## See also

- [`multiGetObjects`](./api-get-multi-objects.md) fetches details for multiple objects in a single batch request.
- [`getOwnedObjects`](./api-get-owned-objects.md) lists all objects owned by a specific address.
- [How to fetch object data](./tutorial-fetch-data.md) provides a step-by-step tutorial implementing `getObject` in a Node.js script.
- [The SuiClient architecture](./concept-suiguide.md) explains the conceptual design of `SuiClient` and read operations.