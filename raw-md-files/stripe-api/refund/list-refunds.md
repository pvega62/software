---
id: list-refunds
title: List all refunds
sidebar_label: 'List all refunds'
sidebar_position: 4
slug: /stripe-api/refund/list-refunds
description: 'Documentation for listing all refunds in the Stripe API.'
---

Returns a list of existing refunds. Stripe displays refunds in reverse chronological order, showing the most recent entries first. The response includes the 10 most recent refunds by default.

<span className="badge badge--success">GET</span> `https://api.stripe.com/v1/refunds`

#### Examples
**cURL Example:**
```bash title="cURL"
curl -X GET https://api.stripe.com/v1/refunds \
  -u <YOUR_SECRET_KEY>:
```

#### Responses
Responses return standard codes. 

`200: OK`
```json title="Response"
{
  "object": "list",
  "url": "/v1/refunds",
  "has_more": false,
  "data": [
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
  ]
}
```

#### Error responses
`400: Bad Request`
```json title="Response"
{
    "error": {
        "code": "resource_missing",
        "doc_url": "https://stripe.com/docs/error-codes/resource-missing",
        "message": "No such charge: 'ch_1NirD82eZvKYlo2CIvbtLWuY'",
        "param": "charge",
        "request_log_url": "https://dashboard.stripe.com/test/logs/req_HIH2jWkJGecwCk?t=1754504399",
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
| `charge` | string | ID of the charge to retrieve refunds for. If omitted, Stripe returns all account refunds. |
| `created` | dictionary | Returns refunds only created during the given date intervals. This can be a dictionary with the following keys: `gt`, `gte`, `lt`, `lte`. |
| `ending_before` | string | A cursor for use in pagination. Use the object ID `ending_before` to define your place in the list. If you make a list request and receive 100 results, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` to fetch the previous page of the list. |
| `limit` | integer | Caps the number of records in the response. Enter an integer from 1 to 100 (default: 10). |
| `payment_intent` | string | ID of the PaymentIntent to retrieve refunds for. If omitted, Stripe returns all account refunds. |
| `starting_after` | string | A cursor for use in pagination. Use the object ID `starting_after` to define your place in the list. If you make a list request and receive 100 results, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` to fetch the next page of the list. |
| `expand[]` | array of strings | Identifies nested response objects to enrich and return inline. |
