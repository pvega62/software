---
id: create-refund
title: Create a refund
sidebar_label: 'Create a refund'
sidebar_position: 1
slug: /stripe-api/refund/create-refund
description: 'Documentation for creating a refund in the Stripe API.'
---

Issues a refund for a captured charge. You can specify a custom refund amount or omit it to return the full balance. Stripe issues refunds in the original currency and sends them directly to the customer's initial payment method.

**You can't refund a charge beyond its initial balance.** If you attempt to refund an already settled charge or exceed the original total, Stripe returns an error.

<span className="badge badge--info">POST</span> `https://api.stripe.com/v1/refunds`

#### Examples
**cURL Example:**
```bash title="cURL"
curl -X POST https://api.stripe.com/v1/refunds \
  -u <YOUR_SECRET_KEY>: \
  -d "charge=ch_1NirD82eZvKYlo2CIvbtLWuY"
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

##### Body parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `amount` | integer | Refund amount in cents. If omitted, Stripe refunds the full charge amount. |
| `charge` | string | **(Required)** ID of the charge to refund. |
| `currency` | string | Three-letter ISO currency code, in lowercase. Must be a supported currency. If omitted, Stripe adopts the original charge's currency. |
| `expand[]` | array of strings | Identifies nested response objects to enrich and return inline. |
| `customer` | string | ID of the customer to whom the charge belongs. |
| `reason` | string | Reason for the refund. If set, possible values are `duplicate`, `fraudulent`, or `requested_by_customer`. If set to `fraudulent`, Stripe adds the associated card and email to your block lists. This helps improve fraud detection. |
| `payment_intent` | string | ID of the PaymentIntent to refund. |
| `refund_application_fee` | boolean | Determines whether Stripe credits the platform fee back to the account. For full refunds, Stripe returns the entire fee. For partial refunds, Stripe recalculates and returns a proportional amount. A platform fee applies only to the platform that created the charge. | 
| `origin`| string | The origin of the refund. |
| `reverse_transfer` | boolean | Dictates whether Stripe reclaims transferred funds from the connected account. Stripe reverses connected transfers in proportion to the refunded sum (full or partial refund). |
| `instructions_email` | string | Sends manual payout instructions to this email address if the customer's payment method lacks native refund support. |
