--- 
id: refund-apis
title: Refund API Functions
sidebar_label: 'Refund APIs'
sidebar_position: 5
slug: /stripe-api/refund-apis
description: 'Documentation for the Refund APIs, including creating and updating refunds.'
---
### Create a refund
Creates a refund for a charge already created but not yet refunded. The amount to be refunded can be specified, or the entire charge amount can be refunded by not specifying an amount. The refund will be created in the same currency as the charge and to the same payment method as the charge.

**A charge can't be refunded more than once.** If you attempt to refund a charge that has already been refunded, an error will be returned. This will also happen if you attempt to refund more than the original charge amount.

Endpoint: `https://api.stripe.com/v1/refunds`

Operation: `POST`
#### Examples
**cURL Example:**
```bash
curl -X POST https://api.stripe.com/v1/refunds \
  -u <YOUR_SECRET_KEY>: \
  -d "charge=ch_1NirD82eZvKYlo2CIvbtLWuY"
```
#### Responses

Responses will return standard codes.

`200: OK`
```json
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
`400: Bad Request`
```json
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
```json
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
| `amount` | integer | Amount to refund, in cents. If not specified, the entire charge amount will be refunded. |
| `charge` | string | **(Required)** ID of the charge to refund. |
| `currency` | string | Three-letter ISO currency code, in lowercase. Must be a supported currency. If not specified, the currency of the charge will be used. |
| `expand[]` | array of strings | Specifies which fields in the response should be expanded. |
| `customer` | string | ID of the customer to whom the charge belongs. |
| `reason` | string | Reason for the refund. If set, possible values are `duplicate`, `fraudulent`, or `requested_by_customer`. If set as `fraudulent`, the card and email associated with the charge will be added to your block lists, and will help improve Stripe's fraud detection. |
| `payment_intent` | string | ID of the PaymentIntent to refund. |
| `refund_application_fee` | boolean | Indicates whether the application fee should be refunded. If the full amount is refunded, the application fee will be refunded as well. Otherwise, the application fee will be refunded proportionally to the refund. An application fee can only be the application that created the charge.| 
| `origin`| string | The origin of the refund. |
| `reverse_transfer` | boolean | Indicates whether the transfer should be reversed. Transfer is reversed proportionally to the refund amount (full or partial refund). |
| `instructions_email` | string | Uses customer's email address for refund instructions when payment method without refund support is used. |

### Update a refund
Updates the specified refund by setting the values of the parameters passed. Any parameters not provided will be left unchanged. This is useful for storing additional information about the refund.

Endpoint: `https://api.stripe.com/v1/refunds/{id}`

Operation: `POST`
#### Examples
**cURL Example:**
```bash
curl -X POST `https://api.stripe.com/v1/refunds/{id}` \
  -u <YOUR_SECRET_KEY>: \
  -d "metadata[order_id]=6735"
```
#### Responses

Responses will return standard codes.

`200: OK`
```json
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
`400: Bad Request`
```json
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
```json
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
| `expand[]` | array of strings | Specifies which fields in the response should be expanded. |

##### Path variables
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Required | The ID of the refund to update. |

### Retrieve a refund
Retrieves the details of a specific refund.

Endpoint: `https://api.stripe.com/v1/refunds/{id}`

Operation: `GET`
#### Examples
**cURL Example:**
```bash
curl -X GET https://api.stripe.com/v1/refunds/re_1Nispe2eZvKYlo2Cd31jOCgZ \
  -u <YOUR_SECRET_KEY>:
```
#### Responses

Responses will return standard codes.

`200: OK`
```json
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
`400: Bad Request`
```json
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
| `id` | string | Required | The ID of the refund to retrieve. |

### List all refunds
Returns a list of existing refunds. Refunds return in sorted order, with the most recent refunds appearing first. The 10 most recent refunds are returned by default.

Endpoint: `https://api.stripe.com/v1/refunds`

Operation: `GET`
#### Examples
**cURL Example:**
```bash
curl -X GET https://api.stripe.com/v1/refunds \
  -u <YOUR_SECRET_KEY>:
```
#### Responses
Responses will return standard codes. 

`200: OK`
```json
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
`400: Bad Request`
```json
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
```json
{
  "error": {
    "type": "invalid_request_error",
    "message": "Invalid API Key provided: sk_test_********************1234"
  }
}
```
#### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `charge` | string | ID of the charge to retrieve refunds for. If not specified, all refunds will be returned. |
| `created` | dictionary | Returns refunds only created during the given date intervals. This can be a dictionary with the following keys: `gt`, `gte`, `lt`, `lte`. |
| `ending_before` | string | A cursor for use in pagination. Use the object ID `ending_before` to define your place in the list. If you make a list request and receive 100 results, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` to fetch the previous page of the list. |
| `limit` | integer | A limit on the number of objects to be returned. Limit can range between 1 and 100. The default is 10. |
| `payment_intent` | string | ID of the PaymentIntent to retrieve refunds for. If not specified, all refunds will be returned. |
| `starting_after` | string | A cursor for use in pagination. Use the object ID `starting_after` to define your place in the list. If you make a list request and receive 100 results, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` to fetch the next page of the list. |
| `expand[]` | array of strings | Specifies which fields in the response should be expanded. |
