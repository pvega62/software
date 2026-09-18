---
id: obtain-balance
title: Obtain the balance
sidebar_label: 'Obtain the balance'
sidebar_position: 1
slug: /stripe-api/balance/obtain-balance
description: 'Documentation for obtaining the balance of a Stripe account.'
---

Obtain the balance of a Stripe account.

<span className="badge badge--success">GET</span> `https://api.stripe.com/v1/balance`

#### Examples
**cURL Example:**
```bash title="cURL"
curl -X GET https://api.stripe.com/v1/balance \
  -u <YOUR_SECRET_KEY>:
```

#### Responses

Responses return standard codes.

`200: OK`
```json title="Response"
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
