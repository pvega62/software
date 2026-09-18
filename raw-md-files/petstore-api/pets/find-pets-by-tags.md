---
id: find-pets-by-tags
title: Find pets by tags
sidebar_label: 'Find pets by tags'
sidebar_position: 4
description: 'Documentation for finding pets by tags.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Find pets by their tags.

<span className="badge badge--success">GET</span> `https://petstore3.swagger.io/api/v3/pet/findByTags`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/pet/findByTags?tags=string" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/pet/findByTags?tags=string" \
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
| `tags` | array | Tags to filter by. <br /> **Default:** `[]`. <br /> **Allowed values:** any valid tag names. |
