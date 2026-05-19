---
id: api-get-object
slug: api-get-object
sidebar_label: API Reference - getObject
sidebar_position: 4
description: API reference documentation for the SuiClient method `getObject`, which retrieves the details of a specific object from the blockchain.
---
# API reference: `getObject`

Retrieves the details of a specific object from the blockchain.

**Class:** `SuiClient`
**Method Type:** Read Operation, no gas

---

## Signature

```typescript
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
| `showType` | Returns the Move type, for example, `0x2::coin::Coin<SUI>`. |
| `showContent` | Returns the parsed Move data fields, the object's internal state. |
| `showOwner` | Returns the address or object that owns this item. |
| `showDisplay` | Returns the Display standard metadata, specifically images and names, for UI rendering. |
| `showStorageRebate` | Returns the storage rebate associated with the object. |

---

## Return value

Returns a `Promise` that resolves to a `SuiObjectResponse`. This response is a standard wrapper that handles both success and error states.

### 1. Success Response (`data`)
If the object exists and accessibility is maintained, the `data` property holds `SuiObjectData`.

```json
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

### 2. Error Response (`error`)
If the object was deleted, is wrapped in another object, or doesn't exist, the `error` property holds a value.

```json
{
  "error": {
    "code": "notExists",
    "object_id": "0x..."
  }
}
```

---

## Usage examples

### Scenario A: Check if an object exists
This is the most lightweight query. It requests no data, only the digest/version.

```javascript
const response = await client.getObject({
    id: '0x123...'
});

if (response.error) {
    console.log("Object does not exist.");
} else {
    console.log("Object exists at version:", response.data.version);
}
```

### Scenario B: Fetching non-fungible tokens metadata
This request asks for the `content` to read fields, and `display` to see the image address.

```javascript
const nft = await client.getObject({
    id: '0x123...',
    options: {
        showContent: true,
        showDisplay: true
    }
});

const name = nft.data.content.fields.name;
const imageUrl = nft.data.display.data.image_url;
```

### Scenario C: Verifying ownership
Use this to check if a specific user owns an item.

```javascript
const item = await client.getObject({
    id: '0x123...',
    options: { showOwner: true }
});

const owner = item.data.owner;

if (owner && owner.AddressOwner === '0xMyAddress...') {
    console.log("You own this item.");
}
```

---

## Common errors

| Error Code | Cause | Resolution |
| :--- | :--- | :--- |
| `notExists` | The Object ID is valid hex, but the object isn't found on the network. | Check the ID or ensure the object wasn't deleted in a previous transaction. |
| `deleted` | The object existed before but burned or you deleted. | You can't fetch data for deleted objects. |
| `invalid_param` | The Object ID provided isn't a valid 32-byte hex string. | Ensure the ID starts with `0x` and is the correct length. |

---

## See also

* **[`getMultiGetObjects`](./api-get-multi-objects.md)**: Fetch many objects in a single network request, for batching.
* **[`getOwnedObjects`](./api-get-owned-objects.md)**: Find all objects owned by a specific address.