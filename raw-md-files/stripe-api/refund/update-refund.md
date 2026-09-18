---
id: update-refund
title: Update a refund
sidebar_label: 'Update a refund'
sidebar_position: 2
slug: /stripe-api/refund/update-refund
description: 'Documentation for updating a refund in the Stripe API.'
---

Updates specific refund properties. Stripe preserves any parameters you omit from this request. This helps store additional information about the refund.

<span className="badge badge--info">POST</span> `https://api.stripe.com/v1/refunds/{id}`

#### Examples
**cURL Example:**
```bash title="cURL"
curl -X POST https://api.stripe.com/v1/refunds/{id} \
  -u <YOUR_SECRET_KEY>: \
  -d "metadata[order_id]=6735"
```

#### Responses

Responses return standard codes.

`200: OK`
```json title="Response"
{
  "id": "re_1Nispe2eZvKYlo2Cd31jOCgZ",
  "object": "refund",
  "amount": 1000,
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
  "metadata": {
    "order_id": "6735"
  },
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

##### Body parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `metadata`| object | Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. |
| `expand[]` | array of strings | Identifies nested response objects to enrich and return inline. |

##### Path variables
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Required | The ID of the refund to update. |
