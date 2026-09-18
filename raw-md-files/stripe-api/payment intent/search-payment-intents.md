---
id: search-payment-intents
title: Search payment intents
sidebar_label: 'Search payment intents'
sidebar_position: 3
slug: /stripe-api/payment-intent/search-payment-intents
description: 'Documentation for searching payment intents using Stripe Search Query Language.'
---

Using Stripe’s Search Query Language, you can search for previously created Payment Intents.

Avoid search queries in read-after-write pipelines that require immediate data consistency. Under normal operation, data is searchable for less than a minute. Occasionally, the propagation of new or updated data can be up to an hour behind during outages.

:::note
The search function isn't available to merchants in India.
:::

<span className="badge badge--success">GET</span> `https://api.stripe.com/v1/payment_intents/search`

#### Examples
**cURL Example:**
```bash title="cURL"
curl -X GET "https://api.stripe.com/v1/payment_intents/search?query=amount:1000" \
  -u <YOUR_SECRET_KEY>:
```

#### Responses

Responses return standard codes.

`200: OK`
```json title="Response"
{
  "object": "search_result",
  "data": [],
  "has_more": false,
  "url": "/v1/payment_intents/search"
}
```

#### Error responses
`400: Bad Request`
```json title="Response"
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
| `limit` | integer | Caps the number of records in the response. Enter an integer from 1 to 100 (default: 10). |
| `page` | string | A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the `next_page` value returned in a previous response to request subsequent results. |
| `query` | string | **(Required)** The search query string. See search query language and the list of supported query fields for payment intents. |
