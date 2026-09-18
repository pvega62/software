---
id: Introduction to the Stripe API
title: Introduction to the Stripe API
sidebar_label: 'Introduction to the Stripe API'
sidebar_position: 1
slug: /stripe-api/intro
---

The Stripe API allows merchants to build platforms, marketplaces, or other businesses on a solid foundation. It enables secure transactions and money movement.

The Stripe API lets a developer:

-   [Check a Stripe account's balance](./balance/obtain-balance.md).
-   [Retrieve an account's balance history](./balance/retrieve-balance-transaction.md), which includes a list of transactions (charges, payouts, etc.) that contributed to its balance.
-   [List, create, update, and search for charges](/docs/category/payment-intent-apis).
-   [Create, update, or list refunds](/docs/category/refund-apis).

## Connection prerequisites

To connect to the Stripe API, you need the base URL: `https://api.stripe.com/`.


## Authentication

The Stripe API requires a secret API token for authentication. You must authenticate every request and send it over `HTTPS`. Unauthorized requests or requests sent over plain `HTTP` fail.

You can find these tokens, also called secret keys, on your Stripe account dashboard. See ***[Using Postman to Connect to the Stripe API](./Using-Postman-to-Connect-to-the-Stripe-API.md)*** for detailed instructions on generating the token and using it to authenticate your connection.

:::danger
For security purposes, **don't share the secret key with other users.**
:::



