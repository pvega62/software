---
id: sui-data-fetcher
slug: sui-data-fetcher
title: How to fetch object data
sidebar_label: How to fetch object data
sidebar_position: 2
description: A tutorial on how to fetch object data from the Sui `devnet`.
---

**Audience:** developers implementing their first Sui read operation.
**Goal:** write a Node.js script to retrieve and inspect raw object data from the Sui `devnet`.

---

## Overview

In this tutorial, you use `SuiClient` to perform a **read operation**. You query the **Sui `devnet`** for an on-chain **non-fungible token** (NFT) object to inspect its attributes.

**What you build:**
A lightweight Node.js script that connects to the network, requests an object by its ID, and prints the JSON response.

## Prerequisites

- **Node.js:** v18.0.0 or later.
- **Package Manager:** `npm` or `yarn`.
- **Terminal:** basic command-line skills.

---

## 1. Set up the project

1.  Create and navigate to a new directory:
    ```bash title="Terminal"
    mkdir sui-data-fetcher && cd sui-data-fetcher
    ```

2.  Initialize a Node project and configure it for ES Modules:
    ```bash title="Terminal"
    npm init -y
    npm pkg set type="module"
    ```

3.  Install the Sui TypeScript SDK:
    ```bash title="Terminal"
    npm install @mysten/sui
    ```

## 2. Initialize the client

Create a file named `index.js`. Start by importing the client and connecting it to the `devnet`.

```javascript title="index.js"
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';

// Configuration
const NETWORK = 'devnet';

// 1. Initialize the client
// getFullnodeUrl automatically resolves the correct RPC endpoint for 'devnet'
const client = new SuiClient({
	url: getFullnodeUrl(NETWORK),
});

console.log(`✅ Connected to Sui ${NETWORK}`);
```

## 3. Write the query logic

Query a known "`devnet` Non-Fungible Token (NFT)" object.
:::note
On `devnet`, objects are frequently deleted during network wipes. If the ID below fails, you may need to find a fresh Object ID from the [Sui Explorer](https://suiscan.xyz/devnet/home).
:::
Append the following code to `index.js`:

```javascript title="index.js"
// A known Object ID on devnet (Example NFT)
const TARGET_OBJECT_ID = '0x7d6539b7a423b035109b823e20c641c73defd23b8f3107b38d1d368688c2797c';

async function fetchObjectData() {
	try {
		console.log(`🔍 Querying object: ${TARGET_OBJECT_ID}...`);

		// 2. Execute the fetch
		const response = await client.getObject({
			id: TARGET_OBJECT_ID,
			// "options" determines how much data the node returns.
			// We strictly request the content (fields) to keep the payload small.
			options: {
				showContent: true,
				showType: true
			}
		});

		// 3. Handle the response
		if (response.error) {
			throw new Error(`Object not found: ${response.error.code}`);
		}

		console.log('--- Object Data ---');
		console.dir(response.data, { depth: null, colors: true });

	} catch (err) {
		console.error('❌ Query failed:', err.message);
	}
}

fetchObjectData();
```

## 4. Run and verify

Run the script in your terminal:

```bash title="Terminal"
node index.js
```

### Understanding the output

You should see a JSON structure like this:

```json title="Output"
{
  "objectId": "0x7d...",
  "version": "120",
  "digest": "AuF...",
  "type": "0x2::devnet_nft::DevNetNFT",
  "content": {
    "dataType": "moveObject",
    "fields": {
      "name": "Sui DevNet NFT",
      "description": "An NFT created by the Sui DevNet",
      "url": "ipfs://..."
    }
  }
}
```

- **`digest`**: a hash verifying the object's version.
- **`type`**: the specific Move Language type definition (Package::Module::Type).
- **`content.fields`**: the actual data stored on-chain (for example, the name, description, and image URL of the NFT).

---

## Next steps

You have successfully fetched raw data, but you likely noticed the `options` parameter in the code. To explore available query parameters and continue learning:

- Consult the [`getObject` API reference](./api-get-object.md) for all available response options and filters.
- Review [How to fetch multiple objects](./api-get-multi-objects.md) and [How to fetch owned objects](./api-get-owned-objects.md) for batch queries.
- Proceed to the next tutorial, [Using write operation to send a transaction](./write-transaction-tutorial.md), to construct and execute on-chain state changes.

