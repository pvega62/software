---
id: place-order
title: Place an order for a pet
sidebar_label: 'Place an order'
sidebar_position: 2
description: 'Documentation for placing an order for a pet.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Place an order for a pet.

<span className="badge badge--info">POST</span> `https://petstore3.swagger.io/api/v3/store/order`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
POST "https://petstore3.swagger.io/api/v3/store/order" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "api_key: <YOUR_API_KEY>" \
-d '{
  "id": 0,
  "petId": 0,
  "quantity": 0,
  "shipDate": "2025-08-11T15:13:06.939Z",
  "status": "placed",
  "complete": false
}'
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
POST "https://petstore3.swagger.io/api/v3/store/order" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>" \
-d '{
  "id": 0,
  "petId": 0,
  "quantity": 0,
  "shipDate": "2025-08-11T15:13:06.939Z",
  "status": "placed",
  "complete": false
}'
```

  </TabItem>
</Tabs>

#### Responses

| Code | Description |
|------|-------------|
| 200  | Successful operation |
| 400  | Invalid Order |
| default | Unexpected error |

##### Response example

`200: Successful operation`
```json title="Response"
{
  "id": 0,
  "petId": 0,
  "quantity": 0,
  "shipDate": "2025-08-11T15:13:06.939Z",
  "status": "placed",
  "complete": false
}
```

#### Parameters

##### Request body

| Name | Type | Description |
|------|------|-------------|
| `body` | Order object | **Required.** The `Order` object for the pet. |
