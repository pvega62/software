---
id: add-pet
title: Add a new pet
sidebar_label: 'Add a new pet'
sidebar_position: 1
description: 'Documentation for adding a new pet to the store.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Add a new pet to the store's database.

<span className="badge badge--info">POST</span> `https://petstore3.swagger.io/api/v3/pet`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
POST "https://petstore3.swagger.io/api/v3/pet" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "api_key: <YOUR_API_KEY>" \
-d '{
  "id": 0,
  "name": "string",
  "category": {
    "id": 0,
    "name": "string"
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
}'
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
POST "https://petstore3.swagger.io/api/v3/pet" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>" \
-d '{
  "id": 0,
  "name": "string",
  "category": {
    "id": 0,
    "name": "string"
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
| `body` | Pet object | **Required.** The `Pet` object to add to the store. |
