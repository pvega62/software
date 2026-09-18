---
id: write-transaction-tutorial
slug: write-transaction-tutorial
title: Using write operation to send a transaction
sidebar_label: Using write operation to send a transaction
sidebar_position: 3
description: A tutorial on how to perform a write operation using the SuiClient to send a transaction that transfers Sui tokens.
---
**Audience:** developers ready to perform their first state-changing operation.

**Prerequisites:** a funded Sui `devnet` wallet and a basic Node.js setup.

**Goal:** write a script to transfer Sui tokens to another address, understanding the role of gas and signatures.

---

## Introduction

In previous tutorials, you performed **read operations** by querying the `SuiClient` for data without incurring network fees.

Now, you perform a **write operation** to transfer Sui tokens from your wallet to another address. Because this modifies on-chain state, two requirements apply:

1. **Signature:** you must cryptographically sign the request to prove ownership of the funds.
2. **Gas (postage):** you must pay a fee in Sui tokens to compensate the network for processing the transaction.

## Prerequisites

To run this tutorial, you need:
- **A funded wallet:** a 12-word recovery phrase for a wallet that holds Sui `devnet` tokens. You can request free test tokens via the [Sui Discord faucet](https://discord.gg/sui) or directly within a compatible Sui wallet.
- **The Ed25519 keypair package:** `@mysten/sui` to sign the transaction.

Install the required package (if you have not already):

```bash title="Terminal"
npm install @mysten/sui
```

:::warning
In production applications, never hardcode your private key or recovery phrase. Always use environment variables (for example, `.env`). This tutorial uses an in-memory variable for demonstration, but **never commit private recovery phrases to GitHub.**
:::

## 1. Import dependencies and configure the client

Create a file named `transfer.js`. Import `SuiClient` for network communication and `Ed25519Keypair` to sign the transaction.

```javascript title="transfer.js"
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';

// 1. Connect to Devnet
const client = new SuiClient({ url: getFullnodeUrl('devnet') });

// 2. Load your Wallet (The Sender)
// REPLACE THIS with your actual 12-word mnemonic phrase
const MNEMONIC = "word1 word2 word3 ... word12"; 
const keypair = Ed25519Keypair.deriveKeypair(MNEMONIC);
const senderAddress = keypair.getPublicKey().toSuiAddress();

console.log(`📦 Sender Address: ${senderAddress}`);
```

:::tip 
Before sending a transaction, your sender address needs test tokens to pay for gas. Copy the printed `Sender Address` from your terminal and request tokens through the `#devnet-faucet` channel in the [Sui Discord](https://discord.gg/sui).
:::

## 2. Construct the transaction

In Sui, you construct a **Transaction** rather than sending raw commands. Think of this as filling out a shipping label and packing items into a box before sealing it.

Use the `tx.splitCoins` command to split a specific amount from your primary gas coin:

```javascript title="transfer.js"
// 3. Define the Recipient
const RECIPIENT = '0x9999...'; // Replace with a friend's address or a burn address

// 4. Create the Transaction Container
const tx = new Transaction();

// Split 1000 MIST (The smallest unit of SUI) from the gas coin
const [coinToSend] = tx.splitCoins(tx.gas, [1000]);

// Transfer the split coin to the recipient
tx.transferObjects([coinToSend], RECIPIENT);
```

## 3. Sign and submit the transaction

This step calculates and pays gas before executing the transaction on-chain.

```text title="PTB transaction lifecycle"
┌─────────────────────────┐      ┌─────────────────────────┐      ┌───────────────────────────┐
│  1. Build Transaction   │ ──►  │  2. Sign with Keypair   │ ──►  │  3. Submit via SuiClient  │
│  (splitCoins, transfer) │      │  (Cryptographic Proof)  │      │  (Broadcasts to Devnet)   │
└─────────────────────────┘      └─────────────────────────┘      └───────────────────────────┘
```

When you call `signAndExecuteTransaction`, the `SuiClient`:
1. **Estimates gas:** calculates the computational complexity and sets the required gas budget.
2. **Signs:** applies your `keypair` signature to approve the state change.
3. **Submits:** transmits the signed transaction through the RPC fullnode to the network.

```javascript title="transfer.js"
async function sendTransaction() {
    try {
        console.log("📝 Signing and submitting transaction...");

        const result = await client.signAndExecuteTransaction({
            signer: keypair,
            transaction: tx,
        });

        console.log("✅ Transaction Submitted!");
        console.log(`Digest (Tracking ID): ${result.digest}`);
        
    } catch (error) {
        console.error("❌ Transaction Failed:", error);
    }
}

sendTransaction();
```

## Understanding gas in this transaction

You do not need to calculate gas costs manually.

- **Automatic budgeting:** by default, the SDK estimates the gas cost for you. It sets a sufficient budget for execution without excessive overpayment.
- **Payment source:** the SDK automatically selects a SUI coin object from your wallet to pay this fee. Because of this, always reserve a small amount of SUI in your wallet to cover gas.

## Expected output

When successful, the script outputs a **Transaction Digest** (your transaction tracking ID):

```text title="Terminal output"
📦 Sender Address: 0x123...
📝 Signing and submitting transaction...
✅ Transaction Submitted!
Digest (Tracking ID): 5T7x...9B2a
```

Copy this digest and search for it on [Suiscan](https://suiscan.xyz/devnet/home). The explorer displays the permanent on-chain record, including gas consumption and execution status.

---

## Next steps

Now that you have executed your first on-chain write transaction:

- Read [How to fetch object data](./tutorial-fetch-data.md) to inspect the recipient's newly received object.
- Review [The SuiClient architecture](./concept-suiguide.md) for the conceptual model of Sui nodes and clerks.
- Explore the [`getObject` API reference](./api-get-object.md) to query detailed transaction effects and object schemas.