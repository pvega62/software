---
id: update-pet
title: Update an existing pet
sidebar_label: 'Update an existing pet'
sidebar_position: 2
description: 'Documentation for updating an existing pet in the store.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Update an existing pet by its ID.

<span className="badge badge--warning">PUT</span> `https://petstore3.swagger.io/api/v3/pet`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
PUT "https://petstore3.swagger.io/api/v3/pet" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "api_key: <YOUR_API_KEY>" \
-d '{
    "id": 210,
    "name": "Krypto",
    "status": "available"
  }'
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
PUT "https://petstore3.swagger.io/api/v3/pet" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>" \
-d '{
    "id": 210,
    "name": "Krypto",
    "status": "available"
  }'
```

  </TabItem>
</Tabs>

#### Responses

| Code | Description |
|------|-------------|
| 200  | Successful operation |
| 400  | Invalid input |
| 404  | Pet not found |
| 422  | Validation exception |
| default | Unexpected error |

##### Response example

`200: Successful operation`
```json title="Response"
{
  "id": 210,
  "name": "Krypto",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```

#### Parameters

##### Request body

| Name | Type | Description |
|------|------|-------------|
| `body` | Pet object | **Required.** Pet object to update. |
