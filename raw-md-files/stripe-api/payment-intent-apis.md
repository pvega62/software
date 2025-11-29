---
id: payment-intent-apis
title: Payment Intent API Functions
sidebar_label: 'Payment Intent APIs'
sidebar_position: 4
slug: /stripe-api/payment-intent-apis
description: 'Documentation for the Payment Intent APIs, including creating, retrieving, and listing payment intents.'
---

### List all payment intents

Returns a list of Payment Intents.

Endpoint: `https://api.stripe.com/v1/payment_intents`

Operation: `GET`

#### Examples
**cURL Example:**
```bash
curl -X GET https://api.stripe.com/v1/payment_intents \
  -u <YOUR_SECRET_KEY>:
```

#### Responses

Responses will return standard codes.

`200: OK`
```json
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
|------------------|------------------|--------------------------------------------------------------------------------------------------------------------|
| `limit` | integer | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `starting_after` | string | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. |
| `ending_before` | string | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. |
| `expand[]` | array of strings | Specifies which fields in the response should be expanded. |

### Create a payment intent

Once a Payment Intent is created, attach a payment method and confirm to continue payment.

Using `confirm=true` during creation is equivalent to creating and confirming the Payment Intent in the same call. Applying `confirm=true` enables the use of any parameters in the **confirm** API.

Endpoint: `https://api.stripe.com/v1/payment_intents`

Operation: `POST`
:::note
The `confirm` request must be made over `HTTPS`.
::: 
#### Examples
**cURL Example:**
```bash
curl -X POST https://api.stripe.com/v1/payment_intents \
  -u <YOUR_SECRET_KEY>: \
  -d "amount=212&currency=usd&payment_method=pm_card_visa&confirm=true"
```  
#### Responses

Responses will return standard codes.

`200: OK`
```json
{
    "id": "pi_3Rsx4dDtWMrPDtgt0mUrePJ9",
    "object": "payment_intent",
    "amount": 212,
    "amount_capturable": 0,
    "amount_details": {
        "tip": {}
    },
    "amount_received": 0,
    "application": null,
    "application_fee_amount": null,
    "automatic_payment_methods": {
        "allow_redirects": "always",
        "enabled": true
    },
    "canceled_at": null,
    "cancellation_reason": null,
    "capture_method": "automatic_async",
    "client_secret": "pi_3Rsx4dDtWMrPDtgt0mUrePJ9_secret_7sqfufxuIYiBhbw52Vi51Z47o",
    "confirmation_method": "automatic",
    "created": 1754447247,
    "currency": "usd",
    "customer": null,
    "description": null,
    "last_payment_error": null,
    "latest_charge": null,
    "livemode": false,
    "metadata": {},
    "next_action": null,
    "on_behalf_of": null,
    "payment_method": null,
    "payment_method_configuration_details": {
        "id": "pmc_1RsGk1DtWMrPDtgtcaQ0d3Sg",
        "parent": null
    },
    "payment_method_options": {
        "amazon_pay": {
            "express_checkout_element_session_id": null
        },
        "card": {
            "installments": null,
            "mandate_options": null,
            "network": null,
            "request_three_d_secure": "automatic"
        },
        "cashapp": {},
        "klarna": {
            "preferred_locale": null
        },
        "link": {
            "persistent_token": null
        }
    },
    "payment_method_types": [
        "card",
        "klarna",
        "link",
        "cashapp",
        "amazon_pay"
    ],
    "processing": null,
    "receipt_email": null,
    "review": null,
    "setup_future_usage": null,
    "shipping": null,
    "source": null,
    "statement_descriptor": null,
    "statement_descriptor_suffix": null,
    "status": "requires_payment_method",
    "transfer_data": null,
    "transfer_group": null
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
|------------------------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `amount` | integer | **(Required)** Amount intended to be collected. A positive integer representing how much to charge in the smallest currency unit (for example, 100 cents to charge $1.00). |
| `currency` | string | **(Required)** Three-letter ISO currency code, in lowercase. Must be a supported currency. |
| `confirm` | boolean | Set to true to attempt to confirm this PaymentIntent immediately. |
| `customer` | string | ID of the Customer this PaymentIntent belongs to, if one exists. |
| `description` | string | An arbitrary string attached to the object. |
| `payment_method` | string | ID of the payment method to attach to this PaymentIntent. |
| `payment_method_types[]` | array of strings | The list of payment method types that this PaymentIntent can use. |
| `shipping` | object | Shipping information for the PaymentIntent. |
| `statement_descriptor` | string | An arbitrary string displayed on your customer's credit card statement. |
| `statement_descriptor_suffix` | string | Provides additional details displayed on your customer's credit card statement. |
| `expand[]` | array of strings | Specifies which fields in the response should be expanded. |
### Search payment intents

Using Stripe’s Search Query Language, you can search for previously created Payment Intents.

Don't use the search request in read-after-write flows where strict consistency is needed. Under normal operation, data is searchable for less than a minute. Occasionally, the propagation of new or updated data can be up to an hour behind during outages.

:::note
The search function isn't available to merchants in India.
:::

Endpoint: `https://api.stripe.com/v1/payment_intents/search`

Operation: `GET`
#### Examples
**cURL Example:**
```bash
curl -X GET "https://api.stripe.com/v1/payment_intents/search?query=amount:1000" \
  -u <YOUR_SECRET_KEY>:
```
#### Responses

Responses will return standard codes.

`200: OK`
```json
{
  "object": "search_result",
  "data": [],
  "has_more": false,
  "next_page": null,
  "url": "/v1/payment_intents/search"
}
```
`400: Bad Request`
```json
{
  "error": {
    "code": "parameter_invalid_string",
    "doc_url": "https://stripe.com/docs/error-codes/parameter-invalid-string",
    "message": "Provide a query parameter with a valid search query string.",
    "param": "query",
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
| `limit` | integer | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `page` | string | A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the `next_page` value returned in a previous response to request subsequent results. |
| `query` | string | **(Required)** The search query string. See search query language and the list of supported query fields for payment intents. |