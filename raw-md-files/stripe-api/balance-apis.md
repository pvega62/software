---
id: balance-apis
title: Balance API Functions
sidebar_label: 'Balance APIs'
sidebar_position: 3
slug: /stripe-api/balance/balance-apis
description: 'Documentation for the Balance APIs, including obtaining balance and retrieving balance transactions.'
---
### Obtain the balance

Obtain the balance of a Stripe account.

Endpoint: `https://api.stripe.com/v1/balance`

Operation: `GET`

#### Examples
**cURL Example:**
```bash
curl -X GET `https://api.stripe.com/v1/balance` \
  -u <YOUR_SECRET_KEY>:
```
#### Responses

Responses will return standard codes.`

`200: OK`
```json
{
  "object": "balance",
  "available": [
    {
      "amount": 0,
      "currency": "usd",
      "source_types": {
        "card": 0
      }
    }
  ],
  "livemode": false,
  "pending": [
    {
      "amount": 0,
      "currency": "usd",
      "source_types": {
        "card": 0
      }
    }
  ],
  "refund_and_dispute_prefunding": {
    "available": [
      {
        "amount": 0,
        "currency": "usd"
      }
    ],
    "pending": [
      {
        "amount": 0,
        "currency": "usd"
      }
    ]
  }
}
```
#### Error responses
`400: Bad Request`
```json
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
```json
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
| `expand[]` | array of strings | Specifies which fields in the response should be expanded. | 

### Retrieve a balance transaction

Returns the transactions that make up the Stripe account's balance (for example, charges, transfers, payouts, refunds, etc.). The transactions are returned in sorted order, with the most recent transactions appearing first.

Endpoint: `https://api.stripe.com/v1/balance_transactions/{id}`

Operation: `GET`

#### Examples
**cURL Example:**
```bash
curl -X GET https://api.stripe.com/v1/balance_transactions/tr_1234567890 \
  -u <YOUR_SECRET_KEY>:
```

#### Responses
Responses will return standard codes.

`200: OK`
```json
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
`400: Bad Request`
```json
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
```json
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
| `expand[]` | array of strings | Specifies which fields in the response should be expanded. | 
##### Path variables
| Name | Type | Required | Description | 
|------|------|----------|-------------|
| `id` | string | Required | Path variable identifier | 