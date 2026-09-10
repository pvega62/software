---
title: Store API Functions
slug: store-api
sidebar_position: 3
id: store-api
description: Detailed documentation of the Store API functions available in the Petstore app, including endpoints for managing store inventory and orders.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

With these API functions, you can manage your pet store's inventory and orders.

### Getting pet inventories
Returns pet inventories by status.

Endpoint: `https://petstore3.swagger.io/api/v3/store/inventory`

Operation: `GET`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
GET "https://petstore3.swagger.io/api/v3/store/inventory" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash
GET "https://petstore3.swagger.io/api/v3/store/inventory" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>

#### Responses
| Code | Description |
|------|-------------|
| 200  | Successful operation |
| default | Unexpected error |
##### Response example
`200: Successful operation`
```json
{
  "sold": 0,
  "available": 0,
  "pending": 0
}
```
#### Parameters
None

### Placing an order
Places an order for a pet.

Endpoint: `https://petstore3.swagger.io/api/v3/store/order`

Operation: `POST`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
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

```bash
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
```json
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
| body | Order object | **(Required)** The `Order` object for the pet. |

### Finding an order
Finds an order by its ID.

Endpoint: `https://petstore3.swagger.io/api/v3/store/order/{orderId}`

Operation: `GET`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
GET "https://petstore3.swagger.io/api/v3/store/order/1" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash
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
```json
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
| Name   | Type   | Description                                                                                             |
|--------|--------|---------------------------------------------------------------------------------------------------------|
| orderId   | integer  | ID of the purchase order to fetch |


### Deleting an order
Deletes an order by its ID.

Endpoint: `https://petstore3.swagger.io/api/v3/store/order/{orderId}`

Operation: `DELETE`

#### Examples

<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
DELETE "https://petstore3.swagger.io/api/v3/store/order/1" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash
DELETE "https://petstore3.swagger.io/api/v3/store/order/1" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>

#### Responses
| Code | Description |
|------|-------------|
| 200  | order deleted |
| 400  | Invalid ID supplied |
| 404  | Order not found |
| default | Unexpected error |

(A successful deletion returns a `200` code with no response body.)

#### Parameters
##### Path parameters
| Name   | Type   | Description                                                                                             |
|--------|--------|---------------------------------------------------------------------------------------------------------|
| orderId   | integer  | ID of the order to delete |
