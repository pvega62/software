---
id: update-pet-with-form
title: Update a pet with form data
sidebar_label: 'Update a pet with form data'
sidebar_position: 6
description: 'Documentation for updating a pet with form data.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Update a pet in the store with form data.

<span className="badge badge--info">POST</span> `https://petstore3.swagger.io/api/v3/pet/{petId}`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
POST "https://petstore3.swagger.io/api/v3/pet/210" \
-H "api_key: <YOUR_API_KEY>" \
-H "Content-Type: application/x-www-form-urlencoded" \
--data-urlencode "name=Krypto" \
--data-urlencode "status=available"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
POST "https://petstore3.swagger.io/api/v3/pet/210" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>" \
-H "Content-Type: application/x-www-form-urlencoded" \
--data-urlencode "name=Krypto" \
--data-urlencode "status=available"
```

  </TabItem>
</Tabs>

#### Responses

| Code | Description |
|------|-------------|
| 200  | Successful operation |
| 405  | Invalid input |
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
| `petId`  | integer | ID of pet to update |

##### Query parameters

| Name   | Type   | Description |
|--------|--------|-------------|
| `name`   | string | Name of pet to update |
| `status` | string | Status of pet to update |
