---
id: Introduction to the Stripe API
title: Introduction to the Stripe API
sidebar_label: 'Introduction to the Stripe API'
sidebar_position: 1
slug: /stripe-api/intro
---

The Stripe API allows merchants to build a platform, marketplace, or any other types of business with a solid foundation that allows for secure transactions and money movement.

The Stripe API lets a developer:

-   Check a Stripe account's balance.
-   Retrieve an account's balance history, which includes a list of transactions (charges, payouts, etc.) that contributed to its balance.
-   List, create, update, and search for charges.
-   Create, update, or list refunds.

## Connection prerequisites

To connect to the Stripe API, you need the base URL: `https://api.stripe.com/`.


## Authentication

Stripe API requires a secret API token for authentication. All requests must be authorized and made over `HTTPS`. Unauthorized requests or requests made over `HTTP` will fail.

You can find these tokens, also called secret keys, on your Stripe account dashboard. See ***[Using Postman to Connect to the Stripe API](using-postman)*** for detailed instructions on generating the token and using it to authenticate your connection.

:::note
For security purposes, **don't share the secret key with other users.**
:::



