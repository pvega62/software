---
id: write-transaction-tutorial
slug: write-transaction-tutorial
title: Using Write Operation to Send a Transaction
sidebar_label: Using Write Operation to Send a Transaction
sidebar_position: 3
description: A tutorial on how to perform a write operation using the SuiClient to send a transaction that transfers Sui tokens.
---

# Using write operation to send a transaction 

**Audience:** Developers ready to perform their first state-changing operation.

**Prerequisites:** A funded Sui Devnet wallet and a basic Node.js setup.

**Goal:** Write a script to transfer Sui tokens to another address, understanding the role of Gas and Signatures.

---

## Introduction

In our previous tutorials, we performed **Read Operations**. We asked the `SuiClient` (the clerk) for information, which was free and anonymous.

Now, we will perform a **Write Operation**. We're going to transfer Sui tokens from your wallet to another address. Because this changes the state of the blockchain, two new requirements apply:

1.  **Signature:** You must cryptographically sign the request to prove you own the funds.
2.  **Gas (Postage):** You must pay a fee in Sui tokens to compensate the network for processing the transaction.

## Prerequisites

For this tutorial, you can't use a random public endpoint alone. You need:
1.  **A Funded Wallet:** A 12-word recovery phrase for a wallet that has Sui Devnet tokens.
2.  **The Ed25519 Keypair Library:** To sign the transaction.

Install the required cryptography package (if you haven't already):

```bash
npm install @mysten/sui
```

:::warning
> In a real app, never hardcode your private key or recovery phrase. Always use environment variables (for example, `.env`). For this tutorial, we will use a variable for simplicity, but **don't commit this code to GitHub.**
:::
## Step-by-step guide

### Step 1: Import tools and setup client

Create a file named `transfer.js`. We need the `SuiClient` for the connection and `Ed25519Keypair` to act as our "pen" for signing.

```javascript
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

### Step 2: Construct the "Package" (transaction)

In Sui, you don't send raw commands. You build a **Transaction**. Think of this as filling out the shipping label and putting items in the box before sealing it.

We will use the `tx.splitCoins` command. This tells the network: *"Take my primary SUI coin, split off a specific amount, and prepare it for transfer."*

```javascript
// 3. Define the Recipient
const RECIPIENT = '0x9999...'; // Replace with a friend's address or a burn address

// 4. Create the Transaction Container
const tx = new Transaction();

// Split 1000 MIST (The smallest unit of SUI) from the gas coin
const [coinToSend] = tx.splitCoins(tx.gas, [1000]);

// Transfer the split coin to the recipient
tx.transferObjects([coinToSend], RECIPIENT);
```

### Step 3: Sign, pay postage, and ship

This is the critical step where **Gas** is calculated.

When you execute the code below, the `SuiClient`:
1.  **Estimates Gas:** It looks at your `tx` box, weighs it (computational complexity), and determines the required postage.
2.  **Signs:** It uses your `keypair` to cryptographically sign the transaction.
3.  **Runs:** It submits the signed transaction to the network.

```javascript
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

You might notice we didn't explicitly set a fee amount.

* **Automatic Budgeting:** By default, the SDK automatically estimates the gas cost for you. It ensures you don't overpay significantly while providing enough to get the transaction processed.
* **The Payment Source:** The SDK automatically selects a Sui coin object from your wallet to pay this fee. This is why you can't send *all* your Sui; you must always leave a tiny bit behind to pay for the gas of the transfer itself.

## Expected output

When successful, you will receive a **Transaction Digest**. This is your tracking number.

```text
📦 Sender Address: 0x123...
📝 Signing and submitting transaction...
✅ Transaction Submitted!
Digest (Tracking ID): 5T7x...9B2a
```

You can copy this Digest and paste it into a Sui Explorer (like Suiscan) to see the permanent record of your transfer, including exactly how much Gas it consumed.