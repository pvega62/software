---
id: create-payment-intent
title: Create a payment intent
sidebar_label: 'Create a payment intent'
sidebar_position: 2
slug: /stripe-api/payment-intent/create-payment-intent
description: 'Documentation for creating a payment intent in the Stripe API.'
---

After creating a Payment Intent, attach a payment method and confirm the intent to finalize the transaction.

Using `confirm=true` during creation is equivalent to creating and confirming the Payment Intent in the same call. Applying `confirm=true` enables the use of any parameters in the **confirm** API.

<span className="badge badge--info">POST</span> `https://api.stripe.com/v1/payment_intents`

:::note
You must submit the `confirm` request over `HTTPS`.
::: 

#### Examples
**cURL Example:**
```bash title="cURL"
curl -X POST https://api.stripe.com/v1/payment_intents \
  -u <YOUR_SECRET_KEY>: \
  -d "amount=212&currency=usd&payment_method=pm_card_visa&confirm=true"
```  

#### Responses

Responses return standard codes.

`200: OK`
```json title="Response"
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
|------------------------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `amount` | integer | **(Required)** The total amount to charge. Enter a positive integer formatted in the currency's smallest unit (such as 100 cents for $1.00). |
| `currency` | string | **(Required)** Three-letter ISO currency code, in lowercase. Must be a supported currency. |
| `confirm` | boolean | Set to true to attempt to confirm this PaymentIntent immediately. |
| `customer` | string | ID of the Customer this PaymentIntent belongs to, if one exists. |
| `description` | string | An arbitrary string attached to the object. |
| `payment_method` | string | ID of the payment method to attach to this PaymentIntent. |
| `payment_method_types[]` | array of strings | The list of payment method types that this PaymentIntent can use. |
| `shipping` | object | Shipping information for the PaymentIntent. |
| `statement_descriptor` | string | An arbitrary string displayed on your customer's credit card statement. |
| `statement_descriptor_suffix` | string | Provides additional details displayed on your customer's credit card statement. |
| `expand[]` | array of strings | Identifies nested response objects to enrich and return inline. |
