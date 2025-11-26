---
id: sui-data-fetcher
slug: sui-data-fetcher
title: How to Fetch Object Data
sidebar_label: How to Fetch Object Data
sidebar_position: 2
description: A tutorial on how 5o fetch object data from the Sui `devnet`.
---

**Audience:** developers implementing their first Sui read operation.
**Goal:** write a Node.js script to retrieve and inspect raw object data from the Sui `devnet`.

---

## Overview

In this tutorial, using the `SuiClient` performs a **Read Operation**, querying the **Sui `devnet`** for a specific **Non-Fungible Token** (NFT) object to view its on-chain attributes.

**What's built:**
A lightweight Node.js script that connects to the network, requests an object by its ID, and prints the JSON response.

## Prerequisites

* **Node.js:** v18.0.0 or later.
* **Package Manager:** `npm` or `yarn`.
* **Terminal:** Basic command-line skills.

---

## Step 1: Project setup

1.  Create and navigate to a new directory:
    ```bash
    mkdir sui-data-fetcher && cd sui-data-fetcher
    ```

2.  Initialize a Node project and configure it for ES Modules:
    ```bash
    npm init -y
    npm pkg set type="module"
    ```

3.  Install the Sui TypeScript SDK:
    ```bash
    npm install @mysten/sui
    ```

## Step 2: Initialize the Client

Create a file named `index.js`. Start by importing the client and connecting it to the `devnet`.

```javascript
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

## Step 3: Write the query logic

Query a known "`devnet` Non-Fungible Token (NFT)" object.

> **Note:** On `devnet`, objects are frequently deleted during network wipes. If the ID below fails, you may need to find a fresh Object ID from the [Sui Explorer](https://suiscan.xyz/devnet/home).

Append the following code to `index.js`:

```javascript
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

## Step 4: Running and verification

Run the script in your terminal:

```bash
node index.js
```

### Understanding the output

You should see a JSON structure like this:

```json
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

* **`digest`**: a hash verifying the object's version.
*   **`type`**: the specific Move Language type definition (Package::Module::Type).
* **`content.fields`**: The actual data stored on-chain (for example, the name and address of the NFT).

---

## Next steps

You have successfully fetched raw data, but you likely noticed the `options` parameter in the code. To understand exactly what data you can request, consult the API Reference.

