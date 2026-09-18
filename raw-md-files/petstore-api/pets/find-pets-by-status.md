---
id: find-pets-by-status
title: Find pets by status
sidebar_label: 'Find pets by status'
sidebar_position: 3
description: 'Documentation for finding pets by status.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Find pets by their status.

<span className="badge badge--success">GET</span> `https://petstore3.swagger.io/api/v3/pet/findByStatus`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>

#### Responses

| Code | Description |
|------|-------------|
| 200  | Successful operation |
| 400  | Invalid input |
| default | Unexpected error |

##### Response example

`200: Successful operation`
```json title="Response"
[
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
]
```

#### Parameters

##### Query parameters

| Name   | Type   | Description                                                                                             |
|--------|--------|---------------------------------------------------------------------------------------------------------|
| `status` | string | Status of the pet to find. <br /> **Default:** `available`. <br /> **Allowed values:** `available`, `pending`, `sold`. |
