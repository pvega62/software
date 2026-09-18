---
id: retrieve-refund
title: Retrieve a refund
sidebar_label: 'Retrieve a refund'
sidebar_position: 3
slug: /stripe-api/refund/retrieve-refund
description: 'Documentation for retrieving details of a refund in the Stripe API.'
---

Retrieves the details of a specific refund.

<span className="badge badge--success">GET</span> `https://api.stripe.com/v1/refunds/{id}`

#### Examples
**cURL Example:**
```bash title="cURL"
curl -X GET https://api.stripe.com/v1/refunds/re_1Nispe2eZvKYlo2Cd31jOCgZ \
  -u <YOUR_SECRET_KEY>:
```

#### Responses

Responses return standard codes.

`200: OK`
```json title="Response"
{
  "id": "re_1Nispe2eZvKYlo2Cd31jOCgZ",
  "object": "refund",
  "amount": 212,
  "balance_transaction": "txn_1Nispe2eZvKYlo2CYezqFhEx",
  "charge": "ch_1NirD82eZvKYlo2CIvbtLWuY",
  "created": 1692942318,
  "currency": "usd",
  "destination_details": {
    "card": {
      "reference": "123456789012",
      "reference_status": "available",
      "reference_type": "acquirer_reference_number",
      "type": "refund"
    },
    "type": "card"
  },
  "metadata": {},
  "payment_intent": "pi_1GszsK2eZvKYlo2CfhZyoZLp",
  "reason": null,
  "receipt_number": null,
  "source_transfer_reversal": null,
  "status": "succeeded",
  "transfer_reversal": null
}
```

#### Error responses
`400: Bad Request`
```json title="Response"
{
  "error": {
    "code": "parameter_invalid_integer",
    "doc_url": "https://stripe.com/docs/error-codes/parameter-invalid-integer",
    "message": "Invalid integer: <integer>",
    "param": "amount",
    "request_log_url": "https://dashboard.stripe.com/test/logs/req_UQf6XBwBl9yk66?t=1734829676",
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
| `id` | string | Required | The ID of the refund to retrieve. |
