---
id: api-get-owned-objects
slug: api-get-owned-objects
sidebar_label: API Reference - getOwnedObjects
sidebar_position: 6
description: API reference documentation for the SuiClient method `getOwnedObjects`, which retrieves a list of objects owned by a specific address.
---
# API reference: `getOwnedObjects`

Retrieves a list of objects owned by a specific address.

**Class:** `SuiClient`
**Method Type:** Read Operation, no gas

---

## Overview

This method populates "Inventory" or "Wallet" screens. Because an address can own thousands of objects, this method **paginates** results.

## Signature

```typescript
client.getOwnedObjects(input: GetOwnedObjectsParams): Promise<PaginatedObjectsResponse>
```

## Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `owner` | `string` | **Yes** | The 32-byte address of the wallet to check. |
| `filter` | `SuiObjectDataFilter` | No | Filter results by type or package, see below. |
| `options` | `SuiObjectDataOptions` | No | Flags to include details, for example, `showType`. |
| `cursor` | `string` | No | The `nextCursor` from a previous response, for pagination. |
| `limit` | `number` | No | Max items to return, default: 50. |

### `SuiObjectDataFilter`
The `filter` parameter offers powerful filtering. It lets you ask specific questions like *"Show me only the Coins"* instead of downloading the user's entire inventory.

| Filter Key | Value Type | Description |
| :--- | :--- | :--- |
| `MatchAll` | `Filter[]` | Logical AND. Object must match all provided filters. |
| `MatchAny` | `Filter[]` | Logical OR. Object can match any provided filter. |
| `StructType` | `string` | Exact match for a Move Struct type, for example, `0x2::sui::SUI`. |
| `Package` | `string` | Match any object defined in a specific Package ID. |

---

## Return value

Returns a `PaginatedObjectsResponse`.

```json
{
  "data": [
    { "data": { "objectId": "0xA...", "type": "..." } },
    { "data": { "objectId": "0xB...", "type": "..." } }
  ],
  "hasNextPage": true,
  "nextCursor": "0x12345...ResultCursor"
}
```

* **`data`**: This array holds the objects for this page.
* **`hasNextPage`**: `true` if there are more objects to fetch.
* **`nextCursor`**: The string you must pass to the `cursor` parameter in your *next* call to get the next page.

---

## Usage examples

### Scenario A: Basic inventory fetch, first page
Get the first 5 objects owned by an address.

```javascript
const response = await client.getOwnedObjects({
    owner: '0xMyAddress...',
    limit: 5,
    options: { showType: true }
});

response.data.forEach(item => {
    console.log(`ID: ${item.data.objectId}, Type: ${item.data.type}`);
});
```

### Scenario B: Filtering for specific assets
Get **only** the "Sui DevNet Non-Fungible Tokens" owned by a user, ignoring their coins and other items.

```javascript
const response = await client.getOwnedObjects({
    owner: '0xMyAddress...',
    filter: {
        StructType: '0x2::devnet_nft::DevNetNFT'
    },
    options: { showContent: true }
});
```

### Scenario C: Full pagination, fetching all
Use a `while` loop to fetch every object an account owns, page by page.

```javascript
let hasNextPage = true;
let nextCursor = null;
const allObjects = [];

while (hasNextPage) {
    const response = await client.getOwnedObjects({
        owner: '0xMyAddress...',
        cursor: nextCursor
    });

    allObjects.push(...response.data);
    
    hasNextPage = response.hasNextPage;
    nextCursor = response.nextCursor;
}

console.log(`Total objects fetched: ${allObjects.length}`);
```

---

## Common errors

| Error Code | Cause | Resolution |
| :--- | :--- | :--- |
| `cursor_invalid` | The string passed to `cursor` isn't valid or from a different query. | Make sure to pass the exact string returned in `nextCursor` from the *previous* call. |

| `limit_exceeded` | If you request a limit higher than the node permits, for example, 1000, reduce your limit. The standard max is typically 50. |

---

## See also

* **[`getObject`](./api-get-object.md)**: Fetch a single object by its ID.
* [`multiGetObjects`](./api-get-multi-objects.md)**: Fetch many objects by their IDs in a single request.