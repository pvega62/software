---
id: list-payment-intents
title: List all payment intents
sidebar_label: 'List all payment intents'
sidebar_position: 1
slug: /stripe-api/payment-intent/list-payment-intents
description: 'Documentation for listing all payment intents in the Stripe API.'
---

Returns a list of Payment Intents.

<span className="badge badge--success">GET</span> `https://api.stripe.com/v1/payment_intents`

#### Examples
**cURL Example:**
```bash title="cURL"
curl -X GET https://api.stripe.com/v1/payment_intents \
  -u <YOUR_SECRET_KEY>:
```

#### Responses

Responses return standard codes.

`200: OK`
```json title="Response"
{
  "object": "list",
  "data": [
    {
      "id": "pi_1234567890",
      "object": "payment_intent",
      "amount": 1000,
      "currency": "usd",
      "status": "requires_confirmation"
    }
  ],
  "has_more": false,
  "url": "/v1/payment_intents"
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
|------------------|------------------|--------------------------------------------------------------------------------------------------------------------|
| `limit` | integer | Caps the number of records in the response. Enter an integer from 1 to 100 (default: 10). |
| `starting_after` | string | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. |
| `ending_before` | string | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. |
| `expand[]` | array of strings | Identifies nested response objects to enrich and return inline. |
