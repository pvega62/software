---
id: delete-order
title: Delete purchase order by ID
sidebar_label: 'Delete purchase order by ID'
sidebar_position: 4
description: 'Documentation for deleting a purchase order by ID.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Delete a purchase order by its ID.

<span className="badge badge--danger">DELETE</span> `https://petstore3.swagger.io/api/v3/store/order/{orderId}`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
DELETE "https://petstore3.swagger.io/api/v3/store/order/1" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
DELETE "https://petstore3.swagger.io/api/v3/store/order/1" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>

#### Responses

| Code | Description |
|------|-------------|
| 200  | Order deleted |
| 400  | Invalid ID supplied |
| 404  | Order not found |
| default | Unexpected error |

A successful deletion returns a `200` code with no response body.

#### Parameters

##### Path parameters

| Name    | Type    | Description |
|---------|---------|-------------|
| `orderId` | integer | ID of the order to delete |
