---
id: retrieve-balance-transaction
title: Retrieve a balance transaction
sidebar_label: 'Retrieve a balance transaction'
sidebar_position: 2
slug: /stripe-api/balance/retrieve-balance-transaction
description: 'Documentation for retrieving a balance transaction from a Stripe account.'
---

Returns the transactions that make up the Stripe account's balance (such as charges, transfers, payouts, and refunds). Stripe lists these transactions in reverse chronological order, displaying the most recent entries first.

<span className="badge badge--success">GET</span> `https://api.stripe.com/v1/balance_transactions/{id}`

#### Examples
**cURL Example:**
```bash title="cURL"
curl -X GET https://api.stripe.com/v1/balance_transactions/tr_1234567890 \
  -u <YOUR_SECRET_KEY>:
```

#### Responses
Responses return standard codes.

`200: OK`
```json title="Response"
{
  "object": "balance_transaction",
  "id": "tr_1234567890",
  "amount": 1000,
  "currency": "usd",
  "description": "Payment for invoice",
  "fee": 59,
  "fee_details": [
    {
      "amount": 59,
      "currency": "usd",
      "description": "Stripe processing fees",
      "type": "stripe_fee"
    }
  ],
  "net": 941,
  "status": "available",
  "type": "charge"
}
```

#### Error responses
`400: Bad Request`
```json title="Response"
{
  "error": {
    "message": "If passing an array with explicit keys (e.g. foo[0]=a&foo[1]=b) instead of as an array (e.g. foo[]=a&foo[]=b), the keys must be numeric and sequential starting from 0. You passed the keys `1`, we expected to have a key with the value `0`.",
    "param": "expand",
    "request_log_url": "https://dashboard.stripe.com/test/logs/req_kCeAL5FAly5bkh?t=1734734555",
    "type": "invalid_request_error"
  }
}
```

`401: Unauthorized`
```json title="Response"
{
  "error": {
    "type": "invalid_request_error",
    "message": "Invalid API Key provided: sk_test_********************1234"
  }
}
```

#### Parameters

##### Query parameters

| Parameter | Type | Description | 
|-----------|------|-------------|
| `expand[]` | array of strings | Identifies nested response objects to enrich and return inline. | 

##### Path variables
| Name | Type | Required | Description | 
|------|------|----------|-------------|
| `id` | string | Required | Path variable identifier |
