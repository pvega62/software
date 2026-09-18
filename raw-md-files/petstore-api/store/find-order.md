---
id: find-order
title: Find purchase order by ID
sidebar_label: 'Find purchase order by ID'
sidebar_position: 3
description: 'Documentation for finding a purchase order by ID.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Find a purchase order by its ID.

<span className="badge badge--success">GET</span> `https://petstore3.swagger.io/api/v3/store/order/{orderId}`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/store/order/1" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/store/order/1" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>

#### Responses

| Code | Description |
|------|-------------|
| 200  | Successful operation |
| 400  | Invalid ID supplied |
| 404  | Order not found |
| default | Unexpected error |

##### Response example

`200: Successful operation`
```json title="Response"
{
  "id": 1,
  "petId": 0,
  "quantity": 0,
  "shipDate": "2025-08-11T15:13:06.939Z",
  "status": "placed",
  "complete": false
}
```

#### Parameters

##### Path parameters

| Name    | Type    | Description |
|---------|---------|-------------|
| `orderId` | integer | ID of the purchase order to fetch |
