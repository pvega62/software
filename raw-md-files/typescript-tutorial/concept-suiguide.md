---
id: sui-client-concept
sidebar_label: The SuiClient - Your App's Post Office Clerk
sidebar_position: 1
slug: sui-client-concept
description: The role of the SuiClient in Sui app architecture, handling communication between your app and the Sui blockchain network.
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# The `SuiClient` - Your App's Post Office Clerk

- **Audience:** Developers new to the Sui blockchain.
- **Prerequisites:** Basic understanding of blockchain concepts (wallets, transactions).
- **Goal:** Understand the role of the `SuiClient` in the app architecture.

---

## Introduction

In the Sui ecosystem, your app can't speak directly to the blockchain network. It requires an intermediary to handle communication protocols, data fetching, and transaction submission.

The **`SuiClient`** is the primary interface in the Sui TypeScript SDK for this purpose.

### The architecture: The "Post office" analogy

Think of the Sui Network as a massive, global postal system.
* **Your App** is a customer at the counter.
* **The `SuiClient`** is the **Post Office Clerk**.

You rely on the clerk to interact with the system. You can't sort the mail or drive the delivery trucks yourself; you must make requests through the clerk.

<Tabs>
  <TabItem value="diagram" label=" Code" default>

  ```mermaid
  flowchart LR
      A["Your App<br/>(Customer)"] -->|Requests Service| B("SuiClient<br/>(Clerk)")
      B -->|Processes Request| C["Sui Network Node<br/>(Postal System)"]
      C -->|Delivers Result| B
      B -->|Hands Over Item| A
  ```

  </TabItem>
  <TabItem value="visual" label="Image">

  ![screenshot of SuiClient architecture](app_service_flow.svg)

  </TabItem>
</Tabs>

## Connecting to the network

Just as a clerk works at a specific branch, a `SuiClient` instance connects to a specific network environment via an **RPC (Remote Procedure Call) Endpoint**.

When you initialize the client, you define which environment it targets:

| Network | Description | Use Case |
| :--- | :--- | :--- |
| **Mainnet** | The live production network. Real assets, real value. | Production apps. |
| **Testnet** | Public test network. Mirrors `Mainnet` versioning. | Staging and integration testing. |
| **Devnet** | Experimental network. Wiped frequently. | Rapid prototyping and local development. |

## Core capabilities

The `SuiClient` handles two distinct categories of operations. Understanding the difference is critical for app design.

### 1. Read operations (queries)

These are requests to look up existing data on the ledger.

* **Cost:** Free (No gas fees).
* **Security:** No wallet signature required.
* **Mechanism:** The client queries the node's local database and returns the result immediately.
* **Examples:**
    * `getObject()`: Fetching NFT metadata.
    * `getBalance()`: Checking a wallet's funds.

### 2. Write operations (transactions)

These are requests to **change** the state of the ledger.

* **Cost:** Requires SUI tokens for gas fees.
* **Security:** Requires a cryptographic signature from a user's wallet.
* **Mechanism:** The client submits the signed transaction to the network validators for processing.
* **Examples:**
    * Transferring coins.
    * Minting NFTs.
    * Modifying on-chain game data.

---

## Next steps

Now that you understand the architecture, the next step is to perform a **Read Operation**. The next guide provides a script to query live data from the Sui Devnet.
