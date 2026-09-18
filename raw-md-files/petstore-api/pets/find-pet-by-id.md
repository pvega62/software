---
id: find-pet-by-id
title: Find pet by ID
sidebar_label: 'Find pet by ID'
sidebar_position: 5
description: 'Documentation for finding a pet by ID.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Find a pet by its unique ID.

<span className="badge badge--success">GET</span> `https://petstore3.swagger.io/api/v3/pet/{petId}`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/pet/210" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/pet/210" \
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
| 404  | Pet not found |
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

##### Path parameters

| Name   | Type   | Description |
|--------|--------|-------------|
| `petId`  | integer | ID of pet to return |
